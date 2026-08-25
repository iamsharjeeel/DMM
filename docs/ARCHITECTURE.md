# Architecture

## Stack

Next.js 16 App Router, React 19, TypeScript strict, Tailwind CSS 4. npm lockfile.

## Routes

| Path | File | Notes |
| --- | --- | --- |
| `/` | `src/app/page.tsx` | Home / About |
| `/stories/[slug]` | `src/app/stories/[slug]/page.tsx` | Seven source testimonies; static params |
| `/episodes` | `src/app/episodes/page.tsx` | Loving Everyone Always archive |
| `/speaking` | `src/app/speaking/page.tsx` | Includes `#booking` |
| `/prayer-requests` | `src/app/prayer-requests/page.tsx` | Calmer ivory/cream page |
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

No route handlers. No server actions. No fake fetch calls. Episode RSS is imported by `scripts/import-episodes.mjs`, not fetched at request time.

## Component hierarchy

- `layout.tsx` → SkipLink, JSON-LD, Header, children, Footer, HighLevelTracking
- Pages compose section components
- Story pages use `src/components/stories/`
- Sections read from `src/content/*`
- Shared primitives in `src/components/ui/`
- Forms use shared field primitives

## Content architecture

Copy is separated from JSX:

- `src/content/home.ts`
- `src/content/stories.ts`
- `src/content/speaking.ts`
- `src/content/prayer.ts`
- `src/content/legal.ts`
- `src/content/navigation.ts`
- `src/content/episodes.ts`
- `src/content/episodes.catalogue.json` (generated from RSS)

Site-wide values: `src/config/site.ts`. Podcast RSS URL: `site.podcast.rssUrl`. HighLevel script src and default tracking ID: `highLevelTracking` in the same file. Story lookup helpers: `src/lib/stories.ts`.

## Forms

Client-side validation with native `<form>` submit. Success is local React state after `preventDefault`, so the visitor stays on the page. HighLevel external tracking captures the submit. Form ids: `speaking-booking`, `prayer-request`. Prayer follow-up fields appear when the visitor chooses Yes; email/phone/consent become required according to the selected method.

Do not persist prayer text to localStorage, URLs, or the console. Do not add webhooks, APIs, or a HighLevel calendar unless instructed.

## HighLevel

`src/components/layout/HighLevelTracking.tsx` loads `https://link.msgsndr.com/js/external-tracking.js` with `next/script` (`afterInteractive`) and `data-tracking-id`. Default ID is in `src/config/site.ts`. Optional override: `NEXT_PUBLIC_GHL_TRACKING_ID`. This is a public client ID, not a secret.

## Metadata

`createMetadata()` sets title, description, canonical, Open Graph, and Twitter fields. `metadataBase` comes from `getSiteUrl()` (`NEXT_PUBLIC_SITE_URL`, then Vercel URL, then `https://donaldmayesministries.com`).

JSON-LD in `src/lib/json-ld.ts` describes WebSite, Organization, and Person only from documented facts. `/episodes` adds PodcastSeries from the imported catalogue.

## Design tokens

Locked brand values are CSS custom properties in `src/app/globals.css`. Tailwind `@theme inline` maps them to utilities (`bg-forest`, `text-ink`, `font-display`, `max-w-content`).

## Important decisions

- Editorial layout over card grids
- Heritage Gold is decorative only
- No icon package — small inline SVGs
- Testimonials component is real but hidden while the array is empty
- Home stories section is editorial, not a testimonial widget; copy lives in `src/content/stories.ts`
- Social links render only when URLs are non-null
- Forms disclose that HighLevel receives the submission for ministry follow-up
- Episode catalogue refreshes only through `npm run import:episodes`

## Security

Classification: Frontend / Marketing. Production headers are set in `next.config.ts` (nosniff, referrer policy, permissions policy, SAMEORIGIN framing, CSP allowing Next.js plus HighLevel `link.msgsndr.com`). The HighLevel tracking ID is a public client ID. Prayer text is not written to localStorage, URLs, or the console. This app has no owned form POST endpoint.
