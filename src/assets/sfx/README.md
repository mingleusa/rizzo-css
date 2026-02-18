# Sound effects (source assets)

Add your click sound here so the site uses it instead of the Web Audio fallback tone.

- **Add** `click.mp3` and/or `click.wav` to this folder (`src/assets/sfx/`).
- **Build** copies them into **`public/assets/sfx/`** when you run `pnpm build` or `pnpm build:css`.
- The layout script loads **`/assets/sfx/click.mp3`** then **`/assets/sfx/click.wav`** for "Play sound on click" in Settings; if neither is found, a Web Audio tone is used.

**Alternative:** Put files directly in **`public/assets/sfx/`** (e.g. `public/assets/sfx/click.mp3` or `click.wav`). No build step needed; the layout will use them at `/assets/sfx/click.mp3` or `click.wav`.
