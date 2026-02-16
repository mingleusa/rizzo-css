# Rizzo CSS

<div align="center">

```
      /\___/\   
   __(  o o  )__
     (  =^=  )  
    _/   ~   \_ 
   /  \_____/  \
 ____  ___ _____________     ____ ____ ____
|  _ \|_ _|__  /__  / _ \   / ___/ ___/ ___|
| |_) || |  / /  / / | | | | |   \___ \___ \
|  _ < | | / /_ / /| |_| | | |___ ___) |__) |
|_| \_\___/____/____\___/   \____|____/____/
      Design system · Vanilla · Astro · Svelte
```

*Run `npx rizzo-css help` to see this in the CLI.*

[![npm](https://img.shields.io/badge/npm-0.0.43-CB3837?style=for-the-badge&logo=npm)](https://www.npmjs.com/package/rizzo-css)
![Astro](https://img.shields.io/badge/Astro-5.17.1-FF5D01?style=for-the-badge&logo=astro&logoColor=white)
![Svelte](https://img.shields.io/badge/Svelte-5.50.0-FF3E00?style=for-the-badge&logo=svelte&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9.3-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-18+-339933?style=for-the-badge&logo=node.js&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-7.3.1-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![PostCSS](https://img.shields.io/badge/PostCSS-8.5.6-DD3A0A?style=for-the-badge&logo=postcss&logoColor=white)
![Stylelint](https://img.shields.io/badge/Stylelint-17.0.0-263238?style=for-the-badge&logo=stylelint&logoColor=white)
![pnpm](https://img.shields.io/badge/pnpm-9+-F69220?style=for-the-badge&logo=pnpm&logoColor=white)
![Algolia](https://img.shields.io/badge/Algolia-5.47.0-5468FF?style=for-the-badge&logo=algolia&logoColor=white)

A modern CSS design system built on Astro with semantic theming, accessibility-first components, and PostCSS optimization.

[Getting Started](#-getting-started) • [Documentation](#-documentation) • [Components](#-components) • [Theming](#-theming-system)

</div>

---

## ✨ Features

- 🎨 **14 Built-in Themes** - 7 dark and 7 light themes with semantic variable support (including GitHub Dark Classic and GitHub Light)
- ♿ **Accessibility First** - WCAG AA compliant with full keyboard navigation and screen reader support
- 🎯 **Semantic Theming** - All components use semantic CSS variables that adapt automatically
- 📦 **Comprehensive Components** - 31 accessible, themeable components (28 doc pages; Astro reference + Svelte examples)
- 🔀 **Multi-framework** - **Vanilla JS**, Astro, and Svelte supported with the same CSS and component styles; CLI offers all three (Vanilla JS = yellow, Astro = orange, Svelte = orange-red). All scaffolds include theme persistence (localStorage key `theme`, System option) and global toast (`showToast`, `removeToast`, `removeAllToasts`); Vanilla scaffold also includes a full Settings panel (`openSettings()`). Framework switcher on docs (View as: Astro | Svelte | Vanilla). Svelte docs at [/docs/svelte](/docs/svelte); Vanilla docs at [/docs/vanilla/components](/docs/vanilla/components) with copy-paste HTML, optional JS, and live demos
- 🛠️ **Utility Classes** - Display, position, borders, flexbox, grid, gap, animations, and more
- 🎨 **OKLCH Colors** - Perceptually uniform color space for better color manipulation
- 📱 **Responsive** - Mobile-first design with responsive breakpoints
- ⚡ **Optimized** - PostCSS processing with minification and vendor prefixes
- 🎯 **Design System as Source of Truth** - 165+ CSS variables ensure all styling is consistent and framework-portable

## 🛠️ Tech Stack

- **[Astro](https://astro.build)** `5.17.1` - Web framework (docs site + reference components)
- **[Svelte](https://svelte.dev)** `5.50.0` - Framework docs and components at /docs/svelte; Svelte scaffold uses Svelte Kit
- **[Vite](https://vitejs.dev)** `7.3.1` - Build tool for Svelte scaffold
- **[TypeScript](https://www.typescriptlang.org/)** `5.9.3` - Type safety
- **[PostCSS](https://postcss.org/)** `8.5.6` - CSS transformation with import support
- **[postcss-import](https://github.com/postcss/postcss-import)** `16.1.1` - CSS import support (SCSS/SASS-like)
- **[Autoprefixer](https://github.com/postcss/autoprefixer)** `10.4.23` - Automatic vendor prefixes
- **[cssnano](https://cssnano.co/)** `7.1.2` - CSS minification
- **[Stylelint](https://stylelint.io/)** `17.0.0` - CSS linter
- **[Algolia](https://www.algolia.com/)** `5.47.0` - Search integration (docs site)
- **OKLCH color format** - Perceptually uniform color space

## 🚀 Getting Started

**Using Rizzo?** `npx rizzo-css init` — choose **framework** (Vanilla, Astro, or Svelte), then **add to existing** or **create new**. **Existing** (or `npx rizzo-css add`) → drop in CSS + hand-pick components. **New** → choose **Core** (everything) or **Manual** (pick which components; all pre-selected), then package manager. Non-interactive: `npx rizzo-css init --yes --framework vanilla|astro|svelte`. Or install the package: `pnpm add rizzo-css` (or npm/yarn/bun). To run the CLI: use the [docs site](https://rizzo-css.vercel.app/docs/getting-started) package manager tabs (npm, pnpm, yarn, bun)—the **yarn** tab shows `npx` so it works with Yarn 1 and 2+. Optional **rizzo-css.json** for targetDir, framework, packageManager. Full guide: [GETTING_STARTED](docs/GETTING_STARTED.md). React/Vue: same CSS; wrappers planned.

**What ships:** `rizzo-css` includes dist, CLI, and scaffolds (vanilla, astro-core, svelte-core, plus astro/ and svelte/ component templates). Every scaffold includes **LICENSE-RIZZO**, **README-RIZZO.md**, and **.gitignore**; Astro/Svelte include package.json and .env.example. **CLI:** `init` | `add` | `theme` | `doctor` | `help`. **Create new** → **Core** (all 31 components) or **Manual** (all 31 pre-selected; per framework). Dependencies auto-included (Navbar→Search, Settings; Settings→ThemeSwitcher, FontSwitcher, SoundEffects; Toast→Alert). **Add to existing** → CSS + hand-pick components, writes **RIZZO-SNIPPET.txt** unless `--no-snippet`; you add the `<link>` (CLI prints it). Run `npx rizzo-css help components` for the list. Same CSS and BEM for all three.

### Prerequisites

- Node.js 18+
- pnpm (recommended) or npm

### Installation (this repo)

```bash
pnpm install
```

### Development

```bash
pnpm dev
```

Site available at `http://localhost:4321`

## 📜 Commands

| Command | Description |
|---------|-------------|
| `pnpm rizzo-css` | Run the CLI from this repo (e.g. `pnpm rizzo-css init`, `pnpm rizzo-css add`, `pnpm rizzo-css theme`). Elsewhere use `npx rizzo-css`. |
| `pnpm dev` | Start development server |
| `pnpm build` | Lint CSS, build minified CSS, and build the docs site (Astro). Use for preview/deploy. |
| `pnpm build:css` | Build minified CSS only → `public/css/main.min.css` and `packages/rizzo-css/dist/rizzo.min.css` |
| `pnpm build:package` | Full package prep: lint, build CSS, copy scaffold, run prepare-* scripts. Use before `publish:package`. |
| `pnpm publish:package` | Run `build:package` then publish the `rizzo-css` npm package |
| `pnpm preview` | Preview production build |
| `pnpm lint:css` | Lint CSS files |
| `pnpm lint:css:fix` | Auto-fix CSS linting issues |
| `pnpm test:a11y` | Build site and run accessibility tests (axe-core + Playwright). See [docs/ACCESSIBILITY.md](docs/ACCESSIBILITY.md#automated-accessibility-tests). |
| `pnpm test:a11y:ci` | Install Chromium and run a11y tests (for CI). |

## 🎨 CSS Setup

### Imports

Use PostCSS imports (similar to SCSS/SASS) in `src/styles/main.css`:

```css
@import url('./variables.css');
@import url('./reset.css');
@import url('./base.css');
@import url('./typography.css');
@import url('./accessibility.css');
/* ... */
```

### Processing Pipeline

**Development:**
- PostCSS processes imports and adds vendor prefixes
- Source CSS is used directly
- All 14 themes are available

**Production:**
- CSS is minified and optimized via `build:css` script
- Layout automatically uses `public/css/main.min.css` in production builds
- Minification preserves pseudo-element syntax (`::before`, `::after`)

### CSS Architecture

CSS is organized into logical files (variables, reset, base, typography, components, themes, etc.). All components use **BEM** naming (e.g. `.navbar`, `.navbar__container`, `.navbar__menu--open`). See [Design System](./docs/DESIGN_SYSTEM.md) for the full file list and variable reference.

### Theming System

Rizzo CSS includes **14 built-in themes** (7 dark, 7 light) with semantic variable support:

- All components automatically adapt to the selected theme
- Themes use OKLCH color format for better color manipulation
- **Contrast-aware text colors** - Automatic text color selection based on background lightness for WCAG AA compliance
- **System preference** - First visit uses OS light/dark (`prefers-color-scheme`); “System” option in the theme switcher follows OS and updates when the OS preference changes
- **Unique theme icons** - Each theme has a distinct icon in the theme switcher (Owl, Palette, Flame, Sunset, Zap, Shield, Heart, Sun, Cake, Lemon, Rainbow, Leaf, Cherry, Brush)
- Settings panel for theme switching, font size adjustment, and accessibility options
- **All settings persist in localStorage** - Theme (including `system`), font size, reduced motion, high contrast, and scrollbar style preferences are automatically saved and restored
- Shadow and overlay variables for theme-aware effects

See [Theming Documentation](./docs/THEMING.md) for details.

### Components

Accessible, themeable components:
- **Navbar** - Responsive navigation with dropdown menus, search, and settings button. Default Cat logo in the brand link (optional `logo` prop for custom image). **Docs** dropdown shows Introduction and Foundations (Getting Started, Design System, Theming, Accessibility, Colors). **Components** dropdown has Overview plus three columns of component links. Theming is under Docs (no separate Themes nav item). Mobile: full docs structure in the Docs dropdown; menu toggle, search, and settings with smooth transitions
- **Settings** - Settings panel with theme switcher, font size, font pair switcher (same UI as theme: trigger + menu + preview; six pairs: Geist, Inter + JetBrains Mono, IBM Plex Sans + Mono, Source Sans 3 + Source Code Pro, DM Sans + DM Mono, Outfit + JetBrains Mono), and accessibility options (reduce motion, high contrast, scrollbar style). All settings persist in localStorage. Close button (X) bordered and visible on hover. Opening/closing animations, mobile responsive
- **ThemeSwitcher** - Accessible dropdown with **System** option (follows OS light/dark), Preference + Dark/Light groups, theme-specific icons, and active state styling. Preview panel shows current theme by default and hovered theme on hover. All theme switchers (Settings, docs) use the same full-width trigger and dropdown.
- **Button** - Semantic button component with variants using theme variables
- **Badge** - Small labels and tags for displaying status, categories, or counts with variants, sizes, and pill option
- **Icons** - Reusable SVG icon components using Tabler Icons and Devicons (same set for Astro, Svelte, and Vanilla; includes Cat logo and Cmd icon for keyboard shortcuts; 20+ regular icons plus brand icons for CSS3, HTML5, JavaScript, Node.js, Astro, Svelte, React, Vue, and more)
- **Form Components** - Complete form system (FormGroup, Input, Textarea, Select, Checkbox, Radio) with validation states
- **Card** - Flexible card component with variants, sections, and image support
- **Modal** - Accessible modal/dialog component with focus trapping and keyboard navigation. Three sizes: sm, md (default), lg
- **CopyToClipboard** - Copy to clipboard component with visual feedback
- **CodeBlock** - Code block component with integrated copy-to-clipboard functionality and language icons. Displays colored brand icons (Devicons) for supported languages at 20px size for better visibility. Language text appears on large screens, icons only on mobile. Icons and copy button are vertically centered on all screen sizes. Used throughout documentation for code examples
- **Search** - Search component with Algolia integration; trigger uses Cmd icon and K at same size as search icon (20px); Cmd+K/Ctrl+K toggles open/close (including when focus is in search), Escape closes, backdrop or X to close; same live standalone example on Astro, Svelte, and Vanilla doc pages; mobile responsive
- **Alert** - Alert/notification component with variants, dismissible functionality, auto-dismiss, and dynamic creation via JavaScript
- **Toast** - Fixed position toast notifications with auto-dismiss and programmatic control. Available globally via `window.showToast()`. Six position options with automatic stacking
- **Tooltip** - Accessible tooltip component with four position options (top, bottom, left, right), keyboard support, and theme-aware styling
- **Dropdown** - Accessible dropdown menu component with keyboard navigation, nested submenus (up to 3 levels), menu items, separators, and custom click handlers
- **Tabs** - Accessible tabs component with keyboard navigation, ARIA tab pattern, and three variants (default, pills, underline)

All components:
- Use semantic theme variables with contrast-aware text colors
- Are fully keyboard accessible
- Have no inline styles (all CSS in external files)
- Follow BEM naming convention
- Include theme flash prevention on page load (inline script in Layout)
- Meet WCAG AA contrast requirements
- Theme switcher displays active theme name and icon in trigger button
- Individual documentation pages with live examples

See [Components Documentation](./docs/COMPONENTS.md) for usage examples.

## 📚 Documentation

**Live site:** [rizzo-css.vercel.app](https://rizzo-css.vercel.app)

Comprehensive documentation is in the `docs/` directory and on the live site. **Site nav:** Home | Docs (Introduction, Foundations) | Components. Theming is under Docs → Foundations.

- [Getting Started](./docs/GETTING_STARTED.md) - CLI (`npx rizzo-css init`/`add`), npm install, import CSS, use components (Astro/Svelte), [JavaScript utilities](./docs/GETTING_STARTED.md#javascript-utilities) (theme, storage, clipboard, toast), and [docs layout / site nav](./docs/GETTING_STARTED.md#documentation-layout-and-site-nav)
- [Design System](./docs/DESIGN_SYSTEM.md) - Variables, file organization, and utilities
- [Components](./docs/COMPONENTS.md) - Component library and usage (31 components)
- [Theming](./docs/THEMING.md) - Themes, system preference, custom themes (also linked under Docs → Foundations on the site)
- [Colors](./docs/COLORS.md) - Color reference (OKLCH, Hex, RGB, HSL)
- [Accessibility](./docs/ACCESSIBILITY.md) - Guidelines, utility classes, best practices, and manual accessibility testing (keyboard, screen reader, tools)
- [Framework Structure](./docs/FRAMEWORK_STRUCTURE.md) - Astro vs Svelte layout; framework switcher
- [Multi-Framework Strategy](./docs/MULTI_FRAMEWORK.md) - Svelte (done); React/Vue (planned)
- [Publishing](./docs/PUBLISHING.md) - How to publish the npm package
- [TODO](./docs/TODO.md) - Roadmap and tasks

## 📚 External Resources

- [Astro Documentation](https://docs.astro.build)
- [PostCSS Documentation](https://postcss.org/docs)
- [Stylelint Documentation](https://stylelint.io/user-guide)
