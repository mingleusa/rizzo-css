# rizzo-css

A modern CSS design system with semantic theming, 14 built-in themes, and accessible components (BEM). **The same CSS and component styles** ship for every option: **Vanilla JS**, Astro, and Svelte. Framework-agnostic: use with any stack or plain HTML.

## Install

```bash
npm install rizzo-css
# or
pnpm add rizzo-css
# or
yarn add rizzo-css
```

**Quick start (no install):** `npx rizzo-css init` — choose **framework** (Vanilla, Astro, or Svelte), then **add to existing** or **create new**. Both flows use the **same template choice**: **Minimal** (CSS + **RIZZO-SETUP.md** only; no overwrites), **Starter** (same + minimal index/layout only if missing), or **Full** (full app + 34 components or pick). We **never overwrite your existing files**; any skipped content is in **RIZZO-SETUP.md**. You must add the `<link>` yourself (CLI prints the exact tag). Non-interactive: `npx rizzo-css init --yes --framework vanilla|astro|svelte --template minimal|starter|full` or `npx rizzo-css add --template minimal|starter|full`. Optional **rizzo-css.json** and `add --install-package`. All get the **same CSS and component styles**. To use the **official Svelte or Astro create command** plus Rizzo, create the app first, then run `npx rizzo-css add`:

```bash
npm create svelte@latest my-app && cd my-app && npx rizzo-css add
npm create astro@latest my-app   && cd my-app && npx rizzo-css add
```

**Running the CLI:** npm → `npx`; pnpm → `pnpm dlx`; yarn → `npx` (Yarn 1 has no `dlx`; works with Yarn 2+ too); bun → `bunx`. The [docs site](https://rizzo-css.vercel.app/docs/getting-started) tabs show the correct command for each manager.

**Same flow for new and existing:** Both prompt for **Minimal** | **Starter** | **Full**. Minimal/Starter = CSS, fonts, icons, sfx + RIZZO-SETUP.md. Full = same assets + component picker (all 34 or pick); also writes **RIZZO-SNIPPET.txt** (link + theme) unless `--no-snippet`. `npx rizzo-css doctor` checks config and CSS path. `npx rizzo-css theme` lists themes.

| | **Create new** (`init` → new) | **Add to existing** (`add` or `init` → existing) |
|---|------------------------------|--------------------------------------------------|
| Template | **Minimal** \| **Starter** \| **Full** (same for both) | **Minimal** \| **Starter** \| **Full** (same for both) |
| Writes | CSS, fonts, icons, sfx, RIZZO-SETUP.md; Full = + components, RIZZO-SNIPPET.txt; config, LICENSE-RIZZO, README-RIZZO, .gitignore | Same assets per template; Full = + components + RIZZO-SNIPPET.txt; config |
| Overwrites | **Never** — snippets in RIZZO-SETUP.md | **Never** — snippets in RIZZO-SETUP.md; CLI prints the link tag |

## One package, any framework

You install **the same package** for every framework: `npm install rizzo-css`. No separate `rizzo-css-astro` or `rizzo-css-svelte` packages.

| Framework | Install | Use the CSS | Optional |
|-----------|--------|-------------|----------|
| **Vanilla** | `npm install rizzo-css` or CDN | Link `node_modules/rizzo-css/dist/rizzo.min.css` or use CDN (see below) | None; write HTML with the same BEM classes as the docs |
| **Astro** | `npm install rizzo-css` | `import 'rizzo-css'` in layout or link from `public/` | Copy components from `node_modules/rizzo-css/scaffold/astro/` or use `npx rizzo-css add` with components |
| **Svelte** | `npm install rizzo-css` | `import 'rizzo-css'` in root layout or link from `static/` | Copy components from `node_modules/rizzo-css/scaffold/svelte/` or use `npx rizzo-css add` with components |

**CSS paths (CLI and scaffolds):**

| Framework | Where the CLI copies CSS | `<link href="...">` in your HTML/layout |
|-----------|-------------------------|----------------------------------------|
| **Vanilla** | `css/rizzo.min.css` (project root) | `css/rizzo.min.css` (relative) |
| **Astro** | `public/css/rizzo.min.css` | `/css/rizzo.min.css` (Astro serves `public/` at `/`) |
| **Svelte** | `static/css/rizzo.min.css` | `/css/rizzo.min.css` (SvelteKit serves `static/` at `/`) |

With `npx rizzo-css add --path <dir>`, the CLI still suggests the correct href for your framework (e.g. Astro/Svelte get a leading `/` path).

Scaffolds in the package: `scaffold/vanilla/`, `scaffold/astro-core/`, `scaffold/svelte-core/`, plus `scaffold/astro/` and `scaffold/svelte/` (34 components), and `scaffold/config/` (font pairs for Settings). **New and existing use the same flow:** choose **Minimal**, **Starter**, or **Full**. Minimal/Starter = CSS, fonts, icons, sfx + RIZZO-SETUP.md. Full = same + component picker (all 34 or pick). **We never overwrite your existing files**; skipped content goes in **RIZZO-SETUP.md**. You must add the stylesheet `<link>` yourself (CLI prints the exact tag). Every scaffold includes LICENSE-RIZZO, README-RIZZO.md, and .gitignore; Astro/Svelte include package.json and .env.example.

## Use

Import or link the CSS **once** in your app (e.g. root layout or main entry).

**With a bundler (Vite, Astro, webpack, etc.):**

```js
import 'rizzo-css';
```

**Without a bundler (plain HTML):** Use a CDN. Both unpkg and jsDelivr resolve the package root to the built CSS (via the `unpkg` / `jsdelivr` fields in this package). For reliability or to pin a version, use the explicit path:

```html
<!-- unpkg (pin version: replace @latest with @0.0.54 or any version) -->
<link rel="stylesheet" href="https://unpkg.com/rizzo-css@latest/dist/rizzo.min.css" />

<!-- or jsDelivr -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/rizzo-css@latest/dist/rizzo.min.css" />
```

Short URLs also work: `https://unpkg.com/rizzo-css@latest` and `https://cdn.jsdelivr.net/npm/rizzo-css@latest` (CDNs serve the default file from package.json). To verify after publish: open the URL in a browser or run `curl -I https://unpkg.com/rizzo-css@latest/dist/rizzo.min.css` and expect `200 OK`.

Use the same class names and HTML structure as in the [component docs](https://rizzo-css.vercel.app/docs/components). **Vanilla JS**, Astro, and Svelte all use the same CSS and BEM markup; choose **Full** to add framework component files via the component picker. Each scaffold has README-RIZZO.md; every install includes LICENSE-RIZZO. The **Navbar** component in the scaffold includes the default Cat logo in the brand link (optional `logo` prop for a custom image). The **Vanilla** Full template includes a Settings panel and toast; **Astro** and **Svelte** Full scaffolds include theme persistence and toast (`showToast`, `removeToast`, `removeAllToasts`).

## Themes

Set the theme via `data-theme` on `<html>`:

```html
<html lang="en" data-theme="github-dark-classic">
```

Theme IDs and full docs: [Theming](https://rizzo-css.vercel.app/docs/theming).

## Docs

Full documentation: **[rizzo-css.vercel.app](https://rizzo-css.vercel.app)** — Getting Started, Design System, Theming (under Docs → Foundations), Components, Colors, Accessibility, and usage for Vanilla, Astro, and Svelte.

## Package contents

In addition to `dist/`, `bin/`, and `scaffold/`, the package includes **LICENSE** (MIT) and **.env.example** (optional; for projects that add search, e.g. Algolia — copy to `.env` and set your own values).

## License

MIT
