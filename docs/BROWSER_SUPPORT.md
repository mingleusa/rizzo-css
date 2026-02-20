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

- **Default (Chromium):** Run **`pnpm test:a11y`** for accessibility (axe, keyboard, ARIA) in a Chromium environment.
- **Firefox:** `pnpm exec playwright test tests/a11y --project=a11y-firefox`
- **Safari (WebKit):** `pnpm exec playwright test tests/a11y --project=a11y-webkit`
- **Edge:** `pnpm exec playwright test tests/a11y --project=a11y-edge` (requires `playwright install msedge`)
- **Mobile Chrome (Pixel 5):** `pnpm exec playwright test tests/a11y --project=a11y-mobile-chrome`
- **Mobile Safari (iPhone 12):** `pnpm exec playwright test tests/a11y --project=a11y-mobile-safari` (requires `playwright install webkit`)
- **All desktop (Chrome, Firefox, WebKit, Edge):**  
  `pnpm exec playwright test tests/a11y --project=a11y --project=a11y-firefox --project=a11y-webkit --project=a11y-edge`
- **All projects:**  
  `pnpm exec playwright test tests/a11y`

Install browsers as needed: `pnpm exec playwright install` (all), or `pnpm exec playwright install firefox webkit msedge` for cross-browser.

For manual cross-browser or mobile testing, run the dev server and test key flows (theme switch, modals, dropdowns, Settings, Search) in the target browser or device.
