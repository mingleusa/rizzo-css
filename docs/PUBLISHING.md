# Publishing the npm package

The **rizzo-css** npm package lives in `packages/rizzo-css/`. It contains the built CSS, a **CLI** (`npx rizzo-css init` / `add` / `theme`), and **scaffolds**: **Vanilla JS** (`scaffold/vanilla/`), default **Astro** app (`scaffold/astro-app/`), default **Svelte** app (`scaffold/svelte-app/`), plus component picker (`scaffold/astro/`, `scaffold/svelte/` from `copy-scaffold.js`). Each scaffold folder has a README with setup and commands. Init first asks existing vs new project; all frameworks get the same CSS and component styles. Consumers can `npm install rizzo-css` and `import 'rizzo-css'`, or use a CDN (unpkg/jsDelivr) for plain HTML. Live package: [npmjs.com/package/rizzo-css](https://www.npmjs.com/package/rizzo-css). Docs site: [rizzo-css.vercel.app](https://rizzo-css.vercel.app).

## Features

- **NPM** — Package at `packages/rizzo-css/`; `pnpm build:css` produces `dist/rizzo.min.css`. Versioning strategy (semver, when to bump) is documented in [Versioning strategy](#versioning-strategy) below.
- **CDN** — unpkg and jsDelivr. The package sets `"unpkg": "dist/rizzo.min.css"` and `"jsdelivr": "dist/rizzo.min.css"`, so `https://unpkg.com/rizzo-css@latest` and `https://cdn.jsdelivr.net/npm/rizzo-css@latest` resolve to the CSS. For reliability or version pinning, use the explicit path: `https://unpkg.com/rizzo-css@0.0.11/dist/rizzo.min.css` and `https://cdn.jsdelivr.net/npm/rizzo-css@0.0.11/dist/rizzo.min.css`. **Verify after publish:** open the URL in a browser or run `curl -I <url>` and expect `200 OK`.
- **Single package** — One unscoped package **rizzo-css** (CSS, CLI, scaffold). Install with `pnpm add rizzo-css` and `import 'rizzo-css'`.
- **JavaScript utilities** — Theme, storage, clipboard, toast in `src/utils/`; documented in [GETTING_STARTED.md](./GETTING_STARTED.md#javascript-utilities).
- **Svelte components** — In `src/components/svelte/`; copy into your project. See [Multi-Framework Strategy](./MULTI_FRAMEWORK.md).
- **In-repo framework routes** — Svelte integrated in Astro; framework switcher; 24 Svelte component pages at `/docs/svelte`. React/Vue: same pattern when added. See [Framework Structure](./FRAMEWORK_STRUCTURE.md).
- **CLI** — `npx rizzo-css init` | `add` | `theme`. See [CLI Planning](./CLI_PLANNING.md).

## Keeping npm and GitHub in sync

**The npm package is a snapshot at publish time.** When you run `pnpm publish:package` (or `npm publish` from `packages/rizzo-css`), npm packs whatever is in that package **at that moment** — after `prepublishOnly` has run (`build:css` + `copy-scaffold.js`). Pushing to GitHub **after** you publish does **not** update the published package. The package only changes when you bump the version and run `npm publish` again.

So:

- **New files that appear right after you run publish** — During `pnpm publish:package`, npm runs `prepublishOnly` first (`build:css` + `copy-scaffold.js`). That script writes/overwrites `scaffold/astro/`, `scaffold/svelte/`, and `scaffold/vanilla/icons`. **Then** npm packs the directory and uploads. So those “new” files you see in the scaffold folder after the command finishes **were included in the tarball**. The published npm package is up to date with them. Your working tree now has those files on disk; if they’re not committed, GitHub won’t have them until you commit and push (so commit and push to keep the repo in sync with what’s on npm).
- **Changes you make after the publish command has finished** — Any edits or new files you add *after* `pnpm publish:package` completes are **not** in the tarball you just published. To get them on npm, bump the version and publish again.
- **Recommended order:** (1) Commit all source and scaffold changes. (2) Bump version. (3) Run `pnpm publish:package`. (4) Commit the scaffold/astro and scaffold/svelte (and vanilla/icons) updates that prepublishOnly wrote, then push. That way npm and GitHub both match the same release.

## Versioning strategy

- **Semver:** Use [semantic versioning](https://semver.org/): `MAJOR.MINOR.PATCH`.
- **Patch** (`0.0.x`): Bug fixes, docs-only changes, non-breaking tweaks.
- **Minor** (`0.x.0`): New features, new themes, new components or utilities; no breaking changes to existing APIs or class names.
- **Major** (`x.0.0`): Breaking changes (e.g. renamed classes, removed or changed public APIs).
- Bump the version in `packages/rizzo-css/package.json` (and optionally root `package.json`) before publishing.

## Pre-publish checklist

Before publishing to npm:

1. **Commit all changes** — Everything that should be in this release: `scaffold/vanilla/`, `scaffold/astro-app/`, `scaffold/svelte-app/`, `src/components/`, `src/components/svelte/`, CSS, CLI, docs. The pack step uses the repo state at publish time (see [Keeping npm and GitHub in sync](#keeping-npm-and-github-in-sync)).
2. **Version** — Bump `version` in `packages/rizzo-css/package.json` (and root `package.json` if you keep them in sync). Use [semver](https://semver.org/): patch for fixes/docs, minor for new features.
3. **Build** — From repo root run `pnpm build:css` (and optionally `pnpm build`) to confirm the CSS and site build.
4. **Publish** — From repo root run `pnpm publish:package` (see Steps below).
5. **Push** — `git push` (and `git push --tags` if you tag releases). This does not update npm; it keeps GitHub in sync with what you published.
6. **Verify CDN** *(optional)* — Confirm the new version is available: `curl -I https://unpkg.com/rizzo-css@<version>/dist/rizzo.min.css` and same for jsDelivr (expect `200 OK`).

## Prerequisites

- npm account (and logged in: `npm login`)
- Build the CSS at least once so `packages/rizzo-css/dist/rizzo.min.css` exists

## Steps

1. **Update version** (in both places if you keep them in sync):
   - `packages/rizzo-css/package.json` → `"version": "0.0.11"` (or next semver: patch/minor/major per [Versioning strategy](#versioning-strategy))
   - Optionally `package.json` at repo root (for the docs site)

2. **Build and publish from repo root:**
   ```bash
   pnpm publish:package
   ```
   This runs `pnpm build:css`, then `cd packages/rizzo-css && npm publish`. The package’s `prepublishOnly` script runs `build:css` and `copy-scaffold.js` (fills `scaffold/astro/` from repo Astro components; fills `scaffold/svelte/` from repo Svelte 5 components and icons in `src/components/svelte/`; `scaffold/vanilla/` is committed in the package) before the actual publish. Enter your npm OTP if prompted (2FA).

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
- `scaffold/` (vanilla example, astro-app, svelte-app, plus astro/ and svelte/ component templates for init)
- `README.md`

Consumers get the CSS, the CLI, and the scaffold templates; they do not get the full repo (docs site, dev dependencies, or source beyond the scaffold).
