# Handover

## Current build state

Phase 1 informational site with the client-approved **DMM Red + Blue** visual system applied. Includes the Loving Everyone Always audio archive at `/episodes`. HighLevel external tracking is installed for page views and form capture. No other backend.

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
- Speaking booking form: validation, required/optional states, success state; captured by HighLevel as `speaking-booking`
- Prayer form: conditional follow-up fields, consent, success state; captured by HighLevel as `prayer-request`
- `/episodes` searchable, sortable RSS-backed catalogue with a five-row list-flip and a pinned native audio player
- SEO metadata, canonical URLs, OG images, sitemap, robots, Person/Organization/WebSite JSON-LD; PodcastSeries on `/episodes`
- HighLevel external tracking script on every page (`HighLevelTracking` in the root layout)
- Wordmark reads its mark from `site.assets.logo` beside the Donald Mayes Ministries text identity
- Design tokens and primitives in `src/app/globals.css` and `src/components/ui/`

## Audio archive

- Source feed: `https://anchor.fm/s/328aea1c/podcast/rss`
- Importer: `npm run import:episodes` writes `src/content/episodes.catalogue.json`
- Render logic reads the committed JSON only; the importer is not part of the Vercel build
- Default selected episode is *After Easter Now What?*
- The archive index shows five rows per page, with previous/next list-flip for the rest
- Playback uses the RSS enclosure URL in a single `<audio>` element; errors show “Playback is being connected”
- RSS owner email is not displayed

## Forms and HighLevel

Valid submissions show an on-page confirmation (`preventDefault`). The HighLevel external tracking script on every page is how booking and prayer fields reach the CRM.

Prayer text is not written to localStorage, URLs, or the console.

Verify after deploy in HighLevel:

- Sites → Forms → Submissions → External Forms
- Sites → Analytics → External Tracking

The booking form is temporary until a HighLevel calendar replaces it. Do not embed a calendar yet.

## Known limitations

- No HighLevel calendar embed yet
- Contact email not displayed (unconfirmed)
- Social icons hidden until URLs are set
- Testimonials component exists but is hidden (`speaking.testimonials.items` is empty)
- Legal copy is provisional
- Episode artwork currently uses the show image from RSS for every row
- Client-side App Router navigations may under-count page views compared to full loads

## Pending client assets

- Pastor photography → `public/images/pastor/` and paths in `src/config/site.ts`
- Confirmed contact email → `site.email`
- Social URLs → `site.social`
- Testimonials → `src/content/speaking.ts` `testimonials.items`
- Production domain → `NEXT_PUBLIC_SITE_URL`
- Legal review of Privacy and Terms
- HighLevel calendar to replace the temporary booking form

Brand colors and type follow the locked DMM blue, restrained red, warm neutral, Instrument Serif, and Manrope system in `docs/DESIGN-SYSTEM.md`.

## DMM brand overhaul

- Why: align the full editorial experience with the client-approved red and royal-blue identity
- Shared files: `src/app/globals.css`, `src/components/ui/`, `src/components/layout/`
- Page files: home, speaking, prayer, legal, and episode section components
- Metadata files: theme color, generated OG image, favicon, and Apple icon
- Documentation: `docs/DESIGN-SYSTEM.md`, `docs/ARCHITECTURE.md`, `CHANGELOG.md`
- Pending: replace `public/brand/logo.svg` with the approved transparent DMM artwork when the missing source asset is supplied

## Intentionally not implemented

A.B.S., extra CRM systems, APIs, webhooks, databases, Supabase, email providers, marketing pixels, HighLevel calendar embed.

## Legal copy

Provisional. Requires review once collection and contact details exist.

## Cloud Agent environment

- Config: `.cursor/environment.json` (repository-managed)
- Install: `npm ci`
- Terminal: `dev-server` runs `npm run dev` (Next.js on port 3000)
- No secrets required; `NEXT_PUBLIC_SITE_URL` and `NEXT_PUBLIC_GHL_TRACKING_ID` are optional

## Security

### Security Classification

Frontend / Marketing. No auth, database, owned APIs, or application form endpoints.

### Controls Implemented

- HTTPS via `getSiteUrl()` / `metadataBase` (hostname-only values are prefixed with `https://`)
- Production headers in `next.config.ts`: `X-Content-Type-Options`, `Referrer-Policy`, `Permissions-Policy`, `X-Frame-Options: SAMEORIGIN`, CSP (`frame-ancestors 'self'`, HighLevel script host allowed, no `unsafe-eval`)
- Form required/type/length/enum validation; native `maxLength` on text fields
- React escaping; JSON-LD uses `JSON.stringify` of our data only
- Prayer text is not written to localStorage, URLs, or the console
- `.gitignore` excludes `.env*`; `.env.example` has names only
- HighLevel tracking ID is a public client ID, overridable via `NEXT_PUBLIC_GHL_TRACKING_ID`
- External social links (when URLs exist) use `rel="noopener noreferrer"`

### External / Platform Controls

- Vercel HTTPS and HSTS on production
- HighLevel receives page views and form submits; abuse/rate-limiting is on HighLevel, not an owned POST endpoint

### Remaining Security Considerations

- CSP allows `'unsafe-inline'` scripts/styles because Next.js hydration requires it without a nonce pipeline
- No CAPTCHA/Turnstile on the public forms (low-friction ministry forms; HighLevel is the receiver)
- Legal copy is provisional and needs review
- Client-side App Router navigations may under-count HighLevel page views versus full loads

### Manual Configuration Required

- `NEXT_PUBLIC_SITE_URL` for the confirmed production origin
- Optional `NEXT_PUBLIC_GHL_TRACKING_ID` only to override the ID already in `src/config/site.ts`
- After deploy: confirm test booking and prayer submits in HighLevel External Forms
- Attach the production domain in Vercel

This site is not “100% secure.” Security depends on Vercel, HighLevel, dependencies, and ongoing configuration.

## Vercel readiness

Ready for GitHub → Vercel import. Optional: `NEXT_PUBLIC_SITE_URL` (hostname or full HTTPS origin). `getSiteUrl()` prefixes `https://` when the value is a hostname such as `dmm-omega.vercel.app`. HighLevel tracking ID defaults in `src/config/site.ts`; optional override is `NEXT_PUBLIC_GHL_TRACKING_ID`.

## Verification (2026-08-17)

- lint: pass (`npm run lint`)
- typecheck: pass (`npm run typecheck`)
- production build: pass (`npm run build`, Next.js 16.3.1, `/episodes` static)
- routes: `/`, `/episodes`, `/speaking`, `/prayer-requests`, `/privacy`, `/terms`

## Recommended next action

Import the repo into Vercel and attach the production domain when it is confirmed. After deploy, submit a test booking and a test prayer request and confirm both appear in HighLevel. In parallel, collect Pastor Mayes photography. Re-run `npm run import:episodes` when new messages are published.
