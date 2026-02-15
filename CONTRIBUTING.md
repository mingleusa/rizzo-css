# Contributing to Rizzo CSS

Thanks for your interest in contributing. This doc covers how to run the project, where to add or change code, code style, and the PR process.

## Development setup

- **Node:** 18+
- **Package manager:** pnpm (recommended), npm, yarn, or bun

```bash
pnpm install
```

## Running and building

| Task | Command |
|------|---------|
| **Docs site (dev)** | `pnpm dev` — Astro dev server at http://localhost:4321 |
| **Build site** | `pnpm build` — lint CSS, build CSS, build Astro |
| **Preview built site** | `pnpm preview` |
| **Build CSS only** | `pnpm build:css` |
| **Lint CSS** | `pnpm lint:css` or `pnpm lint:css:fix` |
| **Package (scaffolds)** | `pnpm build:package` — build CSS, run copy-scaffold + prepare-vanilla-scaffold |
| **A11y tests** | `pnpm test:a11y` — build + Playwright (axe, keyboard, ARIA) |

**First time running a11y tests:** Playwright needs a browser. Run `pnpm exec playwright install chromium` once (or `playwright install` for all browsers). If you see "Executable doesn't exist at ... ms-playwright", that means the browser isn't installed yet.

See [package.json](package.json) scripts and [docs/GETTING_STARTED.md](docs/GETTING_STARTED.md) for more.

## Where to add or change things

- **Astro components (source of truth):** `src/components/*.astro` — used by the docs site and copied into `packages/rizzo-css/scaffold/astro/` by `scripts/copy-scaffold.js`.
- **Svelte components:** `src/components/svelte/*.svelte` — same BEM and design system; copied into `packages/rizzo-css/scaffold/svelte/` by copy-scaffold. Export new components in `src/components/svelte/index.ts`.
- **Vanilla:** Component HTML lives in the docs at `src/pages/docs/vanilla/components/`. The package scaffold uses `scaffold/vanilla/` (icons from copy-scaffold; component pages from `scripts/prepare-vanilla-scaffold.js`). Interactive behavior is in `packages/rizzo-css/scaffold/vanilla/js/main.js`.
- **CSS:** `src/styles/` — variables, base, components, pages, themes. All UI colors and spacing use semantic variables (see [docs/DESIGN_SYSTEM.md](docs/DESIGN_SYSTEM.md)).
- **CLI:** `packages/rizzo-css/bin/rizzo-css.js` — commands, component list, scaffold copy logic.
- **Docs content:** `src/pages/docs/`, `docs/*.md`.

When adding a new component, add it to the Astro scaffold list in `scripts/copy-scaffold.js` (`ASTRO_SCAFFOLD`) and to the CLI component lists in `packages/rizzo-css/bin/rizzo-css.js` (`SVELTE_COMPONENTS`, `ASTRO_COMPONENTS`, `VANILLA_COMPONENT_SLUGS` if it has a vanilla slug). Then run `pnpm build:package` and update docs as needed.

## Code style

- **Components:** BEM-style class names; semantic HTML and ARIA where appropriate (see [docs/ACCESSIBILITY.md](docs/ACCESSIBILITY.md)).
- **CSS:** Use design system variables only (no hardcoded colors or spacing). No inline styles in components. Follow [docs/DESIGN_SYSTEM.md](docs/DESIGN_SYSTEM.md) and [docs/ACCESSIBILITY.md](docs/ACCESSIBILITY.md).
- **Accessibility:** WCAG 2.1 AA minimum; keyboard navigable; visible focus. Run `pnpm test:a11y` before submitting.

## Pull request process

1. **Branch** from `main` and make changes. Keep PRs focused (one feature or fix).
2. **Tests:** Ensure `pnpm build` and `pnpm test:a11y` pass.
3. **Docs:** Update [docs/](docs/) or component docs if you changed behavior or added options.
4. **Submit** the PR with a clear title and description. Link any related issue.
5. **Review:** Address feedback; maintainers will merge when ready.

## Issue templates

Use the [Bug report](.github/ISSUE_TEMPLATE/bug_report.md) or [Feature request](.github/ISSUE_TEMPLATE/feature_request.md) templates when opening an issue so we have the right context.

## Questions

- **Docs:** [GETTING_STARTED](docs/GETTING_STARTED.md), [CLI](docs/CLI.md), [DESIGN_SYSTEM](docs/DESIGN_SYSTEM.md), [ACCESSIBILITY](docs/ACCESSIBILITY.md).
- **Site:** https://rizzo-css.vercel.app
