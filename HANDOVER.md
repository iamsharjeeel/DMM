# Handover

## Current build state

Phase 1 informational site with the locked **Modern Heritage Ministry** visual system applied. No backend. Includes the Loving Everyone Always audio archive at `/episodes`.

## Completed pages

- `/` Home / About
- `/episodes` Audio archive
- `/speaking`
- `/prayer-requests`
- `/privacy`
- `/terms`
- App `not-found`

## Implemented functionality

- Sticky header with Home, Listen, Speaking, Prayer Requests, and Book Pastor Mayes CTA; active nav state
- Accessible mobile menu with focus trap, rendered in a portal so it covers the viewport
- Footer with motto, nav, booking CTA, copyright, legal links
- Speaking booking form: validation, required/optional states, success state
- Prayer form: conditional follow-up fields, consent, success state
- `/episodes` searchable, sortable RSS-backed catalogue with a five-row list-flip and a pinned native audio player
- SEO metadata, canonical URLs, OG images, sitemap, robots, Person/Organization/WebSite JSON-LD; PodcastSeries on `/episodes`
- Photography and logo placeholders that can be swapped from config/tokens
- Design tokens and primitives in `src/app/globals.css` and `src/components/ui/`

## Audio archive

- Source feed: `https://anchor.fm/s/328aea1c/podcast/rss`
- Importer: `npm run import:episodes` writes `src/content/episodes.catalogue.json`
- Render logic reads the committed JSON only; the importer is not part of the Vercel build
- Default selected episode is *After Easter Now What?*
- The archive index shows five rows per page, with previous/next list-flip for the rest
- Playback uses the RSS enclosure URL in a single `<audio>` element; errors show “Playback is being connected”
- RSS owner email is not displayed

## Frontend-only forms

Valid submissions show an on-page confirmation. Nothing is stored, emailed, posted, or logged.

Honest notices are shown on both forms so this is not mistaken for live delivery.

## Known limitations

- No submission infrastructure
- Contact email not displayed (unconfirmed)
- Social icons hidden until URLs are set
- Testimonials component exists but is hidden (`speaking.testimonials.items` is empty)
- Legal copy is provisional
- Episode artwork currently uses the show image from RSS for every row

## Pending client assets

- Final logo → `public/brand/logo.svg` (then wire `Wordmark`)
- Pastor photography → `public/images/pastor/` and paths in `src/config/site.ts`
- Confirmed contact email → `site.email`
- Social URLs → `site.social`
- Testimonials → `src/content/speaking.ts` `testimonials.items`
- Production domain → `NEXT_PUBLIC_SITE_URL`
- Legal review of Privacy and Terms
- Real form submission (separate future project)

Brand colors and type are no longer pending: they follow the locked kit in `docs/DESIGN-SYSTEM.md`.

## Intentionally not implemented

HighLevel, A.B.S., CRM, APIs, webhooks, databases, Supabase, email providers, analytics, marketing pixels.

## Legal copy

Provisional. Requires review once collection and contact details exist.

## Vercel readiness

Ready for GitHub → Vercel import. No required backend env vars. Optional: `NEXT_PUBLIC_SITE_URL` (hostname or full HTTPS origin). `getSiteUrl()` prefixes `https://` when the value is a hostname such as `dmm-omega.vercel.app`.

## Verification (2026-08-17)

- lint: pass (`npm run lint`)
- typecheck: pass (`npm run typecheck`)
- production build: pass (`npm run build`, Next.js 16.3.1, `/episodes` static)
- routes: `/`, `/episodes`, `/speaking`, `/prayer-requests`, `/privacy`, `/terms`

## Recommended next action

Import the repo into Vercel and attach the production domain when it is confirmed. In parallel, collect logo and Pastor Mayes photography. Re-run `npm run import:episodes` when new messages are published.
