# rizzo-css

A modern CSS design system with semantic theming, 14 built-in themes, and accessible components (BEM). Framework-agnostic: use with Astro, Svelte, React, Vue, or plain HTML.

## Install

```bash
npm install rizzo-css
# or
pnpm add rizzo-css
# or
yarn add rizzo-css
```

**Quick start (no install):** `npx rizzo-css init` scaffolds a project (prompts for framework and optional Astro/Svelte components). `npx rizzo-css add` copies the CSS into the current project. `npx rizzo-css theme` lists themes.

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

Use the same class names and HTML structure as in the [component docs](https://rizzo-css.vercel.app/docs/components). For Astro or Svelte, reference components and examples are in the [documentation](https://rizzo-css.vercel.app/docs/getting-started).

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
