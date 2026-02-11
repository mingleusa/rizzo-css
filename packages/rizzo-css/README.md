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

**Quick start (no install):** `npx rizzo-css init` — first choose **add to existing project** or **create new**. Existing: framework (auto-detect), themes, optional components. New: scaffold (Vanilla example, default Astro app, or default Svelte app; CLI colors: Vanilla = yellow, Astro = orange, Svelte = orange-red). All get the **same CSS and component styles**. To use the **official Svelte or Astro scaffold** plus Rizzo CSS, create the app with their CLI first, then run `npx rizzo-css add`:

```bash
npm create svelte@latest my-app && cd my-app && npx rizzo-css add
npm create astro@latest my-app   && cd my-app && npx rizzo-css add
```

`add` auto-detects Svelte/Astro and copies CSS to the right place (`static/css` or `public/css`). `npx rizzo-css theme` lists themes.

## One package, any framework

You install **the same package** for every framework: `npm install rizzo-css`. No separate `rizzo-css-astro` or `rizzo-css-svelte` packages.

| Framework | Install | Use the CSS | Optional |
|-----------|--------|-------------|----------|
| **Vanilla** | `npm install rizzo-css` or CDN | Link `node_modules/rizzo-css/dist/rizzo.min.css` or use CDN (see below) | None; write HTML with the same BEM classes as the docs |
| **Astro** | `npm install rizzo-css` | `import 'rizzo-css'` in layout or link from `public/` | Copy components from `node_modules/rizzo-css/scaffold/astro/` or use `npx rizzo-css add` with components |
| **Svelte** | `npm install rizzo-css` | `import 'rizzo-css'` in root layout or link from `static/` | Copy components from `node_modules/rizzo-css/scaffold/svelte/` or use `npx rizzo-css add` with components |

Scaffolds (full starter apps) are in the package: `scaffold/vanilla/`, `scaffold/astro-app/`, `scaffold/svelte-app/`. Use `npx rizzo-css init` and choose “Create new” to generate a project from one of them; each scaffold folder has a README with setup and commands.

## Use

Import or link the CSS **once** in your app (e.g. root layout or main entry).

**With a bundler (Vite, Astro, webpack, etc.):**

```js
import 'rizzo-css';
```

**Without a bundler (plain HTML):** Use a CDN. Both unpkg and jsDelivr resolve the package root to the built CSS (via the `unpkg` / `jsdelivr` fields in this package). For reliability or to pin a version, use the explicit path:

```html
<!-- unpkg (pin version: replace @latest with @0.0.11 or any version) -->
<link rel="stylesheet" href="https://unpkg.com/rizzo-css@latest/dist/rizzo.min.css" />

<!-- or jsDelivr -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/rizzo-css@latest/dist/rizzo.min.css" />
```

Short URLs also work: `https://unpkg.com/rizzo-css@latest` and `https://cdn.jsdelivr.net/npm/rizzo-css@latest` (CDNs serve the default file from package.json). To verify after publish: open the URL in a browser or run `curl -I https://unpkg.com/rizzo-css@latest/dist/rizzo.min.css` and expect `200 OK`.

Use the same class names and HTML structure as in the [component docs](https://rizzo-css.vercel.app/docs/components). **Vanilla JS**, Astro, and Svelte all use the same CSS and BEM markup; Astro/Svelte add framework component files for convenience. Each scaffold has a README in its folder (`scaffold/vanilla/README.md`, `scaffold/astro-app/README.md`, `scaffold/svelte-app/README.md`) with setup and commands. The **Vanilla** scaffold includes a full Settings panel and toast; **Astro** and **Svelte** scaffold layouts include theme persistence and toast (`showToast`, `removeToast`, `removeAllToasts`).

## Themes

Set the theme via `data-theme` on `<html>`:

```html
<html lang="en" data-theme="github-dark-classic">
```

Theme IDs and full docs: [Theming](https://rizzo-css.vercel.app/docs/theming).

## Docs

Full documentation: **[rizzo-css.vercel.app](https://rizzo-css.vercel.app)** — Getting Started, Components, Themes, and usage for Vanilla, Astro, and Svelte.

## License

MIT
