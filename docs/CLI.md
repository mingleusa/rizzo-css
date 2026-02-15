# CLI: design and implementation

This doc describes the Rizzo CSS CLI: commands, package manager handling, config, templates, and current behavior.

---

## Commands

| Command | Purpose |
|--------|---------|
| **`init`** | Add Rizzo to an existing project or create a new one. Framework → existing vs new. **Existing** → drop in CSS + hand-pick components. **New** → location, **Full** \| **Minimal** \| **Manual**, then package manager. `--yes --framework vanilla|astro|svelte`; vanilla default template is **minimal**. Optional `--template full|minimal|manual`. If cwd is not empty when creating in cwd, prompts to continue. |
| **`add`** | Same as init → existing: CSS + hand-pick components. Writes **RIZZO-SNIPPET.txt** (link + theme) unless `--no-snippet`. If CSS exists at target, prompts to overwrite (`--force` to skip). Vanilla: `--vanilla-js` or prompt to copy `js/main.js` for interactive components. `--readme` writes README-RIZZO.md. |
| **`theme`** | List theme IDs for `data-theme` on `<html>`. |
| **`doctor`** | Check config, CSS file at configured path, and (Astro/Svelte) whether layout includes the stylesheet link. |
| **`help`** | Usage, runners (npx, pnpm dlx, yarn dlx, bunx), framework examples, options. |

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
| `targetDir` | Where `rizzo.min.css` is copied (e.g. `public/css`, `static/css`, `css`). |
| `framework` | `vanilla` \| `astro` \| `svelte`. Skips framework prompt. |
| `packageManager` | `npm` \| `pnpm` \| `yarn` \| `bun`. Used for printed commands. |
| `theme` | Default theme ID; written by add/init; used by doctor and snippet. |

- **Read** in add and init. **Write:** CLI merges targetDir, framework, packageManager, theme; unknown keys are preserved.
- Detection (lockfiles + `packageManager` in package.json) still runs; config overrides when set.

---

## Templates (create new)

When the user chooses **Full, Minimal, or Manual**:

| Framework | Option | Result |
|-----------|--------|--------|
| Vanilla | **full** | index.html + theme switcher, js/main.js, icons, component showcase, README-RIZZO.md, LICENSE-RIZZO. |
| Vanilla | **minimal** | index.html + CSS + js/main.js + recommended component pages in `components/` + icons, README-RIZZO.md, LICENSE-RIZZO. |
| Vanilla | **manual** | index.html + CSS; component picker opens with minimal set pre-selected — add/remove then confirm (or pick none). README-RIZZO.md, LICENSE-RIZZO. |
| Astro | **full** | Astro app + all components (with dependencies so everything works). |
| Astro | **minimal** | Astro app + recommended set (includes any required dependencies). |
| Astro | **manual** | minimal base + pick components (list shows which add others). |
| Svelte | **full** | SvelteKit app + all components (with dependencies so everything works). |
| Svelte | **minimal** | SvelteKit app + recommended set (includes any required dependencies). |
| Svelte | **manual** | minimal base + pick components (list shows which add others). |

Every scaffold includes **LICENSE-RIZZO**, **README-RIZZO.md**, and **.gitignore** (from scaffold); Astro/Svelte also include package.json and .env.example. With `init --yes`, default template is **minimal** for vanilla and **full** for Astro/Svelte; use `--template` to override.

**Full** = all components with all required dependencies (e.g. Settings adds ThemeSwitcher + themes). **Minimal** = recommended set (Button, Badge, Card, Modal, Tabs, ThemeSwitcher, FormGroup, Alert, Toast, Dropdown, Navbar, Search, Settings, Accordion, CopyToClipboard); any component in that set that requires others gets them automatically. **Manual** = component picker; the list shows which components add others (e.g. "Settings (adds ThemeSwitcher)"). Run `npx rizzo-css help components` for the full dependency list.

---

## Component dependencies

When you add or pick components, the CLI automatically includes everything each component needs:

| Component | Adds automatically (Astro & Svelte) |
|-----------|-------------------------------------|
| **Settings** | ThemeSwitcher (and themes.ts) |
| **Toast** | Alert |

**ThemeIcon** and **ThemeSwitcher** both trigger copying of `themes.ts` (and Svelte `theme.ts`) when selected. For **Astro**, they also trigger copying of `scaffold/utils/theme.ts` to `src/components/utils/theme.ts` (import fixed to `../rizzo/themes`) so ThemeSwitcher’s `../utils/theme` import resolves. Icons are always copied when any component is selected.

- **Every component automatically includes what it needs:** Navbar adds Search and Settings; Settings adds ThemeSwitcher (and themes); Toast adds Alert. The CLI expands these before copying so the navbar search bar and gear button, settings panel, and toasts work without extra steps.
- **Full** and **Minimal** templates expand the component list with these dependencies before copying, so everything works out of the box.
- **Manual** (and `add`): the picker shows labels like "Navbar (adds Search, Settings)" and "Settings (adds ThemeSwitcher)"; after you confirm, the CLI copies the expanded set.
- To see the full list: `npx rizzo-css help components`. It lists every component and which others are added automatically (Navbar → Search, Settings; Settings → ThemeSwitcher; Toast → Alert).

---

## Options summary

**init:** `--yes`, `--framework`, `--template full|minimal|manual`, `--package-manager`, `--install`, `--no-install`. Vanilla with `--yes` defaults to template **minimal**. Non-empty cwd prompts to continue.

**add:** `--path <dir>`, `--framework`, `--package-manager`, `--install-package`, `--no-install`, `--no-snippet` (skip RIZZO-SNIPPET.txt), `--readme` (write README-RIZZO.md), `--force` (overwrite CSS without prompt), `--vanilla-js` (copy js/main.js for Vanilla). If CSS already exists, prompts unless `--force`.

---

## Checklist (current state)

- [x] **Invocation:** Document and support npx, pnpm dlx, yarn dlx, bunx.
- [x] **Project’s PM:** Use detected (or chosen) PM for printed install/add/run commands.
- [x] **Init (new):** Template or no template (hand-pick). Full | Minimal | Manual (per framework). Manual shows component picker with minimal set pre-selected. Package manager prompted. Every scaffold includes LICENSE-RIZZO, README-RIZZO.md, .gitignore; Astro/Svelte include package.json and .env.example.
- [x] **Add / init (existing):** Drop in CSS + hand-pick components. Detect framework and PM; print correct commands and “To install the package: …”.
- [x] **Config file:** rizzo-css.json is always written (targetDir, framework, packageManager) for both new and existing projects; read in add and init.
- [x] **Run install:** `add --install-package` runs pm.add('rizzo-css'); `init --install` runs pm.install after scaffold (minimal/hand-pick Astro/Svelte); `--no-install` skips.
- [x] **--yes:** `init --yes` scaffolds new in cwd; vanilla default template is **minimal**; Astro/Svelte default **full**. Non-empty cwd prompts.
- [x] **add:** Writes RIZZO-SNIPPET.txt by default; `--no-snippet`, `--readme`, `--force`, `--vanilla-js`. CSS overwrite prompt when file exists. Config includes `theme`.
- [x] **doctor:** Checks config, CSS path, layout link hint.
- [x] **Config:** `theme` key supported; unknown keys preserved on write.
- [x] **Docs:** GETTING_STARTED, CLI_FLOWS; help shows options and `help components` (with copy paths per framework).
