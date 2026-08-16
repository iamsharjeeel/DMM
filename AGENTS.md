<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# Donald Mayes Ministries — Agent Instructions

## Before changing anything

1. Read `VISION.md`
2. Read `HANDOVER.md`
3. Review `CHANGELOG.md`
4. Inspect existing architecture (`docs/ARCHITECTURE.md`, `src/config/site.ts`, `src/content/`)
5. Preserve client-approved wording and intent

## During implementation

- Do not invent ministry programs, testimonials, achievements, statistics, theology, partnerships, events, or speaking engagements
- Do not rewrite approved copy into marketing language
- Keep Pastor Mayes at the center of the experience
- Keep navigation to Home, Listen, Speaking, Prayer Requests, and Book Pastor Mayes
- Preserve responsiveness and accessibility
- Reuse existing components
- Change brand colors/fonts only through CSS tokens in `src/app/globals.css`
- Keep TypeScript strict; do not use `any` casually
- Avoid new dependencies unless necessary
- Keep Vercel compatibility
- Do not add backend, APIs, webhooks, CRM, HighLevel, Supabase, databases, or email sending unless explicitly instructed
- Forms stay frontend-only until a later project
- Do not persist prayer text to localStorage, URLs, analytics, or the console
- Do not display social links unless URLs exist in `src/config/site.ts`
- Do not generate or fake photographs of Pastor Mayes

## Content rules

- Source copy lives in `src/content/`
- Changeable ministry values live in `src/config/site.ts`
- If design instinct conflicts with client vision, follow the client vision

## Before finishing

- `npm run lint`
- `npm run typecheck`
- `npm run build`
- Verify routes: `/`, `/episodes`, `/speaking`, `/prayer-requests`, `/privacy`, `/terms`
- Update `CHANGELOG.md`
- Update `HANDOVER.md`
- Update docs when architecture, content, or setup changes
