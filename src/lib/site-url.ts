import { toHttpsOrigin } from "@/lib/urls";

export function getSiteUrl(): string {
  const fromEnv = process.env.NEXT_PUBLIC_SITE_URL;
  if (fromEnv) {
    const normalized = toHttpsOrigin(fromEnv);
    if (normalized) {
      return normalized;
    }
  }

  const vercelHost =
    process.env.VERCEL_PROJECT_PRODUCTION_URL ?? process.env.VERCEL_URL;

  if (vercelHost) {
    const normalized = toHttpsOrigin(vercelHost);
    if (normalized) {
      return normalized;
    }
  }

  return "https://donaldmayesministries.com";
}
