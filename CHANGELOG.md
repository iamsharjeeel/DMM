# Changelog

## 2026-08-26

- Tightened homepage Stories previews: one paragraph for Ed, shorter Tim and Yolanda copy, compact stories as category/name/title/link only
- Locked canonical SEO to `https://donaldmayesministries.com`, added www/Vercel alias redirects, preview noindex, GTM `GTM-WQ272CGD`, and corrected sitemap/robots/schema/social graphics
- Published Privacy, Terms, and SMS Terms for A2P 10DLC, added optional marketing/non-marketing SMS consent on native forms, and displayed confirmed email and phone

## 2026-08-25

- Added a Real Stories homepage section and dedicated `/stories/[slug]` pages from source testimonies, using the approved DMM blue/red/cream system
- Routed native prayer and speaking forms through a same-origin API that validates, rate-limits, and forwards JSON to HighLevel with a server-derived `source` header
- Replaced the generated DMM-letter favicon with the official interlocking heart mark
- Replaced the forest, gold, and sage visual system with the client-approved DMM blue, restrained red, and warm neutral brand system
- Rebranded shared navigation, sections, forms, episode archive, player, metadata graphics, and responsive states
- Renamed the decorative `GoldRule` primitive to the brand-neutral `AccentRule`
- Updated brand architecture and design-system documentation for the DMM red and blue identity
- Promoted red to the primary light-surface CTA color while preserving blue structural and secondary treatments
- Replaced repeated pastor frames with one home portrait position and a curated sanctuary supporting image
- Removed header blur, full-section grain blending, and CSS smooth scrolling to reduce scroll repaint work
- Integrated the official transparent DMM mark and locked Pastor Mayes hero and portrait photography
- Refined homepage containers, image crops, section spacing, and CTA alignment across desktop, tablet, and mobile
- Added the direct-link `/booking` prayer-call calendar with minimal DMM chrome and responsive HighLevel embedding

## 2026-08-17

- Replaced the DM letters in the Wordmark box with the supplied white geometric mark
- Installed HighLevel external tracking site-wide and routed booking and prayer form submits into the CRM
- Added production security headers and form field length limits
- Switched the Cloud Agent install command to `npm ci`
- Added the Loving Everyone Always audio archive at `/episodes`, with RSS import, search, sort, filters, and a pinned native player
- Added a Listen item to primary navigation
- Limited the episode index to five rows per page with a list-flip pager, and moved the gold active rule off the archive number

## 2026-08-16

- Applied the locked Modern Heritage Ministry system: Deep Forest, Heritage Gold, Instrument Serif, and Manrope across every page
- Rebuilt layout, section composition, forms, motion, and OG/icons around design tokens and shared primitives
- Portaled the mobile menu overlay so it is not clipped by the sticky header
- Built Phase 1 Next.js site: Home, Speaking, Prayer Requests, Privacy, Terms, and 404
- Added centralized temporary brand tokens, content files, and site config
- Implemented accessible frontend-only booking and prayer forms with confirmation states
- Added metadata, sitemap, robots, JSON-LD, and generated Open Graph images
- Added Cursor Cloud environment config (`.cursor/environment.json`)
- Fixed Vercel production build: `metadataBase` now accepts hostname-only `NEXT_PUBLIC_SITE_URL` / `VERCEL_URL` values
