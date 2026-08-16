# Design system

Editorial luxury system: **The Pastor's Record**. Artisanal-warm cream canvas with dark-navy interludes. Tokens live in `:root` (`src/app/globals.css`). Do not introduce new hex values.

## Palette

| Token | Hex | Role |
| --- | --- | --- |
| `--canvas` | `#f6f1e7` | Page background |
| `--canvas-soft` | `#efe7d8` | Soft field |
| `--canvas-deep` | `#e7ddc8` | Rare section tint |
| `--ink` | `#1d2532` | Headings and primary text |
| `--ink-soft` | `#2c3646` | Secondary ink |
| `--body` | `#4a4439` | Body copy |
| `--muted` | `#867d6f` | Captions, hints |
| `--gold` | `#b38c4e` | Sole accent |
| `--gold-deep` | `#93713a` | Gold hover only |
| `--navy-panel` | `#161c28` | Vision, prayer interludes, footer |
| `--navy-elevated` | `#222a3a` | Raised navy |
| `--hairline` | `#dcd2bf` | 1px rules |
| `--on-navy` | `#f0ead9` | Cream on navy |
| `--on-navy-muted` | `#a8a293` | Muted cream on navy |

Gold appears as eyebrow, primary CTA, and one micro-detail per viewport. On navy: cream type, gold filled CTA.

## Typography

Loaded from Google Fonts, latin subset.

| Role | Face | Size / weight / tracking |
| --- | --- | --- |
| display-xl | Cormorant Garamond | 64px / 500 / -0.01em |
| display-lg | Cormorant Garamond | 44px / 500 / -0.01em |
| display-md | Cormorant Garamond | 30px / 500 |
| serif-italic | Cormorant Garamond | 20–24px / 400 italic |
| body | Source Serif 4 | 17px / 400 / 1.65, max 62ch |
| meta-caps | Jost | 11px / 500 / +0.18em uppercase |

Display type never exceeds weight 500. Lockup monogram is 600 only.

Vertical spacing uses the 28px body leading: 28 / 56 / 84 / 112 / 140.

## Logo

`BrandLockup` (`src/components/brand/BrandLockup.tsx`): gold hairline square with overlapped DM monogram, plus stacked “Donald Mayes / MINISTRIES” in the header.

Monogram appears in three places only: header lockup, hero portrait reservation, footer.

Final file path remains `public/brand/logo.svg` (`site.assets.logo`) if a supplied mark replaces the lockup later.

## Photography

Slots in `site.photography`: `hero`, `portrait`, `speaking`.

Empty slots use a cream portrait reservation frame (hairline, italic gold note). Hero also includes the 40px monogram square. Keep 4×5. Do not generate a fake portrait.

## Buttons

Zero radius. Primary: gold fill, navy ink, meta-caps, 16px 32px. Secondary: 1px ink outline (navy on cream, cream on navy). Hover: `--gold-deep` or gold at 5%. No drop shadows.

## Forms

Hairline fields, zero radius, meta-caps labels, gold focus ring.

## Hard bans

No rounded corners, drop shadows, Inter as display, default blue, centered single-column sections, emoji/generic icons, extra accent colors, or gradient backgrounds except a future photograph.
