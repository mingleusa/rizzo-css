# Browser support

Rizzo CSS targets **modern browsers** that support the features it uses. This document summarizes what is required and optional fallbacks.

## Required features

- **OKLCH colors** — All themes and semantic colors use the `oklch()` function. Supported in Chrome 111+, Safari 15.4+, Firefox 113+, Edge 111+. See [caniuse.com/oklch](https://caniuse.com/oklch).
- **CSS custom properties (variables)** — Used throughout for theming and layout.
- **Modern selectors** — `:focus-visible`, `:where()`, and similar as used in the stylesheets.

## Polyfills and fallbacks

- **OKLCH fallbacks** — For older browsers that do not support OKLCH, you can add a build step that generates fallback `rgb()` or hex values alongside `oklch()` (e.g. with a PostCSS plugin or a custom script). The design system does not ship fallbacks by default; themes are authored in OKLCH for consistency and accessibility (contrast).
- **Feature detection** — Use `@supports (color: oklch(0 0 0))` if you need to conditionally load a fallback stylesheet or adjust layout for legacy browsers.

## Testing

Run **`pnpm test:a11y`** for accessibility (axe, keyboard, ARIA) in a Chromium environment. For cross-browser and mobile testing, run the same tests in Firefox and Safari (e.g. Playwright projects) and on real devices as needed.
