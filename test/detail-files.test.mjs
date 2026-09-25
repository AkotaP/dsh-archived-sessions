/**
 * Detail/文件列表契约：产出文件的判定必须覆盖两种记录形状——
 * 外层 `tool/call`（当前 Harness 里就是 `run_code`）与代码内派发的
 * `tool/ptc-dispatch-start` / `tool/ptc-dispatch`，并且相对路径一律锚定到
 * 会话 cwd（绝不是宿主进程 cwd）。这是 `/archived/api/details` 的
 * `files` 字段与 `delete-file` 归属校验共同依赖的输入。
 */
import assert from "node:assert/strict";
import test from "node:test";
import { mkdtemp, realpath, rm, stat, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join, resolve } from "node:path";
import { callApi, loadHost, makeHostContext } from "./support/harness.mjs";

/** Mount the host half over a live-session double and return the API routes. */
const mountWithSession = async (services) => {
  const plugin = await loadHost("detail-files-" + Math.random());
  const { ctx, routes } = makeHostContext(services);
  plugin.apply(ctx);
  return routes;
};

/** A live Session double exposing `snapshotEvents()` (0.1.5+ shape). */
const liveSession = (id, cwd, events) => ({
  header: { id, cwd, createdAt: 1 },
  snapshotEvents: () => events,
});

/** A temp project directory (realpath'd so Windows short names cannot bite). */
const makeProject = async () => realpath(await mkdtemp(join(tmpdir(), "dsh-arch-sessions-")));

test("files produced inside a code run are detected (ptc dispatches, relative paths, shell)", async () => {
  const dir = await makeProject();
  try {
    await writeFile(join(dir, "rel.txt"), "rel");
    await writeFile(join(dir, "abs.txt"), "abs");
    await writeFile(join(dir, "edit.txt"), "edit");
    await writeFile(join(dir, "shell.txt"), "shell");
    const abs = join(dir, "abs.txt");
    const sessionId = "session-ptc";
    const events = [
      { type: "turn/start", data: { turn: 1 }, time: 1 },
      { type: "tool/call", data: { turn: 1, step: 1, callId: "c1", name: "run_code", arguments: JSON.stringify({ code: "..." }) } },
      // 同一个内层调用的「调用 + 结果」两条记录：只应计一次工具调用
      { type: "tool/ptc-dispatch-start", data: { subCallId: "c1:ptc:1", name: "write", arguments: { file_path: "rel.txt", content: "x" } } },
      { type: "tool/ptc-dispatch", data: { subCallId: "c1:ptc:1", name: "write", arguments: { file_path: "rel.txt" }, content: [{ type: "text", text: "<path>" + join(dir, "rel.txt") + "</path>\n<content>Created file</content>" }] } },
      { type: "tool/ptc-dispatch-start", data: { subCallId: "c1:ptc:2", name: "write", arguments: { file_path: abs } } },
      // 已不存在的路径 / 目录不应进入列表
      { type: "tool/ptc-dispatch-start", data: { subCallId: "c1:ptc:3", name: "write", arguments: { file_path: "ghost.txt" } } },
      { type: "tool/ptc-dispatch-start", data: { subCallId: "c1:ptc:4", name: "edit", arguments: { file_path: "edit.txt" } } },
      { type: "tool/ptc-dispatch-start", data: { subCallId: "c1:ptc:5", name: "pwsh", arguments: { command: 'Set-Content -Path "' + join(dir, "shell.txt") + '" -Value hi' } } },
      { type: "tool/ptc-dispatch-start", data: { subCallId: "c1:ptc:6", name: "glob", arguments: { pattern: "*.txt" } } },
      { type: "tool/ptc-dispatch-start", data: { subCallId: "c1:ptc:7", name: "web_search", arguments: { queries: ["a"] } } }
    ];
    const routes = await mountWithSession({ sessions: { get: (id) => id === sessionId ? liveSession(sessionId, dir, events) : undefined, list: () => [] } });

    const response = await callApi(routes, "details", { sessionId });
    assert.equal(response.status, 200);
    const value = response.body.value;
    const paths = value.files.map((file) => file.path).sort();
    assert.deepEqual(paths, [resolve(dir, "edit.txt"), resolve(dir, "rel.txt"), abs, resolve(dir, "shell.txt")].sort());
    assert.equal(value.files.find((file) => file.path === resolve(dir, "rel.txt")).tool, "write");
    // 工具调用：1 个外层 run_code + 每个内层调用一次（结果记录不重复计数）
    assert.equal(value.stats.toolCalls, 8);
    assert.deepEqual(value.stats.toolCounts, { run_code: 1, write: 3, edit: 1, pwsh: 1, glob: 1, web_search: 1 });
    assert.deepEqual(value.stats.fetches, [{ tool: "web_search", query: "a" }]);
  } finally {
    await rm(dir, { recursive: true, force: true });
  }
});

test("a legacy tool/call write resolves its relative file_path against the Session cwd", async () => {
  const dir = await makeProject();
  try {
    await writeFile(join(dir, "legacy.txt"), "legacy");
    const sessionId = "session-legacy";
    const events = [
      { type: "tool/call", data: { turn: 1, step: 1, callId: "c1", name: "write", arguments: JSON.stringify({ file_path: "legacy.txt", content: "x" }) } }
    ];
    const routes = await mountWithSession({ sessions: { get: (id) => id === sessionId ? liveSession(sessionId, dir, events) : undefined, list: () => [] } });
    const response = await callApi(routes, "details", { sessionId });
    assert.deepEqual(response.body.value.files, [{ path: resolve(dir, "legacy.txt"), tool: "write" }]);
  } finally {
    await rm(dir, { recursive: true, force: true });
  }
});

test("delete-file accepts a code-run-produced file and still refuses unknown paths", async () => {
  const dir = await makeProject();
  try {
    const produced = join(dir, "produced.txt");
    const bystander = join(dir, "bystander.txt");
    await writeFile(produced, "produced");
    await writeFile(bystander, "bystander");
    const sessionId = "session-delete";
    const events = [
      { type: "tool/ptc-dispatch-start", data: { subCallId: "c1:ptc:1", name: "write", arguments: { file_path: "produced.txt" } } }
    ];
    const routes = await mountWithSession({
      sessions: { get: (id) => id === sessionId ? liveSession(sessionId, dir, events) : undefined, list: () => [] },
      workspaceRegistry: { list: () => [{ path: dir }] },
    });

    const refused = await callApi(routes, "delete-file", { sessionId, path: bystander });
    assert.equal(refused.status, 403);
    assert.equal(refused.body.error.code, "not-produced-file");

    const deleted = await callApi(routes, "delete-file", { sessionId, path: produced });
    assert.equal(deleted.status, 200);
    assert.equal(deleted.body.value.deleted, true);
    await assert.rejects(stat(produced));
  } finally {
    await rm(dir, { recursive: true, force: true });
  }
});
