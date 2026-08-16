# Security

## Security Classification

`Frontend / Marketing`

Phase 1 is a public informational ministry website. Forms confirm in the browser only. There is no application-owned backend, database, authentication, admin area, or secret-backed integration.

## Controls Implemented

- HTTPS origin normalization for canonical/OG URLs (`getSiteUrl` / `toHttpsOrigin`)
- No secrets in source; `.env*` gitignored; `.env.example` contains only the public `NEXT_PUBLIC_SITE_URL` placeholder
- Production security headers via `next.config.ts`: CSP, `nosniff`, `X-Frame-Options: DENY`, `frame-ancestors 'none'`, Referrer-Policy, Permissions-Policy, HSTS, COOP
- `X-Powered-By` disabled
- CSP: `default-src 'self'`, no `unsafe-eval`, no wildcard sources; `unsafe-inline` kept only for Next.js/JSON-LD and CSS as required
- JSON-LD is static ministry data; `<` is escaped before `dangerouslySetInnerHTML`
- Forms: required/type/length/format/allowlist validation; values clipped to max length; prayer text is not echoed, stored, logged, or put in URLs
- Honeypot field plus minimum submit timing on both public forms (client-side only; not a substitute for a future server endpoint)
- External social URLs render only if they are `https:` and use `rel="noopener noreferrer"`
- User-facing error pages do not show stack traces or internal details
- Lockfile committed; `npm run audit` available

## External / Platform Controls

- Vercel HTTPS and HTTP→HTTPS
- Vercel platform DDoS mitigation
- Next.js HTML escaping for React text nodes
- next/font self-hosts fonts (no Google Fonts runtime request)

## Remaining Security Considerations

- Forms do not submit to a server. Honeypot/timing are not rate limiting. When a submission endpoint is added, validate again server-side, rate-limit there, and keep prayer content out of logs/analytics.
- CSRF tokens are not used: there is no cookie-authenticated state-changing endpoint.
- CAPTCHA/Turnstile is not installed; it would be empty theater until a receiving endpoint exists.
- CSP `script-src`/`style-src` include `'unsafe-inline'` because this static Next.js app emits inline JSON-LD and style hooks. Tighten with nonces if the architecture later supports per-request HTML.
- HSTS `preload` assumes the production domain will be HTTPS-only.

## Manual Configuration Required

- Set `NEXT_PUBLIC_SITE_URL` to the HTTPS production origin in Vercel
- Confirm the production domain uses HTTPS (Vercel default)
- After a real form backend exists: Turnstile/hCaptcha keys if chosen, server-side rate limits, and Vercel Firewall custom rate-limit rules for those routes
- Do not add analytics/pixels without updating CSP and this document

Security is an ongoing property of the app, infrastructure, dependencies, and configuration. This site is not “100% secure.”
