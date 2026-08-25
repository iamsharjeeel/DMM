# Donald Mayes Ministries

Phase 1 website for Pastor Donald Mayes and Donald Mayes Ministries.

Central message: **Loving Everyone Always.**

## Stack

- Next.js 16 (App Router)
- React 19
- TypeScript
- Tailwind CSS 4
- Vercel-ready static generation

No database. Native prayer and speaking forms POST JSON to the site’s `/api/forms/[form]` route; the server forwards validated payloads to HighLevel. HighLevel external tracking still records page views. The `/booking` calendar is a HighLevel iframe and is not part of that API.

## Setup

```bash
npm install
cp .env.example .env.local
```

Optional: set `NEXT_PUBLIC_SITE_URL` in `.env.local` to the public site URL. `NEXT_PUBLIC_GHL_TRACKING_ID` is optional; the HighLevel tracking ID already lives in `src/config/site.ts`. Required for native form delivery: server-only `GHL_FORM_WEBHOOK_URL`.

## Commands

```bash
npm run dev
npm run lint
npm run typecheck
npm run test
npm run build
npm run start
npm run import:episodes
```

## Pages

- `/` Home / About
- `/stories/[slug]` Source testimonies (linked from Home; not in primary nav)
- `/episodes` Loving Everyone Always audio archive
- `/speaking` Speaking + booking form
- `/prayer-requests` Prayer request form
- `/booking` Direct-link HighLevel prayer-call calendar
- `/privacy` Privacy Policy (provisional)
- `/terms` Terms (provisional)

`/episodes` reads the committed RSS catalogue in `src/content/episodes.catalogue.json`. Refresh it with `npm run import:episodes`.

## Current limitations

- Booking and prayer forms validate in the browser, POST to `/api/forms/[form]`, and confirm only after HighLevel accepts the webhook
- Prayer text is not stored in the browser or placed in the page address
- Contact email, social URLs, and testimonials are pending
- Brand colors and type follow the locked kit in `docs/DESIGN-SYSTEM.md`
- Legal copy requires client/legal review

## Structure

```text
src/
  app/            routes, metadata, OG images, sitemap, robots
  components/     layout, sections, forms, episodes, UI
  content/        client-approved copy and the episode catalogue JSON
  config/site.ts  ministry name, routes, social, asset paths
  lib/            metadata, JSON-LD, OG helper, validation, form API helpers, episode helpers
  app/api/forms   same-origin native form POST routes
scripts/
  import-episodes.mjs  RSS importer for the audio archive
```

## Brand

Locked colors and fonts live in `src/app/globals.css` (`:root` tokens). See `docs/DESIGN-SYSTEM.md`. Copy lives in `src/content/`. Photography paths live in `src/config/site.ts`.

## Vercel

Import the GitHub repo into Vercel. Framework: Next.js. Required env: `GHL_FORM_WEBHOOK_URL`. Optional: `NEXT_PUBLIC_SITE_URL`, `NEXT_PUBLIC_GHL_TRACKING_ID`.

See `docs/DEPLOYMENT.md`.

## Agent docs

- `VISION.md` — ministry message and UX intent
- `AGENTS.md` — operating rules
- `HANDOVER.md` — current state
- `CHANGELOG.md`
- `docs/ARCHITECTURE.md`
- `docs/CONTENT.md`
- `docs/DESIGN-SYSTEM.md`
- `docs/FORMS.md`
- `docs/DEPLOYMENT.md`
