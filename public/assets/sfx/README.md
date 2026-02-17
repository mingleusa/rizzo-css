# Sound effects (legacy path)

The **docs site** uses **`public/assets/sfx/`** for the click sound. The layout script tries **`/assets/sfx/click.mp3`**, then `/assets/sfx/click.wav`, then `/assets/sfx/click.ogg`. Add your file to **`public/assets/sfx/`** (or to `src/assets/sfx/` and run `pnpm build:css` to copy it there).

This folder (`public/sfx/`) is kept for reference; prefer **`public/assets/sfx/`** so paths match the rest of the assets. Enable the sound in **Settings → Play sound on click**.
