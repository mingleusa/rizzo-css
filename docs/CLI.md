# CLI: design and implementation

This doc describes the Rizzo CSS CLI: commands, flows, package manager handling, config, templates, and current behavior.

---

## Flows: Create new vs Add to existing

| Flow | Entry | What gets written |
|------|--------|-------------------|
| **Create new** | `npx rizzo-css init` → “Create new project”, or `init --yes` | Scaffold (base + template), CSS, fonts, icons, components, **rizzo-css.json**, **LICENSE-RIZZO**, **README-RIZZO.md**, **.gitignore**. Stylesheet link is already in the scaffold. |
| **Add to existing** | `npx rizzo-css add` or `init` → “Add to existing” | CSS, fonts, icons, components (per template), **rizzo-css.json**, **RIZZO-SETUP.md**. Full = also **RIZZO-SNIPPET.txt** (link + theme). User adds the `<link>` (CLI prints it). |

**Short:** Create new = full scaffold + config + license/readme/gitignore. Add = drop-in CSS + components + config only; you add the stylesheet link yourself.

**Add behavior:** All templates write **RIZZO-SETUP.md**. Full also writes **RIZZO-SNIPPET.txt** (copy-paste link + theme) unless `--no-snippet`. If CSS already exists at target, prompts to overwrite unless `--force`. Vanilla + interactive components: prompt or `--vanilla-js` to copy `js/main.js`. **Create new in cwd:** If directory is not empty (e.g. package.json, src/, index.html), prompts “Continue? (y/n)”.

---

## Commands

| Command | Purpose |
|--------|---------|
| **`init`** | Add Rizzo to an existing project or create a new one. Framework → existing vs new. **Existing** → template (Landing | Docs | Dashboard | Full). **New** → location (**current directory** or **enter path or project name** — one prompt; relative or absolute), **Landing** \| **Docs** \| **Dashboard** \| **Full**, then package manager. Install runs in the project directory (CLI runs the package manager’s install there). For Vanilla there is no install step; the CLI prints the path so you can `cd` there and open or serve the folder. `--yes --framework vanilla|astro|svelte`; optional `--path <dir>` to scaffold into a specific directory. Optional `--template landing|docs|dashboard|full` (default **landing** with `--yes`), `--install` / `--no-install`. If target directory is not empty, prompts to continue. |
| **`add`** | Same as init → existing: template **Landing** \| **Docs** \| **Dashboard** \| **Full**. Full = also RIZZO-SNIPPET.txt; others = CSS + component picker; writes **RIZZO-SETUP.md** (all) and **RIZZO-SNIPPET.txt** (link + theme) unless `--no-snippet`. If CSS exists at target, prompts to overwrite (`--force` to skip). Vanilla Full: `--vanilla-js` or prompt to copy `js/main.js`. `--readme` writes README-RIZZO.md. |
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

## Templates (create new and add to existing)

Templates: **Landing** | **Docs** | **Dashboard** | **Full** (same for create new and add to existing).

| Framework | Template | Result |
|-----------|----------|--------|
| Vanilla | **Landing** | CSS, fonts, icons, RIZZO-SETUP.md. |
| Vanilla | **Docs** | Landing + docs layout overlay (sidebar + sample doc). |
| Vanilla | **Dashboard** | Landing + dashboard layout overlay. |
| Vanilla | **Full** | index + js/main.js, icons, all component pages (all or pick). |
| Astro | **Landing** | Full Astro base + hero/features page; 56 or pick components. |
| Astro | **Docs** | Base + docs layout + sidebar. |
| Astro | **Dashboard** | Base + dashboard layout. |
| Astro | **Full** | Clone of Rizzo docs site (no picker). |
| Svelte | **Landing** / **Docs** / **Dashboard** | Same pattern as Astro; 56 or pick. |
| Svelte | **Full** | Clone of Rizzo docs site (no picker). |

Every scaffold includes **LICENSE-RIZZO**, **README-RIZZO.md**, **.gitignore**; Astro/Svelte include package.json and .env.example. `init --yes` defaults to **landing**; use `--template landing|docs|dashboard|full`.

**Full** = site clone; no component picker. **Landing** / **Docs** / **Dashboard** = all components or pick (dependencies auto-included). Run `npx rizzo-css help components` for the list.

---

## Component dependencies

When you add or pick components, the CLI automatically includes everything each component needs:

| Component | Adds automatically (Astro & Svelte) |
|-----------|-------------------------------------|
| **Settings** | ThemeSwitcher, FontSwitcher, SoundEffects (and themes.ts), config/fonts.ts (font pairs) |
| **Toast** | Alert |

**ThemeIcon** and **ThemeSwitcher** both trigger copying of `themes.ts` (and Svelte `theme.ts`) when selected. For **Astro**, they also trigger copying of `scaffold/utils/theme.ts` to `src/components/utils/theme.ts` (import fixed to `../rizzo/themes`) so ThemeSwitcher’s `../utils/theme` import resolves. Icons are always copied when any component is selected.

- **Every component automatically includes what it needs:** Navbar adds Search and Settings; Settings adds ThemeSwitcher, FontSwitcher, SoundEffects (and themes) and, when added, copies config/fonts.ts so the font-pair switcher works; Toast adds Alert. The CLI expands these before copying so the navbar search bar and gear button, settings panel, and toasts work without extra steps.
- **Full** template (and add with Full) expands the component list with these dependencies before copying, so everything works out of the box.
- **Full** (and `add` with Full): the picker shows labels like "Navbar (adds Search, Settings)" and "Settings (adds ThemeSwitcher, FontSwitcher, SoundEffects)"; after you confirm, the CLI copies the expanded set.
- To see the full list: `npx rizzo-css help components`. It lists every component and which others are added automatically (Navbar → Search, Settings; Settings → ThemeSwitcher, FontSwitcher, SoundEffects; Toast → Alert).

---

## Options summary

**init:** `--yes`, `--path <dir>`, `--framework`, `--template landing|docs|dashboard|full` (default **landing** with `--yes`), `--package-manager`, `--install`, `--no-install`. Non-empty target prompts to continue.

**add:** `--path <dir>`, `--framework`, `--template landing|docs|dashboard|full`, `--no-snippet`, `--readme`, `--force`, `--vanilla-js`. CSS exists → prompts unless `--force`.

---

## Checklist (current state)

- [x] **Invocation:** Document and support npx, pnpm dlx, yarn (npx; Yarn 1 has no dlx), bunx.
- [x] **Project’s PM:** Use detected (or chosen) PM for printed install/add/run commands.
- [x] **Init (new):** Template: Landing | Docs | Dashboard | Full. Full = site clone; others = component picker with all interactive components pre-selected. Package manager prompted. Every scaffold includes LICENSE-RIZZO, README-RIZZO.md, .gitignore; Astro/Svelte include package.json and .env.example.
- [x] **Add / init (existing):** Same template choice. Landing/Docs/Dashboard = picker (all 56 or pick). Full = RIZZO-SNIPPET.txt too. All templates write RIZZO-SETUP.md; Full also writes RIZZO-SNIPPET.txt. Detect framework and PM; print correct commands and “To install the package: …”.
- [x] **Config file:** rizzo-css.json is written only when the project does not already have one (targetDir, framework, packageManager, theme); read in add and init.
- [x] **Run install:** `add --install-package` runs pm.add('rizzo-css') in cwd; `init` runs pm.install **in the project directory** after scaffold (with `--install` or when user confirms). `--no-install` skips.
- [x] **Project path:** Init supports `--path <dir>` (with `--yes`) and interactive **enter path or project name** (one prompt; empty = current directory). Resolved relative to cwd or absolute; scaffold and install run in that directory. "Next step" shows `cd <relative-path> &&` when project is not cwd.
- [x] **--yes:** `init --yes` scaffolds new in cwd (or in `--path <dir>`); default template is **landing**. Non-empty target directory prompts.
- [x] **add:** Writes RIZZO-SETUP.md (all templates); Full also RIZZO-SNIPPET.txt unless `--no-snippet`. `--template landing|docs|dashboard|full`, `--readme`, `--force`, `--vanilla-js`. Config includes `theme`.
- [x] **doctor:** Checks config, CSS path, layout link hint.
- [x] **Config:** `theme` key supported; unknown keys preserved on write.
- [x] **Docs:** GETTING_STARTED, this doc (CLI.md); help shows options and `help components` (with copy paths per framework).
