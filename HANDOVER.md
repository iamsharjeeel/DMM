# Handover

## Current build state

Phase 1 informational site, restyled as **The Pastor's Record** (editorial luxury: artisanal-warm canvas, navy interludes). No backend.

## What changed (editorial restyle)

- Brand kit applied: cream/navy/gold tokens in `:root`, Cormorant + Source Serif 4 + Jost
- `BrandLockup` SVG monogram + stacked wordmark (header); monogram only in footer
- Home, Speaking, and Prayer Requests restyled; copy and section order preserved
- Portrait reservation frames replace navy-gradient placeholders
- Forms: square fields, meta-caps labels, gold focus

## Completed pages

- `/` Home / About
- `/speaking`
- `/prayer-requests`
- `/privacy`
- `/terms`
- App `not-found`

## Implemented functionality

- Sticky header: lockup, meta-caps nav with gold hairline active state, Book Pastor Mayes CTA
- Accessible mobile menu
- Footer: centered monogram, gold italic motto, NAVIGATE / CONNECT, colophon
- Speaking booking form: validation, required/optional states, success state
- Prayer form: conditional follow-up fields, consent, success state
- SEO metadata, canonical URLs, OG images, sitemap, robots, Person/Organization/WebSite JSON-LD

## Frontend-only forms

Valid submissions show an on-page confirmation. Nothing is stored, emailed, posted, or logged.

## Known limitations

- No submission infrastructure
- Contact email not displayed (unconfirmed)
- Social links hidden until URLs are set
- Testimonials component exists but is hidden (`speaking.testimonials.items` is empty)
- Legal copy is provisional
- Pastor photography still pending (designed reservation frames)

## Pending client assets

- Final logo → `public/brand/logo.svg` (then optionally replace `BrandLockup`)
- Pastor photography → `public/images/pastor/` and paths in `src/config/site.ts`
- Confirmed contact email → `site.email`
- Social URLs → `site.social`
- Testimonials → `src/content/speaking.ts` `testimonials.items`
- Production domain → `NEXT_PUBLIC_SITE_URL`
- Legal review of Privacy and Terms
- Real form submission (separate future project)

## Intentionally not implemented

HighLevel, A.B.S., CRM, APIs, webhooks, databases, Supabase, email providers, analytics, marketing pixels.

## Vercel readiness

Ready for GitHub → Vercel import. Optional: `NEXT_PUBLIC_SITE_URL`. `getSiteUrl()` prefixes `https://` when the value is a hostname such as `dmm-omega.vercel.app`.

## Recommended next action

Collect Pastor Mayes photography and confirm contact/social URLs. Brand tokens are already applied as the proposed kit.
