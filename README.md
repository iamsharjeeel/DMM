# Donald Mayes Ministries

Phase 1 website for Pastor Donald Mayes and Donald Mayes Ministries.

Central message: **Loving Everyone Always.**

## Stack

- Next.js 16 (App Router)
- React 19
- TypeScript
- Tailwind CSS 4
- Vercel-ready static generation

No backend, database, CRM, or form delivery in Phase 1.

## Setup

```bash
npm install
cp .env.example .env.local
```

Optional: set `NEXT_PUBLIC_SITE_URL` in `.env.local` to the public site URL.

## Commands

```bash
npm run dev
npm run lint
npm run typecheck
npm run build
npm run start
npm run audit
```

## Pages

- `/` Home / About
- `/speaking` Speaking + booking form
- `/prayer-requests` Prayer request form
- `/privacy` Privacy Policy (provisional)
- `/terms` Terms (provisional)

## Current limitations

- Booking and prayer forms validate and confirm in the browser only
- Submissions are not stored, emailed, or sent anywhere
- Logo, brand colors, photography, contact email, social URLs, and testimonials are pending
- Legal copy requires client/legal review

## Structure

```text
src/
  app/            routes, metadata, OG images, sitemap, robots
  components/     layout, sections, forms, UI
  content/        client-approved copy
  config/site.ts  ministry name, routes, social, asset paths
  lib/            metadata, JSON-LD, OG helper, validation
```

## Brand replacement

Temporary colors and fonts live in `src/app/globals.css` (`:root` tokens). Copy lives in `src/content/`. Photography paths live in `src/config/site.ts`.

## Vercel

Import the GitHub repo into Vercel. Framework: Next.js. Optional env: `NEXT_PUBLIC_SITE_URL`.

See `docs/DEPLOYMENT.md`.

## Agent docs

- `VISION.md` — ministry message and UX intent
- `AGENTS.md` — operating rules
- `HANDOVER.md` — current state
- `CHANGELOG.md`
- `docs/ARCHITECTURE.md`
- `docs/CONTENT.md`
- `docs/DESIGN-SYSTEM.md`
- `docs/DEPLOYMENT.md`
- `docs/SECURITY.md`
