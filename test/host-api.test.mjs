/**
 * Host-side API contracts: the fenced `/archived/api` surface stays loopback-only,
 * refuses to delete a running Session, and no longer serves the private config
 * endpoints the plugin used before it moved onto the official settings document.
 */
import assert from "node:assert/strict";
import test from "node:test";
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
