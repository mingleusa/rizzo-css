# CLI Tool Planning

Planning document for the Rizzo CSS CLI: scope, commands, package shape, and implementation phases.

> **Status**: Planning. Implementation should start after Svelte (and optionally React/Vue) component parity and docs are in place. See [TODO](./TODO.md#-cli-tool-after-frameworks-and-components-are-added).

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

- Prefer **`npx rizzo-css <command>`** or **`npx @rizzo-css/cli <command>`** so we don’t require a global install.
- Optional global install: `npm i -g @rizzo-css/cli` then `rizzo-css init`, etc.

---

## Package Shape

- **Package name**: `@rizzo-css/cli` (or `rizzo-css-cli` if unscoped).
- **Repo**: Can live in this monorepo (e.g. `packages/cli`) or a separate repo; single package is enough to start.
- **Bin**: One binary, e.g. `rizzo-css`, that delegates to subcommands (init, add, theme).
- **Dependencies**: Keep minimal (e.g. Node 18+); use only what’s needed for prompts, file copy, and HTTP if we ever fetch CSS from a CDN).

---

## Implementation Phases

### Phase 1 – Minimum viable

- [ ] Create `packages/cli` (or `cli/`) with `package.json` and bin entry.
- [ ] Implement `init`:
  - Prompt: project name, directory (default current), framework (vanilla, Astro, Svelte).
  - Scaffold: copy `public/css/main.min.css` (or built CSS) into the project; add a minimal HTML template or framework entry that links the CSS and sets `data-theme` if needed.
- [ ] Implement `add`:
  - No scaffold; copy (or symlink) CSS into a configurable path (e.g. `public/css/`, `src/styles/`) and optionally add a line to import it (e.g. in `index.html` or main layout).
- [ ] Publish `@rizzo-css/cli` (or chosen name) to npm.
- [ ] Document in main docs: “Install with CLI” under [Consumption & distribution](./TODO.md).

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
- **Component layer**: Whether `init` should also scaffold Svelte/React components (e.g. copy from `@rizzo-css/svelte`) or only CSS + docs link; defer to post-MVP.

---

## References

- [TODO – CLI tool](./TODO.md#-cli-tool-after-frameworks-and-components-are-added)
- [TODO – Consumption & distribution](./TODO.md#-consumption--distribution-docs--tooling)
- [Getting Started](./GETTING_STARTED.md) – current manual setup (what the CLI should automate)
