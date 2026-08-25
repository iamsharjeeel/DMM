import assert from "node:assert/strict";
import { test } from "node:test";
import { forwardFormWebhook, getConfiguredWebhookUrl } from "./webhook";

test("rejects missing and untrusted webhook URLs", () => {
  const previous = process.env.GHL_FORM_WEBHOOK_URL;
  delete process.env.GHL_FORM_WEBHOOK_URL;
  assert.throws(() => getConfiguredWebhookUrl());
  process.env.GHL_FORM_WEBHOOK_URL = "https://example.com/hooks/test";
  assert.throws(() => getConfiguredWebhookUrl());
  process.env.GHL_FORM_WEBHOOK_URL =
    "https://services.leadconnectorhq.com/hooks/test";
  assert.equal(
    getConfiguredWebhookUrl().hostname,
    "services.leadconnectorhq.com",
  );
  process.env.GHL_FORM_WEBHOOK_URL = previous;
});

test("does not retry a failed webhook POST", async () => {
  const previous = process.env.GHL_FORM_WEBHOOK_URL;
  process.env.GHL_FORM_WEBHOOK_URL =
    "https://services.leadconnectorhq.com/hooks/test";
  let calls = 0;
  const original = global.fetch;
  global.fetch = async () => {
    calls += 1;
    return new Response("no", { status: 500 });
  };
  const result = await forwardFormWebhook("prayer-request", { name: "Test" });
  global.fetch = original;
  process.env.GHL_FORM_WEBHOOK_URL = previous;
  assert.equal(result.ok, false);
  assert.equal(calls, 1);
});
