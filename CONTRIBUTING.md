# Contributing to Rizzo CSS

Thanks for your interest in contributing. This doc covers how to run the project, where to add or change code, code style, and the PR process.

**Community features:** This repo provides a contributing guide (this doc), [GitHub issue templates](.github/ISSUE_TEMPLATE/) (bug report, feature request, question), a [PR template](.github/PULL_REQUEST_TEMPLATE.md), and branch protection for `main`. Repo admins: see [.github/MANUAL_SETUP_STEPS.md](.github/MANUAL_SETUP_STEPS.md) for setup.

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
- **Docs content:** `src/pages/docs/` (site pages), `docs/` (markdown; index in [docs/README.md](docs/README.md)).

When adding a new component, add it to the Astro scaffold list in `scripts/copy-scaffold.js` (`ASTRO_SCAFFOLD`) and to the CLI component lists in `packages/rizzo-css/bin/rizzo-css.js` (`SVELTE_COMPONENTS`, `ASTRO_COMPONENTS`, `VANILLA_COMPONENT_SLUGS` if it has a vanilla slug). Then run `pnpm build:package` and update docs as needed.

**Adding a new icon:** Create a component for each framework and add it to every framework’s icons docs page with the same copy-to-clipboard behavior. (1) **Astro:** Add `src/components/icons/` or `src/components/icons/devicons/YourIcon.astro`. (2) **Svelte:** Add `src/components/svelte/icons/` or `src/components/svelte/icons/devicons/YourIcon.svelte` (same SVG, Svelte 5 `$props()` for width/height/class). (3) **Vanilla:** Run `pnpm build:package` (or `node scripts/copy-scaffold.js`); the script extracts SVG from Astro icons into `packages/rizzo-css/scaffold/vanilla/icons/`. (4) **Icons docs:** Add the icon to the devicons (or regularIcons) array and import on all three icons pages: `src/pages/docs/components/icons.astro` (Astro), `src/pages/docs/vanilla/components/icons.astro` (Vanilla), and `src/components/svelte/docs/pages/IconsDoc.svelte` (Svelte). Each entry needs `name`, `component`, and `svg` (full SVG string for copy-to-clipboard). Keep the same copy-to-clipboard behavior and card layout on all three pages. For devicons with dark fills (e.g. Rust, Playwright, Docker), add `devicon devicon--<name>` and `devicon__path` / `devicon__path--dark` plus CSS overrides in `src/styles/components.css` so they use `var(--icon)` on dark themes. Usage tabs (FrameworkCodeTabs) use existing icon components (Astro, Svelte, Javascript for Vanilla). **Public icons:** `pnpm build:css` extracts all Astro icons to `public/icons/` (e.g. `/icons/Gear.svg`, `/icons/devicons/Npm.svg`) so the docs site and URL-based icon references use the same set.

## Code style

- **Components:** BEM-style class names; semantic HTML and ARIA where appropriate (see [docs/ACCESSIBILITY.md](docs/ACCESSIBILITY.md)).
- **CSS:** Use design system variables only (no hardcoded colors or spacing). No inline styles in components. Follow [docs/DESIGN_SYSTEM.md](docs/DESIGN_SYSTEM.md) and [docs/ACCESSIBILITY.md](docs/ACCESSIBILITY.md).
- **Accessibility:** WCAG 2.1 AA minimum; keyboard navigable; visible focus. Run `pnpm test:a11y` before submitting.

## Pull request process

1. **Branch** from `main` and make changes. Keep PRs focused (one feature or fix).
2. **Tests:** Ensure `pnpm build` and `pnpm test:a11y` pass.
3. **Docs:** Update [docs/](docs/) (see [docs/README.md](docs/README.md) for doc index) or component docs if you changed behavior or added options.
4. **Submit** the PR with a clear title and description. Link any related issue. The [PR template](.github/PULL_REQUEST_TEMPLATE.md) (build, a11y, docs checklist) is applied automatically.
5. **Review:** Address feedback; maintainers will merge when ready.

**Branch protection:** The `main` branch is protected. All changes are merged via pull request; direct pushes and force pushes to `main` are disabled. Repo admins: see [.github/MANUAL_SETUP_STEPS.md](.github/MANUAL_SETUP_STEPS.md) for configuring default branch and branch protection.

## Issues and templates

When opening an issue, use one of the templates so we have the right context:

- **[Bug report](.github/ISSUE_TEMPLATE/bug_report.md)** — Something isn’t working.
- **[Feature request](.github/ISSUE_TEMPLATE/feature_request.md)** — New feature or improvement.
- **[Question / discussion](.github/ISSUE_TEMPLATE/question.md)** — Ask a question or start a discussion.

You can also open a blank issue or use the contact links on the New issue page (docs, Discussions) if enabled.

## Questions

- **Docs:** [docs/README.md](docs/README.md) (index), [GETTING_STARTED](docs/GETTING_STARTED.md), [CLI](docs/CLI.md), [DESIGN_SYSTEM](docs/DESIGN_SYSTEM.md), [ACCESSIBILITY](docs/ACCESSIBILITY.md).
- **Site:** https://rizzo-css.vercel.app
