# Handover

## Current build state

Phase 1 informational site with the client-approved **DMM Red + Blue** visual system applied. Includes the Loving Everyone Always audio archive at `/episodes`. HighLevel external tracking is installed for page views. Google Tag Manager container `GTM-WQ272CGD` is installed globally. Native prayer and speaking forms POST to `/api/forms/[form]` and are forwarded server-to-server to HighLevel. Canonical search identity is `https://donaldmayesministries.com`. `/invite-pastor-mayes` is an isolated premium editorial speaking landing with a simplified inquiry form.

## Completed pages

- `/` Home / About
- `/stories/[slug]` Seven source testimonies
- `/episodes` Audio archive
- `/speaking`
- `/prayer-requests`
- `/booking` direct-link prayer-call calendar
- `/privacy`
- `/terms`
- `/sms-terms`
- `/invite-pastor-mayes` paid speaking landing (`noindex, follow`; not in sitemap)
- App `not-found`

## Implemented functionality

- Sticky header with Home, Listen, Speaking, Prayer Requests, and Book Pastor Mayes CTA; active nav state
- Accessible mobile menu with focus trap, rendered in a portal so it covers the viewport
- Footer with motto, nav, booking CTA, copyright, legal links, email, and phone
- Speaking booking form: validation, required/optional states, optional SMS consent, success state after confirmed HighLevel delivery (`speaking-booking`)
- Paid speaking landing at `/invite-pastor-mayes`: isolated chrome, short `speaking-meta-lead` form, UTM/`fbclid` attribution, GTM `dataLayer` conversion events. This route does not show SMS consent controls; omitted values default to `false`.
- Prayer form: conditional follow-up fields, general contact permission, optional SMS consent, success state after confirmed HighLevel delivery (`prayer-request`)
- `/episodes` searchable, sortable RSS-backed catalogue with a five-row list-flip and a pinned native audio player
- Home stories section after Who We Serve: Ed featured (one-paragraph preview plus pull quote), Tim Moore and Yolanda Bryant secondary (short previews), four compact stories with category/name/title/link only; each opens `/stories/[slug]`
- SEO metadata, canonical URLs locked to `https://donaldmayesministries.com`, OG/Twitter images using the official logo, sitemap, robots, Person/Organization/WebSite JSON-LD; PodcastSeries on `/episodes`
- HighLevel external tracking script on every page (`HighLevelTracking` in the root layout)
- Google Tag Manager container `GTM-WQ272CGD` on every page (`GoogleTagManager` in the root layout); `/invite-pastor-mayes` also pushes non-PII `dataLayer` conversion events
- `/booking` embeds the HighLevel prayer-call calendar with responsive minimal DMM chrome
- Header, footer, and mobile navigation use the transparent official DMM mark beside the Donald Mayes Ministries text identity
- Home hero uses the locked pulpit image; Meet Pastor uses the locked yellow-jacket portrait
- Design tokens and primitives in `src/app/globals.css` and `src/components/ui/`

## Audio archive

- Source feed: `https://anchor.fm/s/328aea1c/podcast/rss`
- Importer: `npm run import:episodes` writes `src/content/episodes.catalogue.json`
- Render logic reads the committed JSON only; the importer is not part of the Vercel build
- Default selected episode is *After Easter Now What?*
- The archive index shows five rows per page, with previous/next list-flip for the rest
- Playback uses the RSS enclosure URL in a single `<audio>` element; errors show “Playback is being connected”
- RSS owner email is not displayed

## Stories

Source testimonies live in `src/content/stories.ts`. The homepage section sits after Who We Serve and before Speaking. Ed is featured with a one-paragraph preview and pull quote; Tim Moore and Yolanda Bryant are secondary with short previews; Herbert Huyler, Charles Reiffit, Pastor Jessie Herring, and John James are compact (no paragraph). Full copy is on `/stories/[slug]`. Story SEO titles use the story title plus the ministry template; meta descriptions use `seoDescription`, not the homepage preview. Do not invent quotes, outcomes, or photographs. The section uses existing DMM blue/red/cream tokens only.

## Forms and HighLevel

Valid submissions `preventDefault`, POST JSON to `/api/forms/prayer-request`, `/api/forms/speaking-booking`, or `/api/forms/speaking-meta-lead`, and show confirmation only after the server receives a 2xx from the HighLevel webhook. Header `source` is set server-side from the allowlisted form name. SMS consent booleans are forwarded as submitted; the server appends `smsConsentCapturedAt`, `smsConsentSource`, and `smsConsentVersion`.

Prayer text is not written to localStorage, URLs, or the console. Form values are not logged.

Required env: `GHL_FORM_WEBHOOK_URL` (server-only). See `docs/FORMS.md`.

`/booking` remains a HighLevel calendar iframe and is not routed through this API.

The speaking page booking form is temporary until a HighLevel speaking calendar replaces it.

## Known limitations

- Speaking still uses the temporary native booking form
- Social icons hidden until URLs are set
- Testimonials component exists but is hidden (`speaking.testimonials.items` is empty)
- Episode artwork currently uses the show image from RSS for every row
- Client-side App Router navigations may under-count page views compared to full loads

## Pending client assets

- Social URLs → `site.social`
- Testimonials → `src/content/speaking.ts` `testimonials.items`
- Story photographs are not used; do not generate them
- Confirm `donaldmayesministries.com` DNS in Vercel
- Counsel review of Privacy, Terms, and SMS Terms
- HighLevel A2P workflows must send marketing SMS only when `smsMarketingConsent === true` and non-marketing SMS only when `smsNonMarketingConsent === true`
- Map GTM `dmm_speaking_lp_*` events to Meta once a Pixel ID is supplied; do not hardcode a Pixel in the app
- HighLevel speaking calendar to replace the temporary booking form

Brand colors and type follow the locked DMM blue, restrained red, warm neutral, Instrument Serif, and Manrope system in `docs/DESIGN-SYSTEM.md`.

## DMM brand overhaul

- Why: align the full editorial experience with the client-approved red and royal-blue identity
- Shared files: `src/app/globals.css`, `src/components/ui/`, `src/components/layout/`
- Page files: home, speaking, prayer, legal, and episode section components
- Metadata files: theme color, generated OG image, favicon, and Apple icon
- Documentation: `docs/DESIGN-SYSTEM.md`, `docs/ARCHITECTURE.md`, `CHANGELOG.md`
- Refinement: primary light-surface actions are red; secondary actions remain blue
- Performance: removed sticky-header blur, full-section grain/mix-blend overlays, and CSS smooth scrolling
- Image strategy: locked production portraits now anchor the home hero and Meet Pastor section
- Homepage refinement: normalized container edges, tightened responsive hero spacing, centered prayer composition, and aligned speaking/contact CTAs with their content blocks

## Intentionally not implemented

A.B.S., extra CRM systems, databases, Supabase, email providers, HighLevel speaking-calendar replacement, GA4/Ads IDs in application code.

## Legal copy

Published production Privacy Policy, Terms of Service, and SMS Messaging Terms. Counsel review is still recommended.

## Cloud Agent environment

- Config: `.cursor/environment.json` (repository-managed)
- Install: `npm ci`
- Terminal: `dev-server` runs `npm run dev` (Next.js on port 3000)
- No secrets required for page rendering; native form delivery requires `GHL_FORM_WEBHOOK_URL`. `NEXT_PUBLIC_SITE_URL` and `NEXT_PUBLIC_GHL_TRACKING_ID` are optional

## Security

### Security Classification

Frontend / Marketing with a same-origin native-form API. No auth or database.

### Controls Implemented

- HTTPS via canonical `https://donaldmayesministries.com` for SEO URLs; `getSiteUrl()` remains for native-form origin allowlisting
- Production headers in `next.config.ts`: `X-Content-Type-Options`, `Referrer-Policy`, `Permissions-Policy`, `X-Frame-Options: SAMEORIGIN`, `X-Permitted-Cross-Domain-Policies: none`, HSTS in production, CSP (`frame-ancestors 'self'`, `form-action 'self'`, HighLevel script/frame hosts allowed, Google Tag Manager hosts allowed, no `unsafe-eval`)
- Form required/type/length/enum validation on the client and authoritative Zod validation on the server
- Native `maxLength` on text fields; 32 KB JSON body limit; `application/json` only
- Same-origin checks, honeypot, supplemental timing signal, and in-memory form rate limits
- React escaping; JSON-LD uses `JSON.stringify` of our data only
- Prayer text is not written to localStorage, URLs, the console, or `dataLayer`
- `.gitignore` excludes `.env*`; `.env.example` has names only
- HighLevel tracking ID is a public client ID, overridable via `NEXT_PUBLIC_GHL_TRACKING_ID`
- GTM container ID `GTM-WQ272CGD` is a public client ID in `src/config/site.ts`
- External social links (when URLs exist) use `rel="noopener noreferrer"`

### External / Platform Controls

- Vercel HTTPS and HSTS on production
- HighLevel receives page views via external tracking and native-form JSON via the server webhook forwarder
- Google Tag Manager is installed as tag-management infrastructure; do not assume Google Analytics is active unless it is configured inside that container
- Application-layer form rate limiting is in-memory (not globally reliable on serverless); enable Vercel WAF rate limiting too

### Remaining Security Considerations

- CSP allows `'unsafe-inline'` scripts/styles because Next.js hydration requires it without a nonce pipeline
- No CAPTCHA/Turnstile on the public forms (low-friction ministry forms; HighLevel is the receiver)
- Legal copy is published; counsel review is still recommended
- Client-side App Router navigations may under-count HighLevel page views versus full loads

### Manual Configuration Required

- `NEXT_PUBLIC_SITE_URL` is optional and is not used for canonical SEO
- `GHL_FORM_WEBHOOK_URL` on Vercel Production and Preview (server-only HighLevel inbound webhook)
- Optional `NEXT_PUBLIC_GHL_TRACKING_ID` only to override the ID already in `src/config/site.ts`
- After deploy: confirm test speaking and prayer JSON payloads in HighLevel
- Attach the production domain in Vercel

This site is not “100% secure.” Security depends on Vercel, HighLevel, dependencies, and ongoing configuration.

## Vercel readiness

Ready for GitHub → Vercel import. Required: `GHL_FORM_WEBHOOK_URL`. Optional: `NEXT_PUBLIC_SITE_URL` (runtime origin checks; canonical SEO is always `https://donaldmayesministries.com`). HighLevel tracking ID defaults in `src/config/site.ts`; optional override is `NEXT_PUBLIC_GHL_TRACKING_ID`. GTM container ID is `GTM-WQ272CGD` in `src/config/site.ts`.

## Verification (2026-08-26)

- lint: pass (`npm run lint`)
- typecheck: pass (`npm run typecheck`)
- form schema/webhook tests: pass (`npm test`)
- production build: pass (`npm run build`, Next.js 16.3.1; `/sms-terms` and `/invite-pastor-mayes` static)

## Verification (2026-08-25)

- lint: pass (`npm run lint`)
- typecheck: pass (`npm run typecheck`)
- form schema/webhook tests: pass (`npm test`)
- form API e2e: pass (`npm run test:forms-api`) — origin, JSON, size, honeypot, rate limit, source headers
- production build: pass (`npm run build`, Next.js 16.3.1; `/api/forms/[form]` is dynamic)
- routes: `/`, `/episodes`, `/speaking`, `/prayer-requests`, `/booking`, `/privacy`, `/terms`, `/stories/ed`
- Chromium: homepage passes at 1440, 1280, 1024, 768, 430, 390, and 375px with no horizontal overflow
- Production visual QA: official logo, both locked portraits, CTA alignment, footer, and mobile navigation pass
- Booking QA: HighLevel calendar load, dynamic resize, date/time interaction, minimal chrome, and 430/390/375px layouts pass
- Native forms: prayer and speaking success only after `/api/forms/[form]` 200; mock webhook received `source: prayer-request` and `source: speaking-booking`
- Favicon: `/icon.png`, `/apple-icon.png`, and `/favicon.ico` serve the official heart mark
- Scroll profile: native scrolling, zero sampled long frames/tasks, approximately 16.8ms worst frame delta
- Chromium: homepage passes at 1440, 1280, 1024, 768, 430, 390, and 375px with no horizontal overflow
- Production visual QA: official logo, both locked portraits, CTA alignment, footer, and mobile navigation pass
- Booking QA: HighLevel calendar load, dynamic resize, date/time interaction, minimal chrome, and 430/390/375px layouts pass
- Scroll profile: native scrolling, zero sampled long frames/tasks, approximately 16.8ms worst frame delta

## Recommended next action

After deploy, set `GHL_FORM_WEBHOOK_URL` and confirm speaking and prayer JSON payloads in HighLevel. Re-run `npm run import:episodes` when new messages are published.
