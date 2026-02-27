# Vue + Rizzo CSS

<pre style="font-family: ui-monospace, monospace; font-size: 0.85em; line-height: 1.2;">
      /\___/\   
   __(  o o  )__
     (  =^=  )  
    _/   ~   \_ 
   /  \_____/  \
<span style="color:#c44536"> ____ </span><span style="color:#e07c3e"> ___ _</span><span style="color:#d4a800">______</span><span style="color:#2d9d78">______</span><span style="color:#0052bd">     _</span><span style="color:#7c3aed">___ __</span><span style="color:#d946ef">__ ____</span>
<span style="color:#c44536">|  _ \</span><span style="color:#e07c3e">|_ _|_</span><span style="color:#d4a800">_  /__</span><span style="color:#2d9d78">  / _ </span><span style="color:#0052bd">\   / </span><span style="color:#7c3aed">___/ _</span><span style="color:#d946ef">__/ ___|</span>
<span style="color:#c44536">| |_) </span><span style="color:#e07c3e">|| |  </span><span style="color:#d4a800">/ /  /</span><span style="color:#2d9d78"> / | |</span><span style="color:#0052bd"> | | |</span><span style="color:#7c3aed">   \__</span><span style="color:#d946ef">_ \___ \</span>
<span style="color:#c44536">|  _ &lt;</span><span style="color:#e07c3e"> | | /</span><span style="color:#d4a800"> /_ / </span><span style="color:#2d9d78">/| |_|</span><span style="color:#0052bd"> | | |</span><span style="color:#7c3aed">___ __</span><span style="color:#d946ef">_) |__) |</span>
<span style="color:#c44536">|_| \_</span><span style="color:#e07c3e">\___/_</span><span style="color:#d4a800">___/__</span><span style="color:#2d9d78">__\___</span><span style="color:#0052bd">/   \_</span><span style="color:#7c3aed">___|__</span><span style="color:#d946ef">__/____/</span>

  Design system · Vanilla · Astro · Svelte · React · Vue
</pre>

Vite + Vue project with Rizzo CSS. Scaffolded with `npx rizzo-css init` when you chose **Create new** and Vue, then **Landing**, **Docs**, **Dashboard**, or **Full**. Same template choice for **Add to existing** (`npx rizzo-css add`).

## Setup

1. Install dependencies:
   ```bash
   pnpm install
   # or: npm install
   ```

2. Start the dev server:
   ```bash
   pnpm dev
   ```

## Project structure

- `vite.config.ts` — Vite configuration
- `index.html` — HTML shell with Rizzo CSS and theme (edit `data-theme` for default)
- `src/main.ts` — Entry point
- `src/App.vue` — Root component
- `public/css/rizzo.min.css` — Rizzo CSS bundle (added by CLI; font URLs point to `/assets/fonts/`)
- `public/assets/fonts/` — Rizzo font files (added by CLI)
- `README-RIZZO.md` — This file (scaffold docs; does not replace your project README)
- `LICENSE-RIZZO` — Rizzo CSS license (does not replace your project LICENSE)

## Commands

- `pnpm dev` — Start dev server
- `pnpm build` — Build for production
- `pnpm preview` — Preview production build

Docs: [rizzo-css.vercel.app](https://rizzo-css.vercel.app)
