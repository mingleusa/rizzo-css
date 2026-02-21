# Scaffolds: What Ships

**Internal planning.** For user-facing setup see [GETTING_STARTED](../GETTING_STARTED.md).

## What the package ships

The published **rizzo-css** package includes only these scaffolds (see `packages/rizzo-css/package.json` `"files"`):

- **scaffold/minimal/** — Minimal template entry: `index.html` with placeholders (`{{TITLE}}`, `{{DATA_THEME}}`, `{{THEME_LIST_COMMENT}}`, `{{LINK_HREF}}`). CLI does not write this file into the project; it is used as the source for the “Example minimal page” snippet in RIZZO-SETUP.md.
- **scaffold/starter/** — Starter template entry: same `index.html` as minimal. CLI reads it, applies replacements, and writes it as the project’s index (or public/static index for Astro/Svelte) only if missing; otherwise the content goes into RIZZO-SETUP.md as a snippet.
- **scaffold/vanilla/** — Full Vanilla HTML + CSS. Built by `copy-scaffold.js` (base + icons) and `prepare-vanilla-scaffold.js` (component showcase: `components/index.html`, `components/<slug>.html`). Includes `index.html`, `js/main.js`, `css/`, `icons/`, README-RIZZO.md, LICENSE-RIZZO, .gitignore. Used when template is **Full**.
- **scaffold/astro-core/** — Astro base app (config, one page, README-RIZZO.md, LICENSE-RIZZO, .gitignore, .env.example). Fonts go in `public/assets/fonts/` (CLI rewrites CSS URLs). Used when template is **Full**.
- **scaffold/svelte-core/** — SvelteKit base app (config, one page, README-RIZZO.md, LICENSE-RIZZO, .gitignore, .env.example). Used when template is **Full**.
- **scaffold/astro/** — 34 Astro component files (Button, Badge, Card, etc.) for copy into a project.
- **scaffold/utils/** — Theme utilities (`theme.ts`) used by ThemeSwitcher; ThemeSwitcher.astro imports `../utils/theme`. CLI copies this into the project as `src/components/utils/theme.ts` when adding ThemeSwitcher or ThemeIcon.
- **scaffold/svelte/** — 34 Svelte component files for copy into a project.

**CLI:** `npx rizzo-css init` | `add` | `theme` | `doctor` | `help`. Init → framework → add to existing or create new (same template choice: Minimal | Starter | Full). Create new → **Minimal**, **Starter**, or **Full** (Full picker has all 34 pre-selected). Add to existing → same template choice. `npx rizzo-css add` = same as add to existing.

## Build and publish

- **copy-scaffold.js** — Run from repo root. Copies `src/components/` (Astro) and `src/components/svelte/` (Svelte) into `packages/rizzo-css/scaffold/astro/` and `scaffold/svelte/`; writes `scaffold/utils/theme.ts` (from `src/utils/theme.ts`, import fixed to `../astro/themes`) for ThemeSwitcher; copies vanilla base and icons into `scaffold/vanilla/`.
- **prepare-vanilla-scaffold.js** — Run from repo root. Builds `scaffold/vanilla/components/` (index + per-component HTML) and updates vanilla `index.html` with hero + documentation cards (external links to docs site).

Both run in package `prepublishOnly` (with `lint:css:fix` and `build:css`). Root `pnpm build:package` runs `copy-scaffold` and `prepare:vanilla-scaffold` only. See [PUBLISHING](../PUBLISHING.md).

## Vanilla file layout (shipped)

```
scaffold/vanilla/
├── index.html
├── components/
│   ├── index.html
│   ├── accordion.html
│   ├── button.html
│   └── ...        # 34 component pages (navbar, settings, theme-switcher, button, etc.)
├── css/
├── js/
│   └── main.js
├── icons/
└── README-RIZZO.md
```

Astro and Svelte core scaffolds each have their own layout (see README-RIZZO.md in each scaffold folder). Component templates live in `scaffold/astro/` and `scaffold/svelte/` (no full-app layout; users add components to their own app).
