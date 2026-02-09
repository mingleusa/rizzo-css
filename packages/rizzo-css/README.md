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

**Quick start (no install):** `npx rizzo-css init` scaffolds a project. Choose **Vanilla JS** (yellow in the CLI), **Astro** (orange), or **Svelte** (orange-red). All options get the **same CSS and component styles**. Vanilla JS gets an example page with theme switcher and sample components; Astro/Svelte can optionally add component files. To use the **official Svelte or Astro scaffold** plus Rizzo CSS, create the app with their CLI first, then add our CSS:

```bash
npm create svelte@latest my-app && cd my-app && npx rizzo-css add
npm create astro@latest my-app   && cd my-app && npx rizzo-css add
```

`add` auto-detects Svelte/Astro and copies CSS to the right place (`static/css` or `public/css`). `npx rizzo-css theme` lists themes.

## Use

Import or link the CSS **once** in your app (e.g. root layout or main entry).

**With a bundler (Vite, Astro, webpack, etc.):**

```js
import 'rizzo-css';
```

**Without a bundler (plain HTML):** Use a CDN (unpkg and jsDelivr both serve the package automatically):

```html
<!-- unpkg -->
<link rel="stylesheet" href="https://unpkg.com/rizzo-css@latest" />

<!-- or jsDelivr -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/rizzo-css@latest" />
```

Use the same class names and HTML structure as in the [component docs](https://rizzo-css.vercel.app/docs/components). **Vanilla JS**, Astro, and Svelte all use the same CSS and BEM markup; Astro/Svelte add framework component files for convenience.

## Themes

Set the theme via `data-theme` on `<html>`:

```html
<html lang="en" data-theme="github-dark-classic">
```

Theme IDs and full docs: [Theming](https://rizzo-css.vercel.app/docs/theming).

## Docs

Full documentation: **[rizzo-css.vercel.app](https://rizzo-css.vercel.app)** — Getting Started, Components, Themes, and usage for Astro & Svelte.

## License

MIT
