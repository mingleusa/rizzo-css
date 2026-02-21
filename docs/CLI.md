# CLI: design and implementation

This doc describes the Rizzo CSS CLI: commands, flows, package manager handling, config, templates, and current behavior.

---

## Flows: Create new vs Add to existing

| Flow | Entry | What gets written |
|------|--------|-------------------|
| **Create new** | `npx rizzo-css init` → “Create new project”, or `init --yes` | Scaffold (base + template), CSS, fonts, icons, components, **rizzo-css.json**, **LICENSE-RIZZO**, **README-RIZZO.md**, **.gitignore**. Stylesheet link is already in the scaffold. |
| **Add to existing** | `npx rizzo-css add` or `init` → “Add to existing” | CSS, fonts, icons, chosen components, **rizzo-css.json**, Full = also **RIZZO-SNIPPET.txt** (link + theme). All write **RIZZO-SETUP.md**. Minimal/Starter = no component copy. User adds the `<link>` (CLI prints it). User adds the `<link>` (CLI prints it). |

**Short:** Create new = full scaffold + config + license/readme/gitignore. Add = drop-in CSS + components + config only; you add the stylesheet link yourself.

**Add behavior:** All templates write **RIZZO-SETUP.md**. Full also writes **RIZZO-SNIPPET.txt** (copy-paste link + theme) unless `--no-snippet`. If CSS already exists at target, prompts to overwrite unless `--force`. Vanilla + interactive components: prompt or `--vanilla-js` to copy `js/main.js`. **Create new in cwd:** If directory is not empty (e.g. package.json, src/, index.html), prompts “Continue? (y/n)”.

---

## Commands

| Command | Purpose |
|--------|---------|
| **`init`** | Add Rizzo to an existing project or create a new one. Framework → existing vs new. **Existing** → same template choice (Minimal | Starter | Full). **New** → location (**current directory** or **enter path or project name** — one prompt; relative or absolute), **Minimal** \| **Starter** \| **Full**, then package manager. Install runs in the project directory (CLI runs the package manager’s install there). For Vanilla there is no install step; the CLI prints the path so you can `cd` there and open or serve the folder. `--yes --framework vanilla|astro|svelte`; optional `--path <dir>` to scaffold into a specific directory. Optional `--template minimal|starter|full` (default **full** with `--yes`), `--install` / `--no-install`. If target directory is not empty, prompts to continue. |
| **`add`** | Same as init → existing: choose **Minimal**, **Starter**, or **Full**. Full = CSS + component picker; writes **RIZZO-SETUP.md** (all) and **RIZZO-SNIPPET.txt** (link + theme) unless `--no-snippet`. If CSS exists at target, prompts to overwrite (`--force` to skip). Vanilla Full: `--vanilla-js` or prompt to copy `js/main.js`. `--readme` writes README-RIZZO.md. |
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

When the user chooses **Minimal**, **Starter**, or **Full** (same choice for both create new and add to existing):

| Framework | Option | Result |
|-----------|--------|--------|
| Vanilla | **Minimal** | CSS, fonts, icons, sfx + **RIZZO-SETUP.md** (no overwrite). |
| Vanilla | **Starter** | Same as Minimal + minimal index.html only if missing; otherwise snippets in RIZZO-SETUP.md. |
| Vanilla | **Full** | index.html (or snippet) + theme switcher, js/main.js, icons, 34 component pages; existing files skipped, snippets in RIZZO-SETUP.md. Choose all 34 or pick. |
| Astro | **Minimal** / **Starter** | CSS, fonts, icons, sfx + RIZZO-SETUP.md (Starter adds minimal layout/page only if missing). |
| Astro | **Full** | Astro app base + all or pick 34 components (dependencies auto-included). |
| Svelte | **Minimal** / **Starter** | Same as Astro (Starter adds minimal layout/page only if missing). |
| Svelte | **Full** | SvelteKit app base + all or pick 34 components (dependencies auto-included). |

Every scaffold includes **LICENSE-RIZZO**, **README-RIZZO.md**, and **.gitignore** (from scaffold); Astro/Svelte also include package.json and .env.example. With `init --yes`, default template is **full**; use `--template minimal|starter|full` to override. Legacy `core` and `manual` map to **full**.

**Full** = all 34 components or pick (picker has all 34 pre-selected); dependencies (e.g. Settings → ThemeSwitcher, FontSwitcher, SoundEffects; Navbar → Search, Settings; Toast → Alert) are expanded automatically. Run `npx rizzo-css help components` for the full dependency list.

**Components per template:**

| Template | Vanilla | Astro | Svelte |
|----------|---------|-------|--------|
| **Minimal** / **Starter** | 0 (CSS + RIZZO-SETUP.md only) | 0 | 0 |
| **Full** | 0–34 (user choice; all pre-selected) | 0–34 | 0–34 |

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

**init:** `--yes`, `--path <dir>` (project directory: relative to cwd or absolute; scaffold and install run there), `--framework`, `--template minimal|starter|full`, `--package-manager`, `--install`, `--no-install`. Interactive: project location = **current directory** or **enter path or project name** (one prompt; empty = current directory). Install always runs in the project directory. With `--yes`, default template is **full**. Non-empty target directory prompts to continue.

**add:** `--path <dir>`, `--framework`, `--template minimal|starter|full`, `--package-manager`, `--install-package`, `--no-install`, `--no-snippet` (skip RIZZO-SNIPPET.txt for Full), `--readme` (write README-RIZZO.md), `--force` (overwrite CSS without prompt), `--vanilla-js` (copy js/main.js for Vanilla). If CSS already exists, prompts unless `--force`.

---

## Checklist (current state)

- [x] **Invocation:** Document and support npx, pnpm dlx, yarn (npx; Yarn 1 has no dlx), bunx.
- [x] **Project’s PM:** Use detected (or chosen) PM for printed install/add/run commands.
- [x] **Init (new):** Template: Minimal | Starter | Full (same for new and existing). Minimal | Starter | Full (per framework). Full shows component picker with all interactive components pre-selected. Package manager prompted. Every scaffold includes LICENSE-RIZZO, README-RIZZO.md, .gitignore; Astro/Svelte include package.json and .env.example.
- [x] **Add / init (existing):** Same template choice (Minimal | Starter | Full). Full = same assets + component picker (all 34 or pick). All templates write RIZZO-SETUP.md; Full also writes RIZZO-SNIPPET.txt. Detect framework and PM; print correct commands and “To install the package: …”.
- [x] **Config file:** rizzo-css.json is written only when the project does not already have one (targetDir, framework, packageManager, theme); read in add and init.
- [x] **Run install:** `add --install-package` runs pm.add('rizzo-css') in cwd; `init` runs pm.install **in the project directory** after scaffold (with `--install` or when user confirms). `--no-install` skips.
- [x] **Project path:** Init supports `--path <dir>` (with `--yes`) and interactive **enter path or project name** (one prompt; empty = current directory). Resolved relative to cwd or absolute; scaffold and install run in that directory. "Next step" shows `cd <relative-path> &&` when project is not cwd.
- [x] **--yes:** `init --yes` scaffolds new in cwd (or in `--path <dir>`); default template is **full** (all frameworks). Non-empty target directory prompts.
- [x] **add:** Writes RIZZO-SETUP.md (all templates); Full also writes RIZZO-SNIPPET.txt unless `--no-snippet`. `--template minimal|starter|full`, `--readme`, `--force`, `--vanilla-js`. CSS overwrite prompt when file exists. Config includes `theme`.
- [x] **doctor:** Checks config, CSS path, layout link hint.
- [x] **Config:** `theme` key supported; unknown keys preserved on write.
- [x] **Docs:** GETTING_STARTED, this doc (CLI.md); help shows options and `help components` (with copy paths per framework).
