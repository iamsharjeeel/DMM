# Deployment (Vercel)

## 1. Local prerequisites

- Node.js 20+ (22 is fine)
- npm (lockfile is `package-lock.json`)

## 2. Install

```bash
npm install
cp .env.example .env.local
```

## 3. Production build verification

```bash
npm run lint
npm run typecheck
npm run build
npm run start
```

Confirm `/`, `/episodes`, `/speaking`, `/prayer-requests`, `/privacy`, `/terms`.

## 4. Push to GitHub

Push the main branch (or merge the Phase 1 PR).

## 5. Import into Vercel

Vercel Dashboard → Add New → Project → import this GitHub repository.

## 6. Framework settings

- Framework: Next.js (auto-detected)
- Root directory: repository root
- Build command: `npm run build`
- Output: Next.js default (do not set static export)
- Install command: `npm install`

No `vercel.json` is required.

## 7. Environment variables

Required:

```text
GHL_FORM_WEBHOOK_URL=
```

Server-only. Never use a `NEXT_PUBLIC_` prefix. Paste the HighLevel inbound webhook URL in the Vercel dashboard for Production and Preview. See `docs/FORMS.md`.

Optional:

```text
NEXT_PUBLIC_SITE_URL=https://your-production-domain
NEXT_PUBLIC_GHL_TRACKING_ID=
```

Use `NEXT_PUBLIC_SITE_URL` for canonical URLs, sitemap, and Open Graph. A hostname without a protocol (for example `dmm-omega.vercel.app`) is accepted and normalized to HTTPS.

`NEXT_PUBLIC_GHL_TRACKING_ID` is optional. The HighLevel tracking ID is already set in `src/config/site.ts`. Only set the env var to override it. It is a public client ID, not a secret.

## 8. Domain

Attach the final domain in Vercel when the client confirms it. Then set `NEXT_PUBLIC_SITE_URL` to that origin (no trailing slash).

## 9. Preview deployments

Pull requests get preview URLs automatically after the GitHub integration is connected.

## 10. Production

Merging to the production branch (usually `main`) deploys production.

## 11. Post-deployment checks

- Home motto and Pastor Mayes sections render
- Listen archive loads, filters, and the pinned player updates
- Speaking `#booking` is reachable from **Book Pastor Mayes**
- Prayer conditional fields work
- Booking and prayer forms show confirmation only after `/api/forms/[form]` reports success
- `/booking` HighLevel calendar still loads
- `/sitemap.xml` and `/robots.txt` resolve
- Social share images load
- No social icons appear until URLs are configured
- Wordmark mark is white and centered in the header and footer boxes
- Response headers include nosniff, referrer policy, and CSP
