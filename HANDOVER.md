# Handover

## Current build state

Phase 1 informational site with the locked **Modern Heritage Ministry** visual system applied. No backend.

## Completed pages

- `/` Home / About
- `/speaking`
- `/prayer-requests`
- `/privacy`
- `/terms`
- App `not-found`

## Implemented functionality

- Sticky header with Home, Speaking, Prayer Requests, and Book Pastor Mayes CTA; active nav state
- Accessible mobile menu with focus trap
- Footer with motto, nav, booking CTA, copyright, legal links
- Speaking booking form: validation, required/optional states, success state
- Prayer form: conditional follow-up fields, consent, success state
- SEO metadata, canonical URLs, OG images, sitemap, robots, Person/Organization/WebSite JSON-LD
- Photography and logo placeholders that can be swapped from config/tokens
- Design tokens and primitives in `src/app/globals.css` and `src/components/ui/`

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

## Recommended next action

Import the repo into Vercel and attach the production domain when it is confirmed. In parallel, collect logo and Pastor Mayes photography.
