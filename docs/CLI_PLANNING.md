# CLI Tool Planning

Planning document for the Rizzo CSS CLI: scope, commands, package shape, and implementation phases.

> **Status**: Implemented (Phase 1 + component selection). CLI ships in the **rizzo-css** package; `npx rizzo-css init` | `add` | `theme`. Init prompts for framework (vanilla / Astro / Svelte) and optional component picker for Astro and Svelte (24 components). Scaffold templates are in `packages/rizzo-css/scaffold/` (filled by `scripts/copy-scaffold.js` on prepublish).

---

## Goals

- **Lower friction**: Let users add Rizzo CSS to a new or existing project in one command.
- **Framework-agnostic first**: Default to CSS-only (works everywhere); optional framework-specific scaffolds.
- **Consistent with docs**: Same consumption story (download/import CSS, optional components) as the documentation.

---

## Proposed Commands

| Command | Description |
|--------|-------------|
| `npx rizzo-css init` | Scaffold a new project (or add to current directory). Prompts: project name, framework (vanilla / Astro / Svelte / React / Vue), theme (default or pick one), optional component layer. |
| `npx rizzo-css add` | Add Rizzo CSS to an existing project: copies or links built CSS (and optionally base HTML/body setup), no full scaffold. |
| `npx rizzo-css theme` | List themes or add a theme file (e.g. copy a theme CSS snippet into the project). |
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
- [x] Implement `init`: prompt (project name, framework: vanilla / Astro / Svelte, theme); scaffold with built CSS and minimal `index.html` that links CSS and sets `data-theme`.
- [x] Implement `add`: copy CSS to current project (default `./css/` or `--path`); print `<link>` to add.
- [x] Implement `theme`: list 14 theme IDs.
- [x] Document in [Getting Started](./GETTING_STARTED.md): “Quick start with CLI” via `npx rizzo-css init` / `add`.
- [x] **Component selection:** For Astro and Svelte, init prompts “Include components? (y/n)”; if yes, numbered list of 24 components, then copy from `scaffold/astro/` or `scaffold/svelte/` into the project. Scaffold populated by `scripts/copy-scaffold.js` (run in prepublishOnly).

### Phase 2 – Themes and options

- [ ] `theme` command: list available themes (from docs or bundled list), optionally copy a theme override file.
- [ ] `init` / `add`: optional theme selection (default theme vs. one of the 14).
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

- [TODO – CLI tool](./TODO.md#-cli-tool-after-frameworks-and-components-are-added)
- [TODO – Consumption & distribution](./TODO.md#-consumption--distribution-docs--tooling)
- [Getting Started](./GETTING_STARTED.md) – current manual setup (what the CLI should automate)
