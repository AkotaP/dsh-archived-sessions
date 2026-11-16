/**
 * Host-side API contracts: the fenced `/archived/api` surface stays loopback-only,
 * refuses to delete a running Session, and no longer serves the private config
 * endpoints the plugin used before it moved onto the official settings document.
 */
import assert from "node:assert/strict";
import test from "node:test";
import { existsSync } from "node:fs";
import { mkdir, mkdtemp, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { callApi, loadHost, makeHostContext } from "./support/harness.mjs";

const mountHost = async (services = {}) => {
  const plugin = await loadHost("host-api-" + Math.random());
  const { ctx, routes } = makeHostContext(services);
  plugin.apply(ctx);
  return routes;
};

test("deleting a running Session is refused with 409 session-busy", async () => {
  const routes = await mountHost({ agents: { get: () => ({ status: "running" }) } });
  const response = await callApi(routes, "delete", { sessionId: "session-1" });
  assert.equal(response.status, 409);
  assert.equal(response.body.ok, false);
  assert.equal(response.body.error.code, "session-busy");
  assert.match(response.body.error.message, /正在运行/);
});

test("the route is loopback-only and validates its input", async () => {
  const routes = await mountHost();
  const foreign = await callApi(routes, "delete", { sessionId: "session-1" }, { host: "evil.example.com" });
  assert.equal(foreign.status, 403);
  const missing = await callApi(routes, "delete", {});
  assert.equal(missing.status, 400);
  assert.equal(missing.body.error.code, "bad-request");
  const unknown = await callApi(routes, "nope", { sessionId: "session-1" });
  assert.equal(unknown.status, 404);
});

test("the retired private config endpoints are gone", async () => {
  const routes = await mountHost();
  for (const method of ["config", "config-set"]) {
    const response = await callApi(routes, method, { field: "deleteInHeader", value: true });
    assert.equal(response.status, 404, method + " must no longer exist; the switches live in the settings document now");
  }
});


const header = (id, extra = {}) => ({ id, cwd: "E:/ws", ...extra });
const persistenceStub = (headers) => ({
  stat: async (id) => {
    const meta = headers.find((entry) => entry.id === id);
    return meta === undefined ? undefined : { header: meta, revision: "r-" + id };
  },
  list: async () => headers.map((entry) => ({ header: entry, revision: "r-" + entry.id })),
});

test("details releases the sessionQuery observation lease", async () => {
  let disposed = 0;
  const observation = {
    header: header("s1"),
    events: [],
    [Symbol.dispose]() { disposed += 1; },
  };
  const routes = await mountHost({
    sessionQuery: { observeSession: async () => observation },
    sessionPersistence: persistenceStub([header("s1")]),
  });
  const response = await callApi(routes, "details", { sessionId: "s1" });
  assert.equal(response.status, 200);
  assert.equal(disposed, 1, "the caller-owned observation lease must be released");
});

test("deleting a session with a running subagent is refused", async () => {
  const routes = await mountHost({
    agents: { get: (id) => (id === "child" ? { status: "running" } : undefined) },
    sessions: { get: () => undefined, list: () => [] },
    sessionPersistence: persistenceStub([
      header("parent"),
      header("child", { parentSession: "parent", origin: "subagent" }),
    ]),
  });
  const response = await callApi(routes, "delete", { sessionId: "parent", subagentIds: ["child"] });
  assert.equal(response.status, 409);
  assert.equal(response.body.error.code, "session-busy");
  assert.match(response.body.error.message, /子会话正在运行/);
});

test("subagentIds must name actual descendants", async () => {
  const routes = await mountHost({
    agents: { get: () => undefined },
    sessions: { get: () => undefined, list: () => [] },
    sessionPersistence: persistenceStub([header("parent"), header("child", { parentSession: "parent", origin: "subagent" }), header("stranger")]),
  });
  const response = await callApi(routes, "delete", { sessionId: "parent", subagentIds: ["stranger"] });
  assert.equal(response.status, 403);
  assert.equal(response.body.error.code, "invalid-subagent");
});

test("a non-loopback socket is refused even with a loopback Host header", async () => {
  const routes = await mountHost();
  const response = await callApi(routes, "delete", { sessionId: "session-1" }, { "x-socket-address": "10.0.0.9" });
  assert.equal(response.status, 403);
});

test("archiving an active session reports 409 instead of a generic 500", async () => {
  const active = new Error("active");
  active.name = "WorkspaceActiveSessionError";
  const routes = await mountHost({
    sessionPersistence: persistenceStub([header("s1")]),
    workspaceRegistry: {
      list: () => [],
      archiveSession: async () => { throw active; },
      requireState: () => ({ workspaceIds: [], archivedSessionIds: [], pinnedSessionIds: [] }),
      setState: async () => {},
    },
  });
  const response = await callApi(routes, "archive", { sessionId: "s1" });
  assert.equal(response.status, 409);
  assert.equal(response.body.error.code, "session-active");
});


test("details-batch scans many sessions in one request and reports misses", async () => {
  const headers = [header("a"), header("b")];
  const routes = await mountHost({
    sessionPersistence: persistenceStub(headers),
    sessionQuery: {
      observeSession: async (id) => {
        const meta = headers.find((entry) => entry.id === id);
        if (meta === undefined) throw Object.assign(new Error("missing"), { code: "SESSION_QUERY_SESSION_NOT_FOUND" });
        return { header: meta, events: [], [Symbol.dispose]() {} };
      },
    },
  });
  const response = await callApi(routes, "details-batch", { sessionIds: ["a", "b", "missing"] });
  assert.equal(response.status, 200);
  assert.deepEqual(Object.keys(response.body.value.sessions).sort(), ["a", "b"]);
  assert.deepEqual(response.body.value.failed, ["missing"]);
  assert.deepEqual(response.body.value.sessions.a, { sessionId: "a", cwd: "E:/ws", files: [] });
});


test("delete filePaths removes only produced files on the real filesystem", async () => {
  const fsp = await import("node:fs/promises");
  const os = await import("node:os");
  const path = await import("node:path");
  const root = await fsp.mkdtemp(path.join(os.tmpdir(), "dsh-archived-sel-"));
  const previousHome = process.env.DSH_HOME;
  process.env.DSH_HOME = root;
  try {
    const workspace = path.join(root, "workspace");
    const outFile = path.join(workspace, "out", "a.md");
    const keepFile = path.join(workspace, "keep", "b.txt");
    await fsp.mkdir(path.dirname(outFile), { recursive: true });
    await fsp.mkdir(path.dirname(keepFile), { recursive: true });
    await fsp.writeFile(outFile, "produced");
    await fsp.writeFile(keepFile, "keep");
    const logDir = path.join(root, "sessions", "proj", "s1");
    await fsp.mkdir(logDir, { recursive: true });
    const logFile = path.join(logDir, "session.v4.jsonl");
    await fsp.writeFile(logFile, "");
    const meta = { id: "s1", cwd: workspace };
    const writeEvent = {
      type: "tool/call",
      seq: 0,
      time: 1,
      data: { name: "write", arguments: JSON.stringify({ file_path: outFile }) },
    };
    // The double reflects the filesystem: once the record is gone the backend must
    // report the session as gone too, otherwise the post-delete wait would hang.
    const stored = async () => {
      try { await fsp.access(logFile); } catch { return undefined; }
      return { header: meta, revision: "r1", sizeBytes: 1, location: { kind: "jsonl", path: logFile } };
    };
    const routes = await mountHost({
      sessionPersistence: {
        stat: async () => stored(),
        list: async () => {
          const snapshot = await stored();
          return snapshot === undefined ? [] : [snapshot];
        },
      },
      sessionQuery: { observeSession: async () => ({ header: meta, events: [writeEvent], [Symbol.dispose]() {} }) },
      workspaceRegistry: { list: () => [{ path: workspace, sessionIds: [] }] },
    });
    const response = await callApi(routes, "delete", { sessionId: "s1", filePaths: [outFile, keepFile] });
    assert.equal(response.status, 200);
    assert.equal(await fsp.access(outFile).then(() => true).catch(() => false), false, "the produced file is removed");
    assert.equal(await fsp.access(keepFile).then(() => true).catch(() => false), true, "a path outside the produced list is left alone");
    assert.equal(await fsp.access(logFile).then(() => true).catch(() => false), false, "the session record is removed");
  } finally {
    if (previousHome === undefined) delete process.env.DSH_HOME;
    else process.env.DSH_HOME = previousHome;
    await fsp.rm(root, { recursive: true, force: true });
  }
});

test("a backend that cannot locate the record reports 501 instead of pretending", async () => {
  const meta = { id: "s1", cwd: "/w" };
  const routes = await mountHost({
    sessions: { get: () => undefined, list: () => [] },
    sessionPersistence: {
      stat: async () => ({ header: meta, revision: "r1" }),
      list: async () => [{ header: meta, revision: "r1" }],
    },
    sessionQuery: { observeSession: async () => ({ header: meta, events: [], [Symbol.dispose]() {} }) },
  });
  const response = await callApi(routes, "delete", { sessionId: "s1" });
  assert.equal(response.status, 501);
  assert.equal(response.body.error.code, "unsupported");
});

test("a pending subagent with no live entry is deleted instead of failing with 501", async () => {
  // 删除父会话时，尚未落盘的子代理只以 backend 的 pending 条目存在：它既没有
  // live session，也没有磁盘目录。旧实现只在 live 时才认这种状态，结果整批删除
  // 落到 unsupported/501（"找不到记录"的观感）。
  const home = await mkdtemp(join(tmpdir(), "dsh-arch-home-"));
  const previousHome = process.env.DSH_HOME;
  process.env.DSH_HOME = home;
  try {
    const parentDir = join(home, "sessions", "--proj--", "parent");
    await mkdir(parentDir, { recursive: true });
    const parentLog = join(parentDir, "session.jsonl");
    await writeFile(parentLog, "{}\n");
    const parentHeader = header("parent", { cwd: "E:/ws" });
    const childHeader = header("child", { parentSession: "parent", origin: "subagent" });
    let childStats = 0;
    const routes = await mountHost({
      agents: { get: () => undefined },
      sessions: { get: () => undefined, list: () => [] },
      sessionPersistence: {
        hasPendingSession: (id) => id === "child",
        stat: async (id) => {
          if (id === "parent") {
            return existsSync(parentLog)
              ? { header: parentHeader, revision: "r-parent", location: { kind: "jsonl", path: parentLog } }
              : undefined;
          }
          childStats += 1;
          // 前两次是定位与删除判定；之后视为 disposed 触发的 close 已经清理干净。
          return childStats <= 2 ? { header: childHeader, revision: "memory:1" } : undefined;
        },
        // 未落盘的子代理由 backend 的 pending 列表暴露，删除才能认出它是后代。
        list: async () => [{ header: parentHeader, revision: "r-parent" }, { header: childHeader, revision: "memory:1" }],
      },
    });
    const response = await callApi(routes, "delete", { sessionId: "parent", subagentIds: ["child"] });
    assert.equal(response.status, 200, JSON.stringify(response.body));
    assert.equal(response.body.ok, true);
    assert.ok(childStats >= 3, "the delete waits until the pending record is gone");
    assert.equal(existsSync(parentDir), false, "the parent's session directory is removed");
  } finally {
    if (previousHome === undefined) delete process.env.DSH_HOME;
    else process.env.DSH_HOME = previousHome;
    await rm(home, { recursive: true, force: true });
  }
});

test("the host remembers deleted ids for the lifetime of its process", async () => {
  // 客户端刷新/换标签页后靠这份名单隐藏残留行；它只活在宿主进程内存里。
  const pendingPersistence = () => {
    let stats = 0;
    return {
      hasPendingSession: (id) => id === "s1",
      stat: async (id) => {
        if (id !== "s1") return undefined;
        stats += 1;
        return stats <= 2 ? { header: header("s1"), revision: "memory:1" } : undefined;
      },
      list: async () => [{ header: header("s1"), revision: "memory:1" }],
    };
  };
  const routes = await mountHost({
    agents: { get: () => undefined },
    sessions: { get: () => undefined, list: () => [] },
    sessionPersistence: pendingPersistence(),
  });
  const deleted = await callApi(routes, "delete", { sessionId: "s1" });
  assert.equal(deleted.status, 200, JSON.stringify(deleted.body));
  const listed = await callApi(routes, "deleted-ids", {});
  assert.equal(listed.status, 200);
  assert.deepEqual(listed.body.value.ids, ["s1"]);

  // A new module instance is a new Host process: the set must start empty.
  const restarted = await mountHost({
    agents: { get: () => undefined },
    sessions: { get: () => undefined, list: () => [] },
    sessionPersistence: pendingPersistence(),
  });
  const afterRestart = await callApi(restarted, "deleted-ids", {});
  assert.deepEqual(afterRestart.body.value.ids, [], "the set is process-scoped, not persisted");
});
