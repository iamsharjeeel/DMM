import { getSiteUrl } from "../site-url";

function originFromUrl(value: string): string | null {
  try {
    return new URL(value).origin;
  } catch {
    return null;
  }
}

function isLocalDevOrigin(origin: string): boolean {
  if (process.env.NODE_ENV === "production") {
    return false;
  }
  try {
    const url = new URL(origin);
    return (
      url.protocol === "http:" &&
      (url.hostname === "localhost" || url.hostname === "127.0.0.1")
    );
  } catch {
    return false;
  }
}

export function getAllowedOrigins(request: Request): Set<string> {
  const allowed = new Set<string>();
  const requestOrigin = originFromUrl(request.url);
  if (requestOrigin) {
    allowed.add(requestOrigin);
  }

  const host = request.headers.get("host")?.trim();
  if (host) {
    const requestUrl = new URL(request.url);
    const proto =
      request.headers.get("x-forwarded-proto")?.split(",")[0]?.trim() ||
      requestUrl.protocol.replace(":", "");
    allowed.add(`${proto}://${host}`);
  }

  const siteOrigin = originFromUrl(getSiteUrl());
  if (siteOrigin) {
    allowed.add(siteOrigin);
  }

  const vercel = process.env.VERCEL_URL?.trim();
  if (vercel) {
    const host = vercel.replace(/^https?:\/\//, "");
    allowed.add(`https://${host}`);
  }

  const production = process.env.VERCEL_PROJECT_PRODUCTION_URL?.trim();
  if (production) {
    const origin = originFromUrl(
      production.startsWith("http") ? production : `https://${production}`,
    );
    if (origin) {
      allowed.add(origin);
    }
  }

  return allowed;
}

export function isSameOriginRequest(request: Request): boolean {
  const allowed = getAllowedOrigins(request);
  const origin = request.headers.get("origin")?.trim();
  if (origin) {
    return allowed.has(origin) || isLocalDevOrigin(origin);
  }

  const referer = request.headers.get("referer")?.trim();
  if (referer) {
    const refererOrigin = originFromUrl(referer);
    if (!refererOrigin) {
      return false;
    }
    return allowed.has(refererOrigin) || isLocalDevOrigin(refererOrigin);
  }

  return false;
}

export function contentTypeIsJson(request: Request): boolean {
  const value = request.headers.get("content-type")?.split(";")[0]?.trim().toLowerCase();
  return value === "application/json";
}

export function payloadTooLarge(request: Request, maxBytes: number): boolean {
  const header = request.headers.get("content-length");
  if (!header) {
    return false;
  }
  const length = Number(header);
  return Number.isFinite(length) && length > maxBytes;
}
