/**
 * Surface contracts of the client half: which slots it fills, how the three delete
 * entry points behave, that the confirm dialog survives the menu unmounting, the
 * grouping view, and the styles the delete affordances depend on.
 */
import assert from "node:assert/strict";
import test from "node:test";
import {
  collect, createInstance, findElement, hasClass, installFetch, isElement, loadClient, makeClientContext,
  makeConfigForm, readRepo, renderComponent, textOf,
} from "./support/harness.mjs";

const T = (key) => key;
const useSessions = (selector) => selector({ byId: {} });
const useWorkspaces = (selector) => selector({});
const sectionProps = { useSessions, useWorkspaces, refresh: () => {}, t: T };

/** Mount the client half with every switch on unless told otherwise. */
const mount = (value = { deleteInHeader: true, deleteInSidebar: true, deleteInMenu: true }) => {
  installFetch();
  const plugin = loadClient();
  const form = makeConfigForm(value);
  const { ctx, slots } = makeClientContext({ form });
  plugin.apply(ctx);
  const component = (name) => slots.get(name).component;
  return { plugin, slots, form, component };
};

const renderSlot = (component, props) => collect(renderComponent(createInstance(), component, props));

test("declares the three delete entry points and the frame-wide dialog", () => {
  const { plugin, slots } = mount();
  assert.deepEqual([...slots.keys()].sort(), [
    "conversation.session.header.actions",
    "settings.section",
    "shell.overlay",
    "sidebar.workspaces.session.menu.item",
    "sidebar.workspaces.session.row.action",
  ]);
  assert.ok(plugin.inject.includes("configForms"), "the settings service must be declared on the plugin");
  assert.equal(slots.get("sidebar.workspaces.session.menu.item").options.order, 450);
  assert.equal(slots.get("shell.overlay").options.id, "archived-sessions-delete-confirm");
  assert.equal(slots.get("shell.overlay").options.order, 200);
});

test("the menu row is a destructive row and carries no dialog of its own", () => {
  const { component } = mount();
  const elements = renderSlot(component("sidebar.workspaces.session.menu.item"), {
    sessionId: "s1", t: T, useSessions, useMenuOpenState: () => [true, () => {}],
  });
  const row = findElement(elements, (el) => el.props.separatorBefore === true);
  assert.ok(row, "expected a menu row separated from the shipped group");
  assert.equal(row.props.danger, true);
  assert.ok(row.props.icon, "the row should carry the trash icon");
  assert.equal(row.props.children, "headerDelete");
  assert.equal(typeof row.props.onSelect, "function");
  assert.equal(findElement(elements, (el) => el.props.__stub === "Modal"), undefined, "a dialog inside the menu would unmount with it");
});

test("selecting the menu row closes the menu, and the dialog then deletes", async () => {
  const deleted = installFetch();
  const plugin = loadClient();
  const { ctx, slots } = makeClientContext({ form: makeConfigForm({ deleteInHeader: true, deleteInSidebar: true, deleteInMenu: true }) });
  plugin.apply(ctx);
  const menuOpenCalls = [];
  const menuElements = renderSlot(slots.get("sidebar.workspaces.session.menu.item").component, {
    sessionId: "s1", t: T, useSessions, useMenuOpenState: () => [true, (next) => menuOpenCalls.push(next)],
  });
  findElement(menuElements, (el) => el.props.separatorBefore === true).props.onSelect();
  assert.deepEqual(menuOpenCalls, [false], "the menu must close before the dialog opens");
  assert.deepEqual(deleted.filter(([method]) => method === "delete"), [], "nothing is deleted until the dialog confirms");

  const overlay = createInstance();
  renderComponent(overlay, slots.get("shell.overlay").component, { t: T, useSessions });
  const modal = findElement(collect(renderComponent(overlay, slots.get("shell.overlay").component, { t: T, useSessions })), (el) => el.props.__stub === "Modal");
  assert.equal(modal.props.open, true, "the dialog lives in shell.overlay so the menu unmount cannot take it");

  const footer = modal.props.footer.props.children;
  assert.equal(footer[0].props.children, "cancel");
  assert.equal(footer[1].props.children, "deleteConfirm");
  assert.ok(hasClass(footer[1], "aRchv_dangerButton"));
  footer[1].props.onClick();
  await new Promise((resolve) => setTimeout(resolve, 60));
  assert.deepEqual(deleted.filter(([method]) => method === "delete"), [
    ["delete", { sessionId: "s1", subagentIds: [], filePaths: [] }],
  ]);
  assert.equal(renderComponent(overlay, slots.get("shell.overlay").component, { t: T, useSessions }), null, "the request is cleared after a successful delete");
});

test("the settings page renders the entry switches, the option-memory switch and an always-on batch button", () => {
  const { component } = mount();
  const instance = createInstance();
  let elements = renderSlotFor(component("settings.section"), sectionProps, instance);
  const settingsTab = findElement(elements, (el) => el.props.role === "tab" && el.props.children === "tab.settings");
  settingsTab.props.onClick();
  elements = renderSlotFor(component("settings.section"), sectionProps, instance);
  const rows = elements.filter((el) => hasClass(el, "aRchv_settingsRow"));
  assert.equal(rows.length, 4, "three delete entry points plus the option-memory switch");
  assert.deepEqual(rows.slice(0, 3).map((row) => row.props.children[1].props.children[0].props.children), [
    "settings.deleteInHeader", "settings.deleteInSidebar", "settings.deleteInMenu",
  ]);
  const memoryRow = rows[3];
  assert.equal(memoryRow.props.children[1].props.children[0].props.children, "settings.rememberDeleteOptions");
  assert.equal(memoryRow.props.children[0].props.checked, false, "the option memory starts off");
  assert.equal(elements.filter((el) => hasClass(el, "aRchv_settingsSection")).length, 1, "the memory switch sits in its own section");
  const managerButton = findElement(elements, (el) => el.props.__stub === "Button" && el.props.children === "delete");
  assert.ok(managerButton, "this page's batch button is unconditional");
  assert.ok(!hasClass(managerButton, "aRchv_dangerButton"), "the toolbar button keeps its neutral style");
});

test("fresh install: only the sidebar row button is on", () => {
  const { component } = mount({ deleteInHeader: false, deleteInSidebar: true, deleteInMenu: false });
  assert.equal(renderComponent(createInstance(), component("conversation.session.header.actions"), { sessionId: "s1", t: T, useSessions }), null);
  assert.equal(renderComponent(createInstance(), component("sidebar.workspaces.session.menu.item"), { sessionId: "s1", t: T, useSessions, useMenuOpenState: () => [false, () => {}] }), null);
  assert.notEqual(renderComponent(createInstance(), component("sidebar.workspaces.session.row.action"), { sessionId: "s1", t: T, useSessions }), null);
});

test("grouping collapses per workspace on both list tabs", () => {
  const { component } = mount();
  const byId = { a1: { title: "Alpha", updatedAt: 3 }, a2: { title: "Beta", updatedAt: 2 }, z9: { title: "Zeta", updatedAt: 1 } };
  const workspaceState = { items: [{ workspaceId: "w1", title: "Proj A", sessionIds: ["a1", "a2"] }], archivedSessionIds: ["a2"], state: "ready", baselinesReady: true };
  const props = {
    useSessions: (selector) => selector({ byId, current: undefined, phase: "ready" }),
    useWorkspaces: (selector) => selector(workspaceState),
    refresh: () => {}, t: T,
  };
  const instance = createInstance();
  const isHeader = (el) => hasClass(el, "aRchv_groupHeader");
  let elements = collect(renderComponent(instance, component("settings.section"), props));
  assert.equal(elements.filter(isHeader).length, 2, "one header per workspace plus the ungrouped bucket");
  assert.equal(elements.filter(isHeader).every((el) => el.type === "button" && el.props["aria-expanded"] === true), true);

  elements.filter(isHeader)[0].props.onClick();
  elements = collect(renderComponent(instance, component("settings.section"), props));
  assert.ok(textOf(elements).includes("Zeta") && !textOf(elements).includes("Alpha"), "collapsing hides only that group");

  elements.filter(isHeader)[0].props.onClick();
  findElement(collect(renderComponent(instance, component("settings.section"), props)), (el) => el.props.role === "tab" && el.props.children === "tab.archived").props.onClick();
  elements = collect(renderComponent(instance, component("settings.section"), props));
  assert.equal(elements.filter(isHeader).length, 1, "the archived tab groups by workspace too");
  assert.ok(textOf(elements).includes("Beta"));
  findElement(elements, (el) => el.props.children === "view.flat").props.onClick();
  elements = collect(renderComponent(instance, component("settings.section"), props));
  assert.equal(elements.filter(isHeader).length, 0, "the flat view has no group headers");
  assert.ok(textOf(elements).includes("Beta"));
});

test("the delete affordances keep their styles and the entry id matches the bundle patch", () => {
  const source = readRepo("lib", "client.js");
  assert.ok(source.includes(".aRchv_rowDelete.aRchv_rowDelete:hover"), "doubled class so shipped rules of equal specificity cannot win");
  assert.ok(source.includes("--dsw-alias-interactive-bg-hover-danger"), "destructive hover fill");
  assert.ok(source.includes("for (const stale of document.querySelectorAll(selector)) stale.remove();"), "styles must be re-published on every load");
  assert.ok(source.includes(".aRchv_settingsStatusOk{color:var(--dsw-alias-state-success-primary)}"));
  assert.ok(source.includes(".aRchv_deleteOptionOff{"), "an option with nothing to delete is greyed out");
  assert.ok(source.includes(".aRchv_toggleSlot{"), "every row reserves the disclosure slot so a parent cannot be pushed off the baseline");
  assert.ok(source.includes(".aRchv_subagentRow{padding-left:20px;border-left:2px solid"), "the guide line rides the row's own level");
  assert.ok(source.includes("marginLeft: 9 + (depth - 1) * 16"), "each level owns one more 16px column");
  assert.ok(!source.includes("paddingLeft: 20 + (depth - 1) * 16"), "the old inline padding override is gone");
  assert.ok(source.includes(".aRchv_deleteOptionOn .aRchv_deleteOptionCount{"), "a checked option highlights its count");
  const entryId = /const DELETE_CONFIG_ID = "([^"]+)";/.exec(source)?.[1];
  const patch = readRepo("cordis.patch.yml");
  assert.ok(entryId, "the client must name the settings namespace it reads");
  assert.ok(patch.includes(`id: ${entryId}`), `cordis.patch.yml must mount the entry "${entryId}" the client configures`);
});

/** Open the overlay delete dialog through the header entry and let its details settle. */
async function openDeleteDialog({ byId, details, config = {}, install = installFetch, waitMs = 30 }) {
  const deleted = install(details);
  const plugin = loadClient();
  const form = makeConfigForm({ deleteInHeader: true, deleteInSidebar: true, deleteInMenu: true, ...config });
  const { ctx, slots } = makeClientContext({ form });
  plugin.apply(ctx);
  const useSessionsWith = (selector) => selector({ byId });
  const tCount = (key) => (key === "optionCount" ? "（{n}）" : key);
  const openRequest = () => {
    const header = collect(renderComponent(createInstance(), slots.get("conversation.session.header.actions").component, {
      sessionId: "s1", t: T, useSessions: useSessionsWith,
    }));
    findElement(header, (el) => el.type === "button" && el.props["aria-label"] === "headerDelete").props.onClick();
  };
  const instance = createInstance();
  const render = () => collect(renderComponent(instance, slots.get("shell.overlay").component, { t: tCount, useSessions: useSessionsWith }));
  openRequest();
  render(); // mounts the overlay entry, which starts collecting details
  await new Promise((resolve) => setTimeout(resolve, waitMs));
  return { deleted, form, render, openRequest };
}

/** The two fine-grained option rows of a rendered delete dialog. */
const optionRows = (elements) => elements.filter((el) => el.props["data-delete-option"] !== undefined);
/** The checkbox inside one option row. */
const optionInput = (row) => row.props.children[0].props.children[0];
/** The open modal element of a rendered dialog. */
const openModal = (elements) => elements.find((el) => el.props.__stub === "Modal" && el.props.open === true);

test("the delete dialog counts deletable items and greys out empty options", async () => {
  const withItems = await openDeleteDialog({
    byId: { s1: { title: "Parent" }, k1: { title: "Kid", origin: "subagent", parentId: "s1" } },
    details: { cwd: "E:/ws", files: [{ path: "E:/ws/out/report.md" }] },
  });
  let elements = withItems.render();
  let rows = optionRows(elements);
  assert.deepEqual(rows.map((row) => row.props["data-delete-option"]), ["subagents", "files"]);
  assert.deepEqual(rows.map((row) => row.props["data-count"]), ["1", "1"], "each option counts what it would delete");
  assert.deepEqual(rows.map((row) => row.props.children[0].props.children[2].props.children), ["（1）", "（1）"], "the count is visible next to the label");
  assert.equal(rows.every((row) => !hasClass(row, "aRchv_deleteOptionOff")), true, "an option with items stays actionable");
  assert.equal(rows.every((row) => optionInput(row).props.disabled === false), true);

  const empty = await openDeleteDialog({ byId: { s1: { title: "Solo" } }, details: { cwd: "E:/ws", files: [] } });
  elements = empty.render();
  rows = optionRows(elements);
  assert.deepEqual(rows.map((row) => row.props["data-count"]), ["0", "0"]);
  assert.equal(rows.every((row) => hasClass(row, "aRchv_deleteOptionOff")), true, "nothing to delete greys the option out");
  assert.equal(rows.every((row) => optionInput(row).props.disabled === true), true, "and disables its toggle");
  assert.equal(rows.every((row) => row.props.children[0].props.title === "optionEmpty"), true, "with the reason on hover");
});

test("the option memory restores the last subagent and file choices when enabled", async () => {
  const scenario = {
    byId: { s1: { title: "Parent" }, k1: { title: "Kid", origin: "subagent", parentId: "s1" } },
    details: { cwd: "E:/ws", files: [{ path: "E:/ws/out/report.md" }] },
  };
  const cycle = async (remember) => {
    const dialog = await openDeleteDialog({ ...scenario, config: { rememberDeleteOptions: remember } });
    let elements = dialog.render();
    const rows = () => optionRows(elements);
    assert.equal(rows().every((row) => optionInput(row).props.checked === false), true, "a fresh dialog starts unchecked");
    optionInput(rows()[0]).props.onChange({ target: { checked: true } });
    elements = dialog.render();
    optionInput(rows()[1]).props.onChange({ target: { checked: true } });
    elements = dialog.render();
    assert.equal(rows().every((row) => hasClass(row, "aRchv_deleteOptionOn")), true, "checked options get the highlighted style");
    openModal(elements).props.footer.props.children[0].props.onClick(); // cancel
    assert.deepEqual(dialog.render(), [], "cancelling closes the overlay entry");
    dialog.openRequest();
    dialog.render();
    await new Promise((resolve) => setTimeout(resolve, 30));
    elements = dialog.render();
    return rows().map((row) => optionInput(row).props.checked);
  };
  assert.deepEqual(await cycle(true), [true, true], "memory on: the previous choices come back");
  assert.deepEqual(await cycle(false), [false, false], "memory off: the dialog resets to unchecked");
});

test("a greyed-out option still shows the remembered check", async () => {
  const byId = { s1: { title: "Parent" }, k1: { title: "Kid", origin: "subagent", parentId: "s1" } };
  const details = { cwd: "E:/ws", files: [{ path: "E:/ws/out/report.md" }] };
  const dialog = await openDeleteDialog({ byId, details, config: { rememberDeleteOptions: true } });
  let elements = dialog.render();
  optionInput(optionRows(elements)[0]).props.onChange({ target: { checked: true } });
  elements = dialog.render();
  openModal(elements).props.footer.props.children[0].props.onClick(); // cancel
  assert.deepEqual(dialog.render(), []);

  delete byId.k1; // the next dialog has nothing to delete at all
  details.files.length = 0;
  dialog.openRequest();
  dialog.render();
  await new Promise((resolve) => setTimeout(resolve, 30));
  elements = dialog.render();
  const rows = optionRows(elements);
  assert.deepEqual(rows.map((row) => row.props["data-count"]), ["0", "0"]);
  assert.equal(hasClass(rows[0], "aRchv_deleteOptionOff"), true, "nothing to delete greys the option out");
  assert.equal(optionInput(rows[0]).props.disabled, true, "and disables its toggle");
  assert.equal(optionInput(rows[0]).props.checked, true, "the remembered check survives the grey-out");
  assert.equal(optionInput(rows[1]).props.checked, false, "an option that was never checked stays unchecked");
});

test("the dialog reads every session's details concurrently", async () => {
  let inFlight = 0;
  let peak = 0;
  let calls = 0;
  const install = () => {
    globalThis.fetch = async () => {
      calls++;
      inFlight++;
      peak = Math.max(peak, inFlight);
      await new Promise((resolve) => setTimeout(resolve, 15));
      inFlight--;
      return { ok: true, status: 200, json: async () => ({ ok: true, value: { cwd: "E:/ws", files: [] } }) };
    };
    return [];
  };
  const byId = { s1: { title: "Parent" } };
  for (let i = 0; i < 5; i++) byId["k" + i] = { title: "Kid " + i, origin: "subagent", parentId: "s1" };
  const dialog = await openDeleteDialog({ byId, details: { cwd: "E:/ws", files: [] }, install });
  const elements = dialog.render();
  assert.equal(calls, 6, "one details read per session (parent + five subagents)");
  assert.ok(peak > 1, "the reads overlap, so subagents no longer cost one round-trip each");
  assert.deepEqual(optionRows(elements).map((row) => row.props["data-count"]), ["5", "0"]);
});

test("the file option lights up as soon as one file is found", async () => {
  const install = () => {
    globalThis.fetch = async (url, init) => {
      const payload = init?.body ? JSON.parse(init.body) : {};
      const slow = payload.sessionId !== "s1";
      if (slow) await new Promise((resolve) => setTimeout(resolve, 300));
      const value = slow ? { cwd: "E:/ws", files: [] } : { cwd: "E:/ws", files: [{ path: "E:/ws/out/a.md" }] };
      return { ok: true, status: 200, json: async () => ({ ok: true, value }) };
    };
    return [];
  };
  const byId = {
    s1: { title: "Parent" },
    k1: { title: "Kid", origin: "subagent", parentId: "s1" },
    k2: { title: "Kid 2", origin: "subagent", parentId: "s1" },
  };
  const dialog = await openDeleteDialog({ byId, details: {}, install, waitMs: 5 });
  let rows = optionRows(dialog.render());
  assert.deepEqual(rows.map((row) => row.props["data-count"]), ["2", "1"], "the parent's file is counted before the subagents answer");
  assert.equal(hasClass(rows[1], "aRchv_deleteOptionOff"), false, "one file is enough to stop greying the option out");
  assert.equal(optionInput(rows[1]).props.disabled, false, "and to make it usable right away");
  assert.equal(rows[1].props.children[0].props.children[2].props.children, "（1）", "the count is already the real one");

  await new Promise((resolve) => setTimeout(resolve, 500));
  rows = optionRows(dialog.render());
  assert.deepEqual(rows.map((row) => row.props["data-count"]), ["2", "1"], "later responses only settle the count");
  assert.equal(hasClass(rows[1], "aRchv_deleteOptionOff"), false);
});

test("an empty file set stays greyed but swaps the placeholder for the settled count", async () => {
  const install = () => {
    globalThis.fetch = async (url, init) => {
      const payload = init?.body ? JSON.parse(init.body) : {};
      if (payload.sessionId !== "s1") await new Promise((resolve) => setTimeout(resolve, 150));
      return { ok: true, status: 200, json: async () => ({ ok: true, value: { cwd: "E:/ws", files: [] } }) };
    };
    return [];
  };
  const byId = { s1: { title: "Parent" }, k1: { title: "Kid", origin: "subagent", parentId: "s1" } };
  const dialog = await openDeleteDialog({ byId, details: {}, install, waitMs: 5 });
  let rows = optionRows(dialog.render());
  assert.equal(rows[1].props.children[0].props.children[2].props.children, "（…）", "an unknown count shows as a placeholder");
  assert.equal(hasClass(rows[1], "aRchv_deleteOptionOff"), true, "and the option stays greyed while unknown");

  await new Promise((resolve) => setTimeout(resolve, 350));
  rows = optionRows(dialog.render());
  assert.equal(rows[1].props.children[0].props.children[2].props.children, "（0）", "the settled count replaces the placeholder");
  assert.equal(hasClass(rows[1], "aRchv_deleteOptionOff"), true, "still greyed because there really is nothing to delete");
});

test("confirming before the scan settles still deletes the files found later", async () => {
  const calls = [];
  const install = () => {
    globalThis.fetch = async (url, init) => {
      const method = String(url).split("/").pop();
      const payload = init?.body ? JSON.parse(init.body) : {};
      calls.push([method, payload]);
      if (method === "details") {
        const slow = payload.sessionId === "k1";
        if (slow) await new Promise((resolve) => setTimeout(resolve, 150));
        const value = slow
          ? { cwd: "E:/ws", files: [{ path: "E:/ws/out/b.md" }] }
          : { cwd: "E:/ws", files: [{ path: "E:/ws/out/a.md" }] };
        return { ok: true, status: 200, json: async () => ({ ok: true, value }) };
      }
      return { ok: true, status: 200, json: async () => ({ ok: true, value: { sessionId: payload.sessionId } }) };
    };
    return calls;
  };
  const byId = { s1: { title: "Parent" }, k1: { title: "Kid", origin: "subagent", parentId: "s1" } };
  const dialog = await openDeleteDialog({ byId, details: {}, config: { rememberDeleteOptions: true }, install, waitMs: 5 });

  // prime the option memory ("files" remembered as checked), then close
  let elements = dialog.render();
  optionInput(optionRows(elements)[1]).props.onChange({ target: { checked: true } });
  elements = dialog.render();
  openModal(elements).props.footer.props.children[0].props.onClick(); // cancel
  assert.deepEqual(dialog.render(), []);
  calls.length = 0;

  dialog.openRequest();
  dialog.render();
  await new Promise((resolve) => setTimeout(resolve, 5));
  assert.equal(optionRows(dialog.render())[1].props["data-count"], "1", "only the first file is known when confirm is clicked");
  openModal(dialog.render()).props.footer.props.children[1].props.onClick();

  await new Promise((resolve) => setTimeout(resolve, 300));
  const deletion = calls.find(([method]) => method === "delete");
  assert.ok(deletion, "the deletion still goes out");
  assert.deepEqual(deletion[1].filePaths, ["E:/ws/out/a.md", "E:/ws/out/b.md"], "the file discovered after the click is still deleted");
});

/** Render a slot component through a persistent instance (state survives calls). */
function renderSlotFor(component, props, instance) {
  return collect(renderComponent(instance, component, props));
}

test("re-expanding a row revalidates the cached detail snapshot", async () => {
  const { component } = mount();
  const calls = [];
  globalThis.fetch = async (url, init) => {
    const payload = init?.body ? JSON.parse(init.body) : {};
    calls.push([String(url).split("/").pop(), payload.sessionId]);
    return { ok: true, status: 200, json: async () => ({ ok: true, value: { cwd: "E:/ws", files: [{ path: "E:/ws/a.md" }] } }) };
  };
  const byId = { s1: { title: "One", updatedAt: 2 } };
  const props = {
    useSessions: (selector) => selector({ byId, current: undefined, phase: "ready" }),
    useWorkspaces: (selector) => selector({ items: [], archivedSessionIds: [], state: "ready", baselinesReady: true }),
    refresh: () => {}, t: T,
  };
  const instance = createInstance();
  const chevron = (elements) => findElement(elements, (el) => el.props["aria-label"] === "details");
  const click = (elements) => chevron(elements).props.onClick({ stopPropagation() {} });
  const detailCalls = () => calls.filter(([method, id]) => method === "details" && id === "s1").length;

  click(renderSlotFor(component("settings.section"), props, instance));
  await new Promise((resolve) => setTimeout(resolve, 20));
  assert.equal(detailCalls(), 1, "expanding a row fetches its details");

  click(renderSlotFor(component("settings.section"), props, instance)); // collapse
  click(renderSlotFor(component("settings.section"), props, instance)); // re-expand
  const primed = renderSlotFor(component("settings.section"), props, instance);
  assert.ok(textOf(primed).includes("a.md"), "the cached snapshot renders immediately while the refresh runs");
  await new Promise((resolve) => setTimeout(resolve, 20));
  assert.equal(detailCalls(), 2, "a cached row is revalidated on every expand, so newly produced files show up without a page reload");
});

test("a parent row keeps the baseline and every level owns its own indent", () => {
  const { component } = mount();
  const byId = {
    p0: { title: "Root", updatedAt: 9 },
    c1: { title: "Child", origin: "subagent", parentId: "p0", updatedAt: 8 },
    g1: { title: "Grandchild", origin: "subagent", parentId: "c1", updatedAt: 7 },
    s0: { title: "Sibling", updatedAt: 6 },
  };
  const props = {
    useSessions: (selector) => selector({ byId, current: undefined, phase: "ready" }),
    useWorkspaces: (selector) => selector({ items: [], archivedSessionIds: [], state: "ready", baselinesReady: true }),
    refresh: () => {}, t: T,
  };
  const instance = createInstance();
  const render = () => renderSlotFor(component("settings.section"), props, instance);
  const rowOf = (elements, title) => findElement(elements, (el) => hasClass(el, "aRchv_row") && textOf([el]).includes(title));
  const modelOf = (elements, title) => findElement(elements, (el) => el.props.row !== undefined && el.props.row.title === title);
  const slotOf = (row) => row === undefined ? undefined : findElement(row.props.children.filter(isElement), (el) => hasClass(el, "aRchv_toggleSlot"));
  const toggleOf = (row) => {
    const inside = slotOf(row) === undefined ? undefined : slotOf(row).props.children;
    return isElement(inside) ? inside : undefined;
  };
  const expand = (row) => toggleOf(row).props.onClick({ stopPropagation() {} });

  let elements = render();
  const root = rowOf(elements, "Root");
  const sibling = rowOf(elements, "Sibling");
  assert.ok(root && sibling, "the top-level rows render");
  assert.ok(slotOf(root) && slotOf(sibling), "every row reserves the disclosure slot while any parent is listed");
  assert.ok(toggleOf(root), "the parent carries the disclosure control");
  assert.equal(toggleOf(sibling), undefined, "a leaf renders an empty slot, so both rows keep the same left edge");
  assert.equal(hasClass(root, "aRchv_subagentRow"), false, "a parent is not a child: it stays on the baseline");
  assert.equal(root.props.style, undefined, "no inline indent is applied to a parent row");
  assert.equal(rowOf(elements, "Child"), undefined, "children wait for their parent to expand");

  expand(root);
  elements = render();
  const child = rowOf(elements, "Child");
  assert.ok(hasClass(child, "aRchv_subagentRow"), "a real child takes the subagent row style");
  assert.equal(modelOf(elements, "Child").props.depth, 1, "a direct child sits one level down");
  assert.equal(child.props.style, undefined, "level one indents from the stylesheet, not from an inline override");
  assert.equal(rowOf(elements, "Grandchild"), undefined, "the grandchild waits for its own parent");

  expand(child);
  elements = render();
  const grandchild = rowOf(elements, "Grandchild");
  assert.ok(hasClass(grandchild, "aRchv_subagentRow"), "a grandchild is a subagent row too");
  assert.equal(modelOf(elements, "Grandchild").props.depth, 2, "depth keeps counting through subagent parents");
  assert.deepEqual(grandchild.props.style, { marginLeft: 25 }, "level two moves the guide line one step further right (9 + 16)");
  assert.ok(grandchild.props.style.marginLeft > 9, "a nested row never lands left of its own parent");

  expand(child);
  assert.equal(rowOf(render(), "Grandchild"), undefined, "collapsing the middle level hides the grandchild again");
});

test("an orphan subagent is listed as a top-level row instead of hanging off its neighbour", () => {
  const { component } = mount();
  const byId = {
    p0: { title: "Root", updatedAt: 9 },
    c1: { title: "Child", origin: "subagent", parentId: "p0", updatedAt: 8 },
    g1: { title: "Grandchild", origin: "subagent", parentId: "c1", updatedAt: 7 },
  };
  const props = {
    useSessions: (selector) => selector({ byId, current: undefined, phase: "ready" }),
    useWorkspaces: (selector) => selector({ items: [], archivedSessionIds: [], state: "ready", baselinesReady: true }),
    refresh: () => {}, t: T,
  };
  const instance = createInstance();
  const render = () => renderSlotFor(component("settings.section"), props, instance);
  const rowOf = (elements, title) => findElement(elements, (el) => hasClass(el, "aRchv_row") && textOf([el]).includes(title));
  const modelOf = (elements, title) => findElement(elements, (el) => el.props.row !== undefined && el.props.row.title === title);
  const slotOf = (row) => row === undefined ? undefined : findElement(row.props.children.filter(isElement), (el) => hasClass(el, "aRchv_toggleSlot"));
  const search = (elements, value) => findElement(elements, (el) => el.props.placeholder === "searchPlaceholder").props.onChange({ target: { value } });

  search(render(), "Grandchild");
  let elements = render();
  const orphan = rowOf(elements, "Grandchild");
  assert.ok(orphan, "a matching subagent stays visible when its whole ancestor chain is filtered out");
  assert.equal(modelOf(elements, "Grandchild").props.depth, 0, "with no visible parent it is a root of the current list");
  assert.equal(hasClass(orphan, "aRchv_subagentRow"), false, "and it must not look like someone else's child");
  assert.equal(orphan.props.style, undefined);
  assert.ok(textOf([orphan]).includes("subagent"), "the subagent badge still tells the truth");
  assert.ok(String(orphan.props.children[2].props.title).includes("subagentOrphan"), "the tooltip explains the missing parent");

  search(elements, "Root");
  elements = render();
  const dead = slotOf(rowOf(elements, "Root"));
  assert.ok(dead === undefined || dead.props.children === false, "no dead disclosure arrow while the children are filtered out");
});

test("the archived tab nests an archived subagent under its parent and lifts it when the parent is elsewhere", () => {
  const { component } = mount();
  const byId = {
    p0: { title: "Root", updatedAt: 9 },
    c1: { title: "Child", origin: "subagent", parentId: "p0", updatedAt: 8 },
  };
  const props = (archivedSessionIds) => ({
    useSessions: (selector) => selector({ byId, current: undefined, phase: "ready" }),
    useWorkspaces: (selector) => selector({ items: [], archivedSessionIds, state: "ready", baselinesReady: true }),
    refresh: () => {}, t: T,
  });
  const instance = createInstance();
  const render = (ids) => renderSlotFor(component("settings.section"), props(ids), instance);
  const rowOf = (elements, title) => findElement(elements, (el) => hasClass(el, "aRchv_row") && textOf([el]).includes(title));
  const modelOf = (elements, title) => findElement(elements, (el) => el.props.row !== undefined && el.props.row.title === title);

  findElement(render([]), (el) => el.props.role === "tab" && el.props.children === "tab.archived").props.onClick();

  let elements = render(["c1"]);
  const lone = rowOf(elements, "Child");
  assert.ok(lone, "the archived child is listed on its own");
  assert.equal(hasClass(lone, "aRchv_subagentRow"), false, "its parent lives on the other tab, so it must not be indented under whoever is above");
  assert.equal(rowOf(elements, "Root"), undefined, "the unarchived parent stays on the all tab");

  elements = render(["p0", "c1"]);
  assert.equal(rowOf(elements, "Child"), undefined, "collapsed until the parent is expanded");
  findElement(rowOf(elements, "Root").props.children.filter(isElement), (el) => hasClass(el, "aRchv_toggleSlot")).props.children.props.onClick({ stopPropagation() {} });
  elements = render(["p0", "c1"]);
  assert.ok(hasClass(rowOf(elements, "Child"), "aRchv_subagentRow"), "with both archived the child nests under its parent again");
});

