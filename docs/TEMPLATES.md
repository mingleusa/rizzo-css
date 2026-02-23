# Templates (package distribution)

This doc describes how **create new** and **add to existing** work when you run `npx rizzo-css init`. Implementation: `packages/rizzo-css/bin/rizzo-css.js`. **We never overwrite your existing files** — skipped content goes to **RIZZO-SETUP.md**.

## Templates: Landing | Docs | Dashboard | Full

When you **create new** or **add to existing**, you pick a **template**. The same four templates exist for **every framework** (Vanilla, Astro, Svelte); each template ships the same *kind* of content per framework, with framework-appropriate structure.

| Template    | What you get |
|-------------|----------------|
| **Landing** | Framework base + hero/features page. Component picker: all or pick. |
| **Docs**    | Base + **docs** overlay: sidebar, sample doc page. Component picker: all or pick. |
| **Dashboard** | Base + **dashboard** overlay: sidebar, stats cards, table. Component picker: all or pick. |
| **Full**    | Clone of the Rizzo docs site (home, docs, components, themes). No picker; all components included. |

Landing, Docs, and Dashboard: same assets (Rizzo CSS, fonts, icons, sfx) and component choice (all or pick); only the starter layout and pages differ. **Full** copies the full variant only (site clone) and always includes all components.

### What ships per template × framework (consistent across frameworks)

| Template    | Vanilla | Astro | Svelte |
|-------------|---------|-------|--------|
| **Landing** | Landing index (`scaffold/landing` or `scaffold/vanilla/index.html`), CSS, fonts, sfx, icons, RIZZO-SETUP.md. If “all”: + `js/main.js`, all component HTML pages, README-RIZZO. | Base (`scaffold/astro/base/`) only. If “all” or pick: + chosen components. | Base (`scaffold/svelte/base/`) only. If “all” or pick: + chosen components. |
| **Docs**    | Docs overlay (`scaffold/vanilla/variants/docs/`), CSS, fonts, sfx, icons, `js/main.js`, component pages (all or pick), README-RIZZO. | Base + docs overlay (`scaffold/astro/variants/docs/`), chosen components. | Base + docs overlay (`scaffold/svelte/variants/docs/`), chosen components. |
| **Dashboard** | Dashboard overlay (`scaffold/vanilla/variants/dashboard/`), same as Docs row. | Base + dashboard overlay (`scaffold/astro/variants/dashboard/`), chosen components. | Base + dashboard overlay (`scaffold/svelte/variants/dashboard/`), chosen components. |
| **Full**    | Full variant (`scaffold/vanilla/variants/full/`): Navbar, Settings, Footer, all component pages, `js/main.js`, CSS, fonts, sfx, icons. | Full variant (`scaffold/astro/variants/full/`): Navbar, Settings, Footer, all components, layout. | Full variant (`scaffold/svelte/variants/full/`): Navbar, Settings, Footer, all components, layout. |

- **Astro:** Base is `scaffold/astro/base/`; variant overlays are `scaffold/astro/variants/docs`, `scaffold/astro/variants/dashboard`, and `scaffold/astro/variants/full`. CLI copies base then overlay (or full variant only for Full).
- **Svelte:** Base is `scaffold/svelte/base/`; variant overlays in `scaffold/svelte/variants/docs`, `scaffold/svelte/variants/dashboard`, `scaffold/svelte/variants/full`. Same flow.
- **Vanilla:** Landing uses `scaffold/vanilla/index.html` (or `scaffold/landing/index.html` for add/minimal). Docs/Dashboard use `scaffold/vanilla/variants/docs` and `scaffold/vanilla/variants/dashboard`. Full uses `scaffold/vanilla/variants/full/`. Same flow: base or variant + components (all or pick).

## Add to existing

Same template choice (Landing | Docs | Dashboard | Full). We **never overwrite** existing or config files; skipped content is in **RIZZO-SETUP.md**. Framework from detection or `rizzo-css.json`.

## Summary

| Flow        | Choice              | Meaning |
|------------|---------------------|--------|
| **Create new** | Landing \| Docs \| Dashboard \| Full | Full = site clone; others = full framework + component picker (all 56 or pick). |
| **Add**        | Same                | Same templates; no-overwrite. |

## Component set

**Landing / Docs / Dashboard:** All components or pick. Dependencies (Navbar→Search, Settings; Settings→ThemeSwitcher, FontSwitcher, SoundEffects; Toast→Alert) expanded automatically. **Full:** No picker (site clone).

## What the package includes (ship checklist)

The published tarball (`packages/rizzo-css` `"files"`) includes: **dist/** (rizzo.min.css, fonts/, sfx/), **bin/** (CLI), **scaffold/landing**, **scaffold/minimal** (snippet sources), **scaffold/astro** (base + variants + all 56 components), **scaffold/svelte** (base + variants + components), **scaffold/vanilla** (index, components/, icons/, js/, variants/), **scaffold/config** (fonts.ts), **scaffold/shared** (navbar-vanilla.html), **scaffold/utils** (theme.ts). PrepublishOnly runs `build:css`, `copy-scaffold.js`, and `prepare-vanilla-scaffold.js` so dist and scaffolds are up to date before pack.

## Scaffold layout in the package

Same structure for all three frameworks:

- **Landing:** Vanilla: `scaffold/landing/index.html` or `scaffold/vanilla/index.html` (when “all” components). Astro/Svelte: base only (no overlay; base is the landing-style starter).
- **Docs / Dashboard:** Base + `scaffold/<framework>/variants/docs` or `scaffold/<framework>/variants/dashboard`. Applies to Vanilla, Astro, and Svelte.
- **Full:** `scaffold/<framework>/variants/full/` only (no base overlay). Same for all three.

## Theming

Theme (default dark, default light, initial theme) is only prompted when it matters: **create new** always asks so the scaffold layout has the right `data-theme`; **add to existing** only asks when you selected the **ThemeSwitcher** component (so we can inject theme into layout/config). Otherwise defaults are used and written to RIZZO-SETUP.md.

## CLI flags

- **init (create new):** `--template landing|docs|dashboard|full`. Default with `--yes` is `landing`. Full = site clone (no component picker).
- **init (add to existing):** Same template choice; you are prompted for variation (Landing | Docs | Dashboard | Full) unless `--template` is set.
- **add:** `--template landing|docs|dashboard|full` (same as create new). Full = site clone; others = component picker (all 56 or pick).
