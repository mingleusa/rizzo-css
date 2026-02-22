# CLI Tool Planning

**Internal planning.** For user-facing CLI usage see [GETTING_STARTED](../GETTING_STARTED.md).

Planning document for the Rizzo CSS CLI: scope, commands, package shape, and implementation phases.

> **Status**: Implemented. CLI ships in the **rizzo-css** package: `npx rizzo-css init` | `add` | `theme` | `doctor` | `help`. **Init:** framework (Vanilla / Astro / Svelte) → existing or new. **Existing** (or `add`): same template choice (Landing | Docs | Dashboard | Full). **New:** **Landing**, **Docs**, **Dashboard**, or **Full** (per framework) → package manager. Full = site clone; Landing/Docs/Dashboard = component picker (all 56 or pick). (npm, pnpm, yarn, bun; detected suggested). **rizzo-css.json** (targetDir, framework, packageManager, theme) written only when the project does not already have a config file. **Add** uses config and detection; `--install-package` runs pm add. Non-interactive: `init --yes --framework vanilla|astro|svelte` and `--template landing|docs|dashboard|full`, `--install`, `--no-install`. See [CLI.md](../CLI.md).

**Docs site:** The [Getting Started](/docs/getting-started) page and the home page include a **package manager tabbed selector** (npm, pnpm, yarn, bun): users click a tab to select their manager, then use the copy button to copy the CLI command. Each tab shows the appropriate command (e.g. `npx rizzo-css init`, `pnpm dlx rizzo-css init`). The **yarn** tab shows `npx` so it works with Yarn 1 and 2+ (Yarn 1 has no `dlx`).

---

## Goals

- **Lower friction**: Let users add Rizzo CSS to a new or existing project in one command.
- **Framework-agnostic first**: Default to CSS-only (works everywhere); optional framework-specific scaffolds.
- **Consistent with docs**: Same consumption story (download/import CSS, optional components) as the documentation.

---

## Proposed Commands

| Command | Description |
|--------|-------------|
| `npx rizzo-css init` | First: **framework** (Vanilla / Astro / Svelte). Then: **Add to existing** or **Create new** (same template choice: Landing | Docs | Dashboard | Full). **New:** **Landing**, **Docs**, **Dashboard**, or **Full** (per framework) → package manager. Package ships scaffold/vanilla, astro-core, svelte-core, astro/, svelte/. |
| `npx rizzo-css add` | Add Rizzo CSS to the current project. Auto-detects Svelte/Astro and copies to `static/css` or `public/css`; use `--path <dir>` or `--framework vanilla|astro|svelte` to override. |
| `npx rizzo-css theme` | List all 14 theme IDs (for use with `data-theme` on `<html>`). |
| `npx rizzo-css upgrade` *(later)* | Check for updates and optionally update CSS/package version. |

**Invocation**

- **`npx rizzo-css <command>`** — no global install. Same package as the CSS.
- Optional global: `npm i -g rizzo-css` then `rizzo-css init`, etc.

---

## Package Shape

**Recommended: ship the CLI from the same rizzo-css package.** Add a `bin` entry to `packages/rizzo-css/package.json` (e.g. `"bin": { "rizzo-css": "./cli.js" }`). One package, one publish; users get CSS and CLI from `pnpm add rizzo-css` or `npx rizzo-css`. CLI code can live in the package (e.g. `packages/rizzo-css/cli.js` or `bin/`). Keep CLI dependencies minimal (Node 18+; only what's needed for prompts, file copy, optional HTTP).

**Current:** CLI ships from the same **rizzo-css** package (`bin/rizzo-css.js`). One package, one publish. Optional separate package only if we need to version the CLI independently.

---

## Implementation Phases

### Phase 1 – Minimum viable

- [x] Add CLI to **rizzo-css** package: `bin` entry in `packages/rizzo-css/package.json` (`"rizzo-css": "./bin/rizzo-css.js"`) and `bin/rizzo-css.js`.
- [x] Implement `init`: interactive menus (project location, framework: Vanilla JS / Astro / Svelte, themes multi-select, components multi-select for Astro/Svelte). Vanilla uses `scaffold/vanilla/index.html`; Astro/Svelte copy from `scaffold/` when selected.
- [x] Implement `add`: copy CSS; auto-detect Svelte/Astro; default paths `static/css` or `public/css`; `--path` and `--framework` support.
- [x] Implement `theme`: list 14 theme IDs.
- [x] Document in [Getting Started](../GETTING_STARTED.md): "Quick start with CLI" via `npx rizzo-css init` / `add`.
- [x] **Component selection:** **Full** = site clone (no picker); **Landing** / **Docs** / **Dashboard** give component picker (all 56 or pick). (and minimal index only if missing for Starter) (Astro/Svelte). Scaffold populated by `scripts/copy-scaffold.js` and `prepare-vanilla-scaffold.js` (run in prepublishOnly). Package ships scaffold/vanilla, astro-core, svelte-core, astro/, svelte/.

### Phase 2 – Themes and options

- [x] `init`: default theme (single select); all 14 themes included in CSS; selected theme sets initial `data-theme` in scaffold.
- [ ] `theme` command: optionally copy a theme override file.
- [ ] Optional: `--css-only` flag to skip any framework-specific files.

### Phase 3 – Enhancements

- [ ] `init` for React/Vue (e.g. Vite + Rizzo CSS + minimal setup).
- [ ] `upgrade` (or `update`): check latest version, suggest or apply update for the CSS/package reference).
- [x] Config file (`rizzo-css.json`) for targetDir, framework, packageManager, theme; written only when no existing config; read in add/init.

---

## Open Questions

- **Source of CSS**: Bundle built CSS in the CLI package vs. download from CDN/github release on first run. Bundling is simpler and works offline.
- **Themes**: Ship theme list + snippets in the CLI, or point to docs/URLs. Shipping a small set of theme files keeps init/add self-contained.
- **Component layer**: Done for Svelte and Astro — CLI copies selected components from `scaffold/svelte/` or `scaffold/astro/` (icons included for Astro). React/Vue: later.

---

## References

- [TODO – Package, CLI & scaffold tasks](../TODO.md#package-cli--scaffold-tasks)
- [Getting Started](../GETTING_STARTED.md) – setup and CLI usage
- [CLI design and implementation](../CLI.md) – CLI commands, package manager (npm / pnpm / yarn / bun), config, templates
