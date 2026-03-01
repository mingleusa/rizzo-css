# Changelog

All notable changes to the Rizzo CSS design system and the **rizzo-css** npm package are documented here. The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/), and we use [semantic versioning](https://semver.org/) (see [PUBLISHING.md](docs/PUBLISHING.md)).

## [Unreleased]

- **Ship readiness:** Component count (57) and version (0.0.65) aligned in README, Layout meta description, overview/getting-started, Storybook AllComponents, CLI help, and CHANGELOG [0.0.65]. Svelte InputGroupDoc code block fixed (escape `$` in template literal). Build and build:package pass.
- **CI:** Dependency audit in `.github/workflows/a11y.yml` is now blocking (removed `continue-on-error: true`).
- **Backlog / docs:** TODO backlog table updated: Search marked done (client-side + Algolia); theme presets optional; ALGOLIA_SETUP linked in docs README.
- **Docs:** TODO.md now includes a **Future components and blocks** section (Calendar, Date Picker, Range Calendar, Carousel, Chart, Combobox, Command, Input OTP, Item, Typography; additional block templates). All docs updated for 57 components (was 56); docs/README.md links TODO for future components/blocks.
- **Input Group:** New component (Astro, React, Vue, Svelte, Vanilla) — input with optional prefix/suffix addons. BEM: `input-group`, `input-group__wrapper`, `input-group__addon`, `input-group__input`; CSS in `forms.css`; doc page, nav, a11y routes, CLI, and code snippets updated.
- **Blocks & design system:** Block styles (landing-hero, pricing-grid/pricing-card, dashboard-page, docs-layout-demo, block-preview-wrapper) moved to `src/styles/pages.css` with design tokens (`--font-size-*`, `--font-weight-*`, `--spacing-*`, `--text`, `--accent`). Dashboard and docs-layout block pages fixed to use token names (no `--text-2xl`). COMPONENT_COMPARISON.md updated: Aspect Ratio, Button Group, Empty, Sheet, Slider, Toggle, Toggle Group, Kbd, Resizable, Scroll Area, etc. marked as implemented; framework parity note includes React and Vue.
- **Scaffold:** Svelte scaffold `package.json` (base + variants/full) updated to `@sveltejs/kit` ^2.53.4 and `svelte` ^5.53.5 to match root and security updates.
- **Storybook:** Dependencies documented in `docs/STORYBOOK.md` (React only; `@storybook/react` provided by `@storybook/react-vite`). All stories use `import type { Meta, StoryObj } from '@storybook/react'`; MDX uses `@storybook/addon-docs/blocks`. Stories added: Settings (with Guide + Controls), Search, Navbar, Dropdown, Theme Switcher.
- **Docs:** README Svelte badge and Tech Stack updated to 5.53+; markdown and site docs aligned with current state (version 0.0.65, five frameworks, Storybook 10).

## [0.0.65] - 2025-02-27

- **Version:** Bump to 0.0.65. Manual testing checklist page at `/docs/accessibility/manual-testing` with component links; framework references (React, Vue) updated across docs and scaffolds.
- **Storybook:** Optional Storybook 10 for React components (run `pnpm storybook`). Introduction (MDX), All 57 Components (dropdown), individual stories (Button, Badge, Card, Alert, Modal, Accordion, Tabs, Spinner, Progress Bar), and Blocks (Landing Hero, Pricing, Dashboard, Docs Layout). See `docs/STORYBOOK.md`.
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

[Unreleased]: https://github.com/mingleusa/rizzo-css/compare/v0.0.65...HEAD
[0.0.65]: https://github.com/mingleusa/rizzo-css/compare/v0.0.64...v0.0.65
[0.0.64]: https://github.com/mingleusa/rizzo-css/releases/tag/v0.0.64
[0.0.63]: https://github.com/mingleusa/rizzo-css/releases/tag/v0.0.63
[0.0.62]: https://github.com/mingleusa/rizzo-css/releases/tag/v0.0.62
[0.0.61]: https://github.com/mingleusa/rizzo-css/releases/tag/v0.0.61
