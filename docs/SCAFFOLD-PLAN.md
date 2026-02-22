# Framework-specific scaffolds and CLI flow

This doc describes the **framework-first scaffold layout** (implemented) and optional future honing of the CLI. All framework scaffold content lives under `scaffold/<framework>/` (base + variants).

## Goal

- **One scaffold story per framework:** Each framework (vanilla, astro, svelte) has a clear “scaffold root” and a predictable layout (base + optional variants). No scattered `astro-core` vs `variants/astro-dashboard` with different call sites.
- **Honed CLI flow:** The CLI does the same mental steps for every framework: resolve scaffold root → copy base (with replacements) → overlay variant (if any) → add assets (CSS, fonts, icons, sfx) → add components. Framework-specific behavior is driven by **scaffold layout and config**, not by large if/else branches.
- **Easier to extend:** Adding a new variation (e.g. “blog”) or a new framework means adding files under that framework’s scaffold and (optionally) a small config entry, not threading new branches through the CLI.

---

## Implemented layout (current state)

| Concern | Vanilla | Astro | Svelte |
|--------|---------|-------|--------|
| **Base scaffold** | `scaffold/vanilla/` (index.html, js/, components/, icons/) | `scaffold/astro/base/` | `scaffold/svelte/base/` |
| **Variations** | None (landing only) | `scaffold/astro/variants/docs`, `scaffold/astro/variants/dashboard` | `scaffold/svelte/variants/` (landing, docs, dashboard dirs; docs/dashboard content TBD) |
| **Components** | `scaffold/vanilla/components/` | `scaffold/astro/` (sibling to base/) | `scaffold/svelte/` (sibling to base/) |
| **CLI** | Special-case: build index + copy components + js | Copy astro/base → overlay variant → copy assets → copy components | Copy svelte/base → overlay variant → copy assets → copy components |

- Variants live under `scaffold/<framework>/variants/<variation>` (e.g. `astro/variants/docs`).
- `getScaffoldAstroCoreDir()` → `scaffold/astro/base`; `getScaffoldSvelteCoreDir()` → `scaffold/svelte/base`.
- `getVariantDir(framework, variation)` → `scaffold/<framework>/variants/<variation>` (only for docs/dashboard).

---

## Proposed scaffold layout (framework-first)

Keep shared pieces that are not framework-specific, and put everything else under a **per-framework** tree.

### Shared (unchanged)

- `scaffold/minimal/` — snippet for add (minimal)
- `scaffold/starter/` — snippet / optional index for add (starter)
- `scaffold/shared/` — sound effects, etc.
- `scaffold/config/` — rizzo-css.json etc.
- `scaffold/utils/` — shared build/config utilities if any

### Per-framework layout

Each framework gets a single root and a consistent convention:

```
scaffold/
  vanilla/
    base/                    # Full “core” (landing): index.html, js/, components/, icons/, etc.
    variants/
      landing/               # Optional: same as base or symlink; or base IS landing
      docs/                  # (Future) docs layout + sample pages
      dashboard/             # (Future) dashboard layout + sample pages
  astro/
    base/                    # Current astro-core content (layout, pages, config, public, etc.)
    components/              # Or keep at scaffold/astro/ and reference from here
    variants/
      landing/               # Optional overlay (or empty if base = landing)
      docs/                  # Current variants/astro-docs content
      dashboard/             # Current variants/astro-dashboard content
  svelte/
    base/                    # Current svelte-core content
    components/              # Current scaffold/svelte components
    variants/
      landing/
      docs/
      dashboard/
```

**Alternative (minimal move):** Keep `astro-core` and `svelte-core` names but move variants under the framework:

- `scaffold/astro/` — base = astro-core (or merge astro-core into `astro/base/`), `astro/variants/docs`, `astro/variants/dashboard`
- `scaffold/svelte/` — same for svelte-core and svelte variants.

So the rule is: **all framework-specific scaffold files live under `scaffold/<framework>/`**. No separate `scaffold/variants/` at the top level.

### Vanilla

- Today: single `scaffold/vanilla/` with index, js, components, icons.
- Option A: Treat it as “base” and add `scaffold/vanilla/variants/landing` (or leave base as landing and add docs/dashboard later).
- Option B: Introduce `scaffold/vanilla/base/` and move current content there; `variants/landing` can point to or copy from base. Then vanilla uses the same “copy base + overlay variant” pattern as Astro/Svelte.

---

## Proposed CLI flow (honed)

### Single pattern for “create new” (full setup)

For every framework:

1. **Resolve paths** from a single source of truth:
   - `scaffoldRoot = scaffold/<framework>/`
   - `baseDir = scaffold/<framework>/base` (or existing core dir name for backward compat)
   - `variantDir = scaffold/<framework>/variants/<variation>` (landing | docs | dashboard)
2. **Copy base** into project (with replacements). No overwrite; collect skipped files.
3. **Overlay variant** if `variantDir` exists and variation ≠ landing (or if landing has an overlay). Apply same replacements.
4. **Add assets:** CSS, fonts, icons, sfx (framework-specific destinations).
5. **Add components:** from `scaffold/<framework>/components` (or current astro/svelte dirs) per picker.
6. **Post-step:** gitignore, license, RIZZO-SETUP.md for skipped content.

Framework-specific behavior is limited to:

- Where CSS/fonts/sfx go (e.g. `public/css` vs `static/css` vs `css/`).
- How components are copied (Astro/Svelte: copy component files; Vanilla: copy HTML + maybe js/main.js).
- Which placeholders exist in that framework’s templates.

So the main loop is **framework-agnostic**: “copy base → overlay variant → add assets → add components.”

### Add to existing

Unchanged in concept: Landing | Docs | Dashboard | Full. Full uses the same component list and dependency expansion; we only change *where* we read the “base” from (e.g. landing/docs/dashboard overlays vs full variant). Optionally, “full” for add could reuse the same `scaffold/<framework>/variants/full` so that add and create-new share one definition of “full” for that framework.

### Optional: per-framework manifest

To avoid hardcoding variation names and paths in the CLI, add a small manifest per framework, e.g. `scaffold/astro/scaffold.json`:

```json
{
  "base": "base",
  "variations": ["landing", "docs", "dashboard"],
  "placeholders": ["{{DATA_THEME}}", "{{TITLE}}", "{{RIZZO_LAYOUT_IMPORTS}}", ...]
}
```

CLI can read this to:

- Know which variations exist (and only show those that have a `variants/<name>` dir).
- Know which placeholders to replace (could be shared or per-framework).

If we don’t need that flexibility yet, we can keep variations and placeholders in the CLI and just move the scaffold directories.

---

## Migration steps (concrete)

1. **Move variant dirs under each framework**
   - `scaffold/variants/astro-docs` → `scaffold/astro/variants/docs`
   - `scaffold/variants/astro-dashboard` → `scaffold/astro/variants/dashboard`
   - Create `scaffold/astro/variants/landing` (empty or minimal overlay) if we want a single “landing” entry.
   - When Svelte variants exist: `scaffold/variants/svelte-docs` → `scaffold/svelte/variants/docs`, etc.

2. **Optionally rename “core” to “base”**
   - `scaffold/astro-core` → `scaffold/astro/base` (and update `getScaffoldAstroCoreDir()` to point to `scaffold/astro/base`).
   - Same for `svelte-core` → `scaffold/svelte/base`.
   - Keeps one convention: every framework has `scaffold/<fw>/base` and `scaffold/<fw>/variants/<name>`.

3. **CLI: single “scaffold root” and variant path helper**
   - `getScaffoldRoot(framework)` → `scaffold/<framework>/`
   - `getScaffoldBaseDir(framework)` → `scaffold/<framework>/base` (or astro-core/svelte-core for backward compat).
   - `getVariantDir(framework, variation)` → `scaffold/<framework>/variants/<variation>` (only if we move variants; otherwise keep current helper but point to new paths).

4. **CLI: unify create-new flow**
   - One block: get base dir, get variant dir, copy base (no overwrite), overlay variant, then switch on framework only for: copyRizzoCssAndFontsFor*, copyRizzoIcons, copy*Components, copy*Gitignore. So the “scaffold copy” logic is the same for Astro and Svelte; only asset/component steps differ.

5. **Vanilla**
   - Either: keep current vanilla flow and document that “vanilla base = scaffold/vanilla” (no variants yet).
   - Or: move current `scaffold/vanilla` to `scaffold/vanilla/base`, add `scaffold/vanilla/variants/landing` (or leave landing as the default when no overlay). Then implement “copy base + overlay variant” for vanilla so it matches Astro/Svelte and we can add vanilla docs/dashboard later without special-casing.

6. **Docs and package.json**
   - Update TEMPLATES.md and SCAFFOLD-PLAN.md to describe the new layout.
   - Ensure `package.json` `files` includes the new paths (e.g. `scaffold/astro/variants`, `scaffold/svelte/variants`).

---

## Summary

| Idea | Benefit |
|------|--------|
| **All framework scaffold under `scaffold/<framework>/`** | One place to look; easy to add new frameworks or variations. |
| **Unified “base + variant overlay” for create-new** | Same flow for Astro, Svelte, and (if we refactor) Vanilla; fewer branches. |
| **Single path helpers (scaffold root, base, variant)** | CLI doesn’t hardcode multiple dir names; adding a variation = adding a folder. |
| **Optional manifest per framework** | Variations and placeholders can be data-driven later. |

This plan sets us up to hone the CLI flow around a single, framework-first scaffold layout while keeping add-to-existing and shared assets (minimal, starter, shared) intact.
