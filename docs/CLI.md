# CLI: design and implementation

This doc describes the Rizzo CSS CLI: commands, flows, package manager handling, config, templates, and current behavior.

---

## Flows: Create new vs Add to existing

| Flow | Entry | What gets written |
|------|--------|-------------------|
| **Create new** | `npx rizzo-css init` → “Create new project”, or `init --yes` | Scaffold (base + template), CSS, fonts, icons, components, **rizzo-css.json**, **LICENSE-RIZZO**, **README-RIZZO.md**, **.gitignore**. Stylesheet link is already in the scaffold. |
| **Add to existing** | `npx rizzo-css add` or `init` → “Add to existing” | CSS, fonts, icons, chosen components, **rizzo-css.json**, optionally **RIZZO-SNIPPET.txt** (link + theme). No scaffold, no LICENSE/README/.gitignore. User adds the `<link>` (CLI prints it). |

**Short:** Create new = full scaffold + config + license/readme/gitignore. Add = drop-in CSS + components + config only; you add the stylesheet link yourself.

**Add behavior:** Writes **RIZZO-SNIPPET.txt** by default (copy-paste link + theme); use `--no-snippet` to skip. If CSS already exists at target, prompts to overwrite unless `--force`. Vanilla + interactive components: prompt or `--vanilla-js` to copy `js/main.js`. **Create new in cwd:** If directory is not empty (e.g. package.json, src/, index.html), prompts “Continue? (y/n)”.

---

## Commands

| Command | Purpose |
|--------|---------|
| **`init`** | Add Rizzo to an existing project or create a new one. Framework → existing vs new. **Existing** → drop in CSS + hand-pick components. **New** → location (**current directory** or **enter path or project name** — one prompt; relative or absolute), **Core** \| **Manual**, then package manager. Install runs in the project directory (CLI runs the package manager’s install there). For Vanilla there is no install step; the CLI prints the path so you can `cd` there and open or serve the folder. `--yes --framework vanilla|astro|svelte`; optional `--path <dir>` to scaffold into a specific directory. Optional `--template core|manual` (default **core**), `--install` / `--no-install`. If target directory is not empty, prompts to continue. |
| **`add`** | Same as init → existing: CSS + hand-pick components. Writes **RIZZO-SNIPPET.txt** (link + theme) unless `--no-snippet`. If CSS exists at target, prompts to overwrite (`--force` to skip). Vanilla: `--vanilla-js` or prompt to copy `js/main.js` for interactive components. `--readme` writes README-RIZZO.md. |
| **`theme`** | List theme IDs for `data-theme` on `<html>`. |
| **`doctor`** | Check config, CSS file at configured path, and (Astro/Svelte) whether layout includes the stylesheet link. |
| **`help`** | Usage, runners (npx, pnpm dlx, yarn: npx, bunx), framework examples, options. |

---

## Package manager

**Running the CLI (without installing):** **npm** → `npx rizzo-css <command>`; **pnpm** → `pnpm dlx rizzo-css <command>`; **yarn** → `npx rizzo-css <command>` (Yarn 1 classic has no `dlx`, so we use npx for yarn so it works everywhere; Yarn 2+ can use `yarn dlx` if preferred); **bun** → `bunx rizzo-css <command>`.

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
| `targetDir` | Where `rizzo.min.css` is copied (e.g. `public/css`, `static/css`, `css`). |
| `framework` | `vanilla` \| `astro` \| `svelte`. Skips framework prompt. |
| `packageManager` | `npm` \| `pnpm` \| `yarn` \| `bun`. Used for printed commands. |
| `theme` | Default theme ID; written by add/init; used by doctor and snippet. |

- **Read** in add and init. **Write:** CLI merges targetDir, framework, packageManager, theme; unknown keys are preserved.
- Detection (lockfiles + `packageManager` in package.json) still runs; config overrides when set.

---

## Templates (create new)

When the user chooses **Core or Manual**:

| Framework | Option | Result |
|-----------|--------|--------|
| Vanilla | **core** | index.html + theme switcher, js/main.js, icons, component showcase, README-RIZZO.md, LICENSE-RIZZO. |
| Vanilla | **manual** | index.html + CSS; component picker opens with all interactive components pre-selected — add/remove then confirm (or pick none). README-RIZZO.md, LICENSE-RIZZO. |
| Astro | **core** | Astro app + all components (with dependencies so everything works). |
| Astro | **manual** | Astro base + pick components (list shows which add others). |
| Svelte | **core** | SvelteKit app + all components (with dependencies so everything works). |
| Svelte | **manual** | SvelteKit base + pick components (list shows which add others). |

Every scaffold includes **LICENSE-RIZZO**, **README-RIZZO.md**, and **.gitignore** (from scaffold); Astro/Svelte also include package.json and .env.example. With `init --yes`, default template is **core**; use `--template core|manual` to override.

**Core** = all 33 components with all required dependencies (e.g. Settings adds ThemeSwitcher, FontSwitcher, SoundEffects + themes). **Manual** = component picker with all 33 pre-selected; the list shows which components add others (e.g. "Settings (adds ThemeSwitcher, FontSwitcher, SoundEffects)"). Run `npx rizzo-css help components` for the full dependency list.

**Components per template:**

| Template | Vanilla | Astro | Svelte |
|----------|---------|-------|--------|
| **Core** | 33 | 33 | 33 |
| **Manual** | 0–33 (user choice) | 0–33 | 0–33 |

(Core = all 33 scaffold components; Manual = whatever you pick, all 33 pre-selected. Astro/Svelte Core auto-include dependencies so Navbar, Settings, Toast work.)

---

## Component dependencies

When you add or pick components, the CLI automatically includes everything each component needs:

| Component | Adds automatically (Astro & Svelte) |
|-----------|-------------------------------------|
| **Settings** | ThemeSwitcher, FontSwitcher, SoundEffects (and themes.ts), config/fonts.ts (font pairs) |
| **Toast** | Alert |

**ThemeIcon** and **ThemeSwitcher** both trigger copying of `themes.ts` (and Svelte `theme.ts`) when selected. For **Astro**, they also trigger copying of `scaffold/utils/theme.ts` to `src/components/utils/theme.ts` (import fixed to `../rizzo/themes`) so ThemeSwitcher’s `../utils/theme` import resolves. Icons are always copied when any component is selected.

- **Every component automatically includes what it needs:** Navbar adds Search and Settings; Settings adds ThemeSwitcher, FontSwitcher, SoundEffects (and themes) and, when added, copies config/fonts.ts so the font-pair switcher works; Toast adds Alert. The CLI expands these before copying so the navbar search bar and gear button, settings panel, and toasts work without extra steps.
- **Core** template expands the component list with these dependencies before copying, so everything works out of the box.
- **Manual** (and `add`): the picker shows labels like "Navbar (adds Search, Settings)" and "Settings (adds ThemeSwitcher, FontSwitcher, SoundEffects)"; after you confirm, the CLI copies the expanded set.
- To see the full list: `npx rizzo-css help components`. It lists every component and which others are added automatically (Navbar → Search, Settings; Settings → ThemeSwitcher, FontSwitcher, SoundEffects; Toast → Alert).

---

## Options summary

**init:** `--yes`, `--path <dir>` (project directory: relative to cwd or absolute; scaffold and install run there), `--framework`, `--template core|manual`, `--package-manager`, `--install`, `--no-install`. Interactive: project location = **current directory** or **enter path or project name** (one prompt; empty = current directory). Install always runs in the project directory. With `--yes`, default template is **core**. Non-empty target directory prompts to continue.

**add:** `--path <dir>`, `--framework`, `--package-manager`, `--install-package`, `--no-install`, `--no-snippet` (skip RIZZO-SNIPPET.txt), `--readme` (write README-RIZZO.md), `--force` (overwrite CSS without prompt), `--vanilla-js` (copy js/main.js for Vanilla). If CSS already exists, prompts unless `--force`.

---

## Checklist (current state)

- [x] **Invocation:** Document and support npx, pnpm dlx, yarn (npx; Yarn 1 has no dlx), bunx.
- [x] **Project’s PM:** Use detected (or chosen) PM for printed install/add/run commands.
- [x] **Init (new):** Template or no template (hand-pick). Core | Manual (per framework). Manual shows component picker with all interactive components pre-selected. Package manager prompted. Every scaffold includes LICENSE-RIZZO, README-RIZZO.md, .gitignore; Astro/Svelte include package.json and .env.example.
- [x] **Add / init (existing):** Drop in CSS + hand-pick components. Detect framework and PM; print correct commands and “To install the package: …”.
- [x] **Config file:** rizzo-css.json is written only when the project does not already have one (targetDir, framework, packageManager, theme); read in add and init.
- [x] **Run install:** `add --install-package` runs pm.add('rizzo-css') in cwd; `init` runs pm.install **in the project directory** after scaffold (with `--install` or when user confirms). `--no-install` skips.
- [x] **Project path:** Init supports `--path <dir>` (with `--yes`) and interactive **enter path or project name** (one prompt; empty = current directory). Resolved relative to cwd or absolute; scaffold and install run in that directory. "Next step" shows `cd <relative-path> &&` when project is not cwd.
- [x] **--yes:** `init --yes` scaffolds new in cwd (or in `--path <dir>`); default template is **core** (all frameworks). Non-empty target directory prompts.
- [x] **add:** Writes RIZZO-SNIPPET.txt by default; `--no-snippet`, `--readme`, `--force`, `--vanilla-js`. CSS overwrite prompt when file exists. Config includes `theme`.
- [x] **doctor:** Checks config, CSS path, layout link hint.
- [x] **Config:** `theme` key supported; unknown keys preserved on write.
- [x] **Docs:** GETTING_STARTED, this doc (CLI.md); help shows options and `help components` (with copy paths per framework).
