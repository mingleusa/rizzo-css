# Design System TODO

A short list of **remaining** work for the Rizzo CSS design system, in priority order. For current capabilities and docs index, see [README](./README.md) and the guides (GETTING_STARTED, DESIGN_SYSTEM, ACCESSIBILITY, BEST_PRACTICES, BROWSER_SUPPORT).

---

## Current state

- **Package:** Single **rizzo-css** (v0.0.61) — CSS, CLI, and scaffolds for Vanilla, Astro, and Svelte. **Templates:** CSS only | Landing | Docs | Dashboard | Full (same for init and add); CSS only = no web pages or components; all 56 components for other templates; we never overwrite existing files (snippets in RIZZO-SETUP.md). **Add** is for existing projects (select components or CSS only). Build: `pnpm build:package`. Docs: [docs/README.md](./README.md).
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

## Future improvements (backlog)

Potential tasks to consider when prioritizing work; not in priority order.

### CLI & tooling
- **CLI `--dry-run`** — Preview which files would be written without writing; show RIZZO-SETUP.md snippet for skipped files.
- **CLI `--offline` / cache** — Use cached scaffold/CSS when network is unavailable (e.g. for CI or air-gapped use).
- **CLI `doctor` enhancements** — Check for outdated rizzo.min.css version, missing fonts/sfx paths, invalid `data-theme` values.
- **Version check** — Optional prompt or notice when a newer npm version is available.

### CSS & themes
- **Light/dark-only bundles** *(optional)* — Smaller CSS for projects that only need one mode (document in BEST_PRACTICES).
- **Additional theme presets** — Community or seasonal themes; keep contrast and a11y in mind.
- **RTL support** — Document or add RTL-friendly utilities/variables if needed for right-to-left layouts.
- **CSS custom property docs** — Single page or section listing all design tokens (spacing, colors, typography) for reference.

### Documentation & site
- **Component changelog** — Per-component or global changelog (e.g. new props, breaking changes) linked from docs.
- **More copy-paste examples** — Form layouts, dashboard cards, settings panels as full-page snippets.
- **Search** — Algolia or local search for docs (already referenced in .env.example for some setups).
- **Docs version selector** — Link to docs for specific package version (e.g. 0.0.61) when multiple versions are documented.

### Accessibility & quality
- **Cross-browser a11y** — Extend Playwright a11y runs to Firefox and WebKit (see BROWSER_SUPPORT).
- **Component a11y matrix** — Table of components vs. screen reader / keyboard behavior (tested vs. documented).
- **Bundle size budget** — CI check that CSS size stays under a threshold; document in PUBLISHING or CONTRIBUTING.

### Frameworks & scaffolds
- **React components** — In-repo React versions of components (same BEM, same patterns as Svelte); doc route for React.
- **Vue components** — Same idea as React; optional separate package or in-repo.
- **Scaffold variations** — Optional “minimal CSS only” scaffold (no components) for users who want just the design tokens.

### General
- **Stability / maturity** — As the system stabilizes, consider a 1.0 and clearer semver policy (e.g. deprecation windows).
- **Contributing** — Template for new component PRs (checklist: Astro + Svelte + Vanilla slug + doc page + CLI entry).

---

## Design system principles

- BEM naming; semantic theme variables; no inline styles. WCAG 2.1 AA minimum; keyboard navigable; all themes. Styling is the source of truth; porting to other frameworks ports JS only. See [DESIGN_SYSTEM.md](./DESIGN_SYSTEM.md).
