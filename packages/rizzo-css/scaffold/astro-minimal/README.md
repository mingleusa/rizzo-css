# Astro + Rizzo CSS (minimal)

Minimal Astro project with Rizzo CSS. Scaffolded with `npx rizzo-css init --framework astro --template full`.

## Setup

1. Copy environment example (optional):
   ```bash
   cp .env.example .env
   ```

2. Install dependencies:
   ```bash
   pnpm install
   # or: npm install
   ```

3. Start the dev server:
   ```bash
   pnpm dev
   ```

## Project structure

- `astro.config.mjs` — Astro configuration
- `src/layouts/Layout.astro` — Layout with Rizzo CSS and theme (edit `data-theme` for default)
- `src/pages/index.astro` — Home page
- `public/css/rizzo.min.css` — Rizzo CSS bundle

## Commands

- `pnpm dev` — Start dev server
- `pnpm build` — Build for production
- `pnpm preview` — Preview production build

Docs: [rizzo-css.vercel.app](https://rizzo-css.vercel.app)
