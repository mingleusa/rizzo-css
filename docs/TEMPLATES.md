# Minimal, Starter, and Full templates (package distribution)

This doc describes the **Minimal**, **Starter**, and **Full** templates used when you run `npx rizzo-css init` (create new) or `npx rizzo-css add` (add to existing). The same three templates are offered for both flows. Implementation lives in `packages/rizzo-css/bin/rizzo-css.js`. **We never overwrite your existing files** — skipped content is written to **RIZZO-SETUP.md** as copy-paste snippets.

## Summary

| Framework | Minimal | Starter | Full |
|-----------|---------|---------|------|
| **Vanilla** | CSS, fonts, icons, sfx + **RIZZO-SETUP.md** (instructions and snippets only) | Same as Minimal + minimal `index.html` only if missing; otherwise snippets in RIZZO-SETUP.md | Full app: `index.html` (from scaffold or snippet), theme switcher, `js/main.js`, 34 component pages. Existing files skipped; snippets in RIZZO-SETUP.md. Choose all 34 components or pick which to include. |
| **Astro** | CSS, fonts, icons, sfx + **RIZZO-SETUP.md** | Same as Minimal + minimal layout/page only if missing; otherwise snippets in RIZZO-SETUP.md | Base from `scaffold/astro-core` + all or picked components (34 total). Existing files skipped; snippets in RIZZO-SETUP.md. |
| **Svelte** | CSS, fonts, icons, sfx + **RIZZO-SETUP.md** | Same as Minimal + minimal layout/page only if missing; otherwise snippets in RIZZO-SETUP.md | Base from `scaffold/svelte-core` + all or picked components (34 total). Existing files skipped; snippets in RIZZO-SETUP.md. |

## Add to existing (`npx rizzo-css add`)

The **add** command offers the **same** template choice (Minimal | Starter | Full) after you choose the framework:

- **Minimal** — CSS, fonts, icons, sfx (framework-appropriate) + **RIZZO-SETUP.md**. No component copy.
- **Starter** — Same as Minimal (same assets + RIZZO-SETUP.md). No component copy.
- **Full** — CSS, fonts, icons, sfx + **component picker** (all 34 or pick). Writes **RIZZO-SETUP.md** and **RIZZO-SNIPPET.txt** (link + theme). Same no-overwrite behavior: we don’t overwrite your existing files.

## Component set (Full template)

- **Full (all frameworks):** You can choose **all 34 components** or **pick components**. The list is `ASTRO_COMPONENTS` / `SVELTE_COMPONENTS` / `Object.keys(VANILLA_COMPONENT_SLUGS)`. Dependencies (Navbar→Search, Settings; Settings→ThemeSwitcher, FontSwitcher, SoundEffects; Toast→Alert) are expanded automatically so everything works.
- **Minimal / Starter:** No components are copied; you get CSS, fonts, icons, sfx, and RIZZO-SETUP.md so you can add the link and theme yourself.

## Scaffold layout in the package

Every template has a corresponding scaffold entry:

- **Minimal:** `scaffold/minimal/index.html` — same placeholder HTML as Starter (`{{TITLE}}`, `{{DATA_THEME}}`, `{{THEME_LIST_COMMENT}}`, `{{LINK_HREF}}`). The CLI does **not** write this file into the project; it only copies CSS, fonts, icons, sfx and writes **RIZZO-SETUP.md**, and includes the filled-in HTML as an “Example minimal page” snippet in that doc so the content comes from the package.
- **Starter:** `scaffold/starter/index.html` — same structure. The CLI reads it, applies replacements, and writes it as the project’s index (or `public/index.html` / `static/index.html` for Astro/Svelte) only if that file is missing; otherwise the same content is written to RIZZO-SETUP.md as a snippet.
- **Full:**  
  - **Vanilla:** `scaffold/vanilla/` — `index.html` (full showcase), `components/*.html`, `js/main.js`, `icons/`, README-RIZZO.md. Used for Full (all 34 or picked).  
  - **Astro:** `scaffold/astro-core/` — base app shell; **Full** adds all or picked components from `scaffold/astro/` (34 files).  
  - **Svelte:** `scaffold/svelte-core/` — base app shell; **Full** adds all or picked components from `scaffold/svelte/` (34 files).

## CLI flags

- **init:** `--template minimal|starter|full` (legacy `core` and `manual` map to `full`). `--yes` defaults to `full`.
- **add:** `--template minimal|starter|full`. Same template names and behavior as init.
