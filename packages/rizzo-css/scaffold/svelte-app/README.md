# SvelteKit + Rizzo CSS

This project was scaffolded with `npx rizzo-css init` when you chose **Create new project** and Svelte. This full clone (home, component showcase at `/components`) is only generated for new projects; **Add to existing project** only adds the CSS and optional components.

## First-time setup

**Install dependencies before running any SvelteKit command:**

```bash
pnpm install
# or: npm install
```

Then start the dev server:

```bash
pnpm dev
```

The theme selected during `rizzo-css init` is set in `src/app.html` (`data-theme`) and is used on first load when you have no saved preference in the browser.

## Editing the cloned site

- **Home** — `src/routes/+page.svelte` (hero, link to `/components`). Edit or replace with your own content.
- **Component showcase** — `src/routes/components/+page.svelte` (overview) and `src/routes/components/[slug]/+page.svelte` (each component doc). Doc content lives in `src/lib/rizzo-docs/` (SvelteDocPage, CodeBlock, pages/*). Rizzo components are in `src/lib/rizzo/`. Change routes or copy from the docs as needed.
- **Layout** — `src/routes/+layout.svelte` wraps all pages. Add a shared nav or footer here.
- **CSS** — Loaded via `src/app.html` (`/css/rizzo.min.css` from `static/css/`).

## Commands

- `pnpm dev` — Start dev server
- `pnpm build` — Build for production
- `pnpm preview` — Preview production build

## Other scaffolds

From the same **rizzo-css** package: **Vanilla** (`scaffold/vanilla/`) — index + component showcase (components/index.html, components/<slug>.html) with Settings and toast; **Astro** (`scaffold/astro-app/`) — Astro app with navbar and component showcase. Use `npx rizzo-css init` and pick a different framework to create one of them.

Docs: [rizzo-css.vercel.app](https://rizzo-css.vercel.app)
