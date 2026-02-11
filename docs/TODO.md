# Design System TODO

A focused list of remaining tasks for the Rizzo CSS design system, **ordered by priority** (top = do first).

**Current state:** Single package **rizzo-css** (CSS + CLI + scaffolds) is published; CDN (unpkg/jsDelivr) works. CLI: `npx rizzo-css init` | `add` | `theme`. **Init** first asks: **existing project** (add to cwd) or **new project** (scaffold). Themes/components menus offer "Select all" and "Select none" plus individual pick (Space/Enter). Scaffolds: **Vanilla** `scaffold/vanilla/` (`index.html` with inline theme flash prevention + `js/main.js` for theme, toast, settings, tabs, modal, dropdown, accordion; see `scaffold/vanilla/README.md`), **Astro** `scaffold/astro-app/` (minimal Astro app; see `scaffold/astro-app/README.md`), **Svelte** `scaffold/svelte-app/` (SvelteKit app; see `scaffold/svelte-app/README.md`). All scaffolds include theme persistence and toast; Vanilla also includes full Settings and `openSettings()`. Optional component files: `scaffold/astro/` and `scaffold/svelte/` (24 components each). **Add** auto-detects Svelte/Astro; supports `--path` and `--framework`. Svelte and Astro components and docs in-repo; framework switcher in place. Theme switcher: same look everywhere (full-width trigger and menu; full-height divider between list and preview ≥481px; preview panel always visible). Svelte ThemeSwitcher lives in repo `src/components/svelte/` (docs only; not in scaffold due to config/utils deps). Versioning in [PUBLISHING](./PUBLISHING.md#versioning-strategy). React/Vue planned.

> **Completed work** is documented in the **Features** sections of [COMPONENTS](./COMPONENTS.md#features), [THEMING](./THEMING.md#features), [GETTING_STARTED](./GETTING_STARTED.md#features), [PUBLISHING](./PUBLISHING.md#features), [FRAMEWORK_STRUCTURE](./FRAMEWORK_STRUCTURE.md#features), [MULTI_FRAMEWORK](./MULTI_FRAMEWORK.md), and [DESIGN_SYSTEM](./DESIGN_SYSTEM.md#features). Package/CLI/scaffold completed items (Vanilla no node_modules, CDN verification, copy vanilla README, one package any framework, scaffold READMEs, docs aligned, version bump, verify CDN, docs audit) have been moved there.

---

## ▶️ Next task (recommended)

**Accessibility testing** — Run ARIA, keyboard, and screen reader testing on key components (Modal, Dropdown, Tabs, ThemeSwitcher, Search, etc.). Fix any issues found. Do this *before* writing the a11y best-practices doc so the docs reflect actual, tested behavior.

- **Scope:** Use [ACCESSIBILITY_TESTING.md](./ACCESSIBILITY_TESTING.md) as the checklist: keyboard nav, screen reader (NVDA/JAWS/VoiceOver), and axe (or similar) on Modal, Dropdown, Tabs, ThemeSwitcher, Search, Accordion, Toast, Settings.
- **Output:** Fix any bugs found; then the next doc task is to add a "Best practices" section to [ACCESSIBILITY.md](./ACCESSIBILITY.md) (keyboard patterns, ARIA usage, focus order, how to test).

---

## After that (priority order)

1. **Accessibility best practices (doc)** — After testing, add "Best practices" to [ACCESSIBILITY.md](./ACCESSIBILITY.md).
2. **Contributing guide + issue templates** — CONTRIBUTING.md and GitHub issue templates (bug report, feature request).
3. **TypeScript** — Type definitions and props interfaces for components and utils.
4. **Component composition patterns** (doc) → **automated testing** (component + a11y) → **focus/contrast** (deepen a11y) → **performance** → **React/Vue** when ready.

---

## 1. Documentation (priority)

- [ ] **Best Practices** *(accessibility best practices doc after §4 Accessibility testing)*
  - [ ] **Accessibility best practices** — After a11y testing: document keyboard patterns, ARIA usage, focus order, and how to test (e.g. in [ACCESSIBILITY.md](./ACCESSIBILITY.md)).
  - [ ] Component composition patterns
  - [ ] Performance optimization tips

## 2. Community (priority)

- [ ] **Contributing guide** — CONTRIBUTING.md: how to run/build, where to add components, code style, PR process.
- [ ] **Issue templates** — Bug report and feature request templates (e.g. `.github/ISSUE_TEMPLATE/`).

## 3. Developer Experience (priority)

- [ ] **TypeScript** — Type definitions and props interfaces for components and utils.
- [ ] **Testing** — Component, accessibility, and (optionally) visual regression tests.
- [ ] **Build** — Bundle size, tree-shaking, critical CSS (if needed).
- [ ] **Storybook** *(optional)* — Interactive playground and design system showcase.

## 4. Accessibility (do before a11y best-practices doc)

- [ ] **ARIA & accessibility testing** — Use [ACCESSIBILITY_TESTING.md](./ACCESSIBILITY_TESTING.md) checklist: keyboard + screen reader + axe on key components; fix issues. Do this first so the a11y doc reflects reality.
- [ ] **Focus** — Focus trap utilities, focus restoration, skip links.
- [ ] **Contrast** — Verify themes meet WCAG AA/AAA; contrast tooling.

## 5. Package Distribution

- [ ] **Multi-Framework Support**
  - [ ] React components (in-repo or separate later; no separate React package)
  - [ ] Vue components (in-repo or separate later; no separate Vue package)
- [ ] **In-repo framework routes** *(Svelte done; React/Vue later)*
  - [ ] Adding React/Vue: same pattern. See [Framework Structure](./FRAMEWORK_STRUCTURE.md).

## 6. Performance

- [ ] **Optimization** — Bundle analysis, unused CSS removal, critical CSS, load strategy.
- [ ] **Lazy loading** *(optional)* — Themes or component CSS on demand.

## 7. CSS Variables & Design System (as needed)

- [ ] **Additional CSS Variables** (if needed)
  - [ ] Any additional spacing values discovered during framework porting
  - [ ] Additional transform values if needed
  - [ ] Additional animation timing values if needed

## 8. Browser Support

- [ ] **Polyfills** — OKLCH fallbacks; modern CSS feature detection.
- [ ] **Testing** — Cross-browser, mobile, accessibility tooling.

## 9. Examples & Demos

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
