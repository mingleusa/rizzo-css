# Sound effects (source assets)

Add your click sound here so the site uses it instead of the Web Audio fallback tone.

- **Add** `click.mp3` to this folder (`src/assets/sfx/`).
- **Build** copies it into **`public/assets/sfx/`** when you run `pnpm build` or `pnpm build:css`.
- The layout script loads **`/assets/sfx/click.mp3`** for “Play sound on click” in Settings; if not found, a Web Audio tone is used.

**Alternative:** Put the file directly in **`public/assets/sfx/`** (e.g. `public/assets/sfx/click.mp3`). No build step needed; the layout will use it at `/assets/sfx/click.mp3`.
