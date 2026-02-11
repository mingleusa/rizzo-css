# Vanilla JS + Rizzo CSS

This project was scaffolded with `npx rizzo-css init` (Vanilla JS).

## First-time setup

**No build step required.** Open `index.html` in a browser or serve the folder with any static server.

The scaffold does **not** use the npm package from `node_modules`. When you run `npx rizzo-css init` (Vanilla), the CLI copies the built CSS into your project as `css/rizzo.min.css` and sets the `<link>` in `index.html` to that path. You can use the project as-is.

If you prefer to load CSS from a CDN instead of the local file, replace the `<link href="css/rizzo.min.css">` in `index.html` with:

- `<link rel="stylesheet" href="https://unpkg.com/rizzo-css@latest/dist/rizzo.min.css" />`  
- Or jsDelivr: `https://cdn.jsdelivr.net/npm/rizzo-css@latest/dist/rizzo.min.css`  

(Replace `@latest` with a specific version, e.g. `@0.0.12`, in production.)

The CLI replaces placeholders in `index.html` (e.g. `{{DATA_THEME}}`, `{{TITLE}}`) when you run `rizzo-css init`. The theme selected during init is used on first load when you have no saved preference in the browser.

## What’s included

- **Theme flash prevention** — Small inline script in `<head>` applies saved theme and settings before first paint.
- **js/main.js** — Bundled vanilla JS for components (loaded via `<script src="js/main.js"></script>`):
  - **Theme** — Header and settings theme selects; `localStorage` key `theme`; system preference listener.
  - **Settings panel** — `openSettings()`; font size, reduce motion, high contrast, scrollbar style; focus trap and Escape to close.
  - **Toast** — `showToast(message, options)`, `removeToast(id)`, `removeAllToasts()` on `window`.
  - **Tabs** — Any `[data-tabs]` block gets keyboard and click behavior.
  - **Modal** — Dialogs with `[data-modal-close]` and overlay `#id-overlay`; use `[data-modal-open="modalId"]` on a button to open; `openModal_*` / `closeModal_*` on `window` (id with hyphens replaced by underscores).
  - **Dropdown** — Any `[data-dropdown]` with `.dropdown__trigger` and `.dropdown__menu` (and optional submenus).
  - **Accordion** — Any `[data-accordion]` with `[data-accordion-trigger]` and panels; `data-allow-multiple="true"` for multiple open.

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
