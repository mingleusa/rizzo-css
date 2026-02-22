# Rizzo CSS documentation

This folder contains the **markdown documentation** for the Rizzo CSS design system. The **live docs site** is built from the Astro app in `src/` and is available at [rizzo-css.vercel.app](https://rizzo-css.vercel.app).

## Doc index

### Guides (getting started, design, theming)

| Doc | Description |
|-----|-------------|
| [GETTING_STARTED.md](./GETTING_STARTED.md) | Installation, CLI, package, CDN, framework setup |
| [DESIGN_SYSTEM.md](./DESIGN_SYSTEM.md) | Design system overview, variables, typography |
| [THEMING.md](./THEMING.md) | Themes, theme switcher, building your own |
| [COLORS.md](./COLORS.md) | Color system, OKLCH, format conversion |
| [ACCESSIBILITY.md](./ACCESSIBILITY.md) | A11y features, testing, manual checklist |
| [MULTI_FRAMEWORK.md](./MULTI_FRAMEWORK.md) | Vanilla, Astro, Svelte; same CSS and components |
| [SOUNDS_AND_FONTS.md](./SOUNDS_AND_FONTS.md) | Sound effects and font pairs (where they live, behavior) |
| [BEST_PRACTICES.md](./BEST_PRACTICES.md) | Component composition patterns, performance optimization tips |

### Reference

| Doc | Description |
|-----|-------------|
| [COMPONENTS.md](./COMPONENTS.md) | All components (56 in CLI; doc pages by category), usage, BEM, framework tabs |
| [CLI.md](./CLI.md) | CLI commands, config, templates, options |
| [COMPONENT_COMPARISON.md](./COMPONENT_COMPARISON.md) | Component inventory, mapping, gaps, framework parity |
| [BROWSER_SUPPORT.md](./BROWSER_SUPPORT.md) | OKLCH and required features; polyfills and testing |

### Maintainers & development

| Doc | Description |
|-----|-------------|
| [PUBLISHING.md](./PUBLISHING.md) | Versioning, prepublish, npm publish, CDN |
| [MAINTAINING.md](./MAINTAINING.md) | Maintenance notes and links |
| [FRAMEWORK_STRUCTURE.md](./FRAMEWORK_STRUCTURE.md) | Repo layout: src/, scaffolds, frameworks |
| [TEMPLATES.md](./TEMPLATES.md) | Landing, Docs, Dashboard, Full templates (init and add) |
| [TODO.md](./TODO.md) | Current tasks and roadmap |
| [ALGOLIA_SETUP.md](./ALGOLIA_SETUP.md) | Algolia search setup for the docs site |

### Planning (internal)

| Doc | Description |
|-----|-------------|
| [planning/CLI_PLANNING.md](./planning/CLI_PLANNING.md) | CLI scope, commands, implementation phases |
| [planning/PLAN_FONT_CHANGER.md](./planning/PLAN_FONT_CHANGER.md) | Font pairs and Settings font changer (implemented) |
| [planning/SCAFFOLD_REPLICA_PLAN.md](./planning/SCAFFOLD_REPLICA_PLAN.md) | What the package scaffolds ship |

## Repository structure

| Path | Purpose |
|------|---------|
| **/** | Root: `package.json`, `README.md`, `CONTRIBUTING.md` |
| **docs/** | Markdown docs (this folder); planning docs in `docs/planning/` |
| **src/** | Astro docs site: `pages/` (docs, blocks, themes, colors), `components/`, `layouts/` (DocsLayout, BlocksLayout), `styles/`, `config/`, `types/`, `utils/`, `assets/` |
| **packages/rizzo-css/** | Published npm package: `bin/`, `dist/`, `scaffold/` (minimal/, starter/, vanilla/, astro/, svelte/, config/, shared/, utils/) — astro and svelte include base/ and variants/ |
| **scripts/** | Build and copy: `build-css.js`, `copy-scaffold.js`, `prepare-vanilla-scaffold.js`, `index-docs.js` |
| **tests/** | Playwright a11y tests |

Site pages (Astro) live under `src/pages/`: docs (`docs/`), blocks (`blocks/` with BlocksLayout), themes, colors. The navbar uses flat links: Docs | Components | Blocks | Themes | Colors. Markdown in `docs/` is the source of truth for maintainers and contributors.
