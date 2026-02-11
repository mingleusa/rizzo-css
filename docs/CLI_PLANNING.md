# CLI Tool Planning

Planning document for the Rizzo CSS CLI: scope, commands, package shape, and implementation phases.

> **Status**: Implemented. CLI ships in the **rizzo-css** package: `npx rizzo-css init` | `add` | `theme`. **Init** starts with **existing or new?** — **Existing:** add Rizzo to current directory (framework with auto-detect, default theme, optional components). **New:** project location → framework (Vanilla JS / Astro / Svelte, CLI colors: yellow / orange / orange-red) → default theme (single select; all 14 themes are included in the CSS) → components (Astro/Svelte, multi-select). **Components** menu offers "Select all" and "Select none"; you can pick individuals (Space to toggle, Enter to confirm). **New** scaffolds: Vanilla = `scaffold/vanilla/` (full Settings, toast, theme with System); Astro = `scaffold/astro-app/`; Svelte = `scaffold/svelte-app/` (both include theme flash + toast in layout). Component picker uses `scaffold/astro/` and `scaffold/svelte/` (filled by `copy-scaffold.js` on prepublish). **Add** auto-detects Svelte/Astro; supports `--path` and `--framework`.

---

## Goals

- **Lower friction**: Let users add Rizzo CSS to a new or existing project in one command.
- **Framework-agnostic first**: Default to CSS-only (works everywhere); optional framework-specific scaffolds.
- **Consistent with docs**: Same consumption story (download/import CSS, optional components) as the documentation.

---

## Proposed Commands

| Command | Description |
|--------|-------------|
| `npx rizzo-css init` | First menu: **Add to existing** (cwd) or **Create new**. Existing: framework (auto-detect), default theme, optional components → copy CSS + components. New: location → framework → default theme (single select; all 14 themes in CSS) → components; scaffolds default Astro/Svelte app or Vanilla example; optional component files from `scaffold/`. Components: "Select all" / "Select none" or pick individuals (Space=toggle, Enter=confirm). |
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
- [x] **Component selection:** For Astro and Svelte, init prompts “Include components? (y/n)”; if yes, numbered list of 24 components, then copy from `scaffold/astro/` or `scaffold/svelte/` into the project. Scaffold populated by `scripts/copy-scaffold.js` (run in prepublishOnly).

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
