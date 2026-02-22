# Astro + Rizzo CSS

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

Astro project with Rizzo CSS. Scaffolded with `npx rizzo-css init` when you chose **Create new** and Astro, then **Landing**, **Docs**, **Dashboard**, or **Full**. **Full** = clone of the docs site. **Landing** / **Docs** / **Dashboard** = base + component picker (all 56 or pick). Same template choice for **Add to existing** (`npx rizzo-css add`).

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

- `.gitignore` — Astro default values (same as `create-astro`): dist/, .astro/, node_modules/, .env, logs, .DS_Store, .idea/
- `astro.config.mjs` — Astro configuration
- `src/layouts/Layout.astro` — Layout with Rizzo CSS and theme (edit `data-theme` for default)
- `src/pages/index.astro` — Home page
- **Navbar** — Flat links (Docs, Components, Blocks, Themes, Colors); Search and Settings in the scaffold
- `public/css/rizzo.min.css` — Rizzo CSS bundle (added by CLI; font URLs point to `/assets/fonts/`)
- `public/assets/fonts/` — Rizzo font files (added by CLI)
- `README-RIZZO.md` — This file (scaffold docs; does not replace your project README)
- `LICENSE-RIZZO` — Rizzo CSS license (does not replace your project LICENSE)

## Commands

- `pnpm dev` — Start dev server
- `pnpm build` — Build for production
- `pnpm preview` — Preview production build

Docs: [rizzo-css.vercel.app](https://rizzo-css.vercel.app)
