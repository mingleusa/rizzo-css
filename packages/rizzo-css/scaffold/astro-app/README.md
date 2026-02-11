# Astro + Rizzo CSS

This project was scaffolded with `npx rizzo-css init` (Astro).

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

## Other scaffolds

From the same **rizzo-css** package: **Vanilla** (`scaffold/vanilla/`) — single HTML file with Settings and toast; **Svelte** (`scaffold/svelte-app/`) — SvelteKit app. Use `npx rizzo-css init` and pick a different framework to create one of them.

Docs: [rizzo-css.vercel.app](https://rizzo-css.vercel.app)
