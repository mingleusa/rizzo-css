# Rizzo CSS documentation

This folder contains the **markdown documentation** for the Rizzo CSS design system. The **live docs site** is built from the Astro app in `src/` and is available at [rizzo-css.vercel.app](https://rizzo-css.vercel.app).

## Doc index

### Guides (getting started, design, theming)

| Doc | Description |
|-----|-------------|
| [GETTING_STARTED.md](./GETTING_STARTED.md) | Installation, CLI, package, CDN, framework setup |
| [UPGRADE.md](./UPGRADE.md) | Upgrading between versions; pre-1.0 checklist; what to expect at 1.0 |
| [DESIGN_SYSTEM.md](./DESIGN_SYSTEM.md) | Design system overview, variables, typography |
| [THEMING.md](./THEMING.md) | Themes, theme switcher, building your own |
| [COLORS.md](./COLORS.md) | Color system, OKLCH, format conversion |
| [ACCESSIBILITY.md](./ACCESSIBILITY.md) | A11y features, testing, manual checklist |
| [MULTI_FRAMEWORK.md](./MULTI_FRAMEWORK.md) | Vanilla, Astro, Svelte, React, Vue; same CSS and components |
| [SOUNDS_AND_FONTS.md](./SOUNDS_AND_FONTS.md) | Sound effects and font pairs (where they live, behavior) |
| [BEST_PRACTICES.md](./BEST_PRACTICES.md) | Component composition patterns, performance optimization tips |

### Reference

| Doc | Description |
|-----|-------------|
| [TESTING.md](./TESTING.md) | A11y, browser, and component-page testing (Playwright, axe, keyboard, ARIA, smoke) |
| [COMPONENTS.md](./COMPONENTS.md) | All components (58 in CLI; doc pages by category), usage, BEM, framework tabs |
| [CHANGELOG](../CHANGELOG.md) | Package and design system changelog (releases, notable changes) |
| [CLI.md](./CLI.md) | CLI commands, config, templates, options |
| [BROWSER_SUPPORT.md](./BROWSER_SUPPORT.md) | OKLCH and required features; polyfills and testing |
| [RTL.md](./RTL.md) | Right-to-left support: `dir="rtl"`, logical utilities (`mis-*`, `mie-*`, `pis-*`, `pie-*`) |
| **AI / LLM** | [ai/README.md](../ai/README.md) — Canonical spec: [public/llms.txt](../public/llms.txt) (served at `/llms.txt`). BEM naming (no prefix), 58 components, 6 blocks, 14 themes, semantic tokens. Use for AI-assisted codegen and tooling. |
| **Design tokens** | `pnpm export:tokens` writes **public/tokens/rizzo-tokens.json** and **.js** from `ai/design-tokens.json` (runs as part of `pnpm build`). Served at `/tokens/rizzo-tokens.json`; use in Figma, Style Dictionary, or runtimes. |

The docs **site** also includes a **Tokens reference** ([/docs/tokens](https://rizzo-css.vercel.app/docs/tokens)) and **Examples** ([/docs/examples](https://rizzo-css.vercel.app/docs/examples), form layouts) as live pages. The live site reflects the **latest main** branch; for a specific package version (e.g. 0.0.86), see [CHANGELOG](../CHANGELOG.md) or the [npm package](https://www.npmjs.com/package/rizzo-css) page.

### Maintainers & development

| Doc | Description |
|-----|-------------|
| [PUBLISHING.md](./PUBLISHING.md) | Versioning, prepublish, npm publish, CDN |
| [MAINTAINING.md](./MAINTAINING.md) | Maintenance notes and links |
| [FRAMEWORK_STRUCTURE.md](./FRAMEWORK_STRUCTURE.md) | Repo layout: src/, scaffolds, frameworks |
| [TEMPLATES.md](./TEMPLATES.md) | Landing, Docs, Dashboard, Full templates (init and add) |
| [TODO.md](./TODO.md) | Current tasks, **tasks by impact** (high/medium/nice-to-have), roadmap, and **future components/blocks** to add |
| [STORYBOOK.md](./STORYBOOK.md) | Optional Storybook for React components (`pnpm storybook`) |
| [ALGOLIA_SETUP.md](./ALGOLIA_SETUP.md) | Search: client-side (no setup) or Algolia for production; indexing and env setup |

### Testing

**A11y, smoke, and visual regression tests** use Playwright. Before running `pnpm test:a11y` or `pnpm test:smoke` for the first time, install browsers: `pnpm exec playwright install chromium` (or `pnpm exec playwright install` for all). Use **`pnpm test:a11y:fast`** for a smaller route subset and faster local feedback. **Visual regression:** `pnpm test:visual` (compare to baselines), `pnpm test:visual:update` (update baselines); commit snapshot files so CI can compare. CI runs a11y with sharding (Chromium and Firefox in 2 shards each) and 6 workers, plus the visual job. See [TESTING.md](./TESTING.md), [CONTRIBUTING](../CONTRIBUTING.md#running-and-building), and [BROWSER_SUPPORT.md – Testing](./BROWSER_SUPPORT.md#testing).

## Repository structure

| Path | Purpose |
|------|---------|
| **/** | Root: `package.json`, `README.md`, `CONTRIBUTING.md` |
| **docs/** | Markdown docs (this folder) |
| **src/** | Astro docs site: `pages/` (docs, blocks, themes, colors), `components/`, `layouts/` (DocsLayout, BlocksLayout), `styles/`, `config/`, `types/`, `utils/`, `assets/` |
| **packages/rizzo-css/** | Published npm package: `bin/`, `dist/`, `scaffold/` (vanilla/, astro/, svelte/, react/, vue/, config/, utils/) — Astro, Svelte, React, and Vue include base/ and variants/ (e.g. **Full** template); React and Vue use Vite. |
| **scripts/** | Build and copy: `build-css.js`, `copy-scaffold.js`, `prepare-vanilla-scaffold.js`, `index-docs.js` |
| **tests/** | Playwright a11y tests (`tests/a11y/`) and smoke tests (`tests/smoke.spec.mjs`). **First run:** install browsers with `pnpm exec playwright install chromium` (or `playwright install` for all). See [CONTRIBUTING](../CONTRIBUTING.md) and [BROWSER_SUPPORT.md](./BROWSER_SUPPORT.md#testing). |
| **.husky/** | Git hooks: pre-commit (lint-staged for CSS), pre-push (build + smoke tests). See [CONTRIBUTING](../CONTRIBUTING.md). |
| **vercel.json** | Cache and security headers for deploy. CI: [.github/workflows/a11y.yml](../.github/workflows/a11y.yml) runs only when relevant paths change. |

Site pages (Astro) live under `src/pages/`: docs (`docs/`), blocks (`blocks/` with BlocksLayout), themes, colors. The navbar uses flat links: Docs | Components | Blocks | Themes | Colors. Markdown in `docs/` is the source of truth for maintainers and contributors.
