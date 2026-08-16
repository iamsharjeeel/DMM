# Architecture

## Stack

Next.js 16 App Router, React 19, TypeScript strict, Tailwind CSS 4. npm lockfile.

## Routes

| Path | File | Notes |
| --- | --- | --- |
| `/` | `src/app/page.tsx` | Home / About |
| `/speaking` | `src/app/speaking/page.tsx` | Includes `#booking` |
| `/prayer-requests` | `src/app/prayer-requests/page.tsx` | Calmer page tone |
| `/privacy` | `src/app/privacy/page.tsx` | |
| `/terms` | `src/app/terms/page.tsx` | |
| 404 | `src/app/not-found.tsx` | |

Special files: `sitemap.ts`, `robots.ts`, `opengraph-image.tsx`, `icon.tsx`, `apple-icon.tsx`.

## Server vs client

Server Components by default.

Client Components:

- `HeaderNav` — active gold hairline on the current route
- `MobileNavigation` — open state, focus, escape, scroll lock
- `SpeakingBookingForm`
- `PrayerRequestForm`

No route handlers. No server actions. No fake fetch calls.

## Component hierarchy

- `layout.tsx` → SkipLink, JSON-LD, Header, children, Footer
- Pages compose section components
- Sections read from `src/content/*`
- Forms use shared field primitives

## Content architecture

Copy is separated from JSX:

- `src/content/home.ts`
- `src/content/speaking.ts`
- `src/content/prayer.ts`
- `src/content/legal.ts`
- `src/content/navigation.ts`

Site-wide values: `src/config/site.ts`.

## Forms

Client-side validation only. Success is local React state. Prayer follow-up fields appear when the visitor chooses Yes; email/phone/consent become required according to the selected method.

Do not add persistence or network code here without an explicit later project.

## Metadata

`createMetadata()` sets title, description, canonical, Open Graph, and Twitter fields. `metadataBase` comes from `getSiteUrl()` (`NEXT_PUBLIC_SITE_URL`, then Vercel URL, then `https://donaldmayesministries.com`).

JSON-LD in `src/lib/json-ld.ts` describes WebSite, Organization, and Person only from documented facts.

## Design tokens

Brand tokens are CSS custom properties in `src/app/globals.css` (`:root`). Tailwind `@theme inline` maps them to utilities (`bg-canvas`, `text-gold`, `bg-navy-panel`, `font-display`, `max-w-content`).

## Important decisions

- No shadcn/SaaS card system — editorial layout
- No icon package — small inline SVGs
- Testimonials component is real but hidden while the array is empty
- Social links render only when URLs are non-null
- Forms disclose that delivery is not connected
