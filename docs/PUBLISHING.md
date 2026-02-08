# Publishing the npm package

The **rizzo-css** npm package lives in `packages/rizzo-css/`. It contains only the built CSS and a README so consumers can `npm install rizzo-css` and import the styles.

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
   This runs `pnpm build:css` (writes CSS to `public/css/main.min.css` and `packages/rizzo-css/dist/rizzo.min.css`), then runs `pnpm --filter rizzo-css publish`.

3. **Or publish manually:**
   ```bash
   pnpm build:css
   cd packages/rizzo-css
   npm publish
   ```

4. **First-time publish:** If the package name `rizzo-css` is taken on npm, use a scoped name in `packages/rizzo-css/package.json`, e.g. `"name": "@your-username/rizzo-css"`. Then users install with `npm install @your-username/rizzo-css`.

5. **Repository URL:** In `packages/rizzo-css/package.json`, set `repository.url` to your real repo URL before publishing so npm and GitHub link correctly.

## What gets published

Only what’s listed in `packages/rizzo-css/package.json` under `"files"`:

- `dist/` (contains `rizzo.min.css`)
- `README.md`

Consumers get no Astro/Svelte source, no docs site, and no dev dependencies—just the built CSS and the package README.
