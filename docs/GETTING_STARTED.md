# Getting Started

This guide will help you get started with Rizzo CSS. The documentation site is available at **[rizzo-css.vercel.app](https://rizzo-css.vercel.app)**.

## Features

- **Using Rizzo** — Install from npm, clone + build, or CDN; import CSS once; use Astro or Svelte components. React/Vue: same CSS; wrappers planned. See [Using Rizzo in your project](#using-rizzo-in-your-project).
- **CLI** — `npx rizzo-css init` | `add` | `theme` | `doctor` | `help`. See [CLI at a glance](#cli-at-a-glance).
- **Package** — [rizzo-css](https://www.npmjs.com/package/rizzo-css): dist, CLI, scaffolds for Vanilla, Astro, Svelte. **Templates:** **Landing** (hero/features), **Docs** (sidebar + sample doc), **Dashboard** (sidebar + stats/table), **Full** (site clone). Landing/Docs/Dashboard get full framework + all components (all or pick); Full = site clone. We never overwrite; snippets in RIZZO-SETUP.md. Add → same templates; Full writes RIZZO-SNIPPET.txt unless `--no-snippet`. Scaffolds include LICENSE-RIZZO, README-RIZZO.md, .gitignore; Astro/Svelte include package.json and .env.example.
- **Vanilla** — No node_modules. **Landing** = CSS + RIZZO-SETUP.md. **Docs** / **Dashboard** = landing + layout overlay. **Full** = index + components/ + js + icons. Add component JS via [Vanilla docs](https://rizzo-css.vercel.app/docs/vanilla/components) or copy `js/main.js` from Full.
- **CDN** — unpkg, jsDelivr; pin `.../rizzo-css@<version>/dist/rizzo.min.css`.
- **Icons** — 52 total (30 Tabler, 22 devicons); same for Astro, Svelte, Vanilla.

---

## CLI at a glance

| Command | What it does |
|--------|----------------|
| `npx rizzo-css init` | Framework (Vanilla / Astro / Svelte) → add to existing or create new. **New** → location, then template **Landing** \| **Docs** \| **Dashboard** \| **Full**, then package manager. **Full** = site clone (no picker); others = all 56 or pick components. `--yes --path <dir>` non-interactive. |
| `npx rizzo-css add` | Same template choice (Landing \| Docs \| Dashboard \| Full). CSS + components; writes RIZZO-SETUP.md; Full also RIZZO-SNIPPET.txt unless `--no-snippet`. `--readme`, `--force`, `--vanilla-js`. |
| `npx rizzo-css theme` | List 14 theme IDs for `data-theme`. |
| `npx rizzo-css doctor` | Check config, CSS path, layout link. |

**Run by package manager:** npm and yarn → `npx rizzo-css <command>` (yarn tab shows npx so it works with Yarn 1 and 2+); pnpm → `pnpm dlx rizzo-css <command>`; bun → `bunx rizzo-css <command>`. Use the docs site tabs to copy the command for your manager.

**Config:** **rizzo-css.json** `{ "targetDir", "framework", "packageManager", "theme" }`; unknown keys preserved. Init: **--yes**, **--path &lt;dir&gt;** (project directory), **--framework**, **--template landing|docs|dashboard|full**, **--package-manager**, **--install** / **--no-install**. Add: **--path** (CSS target dir), **--template landing|docs|dashboard|full**, **--install-package**, **--no-snippet**, **--readme**, **--force**, **--vanilla-js**. **Templates:** Landing = hero/features page; Docs = documentation layout + sidebar; Dashboard = app dashboard layout; Full = clone of the Rizzo docs site (all components). All templates get full framework + Rizzo; Landing/Docs/Dashboard then prompt for all 56 or pick components. `npx rizzo-css help components` lists components and copy paths.

**Component dependencies:** Navbar adds Search and Settings; Settings adds ThemeSwitcher, FontSwitcher, SoundEffects; Toast adds Alert. Full includes these automatically; picker shows e.g. "Navbar (adds Search, Settings)". When you add **Settings** via the CLI (Astro or Svelte), the CLI also copies **scaffold/config/fonts.ts** into your project (Astro: `src/components/config/fonts.ts`; Svelte: `src/lib/config/fonts.ts`) so the font-pair dropdown works. List: `npx rizzo-css help components`. **Component counts:** Full = site clone; Landing/Docs/Dashboard = all 56 or pick (all frameworks).

**Tip:** Use the **package manager tabs** on the [Getting Started](https://rizzo-css.vercel.app/docs/getting-started) docs page (npm, pnpm, yarn, bun): click a tab to select your manager, then copy the command. **Yarn users:** the yarn tab shows `npx` so the command works with Yarn 1 and 2+ (Yarn 1 has no `dlx`). **Create new:** CLI prompts for package manager so the printed "install && dev" command matches. **Add to existing** or `add`: CLI prints the exact `<link>` tag; it does not edit your layout. To use the official create command plus Rizzo: `npm create svelte@latest my-app && cd my-app && npx rizzo-css add` (or Astro/pnpm/yarn/bun equivalents). 
---

## Using Rizzo in your project

Rizzo CSS is **framework-agnostic**: the **same CSS and component styles** are included for **Vanilla JS**, Astro, and Svelte. All three get full theming and the same BEM component markup; we provide reference implementations and docs for each. For React and Vue, see [React and Vue (planned)](#react-and-vue-planned) below.

### Step 1: Get the CSS

**Option A — Quick start with CLI:**

On the [docs site](https://rizzo-css.vercel.app/docs/getting-started), use the **Install the npm package** or **Run the CLI** tabs (npm, pnpm, yarn, bun): click a tab to select your manager, then use the copy button. Or run:

```bash
npx rizzo-css init
```

**First:** choose framework (Vanilla / Astro / Svelte). **Then:** add to existing or create new. **Existing** (or `add`) → choose **Landing** \| **Docs** \| **Dashboard** \| **Full**; CLI prints the `<link>` tag. **New** → location, then template (Landing / Docs / Dashboard / Full), then package manager. **Full** = site clone; others = all 56 or pick components.

```bash
npx rizzo-css add
# or: npx rizzo-css add --path public/css
```

List themes: `npx rizzo-css theme`.

**Option B — Install from npm:**

On the [docs site](https://rizzo-css.vercel.app/docs/getting-started), use the **Install the npm package** tabs (npm, pnpm, yarn, bun) to copy the command for your manager. Or run:

```bash
npm install rizzo-css
# or: pnpm add rizzo-css   or   yarn add rizzo-css   or   bun add rizzo-css
```

Package: [npmjs.com/package/rizzo-css](https://www.npmjs.com/package/rizzo-css).

**Option C — Clone and build (for full source or to contribute):**

1. Clone this repo, install dependencies, and build:
   ```bash
   git clone https://github.com/mingleusa/rizzo-css.git
   cd rizzo-css
   pnpm install
   pnpm build:css
   ```
2. Use **`public/css/main.min.css`** (docs site) or **`packages/rizzo-css/dist/rizzo.min.css`** (package build).

**Option D — Release assets:**  
Download the built CSS from [GitHub Releases](https://github.com/mingleusa/rizzo-css/releases) when available.

### Step 2: Import the CSS

Import the CSS **once** in your app (root layout or main entry):

- **If you used npm with a bundler (Vite, Astro, webpack, etc.):** `import 'rizzo-css'` in your main JS or root layout.
- **If you used npm but have no bundler (plain HTML):** Use a CDN: `<link rel="stylesheet" href="https://unpkg.com/rizzo-css@latest/dist/rizzo.min.css" />` or the jsDelivr equivalent. Or copy the built file from `node_modules/rizzo-css/dist/rizzo.min.css` into your `public/` or `static/` folder and link to that path.
- **If you cloned and built:** Add a `<link>` or `import` to `public/css/main.min.css` (docs site) or `packages/rizzo-css/dist/rizzo.min.css` (package).

### Installation by framework

Follow the steps below for your chosen framework. Each path assumes you have the CSS (via [Step 1](#step-1-get-the-css) and [Step 2](#step-2-import-the-css)); the CLI prints the exact `<link>` tag when you run `init` or `add`.

#### Vanilla JS

1. **New:** `npx rizzo-css init` → Vanilla → template (Landing | Docs | Dashboard | Full). **Full** = index + components/ + js + icons. **Landing** = CSS + RIZZO-SETUP.md.
2. **Add:** `npx rizzo-css add`; add the printed `<link>` to your HTML.
3. **CSS:** CLI writes `css/rizzo.min.css`. Link in HTML or use CDN (README-RIZZO.md).
4. **Components:** Same BEM as [Components](/docs/components). Full includes `js/main.js`; see [Vanilla components](/docs/vanilla/components).

#### Astro

1. **New:** `npx rizzo-css init` → Astro → template. **Add:** `npm create astro@latest my-app && cd my-app && npx rizzo-css add`. Add printed `<link>` to root layout.
2. **CSS:** `public/css/rizzo.min.css` → `<link rel="stylesheet" href="/css/rizzo.min.css" />`.
3. **Components:** Copied to e.g. `src/components/rizzo/`; same BEM as [Components](/docs/components).

#### Svelte (SvelteKit)

1. **New:** `npx rizzo-css init` → Svelte → template. **Add:** `npm create svelte@latest my-app && cd my-app && npx rizzo-css add`. Add printed `<link>` to `app.html`.
2. **CSS:** `static/css/rizzo.min.css` → `<link rel="stylesheet" href="/css/rizzo.min.css" />`.
3. **Components:** `src/lib/rizzo/`; `import { Button, Modal, Tabs } from '$lib/rizzo'`. See [Svelte docs](/docs/svelte).

### Step 3: Use components (Vanilla JS)

- **Same CSS and styles:** Vanilla gets the same CSS and BEM as Astro and Svelte. **Full** template = showcase + js + icons + all component pages. **Landing** / **Docs** / **Dashboard** = add JS later from [Vanilla docs](https://rizzo-css.vercel.app/docs/vanilla/components) or copy `js/main.js` from a Full scaffold. CSS → `css/rizzo.min.css` or CDN (README-RIZZO.md). Theme in `localStorage` key `theme`; `system` for OS light/dark.
- **Class names and structure:** Use the same BEM classes and HTML structure as in the [Components documentation](/docs/components) (e.g. `btn`, `btn--primary`, `card`, `card__body`). For copy-paste HTML and interactive demos per component, see the [Vanilla component pages](/docs/vanilla/components). Interactive components (Modal, Dropdown, Tabs, Search, Navbar, Settings, Copy to clipboard, etc.) are wired by `js/main.js` when you use the Full scaffold; they work when you copy the component from the package or docs. Tooltips use CSS only (:hover and :focus-within); no script required. **Search** and **Dropdown** Vanilla pages use the same Astro component for their live examples so behavior matches Astro and Svelte; Search trigger uses the Cmd icon (same size as the search icon).
- **Keyboard and click-outside:** All overlays and menus are keyboard-navigable (Tab, Escape, arrows where applicable) and close when you click outside: **Search** overlay (click backdrop or Escape; focus trap inside panel), **Settings** panel (click overlay or Escape; focus trap), **Navbar** mobile menu (click outside or Escape). Same behavior in Astro and Svelte scaffolds.

### Step 4: Use components (Astro)

- **Reference implementation:** This repo is an Astro app. Use the Astro components from `src/components/` directly if your project is Astro, or copy the markup and class names from the component source or the [component docs](/docs/components).
- **Scaffold:** Astro layout includes **theme flash prevention** and **toast**. Package includes **Navbar**, **Search**, **Settings** in `scaffold/astro/` (lightweight versions). Add via CLI (templates **Landing** | **Docs** | **Dashboard** | **Full**) or copy from this repo.
- **Class names and structure:** All components use BEM classes (e.g. `btn`, `btn--primary`, `navbar`, `navbar__container`). Apply the same HTML structure and class names as in the [Components documentation](/docs/components). **Interactive components run their scripts after DOM ready**, so Navbar, Settings, Modal, Dropdown, Tabs, Accordion, Search, etc. work when imported without extra setup. **Keyboard and click-outside:** Search, Settings, and the Navbar mobile menu all close on Escape and when clicking outside (backdrop/overlay); Search and Settings use focus trapping inside the panel. Each component doc page has **Astro | Svelte | Vanilla** code tabs with complete, copy-paste examples.

### Step 5: Use components (Svelte)

- **Svelte components:** This repo includes Svelte versions of most components in `src/components/svelte/`, using the **same BEM classes** as the Astro reference. Copy that folder (and `index.ts`) into your Svelte app, or run `npx rizzo-css init` and choose Svelte + components.
  ```js
  import { Button, Badge, Card, Modal, Tabs, /* ... */ } from '$lib/rizzo';
  ```
- **Scaffold:** Svelte `app.html` includes **theme flash prevention** and **toast**. Package includes **Navbar**, **Search**, **Settings** in `scaffold/svelte/` (lightweight versions). Add via CLI or copy from this repo.
- **Docs and examples:** The docs site has a full Svelte section at **[/docs/svelte](/docs/svelte)** with component pages and a Vanilla section at **[/docs/vanilla/components](/docs/vanilla/components)** with copy-paste HTML, optional JS, and live demos. Use the **framework switcher** ("View as: Astro | Svelte | Vanilla") on any component or theme page to switch views.
- **Themes:** Set the theme via `data-theme` on `<html>` (e.g. `github-dark-classic`, `github-light`). Persist with `localStorage` key `theme`; use `system` for OS preference. Theme IDs are in [Theming](./THEMING.md#available-themes). The same CSS and theme variables apply.

### React and Vue (planned)

The **same CSS and BEM class names** work in React and Vue. We do not yet ship React or Vue component implementations or framework-specific docs. To use Rizzo today in a React or Vue project:

1. Get and import the CSS as in [Step 1](#step-1-get-the-css) and [Step 2](#step-2-import-the-css).
2. Use the [Components documentation](/docs/components) and Astro/Svelte source as a reference for markup and class names; build your own React/Vue wrappers that output the same structure and classes.
3. For interactive behavior (modals, dropdowns, tabs, search), replicate the patterns from the Astro or Svelte components (focus trap, keyboard handling, ARIA).

We plan to add React and Vue component packages and docs later; see [Multi-Framework Strategy](./MULTI_FRAMEWORK.md) and [TODO](./TODO.md).

### JavaScript utilities

The repo provides small JS utilities used by the Astro/Svelte components; you can import them in your own code:

| Util | Purpose |
|------|--------|
| **Theme** (`src/utils/theme.ts`) | `applyTheme(value)`, `getStoredTheme()`, `getCurrentTheme()`, `resolveSystemTheme()`, `getThemeLabel(value)`, `getThemeInfo(value)`, and constants `THEME_SYSTEM`, `DEFAULT_THEME_DARK`, `DEFAULT_THEME_LIGHT`. Dispatches `rizzo-theme-change` when the theme changes. Use with the [Theme Switcher](/docs/components/theme-switcher) component or to [build a custom theme switcher](/docs/theming#building-your-own-theme-switcher). |
| **Storage** (`src/utils/storage.ts`) | SSR-safe `getItem(key, default?)`, `setItem(key, value)`, `removeItem(key)` (wraps `localStorage` with try/catch). |
| **Clipboard** (`src/utils/clipboard.ts`) | `copyToClipboard(text): Promise<boolean>` (Clipboard API with fallback). |
| **Toast** (`src/utils/toast.ts`) | `showToast(message, options?)`, `removeToast(id)`, `removeAllToasts()`, and `ToastOptions` for programmatic toasts. |

Import from `src/utils` (barrel) or from the specific file, e.g. `import { applyTheme, getThemeLabel } from '../utils/theme'` in Astro, or from your copied `utils` folder in a Svelte app. **Shared TypeScript types** (theme, toast, config, component props and data shapes) live in `src/types/`; use `import type { ... } from '../types'` when building on this repo. **When using the package:** ThemeSwitcher in `scaffold/astro/` imports from `scaffold/utils/theme` (included in the package); paths are set so the Astro package build resolves correctly. **When adding via the CLI:** If you add ThemeSwitcher or ThemeIcon to an Astro project, the CLI also copies `scaffold/utils/theme.ts` to `src/components/utils/theme.ts` (with the themes import fixed to `../rizzo/themes`) so the project build finds it.

**Scaffolds:** Vanilla has theme flash, toast, Settings (`openSettings()`). Astro/Svelte layouts include theme flash and toast; Navbar, Search, Settings are in package scaffolds—add via CLI or copy from repo.

### Where the CLI puts CSS and assets (per framework)

**Docs site matches what we ship:** The main site uses the same asset paths and behavior we document. `pnpm build:css` copies fonts to `public/assets/fonts/`, sound files from `src/assets/sfx/` to `public/assets/sfx/`, and extracts all icon SVGs from `src/components/icons/` to `public/icons/` so `/assets/sfx/click.mp3` or `click.wav` and `/icons/*.svg` work.

When you run `init` or `add`, the CLI copies the built CSS and static assets (fonts, and optionally sounds) into **framework-appropriate locations** so each framework’s conventions and build are respected:

| Framework | CSS file | Fonts / assets | Static root |
|-----------|----------|----------------|-------------|
| **Astro** | `public/css/rizzo.min.css` | `public/assets/fonts/` (sounds: `public/assets/sfx/`) | `public/` |
| **Svelte** | `static/css/rizzo.min.css` | `static/assets/fonts/` (sounds: `static/assets/sfx/`) | `static/` |
| **Vanilla** | `css/rizzo.min.css` | `css/fonts/` (sounds: `assets/sfx/`) | project root |

For **Astro**, fonts and sounds go under **`public/assets/`** (e.g. `public/assets/sfx/click.mp3` or `click.wav` → `/assets/sfx/click.mp3` or `click.wav`); the CLI rewrites font URLs in the copied CSS to `/assets/fonts/...`. For **Svelte**, fonts and sounds go under **`static/assets/fonts/`** and **`static/assets/sfx/`** with the same URL rewrite for fonts. For **Vanilla**, fonts sit next to the CSS (`css/fonts/`) so the package’s relative `./fonts/` URLs resolve; sounds go to **`assets/sfx/`** when you use **Full** (all components) or add **Settings** or **SoundEffects**, and the sound script uses a relative path so it works with a local server or `file://`.

### Summary

| You're using | Get CSS | Use components |
|--------------|---------|-----------------|
| **Any**      | `npx rizzo-css init` or `add` (template: Landing \| Docs \| Dashboard \| Full), or `pnpm add rizzo-css` + `import 'rizzo-css'` | Same BEM; see [Components](/docs/components). |
| **Vanilla**  | Same | Init → Vanilla → template. **Full** = theme, Settings, toast, all component pages. [Vanilla components](/docs/vanilla/components). |
| **Astro**    | Same | Init → Astro → template, or `add` in existing project. [Docs](/docs/components). |
| **Svelte**   | Same | Init → Svelte → template, or `add` in existing project. [Docs](/docs/svelte). |
| **React / Vue** | Same: install and import CSS | Same BEM and markup; build your own wrappers. React/Vue components planned later. |

---

## Installation (this repo / docs site)

Rizzo CSS is built on Astro. To run and develop this repo (documentation site and design system source):

```bash
# Clone or copy the project
git clone <repository-url>
cd rizzo-css

# Install dependencies (all are devDependencies; no production runtime deps for the docs site)
pnpm install
```

**Building the package distribution:** From repo root, `pnpm build:package` runs **lint:css:fix** → **build:css** (outputs `public/css/main.min.css` and `packages/rizzo-css/dist/rizzo.min.css`, `dist/fonts/`, `dist/sfx/`) → **copy-scaffold** (copies `src/components` and `src/components/svelte` into `packages/rizzo-css/scaffold/astro` and `scaffold/svelte`, plus config, utils, and vanilla icons) → **prepare-vanilla-scaffold** (populates `scaffold/vanilla/components/`). The CLI and published package use this `dist/` and `scaffold/` output. See [PUBLISHING](./PUBLISHING.md).

## Project Structure

```
rizzo-css/
├── src/
│   ├── config/          # Shared config (frameworks, themes, search, vanilla index)
│   │   ├── frameworks.ts
│   │   ├── themes.ts
│   │   ├── search.ts
│   │   └── vanillaSnippets.ts   # VANILLA_COMPONENT_SLUGS + titles (for /docs/vanilla/components index only)
│   ├── components/      # Astro components (reference implementation)
│   │   ├── Accordion.astro
│   │   ├── Alert.astro
│   │   ├── Badge.astro
│   │   ├── Breadcrumb.astro
│   │   ├── Button.astro
│   │   ├── Card.astro
│   │   ├── CodeBlock.astro
│   │   ├── FrameworkCodeTabs.astro
│   │   ├── CopyToClipboard.astro
│   │   ├── Dropdown.astro
│   │   ├── FormGroup.astro
│   │   ├── Input.astro
│   │   ├── Textarea.astro
│   │   ├── Select.astro
│   │   ├── Checkbox.astro
│   │   ├── Radio.astro
│   │   ├── Modal.astro
│   │   ├── Navbar.astro
│   │   ├── Pagination.astro
│   │   ├── ProgressBar.astro
│   │   ├── Search.astro
│   │   ├── Spinner.astro
│   │   ├── Avatar.astro
│   │   ├── Divider.astro
│   │   ├── Table.astro
│   │   ├── Settings.astro
│   │   ├── Tabs.astro
│   │   ├── ThemeIcon.astro
│   │   ├── ThemeSwitcher.astro
│   │   ├── Toast.astro
│   │   ├── Tooltip.astro
│   │   ├── FrameworkSwitcher.astro
│   │   ├── icons/      # Icon components (same set for Astro, Svelte, Vanilla)
│   │   │   ├── Copy.astro
│   │   │   ├── Check.astro
│   │   │   ├── ChevronDown.astro
│   │   │   ├── Circle.astro
│   │   │   ├── Close.astro
│   │   │   ├── Cmd.astro
│   │   │   ├── Gear.astro
│   │   │   ├── Search.astro
│   │   │   ├── Sort.astro
│   │   │   ├── Filter.astro
│   │   │   ├── (theme icons: Owl, Palette, Sun, Flame, Heart, Leaf, Shield, Zap, Rainbow, Cake, Sunset, Cherry, Brush, Lemon)
│   │   │   └── devicons/  # Devicon brand icons
│   │   │       ├── Astro.astro
│   │   │       ├── Bash.astro
│   │   │       ├── Css3.astro
│   │   │       ├── Git.astro
│   │   │       ├── Html5.astro
│   │   │       ├── Javascript.astro
│   │   │       ├── Nodejs.astro
│   │   │       ├── Plaintext.astro
│   │   │       ├── React.astro
│   │   │       ├── Svelte.astro
│   │   │       └── Vue.astro
│   │   └── svelte/    # Svelte components (same BEM classes)
│   │       ├── index.ts
│   │       ├── Button.svelte
│   │       ├── Badge.svelte
│   │       └── ...
│   ├── utils/           # JS utilities (theme, storage, clipboard, toast)
│   ├── types/           # Shared TypeScript types (config, utils, component props/data)
│   │   ├── index.ts
│   │   └── components.ts
│   ├── layouts/         # Page layouts
│   │   ├── Layout.astro
│   │   └── DocsLayout.astro
│   ├── pages/           # Route pages (docs/, docs/components/, docs/svelte/, docs/vanilla/components/*.astro per component)
│   └── styles/          # CSS files (main.css imports the rest)
│       ├── main.css
│       ├── variables.css
│       ├── reset.css
│       ├── base.css
│       ├── typography.css
│       ├── accessibility.css
│       ├── buttons.css
│       ├── forms.css
│       ├── layout.css
│       ├── spacing.css
│       ├── sizes.css
│       ├── utilities.css
│       ├── media-queries.css
│       ├── components.css
│       ├── pages.css
│       └── themes/      # Theme files (14 themes: 7 dark, 7 light)
│           ├── dark/
│           │   ├── github-dark-classic.css
│           │   ├── shades-of-purple.css
│           │   ├── sandstorm-classic.css
│           │   ├── rocky-blood-orange.css
│           │   ├── minimal-dark-neon-yellow.css
│           │   ├── hack-the-box.css
│           │   └── pink-cat-boo.css
│           └── light/
│               ├── github-light.css
│               ├── red-velvet-cupcake.css
│               ├── orangy-one-light.css
│               ├── sunflower.css
│               ├── green-breeze-light.css
│               ├── cute-pink.css
│               └── semi-light-purple.css
├── docs/                # Documentation
│   ├── GETTING_STARTED.md
│   ├── DESIGN_SYSTEM.md
│   ├── THEMING.md
│   ├── COMPONENTS.md
│   ├── ACCESSIBILITY.md
│   ├── COLORS.md
│   ├── PUBLISHING.md
│   ├── MULTI_FRAMEWORK.md
│   ├── FRAMEWORK_STRUCTURE.md
│   ├── TODO.md
│   └── ...
├── packages/
│   └── rizzo-css/       # npm package (CSS + CLI, same package)
│       ├── package.json  # bin: rizzo-css -> ./bin/rizzo-css.js
│       ├── README.md
│       ├── dist/
│       │   └── rizzo.min.css
│       ├── bin/
│       │   └── rizzo-css.js   # CLI: init, add, theme
│       └── scaffold/          # CLI scaffolds (shipped in npm package)
│           ├── vanilla/      # Vanilla (Landing | Docs | Dashboard | Full: index, js, icons, components, README-RIZZO.md; no package.json)
│           ├── astro/base/      # Astro base app; astro/variants/docs, dashboard
│           ├── svelte/base/     # SvelteKit base app; svelte/variants/docs, dashboard
│           ├── astro/        # Astro components + icons (for Full template when adding to existing)
│           ├── svelte/       # Svelte 5 components + icons (for Full template when adding to existing)
│           ├── config/       # fonts.ts (font pairs for Settings); copied when adding Settings via CLI
│           └── utils/        # theme.ts (for ThemeSwitcher); copied when adding ThemeSwitcher via CLI
├── public/              # Static assets
│   └── css/
│       └── main.min.css # Generated CSS (docs site)
└── scripts/
    ├── build-css.js              # Outputs to public/css and packages/rizzo-css/dist
    ├── copy-scaffold.js          # Copies Svelte + Astro components into packages/rizzo-css/scaffold (run on prepublish)
    └── prepare-vanilla-scaffold.js # Populates scaffold/vanilla/components (run in build:package and prepublishOnly)
```

## Documentation layout and site nav

**Main navigation:** The navbar has **flat links** (no dropdowns): **Docs** | **Components** | **Blocks** | **Themes** | **Colors**. The logo links to the homepage. There is no separate "Home" nav item.

- **Docs** — Getting Started, Design System, Theming, Accessibility, and other foundation pages. Doc pages use **DocsLayout** (`src/layouts/DocsLayout.astro`) with a **sticky sidebar** (Introduction, Foundations, Components) and main content.
- **Components** — Component library overview and per-component pages.
- **Blocks** — Pre-built layouts (Overview, Dashboard with sidebar, Docs layout with sidebar). Block pages use **BlocksLayout** (`src/layouts/BlocksLayout.astro`) with the same sidebar pattern as docs (sticky on desktop, toggle/overlay on mobile).
- **Themes** — Theming guide and theme gallery.
- **Colors** — Interactive color reference.

**Desktop (≥1025px):** Docs and Blocks each show a sticky sidebar beside the main content. Sidebar width is `--docs-sidebar-width` (default `14rem`). Main content scrolls; the sidebar stays in view.

**Mobile (≤1024px):** The docs/blocks sidebars are hidden. The hamburger menu shows the same top-level links (Docs, Components, Blocks, Themes, Colors). Users reach specific doc or block pages via the navbar menu or by starting from a top-level page. Main content uses full width.

Styles live in `src/styles/pages.css` under "Docs layout" and (for blocks) the same sidebar/toggle styles. Breakpoint is `1025px` (same as the navbar mobile menu).

**Docs and block pages:** Use shared components for consistency. Use **CodeBlock** (`src/components/CodeBlock.astro`) for code samples so copy-to-clipboard and syntax styling are consistent. Use **Card** (`src/components/Card.astro`) for card-style content (e.g. theme cards, block previews, stat cards). Layouts **DocsLayout** and **BlocksLayout** handle sidebar and content structure.

## Development

Start the development server:

```bash
pnpm dev
```

The site will be available at `http://localhost:4321`

## Building

Build for production:

```bash
pnpm build
```

This will build and minify CSS (to `public/css/main.min.css` and `packages/rizzo-css/dist/rizzo.min.css`), then build the Astro site to `dist/`.

## Using Components

See the [Components documentation](/docs/components) for the full list of components (including ThemeSwitcher, FontSwitcher, SoundEffects), usage examples, and API details. Each component has a dedicated doc page with live examples.

## Using Themes

Set the theme via `data-theme` on `<html>` (e.g. `github-dark-classic`, `github-light`). The theme switcher supports a **System** option; the choice is persisted in `localStorage`. See [Theming](./THEMING.md) for theme IDs, system preference, and custom themes.

## Using Colors

See [Colors](./COLORS.md) and the [Colors documentation page](/docs/colors) for the semantic color system and format options (OKLCH, Hex, RGB, HSL).

## CSS Architecture (this repo)

CSS is organized into logical files (`variables.css`, `reset.css`, `base.css`, `typography.css`, `components.css`, `themes/`, etc.). The reset leaves body with no margin or padding so content is flush to the viewport by default; use the `.container` class (or layout utilities) when you want spacing. All styles use semantic theme variables and BEM; there are no inline styles. PostCSS handles imports and vendor prefixes; the `build:css` script minifies for production and outputs to both `public/css/main.min.css` (docs site) and `packages/rizzo-css/dist/rizzo.min.css` (npm package).

See [Design System](./DESIGN_SYSTEM.md) for the full variable reference, file list, and utility classes.
