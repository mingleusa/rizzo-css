# Changelog

All notable changes to the Rizzo CSS design system and the **rizzo-css** npm package are documented here. The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/), and we use [semantic versioning](https://semver.org/) (see [PUBLISHING.md](docs/PUBLISHING.md)).

## [Unreleased]

- New blocks: **Landing hero** and **Pricing cards** (design tokens, Card/Button/Badge). Block routes included in a11y axe runs.
- Vue doc live examples and code blocks for all component pages; Vue routes covered by axe (keyboard/ARIA remain Astro + React only).
- Vanilla tab copy-paste HTML for theme-switcher, settings, font-switcher, back-to-top, and forms.
- **rizzo-css** npm package now ships **React and Vue scaffolds** (added to `files`); description and keywords updated for all five frameworks.
- TypeScript: proper `ReactComponentSlug` usage in Astro/registry; window globals and Modal `inert` typed; Tabs `iconComponent` typed.

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

[Unreleased]: https://github.com/mingleusa/rizzo-css/compare/v0.0.63...HEAD
[0.0.63]: https://github.com/mingleusa/rizzo-css/releases/tag/v0.0.63
[0.0.62]: https://github.com/mingleusa/rizzo-css/releases/tag/v0.0.62
[0.0.61]: https://github.com/mingleusa/rizzo-css/releases/tag/v0.0.61
