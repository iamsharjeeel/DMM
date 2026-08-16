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

  return "https://donaldmayesministries.com";
}

export function getMetadataBase(): URL {
  try {
    return new URL(getSiteUrl());
  } catch {
    return new URL("https://donaldmayesministries.com");
  }
}
