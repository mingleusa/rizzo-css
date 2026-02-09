# Getting Started

This guide will help you get started with Rizzo CSS. The documentation site is available at **[rizzo-css.vercel.app](https://rizzo-css.vercel.app)**.

## Features

- **Using Rizzo in your project** — Install from npm (recommended), clone + build, or use a CDN; import the CSS once; use Astro or Svelte components. React/Vue: same CSS; build your own wrappers; planned for later. See [Using Rizzo in your project](#using-rizzo-in-your-project) below.
- **CLI** — `npx rizzo-css init` | `add` | `theme` (same package). See [CLI Planning](./CLI_PLANNING.md).
- **NPM** — [rizzo-css](https://www.npmjs.com/package/rizzo-css) published; docs and README link to it.
- **CDN** — unpkg and jsDelivr via package.json: `https://unpkg.com/rizzo-css@latest` or `https://cdn.jsdelivr.net/npm/rizzo-css@latest` for plain HTML.
- **Svelte** — `/docs/svelte` with 24 component pages (19 full examples; Icons, Navbar, Search, Settings, Theme Switcher use Astro reference). React/Vue when added.

---

## CLI at a glance

| Command | What it does |
|--------|----------------|
| `npx rizzo-css init` | **First question:** Add to existing project (current directory) or create new? **Existing:** framework (with auto-detect), themes, optional components → copies CSS (+ components) into cwd. **New:** project location → framework (Vanilla JS / Astro / Svelte) → themes → components → scaffolds full project (default Astro/Svelte app or Vanilla example). **Themes and components:** first two options are "Select all" and "Select none"; you can also pick individuals (Space to toggle, Enter to confirm). |
| `npx rizzo-css add` | Add Rizzo CSS to the current directory only. Auto-detects Svelte/Astro and copies to `static/css` or `public/css`; use `--path <dir>` or `--framework vanilla|astro|svelte` to override. |
| `npx rizzo-css theme` | List all 14 theme IDs for `data-theme` on `<html>`. |

**Tip:** To use the official Svelte or Astro scaffold plus Rizzo CSS: `npm create svelte@latest my-app && cd my-app && npx rizzo-css add` (or the same with `astro`). Or run `npx rizzo-css init`, choose “Add to existing”, then pick that folder.

---

## Using Rizzo in your project

Rizzo CSS is **framework-agnostic**: the **same CSS and component styles** are included for **Vanilla JS**, Astro, and Svelte. All three get full theming and the same BEM component markup; we provide reference implementations and docs for each. For React and Vue, see [React and Vue (planned)](#react-and-vue-planned) below.

### Step 1: Get the CSS

**Option A — Quick start with CLI:**

```bash
npx rizzo-css init
```

**First question:** Add to existing project (current directory) or create new? **If existing:** choose framework (auto-detected when possible), themes, and (Astro/Svelte) optional components; CSS and components are copied into the current folder. **If new:** project location → **framework** (Vanilla JS / Astro / Svelte), themes, and (Astro/Svelte) optional components. **All options get the same CSS and component styles.** **Vanilla JS:** example `index.html` with theme (System option), Settings panel, toast, and samples. **Astro / Svelte:** default app scaffold (package.json, config, layout with theme flash + toast, index page) plus optional 24 components. To add only the CSS to an existing project without menus:

```bash
npx rizzo-css add
# or: npx rizzo-css add --path public/css
```

List themes: `npx rizzo-css theme`.

**Option B — Install from npm:**

```bash
pnpm add rizzo-css
# or: npm install rizzo-css   or   yarn add rizzo-css
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
2. Use **`public/css/main.min.css`** (or copy it into your project).

**Option D — Release assets:**  
Download the built CSS from [GitHub Releases](https://github.com/mingleusa/rizzo-css/releases) when available.

### Step 2: Import the CSS

Import the CSS **once** in your app (root layout or main entry):

- **If you used npm with a bundler (Vite, Astro, webpack, etc.):** `import 'rizzo-css'` in your main JS or root layout.
- **If you used npm but have no bundler (plain HTML):** Use a CDN: `<link rel="stylesheet" href="https://unpkg.com/rizzo-css@latest" />` or `https://cdn.jsdelivr.net/npm/rizzo-css@latest`. Or copy the built file from `node_modules/rizzo-css/dist/rizzo.min.css` into your `public/` or `static/` folder and link to that path.
- **If you cloned and built:** Add a `<link>` or `import` to where you put `main.min.css` (e.g. `public/css/main.min.css`).

### Step 3: Use components (Vanilla JS)

- **Same CSS and styles:** Vanilla JS gets the **same CSS and component styles** as Astro and Svelte. Run `npx rizzo-css init` and choose **Vanilla JS** to get an example `index.html` with full functionality: **theme flash prevention** (persisted theme, font size, reduce motion, high contrast, scrollbar), **Settings panel** (theme with System option, font size, accessibility toggles; open via `window.openSettings()`), **toast** (`showToast(message, options)`, `removeToast(id)`, `removeAllToasts()`), and sample components (buttons, card, badge). Theme is stored in `localStorage` under key `theme`; use value `system` for OS light/dark.
- **Class names and structure:** Use the same BEM classes and HTML structure as in the [Components documentation](/docs/components) (e.g. `btn`, `btn--primary`, `card`, `card__body`). Interactive components (Modal, Dropdown, Tabs, Search) need a small amount of JS; copy patterns from the Astro/Svelte components or the docs.

### Step 4: Use components (Astro)

- **Reference implementation:** This repo is an Astro app. Use the Astro components from `src/components/` directly if your project is Astro, or copy the markup and class names from the component source or the [component docs](/docs/components).
- **Scaffold:** The Astro scaffold layout includes **theme flash prevention** (persisted theme, font size, accessibility) and **toast** (`showToast`, `removeToast`, `removeAllToasts`). Add Navbar and Settings from this repo for full parity with the docs site.
- **Class names and structure:** All components use BEM classes (e.g. `btn`, `btn--primary`, `navbar`, `navbar__container`). Apply the same HTML structure and class names as in the [Components documentation](/docs/components). Interactive components require a small amount of JS; copy the patterns from the Astro components or the docs.

### Step 5: Use components (Svelte)

- **Svelte components:** This repo includes Svelte versions of most components in `src/components/svelte/`, using the **same BEM classes** as the Astro reference. Copy that folder (and `index.ts`) into your Svelte app, or run `npx rizzo-css init` and choose Svelte + components.
  ```js
  import { Button, Badge, Card, Modal, Tabs, /* ... */ } from '$lib/rizzo';
  ```
- **Scaffold:** The Svelte scaffold `app.html` includes **theme flash prevention** and **toast** (`showToast`, `removeToast`, `removeAllToasts`). Add a layout with Settings/Navbar from this repo for full parity.
- **Docs and examples:** The docs site has a full Svelte section at **[/docs/svelte](/docs/svelte)** with 24 component pages. Use the **framework switcher** ("View as: Astro | Svelte") on any component or theme page to switch views.
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
| **Theme** (`src/utils/theme.ts`) | `applyTheme(value)`, `getStoredTheme()`, `getCurrentTheme()`, `resolveSystemTheme()`, `getThemeLabel(value)`, `getThemeInfo(value)`, and constants `THEME_SYSTEM`, `DEFAULT_THEME_DARK`, `DEFAULT_THEME_LIGHT`. Dispatches `rizzo-theme-change` when the theme changes. |
| **Storage** (`src/utils/storage.ts`) | SSR-safe `getItem(key, default?)`, `setItem(key, value)`, `removeItem(key)` (wraps `localStorage` with try/catch). |
| **Clipboard** (`src/utils/clipboard.ts`) | `copyToClipboard(text): Promise<boolean>` (Clipboard API with fallback). |
| **Toast** (`src/utils/toast.ts`) | `showToast(message, options?)`, `removeToast(id)`, `removeAllToasts()`, and `ToastOptions` for programmatic toasts. |

Import from `src/utils` (barrel) or from the specific file, e.g. `import { applyTheme, getThemeLabel } from '../utils/theme'` in Astro, or from your copied `utils` folder in a Svelte app.

**Scaffolds:** The **Vanilla** scaffold ships with inline theme flash, toast, and a full Settings panel (`openSettings()`). The **Astro** and **Svelte** scaffold layouts include theme flash and toast scripts so `showToast`, `removeToast`, and `removeAllToasts` are available globally; add Navbar and Settings from this repo for the full experience.

### Summary

| You're using | Get CSS | Use components |
|--------------|---------|-----------------|
| **Any**      | `npx rizzo-css init` (scaffold) or `npx rizzo-css add` (CSS only), or `pnpm add rizzo-css` + `import 'rizzo-css'` | Same BEM classes and markup for all; see [Components](/docs/components). |
| **Vanilla JS** | Same | Run `npx rizzo-css init` and choose Vanilla JS — same CSS and component styles; example includes theme (with System), Settings panel, toast, and samples. Use class names and HTML from the [component docs](/docs/components). |
| **Astro**    | Same | Run `npx rizzo-css init` and choose Astro + components, or copy from this repo. [Docs](/docs/components). |
| **Svelte**   | Same | Run `npx rizzo-css init` and choose Svelte + components, or copy `src/components/svelte/` from this repo. [Docs](/docs/svelte). |
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

## Project Structure

```
rizzo-css/
├── src/
│   ├── config/          # Shared config (frameworks, themes, search)
│   │   ├── frameworks.ts
│   │   ├── themes.ts
│   │   └── search.ts
│   ├── components/      # Astro components (reference implementation)
│   │   ├── Accordion.astro
│   │   ├── Alert.astro
│   │   ├── Badge.astro
│   │   ├── Breadcrumb.astro
│   │   ├── Button.astro
│   │   ├── Card.astro
│   │   ├── CodeBlock.astro
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
│   │   ├── ThemeSwitcher.astro
│   │   ├── Toast.astro
│   │   ├── Tooltip.astro
│   │   ├── FrameworkSwitcher.astro
│   │   ├── icons/      # Icon components
│   │   │   ├── Copy.astro
│   │   │   ├── Check.astro
│   │   │   ├── ChevronDown.astro
│   │   │   ├── Circle.astro
│   │   │   ├── Close.astro
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
│   ├── layouts/         # Page layouts
│   │   ├── Layout.astro
│   │   └── DocsLayout.astro
│   ├── pages/           # Route pages
│   └── styles/          # CSS files
│       ├── accessibility.css
│       ├── base.css
│       ├── buttons.css
│       ├── components.css
│       ├── layout.css
│       ├── main.css
│       ├── reset.css
│       ├── spacing.css
│       ├── sizes.css
│       ├── typography.css
│       ├── utilities.css
│       ├── variables.css
│       ├── media-queries.css
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
│       └── scaffold/          # CLI scaffolds
│           ├── vanilla/      # Vanilla JS example (theme flash, Settings panel, toast, theme with System, samples)
│           ├── astro-app/    # Default Astro project (package.json, config, layout, pages)
│           ├── svelte-app/   # Default SvelteKit project (package.json, config, app.html, routes)
│           ├── astro/        # Astro components + icons (from copy-scaffold.js on prepublish)
│           └── svelte/       # Svelte components (from copy-scaffold.js on prepublish)
├── public/              # Static assets
│   └── css/
│       └── main.min.css # Generated CSS (docs site)
└── scripts/
    ├── build-css.js     # Outputs to public/css and packages/rizzo-css/dist
    └── copy-scaffold.js # Copies Svelte + Astro components into packages/rizzo-css/scaffold (run on prepublish)
```

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

See the [Components documentation](/docs/components) for the full list of 24 components, usage examples, and API details. Each component has a dedicated doc page with live examples.

## Using Themes

Set the theme via `data-theme` on `<html>` (e.g. `github-dark-classic`, `github-light`). The theme switcher supports a **System** option; the choice is persisted in `localStorage`. See [Theming](./THEMING.md) for theme IDs, system preference, and custom themes.

## Using Colors

See [Colors](./COLORS.md) and the [Colors documentation page](/docs/colors) for the semantic color system and format options (OKLCH, Hex, RGB, HSL).

## CSS Architecture (this repo)

CSS is organized into logical files (`variables.css`, `reset.css`, `base.css`, `typography.css`, `components.css`, `themes/`, etc.). The reset leaves body with no margin or padding so content is flush to the viewport by default; use the `.container` class (or layout utilities) when you want spacing. All styles use semantic theme variables and BEM; there are no inline styles. PostCSS handles imports and vendor prefixes; the `build:css` script minifies for production and outputs to both `public/css/main.min.css` (docs site) and `packages/rizzo-css/dist/rizzo.min.css` (npm package).

See [Design System](./DESIGN_SYSTEM.md) for the full variable reference, file list, and utility classes.
