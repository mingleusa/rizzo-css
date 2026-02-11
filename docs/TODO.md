# Design System TODO

A focused list of remaining tasks for the Rizzo CSS design system, **ordered by priority** (top = do first).

**Current state:** Single package **rizzo-css** (CSS + CLI + scaffolds) is published; CDN (unpkg/jsDelivr) works. CLI: `npx rizzo-css init` | `add` | `theme`. **Init** first asks: **existing project** (add to cwd) or **new project** (scaffold). Themes/components menus offer "Select all" and "Select none" plus individual pick (Space/Enter). Scaffolds: **Vanilla** `scaffold/vanilla/` (single `index.html` with theme flash prevention, Settings panel, toast; see `scaffold/vanilla/README.md`), **Astro** `scaffold/astro-app/` (minimal Astro app; see `scaffold/astro-app/README.md`), **Svelte** `scaffold/svelte-app/` (SvelteKit app; see `scaffold/svelte-app/README.md`). All scaffolds include theme persistence and toast; Vanilla also includes full Settings and `openSettings()`. Optional component files: `scaffold/astro/` and `scaffold/svelte/` (24 components each). **Add** auto-detects Svelte/Astro; supports `--path` and `--framework`. Svelte and Astro components and docs in-repo; framework switcher in place. Theme switcher: wider dropdown on doc pages, full-height divider between list and preview (≥481px), preview panel always visible. Versioning in [PUBLISHING](./PUBLISHING.md#versioning-strategy). React/Vue planned.

> **Completed work** is documented in the **Features** sections of [COMPONENTS](./COMPONENTS.md#features), [THEMING](./THEMING.md#features), [GETTING_STARTED](./GETTING_STARTED.md#features), [PUBLISHING](./PUBLISHING.md#features), [FRAMEWORK_STRUCTURE](./FRAMEWORK_STRUCTURE.md#features), [MULTI_FRAMEWORK](./MULTI_FRAMEWORK.md), and [DESIGN_SYSTEM](./DESIGN_SYSTEM.md#features).

---

## Package, CLI & scaffold tasks

- [x] **Vanilla scaffold: no node_modules** — Vanilla scaffold uses only local `css/rizzo.min.css` (copied by CLI) or CDN; no link to `node_modules/rizzo-css`. See [scaffold/vanilla/README.md](../packages/rizzo-css/scaffold/vanilla/README.md).
- [x] **CDN verification** — Docs and README use explicit CDN URLs (`/dist/rizzo.min.css`) and note how to verify after publish (`curl -I` or open in browser). See [PUBLISHING.md](./PUBLISHING.md), package README, [GETTING_STARTED.md](./GETTING_STARTED.md).
- [x] **Copy vanilla README on init** — When user scaffolds Vanilla, CLI copies `scaffold/vanilla/README.md` into the project as `README.md`.
- [x] **One package, any framework** — Package README documents that one install works for Vanilla, Astro, and Svelte; table for framework-specific usage (CSS only vs optional components).
- [x] **Scaffold READMEs** — Vanilla has `scaffold/vanilla/README.md`; Astro and Svelte scaffold READMEs include "Other scaffolds" and reference CLI/docs. Main and package READMEs mention each scaffold's README.
- [x] **Markdown docs aligned with npm/CLI** — GETTING_STARTED, FRAMEWORK_STRUCTURE, COMPONENTS, MULTI_FRAMEWORK, PUBLISHING, site getting-started page updated (scaffold READMEs, CDN, what ships).
- [x] **Version bump for republish** — Bump `version` in root and `packages/rizzo-css/package.json` before publishing (e.g. 0.0.10 → 0.0.11).
- [x] **Verify CDN after publish** — Added to [PUBLISHING.md](./PUBLISHING.md) pre-publish checklist (step 5): run `curl -I` on unpkg and jsDelivr URLs after publishing and confirm 200.
- [x] **Docs audit** — All markdown docs and references updated: PUBLISHING (version example, CDN verify step), CLI_PLANNING (TODO refs), DESIGN_SYSTEM (scaffolds + READMEs), FRAMEWORK_STRUCTURE (Vanilla no node_modules), GETTING_STARTED (Vanilla scaffold clarification).

---

## ▶️ Start next (recommended)

**1. Accessibility testing** — Run ARIA, keyboard, and screen reader testing on key components (Modal, Dropdown, Tabs, ThemeSwitcher, Search, etc.). Fix any issues found. Do this *before* writing a11y docs so the docs reflect actual, tested behavior.

**2. Accessibility best practices (doc)** — After testing, add a "Best practices" section to [ACCESSIBILITY.md](./ACCESSIBILITY.md): keyboard patterns, when to use which ARIA, focus order, and how to test. Documents what you've verified.

**3. Contributing guide + issue templates** — CONTRIBUTING.md and GitHub issue templates (bug report, feature request). Unlocks contributors and keeps issues consistent.

**4. TypeScript** — Type definitions and props interfaces for components and utils. Improves DX for Astro, Svelte, and future React/Vue.

After that: **component composition patterns** (doc) → **automated testing** (component + a11y) → **focus/contrast** (deepen a11y) → **performance** → **React/Vue** when ready.

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
