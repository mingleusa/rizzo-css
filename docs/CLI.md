# CLI: design and implementation

This doc describes the Rizzo CSS CLI: commands, package manager handling, config, templates, and current behavior.

---

## Commands

| Command | Purpose |
|--------|---------|
| **`init`** | Add Rizzo to an existing project or create a new one. Asks: framework (Vanilla / Astro / Svelte) → existing vs new. **Existing** → drop in CSS + hand-pick components. **New** → location, then **template or no template**: use a template (Vanilla: full or minimal; Astro/Svelte: minimal) and get that scaffold, or choose no template and get minimal base + hand-pick components. Then package manager. Use `--yes --framework vanilla|astro|svelte` and optional `--template full|minimal` for non-interactive. |
| **`add`** | Same as init → existing: drop in CSS + hand-pick components. Auto-detects framework (or uses **rizzo-css.json**). Copies `rizzo.min.css` to the framework default dir (or `--path`). Prompts for component choice (Astro/Svelte). Prints the `<link>` tag and **install package** command. Supports `--install-package` to run the package manager add command. |
| **`theme`** | List theme IDs (for `data-theme` on `<html>`). |
| **`help`** | Usage, all four runners (npx, pnpm dlx, yarn dlx, bunx), framework create examples, and options. |

---

## Package manager

- **Detection** (no extra dependency) in `packages/rizzo-css/bin/rizzo-css.js`:
  - **Lockfiles:** `pnpm-lock.yaml` → pnpm, `yarn.lock` → yarn, `bun.lockb` → bun, `package-lock.json` / `npm-shrinkwrap.json` → npm.
  - **Fallback:** `package.json` → `packageManager` or `devEngines.packageManager`; parse and use if one of `npm`, `pnpm`, `yarn`, `bun`.
  - **Order:** Lockfile first, then `packageManager`, then `devEngines.packageManager`. If nothing found, we still resolve to a PM (e.g. for “create new”) via prompt or default npm.

- **Where we use it**
  - **`init` → Create new:** We prompt “Package manager (for install and run commands)” with npm, pnpm, yarn, bun; the **detected** one is listed first. The printed “install && dev” command uses the **selected** PM.
  - **`init` → Add to existing** / **`add`:** We detect only (no prompt). Printed commands use the detected PM (or **rizzo-css.json** `packageManager`).
  - **Command map:** We use `getPackageManagerCommands(pm)` so we never hardcode a single PM: `install`, `add(pkg)`, `addDev(pkg)`, `run(script)`, `dlx(pkgAndArgs)` for npx / pnpm dlx / yarn dlx / bunx.

---

## Config: rizzo-css.json

Optional **rizzo-css.json** in the project root: `{ "targetDir", "framework", "packageManager" }`.

- **Read** in `add` and `init`: used for targetDir, framework, and packageManager when present.
- **Write** with `init --write-config`: writes the file in the scaffolded project with targetDir, framework, and selected package manager.
- Detection (lockfiles + `packageManager` field) still runs; config overrides when set.

---

## Templates (create new)

When the user chooses **Use a template** (not “No template”):

| Framework | Template | Result |
|-----------|----------|--------|
| Vanilla | **full** | index.html + theme switcher, js/main.js, icons, README, LICENSE. |
| Vanilla | **minimal** | index.html + CSS, README, LICENSE. |
| Astro | **minimal** | astro-minimal scaffold: config, one page, README, LICENSE, .env.example, public/css/rizzo.min.css. |
| Svelte | **minimal** | svelte-minimal scaffold: config, one page, README, LICENSE, .env.example, static/css/rizzo.min.css. |

**No template:** User chooses “No template — minimal base + hand-pick components”. They get the same minimal base as above (per framework) plus a component picker (Astro/Svelte); Vanilla gets minimal base only (no component files). Every scaffold includes LICENSE; Astro/Svelte also include package.json and .env.example.

With `init --yes`, default template is **full** for Vanilla and **minimal** for Astro/Svelte. Use `--template minimal` or `--template full` (Vanilla) to override.

---

## Options summary

**init:** `--yes`, `--framework vanilla|astro|svelte`, `--template full|minimal`, `--install`, `--no-install`, `--write-config`.

**add:** `--path <dir>`, `--framework vanilla|astro|svelte`, `--install-package`, `--no-install`.

---

## Checklist (current state)

- [x] **Invocation:** Document and support npx, pnpm dlx, yarn dlx, bunx.
- [x] **Project’s PM:** Use detected (or chosen) PM for printed install/add/run commands.
- [x] **Init (new):** Template or no template (hand-pick). Template choice: Vanilla full/minimal; Astro/Svelte minimal only. Package manager prompted. Every scaffold includes LICENSE, README; Astro/Svelte include package.json and .env.example.
- [x] **Add / init (existing):** Drop in CSS + hand-pick components. Detect framework and PM; print correct commands and “To install the package: …”.
- [x] **Config file:** Optional rizzo-css.json; read in add and init; `init --write-config` writes it.
- [x] **Run install:** `add --install-package` runs pm.add('rizzo-css'); `init --install` runs pm.install after scaffold (minimal/hand-pick Astro/Svelte); `--no-install` skips.
- [x] **--yes:** `init --yes` scaffolds new in cwd with defaults (framework: astro, template: minimal; PM: config or detected). Supports `--framework` and `--template`.
- [x] **Docs:** GETTING_STARTED includes Detection + config/options; help shows all options and examples.
