# Sounds and Fonts

## Where assets live

- **Docs site (this repo):** `src/assets/sfx/` (sounds), `src/assets/fonts/` (webfonts).
- **Published package:** Today the npm package does not ship `src/`. To ship sounds/fonts later, add a build step that copies from `src/assets/` into e.g. `packages/rizzo-css/assets/` and list that in the package `files` field.

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
