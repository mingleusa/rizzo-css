# Design System TODO

A short list of **remaining** work for the Rizzo CSS design system, in priority order. For current capabilities and docs index, see [README](./README.md) and the guides (GETTING_STARTED, DESIGN_SYSTEM, ACCESSIBILITY, BEST_PRACTICES, BROWSER_SUPPORT).

---

## Current state

- **Package:** Single **rizzo-css** (v0.0.64) — CSS, CLI, and scaffolds for Vanilla, Astro, Svelte, React, and Vue (all five have base scaffolds; React/Vue use Vite; Astro/Svelte/Vanilla have base + variants). **Templates:** CSS only | Landing | Docs | Dashboard | Full (same for init and add); CSS only = no web pages or components; all 56 components for other templates; we never overwrite existing files (snippets in RIZZO-SETUP.md). **Add** is for existing projects (select components or CSS only). Build: `pnpm build:package`. Docs: [docs/README.md](./README.md).
- **Implemented:** **React implementation complete** — all 56 components with full implementations, live demos, React/TSX code blocks, and a11y coverage (axe + keyboard + ARIA on key components). **Code blocks up to date:** Astro reference component pages show Usage tabs for **Astro | Svelte | React | Vue | Vanilla**; React snippets from `src/config/reactCodeSnippets.ts`, Vue from `src/config/vueCodeSnippets.ts`. All frameworks have working live examples. **Blocks:** All four block pages have framework code tabs (Usage section) via `src/config/blockCodeSnippets.ts`. **Smoke tests:** `pnpm test:smoke` for key routes; **version in footer** from package.json. Automated a11y (axe, keyboard, ARIA, theme contrast) including cross-browser CI (Chromium, Firefox, WebKit; axe on Chromium/Firefox only, keyboard/ARIA on all three — see [BROWSER_SUPPORT.md](./BROWSER_SUPPORT.md)); focus-trap utility; bundle size reporting and budget (CI + `pnpm check:size`); tokens reference page ([/docs/tokens](/docs/tokens)); example pages ([/docs/examples](/docs/examples)); CLI `doctor` (theme, fonts/sfx, small-CSS, version hint) and `add --dry-run`; new-component PR checklist. **Production hardening:** `vercel.json` (cache + security headers), dependency audit in CI (`pnpm audit --audit-level=high`). **CI path filter:** workflow runs only when relevant paths change (`src/`, `docs/`, `tests/`, `packages/rizzo-css/`, `scripts/`, `**/*.css`, config). **Git hooks (Husky):** pre-commit = lint-staged (stylelint --fix on staged CSS); pre-push = build then smoke tests. Docs, components, and CLI are up to date. See [ACCESSIBILITY.md](./ACCESSIBILITY.md), [BEST_PRACTICES.md](./BEST_PRACTICES.md), [BROWSER_SUPPORT.md](./BROWSER_SUPPORT.md), [CLI.md](./CLI.md), [CONTRIBUTING.md](../CONTRIBUTING.md).

---

## Production readiness

- **vercel.json** — *(done)* Repo root `vercel.json` configures cache headers for `/assets/`, `/_astro/`, `/css/`, `/icons/` (`public, max-age=31536000, immutable`) and security headers for all routes (`X-Content-Type-Options: nosniff`, `X-Frame-Options: SAMEORIGIN`, `Referrer-Policy: strict-origin-when-cross-origin`).
- **Dependency audit in CI** — *(done)* [`.github/workflows/a11y.yml`](../.github/workflows/a11y.yml) runs `pnpm audit --audit-level=high` after install (currently `continue-on-error: true`; can be made blocking when desired).
- **Docs (axe/WebKit)** — *(done)* [BROWSER_SUPPORT.md – Testing](./BROWSER_SUPPORT.md#testing) and [ACCESSIBILITY.md](./ACCESSIBILITY.md) state that axe runs on Chromium and Firefox only and is skipped on WebKit; keyboard and ARIA run on Chromium, Firefox, and WebKit.
- **CI path filter** — *(done)* [.github/workflows/a11y.yml](../.github/workflows/a11y.yml) runs only when `src/`, `docs/`, `tests/`, `packages/rizzo-css/`, `scripts/`, `**/*.css`, or key config files change.
- **Git hooks (Husky)** — *(done)* Pre-commit: lint-staged (stylelint --fix on staged `.css`). Pre-push: `pnpm build` then smoke tests. See [CONTRIBUTING.md](../CONTRIBUTING.md).

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
- **Multi-framework** — **React:** *(done)* All 56 components with full implementations, live demos, and React code blocks at `/docs/react/components/<slug>`. **Vue:** *(done)* All 56 components with Vue implementations, live demos, and Vue SFC code blocks at `/docs/vue/components/<slug>`. **Scaffolds:** React and Vue have base scaffolds (`scaffold/react/base/`, `scaffold/vue/base/` — Vite) for init/add; CLI copies base + optional components. Config: React — `src/config/reactComponents.ts`, `reactCodeSnippets.ts`, `reactDocPaths.ts`; Vue — `vueCodeSnippets.ts`, `reactDocPaths.ts` (getVueDocStaticPaths), `src/components/vue/registry.js`, `VueDocDemo.vue`. See [planning/REACT_VUE_VITE_PLAN.md](./planning/REACT_VUE_VITE_PLAN.md), [FRAMEWORK_STRUCTURE](./FRAMEWORK_STRUCTURE.md), [TEMPLATES.md](./TEMPLATES.md).
- **In-repo framework routes** — **React:** *(done)* Index, components overview, and dynamic route for all 56 component pages at `/docs/react/*`. **Vue:** *(done)* Same pattern at `/docs/vue/*`.

### Performance
- **Lazy loading** *(optional)* — Documented in [BEST_PRACTICES.md – Lazy loading](./BEST_PRACTICES.md#lazy-loading-optional). Single-bundle approach is default; optional theme/component lazy-load only if you have a measured need.

### CSS & design system (as needed)
- Additional spacing/transform/animation variables if discovered during porting.

### Browser support
- **Cross-browser testing** — CI runs a11y on Chromium, Firefox, and WebKit (see [BROWSER_SUPPORT.md – Testing](./BROWSER_SUPPORT.md#testing)). Playwright projects also include Edge, Mobile Chrome (Pixel 5), Mobile Safari (iPhone 12); run locally or add to CI as needed. Manual testing on real devices as needed.

### Examples & demos
- **Example pages** — *(done)* [Examples overview](/docs/examples) and [Form & layout examples](/docs/examples/form-layouts) (login form, contact form, card grid, settings panel) with copy-paste snippets. Theme showcase remains at [Themes](/themes); blocks at [Blocks](/blocks).
- **Blocks** — *(enhanced)* Four block pages (Landing hero, Pricing, Dashboard, Docs layout) under `/blocks`; each has **Usage** section with **Astro | Svelte | React | Vue | Vanilla** code tabs (see `src/config/blockCodeSnippets.ts`). Preview + CLI instructions and component references. See [Blocks](/blocks) and [COMPONENTS.md](./COMPONENTS.md).
- Templates (landing, dashboard, docs-site starter) *(optional)*.

---

## Future improvements (backlog)

Potential tasks to consider when prioritizing work; not in priority order.

### CLI & tooling
- **CLI `--dry-run`** — *(done)* Preview which files would be written without writing; show RIZZO-SETUP.md snippet for skipped files. Use with `add`: `npx rizzo-css add --dry-run`.
- **CLI `--offline` / cache** — *(done)* Pass `--offline` to the package manager when running install or add (use cache only; for CI or air-gapped use). See [CLI.md](./CLI.md).
- **CLI `doctor` enhancements** — *(done)* Check config, CSS path, layout link; validate theme (config and layout `data-theme`); check fonts and sfx paths; small-CSS warning; hint when rizzo-css is in node_modules.
- **Version check** — *(done)* After add/init, if not `--offline`, CLI fetches latest from registry and prints a one-line notice if a newer version is available.

### CSS & themes
- **Light/dark-only bundles** *(optional)* — *(documented)* [BEST_PRACTICES.md – Light/dark-only bundles](./BEST_PRACTICES.md#lightdark-only-bundles-optional). Single bundle is default; custom build possible if needed.
- **Additional theme presets** — Community or seasonal themes; keep contrast and a11y in mind.
- **RTL support** — *(documented)* [BEST_PRACTICES.md – RTL](./BEST_PRACTICES.md#rtl-right-to-left-support). LTR default; logical properties where used; set `dir="rtl"` for RTL.
- **CSS custom property docs** — *(done)* [Tokens reference](/docs/tokens) page listing spacing, typography, semantic colors, radius, transition, z-index, and layout tokens.

### Documentation & site
- **Component changelog** — *(done)* [CHANGELOG.md](../CHANGELOG.md) in repo root; linked from [docs/README.md](./README.md). Per-release detail can be expanded.
- **More copy-paste examples** — *(done)* [Form & layout examples](/docs/examples/form-layouts): login, contact, dashboard stats cards, card grid, settings panel. [Examples overview](/docs/examples) links to themes and blocks.
- **Search** — Algolia or local search for docs (already referenced in .env.example for some setups).
- **Docs version selector** — *(documented)* Docs site reflects latest main; [docs/README.md](./README.md) notes that specific versions are in CHANGELOG and on npm.

### Accessibility & quality
- **Cross-browser a11y** — *(done)* CI runs a11y on Chromium, Firefox, and WebKit; see [BROWSER_SUPPORT.md – Testing](./BROWSER_SUPPORT.md#testing). Locally: `pnpm test:a11y:ci:cross-browser`.
- **Component a11y matrix** — *(done)* [ACCESSIBILITY.md – Component a11y matrix](./ACCESSIBILITY.md#component-a11y-matrix-and-checklist): table of expected ARIA, keyboard, focus; automated tests cover routes in specs.
- **Bundle size budget** — *(done)* CI runs `node scripts/bundle-size.mjs --check` (450 kB package CSS); `pnpm check:size` locally. Documented in [PUBLISHING.md](./PUBLISHING.md) and [CONTRIBUTING.md](../CONTRIBUTING.md).

### Frameworks & scaffolds
- **React components** — *(done)* All 56 components have full React implementations, live demos, and accurate React/TSX code blocks on each doc page. Same BEM and behavior as Astro and Svelte.
- **Vue components** — Same idea as React; optional separate package or in-repo.
- **Scaffold variations** — *(documented)* "CSS only" template is the minimal scaffold (design tokens + one stylesheet; no components). See [TEMPLATES.md](./TEMPLATES.md).

### General
- **Stability / maturity** — *(documented)* [MAINTAINING.md – Stability and versioning](./MAINTAINING.md#stability-and-versioning): pre-1.0, semver, and 1.0 considerations.
- **Contributing** — *(done)* [Checklist for new component PRs](../CONTRIBUTING.md#checklist-for-new-component-prs) in CONTRIBUTING.md; PR template links to it.
- **Post-deploy smoke test** — *(done)* `pnpm test:smoke` builds the site, starts preview, and runs Playwright smoke tests (`tests/smoke.spec.mjs`) for key routes (home, docs, components, blocks, themes). Run against deployed site with `BASE_URL=https://your-domain.com pnpm test:smoke`. See [CONTRIBUTING.md](../CONTRIBUTING.md).

---

## What’s left on the backlog

Items above that are **not** marked *(done)* and are not manual-only:

| Area | Item |
|------|------|
| **CLI** | — *(all done: --offline, version check)* |
| **CSS & themes** | Additional theme presets (community/seasonal; keep contrast and a11y in mind) |
| **Documentation** | Search (Algolia or local; .env.example referenced for some setups) |
| **A11y** | — *(matrix done)* |
| **Frameworks** | React: *(all 56 done)*; Vue components; in-repo framework routes |
| **General** | — *(stability/semver documented)* |

**Remaining (priority)** — Manual a11y testing (keyboard + screen reader); optional Storybook; multi-framework React/Vue; in-repo framework routes; cross-browser/manual device testing as needed. Production hardening, block framework tabs, smoke test, and footer version are in place; docs, components, and CLI are up to date.

---

## Design system principles

- BEM naming; semantic theme variables; no inline styles. WCAG 2.1 AA minimum; keyboard navigable; all themes. Styling is the source of truth; porting to other frameworks ports JS only. See [DESIGN_SYSTEM.md](./DESIGN_SYSTEM.md).
