# Testing (a11y, browser, component pages)

This doc summarizes how **accessibility**, **browser**, and **component-page** testing work in Rizzo CSS. All automated tests use **Playwright**; there are no separate unit or component test runners (e.g. Vitest/Jest). Component coverage is achieved by testing every **component doc page** (Astro, Vanilla, Svelte, React, Vue) with axe, plus keyboard/ARIA checks on interactive components.

## Quick reference

| What | Command | Notes |
|------|---------|--------|
| **A11y (default)** | `pnpm test:a11y` | Build + axe + keyboard + ARIA on Chromium. Covers all doc and block routes. |
| **A11y (fast, local)** | `pnpm test:a11y:fast` | Same as above but runs axe on a **subset** of routes (~25) for quick feedback. Use before full `test:a11y` or in CI use full suite. |
| **A11y (CI)** | `pnpm test:a11y:ci` | Installs Chromium then runs a11y (for CI). |
| **A11y (cross-browser)** | `pnpm test:a11y:ci:cross-browser` | Chromium, Firefox, WebKit (same as CI). |
| **Smoke** | `pnpm test:smoke` | Build + key routes (home, docs, blocks, themes, React/Vue doc index). Pre-push hook runs this. |
| **Visual regression** | `pnpm test:visual` | Screenshot key routes; compare to baselines. Update baselines: `pnpm test:visual:update`. |
| **Theme contrast** | `pnpm check:contrast` | WCAG AA contrast for all 14 themes. |
| **Bundle size** | `pnpm check:size` | Fail if package CSS exceeds budget (450 kB). |

**First run:** Install a browser so Playwright can run: `pnpm exec playwright install chromium` (or `pnpm exec playwright install` for all). See [CONTRIBUTING](../CONTRIBUTING.md#running-and-building) and [BROWSER_SUPPORT.md – Testing](./BROWSER_SUPPORT.md#testing).

---

## 1. Accessibility (a11y) tests

**Location:** `tests/a11y/`  
**Run:** `pnpm test:a11y` (builds site, starts preview, runs Playwright a11y projects)

### What’s covered

- **Axe (WCAG 2/2.1 A & AA)** — `tests/a11y/docs.spec.mjs`  
  Runs on **every route** of the docs site: homepage, foundation pages, **every component page** for **Astro** (`/docs/components/<slug>`), **Vanilla** (`/docs/vanilla/components/<slug>`), **Svelte** (`/docs/svelte/components/<slug>`), **React** (`/docs/react/components/<slug>`), **Vue** (`/docs/vue/components/<slug>`), all **six block pages** (Landing hero, Pricing, Dashboard, Docs layout, Login, Sign up), and all theme pages. Only **critical** and **serious** violations fail the build.  
  **Browsers:** Axe runs on **Chromium and Firefox** only. On **WebKit** the full docs axe suite is **skipped** in CI (timeouts); keyboard and ARIA still run on WebKit.

- **Keyboard** — `tests/a11y/keyboard.spec.mjs`  
  Focus, Tab order, Escape to close, focus traps. Covers **Astro** and **React** component pages for: Modal, Dropdown, Tabs, Search, Font Switcher, Accordion, Theme Switcher, Settings, Alert Dialog, Sheet. (Vue doc demos don’t expose trigger buttons in the same way; Vue pages are covered by axe only.)

- **ARIA / roles** — `tests/a11y/aria.spec.mjs`  
  Markup checks (roles, aria-modal, aria-labelledby, etc.) for screen readers. Same components and same split: Astro + React doc pages for modal, dropdown, settings, alert-dialog, sheet; plus tabs, accordion, theme switcher, font switcher, footer, search, back to top, tooltip.

Route lists live in `tests/a11y/docs.spec.mjs` (`FOUNDATION_ROUTES`, `COMPONENT_SLUGS`, `BLOCK_ROUTES`, `THEME_SLUGS`). When you add a new **component** or **block** page, add the slug/path there so axe continues to cover it.

See [ACCESSIBILITY.md – Automated accessibility tests](./ACCESSIBILITY.md#automated-accessibility-tests) and the [component a11y matrix](./ACCESSIBILITY.md#component-accessibility-checklist-all-frameworks) for expected ARIA/keyboard/focus per component.

---

## 2. Browser testing

**Config:** `playwright.config.mjs`  
**Projects:** `smoke`, `a11y` (Chromium), `a11y-firefox`, `a11y-webkit`, `a11y-edge`, `a11y-mobile-chrome`, `a11y-mobile-safari`

- **Default (`pnpm test:a11y`):** Runs the **a11y** project only (Chromium). Full route list.
- **Fast local (`pnpm test:a11y:fast`):** Same but with `A11Y_FAST=1` so axe runs on a subset of routes (foundation, blocks, one component per framework, two themes). Use for quick local feedback.
- **CI:** [`.github/workflows/a11y.yml`](../.github/workflows/a11y.yml) runs a11y on **Chromium, Firefox, and WebKit**. Chromium and Firefox use **sharding (2 shards each)** so axe runs in parallel; WebKit runs keyboard + ARIA only (axe skipped). More workers (6) and `waitUntil: 'load'` keep runs faster.
- **Cross-browser locally:**  
  `pnpm test:a11y:ci:cross-browser`  
  Or run a single browser:  
  `pnpm exec playwright test tests/a11y --project=a11y-firefox`  
  `pnpm exec playwright test tests/a11y --project=a11y-webkit`  
  Edge / mobile: `--project=a11y-edge`, `--project=a11y-mobile-chrome`, `--project=a11y-mobile-safari` (install browsers as needed: `pnpm exec playwright install msedge webkit`).

See [BROWSER_SUPPORT.md – Testing](./BROWSER_SUPPORT.md#testing) for required features (OKLCH, etc.) and manual cross-browser checks.

---

## 3. Component (page) and smoke testing

There are **no** framework-level unit tests (e.g. Vitest for React/Vue). “Component” coverage is:

- **A11y axe:** Every component **doc page** (all 52 × 5 frameworks + blocks) is loaded and scanned. So every component is tested in the sense that its doc page must pass axe.
- **Keyboard/ARIA:** A subset of **interactive** components are tested on Astro and React doc pages (modal, dropdown, tabs, settings, alert-dialog, sheet, etc.).

**Smoke tests** — `tests/smoke.spec.mjs`  
Quick checks that key routes return 200 and main content is visible: homepage, docs getting-started, docs components overview, blocks index, blocks landing-hero, blocks login, blocks signup, one component page (button), themes index. Run with `pnpm test:smoke`. Pre-push hook runs build + smoke. To run against a deployed site: `BASE_URL=https://your-domain.com pnpm test:smoke`.

**Visual regression** — `tests/visual.spec.mjs`  
Screenshot tests for layout/theme consistency on key routes (homepage, docs getting-started, docs components, component button page, blocks landing-hero, themes index). First run creates baselines; subsequent runs compare. Update baselines after intentional UI changes: `pnpm test:visual:update`. Uses fixed viewport (1280×720), reduced motion, and locked theme for deterministic screenshots. A small tolerance (`maxDiffPixelRatio: 0.02`) is used so minor font/subpixel differences between CI (Linux) and local machines do not fail the build. **CI:** The [a11y workflow](.github/workflows/a11y.yml) runs the visual project after build; commit the snapshot baselines (from `pnpm test:visual:update`) so CI can compare.

---

## 4. Theme contrast and bundle size

- **Theme contrast:** `pnpm check:contrast` — Script verifies all 14 themes meet WCAG AA (e.g. text/background, accent). Run when adding or changing theme colors.
- **Bundle size:** `pnpm check:size` — Ensures package CSS stays under the budget (450 kB). CI runs this; run before PRs that change CSS.

---

## 5. Storybook (optional)

Storybook is for **React** components only (no Vue/Svelte/Astro Storybook in this repo). Run `pnpm storybook` for an interactive playground. It does **not** replace a11y tests; use it for visual and interaction exploration. See [STORYBOOK.md](./STORYBOOK.md).

---

## Summary

| Layer | What runs | Where |
|-------|-----------|--------|
| **A11y (axe)** | WCAG on every doc/block/theme route | `tests/a11y/docs.spec.mjs` |
| **A11y (keyboard)** | Focus, Escape, traps on Astro + React component pages | `tests/a11y/keyboard.spec.mjs` |
| **A11y (ARIA)** | Roles/labels on same components | `tests/a11y/aria.spec.mjs` |
| **Browser** | Playwright projects (Chrome, Firefox, WebKit, Edge, mobile) | `playwright.config.mjs` |
| **Component pages** | Covered by axe (all 52 × 5 frameworks) + keyboard/ARIA (subset) | Same a11y specs |
| **Smoke** | Key routes load and show content | `tests/smoke.spec.mjs` |
| **Visual** | Screenshot key routes vs baselines | `tests/visual.spec.mjs` |
| **Contrast** | Theme colors WCAG AA | `pnpm check:contrast` |
| **Size** | Package CSS budget | `pnpm check:size` |

When adding a **new component or block:** update `tests/a11y/docs.spec.mjs` (`COMPONENT_SLUGS` or `BLOCK_ROUTES`) so axe continues to cover the new pages. For new blocks, add a smoke test in `tests/smoke.spec.mjs` if you want them in the quick smoke set.
