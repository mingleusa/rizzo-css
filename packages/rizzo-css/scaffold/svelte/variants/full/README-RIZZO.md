# SvelteKit + Rizzo CSS

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

  Design system · Vanilla · Astro · Svelte
</pre>

SvelteKit project with Rizzo CSS. Scaffolded with `npx rizzo-css init` when you chose **Create new** and Svelte, then **Full** template. **Full** = clone of the Rizzo docs site (no component picker). **Landing** / **Docs** / **Dashboard** = base + component picker (all 58 or pick). Same template choice for **Add to existing** (`npx rizzo-css add`).

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
- `vite.config.js` — Vite config with SvelteKit plugin (required for `pnpm dev`)
- `src/app.html` — HTML shell with Rizzo CSS and theme (edit `data-theme` for default)
- `src/routes/+layout.svelte` — Root layout
- `src/routes/+page.svelte` — Home page
- **Navbar** — Flat links (Docs, Components, Blocks, Themes, Colors); Search and Settings in the scaffold
- `static/css/rizzo.min.css` — Rizzo CSS bundle (added by CLI; font URLs point to `/assets/fonts/`)
- `static/assets/fonts/` — Rizzo font files (added by CLI)
- `README-RIZZO.md` — This file (scaffold docs; does not replace your project README)
- `LICENSE-RIZZO` — Rizzo CSS license (does not replace your project LICENSE)

## Commands

- `pnpm dev` — Start dev server
- `pnpm build` — Build for production
- `pnpm preview` — Preview production build

Docs: [rizzo-css.vercel.app](https://rizzo-css.vercel.app)
