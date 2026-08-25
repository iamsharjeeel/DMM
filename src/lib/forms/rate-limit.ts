import {
  RATE_LIMIT_HOUR_MAX,
  RATE_LIMIT_HOUR_MS,
  RATE_LIMIT_MAX,
  RATE_LIMIT_WINDOW_MS,
} from "./types";

type Bucket = number[];

const windows = new Map<string, Bucket>();
const hours = new Map<string, Bucket>();

function prune(entries: number[], windowMs: number, now: number) {
  return entries.filter((stamp) => now - stamp < windowMs);
}

function hit(store: Map<string, Bucket>, key: string, windowMs: number, max: number) {
  const now = Date.now();
  const next = prune(store.get(key) ?? [], windowMs, now);
  if (next.length >= max) {
    store.set(key, next);
    return false;
  }
  next.push(now);
  store.set(key, next);
  return true;
}

export function getClientIp(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) {
    const first = forwarded.split(",")[0]?.trim();
    if (first) {
      return first;
    }
  }
  return request.headers.get("x-real-ip")?.trim() || "unknown";
}

export function allowFormSubmission(form: string, request: Request): boolean {
  const ip = getClientIp(request);
  const key = `${form}:${ip}`;
  const burst = hit(windows, key, RATE_LIMIT_WINDOW_MS, RATE_LIMIT_MAX);
  if (!burst) {
    return false;
  }
  return hit(hours, key, RATE_LIMIT_HOUR_MS, RATE_LIMIT_HOUR_MAX);
}
