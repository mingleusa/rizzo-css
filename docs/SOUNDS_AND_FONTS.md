# Sounds and Fonts

## Where assets live

- **Docs site (this repo):** `src/assets/fonts/` (webfonts). Built CSS and fonts are copied to `public/css/` and `public/assets/fonts/` by `pnpm build:css`. **Sound effects:** When “Play sound on click” is enabled in Settings, the layout script loads **`/assets/sfx/click.mp3`** (files live in **`public/assets/sfx/`**; you can add `src/assets/sfx/click.mp3` and run `pnpm build:css` to copy). If the file is not found, a short Web Audio tone plays. Sound is off by default. “Play sound on click” in Settings.
- **Published package:** The npm package ships **fonts** and **sounds** with the CSS. The `build:css` script copies `src/assets/fonts/` to `packages/rizzo-css/dist/fonts/` and ensures **`dist/sfx/click.mp3`** exists (from `src/assets/sfx/click.mp3` if present, otherwise from `packages/rizzo-css/scaffold/shared/click.mp3`), and rewrites font URLs in `dist/rizzo.min.css` to `./fonts/...`. The CLI copies CSS, fonts, and **`dist/sfx/click.mp3`** into **framework-appropriate locations** for all three frameworks (see [GETTING_STARTED – Where the CLI puts CSS and assets](./GETTING_STARTED.md#where-the-cli-puts-css-and-assets-per-framework)). When you scaffold with **Core** or include **Settings** or **SoundEffects**, the CLI copies `dist/sfx/` to `public/assets/sfx/` (Astro), `static/assets/sfx/` (Svelte), or `assets/sfx/` (Vanilla) so “Play sound on click” can use the asset. The package includes **`scaffold/shared/`** (sound script and default click.mp3) so the CLI works from the installed package.

## Sound effects (docs site)

- **Behavior:** When “Play sound on click” is enabled in Settings, a short, low-volume click sound plays on **primary (left) clicks** only on interactive elements (links, buttons, form controls, menu items, tabs, options, switches, summary). The script loads **`/assets/sfx/click.mp3`**; if it is not present, a Web Audio tone is used. Playback is **throttled** (120 ms) so one interaction doesn’t trigger multiple sounds. Sound is **off by default** (no localStorage key on first load) so there is no unexpected audio.
- **Accessibility:** Default is off; the user opts in via the Settings toggle. The sound is purely decorative; no information is conveyed by sound alone. The toggle is labeled “Play sound on click” with help text “Short click sound when you interact with buttons and links. Off by default.”
- **Persistence:** The choice is stored in localStorage as `soundEffects` (`'true'` or `'false'`). Restored when the panel opens and when the page loads (script reads the key before playing).

**Font pairs:** The design system ships **font pairs** (sans + mono) for the Settings font changer. Fonts live in `src/assets/fonts/`: **GeistSans**, **GeistMono** (default), **Inter**, **JetBrainsMono**, **IBMPlexSans**, **IBMPlexMono**, **SourceSans3**, **SourceCodePro**, **DMSans**, **DMMono**, **Outfit**. **Six pairs:** Geist (default), Inter + JetBrains Mono, IBM Plex Sans + Mono, Source Sans 3 + Source Code Pro, DM Sans + DM Mono, Outfit + JetBrains Mono (JetBrains Mono reused). Users choose a pair in Settings; the choice is persisted as `fontPair` in localStorage and applied on load. See [Design System – Typography](./DESIGN_SYSTEM.md#typography-system) and [PLAN_FONT_CHANGER](./PLAN_FONT_CHANGER.md).

Sounds and fonts should be **opt-in** and respect preferences (e.g. `prefers-reduced-motion`, user font choices) where applicable.

---

## Font formats to include

Recommendation for webfonts in `src/assets/fonts/` and any future package assets:

| Format   | Use |
|----------|-----|
| **WOFF2** | **Primary.** Best compression, supported in all modern browsers. Prefer this for every font. |
| **WOFF**  | **Optional fallback.** Slightly older browsers (e.g. older Android WebView, some legacy Safari). Only add if you need that support. |
| **Variable fonts** | Prefer when possible: one `.woff2` (or `.woff`) can replace multiple static files (e.g. Regular, Medium, Bold) and reduce payload. |

**Do not ship for web delivery:** TTF/OTF (keep in design/source if needed; convert to WOFF2 for the web). EOT is legacy IE-only and can be skipped.

**Summary:** Ship **WOFF2** only for modern-only support; add **WOFF** only if you need broader fallbacks. Prefer variable fonts when the typeface supports them.
