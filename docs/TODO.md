# Design System TODO

A short list of **remaining** work for the Rizzo CSS design system, in priority order. For current capabilities and docs index, see [README](./README.md) and the guides (GETTING_STARTED, DESIGN_SYSTEM, ACCESSIBILITY, BEST_PRACTICES, BROWSER_SUPPORT).

**Tasks by impact** — All enhancement tasks (high / medium / nice-to-have) are listed in [Tasks by impact](#tasks-by-impact) below. Use that section as the single checklist for what’s done and what’s next.

---

## Production readiness (current)

- **Build:** `pnpm build` — completes successfully (329 pages); tokens exported; CSS built; lint applied.
- **Bundle size:** `pnpm check:size` — package CSS within 450 kB budget.
- **Contrast:** `pnpm check:contrast` — all 14 themes meet WCAG AA.
- **Documentation:** Up to date — 58 components, six blocks, all framework tabs (Astro, Vanilla, Svelte, Vue, React) with framework-specific code blocks; Vue components index at `/docs/vue/components`.
- **CLI / npm package:** v0.0.79; `pnpm build:package` builds CSS, copies scaffold, prepares vanilla; `files` in package.json include bin, dist, scaffold/*.
- **Components & blocks:** 58 components across all five frameworks; six blocks with framework-specific snippets; live examples and code blocks accurate.
- **Browser tests (smoke, a11y, visual):** Require Playwright browsers. Run **`pnpm exec playwright install`** (or `pnpm test:a11y:ci` which installs Chromium) before `pnpm test:smoke` / `pnpm test:a11y` / `pnpm test:visual` locally; CI installs browsers automatically.

---

## Testing summary

| Layer | Command | Coverage |
|-------|---------|----------|
| **Smoke** | `pnpm test:smoke` | Key routes (home, docs, blocks, themes); pre-push hook. |
| **A11y (axe)** | `pnpm test:a11y` | All doc/block/theme routes; WCAG 2/2.1 A & AA; Chromium (default). |
| **A11y (cross-browser)** | `pnpm test:a11y:ci:cross-browser` | Chromium, Firefox, WebKit (axe on Chrome/Firefox; keyboard/ARIA on all). |
| **Keyboard & ARIA** | (in a11y project) | Modal, Dropdown, Tabs, Settings, Alert Dialog, Sheet, etc. on Astro + React doc pages. |
| **Visual regression** | `pnpm test:visual` | Screenshot key routes; `pnpm test:visual:update` to refresh baselines. |
| **Contrast** | `pnpm check:contrast` | All 14 themes WCAG AA. |
| **Bundle size** | `pnpm check:size` | Package CSS budget (450 kB). |

See [TESTING.md](./TESTING.md) and [BROWSER_SUPPORT.md – Testing](./BROWSER_SUPPORT.md#testing). CI: [.github/workflows/a11y.yml](../.github/workflows/a11y.yml). **Local runs:** run `pnpm exec playwright install` before smoke/a11y/visual tests if browsers are not yet installed.

---

## Current state

- **Package:** Single **rizzo-css** (v0.0.79) — CSS, CLI, and scaffolds for Vanilla, Astro, Svelte, React, and Vue (all five have base scaffolds; React/Vue use Vite; Astro/Svelte/Vanilla have base + variants). **Templates:** CSS only | Landing | Docs | Dashboard | Full (same for init and add); CSS only = no web pages or components; all **58 components** for other templates; we never overwrite existing files (snippets in RIZZO-SETUP.md). **Add** is for existing projects (select components or CSS only). Build: `pnpm build:package`. Docs: [docs/README.md](./README.md).
- **Implemented:** **React implementation complete** — all **58 components** with full implementations, live demos, React/TSX code blocks, and a11y coverage (axe + keyboard + ARIA on key components). **Code blocks up to date:** Astro, React, Vue, and Svelte component pages all show Usage tabs for **Astro | Vanilla | Svelte | Vue | React** with framework-specific syntax in each tab. Snippets: `src/config/reactCodeSnippets.ts`, `src/config/vueCodeSnippets.ts`, `src/config/astroCodeSnippets.ts`, `src/config/svelteCodeSnippets.ts`, `src/config/vanillaCodeSnippets.ts`. All frameworks have working live examples. **Blocks:** All six block pages have framework-specific code (Astro frontmatter, Svelte script/snippets, React JSX, Vue SFC, Vanilla HTML) via `src/config/blockCodeSnippets.ts`. **Smoke tests:** `pnpm test:smoke` for key routes (requires `pnpm exec playwright install` locally; CI installs browsers). **version in footer** from package.json. Automated a11y (axe, keyboard, ARIA, theme contrast) including cross-browser CI (Chromium, Firefox, WebKit; axe on Chromium/Firefox only, keyboard/ARIA on all three — see [BROWSER_SUPPORT.md](./BROWSER_SUPPORT.md)); focus-trap utility; bundle size reporting and budget (CI + `pnpm check:size`); tokens reference page ([/docs/tokens](/docs/tokens)); example pages ([/docs/examples](/docs/examples)); CLI `doctor` (theme, fonts/sfx, small-CSS, version hint) and `add --dry-run`; new-component PR checklist. **Production hardening:** `vercel.json` (cache + security headers), dependency audit in CI (`pnpm audit --audit-level=high`). **CI path filter:** workflow runs only when relevant paths change (`src/`, `docs/`, `tests/`, `packages/rizzo-css/`, `scripts/`, `**/*.css`, config). **Git hooks (Husky):** pre-commit = lint-staged (stylelint --fix on staged CSS); pre-push = build then smoke tests. Docs, components, and CLI are up to date. **Storybook 10:** Optional (`pnpm storybook`); Introduction, All 58 Components, Blocks; see [STORYBOOK.md](./STORYBOOK.md). **Manual testing:** [Manual testing checklist](/docs/accessibility/manual-testing). See [ACCESSIBILITY.md](./ACCESSIBILITY.md), [BEST_PRACTICES.md](./BEST_PRACTICES.md), [BROWSER_SUPPORT.md](./BROWSER_SUPPORT.md), [CLI.md](./CLI.md), [CONTRIBUTING.md](../CONTRIBUTING.md).

---

## High-impact (completed)

- **Visual regression** — *(done)* `pnpm test:visual` / `pnpm test:visual:update`; Playwright snapshot tests; CI job in [.github/workflows/a11y.yml](../.github/workflows/a11y.yml). See [TESTING.md](./TESTING.md).
- **RTL support** — *(done)* [RTL.md](./RTL.md), logical spacing utilities (`mis-*`, `mie-*`, `pis-*`, `pie-*`), RTL smoke test.
- **Design tokens export** — *(done)* `pnpm export:tokens` → `public/tokens/rizzo-tokens.json` (and `.js`); runs in build. See [docs/README.md](./README.md#reference).
- **Carousel component** — *(done)* 58 components total; Astro, Svelte, React, Vue, Vanilla; BEM, prev/next, indicators; Storybook story; doc page and framework tabs.
- **Calendar component** — *(done)* Month grid for date display or date-picker; prev/next, selection, calendar-select event; all five frameworks; doc page and framework tabs.
- **Range Calendar** — *(done)* Date range selection; two clicks set start/end; `range-calendar-select` (detail.start, detail.end); Astro, React, Svelte, Vue, Vanilla; doc + framework tabs; 58 components total.
- **Button variants** — *(done)* Added `btn-secondary`, `btn-ghost`, and size modifiers `btn--sm`, `btn--lg` across CSS and all frameworks; doc and snippets updated; [llms.txt](../public/llms.txt) aligned.

---

## Documentation & consistency

- **Component docs** — Each component page uses **AddComponentTabs** (framework links) and **FrameworkCodeTabs** with snippets from `*CodeSnippets.ts` so code blocks stay in sync. **Framework tabs:** The active Usage tab defaults to the framework you're viewing (Astro docs → Astro tab; React docs → React tab; Vue docs → Vue tab); use the framework switcher above to change docs. Tab order is always Astro | Vanilla | Svelte | Vue | React. Button page uses snippet getters for all five frameworks.
- **Live examples** — Shown in `.example` / `.example--live` blocks; variant demos (e.g. Button) use a consistent grid and caption style.
- **AI/LLM** — [public/llms.txt](../public/llms.txt) and [ai/llms.json](../ai/llms.json) reflect **58 components**, BEM naming, and button variants/sizes.
- **Framework parity** — All five frameworks (Astro, Svelte, React, Vue, Vanilla) have the same **58 components** and **6 blocks**. **Components:** canonical list in `src/config/reactComponents.ts` (`REACT_COMPONENT_SLUGS`); a11y `COMPONENT_SLUGS`; `docsNav`; Vue registry (`src/components/vue/registry.js`); React registry (`src/components/react/registry.tsx`); Svelte routes in `SvelteDocPage.svelte`; Astro pages `src/pages/docs/components/*.astro` (58); Vanilla pages `src/pages/docs/vanilla/components/*.astro` (58); React/Vue static paths from `reactDocPaths.ts`. **Blocks:** all 6 blocks (landing-hero, pricing, dashboard-01, docs-layout, login, signup) have framework-specific code for Astro, Svelte, React, Vue, and Vanilla in `src/config/blockCodeSnippets.ts`; block pages at `/blocks/*` use `FrameworkCodeTabs`. Docs sidebar includes a **Blocks** section (absolute links to `/blocks`, `/blocks/landing-hero`, etc.) so every framework’s docs expose blocks. CLI and vanilla scaffold must keep `COMPONENT_SLUGS` in sync for 53 component pages.
- **Examples, code blocks, and demos** — All component and block doc pages have **built-out, functional, and up-to-date** content. **Code blocks:** every component has an explicit (non-default) snippet in `astroCodeSnippets.ts`, `reactCodeSnippets.ts`, `svelteCodeSnippets.ts`, `vueCodeSnippets.ts`, and `vanillaCodeSnippets.ts`; `getDefaultSnippet` is only for future slugs. **Live demos:** React uses `ReactDocShowcase` (full multi-variant showcases for 14 components; remaining use `getDemoProps` + registered component or Demo wrapper); Vue uses `VueDocDemo` (full showcases for 14 components; remaining use `demoPropsForSlug` + slots where needed); Svelte has a dedicated `*Doc.svelte` page per component with live example and usage code; Astro and Vanilla component pages use inline HTML or Astro components. **Blocks:** each of the 6 block pages has a Preview plus `FrameworkCodeTabs` with Astro, Svelte, React, Vue, and Vanilla snippets. **Verification:** smoke tests assert that component and block pages have a Usage heading and visible code (`tests/smoke.spec.mjs`). When adding a new component, add explicit snippets in all 5 `*CodeSnippets.ts` files and ensure React `DEMO_PROPS` / Vue `demoPropsForSlug` and any slot content are set so the live demo is functional.

---

## Production readiness

- **vercel.json** — *(done)* Repo root `vercel.json` configures cache headers for `/assets/`, `/_astro/`, `/css/`, `/icons/` (`public, max-age=31536000, immutable`) and security headers for all routes (`X-Content-Type-Options: nosniff`, `X-Frame-Options: SAMEORIGIN`, `Referrer-Policy: strict-origin-when-cross-origin`).
- **Dependency audit in CI** — *(done)* [`.github/workflows/a11y.yml`](../.github/workflows/a11y.yml) runs `pnpm audit --audit-level=high` after install; failures block the workflow.
- **Docs (axe/WebKit)** — *(done)* [BROWSER_SUPPORT.md – Testing](./BROWSER_SUPPORT.md#testing) and [ACCESSIBILITY.md](./ACCESSIBILITY.md) state that axe runs on Chromium and Firefox only and is skipped on WebKit; keyboard and ARIA run on Chromium, Firefox, and WebKit.
- **CI path filter** — *(done)* [.github/workflows/a11y.yml](../.github/workflows/a11y.yml) runs only when `src/`, `docs/`, `tests/`, `packages/rizzo-css/`, `scripts/`, `**/*.css`, or key config files change.
- **Git hooks (Husky)** — *(done)* Pre-commit: lint-staged (stylelint --fix on staged `.css`). Pre-push: `pnpm build` then smoke tests. See [CONTRIBUTING.md](../CONTRIBUTING.md).

---

## Next (recommended)

**Manual a11y testing** — Run manual keyboard and screen reader testing on key components (Modal, Dropdown, Tabs, ThemeSwitcher, Font Switcher, Settings, Search, Accordion). Use the [Manual testing checklist](/docs/accessibility/manual-testing) page (runbook with links to each component doc); full prose in [ACCESSIBILITY.md – Manual accessibility testing](./ACCESSIBILITY.md#manual-accessibility-testing). Automated tests: `pnpm test:a11y`.

---

## Tasks by impact

All enhancement tasks from the design-system roadmap, grouped by impact. Use this as the single checklist for what’s done and what’s next.

### High impact

| Task | Status | Notes |
|------|--------|--------|
| **Visual regression testing** | *(done)* | `pnpm test:visual` / `pnpm test:visual:update`; Playwright snapshots; CI job. [TESTING.md](./TESTING.md). |
| **RTL support** | *(done)* | [RTL.md](./RTL.md), logical utilities (`mis-*`, `mie-*`, `pis-*`, `pie-*`), RTL smoke test. |
| **Design tokens export** | *(done)* | `pnpm export:tokens` → `public/tokens/rizzo-tokens.json` (and `.js`); runs in build. |
| **Carousel component** | *(done)* | 58 components total; Astro, Svelte, React, Vue, Vanilla; BEM, prev/next, indicators; Storybook; doc + framework tabs. |
| **Date Picker / Calendar** | *(done)* | **Calendar** implemented: month grid, prev/next, selection, `calendar-select` event; Astro, React, Svelte, Vue, Vanilla. Date Picker (input + popover) can build on it; Range Calendar next. |
| **Range Calendar** | *(done)* | Date range selection; two clicks set start/end; Astro, React, Svelte, Vue, Vanilla; `range-calendar-select` event; doc + framework tabs. |

### Medium impact

| Task | Status | Notes |
|------|--------|--------|
| **Showcase page** | *(done)* | [Showcase](/docs/showcase): components, themes, blocks, examples in one place; linked in nav. |
| **More blocks** | — | Blog list, feature grid, testimonial, CTA strip; add as needed. See [Future components and blocks](#future-components-and-blocks). |
| **Storybook for Vue/Svelte** | — | React Storybook done; extend to Vue/Svelte if desired. [STORYBOOK.md](./STORYBOOK.md). |
| **Pre-1.0 checklist + upgrade guide** | *(done)* | [UPGRADE.md](./UPGRADE.md) and [MAINTAINING.md – Pre-1.0 checklist](./MAINTAINING.md#pre-10-checklist). |
| **Manual a11y runbook** | *(done)* | [Manual testing checklist](/docs/accessibility/manual-testing): Before you start, step-by-step example (Modal), results log table, screen reader quick reference (NVDA/VO/JAWS); nav and [ACCESSIBILITY.md](./ACCESSIBILITY.md) updated. |

### Nice-to-have

| Task | Status | Notes |
|------|--------|--------|
| **Community theme gallery** | — | Seasonal or community themes; keep contrast and a11y in mind. |
| **VS Code snippets** | — | Snippet pack for BEM class names and semantic tokens. |
| **Optional React/Vue npm packages** | — | Separate `@rizzo-css/react` / `@rizzo-css/vue` packages; in-repo implementations remain canonical. |
| **Chart component** | — | Presentational wrapper; often satisfied by a chart library. [Future components](#future-components-and-blocks). |
| **Combobox** | — | Autocomplete + select; more complex. [Future components](#future-components-and-blocks). |
| **Command palette** | — | e.g. Cmd+K; Search is related; optional full command UI. [Future components](#future-components-and-blocks). |
| **Input OTP** | — | One-time / verification code input (digit cells). [Future components](#future-components-and-blocks). |

---

## Remaining

### Accessibility
- **Manual screen reader testing** — Work through the [manual testing checklist](./ACCESSIBILITY.md#manual-accessibility-testing); fix any announced-label or focus issues.

### Developer experience
- **Storybook** *(done)* — Optional Storybook for React components at `src/stories/`. Run `pnpm storybook` (builds CSS then starts on port 6006). See [STORYBOOK.md](./STORYBOOK.md).

### Package distribution
- **Multi-framework** — **React:** *(done)* All **58 components** with full implementations, live demos, and React code blocks at `/docs/react/components/<slug>`. React and Vue doc pages show **all five framework tabs** (Astro | Vanilla | Svelte | Vue | React) with framework-specific syntax via `astroCodeSnippets.ts`, `svelteCodeSnippets.ts`, `vanillaCodeSnippets.ts`. **Vue:** *(done)* All **58 components** with Vue implementations, live demos, and Vue SFC code blocks at `/docs/vue/components/<slug>`. **Vue components index:** `/docs/vue/components` has dedicated page (same as React). **Scaffolds:** React and Vue have base scaffolds (`scaffold/react/base/`, `scaffold/vue/base/` — Vite) for init/add; CLI copies base + optional components. Config: React — `src/config/reactComponents.ts`, `reactCodeSnippets.ts`, `astroCodeSnippets.ts`, `svelteCodeSnippets.ts`, `vanillaCodeSnippets.ts`, `reactDocPaths.ts`; Vue — same snippet configs + `vueCodeSnippets.ts`, `reactDocPaths.ts` (getVueDocStaticPaths), `src/components/vue/registry.js`, `VueDocDemo.vue`. See [planning/REACT_VUE_VITE_PLAN.md](./planning/REACT_VUE_VITE_PLAN.md), [FRAMEWORK_STRUCTURE](./FRAMEWORK_STRUCTURE.md), [TEMPLATES.md](./TEMPLATES.md).
- **In-repo framework routes** — **React:** *(done)* Index, components overview, and dynamic route for all **58** component pages at `/docs/react/*`. **Vue:** *(done)* Same pattern at `/docs/vue/*`; `/docs/vue/components` index page lists all 58 components.

### Performance
- **Lazy loading** *(optional)* — Documented in [BEST_PRACTICES.md – Lazy loading](./BEST_PRACTICES.md#lazy-loading-optional). Single-bundle approach is default; optional theme/component lazy-load only if you have a measured need.

### CSS & design system (as needed)
- Additional spacing/transform/animation variables if discovered during porting.

### Browser support
- **Cross-browser testing** — CI runs a11y on Chromium, Firefox, and WebKit (see [BROWSER_SUPPORT.md – Testing](./BROWSER_SUPPORT.md#testing)). Playwright projects also include Edge, Mobile Chrome (Pixel 5), Mobile Safari (iPhone 12); run locally or add to CI as needed. Manual testing on real devices as needed.

### Examples & demos
- **Example pages** — *(done)* [Examples overview](/docs/examples) and [Form & layout examples](/docs/examples/form-layouts) (login form, contact form, card grid, settings panel) with copy-paste snippets. Theme showcase remains at [Themes](/themes); blocks at [Blocks](/blocks).
- **Blocks** — *(enhanced)* Six block pages (Landing hero, Pricing, Dashboard, Docs layout, Login, Sign up) under `/blocks`; each has **Usage** section with **Astro | Vanilla | Svelte | Vue | React** code tabs (see `src/config/blockCodeSnippets.ts`). Preview + CLI instructions and component references. See [Blocks](/blocks) and [COMPONENTS.md](./COMPONENTS.md).
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
- **RTL support** — *(done)* [RTL.md](./RTL.md): logical utilities (`mis-*`, `mie-*`, `pis-*`, `pie-*`), RTL smoke test; [BEST_PRACTICES.md – RTL](./BEST_PRACTICES.md#rtl-right-to-left-support).
- **CSS custom property docs** — *(done)* [Tokens reference](/docs/tokens) page listing spacing, typography, semantic colors, radius, transition, z-index, and layout tokens.

### Documentation & site
- **Component changelog** — *(done)* [CHANGELOG.md](../CHANGELOG.md) in repo root; linked from [docs/README.md](./README.md). Per-release detail can be expanded.
- **More copy-paste examples** — *(done)* [Form & layout examples](/docs/examples/form-layouts): login, contact, dashboard stats cards, card grid, settings panel. [Examples overview](/docs/examples) links to themes and blocks.
- **Search** — *(done)* Client-side search works with no setup; Algolia optional for production. See [ALGOLIA_SETUP.md](./ALGOLIA_SETUP.md).
- **Docs version selector** — *(documented)* Docs site reflects latest main; [docs/README.md](./README.md) notes that specific versions are in CHANGELOG and on npm.

### Accessibility & quality
- **Cross-browser a11y** — *(done)* CI runs a11y on Chromium, Firefox, and WebKit; see [BROWSER_SUPPORT.md – Testing](./BROWSER_SUPPORT.md#testing). Locally: `pnpm test:a11y:ci:cross-browser`.
- **Component a11y matrix** — *(done)* [ACCESSIBILITY.md – Component a11y matrix](./ACCESSIBILITY.md#component-a11y-matrix-and-checklist): table of expected ARIA, keyboard, focus; automated tests cover routes in specs.
- **Bundle size budget** — *(done)* CI runs `node scripts/bundle-size.mjs --check` (450 kB package CSS); `pnpm check:size` locally. Documented in [PUBLISHING.md](./PUBLISHING.md) and [CONTRIBUTING.md](../CONTRIBUTING.md).

### Frameworks & scaffolds
- **React components** — *(done)* All **58 components** have full React implementations, live demos, and accurate React/TSX code blocks on each doc page. Same BEM and behavior as Astro and Svelte.
- **Vue components** — *(done)* All **58 components** with Vue implementations, live demos, and Vue SFC code blocks at /docs/vue; optional separate package in future.
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
| **CSS & themes** | Additional theme presets *(optional)* — Community or seasonal; keep contrast and a11y in mind. See [THEMING.md](./THEMING.md). |
| **Documentation** | — **Search** *(done)*: Client-side works with no setup; Algolia optional ([ALGOLIA_SETUP.md](./ALGOLIA_SETUP.md)). |
| **CI** | — Dependency audit in a11y workflow is now **blocking** (was continue-on-error). |
| **A11y** | — *(matrix done)* |
| **Frameworks** | React: *(all 58 done)*; Vue: *(all 58 done)*; in-repo routes *(done)* |
| **General** | — *(stability/semver documented)* |

**Remaining (priority)** — Manual a11y testing (keyboard + screen reader); cross-browser/manual device testing as needed. Storybook is in place (see [STORYBOOK.md](./STORYBOOK.md)). Production hardening, block framework tabs, smoke test, footer version, React/Vue components and in-repo docs routes are in place; docs, components, and CLI are up to date.

---

## Future components and blocks

Components and blocks we may add later. Use our design system (BEM, tokens, a11y) when implementing. See the [Future components and blocks](#future-components-and-blocks) section in this doc for the gap list.

**Components (candidates for future addition):**

| Component | Notes |
|-----------|--------|
| **Calendar** | Month grid for date display or date picker use; consider external lib for full date logic. |
| **Date Picker** | Date input + calendar; builds on Calendar. |
| **Range Calendar** | Date range selection. |
| **Carousel** | *(done)* Sliding content with prev/next and indicators; 58 components total. |
| **Chart** | Data charts; often satisfied by a chart library; optional presentational wrapper. |
| **Combobox** | Autocomplete + select; more complex. |
| **Command** | Command palette (e.g. Cmd+K); Search is related; optional full command UI. |
| **Input OTP** | One-time / verification code input (separate digit cells). |
| **Item** | Optional list/item primitive only if needed. |
| **Typography** | Optional component for applying text styles; we have design system typography tokens. |

**Blocks (candidates for future addition):**

| Block | Notes |
|-------|--------|
| Additional block templates | E.g. blog list, feature grid, testimonial, CTA strip; add as needed. |

When adding any of these: follow [CONTRIBUTING.md](../CONTRIBUTING.md#checklist-for-new-component-prs), update [COMPONENTS.md](./COMPONENTS.md), [docsNav.ts](../src/config/docsNav.ts), a11y routes, CLI/scaffold lists, and framework registries.

---

## Design system principles

- BEM naming; semantic theme variables; no inline styles. WCAG 2.1 AA minimum; keyboard navigable; all themes. Styling is the source of truth; porting to other frameworks ports JS only. See [DESIGN_SYSTEM.md](./DESIGN_SYSTEM.md).
