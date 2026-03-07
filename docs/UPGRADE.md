# Upgrade guide

How to upgrade between versions of Rizzo CSS and what to expect as we move toward 1.0.

## Upgrading within 0.0.x

- **Patch (0.0.x → 0.0.y):** Update the version in your `package.json` (or CDN pin). We do not introduce breaking changes in patch releases; you get fixes, docs updates, and non-breaking improvements.
- **npm / pnpm / yarn:** `pnpm update rizzo-css` (or `npm update rizzo-css` / `yarn up rizzo-css`) to move to the latest patch. To jump to a specific version: `pnpm add rizzo-css@0.0.74`.
- **CDN:** Change the version in the URL (e.g. `unpkg.com/rizzo-css@0.0.74/dist/rizzo.min.css`). See [GETTING_STARTED.md](./GETTING_STARTED.md).
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
