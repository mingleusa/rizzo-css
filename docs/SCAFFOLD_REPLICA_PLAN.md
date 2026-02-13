# Scaffolds: What Ships

**Internal planning.** For user-facing setup see [GETTING_STARTED](./GETTING_STARTED.md).

## What the package ships

The published **rizzo-css** package includes only these scaffolds (see `packages/rizzo-css/package.json` `"files"`):

- **scaffold/vanilla/** — Full or minimal Vanilla HTML + CSS. Built by `copy-scaffold.js` (base + icons) and `prepare-vanilla-scaffold.js` (component showcase: `components/index.html`, `components/<slug>.html`). Includes `index.html`, `js/main.js`, `css/`, `icons/`, README, LICENSE.
- **scaffold/astro-minimal/** — Minimal Astro app (config, one page, README, LICENSE, .env.example).
- **scaffold/svelte-minimal/** — Minimal SvelteKit app (config, one page, README, LICENSE, .env.example).
- **scaffold/astro/** — 25 Astro component files (Button, Badge, Card, etc.) for copy into a project.
- **scaffold/svelte/** — 25 Svelte component files for copy into a project.

**CLI:** `npx rizzo-css init` → framework → add to existing (CSS + hand-pick components) or create new. Create new → **Full**, **Minimal**, or **Manual** (per framework). `npx rizzo-css add` = same as add to existing.

## Build and publish

- **copy-scaffold.js** — Run from repo root. Copies `src/components/` (Astro) and `src/components/svelte/` (Svelte) into `packages/rizzo-css/scaffold/astro/` and `scaffold/svelte/`; copies vanilla base and icons into `scaffold/vanilla/`.
- **prepare-vanilla-scaffold.js** — Run from repo root. Builds `scaffold/vanilla/components/` (index + per-component HTML) and updates vanilla `index.html` with links to component showcase and docs.

Both run in package `prepublishOnly` (with `lint:css:fix` and `build:css`). Root `pnpm build:package` runs `copy-scaffold` and `prepare:vanilla-scaffold` only. See [PUBLISHING](./PUBLISHING.md).

## Vanilla file layout (shipped)

```
scaffold/vanilla/
├── index.html
├── components/
│   ├── index.html
│   ├── accordion.html
│   ├── button.html
│   └── ...        # 25 component pages (navbar, settings, theme-switcher, button, etc.)
├── css/
├── js/
│   └── main.js
├── icons/
└── README.md
```

Astro and Svelte minimal scaffolds each have their own layout (see their READMEs in the package). Component templates live in `scaffold/astro/` and `scaffold/svelte/` (no full-app layout; users add components to their own app).
