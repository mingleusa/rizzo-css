# Rizzo CSS documentation

This folder contains the **markdown documentation** for the Rizzo CSS design system. The **live docs site** is built from the Astro app in `src/` and is available at [rizzo-css.vercel.app](https://rizzo-css.vercel.app).

## Start here

| I want to... | Read |
|--------------|------|
| Use Rizzo in a project | [GETTING_STARTED](./GETTING_STARTED.md), then [CLI](./CLI.md) and [TEMPLATES](./TEMPLATES.md) |
| Understand the design tokens and themes | [DESIGN_SYSTEM](./DESIGN_SYSTEM.md), [THEMING](./THEMING.md), [COLORS](./COLORS.md) |
| Build accessible UI with it | [ACCESSIBILITY](./ACCESSIBILITY.md), [BEST_PRACTICES](./BEST_PRACTICES.md), [RTL](./RTL.md) |
| Look up a component | [COMPONENTS](./COMPONENTS.md) or the [live site](https://rizzo-css.vercel.app/docs/components) |
| Contribute a change | [CONTRIBUTING](../CONTRIBUTING.md), [TESTING](./TESTING.md), [FRAMEWORK_STRUCTURE](./FRAMEWORK_STRUCTURE.md) |
| Cut a release | [PUBLISHING](./PUBLISHING.md), then [UPGRADE](./UPGRADE.md) for the dependency roadmap |
| See what is planned or broken | [TODO](./TODO.md) (start with *Open follow-ups*) and the [CHANGELOG](../CHANGELOG.md) |

## Doc index

### Guides (getting started, design, theming)

| Doc | Description |
|-----|-------------|
| [GETTING_STARTED.md](./GETTING_STARTED.md) | Installation, CLI, package, CDN, framework setup |
| [UPGRADE.md](./UPGRADE.md) | Upgrading between versions; pre-1.0 checklist; dependency upgrade roadmap and security-advisory status |
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
| [TESTING.md](./TESTING.md) | A11y, browser, visual and Storybook testing (Playwright, axe, keyboard, ARIA, smoke), CI jobs and visual baselines |
| [COMPONENTS.md](./COMPONENTS.md) | All components (58 in CLI; doc pages by category), usage, BEM, framework tabs |
| [CHANGELOG](../CHANGELOG.md) | Package and design system changelog (releases, notable changes) |
| [CLI.md](./CLI.md) | CLI commands, config, templates, options |
| [BROWSER_SUPPORT.md](./BROWSER_SUPPORT.md) | OKLCH and required features; polyfills and testing |
| [RTL.md](./RTL.md) | Right-to-left support: `dir="rtl"`, logical utilities (`mis-*`, `mie-*`, `pis-*`, `pie-*`) |
| **AI / LLM** | [ai/README.md](../ai/README.md) — Canonical spec: [public/llms.txt](../public/llms.txt) (served at `/llms.txt`). BEM naming (no prefix), 58 components, 6 blocks, 14 themes, semantic tokens. Use for AI-assisted codegen and tooling. |
| **Design tokens** | `pnpm export:tokens` writes **public/tokens/rizzo-tokens.json** and **.js** from `ai/design-tokens.json` (runs as part of `pnpm build`). Served at `/tokens/rizzo-tokens.json`; use in Figma, Style Dictionary, or runtimes. |

The docs **site** also includes a **Tokens reference** ([/docs/tokens](https://rizzo-css.vercel.app/docs/tokens)) and **Examples** ([/docs/examples](https://rizzo-css.vercel.app/docs/examples), form layouts) as live pages. The live site reflects the **latest main** branch; for a specific package version (e.g. 0.0.88), see [CHANGELOG](../CHANGELOG.md) or the [npm package](https://www.npmjs.com/package/rizzo-css) page.

### Maintainers & development

| Doc | Description |
|-----|-------------|
| [PUBLISHING.md](./PUBLISHING.md) | Release checklist: versioning, tarball inspection, scaffold smoke tests, npm publish (2FA), CDN verification |
| [MAINTAINING.md](./MAINTAINING.md) | Maintenance notes and links |
| [FRAMEWORK_STRUCTURE.md](./FRAMEWORK_STRUCTURE.md) | Repo layout: src/, scaffolds, frameworks |
| [TEMPLATES.md](./TEMPLATES.md) | Landing, Docs, Dashboard, Full templates (init and add) |
| [TODO.md](./TODO.md) | Production readiness, **open follow-ups** (known gaps), **tasks by impact**, roadmap, and future components/blocks |
| [STORYBOOK.md](./STORYBOOK.md) | Optional Storybook for React components (`pnpm storybook`, `pnpm test:storybook`) |
| [ALGOLIA_SETUP.md](./ALGOLIA_SETUP.md) | Search: client-side (no setup) or Algolia for production; indexing and env setup |

### Testing

All browser tests use **Playwright**; the React components also run through the **Storybook test-runner**. Install browsers once before the first run: `pnpm exec playwright install chromium` (or `pnpm exec playwright install` for all). Use **`pnpm test:a11y:fast`** for a smaller route subset. **Visual regression** baselines are generated on the CI runner, not locally: regenerate them from **Actions → Accessibility (a11y) → Run workflow → `update_snapshots`** and commit the artifact. CI runs the dependency audit, build, size budget, a11y on Chromium, Firefox and WebKit, and the visual job on Node 24. See [TESTING.md](./TESTING.md), [CONTRIBUTING](../CONTRIBUTING.md#running-and-building), and [BROWSER_SUPPORT.md – Testing](./BROWSER_SUPPORT.md#testing).

## Repository structure

| Path | Purpose |
|------|---------|
| **/** | Root: `package.json`, `README.md`, `CONTRIBUTING.md` |
| **docs/** | Markdown docs (this folder) |
| **src/** | Astro docs site: `pages/` (docs, blocks, themes, colors), `components/`, `layouts/` (DocsLayout, BlocksLayout), `styles/`, `config/`, `types/`, `utils/`, `assets/` |
| **packages/rizzo-css/** | Published npm package: `bin/`, `dist/`, `scaffold/` (vanilla/, astro/, svelte/, react/, vue/, config/, utils/) — Astro, Svelte, React, and Vue include base/ and variants/ (e.g. **Full** template); React and Vue use Vite. |
| **scripts/** | Build and maintenance: `build-css.js`, `copy-scaffold.js`, `prepare-vanilla-scaffold.js`, `export-tokens.mjs`, `generate-color-formats.mjs`, `check-contrast.mjs`, `bundle-size.mjs`, `update-readme-tech.mjs` (README badges), `index-docs.js` |
| **tests/** | Playwright specs: a11y (`tests/a11y/`: axe, keyboard, ARIA), smoke (`tests/smoke.spec.mjs`) and visual (`tests/visual.spec.mjs` + `-snapshots/`). **First run:** install browsers with `pnpm exec playwright install chromium`. See [CONTRIBUTING](../CONTRIBUTING.md) and [BROWSER_SUPPORT.md](./BROWSER_SUPPORT.md#testing). |
| **.husky/** | Git hooks: pre-commit (lint-staged for CSS), pre-push (build + smoke tests). See [CONTRIBUTING](../CONTRIBUTING.md). |
| **vercel.json** | Cache and security headers for deploy. CI: [.github/workflows/a11y.yml](../.github/workflows/a11y.yml) runs only when relevant paths change. |

Site pages (Astro) live under `src/pages/`: docs (`docs/`), blocks (`blocks/` with BlocksLayout), themes, colors. The navbar uses flat links: Docs | Components | Blocks | Themes | Colors. Markdown in `docs/` is the source of truth for maintainers and contributors.
