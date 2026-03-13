# Changelog

All notable changes to the Rizzo CSS design system and the **rizzo-css** npm package are documented here. The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/), and we use [semantic versioning](https://semver.org/) (see [PUBLISHING.md](docs/PUBLISHING.md)).

## [Unreleased]

- (Next: see [docs/TODO.md](docs/TODO.md).)

## [0.0.81] - 2025-03-12

- **Version:** Bump to 0.0.81. Svelte Settings panel aligned with Astro/docs: Theme (ThemeSwitcher), Font Size, Font (FontSwitcher), Sound (SoundEffects), Accessibility. CLI: ThemeIcon added to SVELTE_COMPONENTS so Full variant copies it; scaffold and src Settings use ThemeSwitcher, FontSwitcher, SoundEffects.
- **Docs:** Svelte SettingsDoc lists full panel contents (Theme, Font Size, Font, Sound, Accessibility) and persistence keys (fontPair, soundEffects). Svelte full scaffold README describes Settings panel. All docs and AI assets (llms.txt, ai/llms.json, ai/README.md) aligned to 0.0.81.

## [0.0.80] - 2025-03-12

- **Version:** Bump to 0.0.80. Svelte full variant: add fallback `.svelte-kit/tsconfig.json` and gitignore tweak so tsconfig extends work before first `svelte-kit sync`; root tsconfig `noEmit: true` to avoid overwrite of `svelte.config.js`.
- **Docs:** All documentation (PUBLISHING, GETTING_STARTED, UPGRADE, BEST_PRACTICES, README badges, scaffold READMEs, issue template, TODO, tokens, ai/llms) aligned to 0.0.80; Svelte full scaffold README documents tsconfig fallback.

## [0.0.79] - 2025-03-12

- **Svelte:** Settings SSR-safe: use `isBrowser` (window + localStorage.getItem) for initial state to fix "localStorage.getItem is not a function" when localStorage is polyfilled or missing. Navbar: remove redundant `role="navigation"` from `<nav>`. Search: replace invalid `href="#"` on sample result links with `/docs/getting-started`, `/docs/components`, `/docs/theming`.

## [0.0.78] - 2025-03-12

- **Svelte:** Settings and FontSwitcher now import fonts config from `./config/fonts` (co-located under `src/lib/rizzo/config/fonts.ts`). copy-scaffold writes `scaffold/svelte/config/fonts.ts` and rewrites imports; CLI copies `scaffold/svelte/config/` to `src/lib/rizzo/config/` when Settings or FontSwitcher is added, fixing "Failed to load url ../../config/fonts" in scaffolded Svelte apps.

## [0.0.77] - 2025-03-12

- **Svelte scaffold & docs:** Button component gains `size` prop (`sm` | `md` | `lg`); Navbar gains optional `menuLinks` prop and exported `NavbarLink` type for portfolio-style nav (About, Skills, Projects, Contact). Base Svelte scaffold is now a portfolio-style landing with placeholder content (hero, about, skills, projects, contact), layout includes Navbar (with portfolio menu links), Footer, BackToTop, Settings. Full variant layout includes BackToTop. All Svelte doc code blocks and live examples standardized to `$lib/rizzo` imports; ButtonDoc, NavbarDoc, BadgeDoc, CardsDoc, FooterDoc, FormsDoc, and all other Svelte component docs updated. Scaffold and src index export `NavbarLink`.

## [0.0.76] - 2025-03-06

- **Version:** Bump to 0.0.76 for distribution. Package version updated in root and `packages/rizzo-css/package.json`; README badge, llms.txt, ai/llms.json, PUBLISHING, BEST_PRACTICES, UPGRADE, scaffold READMEs, issue template, Footer comments, docs/TODO, tokens export, and scaffold Vue/React base dependencies aligned to 0.0.76.
- **Vue:** All Vue components (src and scaffold) now use runtime `defineProps({ ... })` instead of type-only `defineProps<...>()` to fix TS1137 "Expression or comma expected" when building with vue-tsc.

## [0.0.75] - 2025-03-06

- **Version:** Bump to 0.0.75 for distribution. Package version updated in root and `packages/rizzo-css/package.json`; README badge, llms.txt, ai/llms.json, PUBLISHING, BEST_PRACTICES, UPGRADE, scaffold READMEs, issue template, Footer comments, docs/TODO, and tokens export aligned to 0.0.75.
- **New components (58 total):** Chart, Command, Direction, Input OTP, Menubar added across Astro, React, Vue, Svelte, and Vanilla. CSS (BEM), doc pages, live examples, code snippets, and ai/llms.json updated. (shadcn/ui comparison completed; Chart, Command, Direction, Input OTP, Menubar added.)
- **Docs & AI:** All docs and ai folder (llms.json, README, public/llms.txt) updated for 58 components and accurate live examples/code blocks.


## [0.0.74] - 2025-03-06

- **Version:** Bump to 0.0.74 for distribution. Package version updated in root and `packages/rizzo-css/package.json`; README badge, llms.txt, ai/llms.json, PUBLISHING, BEST_PRACTICES, UPGRADE, scaffold READMEs, issue template, Footer comments, docs/TODO, and tokens export aligned to 0.0.74.
- **CLI:** Init flow fixed: prompt "Run &lt;pm&gt; install?" before "Initialize git?" so both prompts appear; Full template now triggers install prompt and no longer shows "Basic template" message. Svelte Full and base scaffolds include `vite.config.js` (SvelteKit plugin) so `pnpm dev` starts the dev server.

## [0.0.73] - 2025-02-27

- **Version:** Bump to 0.0.73 for distribution. Package version updated in root and `packages/rizzo-css/package.json`; README badge, llms.txt, ai/llms.json, PUBLISHING, BEST_PRACTICES, UPGRADE, scaffold READMEs, issue template, Footer comments, docs/TODO, and tokens export aligned to 0.0.73.
- **Security (audit):** pnpm override for `svgo` set to `>=4.0.1` to fix high-severity DoS (Billion Laughs) in transitive dependency; `pnpm audit --audit-level=high` now passes.

## [0.0.72] - 2025-02-27

- **Version:** Bump to 0.0.72 for distribution. Package version updated in root and `packages/rizzo-css/package.json`; README badge, llms.txt, ai/llms.json, PUBLISHING, BEST_PRACTICES, UPGRADE, scaffold READMEs, issue template, Footer comments, docs/TODO, and tokens export aligned to 0.0.72.
- **Overlay stacking (Alert Dialog, Modal, Sheet):** All three overlay components now use a root wrapper (`.alert-dialog-root`, `.modal-root`, `.sheet-root`) so the overlay stacks behind the dialog/modal/sheet in one stacking context. Applied across Astro, React, Svelte, Vue, and vanilla docs/snippets; scaffold React Sheet updated; Svelte Modal footer indentation fixed. Legacy markup without the wrapper still uses z-index fallbacks.

## [0.0.71] - 2025-02-27

- **Version:** Bump to 0.0.71 for distribution. Package version updated in root and `packages/rizzo-css/package.json`; README badge, llms.txt, ai/llms.json, PUBLISHING, BEST_PRACTICES, UPGRADE, scaffold READMEs, issue template, Footer comments, docs/TODO, and tokens export aligned to 0.0.71.
- **React CLI scaffold:** Base template (`scaffold/react/base/`) now includes Vite `@` path alias (vite.config.ts + tsconfig.json), `.env.example`, and README-RIZZO.md updated with project structure and `@/components/rizzo` import notes. Aligns with Vue scaffold; no duplicate files.
- **A11y:** In-doc prose links (e.g. "Other frameworks") now use underline so they are distinguishable without relying on color (axe `link-in-text-block`, WCAG 1.4.1). Nav, cards, navbar, and similar links remain without underline.
- **Build:** `scripts/build-css.js` uses `rmSync(..., { force: true })` when clearing `public/icons` to avoid ENOTEMPTY on some systems.
- **Alert Dialog:** Overlay z-index fixed so it stacks behind the dialog (uses `--z-modal-backdrop` / `--z-modal`; overlay no longer covers the dialog).

## [0.0.70] - 2025-02-27

- **Version:** Bump to 0.0.70 for distribution. Package version updated in root and `packages/rizzo-css/package.json`; README badge, llms.txt, ai/llms.json, PUBLISHING, BEST_PRACTICES, UPGRADE, scaffold READMEs, issue template, Footer comments, docs/TODO, and tokens export aligned to 0.0.70.

## [0.0.69] - 2025-02-27

- **Version:** Bump to 0.0.69 for distribution. Package version updated in root and `packages/rizzo-css/package.json`; README badge, llms.txt, ai/llms.json, PUBLISHING, BEST_PRACTICES, UPGRADE, scaffold READMEs, issue template, Footer comments, docs/TODO, and tokens export aligned to 0.0.69.
- **Component alignment:** All 53 components have aligned live examples across Astro, Vanilla, Svelte, Vue, and React. Vue overlay demos (modal, alert-dialog, sheet, popover, hover-card, context-menu, dropdown) use custom blocks in `VueDocDemo.vue` with Rizzo BEM and refs; tooltip/copy-to-clipboard snippets and Vanilla label/tooltip copy aligned. Alignment completed across all frameworks.

## [0.0.68] - 2025-02-27

- **Version:** Bump to 0.0.68 for distribution. Package version updated in root and `packages/rizzo-css/package.json`; all docs, README badge, llms.txt, ai/llms.json, PUBLISHING, BEST_PRACTICES, UPGRADE, scaffold READMEs, issue template, and tokens export aligned to 0.0.68.
- **Visual regression (CI):** Screenshot tests now use `maxDiffPixelRatio: 0.02` and lock theme before capture so minor font/subpixel differences between CI (Linux) and local do not fail the build. [TESTING.md](docs/TESTING.md) updated.

## [0.0.67] - 2025-02-27

- **Version:** Bump to 0.0.67 for distribution. Package version updated in root and `packages/rizzo-css/package.json`; all docs, README badge, llms.txt, ai/llms.json, PUBLISHING, BEST_PRACTICES, scaffold READMEs, issue template, and tokens export aligned to 0.0.67.
- **Upgrade guide:** [docs/UPGRADE.md](docs/UPGRADE.md) — how to upgrade within 0.0.x, pre-1.0 checklist, and what to expect at 1.0. [MAINTAINING.md](docs/MAINTAINING.md) expanded with Pre-1.0 checklist (API stability, deprecation policy, docs).
- **Showcase page:** [/docs/showcase](/docs/showcase) — single page linking to components, themes, blocks, and examples; added to docs nav and a11y/smoke tests.
- **Carousel a11y:** Indicators container changed from `<ol><li><button role="tab">` to `<div role="tablist"><button role="tab">` so tablist has direct tab children (fixes axe aria-required-children, aria-required-parent, listitem). Applied in Astro, React, Svelte, Vue, vanilla snippet, and package scaffolds.
- **TODO:** [Tasks by impact](docs/TODO.md#tasks-by-impact) in docs/TODO.md; Showcase and Pre-1.0/upgrade guide marked done.

## [0.0.66] - 2025-02-27

- **Version:** Bump to 0.0.66 for distribution. Production-ready: component count (50), docs, CLI, and package version aligned across all relevant areas.
- **Docs & CLI sync:** Component count aligned to 50 (canonical `REACT_COMPONENT_SLUGS`) across README, docs/*.md, Layout meta, overview/getting-started, React/Vue index, home page, Storybook AllComponents, CLI help, scaffold READMEs, CHANGELOG, and PUBLISHING. Live examples, demos, and code blocks unchanged (React/Vue snippets and DEMO_PROPS already fixed previously).
- **Ship readiness:** Component count (50) and version aligned in README, Layout meta description, overview/getting-started, Storybook AllComponents, CLI help, and CHANGELOG. Svelte InputGroupDoc code block fixed (escape `$` in template literal). Build and build:package pass.
- **CI:** Dependency audit in `.github/workflows/a11y.yml` is now blocking (removed `continue-on-error: true`).
- **Backlog / docs:** TODO backlog table updated: Search marked done (client-side + Algolia); theme presets optional; ALGOLIA_SETUP linked in docs README.
- **Docs:** TODO.md now includes a **Future components and blocks** section (Calendar, Date Picker, Range Calendar, Carousel, Chart, Combobox, Command, Input OTP, Item, Typography; additional block templates). All docs updated for 50 components; docs/README.md links TODO for future components/blocks.
- **Input Group:** New component (Astro, React, Vue, Svelte, Vanilla) — input with optional prefix/suffix addons. BEM: `input-group`, `input-group__wrapper`, `input-group__addon`, `input-group__input`; CSS in `forms.css`; doc page, nav, a11y routes, CLI, and code snippets updated.
- **Blocks & design system:** Block styles (landing-hero, pricing-grid/pricing-card, dashboard-page, docs-layout-demo, block-preview-wrapper) moved to `src/styles/pages.css` with design tokens (`--font-size-*`, `--font-weight-*`, `--spacing-*`, `--text`, `--accent`). Dashboard and docs-layout block pages fixed to use token names (no `--text-2xl`). Component inventory (Aspect Ratio, Button Group, Empty, Sheet, Slider, Toggle, Toggle Group, Kbd, Resizable, Scroll Area, etc.) and framework parity note updated to include React and Vue.
- **Scaffold:** Svelte scaffold `package.json` (base + variants/full) updated to `@sveltejs/kit` ^2.53.4 and `svelte` ^5.53.5 to match root and security updates.
- **Storybook:** Dependencies documented in `docs/STORYBOOK.md` (React only; `@storybook/react` provided by `@storybook/react-vite`). All stories use `import type { Meta, StoryObj } from '@storybook/react'`; MDX uses `@storybook/addon-docs/blocks`. Stories added: Settings (with Guide + Controls), Search, Navbar, Dropdown, Theme Switcher.
- **Docs:** README Svelte badge and Tech Stack updated to 5.53+; markdown and site docs aligned with current state (version 0.0.66, five frameworks, Storybook 10).

## [0.0.65] - 2025-02-27

- **Version:** Bump to 0.0.65. Manual testing checklist page at `/docs/accessibility/manual-testing` with component links; framework references (React, Vue) updated across docs and scaffolds.
- **Storybook:** Optional Storybook 10 for React components (run `pnpm storybook`). Introduction (MDX), All 50 Components (dropdown), individual stories (Button, Badge, Card, Alert, Modal, Accordion, Tabs, Spinner, Progress Bar), and Blocks (Landing Hero, Pricing, Dashboard, Docs Layout). See `docs/STORYBOOK.md`.
- **Documentation:** All docs audited and updated for version 0.0.65, five frameworks, and current Storybook/config.

## [0.0.64] - 2025-02-25

- **React and Vue scaffolds:** Full base scaffolds for distribution. `scaffold/react/base/` (Vite + React) and `scaffold/vue/base/` (Vite + Vue) with package.json, index.html, theme script, src entry and App; CLI copies base for init/add (Landing, Docs, Dashboard, CSS only). React/Vue gitignore, create-new and add-to-existing branches, css-only and success messaging updated.
- Docs and README: all five frameworks and scaffolds (TEMPLATES, FRAMEWORK_STRUCTURE, TODO, MULTI_FRAMEWORK, SOUNDS_AND_FONTS, README badges/examples) aligned with current state. Version references updated for 0.0.64.

## [0.0.63] - 2025-02-25

- Version bump.
- CLI banner and help include React and Vue; ASCII art tagline: "Design system · Vanilla · Astro · Svelte · React · Vue". Package and CLI now support all five frameworks (scaffolds for Vanilla, Astro, Svelte, React, Vue).

## [0.0.62] - 2025-02-25

- Version bump. All features and docs as of 0.0.61 (CLI --offline, version check, tokens, examples, CHANGELOG, a11y matrix, etc.) are included.

## [0.0.61] and earlier

- **Package:** Single **rizzo-css** package (CSS, CLI, scaffolds for Vanilla, Astro, Svelte). Templates: CSS only | Landing | Docs | Dashboard | Full. 56 components; 14 themes; BEM naming; semantic theming; WCAG AA.
- **CLI:** `init`, `add`, `theme`, `doctor`, `help`. Add supports `--dry-run` and `--offline`; init/add support `--offline` (pass to package manager). Optional version check after add/init (one-line notice if newer npm version). Doctor checks config, theme, fonts/sfx paths, small-CSS warning, version hint.
- **Automated a11y:** axe, keyboard, ARIA, theme contrast; cross-browser CI (Chromium, Firefox, WebKit). Bundle size budget (450 kB); tokens reference and example pages.
- **Docs:** [rizzo-css.vercel.app](https://rizzo-css.vercel.app); GETTING_STARTED, DESIGN_SYSTEM, ACCESSIBILITY, BEST_PRACTICES, BROWSER_SUPPORT, CLI, COMPONENTS, PUBLISHING, CONTRIBUTING. Tokens reference at /docs/tokens; examples at /docs/examples.

For per-component or release-by-release entries, we may add more detail here or link to GitHub releases.

[Unreleased]: https://github.com/mingleusa/rizzo-css/compare/v0.0.81...HEAD
[0.0.81]: https://github.com/mingleusa/rizzo-css/compare/v0.0.80...v0.0.81
[0.0.80]: https://github.com/mingleusa/rizzo-css/compare/v0.0.79...v0.0.80
[0.0.79]: https://github.com/mingleusa/rizzo-css/compare/v0.0.78...v0.0.79
[0.0.78]: https://github.com/mingleusa/rizzo-css/compare/v0.0.77...v0.0.78
[0.0.77]: https://github.com/mingleusa/rizzo-css/compare/v0.0.76...v0.0.77
[0.0.76]: https://github.com/mingleusa/rizzo-css/compare/v0.0.75...v0.0.76
[0.0.75]: https://github.com/mingleusa/rizzo-css/compare/v0.0.74...v0.0.75
[0.0.74]: https://github.com/mingleusa/rizzo-css/compare/v0.0.73...v0.0.74
[0.0.73]: https://github.com/mingleusa/rizzo-css/compare/v0.0.72...v0.0.73
[0.0.72]: https://github.com/mingleusa/rizzo-css/compare/v0.0.71...v0.0.72
[0.0.71]: https://github.com/mingleusa/rizzo-css/compare/v0.0.70...v0.0.71
[0.0.70]: https://github.com/mingleusa/rizzo-css/compare/v0.0.69...v0.0.70
[0.0.69]: https://github.com/mingleusa/rizzo-css/compare/v0.0.68...v0.0.69
[0.0.68]: https://github.com/mingleusa/rizzo-css/compare/v0.0.67...v0.0.68
[0.0.67]: https://github.com/mingleusa/rizzo-css/compare/v0.0.66...v0.0.67
[0.0.66]: https://github.com/mingleusa/rizzo-css/compare/v0.0.65...v0.0.66
[0.0.65]: https://github.com/mingleusa/rizzo-css/compare/v0.0.64...v0.0.65
[0.0.64]: https://github.com/mingleusa/rizzo-css/releases/tag/v0.0.64
[0.0.63]: https://github.com/mingleusa/rizzo-css/releases/tag/v0.0.63
[0.0.62]: https://github.com/mingleusa/rizzo-css/releases/tag/v0.0.62
[0.0.61]: https://github.com/mingleusa/rizzo-css/releases/tag/v0.0.61
