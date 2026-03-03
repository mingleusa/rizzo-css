# Templates (package distribution)

This doc describes how **create new** and **add to existing** work when you run `npx rizzo-css init`. Implementation: `packages/rizzo-css/bin/rizzo-css.js`. **We never overwrite your existing files** — skipped content goes to **RIZZO-SETUP.md**.

## Templates: CSS only | Landing | Docs | Dashboard | Full

When you **create new** or **add to existing**, you pick a **template**. The same five options exist for **every framework** (Vanilla, Astro, Svelte, React, Vue); each template ships the same *kind* of content per framework, with framework-appropriate structure.

| Template    | What you get |
|-------------|----------------|
| **CSS only** | CSS file, license, README (RIZZO-SETUP.md), .gitignore. No web pages, no components, no icons, no sfx. (Astro/Svelte/React/Vue create-new still copy framework base so the app can run.) |
| **Landing** | Framework base + hero/features page. Component picker: all or pick. |
| **Docs**    | Base + **docs** overlay: sidebar, sample doc page. Component picker: all or pick. |
| **Dashboard** | Base + **dashboard** overlay: sidebar, stats cards, table. Component picker: all or pick. |
| **Full**    | Clone of the Rizzo docs site (home, docs, components, themes). No picker; all components included. |

**CSS only** = stylesheet + minimal project files only; no component picker. This is the **minimal scaffold** (design tokens + one stylesheet; no web pages or components). Use it when you want only the design system CSS and will build your own pages. Landing, Docs, and Dashboard: same assets (Rizzo CSS, fonts, icons, sfx) and component choice (all or pick); only the starter layout and pages differ. **Full** copies the full variant only (site clone) and always includes all components.

### What ships per template × framework (consistent across frameworks)

| Template    | Vanilla | Astro | Svelte | React | Vue |
|-------------|---------|-------|--------|-------|-----|
| **CSS only** | CSS, fonts, RIZZO-SETUP.md, LICENSE, .gitignore. No web pages, js, icons, sfx, or components. | Base only; CSS in public/css. No components. | Base only; CSS in static/css. No components. | Base only; CSS in public/css. No components. | Base only; CSS in public/css. No components. |
| **Landing** | Landing index (`scaffold/landing` or `scaffold/vanilla/index.html`), CSS, fonts, sfx, icons, RIZZO-SETUP.md. If “all”: + `js/main.js`, all component HTML pages, README-RIZZO. | Base (`scaffold/astro/base/`) only. If “all” or pick: + chosen components. | Base (`scaffold/svelte/base/`) only. If “all” or pick: + chosen components. | Base (`scaffold/react/base/`) only. If pick: + chosen components. | Base (`scaffold/vue/base/`) only. If pick: + chosen components. |
| **Docs**    | Docs overlay (`scaffold/vanilla/variants/docs/`), CSS, fonts, sfx, icons, `js/main.js`, component pages (all or pick), README-RIZZO. | Base + docs overlay (`scaffold/astro/variants/docs/`), chosen components. | Base + docs overlay (`scaffold/svelte/variants/docs/`), chosen components. | Base + variant overlay when present; chosen components. | Base + variant overlay when present; chosen components. |
| **Dashboard** | Dashboard overlay (`scaffold/vanilla/variants/dashboard/`), same as Docs row. | Base + dashboard overlay (`scaffold/astro/variants/dashboard/`), chosen components. | Base + dashboard overlay (`scaffold/svelte/variants/dashboard/`), chosen components. | Base + variant overlay when present; chosen components. | Base + variant overlay when present; chosen components. |
| **Full**    | Full variant (`scaffold/vanilla/variants/full/`): Navbar, Settings, Footer, all component pages, `js/main.js`, CSS, fonts, sfx, icons. | Full variant (`scaffold/astro/variants/full/`): Navbar, Settings, Footer, all components, layout. | Full variant (`scaffold/svelte/variants/full/`): Navbar, Settings, Footer, all components, layout. | Base + chosen components (full variant TBD). | Base + chosen components (full variant TBD). |

- **Astro:** Base is `scaffold/astro/base/`; variant overlays are `scaffold/astro/variants/docs`, `scaffold/astro/variants/dashboard`, and `scaffold/astro/variants/full`. CLI copies base then overlay (or full variant only for Full).
- **Svelte:** Base is `scaffold/svelte/base/`; variant overlays in `scaffold/svelte/variants/docs`, `scaffold/svelte/variants/dashboard`, `scaffold/svelte/variants/full`. Same flow.
- **React:** Base is `scaffold/react/base/` (Vite + React). CSS in `public/css/`. Variant overlays (docs, dashboard, full) can be added later; Landing uses base only. CLI copies base then overlay when present, plus chosen components.
- **Vue:** Base is `scaffold/vue/base/` (Vite + Vue). CSS in `public/css/`. Same as React; variant overlays TBD.
- **Vanilla:** Landing uses `scaffold/vanilla/index.html` (or `scaffold/landing/index.html` for add/minimal). Docs/Dashboard use `scaffold/vanilla/variants/docs` and `scaffold/vanilla/variants/dashboard`. Full uses `scaffold/vanilla/variants/full/`. Same flow: base or variant + components (all or pick).

## Add to existing

Same template choice (CSS only | Landing | Docs | Dashboard | Full). We **never overwrite** existing or config files; skipped content is in **RIZZO-SETUP.md**. Framework from detection or `rizzo-css.json`. **CSS only** add = CSS + fonts + RIZZO-SETUP.md + license only; no base/variant copy for Astro/Svelte/React/Vue, no icons or sfx.

## Summary

| Flow        | Choice              | Meaning |
|------------|---------------------|--------|
| **Create new** | CSS only \| Landing \| Docs \| Dashboard \| Full | CSS only = no components; Full = site clone; others = full framework + component picker (all 52 or pick). |
| **Add**        | Same                | Same templates; no-overwrite. |

## Component set

**CSS only:** No components (no picker). **Landing / Docs / Dashboard:** All components or pick. Dependencies (Navbar→Search, Settings; Settings→ThemeSwitcher, FontSwitcher, SoundEffects; Toast→Alert) expanded automatically. **Full:** No picker (site clone).

## What the package includes (ship checklist)

The published tarball (`packages/rizzo-css` `"files"`) includes: **dist/** (rizzo.min.css, fonts/, sfx/), **bin/** (CLI), **scaffold/landing**, **scaffold/minimal** (snippet sources), **scaffold/astro** (base + variants + all 52 components), **scaffold/svelte** (base + variants + components), **scaffold/react** (base + components), **scaffold/vue** (base + components), **scaffold/vanilla** (index, components/, icons/, js/, variants/), **scaffold/config** (fonts.ts), **scaffold/shared** (navbar-vanilla.html), **scaffold/utils** (theme.ts). PrepublishOnly runs `build:css`, `copy-scaffold.js`, and `prepare-vanilla-scaffold.js` so dist and scaffolds are up to date before pack.

## Scaffold layout in the package

Same structure for all five frameworks:

- **Landing:** Vanilla: `scaffold/landing/index.html` or `scaffold/vanilla/index.html` (when “all” components). Astro/Svelte/React/Vue: base only (no overlay; base is the landing-style starter).
- **Docs / Dashboard:** Base + `scaffold/<framework>/variants/docs` or `scaffold/<framework>/variants/dashboard`. Applies to Vanilla, Astro, and Svelte; React and Vue use base only until variant overlays are added.
- **Full:** `scaffold/<framework>/variants/full/` only (no base overlay). Vanilla, Astro, Svelte; React and Vue use base + all components (full variant TBD).

## Theming

Theme (default dark, default light, initial theme) is only prompted when it matters: **create new** always asks so the scaffold layout has the right `data-theme`; **add to existing** only asks when you selected the **ThemeSwitcher** component (so we can inject theme into layout/config). Otherwise defaults are used and written to RIZZO-SETUP.md.

## CLI flags

- **init (create new):** `--template css-only|landing|docs|dashboard|full`. Default with `--yes` is `landing`. CSS only = no components; Full = site clone (no component picker).
- **init (add to existing):** Same template choice; you are prompted for variation (CSS only | Landing | Docs | Dashboard | Full) unless `--template` is set.
- **add:** `--template css-only|landing|docs|dashboard|full` (same as create new). CSS only = no components; Full = site clone; others = component picker (all 52 or pick).
