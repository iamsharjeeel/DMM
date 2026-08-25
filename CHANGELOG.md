# Changelog

## 2026-08-25

- Added a Real Stories homepage section and dedicated `/stories/[slug]` pages from source testimonies

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
