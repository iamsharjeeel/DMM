# Design system

Locked **Modern Heritage Ministry** system. Change tokens in `src/app/globals.css`, not one-off hex values in components.

## Brand tokens (`:root`)

| Token | Value | Role |
| --- | --- | --- |
| `--brand-forest` | `#183A32` | Authority, header bar, footer, dark bands, primary buttons, focus |
| `--brand-forest-deep` | `#122E28` | Hover on forest fills |
| `--brand-gold` | `#C59A52` | Hairline rules, monogram ring, decorative corners. Never small text |
| `--brand-ivory` | `#F7F3EA` | Page canvas |
| `--brand-cream` | `#FFFDF8` | Raised surfaces, form panels |
| `--brand-sage` | `#E4EAE3` | Breathing bands (mission, who we serve) |
| `--brand-charcoal` | `#202421` | Primary text (`text-ink`) |
| `--brand-muted` | `#6E746F` | Brand muted; small secondary text uses `--brand-ink-soft` for contrast |
| `--brand-error` | `#6F3A32` | Form errors only (functional, not a brand accent) |

Gold stays restrained: 1px rules, portrait L-corners, DM ring. Not button fills, not body copy, not eyebrows.

## Typography

- Display: Instrument Serif (`--font-instrument` / `font-display`) — headlines, motto, pull quotes, numerals
- Body/UI: Manrope (`--font-manrope` / `font-sans`) — navigation, forms, buttons, eyebrows

Loaded in `src/app/layout.tsx` via `next/font`. Instrument Serif is regular + italic only; hierarchy comes from size and italic, not weight.

Utilities: `.display-xl`, `.display-lg`, `.display-md`, `.eyebrow`.

## Spacing and width

- 4px-based scale: `--space-1` … `--space-24`
- Section padding: `--space-section`
- Hero padding: `--space-hero`
- Content: `--max-width-content` (72rem)
- Reading: `--max-width-narrow` (38rem)
- Wide hero: `--max-width-wide` (86rem)

## Surfaces and radius

Ivory / cream / sage / forest. Hairline `--brand-rule`. Radius stays 1–2px. No SaaS cards or heavy shadows. Forest bands use a faint grain overlay.

## Components

- `Button` / `ButtonLink`: primary forest, secondary forest outline, invert on forest, ghost underline
- `Wordmark`: forest DM mark with gold ring; invert on footer
- `PastorImage`: 4×5 portrait reservation with gold L-corners; swap via `site.photography`
- `SectionHeading`, `Eyebrow`, `GoldRule`, `PullQuote`, `Reveal`
- Forms: ivory fields, forest focus ring, explicit labels, associated errors

## Motion

Hero fade/rise. `Reveal` for below-fold entrance. Button lift. Portrait zoom on hover. Honor `prefers-reduced-motion`. No animation libraries.

## Page rhythm

Light and dark alternate. Dense lists follow a quieter band. Speaking uses forest for professional weight. Prayer stays ivory/cream, quieter, no dark hero.

## Logo and photography

Wordmark until `public/brand/logo.svg` exists. Photography paths in `src/config/site.ts`. Do not generate a likeness of Pastor Mayes.
