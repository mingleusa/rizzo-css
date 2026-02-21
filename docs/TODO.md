# Design System TODO

A short list of **remaining** work for the Rizzo CSS design system, in priority order. For current capabilities and docs index, see [README](./README.md) and the guides (GETTING_STARTED, DESIGN_SYSTEM, ACCESSIBILITY, BEST_PRACTICES, BROWSER_SUPPORT).

---

## Current state

- **Package:** Single **rizzo-css** (v0.0.54) — CSS, CLI, and scaffolds for Vanilla, Astro, and Svelte. **Templates:** Minimal | Starter | Full (same for init and add); 34 components; we never overwrite existing files (snippets in RIZZO-SETUP.md). Build: `pnpm build:package`. Docs: [docs/README.md](./README.md).
- **Implemented:** Automated a11y (axe, keyboard, ARIA, theme contrast), focus-trap utility, bundle size reporting, performance and browser-support docs. See [ACCESSIBILITY.md](./ACCESSIBILITY.md), [BEST_PRACTICES.md](./BEST_PRACTICES.md), [BROWSER_SUPPORT.md](./BROWSER_SUPPORT.md).

---

## Next (recommended)

**Manual a11y testing** — Run manual keyboard and screen reader testing on key components (Modal, Dropdown, Tabs, ThemeSwitcher, Font Switcher, Settings, Search, Accordion) per [ACCESSIBILITY.md – Manual accessibility testing](./ACCESSIBILITY.md#manual-accessibility-testing). Automated tests: `pnpm test:a11y`.

---

## Remaining

### Accessibility
- **Manual screen reader testing** — Work through the [manual testing checklist](./ACCESSIBILITY.md#manual-accessibility-testing); fix any announced-label or focus issues.

### Developer experience
- **Storybook** *(optional)* — Interactive playground and design system showcase.

### Package distribution
- **Multi-framework** — React components; Vue components (in-repo or separate later). [FRAMEWORK_STRUCTURE](./FRAMEWORK_STRUCTURE.md).
- **In-repo framework routes** — React/Vue doc routes (same pattern as Svelte).

### Performance
- **Lazy loading** *(optional)* — Documented in [BEST_PRACTICES.md – Lazy loading](./BEST_PRACTICES.md#lazy-loading-optional). Single-bundle approach is default; optional theme/component lazy-load only if you have a measured need.

### CSS & design system (as needed)
- Additional spacing/transform/animation variables if discovered during porting.

### Browser support
- **Cross-browser testing** — Playwright projects: Chromium (default), Firefox, WebKit, Edge, Mobile Chrome (Pixel 5), Mobile Safari (iPhone 12). Run `pnpm test:a11y` for Chromium; see [BROWSER_SUPPORT.md – Testing](./BROWSER_SUPPORT.md#testing) for all projects. Manual testing on real devices as needed.

### Examples & demos
- Example pages (component/theme showcase, form/layout examples).
- Templates (landing, dashboard, docs-site starter) *(optional)*.

---

## Design system principles

- BEM naming; semantic theme variables; no inline styles. WCAG 2.1 AA minimum; keyboard navigable; all themes. Styling is the source of truth; porting to other frameworks ports JS only. See [DESIGN_SYSTEM.md](./DESIGN_SYSTEM.md).
