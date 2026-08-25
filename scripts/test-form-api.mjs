#!/usr/bin/env node

import http from "node:http";
import { spawn } from "node:child_process";

const WEBHOOK_PORT = 4179;
const APP_PORT = 3011;
const origin = `http://127.0.0.1:${APP_PORT}`;

const received = [];

const webhookServer = http.createServer((req, res) => {
  const chunks = [];
  req.on("data", (chunk) => chunks.push(chunk));
  req.on("end", () => {
    const body = Buffer.concat(chunks).toString("utf8");
    let json = null;
    try {
      json = JSON.parse(body);
    } catch {
      json = null;
    }
    received.push({
      url: req.url,
      method: req.method,
      source: req.headers.source,
      contentType: req.headers["content-type"],
      json,
    });
    if (req.url === "/fail") {
      res.statusCode = 500;
      res.end("no");
      return;
    }
    res.statusCode = 200;
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify({ ok: true }));
  });
});

await new Promise((resolve) => webhookServer.listen(WEBHOOK_PORT, "127.0.0.1", resolve));

const next = spawn("npx", ["next", "start", "-p", String(APP_PORT)], {
  env: {
    ...process.env,
    NODE_ENV: "production",
    GHL_FORM_WEBHOOK_URL: `http://127.0.0.1:${WEBHOOK_PORT}/ok`,
    GHL_FORM_WEBHOOK_ALLOW_LOCAL: "1",
  },
  stdio: ["ignore", "pipe", "pipe"],
});

let nextOutput = "";
next.stdout.on("data", (chunk) => {
  nextOutput += chunk.toString();
});
next.stderr.on("data", (chunk) => {
  nextOutput += chunk.toString();
});

function waitForReady() {
  return new Promise((resolve, reject) => {
    const started = Date.now();
    const timer = setInterval(() => {
      if (nextOutput.includes("started server") || nextOutput.includes("Ready")) {
        clearInterval(timer);
        resolve();
      } else if (Date.now() - started > 20000) {
        clearInterval(timer);
        reject(new Error(`Next did not start:\n${nextOutput}`));
      }
    }, 200);
  });
}

let failed = 0;
function expect(name, condition, detail = "") {
  if (condition) {
    console.log(`ok - ${name}`);
  } else {
    failed += 1;
    console.error(`not ok - ${name}${detail ? ` (${detail})` : ""}`);
  }
}

const prayer = {
  name: "Test Visitor",
  email: "test@example.com",
  phone: "555-0100",
  request: "Please pray for our family this week.",
  urgent: false,
  followUp: "no",
  contactMethod: "",
  consent: false,
};

const speaking = {
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

async function post(path, { body, headers = {}, ip }) {
  const response = await fetch(`${origin}${path}`, {
    method: "POST",
    headers: {
      Origin: origin,
      "Content-Type": "application/json",
      "X-Forwarded-For": ip,
      ...headers,
    },
    body: typeof body === "string" ? body : JSON.stringify(body),
  });
  const text = await response.text();
  let json = null;
  try {
    json = JSON.parse(text);
  } catch {
    json = null;
  }
  return { status: response.status, json, text };
}

try {
  await waitForReady();
  let ip = 1;
  const nextIp = () => `203.0.113.${ip++}`;

  const validPrayer = await post("/api/forms/prayer-request", {
    body: prayer,
    ip: nextIp(),
  });
  expect("valid prayer 200", validPrayer.status === 200 && validPrayer.json?.ok === true);
  const prayerHook = received.at(-1);
  expect("prayer source header", prayerHook?.source === "prayer-request");
  expect("prayer json request forwarded", prayerHook?.json?.request === prayer.request);
  expect("prayer honeypot not forwarded", prayerHook?.json?.website === undefined);

  const validSpeaking = await post("/api/forms/speaking-booking", {
    body: speaking,
    ip: nextIp(),
  });
  expect("valid speaking 200", validSpeaking.status === 200 && validSpeaking.json?.ok === true);
  const speakingHook = received.at(-1);
  expect("speaking source header", speakingHook?.source === "speaking-booking");
  expect("speaking json name forwarded", speakingHook?.json?.name === speaking.name);

  const badEmail = await post("/api/forms/prayer-request", {
    body: { ...prayer, followUp: "yes", contactMethod: "email", consent: true, email: "bad" },
    ip: nextIp(),
  });
  expect("invalid email 400", badEmail.status === 400);

  const missing = await post("/api/forms/speaking-booking", {
    body: { ...speaking, name: "" },
    ip: nextIp(),
  });
  expect("missing required 400", missing.status === 400);

  const badEnum = await post("/api/forms/speaking-booking", {
    body: { ...speaking, format: "hybrid" },
    ip: nextIp(),
  });
  expect("invalid enum 400", badEnum.status === 400);

  const badBool = await post("/api/forms/prayer-request", {
    body: { ...prayer, urgent: "yes" },
    ip: nextIp(),
  });
  expect("invalid boolean 400", badBool.status === 400);

  const tooLong = await post("/api/forms/prayer-request", {
    body: { ...prayer, request: "x".repeat(4001) },
    ip: nextIp(),
  });
  expect("excessive length 400", tooLong.status === 400);

  const unknown = await post("/api/forms/prayer-request", {
    body: { ...prayer, extra: true },
    ip: nextIp(),
  });
  expect("unknown field 400", unknown.status === 400);

  const huge = await post("/api/forms/prayer-request", {
    body: "x".repeat(33 * 1024),
    headers: { "Content-Type": "application/json" },
    ip: nextIp(),
  });
  expect("oversized 413", huge.status === 413);

  const xml = await post("/api/forms/prayer-request", {
    body: prayer,
    headers: { "Content-Type": "text/plain" },
    ip: nextIp(),
  });
  expect("non-json 415", xml.status === 415);

  const unknownForm = await post("/api/forms/not-a-form", {
    body: prayer,
    ip: nextIp(),
  });
  expect("unknown form 404", unknownForm.status === 404);

  const beforeHoneypot = received.length;
  const honeypot = await post("/api/forms/prayer-request", {
    body: { ...prayer, website: "https://spam.test" },
    ip: nextIp(),
  });
  expect("honeypot 200", honeypot.status === 200 && honeypot.json?.ok === true);
  expect("honeypot not forwarded", received.length === beforeHoneypot);

  const cross = await post("/api/forms/prayer-request", {
    body: prayer,
    headers: { Origin: "https://evil.example" },
    ip: nextIp(),
  });
  expect("cross-origin 403", cross.status === 403);

  const burstIp = nextIp();
  let limited = false;
  for (let i = 0; i < 6; i += 1) {
    const result = await post("/api/forms/prayer-request", {
      body: prayer,
      ip: burstIp,
    });
    if (result.status === 429) {
      limited = true;
    }
  }
  expect("rate limit 429", limited);

  expect("no webhook url in responses", !validPrayer.text.includes("leadconnectorhq.com/hooks"));
} catch (error) {
  failed += 1;
  console.error(error);
} finally {
  next.kill("SIGTERM");
  webhookServer.close();
}

if (failed) {
  process.exit(1);
}
