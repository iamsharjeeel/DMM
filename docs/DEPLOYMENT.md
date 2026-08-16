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

Confirm `/`, `/speaking`, `/prayer-requests`, `/privacy`, `/terms`.

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

Optional:

```text
NEXT_PUBLIC_SITE_URL=https://your-production-domain
```

Use it for canonical URLs, sitemap, and Open Graph. A hostname without a protocol (for example `dmm-omega.vercel.app`) is accepted and normalized to HTTPS. Do not add CRM, API, or database variables for Phase 1.

## 8. Domain

Attach the final domain in Vercel when the client confirms it. Then set `NEXT_PUBLIC_SITE_URL` to that origin (no trailing slash).

## 9. Preview deployments

Pull requests get preview URLs automatically after the GitHub integration is connected.

## 10. Production

Merging to the production branch (usually `main`) deploys production.

## 11. Post-deployment checks

- Home motto and Pastor Mayes sections render
- Speaking `#booking` is reachable from **Book Pastor Mayes**
- Prayer conditional fields work
- Forms show confirmation without claiming email delivery
- `/sitemap.xml` and `/robots.txt` resolve
- Social share images load
- No social icons appear until URLs are configured
