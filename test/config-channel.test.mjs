/**
 * The settings channel: the host `Config` must stay volatile-field shaped (that is the
 * only shape dsh-settings projects and accepts writes for), and the client must read and
 * write it through `ctx.configForms` while surfacing every failure in the Settings tab.
 */
import assert from "node:assert/strict";
import test from "node:test";
import {
  collect, createInstance, findElement, hasClass, installFetch, loadClient, loadHost,
  makeClientContext, makeConfigForm, readRepo, renderComponent,
} from "./support/harness.mjs";

const T = (key) => key;
const useSessions = (selector) => selector({ byId: {} });
const useWorkspaces = (selector) => selector({});
const sectionProps = { useSessions, useWorkspaces, refresh: () => {}, t: T };
const ENTRY_SWITCHES = ["deleteInHeader", "deleteInSidebar", "deleteInMenu"];
/** The three delete entry points plus the delete-dialog option-memory switch. */
const SWITCHES = [...ENTRY_SWITCHES, "rememberDeleteOptions"];

// Faithful copies of the helpers dsh-settings uses to decide what is editable.
const makeSchemaHelpers = (z) => {
  const plainSchema = (schema) => {
    const result = new z(schema.toJSON());
    const walk = (node) => {
      delete node.meta.volatile;
      for (const child of Object.values(node.dict ?? {})) walk(child);
      if (node.inner) walk(node.inner);
      for (const child of node.list ?? []) walk(child);
    };
    walk(result);
    return result;
  };
  const volatileForm = (schema) => {
    if (schema.meta?.volatile) return plainSchema(schema);
    if (schema.type !== "object") return undefined;
    const dict = Object.fromEntries(Object.entries(schema.dict ?? {}).flatMap(([key, child]) => {
      const field = volatileForm(child);
      return field === undefined ? [] : [[key, field]];
    }));
    return Object.keys(dict).length === 0 ? undefined : z.object(dict);
  };
  const projectForm = (schema, value) => {
    if (schema.type === "object" && value !== null && typeof value === "object") {
      return Object.fromEntries(Object.entries(schema.dict ?? {}).flatMap(([key, child]) => {
        const field = Reflect.get(value, key);
        return field === undefined ? [] : [[key, projectForm(child, field)]];
      }));
    }
    return value;
  };
  const isVolatilePath = (schema, path) => {
    if (schema.meta?.volatile) return true;
    const [key, ...rest] = path;
    const child = key === undefined ? undefined : schema.dict?.[key];
    return child !== undefined && isVolatilePath(child, rest);
  };
  /** dsh-settings unwraps volatile values (`Volatile.get()`) before projecting. */
  const plainConfig = (value) => typeof value?.get === "function" ? plainConfig(value.get())
    : Array.isArray(value) ? value.map(plainConfig)
      : value !== null && typeof value === "object" ? Object.fromEntries(Object.entries(value).map(([key, child]) => [key, plainConfig(child)]))
        : value;
  return { plainSchema, volatileForm, projectForm, isVolatilePath, plainConfig };
};

test("the host Config stays projectable and writable through the settings document", async () => {
  const schemastery = await import("@deepseek-ai/schemastery");
  const z = schemastery.default ?? schemastery;
  const host = await loadHost("config-channel");
  const { volatileForm, projectForm, isVolatilePath, plainConfig } = makeSchemaHelpers(z);
  const Config = host.Config;

  assert.deepEqual(Object.keys(Config.dict), SWITCHES, "the three switches must be declared");
  for (const field of SWITCHES) {
    assert.equal(Config.dict[field].meta?.volatile, true, field + " must be volatile: dsh-settings only projects volatile fields");
  }
  const parsed = Config({});
  assert.equal(parsed.deleteInHeader.get(), false);
  assert.equal(parsed.deleteInSidebar.get(), true, "only the sidebar row button starts on");
  assert.equal(parsed.deleteInMenu.get(), false);
  assert.equal(parsed.rememberDeleteOptions.get(), false, "the option memory starts off");

  const form = volatileForm(Config);
  assert.ok(form !== undefined, "the entry must appear in the settings document");
  assert.deepEqual(Object.keys(form.dict), SWITCHES);
  for (const field of SWITCHES) assert.equal(isVolatilePath(Config, [field]), true);
  assert.equal(isVolatilePath(Config, ["nope"]), false, "unknown fields stay unwritable");

  const value = projectForm(form, plainConfig({ deleteInHeader: { get: () => true }, deleteInSidebar: { get: () => false }, deleteInMenu: { get: () => true }, rememberDeleteOptions: { get: () => true } }));
  assert.deepEqual(value, { deleteInHeader: true, deleteInSidebar: false, deleteInMenu: true, rememberDeleteOptions: true }, "the client receives plain booleans");
  assert.deepEqual(new z(form.toJSON())(value), value, "the client can rehydrate the schema and validate the value");
});

test("the client adopts the host document and writes one field per toggle", async () => {
  installFetch();
  const plugin = loadClient();
  const form = makeConfigForm({ deleteInHeader: true, deleteInSidebar: false, deleteInMenu: true });
  const { ctx, slots } = makeClientContext({ form });
  plugin.apply(ctx);

  assert.notEqual(renderComponent(createInstance(), slots.get("conversation.session.header.actions").component, { sessionId: "s1", t: T, useSessions }), null, "the header entry is on in this document");
  assert.equal(renderComponent(createInstance(), slots.get("sidebar.workspaces.session.row.action").component, { sessionId: "s1", t: T, useSessions }), null, "the sidebar button is off in this document");

  const instance = createInstance();
  let elements = collect(renderComponent(instance, slots.get("settings.section").component, sectionProps));
  assert.deepEqual(elements.filter((el) => hasClass(el, "aRchv_settingsStatus")), [], "a healthy read shows no status line");
  findElement(elements, (el) => el.props.role === "tab" && el.props.children === "tab.settings").props.onClick();
  elements = collect(renderComponent(instance, slots.get("settings.section").component, sectionProps));
  const rows = elements.filter((el) => hasClass(el, "aRchv_settingsRow"));
  assert.equal(rows.length, 4, "three entry switches plus the option-memory switch");
  const boxes = rows.map((row) => row.props.children[0]);
  assert.deepEqual(boxes.map((box) => box.props.checked), [true, false, true, false]);

  boxes[1].props.onChange({ target: { checked: true } });
  await new Promise((resolve) => setTimeout(resolve, 20));
  assert.deepEqual(form.setCalls, [["deleteInSidebar", true]], "one toggle submits exactly one field write");
  let status = collect(renderComponent(instance, slots.get("settings.section").component, sectionProps)).filter((el) => hasClass(el, "aRchv_settingsStatus"));
  assert.equal(status.length, 1);
  assert.equal(hasClass(status[0], "aRchv_settingsStatusOk"), true, "an accepted save flashes the green line");

  await new Promise((resolve) => setTimeout(resolve, 2600));
  status = collect(renderComponent(instance, slots.get("settings.section").component, sectionProps)).filter((el) => hasClass(el, "aRchv_settingsStatus"));
  assert.deepEqual(status, [], "the green line auto-hides instead of becoming a permanent note");

  boxes[3].props.onChange({ target: { checked: true } });
  await new Promise((resolve) => setTimeout(resolve, 20));
  assert.deepEqual(form.setCalls, [["deleteInSidebar", true], ["rememberDeleteOptions", true]], "the option-memory switch writes its own volatile field");
});

test("write failures and an unserved namespace are surfaced in red", async () => {
  const cases = [
    { name: "refused", form: makeConfigForm({}, { refuse: true }), expect: "settings.saveRefused", className: "aRchv_settingsStatusError" },
    { name: "rejected", form: makeConfigForm({}, { reject: "conflict: stale revision" }), expect: "stale revision", className: "aRchv_settingsStatusError" },
    { name: "unavailable", form: makeConfigForm(undefined, { status: "unavailable", writable: false }), expect: "settings.unavailable", className: "aRchv_settingsStatusError" },
  ];
  for (const scenario of cases) {
    installFetch();
    const plugin = loadClient();
    const { ctx, slots } = makeClientContext({ form: scenario.form });
    plugin.apply(ctx);
    const instance = createInstance();
    let elements = collect(renderComponent(instance, slots.get("settings.section").component, sectionProps));
    findElement(elements, (el) => el.props.role === "tab" && el.props.children === "tab.settings").props.onClick();
    elements = collect(renderComponent(instance, slots.get("settings.section").component, sectionProps));
    if (scenario.name !== "unavailable") {
      const box = elements.filter((el) => hasClass(el, "aRchv_settingsRow")).map((row) => row.props.children[0])[0];
      box.props.onChange({ target: { checked: true } });
      await new Promise((resolve) => setTimeout(resolve, 20));
      elements = collect(renderComponent(instance, slots.get("settings.section").component, sectionProps));
    }
    const status = elements.filter((el) => hasClass(el, "aRchv_settingsStatus"));
    assert.equal(status.length, 1, scenario.name + ": expected one status line");
    assert.equal(hasClass(status[0], scenario.className), true, scenario.name + ": expected the red variant");
    const text = collect(status[0].props.children).map((el) => el.props?.children).concat(status[0].props.children).join(" ");
    assert.ok(text.includes(scenario.expect), scenario.name + ": got " + text);
  }
});

test("a missing settings service warns but never blocks the plugin", () => {
  installFetch();
  const plugin = loadClient();
  const { ctx, slots } = makeClientContext({ form: undefined });
  plugin.apply(ctx);
  assert.equal(slots.size, 5, "slots must still register");
  const instance = createInstance();
  let elements = collect(renderComponent(instance, slots.get("settings.section").component, sectionProps));
  findElement(elements, (el) => el.props.role === "tab" && el.props.children === "tab.settings").props.onClick();
  elements = collect(renderComponent(instance, slots.get("settings.section").component, sectionProps));
  const status = elements.filter((el) => hasClass(el, "aRchv_settingsStatus"));
  assert.equal(status.length, 1);
  assert.equal(hasClass(status[0], "aRchv_settingsStatusError"), true);
  assert.notEqual(renderComponent(createInstance(), slots.get("sidebar.workspaces.session.row.action").component, { sessionId: "s1", t: T, useSessions }), null, "defaults still apply");
});

test("the manifest keeps the dependency and client declarations the channel needs", () => {
  const pkg = JSON.parse(readRepo("package.json"));
  assert.match(pkg.dependencies["@deepseek-ai/schemastery"] ?? "", /^\^?3\.18\.[4-9]/, "the DSH fork with .volatile() is required");
  assert.equal(pkg.dependencies.schemastery, undefined, "the upstream package has no .volatile()");
  assert.ok(pkg.dsh.client.inject.includes("@deepseek-ai/dsh-client-ui-settings"), "the client needs the settings package composed");
  assert.ok(pkg.engines?.dsh, "engines.dsh gates the core version");
  assert.deepEqual(pkg.peerDependencies, { "@deepseek-ai/cordis": "^4.0.1" }, "only the framework is a peer; everything else is composed by the Host");
  assert.equal(pkg.dependencies["@deepseek-ai/schemastery"] !== undefined, true, "host-side imports must be real dependencies");
});
