# Sounds and Fonts

## Where assets live

- **Docs site (this repo):** `src/assets/sfx/` (sounds), `src/assets/fonts/` (webfonts). Built CSS and fonts are copied to `public/css/` and `public/assets/fonts/` by `pnpm build:css`.
- **Published package:** The npm package ships **fonts** with the CSS. The `build:css` script copies `src/assets/fonts/` to `packages/rizzo-css/dist/fonts/` and rewrites font URLs in `dist/rizzo.min.css` to `./fonts/...`. The CLI copies CSS and fonts into **framework-appropriate locations** (see [GETTING_STARTED – Where the CLI puts CSS and assets](./GETTING_STARTED.md#where-the-cli-puts-css-and-assets-per-framework)): Astro `public/css/` and `public/css/fonts/`, Svelte `static/css/` and `static/css/fonts/`, Vanilla `css/` and `css/fonts/`. When we ship sounds or images, they will follow the same pattern (static root per framework). Sounds are not yet shipped in the package.

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
