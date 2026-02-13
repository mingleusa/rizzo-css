# SvelteKit + Rizzo CSS (minimal)

Minimal SvelteKit project with Rizzo CSS. Scaffolded with `npx rizzo-css init --framework svelte --template full`, **minimal**, or **manual**.

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

- `svelte.config.js` — SvelteKit configuration
- `src/app.html` — HTML shell with Rizzo CSS and theme (edit `data-theme` for default)
- `src/routes/+layout.svelte` — Root layout
- `src/routes/+page.svelte` — Home page
- `static/css/rizzo.min.css` — Rizzo CSS bundle (added by CLI)
- `static/css/fonts/` — Rizzo font files (added by CLI)
- `RIZZO-README.md` — This file (scaffold docs; does not replace your project README)
- `RIZZO-LICENSE` — Rizzo CSS license (does not replace your project LICENSE)

## Commands

- `pnpm dev` — Start dev server
- `pnpm build` — Build for production
- `pnpm preview` — Preview production build

Docs: [rizzo-css.vercel.app](https://rizzo-css.vercel.app)
