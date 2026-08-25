# Architecture

## Stack

Next.js 16 App Router, React 19, TypeScript strict, Tailwind CSS 4. npm lockfile.

## Routes

| Path | File | Notes |
| --- | --- | --- |
| `/` | `src/app/page.tsx` | Home / About |
| `/episodes` | `src/app/episodes/page.tsx` | Loving Everyone Always archive |
| `/speaking` | `src/app/speaking/page.tsx` | Includes `#booking` |
| `/prayer-requests` | `src/app/prayer-requests/page.tsx` | Calmer ivory/cream page |
| `/booking` | `src/app/booking/page.tsx` | Direct-link HighLevel prayer-call calendar |
| `/privacy` | `src/app/privacy/page.tsx` | |
| `/terms` | `src/app/terms/page.tsx` | |
| 404 | `src/app/not-found.tsx` | |

Special files: `sitemap.ts`, `robots.ts`, `opengraph-image.tsx`, `icon.tsx`, `apple-icon.tsx`.

## Server vs client

Server Components by default.

Client Components:

- `HeaderNav` — active route
- `MobileNavigation` — open state, focus trap, escape, scroll lock, portal overlay
- `Reveal` — intersection observer entrance
- `SpeakingBookingForm`
- `PrayerRequestForm`
- `EpisodesArchive` — search, filters, selection, native audio

Route handler: `POST /api/forms/[form]` for native prayer and speaking forms. No server actions. Episode RSS is imported by `scripts/import-episodes.mjs`, not fetched at request time.

## Component hierarchy

- `layout.tsx` → SkipLink, JSON-LD, Header, children, Footer, HighLevelTracking
- Pages compose section components
- Sections read from `src/content/*`
- Shared primitives in `src/components/ui/`
- Forms use shared field primitives

## Content architecture

Copy is separated from JSX:

- `src/content/home.ts`
- `src/content/speaking.ts`
- `src/content/prayer.ts`
- `src/content/legal.ts`
- `src/content/navigation.ts`
- `src/content/episodes.ts`
- `src/content/episodes.catalogue.json` (generated from RSS)

Site-wide values: `src/config/site.ts`. Podcast RSS URL: `site.podcast.rssUrl`. HighLevel script src and default tracking ID: `highLevelTracking` in the same file.

## Forms

Client-side validation remains UX only. Native `<form>` elements `preventDefault`, POST JSON to `POST /api/forms/prayer-request` or `POST /api/forms/speaking-booking`, and show success only after the server confirms HighLevel delivery. See `docs/FORMS.md`. Prayer follow-up fields appear when the visitor chooses Yes; email/phone/consent become required according to the selected method.

Do not persist prayer text to localStorage, URLs, or the console. Do not call the HighLevel webhook from the browser. `/booking` stays a native HighLevel calendar embed.

## HighLevel

`src/components/layout/HighLevelTracking.tsx` loads `https://link.msgsndr.com/js/external-tracking.js` with `next/script` (`afterInteractive`) and `data-tracking-id`. Default ID is in `src/config/site.ts`. Optional override: `NEXT_PUBLIC_GHL_TRACKING_ID`. This is a public client ID, not a secret.

`src/components/booking/HighLevelCalendar.tsx` loads the prayer-call calendar iframe and the HighLevel resize script once with `next/script`. `/booking` uses minimal route-specific chrome and is intentionally absent from primary navigation and the sitemap.

## Metadata

`createMetadata()` sets title, description, canonical, Open Graph, and Twitter fields. `metadataBase` comes from `getSiteUrl()` (`NEXT_PUBLIC_SITE_URL`, then Vercel URL, then `https://donaldmayesministries.com`).

JSON-LD in `src/lib/json-ld.ts` describes WebSite, Organization, and Person only from documented facts. `/episodes` adds PodcastSeries from the imported catalogue.

## Design tokens

Locked brand values are CSS custom properties in `src/app/globals.css`. Tailwind `@theme inline` maps them to utilities (`bg-blue`, `bg-mist`, `text-red`, `text-ink`, `font-display`, `max-w-content`).

## Important decisions

- Editorial layout over card grids
- DMM Red is reserved for precise accents and active states
- Locked Pastor Mayes photography anchors the home hero and Meet Pastor biography
- Native scrolling without blur, blend-mode grain, or scroll libraries
- No icon package — small inline SVGs
- Testimonials component is real but hidden while the array is empty
- Social links render only when URLs are non-null
- Forms disclose that HighLevel receives the submission for ministry follow-up
- Episode catalogue refreshes only through `npm run import:episodes`

## Security

Classification: Frontend / Marketing with a same-origin form API. Production headers are set in `next.config.ts` (nosniff, referrer policy, permissions policy, SAMEORIGIN framing, HSTS in production, `X-Permitted-Cross-Domain-Policies: none`, CSP allowing Next.js plus HighLevel `link.msgsndr.com` / `leadconnectorhq.com`, `form-action 'self'`). The HighLevel tracking ID is a public client ID. Prayer text is not written to localStorage, URLs, or the console. Native form webhooks are server-only via `GHL_FORM_WEBHOOK_URL`.
