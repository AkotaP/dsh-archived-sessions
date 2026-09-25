/**
 * Offline test harness for dsh-archived-sessions.
 *
 * The plugin ships as built artifacts — a Node ESM host half (`lib/index.js`) and a
 * browser bundle (`lib/client.js`) that expects `window.__ModuleLoader__`, React and
 * the DSH client primitives. This harness stands in for all of that: a stub module
 * graph, a minimal React runtime (hooks + JSX elements) and a tiny renderer, so both
 * halves can be exercised in plain `node --test` with no DSH and no browser.
 */
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import vm from "node:vm";

/** Repository root (two levels above `test/support/`). */
export const ROOT = dirname(dirname(dirname(fileURLToPath(import.meta.url))));

/** Absolute path of a repository file. */
export const repoPath = (...parts) => join(ROOT, ...parts);

/** Read a repository file as UTF-8. */
export const readRepo = (...parts) => readFileSync(repoPath(...parts), "utf8");

//#region timer policy
/**
 * The settings section schedules a 60s ticker so relative timestamps refresh; the
 * harness never unmounts components, so an un-cleared interval would keep the test
 * process alive forever. Intervals become no-ops; `setTimeout` stays real because
 * the tests assert the transient save notice.
 */
globalThis.setInterval = () => 0;
globalThis.clearInterval = () => {};

//#region jsx runtime stub
const FRAGMENT = Symbol.for("react.fragment");
const jsx = (type, config, key) => ({ __el: true, type, key: key ?? config?.key, props: config ?? {} });
const jsxRuntime = { jsx, jsxs: jsx, Fragment: FRAGMENT };
/** Whether a value is an element produced by the stub jsx runtime. */
export const isElement = (value) => value !== null && typeof value === "object" && value.__el === true;
//#endregion

//#region mini react
const sameDeps = (a, b) => a !== undefined && b !== undefined && a.length === b.length && a.every((v, i) => Object.is(v, b[i]));

/** One component instance: hook slots plus pending effects. */
export function createInstance() {
  return { slot: 0, state: {}, effects: {}, refs: {}, memos: {}, pending: [] };
}

let currentInstance = null;
const baseReact = {
  useState(init) {
    const instance = currentInstance;
    const index = instance.slot++;
    if (!(index in instance.state)) instance.state[index] = typeof init === "function" ? init() : init;
    return [instance.state[index], (next) => { instance.state[index] = typeof next === "function" ? next(instance.state[index]) : next; }];
  },
  useReducer(reducer, init, lazy) {
    const instance = currentInstance;
    const index = instance.slot++;
    if (!(index in instance.state)) instance.state[index] = lazy ? lazy(init) : init;
    return [instance.state[index], (action) => { instance.state[index] = reducer(instance.state[index], action); }];
  },
  useRef(init) {
    const instance = currentInstance;
    const index = instance.slot++;
    if (!(index in instance.refs)) instance.refs[index] = { current: init };
    return instance.refs[index];
  },
  useEffect(fn, deps) {
    const instance = currentInstance;
    const index = instance.slot++;
    if (!instance.effects[index] || !sameDeps(instance.effects[index], deps)) {
      instance.effects[index] = deps;
      instance.pending.push(fn);
    }
  },
  useLayoutEffect(fn, deps) { baseReact.useEffect(fn, deps); },
  useMemo(fn, deps) {
    const instance = currentInstance;
    const index = instance.slot++;
    const previous = instance.memos[index];
    if (!previous || !sameDeps(previous.deps, deps)) instance.memos[index] = { deps, value: fn() };
    return instance.memos[index].value;
  },
  useCallback(fn, deps) { return baseReact.useMemo(() => fn, deps); },
  useSyncExternalStore(_subscribe, getSnapshot) { currentInstance.slot++; return getSnapshot(); },
  memo: (component) => component,
  forwardRef: (component) => component,
  createContext: () => ({ Provider: (props) => props.children, Consumer: () => null }),
};
const react = new Proxy(baseReact, {
  get(target, key) {
    if (key in target) return target[key];
    if (typeof key === "string" && key.startsWith("use")) return () => undefined;
    return undefined;
  },
});

/** Stub `@deepseek-ai/dsh-client-ui-primitives`: every export is a real component
 * that forwards its props (and a `__stub` marker) into a plain `div`. */
export function createPrimitives() {
  const cache = new Map();
  return new Proxy({}, {
    get(_target, name) {
      if (typeof name === "symbol") return undefined;
      const key = String(name);
      if (!cache.has(key)) cache.set(key, (props) => jsx("div", { ...props, __stub: key }));
      return cache.get(key);
    },
    has: () => true,
  });
}
//#endregion

//#region rendering
/** Render one component instance, running the effects scheduled during that pass. */
export function renderComponent(instance, Component, props) {
  const previous = currentInstance;
  currentInstance = instance;
  instance.slot = 0;
  let tree;
  try { tree = Component(props); } finally { currentInstance = previous; }
  const pending = instance.pending;
  instance.pending = [];
  for (const fn of pending) {
    try { fn(); } catch { /* an effect that throws must not abort the assertion run */ }
  }
  return tree;
}

/** Flatten an element tree into every element it renders (nested components included). */
export function collect(node, out = []) {
  if (node === null || node === undefined) return out;
  if (Array.isArray(node)) { for (const child of node) collect(child, out); return out; }
  if (typeof node !== "object" || !node.__el) return out;
  out.push(node);
  if (typeof node.type === "function") collect(renderComponent(createInstance(), node.type, node.props), out);
  else collect(node.props?.children, out);
  return out;
}

/** Every string reachable in an element tree. */
export function collectStrings(node, out = []) {
  if (typeof node === "string") { out.push(node); return out; }
  if (node === null || node === undefined || typeof node !== "object") return out;
  if (Array.isArray(node)) { for (const child of node) collectStrings(child, out); return out; }
  if (node.__el) collectStrings(node.props?.children, out);
  return out;
}

/** Every string reachable from a set of elements (their props' children). */
export const textOf = (elements) => collectStrings({ __el: true, props: { children: elements.map((el) => el.props.children) } });

/** First element matching a predicate. */
export const findElement = (elements, predicate) => elements.find(predicate);

/** Class-name helpers for the plugin's generated classes. */
export const hasClass = (element, suffix) => typeof element.props.className === "string" && element.props.className.split(/\s+/).some((name) => name.endsWith(suffix));
//#endregion

//#region plugin loading
/** Load a fresh instance of the client half (module state is per call). */
export function loadClient() {
  const source = readRepo("lib", "client.js");
  let captured;
  globalThis.window = { __ModuleLoader__: { load: (options) => { captured = options; } } };
  vm.runInThisContext(source, { filename: "lib/client.js" });
  if (captured === undefined) throw new Error("lib/client.js did not call window.__ModuleLoader__.load");
  const primitives = createPrimitives();
  const requireStub = (id) => id === "react/jsx-runtime" ? jsxRuntime
    : id === "react" ? react
      : id === "@deepseek-ai/dsh-client-ui-primitives" ? primitives
        : new Proxy({}, { get: () => undefined });
  return captured.factory(requireStub);
}

/** Load a fresh instance of the host half. */
export function loadHost(cacheBust = String(Date.now())) {
  return import("file:///" + repoPath("lib", "index.js").replace(/\\/g, "/") + "?t=" + cacheBust);
}
//#endregion

//#region client context
/**
 * A client-side cordis context double.
 * @param options.form - shared settings form double (omit for "service missing").
 * @param options.declared - whether `ctx.configForms` is reachable (property read).
 * @param options.guarded - emulate the browser facade: the property read throws.
 * @param options.sessions - snapshot for `useSessions`-style reads is supplied by the caller via props.
 */
export function makeClientContext({ form, declared = true, guarded = false } = {}) {
  const slots = new Map();
  const ctx = {
    locale: { register: () => {}, bind: () => (key) => key },
    effect: (fn) => { fn(); return () => {}; },
    get: () => undefined,
    sessions: {},
    workspaces: {},
    slots: {
      inject: (_name, callback) => callback(),
      register: (options, component) => { slots.set(options.name, { options, component }); return () => {}; },
    },
  };
  if (guarded) Object.defineProperty(ctx, "configForms", { get() { throw new Error('cannot get property "configForms" without inject'); } });
  else if (declared && form !== undefined) ctx.configForms = { get: () => form };
  return { ctx, slots };
}

/** A settings-form double matching `ConfigFormController`'s public surface. */
export function makeConfigForm(initial, options = {}) {
  const listeners = new Set();
  let snapshot = {
    status: options.status ?? "ready",
    value: initial,
    base: initial,
    user: initial,
    revision: 1,
    writable: options.writable !== false,
    mode: options.mode ?? "host",
  };
  const form = {
    /** Every `set(field, value)` call, in order. */
    setCalls: [],
    getSnapshot: () => snapshot,
    subscribe: (listener) => { listeners.add(listener); return () => listeners.delete(listener); },
    set: (field, value) => {
      form.setCalls.push([field, value]);
      if (options.reject) return Promise.reject(new Error(options.reject));
      if (options.refuse) return Promise.resolve(false);
      return Promise.resolve(true);
    },
    /** Simulate the Host pushing a new document revision. */
    push(value) {
      snapshot = { ...snapshot, value, revision: snapshot.revision + 1 };
      for (const listener of [...listeners]) listener();
    },
  };
  return form;
}
//#endregion

//#region fetch + host API doubles
/** Install a fetch double for the plugin's `/archived/api/*` calls. */
export function installFetch(value = { rows: [], sessions: [], archived: [], files: [], dirs: [], counts: {}, details: {} }) {
  const calls = [];
  globalThis.fetch = async (url, init) => {
    const method = String(url).split("/").pop();
    calls.push([method, init?.body ? JSON.parse(init.body) : undefined]);
    return { ok: true, status: 200, json: async () => ({ ok: true, value }) };
  };
  return calls;
}

/** A host-side cordis context double that records the `/archived/api` route. */
export function makeHostContext(services = {}) {
  const routes = [];
  const ctx = {
    effect: (fn) => { fn(); return () => {}; },
    get: (name) => name === "webServer"
      ? { register: (options) => { routes.push(options); return () => {}; } }
      : services[name],
  };
  return { ctx, routes };
}

/** Call the recorded `/archived/api` route with a JSON body. */
export async function callApi(routes, method, body, headers = {}) {
  const route = routes.find((entry) => entry.kind === "prefix" && entry.path === "/archived/api");
  if (route === undefined) throw new Error("the plugin registered no /archived/api route");
  const payload = Buffer.from(JSON.stringify(body ?? {}));
  const request = {
    method: "POST",
    url: "/archived/api/" + method,
    headers: { host: "127.0.0.1:19387", "content-type": "application/json", ...headers },
    async *[Symbol.asyncIterator]() { yield payload; },
  };
  let status = 0;
  let text = "";
  const response = { writeHead: (code) => { status = code; }, end: (chunk) => { text = chunk; } };
  await route.handler(request, response);
  return { status, body: text === "" ? undefined : JSON.parse(text) };
}
//#endregion

export { FRAGMENT as Fragment, jsx };
