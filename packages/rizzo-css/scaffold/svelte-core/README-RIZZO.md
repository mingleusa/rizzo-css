# SvelteKit + Rizzo CSS

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

SvelteKit project with Rizzo CSS. Scaffolded with `npx rizzo-css init --framework svelte --template core` or **manual**. When you choose **Core**, the CLI copies all 33 Rizzo components (Button, Modal, Navbar, Search, Settings, ThemeSwitcher, etc.) into this project so they work together; **Manual** lets you pick which of those to include (all are pre-selected by default).

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
- `static/css/rizzo.min.css` — Rizzo CSS bundle (added by CLI; font URLs point to `/assets/fonts/`)
- `static/assets/fonts/` — Rizzo font files (added by CLI)
- `README-RIZZO.md` — This file (scaffold docs; does not replace your project README)
- `LICENSE-RIZZO` — Rizzo CSS license (does not replace your project LICENSE)

## Commands

- `pnpm dev` — Start dev server
- `pnpm build` — Build for production
- `pnpm preview` — Preview production build

Docs: [rizzo-css.vercel.app](https://rizzo-css.vercel.app)
