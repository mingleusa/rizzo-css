# Getting Started

This guide will help you get started with Rizzo CSS.

## Using Rizzo in your project

Rizzo CSS is **framework-agnostic**: the same CSS (and minimal JS for interactive components) works in any stack. **Right now we provide reference implementations and docs for Astro and Svelte.** You can use the built CSS in any project; for React and Vue, see [React and Vue (planned)](#react-and-vue-planned) below.

### Step 1: Get the CSS

**Option A — Clone and build (recommended):**

1. Clone this repo and install dependencies:
   ```bash
   git clone <repository-url>
   cd rizzo-css
   pnpm install
   ```
2. Build the minified CSS:
   ```bash
   pnpm build:css
   ```
3. Use the output file: **`public/css/main.min.css`**. Copy it into your project (e.g. `public/` or `src/assets/`) or reference it from the Rizzo repo path.

**Option B — Install from npm (after publishing):**
   ```bash
   pnpm add rizzo-css
   # or: npm install rizzo-css   or   yarn add rizzo-css
   ```
   Then import once in your app: `import 'rizzo-css'` (or link to `node_modules/rizzo-css/dist/rizzo.min.css` in HTML). See the [package README](../packages/rizzo-css/README.md) in the repo.

**Option C — Use the built file from a release:**  
When we publish releases, you can download `main.min.css` from the release assets. (CLI is planned; see [TODO](./TODO.md).)

### Step 2: Import the CSS

In your app, import the Rizzo CSS **once** (e.g. in your root layout or main entry):

- **Astro:** In your root layout or a global stylesheet, add:
  ```html
  <link rel="stylesheet" href="/css/main.min.css" />
  ```
  (If you copied the file to `public/css/`, the path is as above.)
- **Svelte (Vite):** Copy `main.min.css` into your project (e.g. `src/lib/rizzo.css` or `public/css/`) and import it in your root layout or `main.js`:
  ```js
  import '/src/lib/rizzo.css';  // or path to where you put the file
  ```
  Or in `index.html`: `<link rel="stylesheet" href="/css/main.min.css" />` if the file is in `public/css/`.

### Step 3: Use components (Astro)

- **Reference implementation:** This repo is an Astro app. Use the Astro components from `src/components/` directly if your project is Astro, or copy the markup and class names from the component source or the [component docs](/docs/components).
- **Class names and structure:** All components use BEM classes (e.g. `btn`, `btn-primary`, `navbar`, `navbar__container`). Apply the same HTML structure and class names as in the [Components documentation](/docs/components) (and individual component pages). Interactive components (Modal, Dropdown, Tabs, Search, etc.) require a small amount of JS; copy the patterns from the Astro components or the docs.

### Step 4: Use components (Svelte)

- **Svelte components:** This repo includes Svelte versions of most components in `src/components/svelte/`, using the **same BEM classes** as the Astro reference. You can copy that folder (and `index.ts`) into your Svelte app and import from it:
  ```js
  import { Button, Badge, Card, Modal, Tabs, /* ... */ } from './components/svelte';
  ```
- **Docs and examples:** The docs site has a full Svelte section at **[/docs/svelte](/docs/svelte)** with 24 component pages (19 with full Svelte examples; Icons, Navbar, Search, Settings, and Theme Switcher link to the Astro reference and use the same CSS/BEM). Use the **framework switcher** ("View as: Astro | Svelte") on any component or theme page to switch views.
- **Themes:** Set the theme via `data-theme` on `<html>` (e.g. `github-dark-classic`, `github-light`). Theme IDs are in [Theming](./THEMING.md#available-themes). The same CSS and theme variables apply.

### React and Vue (planned)

The **same CSS and BEM class names** work in React and Vue. We do not yet ship React or Vue component implementations or framework-specific docs. To use Rizzo today in a React or Vue project:

1. Get and import the CSS as in [Step 1](#step-1-get-the-css) and [Step 2](#step-2-import-the-css).
2. Use the [Components documentation](/docs/components) and Astro/Svelte source as a reference for markup and class names; build your own React/Vue wrappers that output the same structure and classes.
3. For interactive behavior (modals, dropdowns, tabs, search), replicate the patterns from the Astro or Svelte components (focus trap, keyboard handling, ARIA).

We plan to add React and Vue component packages and docs later; see [Multi-Framework Strategy](./MULTI_FRAMEWORK.md) and [TODO](./TODO.md).

### Summary

| You're using | Get CSS | Use components |
|--------------|---------|-----------------|
| **Astro**    | `pnpm add rizzo-css` and `import 'rizzo-css'`, or clone + build → `public/css/main.min.css` | Use `src/components/` from this repo or copy markup + classes from [docs](/docs/components). |
| **Svelte**   | Same (npm or clone + build); copy `main.min.css` into your app if not using npm | Copy `src/components/svelte/` (and `index.ts`) into your app, or copy markup + classes from [docs](/docs/svelte). |
| **React / Vue** | Same: `pnpm add rizzo-css` and import CSS, or use built file | Same BEM and markup as docs; build your own wrappers. React/Vue components and docs planned later. |

---

## Installation (this repo / docs site)

Rizzo CSS is built on Astro. To run and develop this repo (documentation site and design system source):

```bash
# Clone or copy the project
git clone <repository-url>
cd rizzo-css

# Install dependencies
pnpm install
```

## Project Structure

```
rizzo-css/
├── src/
│   ├── config/          # Shared config (frameworks, themes, docs, search)
│   │   ├── frameworks.ts
│   │   ├── themes.ts
│   │   ├── docs.ts
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
│   │   └── icons/      # Icon components
│   │       ├── Copy.astro
│   │       ├── Check.astro
│   │       ├── ChevronDown.astro
│   │       ├── Circle.astro
│   │       ├── Close.astro
│   │       ├── Gear.astro
│   │       ├── Search.astro
│   │       ├── Sort.astro
│   │       ├── Filter.astro
│   │       ├── (theme icons: Owl, Palette, Sun, Flame, Heart, Leaf, Shield, Zap, Rainbow, Cake, Sunset, Cherry, Brush, Lemon)
│   │       ├── FrameworkSwitcher.astro
│   │       ├── svelte/    # Svelte components (same BEM classes)
│   │       │   ├── Button.svelte
│   │       │   └── Badge.svelte
│   │       └── devicons/  # Devicon brand icons
│   │           ├── Astro.astro
│   │           ├── Bash.astro
│   │           ├── Css3.astro
│   │           ├── Git.astro
│   │           ├── Html5.astro
│   │           ├── Javascript.astro
│   │           ├── Nodejs.astro
│   │           └── Plaintext.astro
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
│   ├── SEARCH.md
│   ├── MULTI_FRAMEWORK.md
│   ├── THEME_COLORS.md
│   ├── THEME_FEATURES_PLAN.md
│   ├── FRAMEWORK_STRUCTURE.md
│   └── TODO.md
├── public/              # Static assets
│   └── css/             # Generated CSS
│       └── main.min.css
└── scripts/             # Build scripts
    └── build-css.js
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

This will:
1. Build and minify CSS to `public/css/main.min.css`
2. Build the Astro site to `dist/`

## Using Components

Rizzo CSS includes a comprehensive set of accessible components. Each component has its own dedicated documentation page with live examples, usage instructions, and API details.

### Component Documentation

- [Navbar](/docs/components/navbar) - Responsive, accessible navigation bar
- [Settings](/docs/components/settings) - Comprehensive settings panel
- [Theme Switcher](/docs/components/theme-switcher) - Accessible theme switcher
- [Button](/docs/components/button) - Semantic button component
- [Badge](/docs/components/badge) - Small labels and tags with variants and sizes
- [Accordion](/docs/components/accordion) - Collapsible sections with single/multiple open and keyboard navigation
- [Breadcrumb](/docs/components/breadcrumb) - Navigation breadcrumbs with separator customization
- [Pagination](/docs/components/pagination) - Pagination navigation with prev/next, page numbers, and ellipsis
- [Progress Bar](/docs/components/progress-bar) - Progress bar with variants, sizes, and indeterminate state
- [Spinner](/docs/components/spinner) - Accessible loading spinner with variants and sizes
- [Avatar](/docs/components/avatar) - User avatar with image or initials fallback
- [Divider](/docs/components/divider) - Horizontal or vertical divider with optional label
- [Table](/docs/components/table) - Data table with sorting and filtering
- [Icons](/docs/components/icons) - Reusable SVG icon components (Tabler Icons and Devicons) with interactive card grid and copy functionality
- [CopyToClipboard](/docs/components/copy-to-clipboard) - Copy to clipboard component
- [Forms](/docs/components/forms) - Form components (FormGroup, Input, Textarea, Select, Checkbox, Radio)
- [Cards](/docs/components/cards) - Flexible card component
- [Modal](/docs/components/modal) - Accessible modal/dialog component
- [Alert](/docs/components/alert) - Alert/notification component with auto-dismiss
- [Toast](/docs/components/toast) - Fixed position toast notifications
- [Search](/docs/components/search) - Search component with Algolia integration
- [Tooltip](/docs/components/tooltip) - Accessible tooltip component with positioning options
- [Dropdown](/docs/components/dropdown) - Accessible dropdown menu with keyboard navigation, nested submenus (up to 3 levels), menu items, separators, and custom click handlers
- [Tabs](/docs/components/tabs) - Accessible tabs component with keyboard navigation, ARIA tab pattern, and three variants (default, pills, underline)

See the [Components Documentation](/docs/components) for an overview and links to all component pages.

## Using Themes

Rizzo CSS includes 14 built-in themes (7 dark, 7 light). Themes are applied via the `data-theme` attribute on the HTML element. The theme switcher (in Settings) supports a **System** option that follows your OS light/dark preference; the choice is persisted in `localStorage` as `theme` (a theme id or `system`).

```html
<html lang="en" data-theme="github-dark-classic">
```

See [Theming Documentation](./THEMING.md) for system preference, persistence, and custom themes.

## Using Colors

Rizzo CSS uses a semantic color system with CSS custom properties. All colors are available in multiple formats (OKLCH, Hex, RGB, HSL, CSS Variable) and can be viewed and copied from the [Colors Documentation Page](/docs/colors).

See [Colors Documentation](./COLORS.md) for complete color reference and format conversion details.

## CSS Architecture

### File Organization

CSS is organized into logical files:

- `variables.css` - Default theme variables and typography system
- `reset.css` - Modern CSS reset
- `base.css` - Base HTML element styles
- `typography.css` - Typography system (font families, sizes, weights, line heights, utilities)
- `accessibility.css` - Accessibility utilities
- `buttons.css` - Button component styles
- `layout.css` - Layout utilities
- `spacing.css` - Margin and padding utility classes
- `sizes.css` - Width, height, min/max dimensions, and container utilities
- `utilities.css` - Comprehensive utility classes (display, position, borders, flexbox, grid, gap, animations, colors, focus states)
- `forms.css` - Form component styles
- `pages.css` - Page-specific styles
- `media-queries.css` - Responsive breakpoints and media query definitions
- `components.css` - Component styles (Accordion, Alert, Avatar, Badge, Breadcrumb, Card, CodeBlock, CopyToClipboard, Divider, Dropdown, Modal, Navbar, Pagination, Progress Bar, Search, Settings, Spinner, Table, Tabs, ThemeSwitcher, Toast, Tooltip)
- `themes/` - Theme definitions (dark/light folders)

### Semantic Variables

All styles use semantic theme variables. **The design system is the source of truth for all styling** - all hardcoded values have been replaced with CSS variables and utility classes:

```css
.my-component {
  background-color: var(--background);
  color: var(--text);
  border: 1px solid var(--border);
  padding: var(--spacing-4);
  border-radius: var(--radius-md);
  transition: background-color var(--transition-base);
  opacity: var(--opacity-100);
  z-index: var(--z-dropdown);
}
```

Available variable categories:
- **Spacing**: `--spacing-*` (0 through 2500, including fractional values)
- **Border Radius**: `--radius-*` (none, sm, md, lg, xl, 2xl, 3xl, full)
- **Z-Index**: `--z-*` (base, dropdown, modal, tooltip, toast, navbar, navbar-mobile-menu-open, settings, etc.)
- **Transitions**: `--transition-*` (fast, base, slow, slower, slowest, ease-out, ease-in)
- **Opacity**: `--opacity-*` (0, 50, 60, 70, 80, 90, 100)
- **Transform Scale**: `--scale-*` (80, 95, 100, 110)
- **Blur**: `--blur-*` (sm, md, lg)
- **Viewport Heights**: `--vh-*` (80, 90)
- **Touch Targets**: `--touch-target-min`
- **Max Heights**: `--max-height-*` (dropdown, modal)
- **Easing**: `--ease-in-out-cubic`
- And more...

See [Design System Documentation](./DESIGN_SYSTEM.md) for complete variable reference.

### PostCSS Processing

- **Development**: PostCSS processes imports and adds vendor prefixes
- **Production**: CSS is minified via `build:css` script
- **Linting**: Stylelint configured for BEM naming convention
- **No Inline Styles**: All component styles are in external CSS files

### Spacing Utilities

Rizzo CSS includes comprehensive spacing utilities for margins and padding:

```html
<!-- Margin utilities -->
<div class="m-4">Margin on all sides</div>
<div class="mx-auto">Centered with auto margins</div>
<div class="mt-6 mb-4">Top and bottom margins</div>

<!-- Padding utilities -->
<div class="p-4">Padding on all sides</div>
<div class="px-6 py-4">Horizontal and vertical padding</div>

<!-- Sizes: 0, 1 (4px), 2 (8px), 3 (12px), 4 (16px), 5 (20px), 6 (24px), 8 (32px), 10 (40px), 12 (48px), 16 (64px), 20 (80px), 24 (96px) -->
```

See [Design System Documentation](./DESIGN_SYSTEM.md) for available variables and utilities.
