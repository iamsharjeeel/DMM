# Design system

Locked **DMM Red + Blue** identity. Change tokens in `src/app/globals.css`, not one-off hex values in components.

## Brand tokens (`:root`)

| Token | Value | Role |
| --- | --- | --- |
| `--brand-blue` | `#052C91` | Primary structure, controls, focus, authority |
| `--brand-blue-deep` | `#031E64` | Dark sections, footer, player |
| `--brand-blue-hover` | `#04257D` | Primary hover |
| `--brand-blue-soft` | `#E8EDF9` | Supporting blue tint |
| `--brand-red` | `#C7060F` | Hairlines, active markers, portrait corners |
| `--brand-red-bright` | `#E10F19` | Audio progress on deep blue |
| `--brand-red-deep` | `#97030B` | Accent hover |
| `--brand-ivory` | `#F7F4EE` | Page canvas |
| `--brand-cream` | `#FFFCF7` | Raised and form surfaces |
| `--brand-mist` | `#E9EDF7` | Quiet supporting bands |
| `--brand-charcoal` | `#202126` | Primary text |
| `--brand-muted` | `#686A70` | Secondary text |
| `--brand-error` | `#7A242A` | Form errors only |

Target balance: 65–70% warm neutrals, 20–25% blue, 5–10% red. Red is a precise signal, not a canvas or default text color.

## Typography

- Instrument Serif (`font-display`) for headlines, motto, pull quotes, and editorial numerals
- Manrope (`font-sans`) for body copy, navigation, controls, labels, and eyebrows
- Display hierarchy comes from scale, spacing, and italic treatment rather than heavy weight

## Surfaces and rhythm

- Ivory for primary editorial pages
- Cream for raised sections and form surfaces
- Mist for quiet supporting bands
- Deep blue for authority sections, footer, and the listening object
- Thin red details for rules, active states, image corners, and audio progress
- Radius stays 1–2px; shadows stay low-opacity and blue-tinted

Page rhythm remains light → editorial → quiet tint → dark authority → light. Do not alternate large red and blue bands.

## Components

- `Button` / `ButtonLink`: red primary on light surfaces, blue-outline secondary, editorial ghost, cream-outline invert
- `Wordmark`: approved DMM mark beside the Donald Mayes Ministries text identity
- `PastorImage`: locked Pastor Mayes hero and biography photography with thin red L-corners
- `EditorialImage`: secondary sanctuary or speaking atmosphere with matching restrained framing
- Episode archive: ivory index, mist discovery band, deep-blue pinned player, red active/progress details
- `SectionHeading`, `Eyebrow`, `AccentRule`, `PullQuote`, `Reveal`
- Forms: cream fields, blue focus treatment, explicit labels, distinct dark-red errors

## Dark sections

- Use cream for readable text on deep blue
- Use reduced-opacity cream for secondary copy
- Red may appear as a thin rule or control state, never as normal text on blue
- Dark sections stay flat and unfiltered to protect scroll performance

## Logo

Use the client-approved transparent DMM artwork without recoloring, effects, distortion, badges, or alternate redraws. Keep the adjacent text wordmark readable because embedded logo lettering is not relied on at navigation size.

## Accessibility and motion

- Keep normal text combinations at WCAG AA contrast or better
- Use blue for focus indicators and trust-oriented form states
- Keep functional errors visually distinct from brand red
- Preserve keyboard behavior and visible focus
- Honor `prefers-reduced-motion`; use only short fades, rises, and controlled image zoom
