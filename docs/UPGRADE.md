# Upgrade guide

How to upgrade between versions of Rizzo CSS and what to expect as we move toward 1.0.

## Upgrading within 0.0.x

- **Patch (0.0.x → 0.0.y):** Update the version in your `package.json` (or CDN pin). We do not introduce breaking changes in patch releases; you get fixes, docs updates, and non-breaking improvements.
- **npm / pnpm / yarn:** `pnpm update rizzo-css` (or `npm update rizzo-css` / `yarn up rizzo-css`) to move to the latest patch. To jump to a specific version: `pnpm add rizzo-css@<version>`.
- **CDN:** Change the version in the URL (e.g. `unpkg.com/rizzo-css@<version>/dist/rizzo.min.css`). See [GETTING_STARTED.md](./GETTING_STARTED.md).
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

Rizzo's published artifact (CSS + scaffolds) does not depend on its dev toolchain, but we keep the toolchain on **current, secure** versions. As of 0.0.89 the repo is on Astro 7, SvelteKit 3, Vite 8 (scaffolds), TypeScript 6, Storybook 10.6 and cssnano 9.

### Current state

- **Audit:** `pnpm audit` reports **1 high** (`braces`) and **1 moderate** (`sprintf-js`). Both have **no patched release** and are reachable only through dev tooling (stylelint, and the Jest chain of `@storybook/test-runner`); neither ships in the published package. The `braces` advisory is ignored by ID via `auditConfig.ignoreGhsas` in `pnpm-workspace.yaml` so the CI audit (`--audit-level=high`) stays meaningful for new advisories. Re-check after each `@storybook/test-runner` release and remove the ignore once a fix ships.
- **Overrides** (in `pnpm-workspace.yaml` `overrides`; pnpm 12 no longer reads `package.json` `pnpm.overrides`): force secure floors for `rollup`, `ajv`, `devalue`, `svgo`, `flatted`, `axios`, `qs`, and `uuid`.
- **Scaffolds:** Astro ^7, SvelteKit ^3, Vite ^8 and TypeScript ^6 (React/Vue/Svelte). Every framework x template combination is verified to install and build before release.

### Deferred major bumps

| Package | Current | Latest | Notes |
|---|---|---|---|
| **typescript** | `^6.0.x` | `7.x` | Blocked: `svelte-check`, `@astrojs/svelte` and SvelteKit 3 only support TypeScript <= 6, and `vue-tsc` fails on 7. |

When you do a major bump, also bump the matching scaffold `package.json` (`packages/rizzo-css/scaffold/<framework>/...`) so newly scaffolded projects use the new versions.
