# Vanilla JS + Rizzo CSS

This project was scaffolded with `npx rizzo-css init` (Vanilla JS).

## First-time setup

**No build step required.** Open `index.html` in a browser or serve the folder with any static server.

The scaffold does **not** use the npm package from `node_modules`. When you run `npx rizzo-css init` (Vanilla), the CLI copies the built CSS into your project as `css/rizzo.min.css` and sets the `<link>` in `index.html` to that path. You can use the project as-is.

If you prefer to load CSS from a CDN instead of the local file, replace the `<link href="css/rizzo.min.css">` in `index.html` with:

- `<link rel="stylesheet" href="https://unpkg.com/rizzo-css@latest/dist/rizzo.min.css" />`  
- Or jsDelivr: `https://cdn.jsdelivr.net/npm/rizzo-css@latest/dist/rizzo.min.css`  

(Replace `@latest` with a specific version, e.g. `@0.0.11`, in production.)

The CLI replaces placeholders in `index.html` (e.g. `{{DATA_THEME}}`, `{{TITLE}}`) when you run `rizzo-css init`. The theme selected during init is used on first load when you have no saved preference in the browser.

## What’s included

- **Theme flash prevention** — Saved theme and settings applied before first paint.
- **Theme switcher** — System (prefer OS), dark, and light themes; choice persisted in `localStorage` as `theme`.
- **Settings panel** — Open via `openSettings()`; theme, font size, reduce motion, high contrast, scrollbar style; all persisted in `localStorage`.
- **Toast** — `showToast()`, `removeToast()`, `removeAllToasts()` available globally.

## Commands

No build commands. Use any static file server if you prefer not to open the file directly, for example:

```bash
npx serve .
# or
pnpm dlx serve .
```

## Other scaffolds

- **Astro:** `scaffold/astro-app/` — minimal Astro app (see its README).
- **Svelte:** `scaffold/svelte-app/` — SvelteKit app (see its README).

Docs: [rizzo-css.vercel.app](https://rizzo-css.vercel.app)
