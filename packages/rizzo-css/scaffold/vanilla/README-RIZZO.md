# Vanilla JS + Rizzo CSS

```
      /\___/\   
   __(  o o  )__
     (  =^=  )  
    _/   ~   \_ 
   /  \_____/  \
 ____  ___ _____________     ____ ____ ____
|  _ \|_ _|__  /__  / _ \   / ___/ ___/ ___|
| |_) || |  / /  / / | | | | |   \___ \___ \
|  _ < | | / /_ / /| |_| | | |___ ___) |__) |
|_| \_\___/____/____\___/   \____|____/____/
      Design system · Vanilla · Astro · Svelte
```

This project was scaffolded with `npx rizzo-css init` when you chose **Create new project** and Vanilla JS, then **Minimal**, **Starter**, or **Full**. **Full** = index + all 34 component pages, js, icons, and Settings/toast/sound (full showcase). **Minimal** / **Starter** = CSS, fonts, icons, sfx + RIZZO-SETUP.md (Starter adds minimal index only if missing). **Add to existing project** (or `npx rizzo-css add`) uses the **same template choice** — Minimal, Starter, or Full; you must add the stylesheet `<link>` yourself (CLI prints the exact tag).

## First-time setup

**No build step required.** Open `index.html` in a browser or serve the folder with any static server.

The scaffold does **not** use the npm package from `node_modules`. When you run `npx rizzo-css init` (Vanilla), the CLI copies the built CSS into your project as `css/rizzo.min.css` and sets the `<link>` in `index.html` to that path. You can use the project as-is.

If you prefer to load CSS from a CDN instead of the local file, replace the `<link href="css/rizzo.min.css">` in `index.html` with:

- `<link rel="stylesheet" href="https://unpkg.com/rizzo-css@latest/dist/rizzo.min.css" />`  
- Or jsDelivr: `https://cdn.jsdelivr.net/npm/rizzo-css@latest/dist/rizzo.min.css`  

(Replace `@latest` with a specific version, e.g. `@0.0.54`, in production.)

The CLI replaces placeholders in `index.html` (e.g. `{{DATA_THEME}}`, `{{TITLE}}`) when you run `rizzo-css init`. The theme selected during init is used on first load when you have no saved preference in the browser.

## Editing the cloned site

- **Home** — `index.html` (hero and documentation cards with links to the main docs site). Edit the main content or add your own. Component showcase at `components/index.html`.
- **Component showcase** — `components/index.html` lists all components; `components/<name>.html` (e.g. `button.html`) each has a "Read the full docs" link to the main site. Edit or add HTML files; keep the same header/footer if you want the theme switcher and settings on every page.
- **CSS** — The CLI copies `css/rizzo.min.css`; the link uses `{{LINK_HREF}}` (replaced at init). To use a CDN, replace that with the CDN URL.
- **Scripts** — `js/main.js` provides theme sync, settings panel, toast, tabs, modal, dropdown, accordion, search (overlay), navbar mobile menu, copy-to-clipboard, and back-to-top. Customize or extend as needed.

## What's included

- **Theme flash prevention** — Small inline script in `<head>` applies saved theme and settings before first paint.
- **js/main.js** — Bundled vanilla JS for interactive components (loaded via `<script src="js/main.js"></script>`):
  - **Theme** — Header and settings theme selects; `localStorage` key `theme`; system preference listener.
  - **Settings panel** — `openSettings()`; font size, reduce motion, high contrast, scrollbar style; focus trap and Escape to close.
  - **Toast** — `showToast(message, options)`, `removeToast(id)`, `removeAllToasts()` on `window`.
  - **Tabs** — Any `[data-tabs]` block gets keyboard and click behavior.
  - **Modal** — Dialogs with `[data-modal-close]` and overlay `#id-overlay`; use `[data-modal-open="modalId"]` on a button to open; `openModal_*` / `closeModal_*` on `window` (id with hyphens replaced by underscores).
  - **Dropdown** — Any `[data-dropdown]` with `.dropdown__trigger` and `.dropdown__menu` (and optional submenus).
  - **Accordion** — Any `[data-accordion]` with `[data-accordion-trigger]` and panels; `data-allow-multiple="true"` for multiple open.
  - **Search** — Any `[data-search]` with `.search__trigger`, `[data-search-overlay]`, `.search__panel`, and `.search__input`; trigger toggles overlay, Escape or overlay click closes.
  - **Navbar** — Mobile menu: `.navbar__toggle` toggles `.navbar__menu`; Escape closes.
  - **Copy to clipboard** — Buttons with `.copy-to-clipboard` and `data-copy-value`, or `[data-copy]` with `value` or `data-copy-value`; click copies text and shows feedback (icons/aria-label). Optional `data-copy-format` for “Copied {format}!”.
  - **Back to top** — Any `[data-back-to-top]` with `[data-back-to-top-btn]`; shows after scrolling past `data-threshold` (default 400px), click scrolls to top smoothly.
  - **Tooltips** — Use `.tooltip-wrapper` with a `.tooltip` child, or `[data-tooltip]` on the trigger; no JS required (CSS :hover and :focus-within).
  - **Sound effects** — When "Play sound on click" is enabled in Settings, a short click sound plays on interactive elements. The script is injected by the CLI when **Full** (all components) or when **Settings**/**SoundEffects** are included; sound files are in **`assets/sfx/`** (e.g. `click.mp3` or `click.wav`). Off by default; persists as `soundEffects` in localStorage.

## Commands

No build commands. Use any static file server if you prefer not to open the file directly, for example:

```bash
npx serve .
# or
pnpm dlx serve .
```

## Other scaffolds

- **Astro:** `scaffold/astro-core/` — Astro app (Minimal, Starter, or Full template); Full adds components from `scaffold/astro/` (see README-RIZZO.md).
- **Svelte:** `scaffold/svelte-core/` — SvelteKit app (Minimal, Starter, or Full template); Full adds components from `scaffold/svelte/` (see README-RIZZO.md).

Docs: [rizzo-css.vercel.app](https://rizzo-css.vercel.app)
