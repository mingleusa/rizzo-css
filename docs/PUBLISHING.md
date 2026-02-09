# Publishing the npm package

The **rizzo-css** npm package lives in `packages/rizzo-css/`. It contains the built CSS, a **CLI** (`npx rizzo-css init` / `add` / `theme`), and **scaffold** templates (Astro and Svelte components for the CLI component picker). Consumers can `npm install rizzo-css` and `import 'rizzo-css'`, or use a CDN (unpkg/jsDelivr) for plain HTML. Live package: [npmjs.com/package/rizzo-css](https://www.npmjs.com/package/rizzo-css). Docs site: [rizzo-css.vercel.app](https://rizzo-css.vercel.app).

## Versioning strategy

- **Semver:** Use [semantic versioning](https://semver.org/): `MAJOR.MINOR.PATCH`.
- **Patch** (`0.0.x`): Bug fixes, docs-only changes, non-breaking tweaks.
- **Minor** (`0.x.0`): New features, new themes, new components or utilities; no breaking changes to existing APIs or class names.
- **Major** (`x.0.0`): Breaking changes (e.g. renamed classes, removed or changed public APIs).
- Bump the version in `packages/rizzo-css/package.json` (and optionally root `package.json`) before publishing.

## Pre-publish checklist

Before pushing to GitHub and publishing to npm:

1. **Version** — Bump `version` in `packages/rizzo-css/package.json` (and root `package.json` if you keep them in sync). Use [semver](https://semver.org/): patch for fixes/docs, minor for new features.
2. **Build** — From repo root run `pnpm build:css` (and optionally `pnpm build`) to confirm the CSS and site build.
3. **Commit & push** — Commit all changes, then `git push` (or push to your default remote).
4. **Publish** — From repo root run `pnpm publish:package` (see Steps below).

## Prerequisites

- npm account (and logged in: `npm login`)
- Build the CSS at least once so `packages/rizzo-css/dist/rizzo.min.css` exists

## Steps

1. **Update version** (in both places if you keep them in sync):
   - `packages/rizzo-css/package.json` → `"version": "0.0.2"` (or semver of your choice)
   - Optionally `package.json` at repo root (for the docs site)

2. **Build and publish from repo root:**
   ```bash
   pnpm publish:package
   ```
   This runs `pnpm build:css`, then `cd packages/rizzo-css && npm publish`. The package’s `prepublishOnly` script runs `build:css` and `copy-scaffold.js` (fills `scaffold/` with Astro and Svelte templates) before the actual publish. Enter your npm OTP if prompted (2FA).

3. **Or publish manually:**
   ```bash
   pnpm build:css
   node scripts/copy-scaffold.js
   cd packages/rizzo-css
   npm publish
   ```
   (Or `npm publish --otp=XXXXXX` with your one-time password.)

4. **Repository URL** in `packages/rizzo-css/package.json` should point to your repo (e.g. `https://github.com/mingleusa/rizzo-css.git`) so the npm page links correctly. We publish a single unscoped package **rizzo-css** only (no scoped @ packages).

## What gets published

Only what’s listed in `packages/rizzo-css/package.json` under `"files"`:

- `dist/` (contains `rizzo.min.css`)
- `bin/` (CLI: `rizzo-css` → `bin/rizzo-css.js`)
- `scaffold/` (Svelte and Astro component templates for `npx rizzo-css init` component picker)
- `README.md`

Consumers get the CSS, the CLI, and the scaffold templates; they do not get the full repo (docs site, dev dependencies, or source beyond the scaffold).
