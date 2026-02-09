# Design System TODO

A focused list of remaining tasks for the Rizzo CSS design system, **ordered by priority** (top = do first).

**Current state:** Single package **rizzo-css** (CSS + CLI + scaffold) is published; CDN (unpkg/jsDelivr) works. CLI: `npx rizzo-css init` | `add` | `theme`; init offers framework (vanilla/Astro/Svelte) and optional component picker for Astro and Svelte. Svelte and Astro components and docs live in-repo; framework switcher in place. JS utilities (theme, storage, clipboard, toast) live in `src/utils/` and are documented in [GETTING_STARTED](./GETTING_STARTED.md#javascript-utilities). Versioning strategy is in [PUBLISHING](./PUBLISHING.md#versioning-strategy). React/Vue are planned.

> **Done and documented elsewhere:** [Components](./COMPONENTS.md#features) (24 pages), [Theming](./THEMING.md#features) (14 themes), [Accessibility](./ACCESSIBILITY.md#accessibility-features), [Getting Started](./GETTING_STARTED.md), [Publishing](./PUBLISHING.md), [Framework Structure](./FRAMEWORK_STRUCTURE.md).

---

## ▶️ Start next (recommended)

**1. Accessibility best practices (doc)** — Add a short “Best practices” section to [ACCESSIBILITY.md](./ACCESSIBILITY.md) (or a linked doc): keyboard patterns, when to use which ARIA, focus order, and how to test with screen readers. Low effort, high value; your components already follow these patterns—documenting them helps adopters and reinforces the design system’s a11y story.

**2. Contributing guide + issue templates** — CONTRIBUTING.md (how to run, build, where to add components, code style) and GitHub issue templates (bug report, feature request). Unlocks contributors and keeps issues consistent.

**3. TypeScript** — Type definitions and props interfaces for components and utils. Improves DX for Astro, Svelte, and future React/Vue; foundation for better IDE support.

After that, in order: **component composition patterns** (doc) → **testing** (component + a11y) → **ARIA & focus** (deepen a11y) → **performance** (bundle/optimization) → **React/Vue** when you’re ready.

---

## 🎨 Completed (recent)

- [x] **Search modal UX** — Bottom padding and list spacer so the last result is fully visible when scrolled; compact padding for empty/loading/no-results state; close button (X) and Settings close button use bordered style and stay visible on hover; theme dropdown larger (trigger, menu, options).
- [x] **CSS variables** — Standardized border widths (`--border-width`, `--border-width-2`–`4`, `--border-width-accent`), viewport heights (`--vh-70`), `--radius-circle`, `--max-height-navbar-submenu`; components, forms, layout, accessibility, and utilities use variables instead of hardcoded values.

## 🎨 Theming

- [x] **Theme Features**
  - [x] Theme transition animations (0.2s on html/body; `--theme-transition-duration`; respects reduced motion)
  - [x] Theme preview in switcher (panel in menu updates on hover/focus with theme background + accent; hidden on viewports ≤480px)
  - [x] Unique icon per theme in theme switcher (14 icons; Sunflower uses Rainbow); Dark themes / Light themes section labels (with underlines on mobile)

## 🎨 1. Documentation (priority)

- [ ] **Consumption & distribution** (docs + tooling)
  - [x] **Docs: Using Rizzo in your project** — [GETTING_STARTED.md](./GETTING_STARTED.md#using-rizzo-in-your-project): install from npm (recommended) or clone + build; import CSS; use Astro or Svelte components. React/Vue: same CSS; build your own wrappers; planned for later.
  - [x] **CLI** — `npx rizzo-css init` | `add` | `theme` (same package; see [CLI Planning](./CLI_PLANNING.md)).
  - [x] **NPM** — [rizzo-css](https://www.npmjs.com/package/rizzo-css) published; docs and README link to it.
  - [x] **CDN** — unpkg and jsDelivr via package.json; `https://unpkg.com/rizzo-css@latest` or `https://cdn.jsdelivr.net/npm/rizzo-css@latest` for plain HTML.
  - [x] **Svelte** — /docs/svelte with 24 component pages (19 full examples; Icons, Navbar, Search, Settings, Theme Switcher use Astro reference). React/Vue when added.

- [ ] **Best Practices** *(start with accessibility best practices)*
  - [ ] **Accessibility best practices** — Document keyboard patterns, ARIA usage, focus order, and how to test with screen readers (e.g. in [ACCESSIBILITY.md](./ACCESSIBILITY.md) or linked doc).
  - [ ] Component composition patterns
  - [ ] Performance optimization tips

## 🎨 2. Community (priority)

- [ ] **Contributing guide** — CONTRIBUTING.md: how to run/build, where to add components, code style, PR process.
- [ ] **Issue templates** — Bug report and feature request templates (e.g. `.github/ISSUE_TEMPLATE/`).

## 🎨 3. Developer Experience (priority)

- [ ] **TypeScript** — Type definitions and props interfaces for components and utils.
- [ ] **Testing** — Component, accessibility, and (optionally) visual regression tests.
- [ ] **Build** — Bundle size, tree-shaking, critical CSS (if needed).
- [ ] **Storybook** *(optional)* — Interactive playground and design system showcase.

## 🎨 4. Accessibility (deeper work)

- [ ] **ARIA & testing** — Ensure ARIA best practices; screen reader and keyboard testing.
- [ ] **Focus** — Focus trap utilities, focus restoration, skip links.
- [ ] **Contrast** — Verify themes meet WCAG AA/AAA; contrast tooling.

## 🎨 5. Package Distribution

- [x] **NPM** — Package at `packages/rizzo-css/`; `pnpm build:css` → `dist/rizzo.min.css`.
  - [x] Document versioning strategy in [PUBLISHING](./PUBLISHING.md) (semver, when to bump).
- [x] **CDN** — unpkg + jsDelivr; short URLs work. Pin with `@1.0.0` in URL or use `@latest`.
- [ ] **Multi-Framework Support**
  - [x] Single npm package **rizzo-css** (CSS, CLI, scaffold). Install with `pnpm add rizzo-css` and `import 'rizzo-css'`.
  - [x] **JavaScript utilities extraction** — Theme, storage, clipboard, toast in `src/utils/`; documented in [GETTING_STARTED.md](./GETTING_STARTED.md#javascript-utilities).
  - [ ] React components (in-repo or separate later; no separate React package)
  - [ ] Vue components (in-repo or separate later; no separate Vue package)
  - [x] Svelte components in `src/components/svelte/`; copy into your project. See [Multi-Framework Strategy](./MULTI_FRAMEWORK.md).
- [ ] **In-repo framework routes** *(Svelte done; React/Vue later)*
  - [x] Svelte in Astro; framework switcher; 24 Svelte component pages at /docs/svelte.
  - [ ] Adding React/Vue: same pattern. See [Framework Structure](./FRAMEWORK_STRUCTURE.md).
- [x] **CLI** — `npx rizzo-css init` | `add` | `theme`. See [CLI Planning](./CLI_PLANNING.md).

## 🎨 6. Performance

- [ ] **Optimization** — Bundle analysis, unused CSS removal, critical CSS, load strategy.
- [ ] **Lazy loading** *(optional)* — Themes or component CSS on demand.

## 🎨 7. CSS Variables & Design System (as needed)

- [ ] **Additional CSS Variables** (if needed)
  - [ ] Any additional spacing values discovered during framework porting
  - [ ] Additional transform values if needed
  - [ ] Additional animation timing values if needed

## 🎨 8. Browser Support

- [ ] **Polyfills** — OKLCH fallbacks; modern CSS feature detection.
- [ ] **Testing** — Cross-browser, mobile, accessibility tooling.

## 🎨 9. Examples & Demos

- [ ] **Example pages** — Component/theme showcase; form and layout examples.
- [ ] **Templates** — Landing, dashboard, or docs-site starter (optional).

---

## Notes

- All components should follow BEM naming convention
- All styles should use semantic theme variables
- All components must be accessible (WCAG 2.1 AA minimum)
- No inline styles - all CSS in appropriate files
- All components should be keyboard navigable
- All components should work with all themes
- **Design System as Source of Truth**: All styling should use CSS variables and utility classes from the design system. This ensures that when porting to other frameworks (Vue, React, Svelte), only JavaScript needs to be ported, not the styling.
