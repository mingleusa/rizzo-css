# Publishing the npm package

The **rizzo-css** package (`packages/rizzo-css/`) ships built CSS, CLI (`init` / `add` / `theme`), and scaffolds (vanilla, astro-minimal, svelte-minimal, plus astro/ and svelte/ component templates). Init: framework → existing (CSS + hand-pick) or new (template or no template + hand-pick). [npm](https://www.npmjs.com/package/rizzo-css) · [Docs](https://rizzo-css.vercel.app).

## Features

- **NPM** — Package at `packages/rizzo-css/`; `pnpm build:css` → `dist/rizzo.min.css`. [Versioning strategy](#versioning-strategy) below.
- **CDN** — unpkg and jsDelivr; root URL serves CSS. Pin: `.../rizzo-css@0.0.23/dist/rizzo.min.css`. Verify: `curl -I <url>` (200).
- **Package contents** — Tarball includes `dist/`, `README.md`, `LICENSE`, `.env.example`, `bin/`, and under `scaffold/`: `astro/`, `svelte/`, `vanilla/`, `astro-minimal/`, `svelte-minimal/`). PrepublishOnly runs (from repo root): `lint:css:fix`, `build:css`, `copy-scaffold.js`, `prepare-vanilla-scaffold.js`.
- **Single package** — One **rizzo-css** (CSS, CLI, scaffolds). Create new = **Full**, **Minimal**, or **Manual** (per framework); Add to existing = CSS + hand-pick components.
- **Pre-publish** — [Pre-publish checklist](#pre-publish-checklist): version bump, build, publish, push, CDN verify.
- **CLI / Svelte / framework** — [CLI Planning](./CLI_PLANNING.md); [MULTI_FRAMEWORK](./MULTI_FRAMEWORK.md); [FRAMEWORK_STRUCTURE](./FRAMEWORK_STRUCTURE.md); [GETTING_STARTED – JS utilities](./GETTING_STARTED.md#javascript-utilities).

## Keeping npm and GitHub in sync

**The npm package is a snapshot at publish time.** When you run `pnpm publish:package` (or `npm publish` from `packages/rizzo-css`), npm packs whatever is in that package **at that moment** — after `prepublishOnly` has run (`lint:css:fix`, `build:css`, `copy-scaffold.js`, `prepare-vanilla-scaffold.js`). Pushing to GitHub **after** you publish does **not** update the published package. The package only changes when you bump the version and run `npm publish` again.

So:

- **New files that appear right after you run publish** — During `pnpm publish:package`, npm runs `prepublishOnly` first: `build:css`, then `copy-scaffold.js` (writes `scaffold/astro/`, `scaffold/svelte/`, `scaffold/vanilla/icons`), then `prepare-vanilla-scaffold.js` (populates `scaffold/vanilla/components/`). **Then** npm packs only the listed `files`: scaffold/astro, svelte, vanilla, astro-minimal, svelte-minimal. So those “new” files you see in the scaffold folder after the command finishes **were included in the tarball**. The published npm package is up to date with them. Your working tree now has those files on disk; if they’re not committed, GitHub won’t have them until you commit and push (so commit and push to keep the repo in sync with what’s on npm).
- **Changes you make after the publish command has finished** — Any edits or new files you add *after* `pnpm publish:package` completes are **not** in the tarball you just published. To get them on npm, bump the version and publish again.
- **Recommended order:** (1) Commit all source and scaffold changes. (2) Bump version. (3) Run `pnpm publish:package`. (4) Commit any scaffold updates that prepublishOnly wrote, then push.

## Versioning strategy

- **Semver:** Use [semantic versioning](https://semver.org/): `MAJOR.MINOR.PATCH`.
- **Patch** (`0.0.x`): Bug fixes, docs-only changes, non-breaking tweaks.
- **Minor** (`0.x.0`): New features, new themes, new components or utilities; no breaking changes to existing APIs or class names.
- **Major** (`x.0.0`): Breaking changes (e.g. renamed classes, removed or changed public APIs).
- Bump the version in `packages/rizzo-css/package.json` (and optionally root `package.json`) before publishing.

## Pre-publish checklist

Before publishing to npm:

1. **Commit all changes** — Everything that should be in this release: `scaffold/vanilla/`, `scaffold/astro-minimal/`, `scaffold/svelte-minimal/`, `scaffold/astro/`, `scaffold/svelte/`, `src/components/`, `src/components/svelte/`, CSS, CLI, docs. The pack step uses the repo state at publish time (see [Keeping npm and GitHub in sync](#keeping-npm-and-github-in-sync)).
2. **Version** — Bump `version` in `packages/rizzo-css/package.json` (and root `package.json` if you keep them in sync). Update the npm badge in the main `README.md` so the version in the badge matches (e.g. `badge/npm-0.0.23-CB3837`). Use [semver](https://semver.org/): patch for fixes/docs, minor for new features.
3. **Build** — From repo root run `pnpm build:css` (and optionally `pnpm build`) to confirm the CSS and site build.
4. **Publish** — From repo root run `pnpm publish:package` (see Steps below).
5. **Push** — `git push` (and `git push --tags` if you tag releases). This does not update npm; it keeps GitHub in sync with what you published.
6. **Verify CDN** *(optional)* — Confirm the new version is available: `curl -I https://unpkg.com/rizzo-css@<version>/dist/rizzo.min.css` and same for jsDelivr (expect `200 OK`).

## Prerequisites

- npm account (and logged in: `npm login`)
- Build the CSS at least once so `packages/rizzo-css/dist/rizzo.min.css` exists

## Steps

1. **Update version** (in both places if you keep them in sync):
   - `packages/rizzo-css/package.json` → `"version": "0.0.23"` (or next semver: patch/minor/major per [Versioning strategy](#versioning-strategy))
   - Optionally `package.json` at repo root (for the docs site)
   - Main `README.md` — update the npm badge so the version in the URL matches (e.g. `badge/npm-0.0.23-CB3837`)

2. **Build and publish from repo root:**
   ```bash
   pnpm publish:package
   ```
   This runs `pnpm build:package` (lint, build CSS, copy scaffold, run all prepare-* scripts), then `cd packages/rizzo-css && npm publish`. The package’s `prepublishOnly` also runs the same pipeline (lint, build:css, copy-scaffold, prepare-*) so even a direct `npm publish` from the package directory ships linted, up-to-date assets. Enter your npm OTP if prompted (2FA).

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
- `scaffold/astro`, `scaffold/svelte`, `scaffold/vanilla`, `scaffold/astro-minimal`, `scaffold/svelte-minimal`
- `README.md`
- `LICENSE` (MIT)
- `.env.example` (optional; for projects that add search, e.g. Algolia)

Consumers get the CSS, the CLI, and the scaffold templates; they do not get the full repo (docs site, dev dependencies, or source beyond the scaffold).
