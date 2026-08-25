import assert from "node:assert/strict";
import { test } from "node:test";
import { parseNativeForm } from "./schemas";
import { fieldMax } from "../validation";

const prayerBase = {
  name: "Jordan",
  email: "jordan@example.com",
  phone: "555-0100",
  request: "Please pray for our family.",
  urgent: false,
  followUp: "yes",
  contactMethod: "email",
  consent: true,
};

const speakingBase = {
  name: "Alex Rivera",
  organization: "Hope Church",
  email: "alex@example.com",
  phone: "555-0199",
  eventName: "Spring Gathering",
  eventDate: "2026-09-12",
  eventLocation: "Dallas, TX",
  eventType: "Church",
  attendance: "120",
  format: "in-person",
  topic: "Loving Everyone Always",
  details: "Sunday morning service focused on practical love.",
  referral: "A friend",
};

test("accepts a valid prayer request", () => {
  const parsed = parseNativeForm("prayer-request", prayerBase);
  assert.equal(parsed.status, "ok");
  if (parsed.status === "ok") {
    assert.equal(parsed.payload.email, "jordan@example.com");
    assert.equal("website" in parsed.payload, false);
    assert.equal("startedAt" in parsed.payload, false);
  }
});

test("normalizes prayer follow-up no", () => {
  const parsed = parseNativeForm("prayer-request", {
    ...prayerBase,
    followUp: "no",
    contactMethod: "phone",
    consent: true,
  });
  assert.equal(parsed.status, "ok");
  if (parsed.status === "ok" && "contactMethod" in parsed.payload) {
    assert.equal(parsed.payload.contactMethod, "");
    assert.equal(parsed.payload.consent, false);
  }
});

test("rejects invalid prayer email and unknown fields", () => {
  assert.equal(
    parseNativeForm("prayer-request", { ...prayerBase, email: "not-an-email" })
      .status,
    "invalid",
  );
  assert.equal(
    parseNativeForm("prayer-request", { ...prayerBase, extra: true }).status,
    "invalid",
  );
  assert.equal(
    parseNativeForm("prayer-request", { ...prayerBase, urgent: "true" }).status,
    "invalid",
  );
  assert.equal(
    parseNativeForm("prayer-request", {
      ...prayerBase,
      request: "x".repeat(fieldMax.request + 1),
    }).status,
    "invalid",
  );
});

test("ignores populated honeypot without forwarding payload", () => {
  const parsed = parseNativeForm("prayer-request", {
    ...prayerBase,
    website: "https://spam.example",
  });
  assert.equal(parsed.status, "ignored");
});

test("accepts a valid speaking request and attendance number", () => {
  const parsed = parseNativeForm("speaking-booking", {
    ...speakingBase,
    attendance: 80,
    email: "  Alex@Example.COM ",
  });
  assert.equal(parsed.status, "ok");
  if (parsed.status === "ok" && "attendance" in parsed.payload) {
    assert.equal(parsed.payload.email, "alex@example.com");
    assert.equal(parsed.payload.attendance, "80");
  }
});

test("rejects invalid speaking enums and dates", () => {
  assert.equal(
    parseNativeForm("speaking-booking", {
      ...speakingBase,
      eventType: "Not A Type",
    }).status,
    "invalid",
  );
  assert.equal(
    parseNativeForm("speaking-booking", {
      ...speakingBase,
      format: "hybrid",
    }).status,
    "invalid",
  );
  assert.equal(
    parseNativeForm("speaking-booking", {
      ...speakingBase,
      eventDate: "2026-13-40",
    }).status,
    "invalid",
  );
  assert.equal(
    parseNativeForm("speaking-booking", {
      ...speakingBase,
      attendance: 0,
    }).status,
    "invalid",
  );
});
