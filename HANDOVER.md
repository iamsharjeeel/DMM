# Handover

## Current build state

Phase 1 production-ready informational site. Temporary branding. No backend.

## Completed pages

- `/` Home / About
- `/speaking`
- `/prayer-requests`
- `/privacy`
- `/terms`
- App `not-found`

## Implemented functionality

- Sticky header with Home, Speaking, Prayer Requests, and Book Pastor Mayes CTA
- Accessible mobile menu
- Footer with motto, nav, copyright, legal links
- Speaking booking form: validation, required/optional states, success state
- Prayer form: conditional follow-up fields, consent, success state
- SEO metadata, canonical URLs, OG images, sitemap, robots, Person/Organization/WebSite JSON-LD
- Photography and logo placeholders that can be swapped from config/tokens

## Frontend-only forms

Valid submissions show an on-page confirmation. Nothing is stored, emailed, posted, or logged.

Honest notices are shown on both forms so this is not mistaken for live delivery.

## Known limitations

- No submission infrastructure
- Contact email not displayed (unconfirmed)
- Social icons hidden until URLs are set
- Testimonials component exists but is hidden (`speaking.testimonials.items` is empty)
- Legal copy is provisional

## Pending client assets

- Final logo → `public/brand/logo.svg` (then wire `Wordmark`)
- Final brand colors → `:root` tokens in `src/app/globals.css`
- Pastor photography → `public/images/pastor/` and paths in `src/config/site.ts`
- Confirmed contact email → `site.email`
- Social URLs → `site.social`
- Testimonials → `src/content/speaking.ts` `testimonials.items`
- Production domain → `NEXT_PUBLIC_SITE_URL`
- Legal review of Privacy and Terms
- Real form submission (separate future project)

## Intentionally not implemented

HighLevel, A.B.S., CRM, APIs, webhooks, databases, Supabase, email providers, analytics, marketing pixels.

## Legal copy

Provisional. Requires review once collection and contact details exist.

## Vercel readiness

Ready for GitHub → Vercel import. No required backend env vars. Optional: `NEXT_PUBLIC_SITE_URL` (hostname or full HTTPS origin). `getSiteUrl()` prefixes `https://` when the value is a hostname such as `dmm-omega.vercel.app`.

## Verification (2026-08-16)

- lint: pass (`npm run lint`)
- typecheck: pass (`npm run typecheck`; layout props do not depend on generated `LayoutProps`)
- production build: pass (`npm run build`, Next.js 16.3.1, all listed routes static)
- production build with `NEXT_PUBLIC_SITE_URL=dmm-omega.vercel.app`: pass (Vercel hostname-only env)
- route check: `/`, `/speaking`, `/prayer-requests`, `/privacy`, `/terms`, sitemap, robots, OG images return 200; unknown path returns 404; `#booking` present; no testimonials rendered

## Recommended next action

Import the repo into Vercel and attach the production domain when it is confirmed. In parallel, collect logo, colors, and Pastor Mayes photography.
