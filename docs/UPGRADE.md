# Upgrade guide

How to upgrade between versions of Rizzo CSS and what to expect as we move toward 1.0.

## Upgrading within 0.0.x

- **Patch (0.0.x → 0.0.y):** Update the version in your `package.json` (or CDN pin). We do not introduce breaking changes in patch releases; you get fixes, docs updates, and non-breaking improvements.
- **npm / pnpm / yarn:** `pnpm update rizzo-css` (or `npm update rizzo-css` / `yarn up rizzo-css`) to move to the latest patch. To jump to a specific version: `pnpm add rizzo-css@0.0.87`.
- **CDN:** Change the version in the URL (e.g. `unpkg.com/rizzo-css@0.0.87/dist/rizzo.min.css`). See [GETTING_STARTED.md](./GETTING_STARTED.md).
- **Scaffolds:** If you used the CLI to scaffold, re-run `npx rizzo-css add` with the new version to pull updated snippets; the CLI does not overwrite your existing files by default (see RIZZO-SETUP.md for any new snippets).
- **Breaking changes:** We avoid them in 0.0.x. If we ever need one, it will be announced in [CHANGELOG.md](../CHANGELOG.md) with migration steps.

## Pre-1.0 checklist (for maintainers)

Before releasing 1.0 we aim to:

- Stabilize the public API: BEM class names and public CSS custom properties (theme tokens) without breaking renames.
- Document any deprecation policy (e.g. one minor version support for deprecated classes/variables before removal).
- Have a clear [stability and versioning](MAINTAINING.md#stability-and-versioning) note for consumers.

See [MAINTAINING.md – Stability and versioning](./MAINTAINING.md#stability-and-versioning) and [TODO.md – Tasks by impact](./TODO.md#tasks-by-impact).

## After 1.0

- **Minor (1.x.0):** New features; no breaking changes to existing class names or theme variables.
- **Major (x.0.0):** Reserved for breaking changes; we will document migrations in the CHANGELOG and this guide.

## Dependency upgrade roadmap

Rizzo's published artifact (CSS + scaffolds) does not depend on its dev toolchain, but we keep the toolchain on **stable, secure** versions. The repo is currently on the **last stable line of each major** (Astro 5, TypeScript 5, Vite 7, Storybook 10, etc.) so consumers and contributors don't hit ecosystem instability.

### Current state

- **Audit:** `pnpm audit` reports **0 high**, **1 moderate**, **1 low** — both are **astro 5.x** advisories patched only in **astro 6.x**. Impact for our static site is minimal (`define:vars` XSS and server-island param replay only affect runtime SSR features we don't use). Fixed by the major bump below.
- **Overrides** (in root `package.json` `pnpm.overrides`): force secure floors for `rollup`, `ajv`, `cookie`, `devalue`, `svgo`, `flatted`, `axios`, `qs`, and `uuid`. These resolve transitive advisories without major bumps.
- **Stray deps removed:** `fs`, `path`, `postcss-js` are no longer listed (Node has built-ins; postcss-js was unused).

### Deferred major bumps

These require code/config changes; tackle one at a time and run the full test suite (`pnpm build`, `pnpm test:smoke`, `pnpm test:a11y`, `pnpm test:storybook`) after each.

| Package | Current | Latest | Notes |
|---|---|---|---|
| **astro** | `^5.18.x` | `6.x` | Closes 2 remaining advisories. Check `astro.config.mjs`, content collections, `define:vars`. |
| **@astrojs/react** | `^4.x` | `5.x` | Bump with astro 6. |
| **@astrojs/svelte** | `^7.x` | `8.x` | Bump with astro 6. |
| **@astrojs/vue** | `^5.x` | `6.x` | Bump with astro 6. |
| **@sveltejs/vite-plugin-svelte** | `^6.x` | `7.x` | Pair with the next svelte 5 minor. |
| **typescript** | `^5.9.x` | `6.x` | Watch for stricter `no-implicit-any` and lib changes; rerun `tsc -b`. |
| **cssnano** | `^7.x` | `8.x` | Verify minified CSS via `pnpm check:size` and visual diff. |
| **lint-staged** | `^15.x` | `17.x` | Husky 9 already aligned; check pre-commit hook. |
| **concurrently** | `^9.x` | `10.x` | Used by `test:storybook`; verify the script still chains correctly. |
| **wait-on** | `^8.x` | `9.x` | Same script; usually drop-in. |

When you do a major bump, also bump the matching scaffold `package.json` (`packages/rizzo-css/scaffold/<framework>/...`) so newly scaffolded projects use the new versions.
