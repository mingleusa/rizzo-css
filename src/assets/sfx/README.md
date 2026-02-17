# Sound effects (source assets)

Add your click sound here so the site uses it instead of the Web Audio fallback tone.

- **Add** `click.mp3`, `click.wav`, or `click.ogg` to this folder (`src/assets/sfx/`).
- **Build** copies these into **`public/assets/sfx/`** when you run `pnpm build` or `pnpm build:css`.
- The layout script tries **`/assets/sfx/click.mp3`**, then `/assets/sfx/click.wav`, then `/assets/sfx/click.ogg`. The first file that loads is used for “Play sound on click” in Settings.

**Alternative:** Put the file directly in **`public/assets/sfx/`** (e.g. `public/assets/sfx/click.mp3`). No build step needed; the layout will use it at `/assets/sfx/click.mp3`.
