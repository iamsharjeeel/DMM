export const CANONICAL_ORIGIN = "https://donaldmayesministries.com";

function normalizeCandidate(raw: string): string {
  const trimmed = raw.trim().replace(/^['"]|['"]$/g, "").replace(/\/$/, "");
  if (!trimmed) {
    return "";
  }

  const withoutSlashes = trimmed.startsWith("//") ? trimmed.slice(2) : trimmed;
  const withProtocol = /^https?:\/\//i.test(withoutSlashes)
    ? withoutSlashes
    : `https://${withoutSlashes}`;

  try {
    const url = new URL(withProtocol);
    if (url.protocol !== "http:" && url.protocol !== "https:") {
      return "";
    }
    if (!url.hostname) {
      return "";
    }
    return `https://${url.host}${url.pathname}`.replace(/\/$/, "");
  } catch {
    return "";
  }
}

export function getCanonicalSiteUrl(): string {
  return CANONICAL_ORIGIN;
}

export function getCanonicalUrl(path = "/"): string {
  if (!path || path === "/") {
    return CANONICAL_ORIGIN;
  }

  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${CANONICAL_ORIGIN}${normalized.replace(/\/$/, "")}`;
}

export function getMetadataBase(): URL {
  return new URL(CANONICAL_ORIGIN);
}

export function isVercelPreview(): boolean {
  return process.env.VERCEL_ENV === "preview";
}

export function getSiteUrl(): string {
  const candidates = [
    process.env.NEXT_PUBLIC_SITE_URL,
    process.env.VERCEL_PROJECT_PRODUCTION_URL,
    process.env.VERCEL_URL,
  ];

  for (const candidate of candidates) {
    if (!candidate) {
      continue;
    }
    const normalized = normalizeCandidate(candidate);
    if (normalized) {
      return normalized;
    }
  }

  return CANONICAL_ORIGIN;
}
