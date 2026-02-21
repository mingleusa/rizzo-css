# Best Practices

This guide covers **component composition patterns** and **performance optimization tips** when building with Rizzo CSS. For design-system rules (variables, BEM, accessibility), see [DESIGN_SYSTEM.md – Best Practices](./DESIGN_SYSTEM.md#best-practices).

---

## Component composition patterns

Rizzo components are designed to be composed in layouts and with each other. Follow these patterns so behavior and styling stay consistent across Vanilla, Astro, and Svelte.

### Container and slot patterns

Many components act as **containers** that wrap arbitrary content:

- **Card** — Single root with optional variant; put content inside (e.g. `card__body` or your own structure). Use the same BEM classes if you add a header/footer.
- **Modal** — Trigger opens a dialog; slot or prop for body content. Use the same structure as in the [Modal component docs](/docs/components/modal).
- **Tabs** — Pass an array of `{ id, label, content? }` (or use slot panels). The Tabs component maps each tab to a panel; use either the `content` property or child nodes for panel body.
- **Accordion** — Pass `items` (id, title, content) or use slot children; one or multiple panels open depending on variant.

When building your own wrappers, preserve the root BEM block and the expected child classes (e.g. `card__body`, `tabs__panel`, `accordion__panel`) so Rizzo CSS applies correctly.

### Data-driven components

Use the **shared data shapes** so markup stays consistent and TypeScript types apply:

- **Tabs** — `Tab[]`: `id`, `label`, optional `content`, optional `icon` / `iconComponent`.
- **Dropdown** — `MenuItem[]`: `label`, optional `value`, `href`, `onClick`, `disabled`, `separator`, `submenu` (nested `MenuItem[]`).
- **Breadcrumb** — `BreadcrumbItem[]`: `label`, optional `href`.
- **Table** — `TableColumn[]`: `key`, `label`, optional `sortable`.
- **Accordion** — `AccordionItem[]`: `id`, `title`, `content`.
- **Footer** — `FooterLink[]`: `label`, `href`.

These types are defined in `src/types/components.ts` and re-exported from `src/types`. Use them in Astro props or Svelte so the same structures work across frameworks.

### Component dependency chains

When adding components via the CLI or by hand, respect **dependencies** so required pieces are present:

| Component   | Adds / requires                                                                 |
|------------|----------------------------------------------------------------------------------|
| **Navbar** | Search, Settings (so the navbar can show search trigger and settings button).   |
| **Settings** | ThemeSwitcher, FontSwitcher, SoundEffects (and `scaffold/config/fonts.ts` when added via CLI). |
| **Toast**  | Alert (toast uses the alert styles and close behavior).                         |

If you add Navbar, include Search and Settings (or at least the triggers and layout) so the navbar layout doesn’t have missing pieces. The CLI lists these in the component picker and auto-includes dependencies.

### Composing Navbar, Search, and Settings

- **Navbar** — Place Search and Settings in the desktop actions area (e.g. `navbar__actions-desktop`). On mobile, the menu can include links; search/settings are often icon-only in the header. Use the same BEM structure as the [Navbar component](/docs/components/navbar); the scaffold uses `window.openSettings()` for the settings button.
- **Search** — Standalone overlay (trigger + panel with input and results). When used inside the navbar, give it an `id` if you have multiple search instances.
- **Settings** — Opened via `window.openSettings()` from the layout script. The layout must include the Settings panel and the script that registers `openSettings`; the Navbar only needs a button that calls it.

See the scaffold layouts (Vanilla, Astro, Svelte) for full examples of Navbar + Search + Settings composition.

### Modifiers and variants

- Use **BEM modifiers** for variants (e.g. `btn--primary`, `card--elevated`, `tabs--pills`). Don’t invent new modifier names; use the ones defined in the component docs and CSS.
- Use **semantic props** where the component supports them (e.g. `variant="primary"` → `btn--primary`). Keeps a single source of truth and avoids class typos.

### Shared types and imports

When you extend or wrap Rizzo components:

- **Astro** — Import types from `../types` (or your alias): `import type { Tab, MenuItem, ButtonProps } from '../types'`.
- **Svelte** — Same types are available; use them in `interface Props` or for slot props so Astro and Svelte stay aligned.

This makes it easier to keep component APIs consistent and to add React/Vue later using the same data shapes.

---

## Performance optimization tips

### CSS loading

- **Single import** — Import Rizzo CSS once in your root layout or main entry (e.g. `import 'rizzo-css'` or `<link rel="stylesheet" href="/css/rizzo.min.css" />`). Avoid loading it multiple times or in multiple chunks.
- **CDN** — If you use a CDN, **pin the version** (e.g. `rizzo-css@0.0.54`) so cache hits are reliable and you control when to upgrade. Check with `curl -I <url>` that the response is 200.
- **No duplicate CSS** — If you use the npm package and also copy `rizzo.min.css` into `public/` or `static/`, use one or the other, not both.

### Bundle size

- After building CSS, run **`pnpm run size`** to report sizes for `public/css/main.min.css` and `packages/rizzo-css/dist/rizzo.min.css` (raw and gzip). Use this to track size over time; the single-bundle approach keeps one request and good cacheability.

### Theme and font flash prevention

- **Theme** — Apply the user’s stored theme (or system preference) **before** first paint. The scaffold layouts include an inline script in `<head>` that runs immediately: reads `localStorage.getItem('theme')` and sets `document.documentElement.setAttribute('data-theme', ...)`. Keep this script small and synchronous so the correct theme is applied before the rest of the page renders.
- **Fonts** — If you use custom font pairs (e.g. from Settings), consider preloading the main font files so text doesn’t swap visibly. The design system uses CSS variables for font stacks; font files are loaded by the browser when referenced.

### Bundle and assets

- **One CSS file** — Rizzo ships a single minified CSS file. There’s no tree-shaking of CSS; the whole file is small enough to load once. Don’t split it unless you have a specific need (e.g. critical CSS extraction for above-the-fold).
- **Icons** — Component icons are inline SVG in Astro/Svelte. For Vanilla, the scaffold can use the same SVGs from the package or from `/icons/*.svg` if you’ve extracted them. Reuse the same assets across the app to avoid duplicate payloads.
- **Sounds** — Sound effects (e.g. click) are optional and loaded on demand by the Settings script. No need to preload unless you want instant playback on first interaction.

### Critical CSS (optional)

- If you measure and find that above-the-fold content is blocked by Rizzo CSS, you can experiment with **critical CSS**: extract the rules needed for the initial viewport into an inline `<style>` and load the full stylesheet async. This is optional; the single-file approach is usually sufficient.

### Lazy loading (optional)

- **Themes** — All theme files are combined into the single `rizzo.min.css`. Lazy-loading themes (loading a second CSS file per theme) is possible but not implemented by default; the single bundle keeps requests simple.
- **Components** — In Astro/Svelte, code-splitting is handled by the framework. Rizzo doesn’t require special lazy-loading; use your framework’s patterns for lazy-loaded routes or heavy components.

### Measuring and monitoring

- Use the browser’s Network and Performance panels to confirm:
  - CSS is loaded once and cached.
  - No duplicate requests for the same stylesheet.
  - Theme script runs early enough that no flash is visible (e.g. no “light then dark” flicker).
- Run **Lighthouse** (or similar) for performance and accessibility; fix any issues that relate to CSS size or render-blocking if they appear.

---

## Summary

- **Composition:** Use container/slot and data-driven patterns; respect component dependencies (Navbar → Search/Settings, Settings → ThemeSwitcher/FontSwitcher/SoundEffects, Toast → Alert); use shared types from `src/types`.
- **Performance:** Load Rizzo CSS once; pin CDN version; prevent theme (and optionally font) flash with early scripts; keep a single CSS bundle unless you have a measured need for critical CSS or lazy-loaded themes.

For more on design-system rules (variables, BEM, contrast, accessibility), see [DESIGN_SYSTEM.md – Best Practices](./DESIGN_SYSTEM.md#best-practices) and [ACCESSIBILITY.md](./ACCESSIBILITY.md).
