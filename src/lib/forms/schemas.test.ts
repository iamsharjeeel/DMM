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
    assert.equal(parsed.payload.smsMarketingConsent, false);
    assert.equal(parsed.payload.smsNonMarketingConsent, false);
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

test("accepts independent SMS consent combinations and never infers true", () => {
  const combinations = [
    [false, false],
    [true, false],
    [false, true],
    [true, true],
  ] as const;

  for (const [marketing, nonMarketing] of combinations) {
    const parsed = parseNativeForm("prayer-request", {
      ...prayerBase,
      smsMarketingConsent: marketing,
      smsNonMarketingConsent: nonMarketing,
    });
    assert.equal(parsed.status, "ok");
    if (parsed.status === "ok") {
      assert.equal(parsed.payload.smsMarketingConsent, marketing);
      assert.equal(parsed.payload.smsNonMarketingConsent, nonMarketing);
    }
  }

  assert.equal(
    parseNativeForm("prayer-request", {
      ...prayerBase,
      smsMarketingConsent: "true",
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
    assert.equal(parsed.payload.smsMarketingConsent, false);
    assert.equal(parsed.payload.smsNonMarketingConsent, false);
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

const speakingLeadBase = {
  name: "Alex Rivera",
  organization: "Hope Church",
  email: "alex@example.com",
  eventType: "Church",
};

test("accepts a short speaking lead with optional fields empty", () => {
  const parsed = parseNativeForm("speaking-meta-lead", speakingLeadBase);
  assert.equal(parsed.status, "ok");
  if (parsed.status === "ok") {
    assert.equal(parsed.payload.smsMarketingConsent, false);
    assert.equal(parsed.payload.smsNonMarketingConsent, false);
    assert.equal("landingPath" in parsed.payload, true);
    if ("landingPath" in parsed.payload) {
      assert.equal(parsed.payload.landingPath, "/invite-pastor-mayes");
    }
    assert.equal("eventName" in parsed.payload, false);
    assert.equal("format" in parsed.payload, false);
    assert.equal("topic" in parsed.payload, false);
    assert.equal("eventTimeframe" in parsed.payload, false);
    assert.equal("eventLocation" in parsed.payload, false);
  }
});

test("accepts a simplified speaking lead without legacy or SMS fields", () => {
  const parsed = parseNativeForm("speaking-meta-lead", {
    ...speakingLeadBase,
    phone: "555-0199",
    details: "Sunday gathering in Dallas this fall, topic to be discussed.",
    utm_source: "facebook",
    utm_campaign: "speaking-2026",
  });
  assert.equal(parsed.status, "ok");
  if (parsed.status === "ok" && "landingPath" in parsed.payload) {
    assert.equal(parsed.payload.phone, "555-0199");
    assert.equal(
      parsed.payload.details,
      "Sunday gathering in Dallas this fall, topic to be discussed.",
    );
    assert.equal(parsed.payload.utm_source, "facebook");
    assert.equal(parsed.payload.smsMarketingConsent, false);
    assert.equal(parsed.payload.smsNonMarketingConsent, false);
  }
});

test("forwards allowlisted speaking-lead attribution and rejects extras", () => {
  const parsed = parseNativeForm("speaking-meta-lead", {
    ...speakingLeadBase,
    utm_source: "facebook",
    utm_medium: "paid",
    utm_campaign: "speaking-2026",
    fbclid: "abc123",
    format: "In person",
    topic: "To be discussed",
  });
  assert.equal(parsed.status, "ok");
  if (parsed.status === "ok" && "utm_source" in parsed.payload) {
    assert.equal(parsed.payload.utm_source, "facebook");
    assert.equal(parsed.payload.fbclid, "abc123");
    assert.equal(parsed.payload.format, "In person");
    assert.equal(parsed.payload.topic, "To be discussed");
  }

  assert.equal(
    parseNativeForm("speaking-meta-lead", {
      ...speakingLeadBase,
      gclid: "not-allowed",
    }).status,
    "invalid",
  );
  assert.equal(
    parseNativeForm("speaking-meta-lead", {
      ...speakingLeadBase,
      format: "hybrid",
    }).status,
    "invalid",
  );
  assert.equal(
    parseNativeForm("speaking-meta-lead", {
      ...speakingLeadBase,
      name: "",
    }).status,
    "invalid",
  );
});
