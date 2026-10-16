# Publishing the npm package

The **rizzo-css** package (`packages/rizzo-css/`) ships built CSS, CLI (`init` / `add` / `theme` / `doctor` / `help`), and scaffolds (vanilla; astro, svelte, react, vue base + variants + components). Init: framework → existing or new; templates **CSS only** | **Landing** | **Docs** | **Dashboard** | **Full**. [npm](https://www.npmjs.com/package/rizzo-css) · [Docs](https://rizzo-css.vercel.app).

## Features

- **NPM** — Package at `packages/rizzo-css/`; `pnpm build:css` → `dist/rizzo.min.css`. [Versioning strategy](#versioning-strategy) below.
- **CDN** — unpkg and jsDelivr; root URL serves CSS. Pin: `.../rizzo-css@<version>/dist/rizzo.min.css`. Verify: `curl -I <url>` (200).
- **Package contents** — Tarball includes `dist/`, `README.md`, `LICENSE`, `.env.example`, `bin/`, and under `scaffold/`: `landing/`, `minimal/`, `astro/`, `config/`, `shared/`, `svelte/`, `react/`, `vue/`, `utils/`, `vanilla/`. PrepublishOnly: `lint:css:fix`, `build:css`, `copy-scaffold.js`, `prepare-vanilla-scaffold.js`.
- **Single package** — One **rizzo-css** (CSS, CLI, scaffolds). Templates: **CSS only** | **Landing** | **Docs** | **Dashboard** | **Full** (CSS only = no components; Full = site clone; others = all 58 or pick).
- **Pre-publish** — [Pre-publish checklist](#pre-publish-checklist): version bump, build, publish, push, CDN verify.
- **CLI / Svelte / framework** — [MULTI_FRAMEWORK](./MULTI_FRAMEWORK.md); [FRAMEWORK_STRUCTURE](./FRAMEWORK_STRUCTURE.md); [GETTING_STARTED – JS utilities](./GETTING_STARTED.md#javascript-utilities).

## Keeping npm and GitHub in sync

**The npm package is a snapshot at publish time.** When you run `pnpm publish:package` (or `npm publish` from `packages/rizzo-css`), npm packs whatever is in that package **at that moment** — after `prepublishOnly` has run (`lint:css:fix`, `build:css`, `copy-scaffold.js`, `prepare-vanilla-scaffold.js`). Pushing to GitHub **after** you publish does **not** update the published package. The package only changes when you bump the version and run `npm publish` again.

So:

- **New files that appear right after you run publish** — During `pnpm publish:package`, npm runs `prepublishOnly` first: `build:css`, then `copy-scaffold.js` (writes `scaffold/astro/`, `scaffold/utils/` (theme for ThemeSwitcher), `scaffold/svelte/`, `scaffold/vanilla/icons`), then `prepare-vanilla-scaffold.js` (populates `scaffold/vanilla/components/`). **Then** npm packs only the listed `files`: scaffold/landing, scaffold/minimal, scaffold/astro, scaffold/config, scaffold/shared, scaffold/svelte, scaffold/utils, scaffold/vanilla. So those “new” files you see in the scaffold folder after the command finishes **were included in the tarball**. The published npm package is up to date with them. Your working tree now has those files on disk; if they’re not committed, GitHub won’t have them until you commit and push (so commit and push to keep the repo in sync with what’s on npm).
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

1. **Commit everything for the release** — `scaffold/`, `src/components/`, CSS, CLI, docs and site. Pack uses repo state at publish time (see [Keeping npm and GitHub in sync](#keeping-npm-and-github-in-sync)).
2. **Docs and README match the code** — Run `pnpm readme:tech` (regenerates the README tech badges and stack table from the installed versions; `pnpm readme:tech --check` verifies). Update `CHANGELOG.md`. Check that counts and behaviour described in `docs/*.md`, `README.md`, `CONTRIBUTING.md` and `packages/rizzo-css/README.md` are still true (58 components, 6 blocks, 14 themes, the five templates, CLI flags). Run `pnpm build` and `pnpm test:a11y`.
3. **Version** — Use [semver](https://semver.org/) (patch for fixes/docs, minor for features). Bump `version` in `packages/rizzo-css/package.json` **and** the root `package.json`. Other files carry the version too: `ai/llms.json`, `ai/README.md`, `public/llms.txt`, `public/tokens/rizzo-tokens.*` (rewritten by `pnpm build`) and the `rizzo-css` dependency in the React and Vue scaffold `package.json` files. Find them all with `grep -rl "<old-version>" --include=*.json --include=*.md --include=*.txt . | grep -v node_modules`. The README npm badge is read live from the registry, so it needs no edit.
4. **Build** — `pnpm build:package` (lint, CSS, copy scaffolds, prepare the Vanilla scaffold) and `pnpm build` must pass.
5. **Bundle size** — `pnpm check:size`; the package CSS must stay under the 450 kB budget ([CONTRIBUTING – Bundle size](../CONTRIBUTING.md#bundle-size)).
6. **Dependency audit** — `pnpm audit --audit-level=high` must pass. Advisories we knowingly accept are listed (with the reason) under `auditConfig.ignoreGhsas` in `pnpm-workspace.yaml`; see [UPGRADE.md](./UPGRADE.md#dependency-upgrade-roadmap).
7. **Inspect the tarball** — `cd packages/rizzo-css && npm pack --dry-run`. Expect roughly 700 files / 3.8 MB and **no** `node_modules/`, `.svelte-kit/`, `.astro/` or build `dist/` folders inside `scaffold/` (the `files` list excludes them with negated patterns; if one appears, delete the folder and fix the pattern). Only the top-level `dist/` (CSS, fonts, sounds) belongs in the package.
8. **Smoke-test the scaffolds** — Generated projects must build for every framework. `pnpm test:vue-scaffold` already covers Vue end to end (it also runs in CI); do the rest by hand. For each of `astro svelte react vue` and the templates you changed (always `css-only` and `full`):

   ```bash
   node packages/rizzo-css/bin/rizzo-css.js init --yes --path /tmp/t/$fw-$tpl --framework $fw --template $tpl --package-manager pnpm --no-install --no-git
   (cd /tmp/t/$fw-$tpl && pnpm install --ignore-workspace && pnpm build)   # judge by exit code, not by grepping output
   ```

9. **Publish** — See [Steps](#steps).
10. **Push** — `git push` (and `git push --tags` if you tag releases). This does not update npm; it keeps GitHub in sync with what you published. Pushing triggers CI ([TESTING – CI](./TESTING.md#6-continuous-integration)).
11. **Verify** — Once the version appears (`npm view rizzo-css version`), check the CDNs (`curl -I https://cdn.jsdelivr.net/npm/rizzo-css@<version>/dist/rizzo.min.css` and the unpkg equivalent; expect `200`, unpkg can lag a few minutes) and smoke-test the **published** CLI: `npx rizzo-css@<version> init --yes --path /tmp/t --framework svelte --template full --no-install --no-git`, then install and build it.

## Prerequisites

- npm account with 2FA, and logged in (`npm login`)
- Node 22.22.3+ (or 24.15+) to run the repo build steps
- The CSS built at least once so `packages/rizzo-css/dist/rizzo.min.css` exists (the `prepublishOnly` hook does this)

## Steps

1. **Update the version** as described in the checklist above.

2. **Publish from the repo root:**
   ```bash
   pnpm publish:package
   ```
   This runs `cd packages/rizzo-css && npm publish`. The package's `prepublishOnly` hook runs first (from the repo root: lint, `build:css`, `copy-scaffold`, `prepare-vanilla-scaffold`), so the tarball always comes from a clean pipeline.

3. **2FA:** npm asks for a one-time password. If the command fails with `EOTP` (common in non-interactive terminals, and a plain `npm login` does not satisfy it), publish from the package directory with your authenticator code:
   ```bash
   cd packages/rizzo-css && npm publish --otp=123456
   ```
   `prepublishOnly` still runs first. If a prompt hangs, see [Troubleshooting](#troubleshooting).

4. **Wait for npm's automated review.** A new version can show as "Validating: Automated review hasn't finished" and stays unavailable (`npm view` returns 404, CDNs 404) until the review completes. Nothing to do but wait; then run the verification step above.

5. **Repository URL** in `packages/rizzo-css/package.json` should point to your repo (`https://github.com/mingleusa/rizzo-css.git`) so the npm page links correctly. We publish a single unscoped package, **rizzo-css**; there are no scoped `@` packages.

## What gets published

Only what’s listed in `packages/rizzo-css/package.json` under `"files"`:

- `dist/` (contains `rizzo.min.css`, `fonts/`, and `sfx/` when built — `pnpm build:css` populates all three)
- `bin/` (CLI: `rizzo-css` → `bin/rizzo-css.js`)
- `scaffold/landing`, `scaffold/minimal`, `scaffold/astro`, `scaffold/config`, `scaffold/utils`, `scaffold/svelte`, `scaffold/react`, `scaffold/vue`, `scaffold/vanilla`, `scaffold/shared`
- `README.md`
- `LICENSE` (MIT)
- `.env.example` (optional; for projects that add search, e.g. Algolia)

Generated folders under `scaffold/` (`node_modules`, `dist`, `.astro`, `.svelte-kit`) are excluded with negated patterns in `files`, so a local build or dev run inside a scaffold cannot leak into the tarball.

Consumers get the CSS, the CLI, and the scaffold templates; they do not get the full repo (docs site, dev dependencies, or source beyond the scaffold). The package declares `"engines": { "node": ">=18" }` so npm warns on older Node; the CLI and scripts require Node 18+.

**Package managers:** The package can be installed with **npm**, **pnpm**, **yarn**, or **bun**. The CLI detects the project’s manager (lockfiles or `package.json` `packageManager`) and prints the correct install/run commands. The docs site [Getting Started](https://rizzo-css.vercel.app/docs/getting-started) shows tabs for each manager (npx, pnpm dlx, npx for yarn, bunx).

## Troubleshooting

### "Press Enter" or credential verification stuck

If `npm login` or `npm publish` hangs at "Press ENTER to open the browser" or similar, the terminal may not be handling interactive input (common in Cursor's integrated terminal or some CI environments).

**Options:**

1. **Use a system terminal** — Run `npm login` and/or `pnpm publish:package` in a normal terminal (e.g. Terminal.app, Windows Terminal, GNOME Terminal), then press Enter when prompted. After logging in once, you can usually publish from Cursor again.

2. **Use an auth token (no interactive prompts)** — On [npmjs.com](https://www.npmjs.com): Account → **Access Tokens** → **Generate New Token** (classic or granular). Copy the token, then add to `~/.npmrc` (or project `.npmrc`):
   ```ini
   //registry.npmjs.org/:_authToken=npm_xxxxxxxx
   ```
   After that, `npm publish` and `npm whoami` use the token and won't ask for Enter or browser login.

3. **2FA / OTP** — If you use two-factor auth, avoid the interactive OTP prompt by passing the code on the command line:
   ```bash
   npm publish --otp=123456
   ```
   Or from repo root: `cd packages/rizzo-css && npm publish --otp=123456` (or use `pnpm publish:package` and set the OTP in an env var if your workflow supports it).
