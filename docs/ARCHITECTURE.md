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
| `/booking` | `src/app/booking/page.tsx` | Direct-link HighLevel prayer-call calendar |
| `/privacy` | `src/app/privacy/page.tsx` | Privacy Policy |
| `/terms` | `src/app/terms/page.tsx` | Terms of Service |
| `/sms-terms` | `src/app/sms-terms/page.tsx` | SMS Messaging Terms |
| 404 | `src/app/not-found.tsx` | |

Special files: `sitemap.ts`, `robots.ts`, `opengraph-image.tsx`, `twitter-image.tsx`, `icon.png`, `apple-icon.png`, `favicon.ico`.

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

- `layout.tsx` → GTM noscript/script, SkipLink, JSON-LD, Header, children, Footer, HighLevelTracking
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

Site-wide values: `src/config/site.ts`. Compliance identity and SMS consent copy: `src/config/compliance.ts`. Podcast RSS URL: `site.podcast.rssUrl`. HighLevel script src and default tracking ID: `highLevelTracking` in the same file. GTM container ID: `googleTagManager` in the same file. Story lookup helpers: `src/lib/stories.ts`.

## Forms

Client-side validation remains UX only. Native `<form>` elements `preventDefault`, POST JSON to `POST /api/forms/prayer-request` or `POST /api/forms/speaking-booking`, and show success only after the server confirms HighLevel delivery. See `docs/FORMS.md`. Prayer follow-up fields appear when the visitor chooses Yes; email/phone/consent become required according to the selected method. Two optional SMS consent checkboxes are independent of follow-up preference and are never preselected.

Do not persist prayer text to localStorage, URLs, or the console. Do not call the HighLevel webhook from the browser. `/booking` stays a native HighLevel calendar embed.

## HighLevel

`src/components/layout/HighLevelTracking.tsx` loads `https://link.msgsndr.com/js/external-tracking.js` with `next/script` (`afterInteractive`) and `data-tracking-id`. Default ID is in `src/config/site.ts`. Optional override: `NEXT_PUBLIC_GHL_TRACKING_ID`. This is a public client ID, not a secret.

`src/components/booking/HighLevelCalendar.tsx` loads the prayer-call calendar iframe and the HighLevel resize script once with `next/script`. `/booking` uses minimal route-specific chrome and is intentionally absent from primary navigation and the sitemap.

## Metadata

`createMetadata()` sets title, description, canonical, Open Graph, Twitter, optional social title, Open Graph type, and optional noindex. Canonical URLs, `metadataBase`, sitemap, robots, and JSON-LD IDs always use `https://donaldmayesministries.com` via `getCanonicalSiteUrl()` / `getCanonicalUrl()`. `getSiteUrl()` remains a runtime helper for non-SEO origin checks (native forms).

Preview deployments (`VERCEL_ENV === "preview"`) are `noindex, nofollow` in root metadata and `robots.txt`. Production remains indexable. `/booking` is `noindex, follow` and is omitted from the sitemap.

JSON-LD in `src/lib/json-ld.ts` describes WebSite, Organization, and Person from documented facts, using the official logo, Pastor Mayes portrait, confirmed email, and phone. `/episodes` adds PodcastSeries linked to those same entity IDs, with `hasPart` PodcastEpisode entries from the imported catalogue.

`www.donaldmayesministries.com` and `dmm-omega.vercel.app` permanently redirect to the apex origin.

Google Tag Manager container `GTM-WQ272CGD` loads globally (`GoogleTagManager` in the root layout). Do not add a separate GA4 snippet or custom `dataLayer` events in application code.

## Design tokens

Locked brand values are CSS custom properties in `src/app/globals.css`. Tailwind `@theme inline` maps them to utilities (`bg-blue`, `bg-mist`, `text-red`, `text-ink`, `font-display`, `max-w-content`).

## Important decisions

- Editorial layout over card grids
- DMM Red is reserved for precise accents and active states
- Locked Pastor Mayes photography anchors the home hero and Meet Pastor biography
- Native scrolling without blur, blend-mode grain, or scroll libraries
- No icon package — small inline SVGs
- Testimonials component is real but hidden while the array is empty
- Home stories section is editorial, not a testimonial widget; copy lives in `src/content/stories.ts`
- Social links render only when URLs are non-null
- Forms disclose that HighLevel receives the submission for ministry follow-up
- Episode catalogue refreshes only through `npm run import:episodes`

## Security

Classification: Frontend / Marketing with a same-origin form API. Production headers are set in `next.config.ts` (nosniff, referrer policy, permissions policy, SAMEORIGIN framing, HSTS in production, `X-Permitted-Cross-Domain-Policies: none`, CSP allowing Next.js, HighLevel `link.msgsndr.com` / `leadconnectorhq.com`, and Google Tag Manager / Analytics connect hosts, `form-action 'self'`). The HighLevel tracking ID is a public client ID. The GTM container ID is a public client ID in `src/config/site.ts`. Prayer text is not written to localStorage, URLs, the console, or `dataLayer`. Native form webhooks are server-only via `GHL_FORM_WEBHOOK_URL`.
