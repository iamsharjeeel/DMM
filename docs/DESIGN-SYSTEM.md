# Design system

Temporary visual system until final brand assets arrive. Change tokens, not component-by-component hex values.

## Palette (`src/app/globals.css`)

| Token | Role |
| --- | --- |
| `--brand-ivory` | Page background |
| `--brand-paper` | Alternate surface |
| `--brand-ivory-deep` | Mission band |
| `--brand-prayer` | Prayer page warmth |
| `--brand-ink` | Primary text |
| `--brand-ink-soft` | Secondary text |
| `--brand-navy` | Professional / footer / speaking hero |
| `--brand-bronze` | Accent, CTA, FCL letters |

To replace final colors: update the `:root` variables only.

## Typography

- Display: Cormorant Garamond (`--font-cormorant` / `font-display`)
- Body: Source Sans 3 (`--font-source-sans` / `font-sans`)

Replace by changing `src/app/layout.tsx` font imports and the CSS variables.

## Logo

Current: HTML wordmark + DM monogram in `Wordmark`.

Final file path: `public/brand/logo.svg` (`site.assets.logo`). Swap `Wordmark` to `next/image` when the asset exists. Do not invent an elaborate logo.

## Photography

Slots in `site.photography`: `hero`, `portrait`, `speaking`.

Place files in `public/images/pastor/` and set the paths in `src/config/site.ts`.

Recommended ratios:

- hero / portrait: 4×5
- speaking: 4×5 until a landscape environmental portrait exists (component also supports `landscape` 16×10)

Do not use church-building imagery as the hero. Do not generate a fake portrait of Pastor Mayes.

## Spacing and width

- Section padding: `--space-section`
- Content width: `--max-width-content` (72rem)
- Narrow reading width: `--max-width-narrow` (40rem)

## Buttons

`Button` / `ButtonLink`: primary bronze, secondary outline, navy, invert on dark bands. Small radius (`2px`). Uppercase tracking.

## Forms

Paper fields, bronze focus ring, explicit labels, required asterisk + screen-reader text, associated errors.

## Sections

Whitespace and rules over cards. Avoid boxed grids for every block. Mission/vision is a split band (what we do vs what it hopes to accomplish). FCL uses large letters. Speaking topics are a numbered editorial list.

## Borders and radius

Hairline `--brand-rule`. Radius stays small. No giant SaaS cards or heavy shadows.

## Motion

`.reveal` is a short fade/rise on the hero. Honor `prefers-reduced-motion`. No animation libraries.

## Prayer vs speaking

Speaking: navy, structured, professional. Prayer: warmer ivory (`bg-prayer`), quieter, fewer competing elements.
