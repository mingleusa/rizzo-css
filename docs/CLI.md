# CLI: design and implementation

This doc describes the Rizzo CSS CLI: commands, package manager handling, config, templates, and current behavior.

---

## Commands

| Command | Purpose |
|--------|---------|
| **`init`** | Add Rizzo to an existing project or scaffold a new one. Asks: framework (Vanilla / Astro / Svelte) → existing vs new → (for new) **template** → themes, components, package manager. **Templates:** Vanilla = full (theme switcher, js, icons, README) or minimal (HTML + CSS only); Astro/Svelte = full-app (complete project) or minimal (CSS + single HTML). Use `--yes --framework vanilla|astro|svelte` and optional `--template full-app|full|minimal` for non-interactive. |
| **`add`** | Copy `rizzo.min.css` into the current project. Auto-detects framework (Svelte/Astro) and target dir; uses **rizzo-css.json** if present. Prints the `<link>` tag and **install package** command for the detected PM. Supports `--install-package` to run the package manager add command. |
| **`theme`** | List theme IDs (for `data-theme` on `<html>`). |
| **`help`** | Usage, all four runners (npx, pnpm dlx, yarn dlx, bunx), framework create examples, and options. |

---

## Package manager

- **Detection** (no extra dependency) in `packages/rizzo-css/bin/rizzo-css.js`:
  - **Lockfiles:** `pnpm-lock.yaml` → pnpm, `yarn.lock` → yarn, `bun.lockb` → bun, `package-lock.json` / `npm-shrinkwrap.json` → npm.
  - **Fallback:** `package.json` → `packageManager` or `devEngines.packageManager`; parse and use if one of `npm`, `pnpm`, `yarn`, `bun`.
  - **Order:** Lockfile first, then `packageManager`, then `devEngines.packageManager`. If nothing found, we still resolve to a PM (e.g. for “create new”) via prompt or default npm.

- **Where we use it**
  - **`init` → Create new:** We prompt “Package manager (for install and run commands)” with npm, pnpm, yarn, bun; the **detected** one is listed first with “(detected)”. The printed “install && dev” command uses the **selected** PM.
  - **`init` → Add to existing:** We detect only (no prompt). Printed commands use the detected PM.
  - **`add`:** We detect only (or use **rizzo-css.json** `packageManager`). We print the correct `<link>` tag and “To install the package (CLI + components): …”; with `--install-package` we run the add command.

- **Command map:** We use `getPackageManagerCommands(pm)` so we never hardcode a single PM: `install`, `add(pkg)`, `addDev(pkg)`, `run(script)`, `dlx(pkgAndArgs)` for npx / pnpm dlx / yarn dlx / bunx.

---

## Config: rizzo-css.json

Optional **rizzo-css.json** in the project root: `{ "targetDir", "framework", "packageManager" }`.

- **Read** in `add` and `init`: used for targetDir, framework, and packageManager when present.
- **Write** with `init --write-config`: writes the file in the scaffolded project with targetDir, framework, and selected package manager.
- Detection (lockfiles + `packageManager` field) still runs; config overrides when set.

---

## Templates (create new)

| Framework | Template | Result |
|-----------|----------|--------|
| Vanilla | **full** | index.html + theme switcher, js/main.js, icons, README. |
| Vanilla | **minimal** | index.html + CSS link only. |
| Astro | **full-app** | Full Astro project from scaffold (astro-app) + Rizzo CSS. |
| Astro | **minimal** | public/css/rizzo.min.css + public/index.html with link. |
| Svelte | **full-app** | Full SvelteKit project from scaffold (svelte-app) + Rizzo CSS. |
| Svelte | **minimal** | static/css/rizzo.min.css + static/index.html with link. |

With `init --yes`, default template is **full** for Vanilla and **full-app** for Astro/Svelte. Use `--template minimal` or `--template full` (Vanilla) to override.

---

## Options summary

**init:** `--yes`, `--framework vanilla|astro|svelte`, `--template full-app|full|minimal`, `--install`, `--no-install`, `--write-config`.

**add:** `--path <dir>`, `--framework vanilla|astro|svelte`, `--install-package`, `--no-install`.

---

## Checklist (current state)

- [x] **Invocation:** Document and support npx, pnpm dlx, yarn dlx, bunx.
- [x] **Project’s PM:** Use detected (or chosen) PM for printed install/add/run commands.
- [x] **Init (new):** Prompt for package manager with detected suggested; print “install && dev” for that PM. Template choice (full-app / full / minimal) per framework.
- [x] **Add / init (existing):** Detect only; print correct commands and “To install the package: …”.
- [x] **Config file:** Optional rizzo-css.json; read in add and init; `init --write-config` writes it.
- [x] **Run install:** `add --install-package` runs pm.add('rizzo-css'); `init --install` runs pm.install after scaffold (full-app only); `--no-install` skips.
- [x] **--yes:** `init --yes` scaffolds new in cwd with defaults (framework: astro, template: full-app or full for vanilla; PM: config or detected). Supports `--framework` and `--template`.
- [x] **Docs:** GETTING_STARTED includes Detection + config/options; help shows all options and examples.
