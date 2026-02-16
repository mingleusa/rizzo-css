# Core vs Manual template (package distribution)

This doc describes how the **Core** and **Manual** templates differ when users run `npx rizzo-css init` and choose "Create new project". Implementation lives in `packages/rizzo-css/bin/rizzo-css.js`.

## Summary

| Framework | Core | Manual |
|-----------|------|--------|
| **Vanilla** | Rich `index.html` from `scaffold/vanilla/index.html` (theme switcher, skip link, search bar, nav to component pages) + all 29 components + `js/main.js` + icons + scaffold README | Generated minimal `index.html` ("Hello, Rizzo CSS" + optional script) + only the components you pick (picker has all 29 pre-selected) + optional `js/main.js` + icons + manual README |
| **Astro** | Base from `scaffold/astro-core` + all 29 components (after deps expansion) | Same base + only the components you pick (picker has all 29 pre-selected; deps added when you confirm) |
| **Svelte** | Base from `scaffold/svelte-core` + all 29 components | Same base + only the components you pick (picker has all 29 pre-selected; deps added when you confirm) |

## Component sets (in code)

- **Core (all frameworks):** `selectedComponents` = all 29 (ASTRO_COMPONENTS / SVELTE_COMPONENTS / Object.keys(VANILLA_COMPONENT_SLUGS)). Dependencies (Navbar→Search, Settings; Settings→ThemeSwitcher; Toast→Alert) are expanded so everything works.
- **Manual:** User picks from the same 29-name list (all pre-selected in the picker). `expandWithDeps()` adds required dependencies when they confirm. Can pick none (e.g. Vanilla CSS-only).

## Scaffold layout in the package

- **Vanilla:** `scaffold/vanilla/` — `index.html` (full showcase), `components/*.html`, `js/main.js`, `icons/`, README-RIZZO.md. Used for **Core** only; **Manual** builds a minimal index and README in code.
- **Astro:** `scaffold/astro-core/` — base used for both **Core** and **Manual** (same app shell; Core gets all components, Manual gets selected components).
- **Svelte:** `scaffold/svelte-core/` — base used for both **Core** and **Manual** (same app shell; Core gets all components, Manual gets selected components).
- **Components (Astro/Svelte):** `scaffold/astro/` and `scaffold/svelte/` — files copied based on selection (29 for Core; user’s selection for Manual).
