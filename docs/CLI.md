# CLI: design and implementation

This doc describes the Rizzo CSS CLI: commands, package manager handling, config, templates, and current behavior.

---

## Commands

| Command | Purpose |
|--------|---------|
| **`init`** | Add Rizzo to an existing project or create a new one. Asks: framework (Vanilla / Astro / Svelte) → existing vs new. **Existing** → drop in CSS + hand-pick components. **New** → location, then **Full** (everything) | **Minimal** (recommended) | **Manual** (pick components). Then package manager. Use `--yes --framework vanilla|astro|svelte` and optional `--template full|minimal|manual` for non-interactive. |
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
  - **`init` → Create new:** We prompt “Package manager (for install and run commands)” with npm, pnpm, yarn, bun; the **detected** one is listed first. Use **`--package-manager npm|pnpm|yarn|bun`** to skip the prompt (or with `--yes` to choose PM non-interactively). The printed “install && dev” command uses the **selected** PM.
  - **`init` → Add to existing** / **`add`:** We detect only (no prompt). Printed commands use the detected PM (or **rizzo-css.json** `packageManager`, or **`--package-manager`** override).
  - **Command map:** We use `getPackageManagerCommands(pm)` so we never hardcode a single PM: `install`, `add(pkg)`, `addDev(pkg)`, `run(script)`, `dlx(pkgAndArgs)` for npm / pnpm / yarn / bun.
  - **Asset paths:** CSS and static assets go to **framework-appropriate dirs** via `getFrameworkCssPaths(framework)`: Astro `public/css` and `public/assets/fonts` (CLI rewrites font URLs to `/assets/fonts/` in the copied CSS); Svelte `static/css` and `static/assets/fonts` (CLI rewrites font URLs to `/assets/fonts/`); Vanilla `css` (+ `css/fonts`). See [GETTING_STARTED – Where the CLI puts CSS and assets](./GETTING_STARTED.md#where-the-cli-puts-css-and-assets-per-framework).

---

## Config: rizzo-css.json

Optional **rizzo-css.json** in the project root. Recognized keys:

| Key | Purpose |
|-----|---------|
| `targetDir` | Directory where `rizzo.min.css` is copied (e.g. `public/css`, `static/css`, `css`). Used by `add`; for Astro the CLI uses `public/css` and `public/assets/fonts` regardless. |
| `framework` | `vanilla` \| `astro` \| `svelte`. Skips framework prompt when set. |
| `packageManager` | `npm` \| `pnpm` \| `yarn` \| `bun`. Used for printed install/add commands. |

- **Read** in `add` and `init`: used for targetDir, framework, and packageManager when present.
- **Write:** On init (create new) and add/init (existing), the CLI **updates** `rizzo-css.json` with targetDir, framework, and packageManager. Any other keys in the file are **preserved** (merge write). Future runs use it for detection.
- Detection (lockfiles + `packageManager` in package.json) still runs; config overrides when set.

---

## Templates (create new)

When the user chooses **Full, Minimal, or Manual**:

| Framework | Option | Result |
|-----------|--------|--------|
| Vanilla | **full** | index.html + theme switcher, js/main.js, icons, component showcase, README-RIZZO.md, LICENSE-RIZZO. |
| Vanilla | **minimal** | index.html + CSS + js/main.js + recommended component pages in `components/` + icons, README-RIZZO.md, LICENSE-RIZZO. |
| Vanilla | **manual** | index.html + CSS; component picker opens with minimal set pre-selected — add/remove then confirm (or pick none). README-RIZZO.md, LICENSE-RIZZO. |
| Astro | **full** | Astro app + all 25 components. |
| Astro | **minimal** | Astro app + recommended components (Button, Badge, Card, Modal, Tabs, ThemeSwitcher, FormGroup, Alert, Toast, Dropdown). |
| Astro | **manual** | minimal base + component picker (minimal set pre-selected). |
| Svelte | **full** | SvelteKit app + all 25 components. |
| Svelte | **minimal** | SvelteKit app + recommended components. |
| Svelte | **manual** | minimal base + component picker (minimal set pre-selected). |

Every scaffold includes **LICENSE-RIZZO** and **README-RIZZO.md** (does not overwrite project LICENSE/README); Astro/Svelte also include package.json and .env.example. With `init --yes`, default is **full**; use `--template minimal` or `--template manual` to override.

---

## Options summary

**init:** `--yes`, `--framework vanilla|astro|svelte`, `--template full|minimal|manual`, `--package-manager npm|pnpm|yarn|bun`, `--install`, `--no-install`. New projects always get `rizzo-css.json`; interactive run prompts “Run install now? (Y/n)” for Astro/Svelte.

**add:** `--path <dir>`, `--framework vanilla|astro|svelte`, `--package-manager npm|pnpm|yarn|bun`, `--install-package`, `--no-install`.

---

## Checklist (current state)

- [x] **Invocation:** Document and support npx, pnpm dlx, yarn dlx, bunx.
- [x] **Project’s PM:** Use detected (or chosen) PM for printed install/add/run commands.
- [x] **Init (new):** Template or no template (hand-pick). Full | Minimal | Manual (per framework). Manual shows component picker with minimal set pre-selected. Package manager prompted. Every scaffold includes LICENSE-RIZZO, README-RIZZO.md; Astro/Svelte include package.json and .env.example.
- [x] **Add / init (existing):** Drop in CSS + hand-pick components. Detect framework and PM; print correct commands and “To install the package: …”.
- [x] **Config file:** rizzo-css.json is always written (targetDir, framework, packageManager) for both new and existing projects; read in add and init.
- [x] **Run install:** `add --install-package` runs pm.add('rizzo-css'); `init --install` runs pm.install after scaffold (minimal/hand-pick Astro/Svelte); `--no-install` skips.
- [x] **--yes:** `init --yes` scaffolds new in cwd with defaults (framework: astro, template: full; PM: config or detected). Supports `--framework` and `--template`.
- [x] **Docs:** GETTING_STARTED includes Detection + config/options; help shows all options and examples.
