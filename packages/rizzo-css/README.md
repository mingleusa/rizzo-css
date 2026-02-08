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

## Use

Import the built CSS once in your app (e.g. root layout or main entry):

**In a bundler (Vite, Astro, etc.):**

```js
import 'rizzo-css';
```

**In HTML:**

```html
<link rel="stylesheet" href="node_modules/rizzo-css/dist/rizzo.min.css" />
```

Then use the same class names and HTML structure as the [component docs](https://github.com/mingleusa/rizzo-css/tree/main/docs#components). For Astro or Svelte, you can copy the reference components from the [repo](https://github.com/mingleusa/rizzo-css).

## Themes

Set the theme via `data-theme` on `<html>`:

```html
<html lang="en" data-theme="github-dark-classic">
```

Theme IDs and full docs: [Theming](https://github.com/mingleusa/rizzo-css/blob/main/docs/THEMING.md).

## Docs

Full documentation (components, theming, usage in Astro/Svelte): **[Getting Started](https://github.com/mingleusa/rizzo-css/blob/main/docs/GETTING_STARTED.md#using-rizzo-in-your-project)** in the repo.

## License

MIT
