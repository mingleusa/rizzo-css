# CLI Tool Planning

**Internal planning.** For user-facing CLI usage see [GETTING_STARTED](./GETTING_STARTED.md).

Planning document for the Rizzo CSS CLI: scope, commands, package shape, and implementation phases.

> **Status**: Implemented. CLI ships in the **rizzo-css** package: `npx rizzo-css init` | `add` | `theme`. **Init** starts with **framework** (Vanilla JS / Astro / Svelte, CLI colors: yellow / orange / orange-red), then **existing or new?** — **Existing:** framework → **What to include?** (CSS only / Recommended set / All components / Pick components) → if ThemeSwitcher chosen, optional default-theme prompt → copy CSS + components. **New:** location → themes → **What to include?** (same four options for Astro/Svelte; Vanilla gets full scaffold with no component picker) → full clone. **What to include?** keeps the CLI simple: most users choose Recommended or All; only "Pick components" shows the 25-item multi-select. **New** scaffolds: Vanilla = `scaffold/vanilla/` (full Settings, toast, theme with System); Astro = `scaffold/astro-app/`; Svelte = `scaffold/svelte-app/`. **Add** auto-detects Svelte/Astro; supports `--path` and `--framework`.

---

## Goals

- **Lower friction**: Let users add Rizzo CSS to a new or existing project in one command.
- **Framework-agnostic first**: Default to CSS-only (works everywhere); optional framework-specific scaffolds.
- **Consistent with docs**: Same consumption story (download/import CSS, optional components) as the documentation.

---

## Proposed Commands

| Command | Description |
|--------|-------------|
| `npx rizzo-css init` | First: **framework** (Vanilla / Astro / Svelte). Then: **Add to existing** or **Create new**. **What to include?** (Astro/Svelte only): CSS only / Recommended set (10 components) / All (25) / Pick (multi-select). New: location → themes → same include choice → full clone. Vanilla: no component picker; full scaffold for new. |
| `npx rizzo-css add` | Add Rizzo CSS to the current project. Auto-detects Svelte/Astro and copies to `static/css` or `public/css`; use `--path <dir>` or `--framework vanilla|astro|svelte` to override. |
| `npx rizzo-css theme` | List all 14 theme IDs (for use with `data-theme` on `<html>`). |
| `npx rizzo-css upgrade` *(later)* | Check for updates and optionally update CSS/package version. |

**Invocation**

- **`npx rizzo-css <command>`** — no global install. Same package as the CSS.
- Optional global: `npm i -g rizzo-css` then `rizzo-css init`, etc.

---

## Package Shape

**Recommended: ship the CLI from the same rizzo-css package.** Add a `bin` entry to `packages/rizzo-css/package.json` (e.g. `"bin": { "rizzo-css": "./cli.js" }`). One package, one publish; users get CSS and CLI from `pnpm add rizzo-css` or `npx rizzo-css`. CLI code can live in the package (e.g. `packages/rizzo-css/cli.js` or `bin/`). Keep CLI dependencies minimal (Node 18+; only what’s needed for prompts, file copy, optional HTTP).

**Current:** CLI ships from the same **rizzo-css** package (`bin/rizzo-css.js`). One package, one publish. Optional separate package only if we need to version the CLI independently.

---

## Implementation Phases

### Phase 1 – Minimum viable

- [x] Add CLI to **rizzo-css** package: `bin` entry in `packages/rizzo-css/package.json` (`"rizzo-css": "./bin/rizzo-css.js"`) and `bin/rizzo-css.js`.
- [x] Implement `init`: interactive menus (project location, framework: Vanilla JS / Astro / Svelte, themes multi-select, components multi-select for Astro/Svelte). Vanilla uses `scaffold/vanilla/index.html`; Astro/Svelte copy from `scaffold/` when selected.
- [x] Implement `add`: copy CSS; auto-detect Svelte/Astro; default paths `static/css` or `public/css`; `--path` and `--framework` support.
- [x] Implement `theme`: list 14 theme IDs.
- [x] Document in [Getting Started](./GETTING_STARTED.md): “Quick start with CLI” via `npx rizzo-css init` / `add`.
- [x] **Component selection:** For Astro and Svelte, init asks **What to include?** — CSS only / Recommended set (10) / All (25) / Pick (multi-select). Only “Pick” shows the full list; Recommended and All avoid a long menu. Scaffold populated by `scripts/copy-scaffold.js` (run in prepublishOnly).

### Phase 2 – Themes and options

- [x] `init`: default theme (single select); all 14 themes included in CSS; selected theme sets initial `data-theme` in scaffold.
- [ ] `theme` command: optionally copy a theme override file.
- [ ] Optional: `--css-only` flag to skip any framework-specific files.

### Phase 3 – Enhancements

- [ ] `init` for React/Vue (e.g. Vite + Rizzo CSS + minimal setup).
- [ ] `upgrade` (or `update`): check latest version, suggest or apply update for the CSS/package reference).
- [ ] Config file (e.g. `rizzo-css.json`) for project-specific defaults (paths, theme).

---

## Open Questions

- **Source of CSS**: Bundle built CSS in the CLI package vs. download from CDN/github release on first run. Bundling is simpler and works offline.
- **Themes**: Ship theme list + snippets in the CLI, or point to docs/URLs. Shipping a small set of theme files keeps init/add self-contained.
- **Component layer**: Done for Svelte and Astro — CLI copies selected components from `scaffold/svelte/` or `scaffold/astro/` (icons included for Astro). React/Vue: later.

---

## References

- [TODO – Package, CLI & scaffold tasks](./TODO.md#package-cli--scaffold-tasks)
- [Getting Started](./GETTING_STARTED.md) – setup and CLI usage
