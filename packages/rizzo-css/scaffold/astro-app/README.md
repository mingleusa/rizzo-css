# Astro + Rizzo CSS

This project was scaffolded with `npx rizzo-css init` when you chose **Create new project** and Astro. This full clone (navbar, docs pages, component showcase) is only generated for new projects; **Add to existing project** only adds the CSS and optional components.

## First-time setup

**Install dependencies before running any Astro command:**

```bash
pnpm install
# or: npm install
```

Then start the dev server:

```bash
pnpm dev
```

The theme selected during `rizzo-css init` is set in `src/layouts/Layout.astro` (`data-theme` on `<html>`) and is used on first load when you have no saved preference in the browser.

## Commands

- `pnpm dev` — Start dev server
- `pnpm build` — Build for production
- `pnpm preview` — Preview production build

## Editing the cloned site

- **Layout and shell** — `src/layouts/Layout.astro` (navbar, settings, theme script, CSS link). Change the default theme or title placeholders here.
- **Docs and theme pages** — `src/pages/docs/` (getting-started, design-system, theming, themes, etc.). Each page uses `DocsLayout` and can be edited or replaced; stubs link to the main site for full content.
- **Component showcase** — `src/pages/components.astro` (index) and `src/pages/components/*.astro`. Edit or add component demos; imports use `../../components/` and `../../layouts/`.
- **Home page** — `src/pages/index.astro`. Replace the hero and links with your own content.
- **Components and config** — `src/components/` (Navbar, Settings, Card, etc.) and `src/config/themes.ts`. Customize or remove components; update the nav in `Navbar.astro` if you add/remove routes.
- **CSS** — The app loads `/css/rizzo.min.css` (from `public/css/`). Replace or add styles as needed.

After editing, run `pnpm dev` to preview and `pnpm build` for production.

## Other scaffolds

From the same **rizzo-css** package: **Vanilla** (`scaffold/vanilla/`) — index + component showcase (components/index.html, components/<slug>.html) with Settings and toast; **Svelte** (`scaffold/svelte-app/`) — SvelteKit app with /components and /components/[slug]. Use `npx rizzo-css init` and pick a different framework to create one of them.

Docs: [rizzo-css.vercel.app](https://rizzo-css.vercel.app)
