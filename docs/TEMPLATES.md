# Templates (package distribution)

This doc describes how **create new** and **add to existing** work when you run `npx rizzo-css init`. Implementation: `packages/rizzo-css/bin/rizzo-css.js`. **We never overwrite your existing files** — skipped content goes to **RIZZO-SETUP.md**.

## Templates: Landing | Docs | Dashboard | Full

When you **create new** or **add to existing**, you pick a **template**:

| Template    | What you get |
|-------------|----------------|
| **Landing** | Full framework base + hero/features page. Component picker: all 56 or pick. |
| **Docs**    | Same base + **docs** overlay: sidebar, sample doc page. |
| **Dashboard** | Same base + **dashboard** overlay: sidebar, stats cards, table. |
| **Full**    | Clone of the Rizzo docs site (no picker). |

Landing, Docs, and Dashboard use the same base + Rizzo CSS, fonts, icons, sfx; only the starter content (layout + pages) differs. **Full** copies the full variant only (site clone).

- **Astro:** Base is `scaffold/astro/base/`; variant overlays are `scaffold/astro/variants/docs` and `scaffold/astro/variants/dashboard`. CLI copies base then overlays the chosen variant.
- **Svelte:** Base is `scaffold/svelte/base/`; variant overlays (when present) in `scaffold/svelte/variants/docs`, `scaffold/svelte/variants/dashboard`. Same flow: base then overlay.
- **Vanilla:** Full scaffold at `scaffold/vanilla/` (landing-style); no variant overlays yet.

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

The published tarball (`packages/rizzo-css` `"files"`) includes: **dist/** (rizzo.min.css, fonts/, sfx/), **bin/** (CLI), **scaffold/landing**, **scaffold/minimal**, **scaffold/starter** (snippet sources), **scaffold/astro** (base + variants + all 56 components), **scaffold/svelte** (base + variants + components), **scaffold/vanilla** (index, components/, icons/, js/, variants/), **scaffold/config** (fonts.ts), **scaffold/shared** (navbar-vanilla.html), **scaffold/utils** (theme.ts). PrepublishOnly runs `build:css`, `copy-scaffold.js`, and `prepare-vanilla-scaffold.js` so dist and scaffolds are up to date before pack.

## Scaffold layout in the package

- **Landing:** `scaffold/landing/index.html` (Vanilla); Astro/Svelte use base + landing content.
- **Docs / Dashboard:** Base + `scaffold/<framework>/variants/docs` or `variants/dashboard`.
- **Full:** `scaffold/<framework>/variants/full/` only (no base overlay).
- **Vanilla:** `scaffold/vanilla/`; variants in `scaffold/vanilla/variants/`.

## Theming

Theme (default dark, default light, initial theme) is only prompted when it matters: **create new** always asks so the scaffold layout has the right `data-theme`; **add to existing** only asks when you selected the **ThemeSwitcher** component (so we can inject theme into layout/config). Otherwise defaults are used and written to RIZZO-SETUP.md.

## CLI flags

- **init (create new):** `--template landing|docs|dashboard|full`. Default with `--yes` is `landing`. Full = site clone (no component picker).
- **init (add to existing):** Same template choice; you are prompted for variation (Landing | Docs | Dashboard | Full) unless `--template` is set.
- **add:** `--template landing|docs|dashboard|full` (same as create new). Full = site clone; others = component picker (all 56 or pick).
