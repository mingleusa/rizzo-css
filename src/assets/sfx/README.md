# Sound effects (source assets)

Add your click sound here (e.g. `click.mp3` or `click.wav`) if you want it bundled with the site.

**Easier option:** Put the file in **`public/sfx/`** instead. The layout script automatically tries `public/sfx/click.mp3` and `public/sfx/click.wav` — no code changes needed.

To use a file from this folder you must import it in `Layout.astro` and pass the resolved URL to the sound script (e.g. via a data attribute).
