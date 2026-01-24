# Getting Started

This guide will help you get started with Rizzo CSS.

## Installation

Rizzo CSS is built on Astro. To use it in your project:

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
│   ├── components/      # Astro components
│   │   ├── Alert.astro
│   │   ├── Badge.astro
│   │   ├── Button.astro
│   │   ├── Card.astro
│   │   ├── CodeBlock.astro
│   │   ├── CopyToClipboard.astro
│   │   ├── FormGroup.astro
│   │   ├── Input.astro
│   │   ├── Textarea.astro
│   │   ├── Select.astro
│   │   ├── Checkbox.astro
│   │   ├── Radio.astro
│   │   ├── Modal.astro
│   │   ├── Navbar.astro
│   │   ├── Search.astro
│   │   ├── Settings.astro
│   │   ├── ThemeSwitcher.astro
│   │   ├── Toast.astro
│   │   ├── Tooltip.astro
│   │   ├── Dropdown.astro
│   │   ├── Tabs.astro
│   │   └── icons/      # Icon components
│   │       ├── Copy.astro
│   │       ├── Check.astro
│   │       ├── ChevronDown.astro
│   │       ├── Circle.astro
│   │       ├── Close.astro
│   │       ├── Eye.astro
│   │       ├── Gear.astro
│   │       ├── IceCream.astro
│   │       ├── Moon.astro
│   │       ├── Owl.astro
│   │       ├── Palette.astro
│   │       ├── Rainbow.astro
│   │       ├── Search.astro
│   │       ├── Snowflake.astro
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
│   │   └── Layout.astro
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
│       └── themes/      # Theme files
│           ├── dark/
│           │   ├── dracula-at-night.css
│           │   ├── night-owl.css
│           │   ├── shades-of-purple.css
│           │   └── winter-is-coming-dark-black.css
│           └── light/
│               ├── grey-light-pro.css
│               ├── nord-light.css
│               ├── snazzy-light.css
│               └── tiny-light.css
├── docs/                # Documentation
│   ├── GETTING_STARTED.md
│   ├── DESIGN_SYSTEM.md
│   ├── THEMING.md
│   ├── COMPONENTS.md
│   └── ACCESSIBILITY.md
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

Themes are applied via the `data-theme` attribute on the HTML element:

```html
<html lang="en" data-theme="dracula-at-night">
```

See [Theming Documentation](./THEMING.md) for more details.

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
- `components.css` - Component styles (Navbar, Settings, ThemeSwitcher, Modal, CopyToClipboard, Card, Alert, Toast, Badge, Tooltip, CodeBlock, Dropdown, Tabs, Search)
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
- **Z-Index**: `--z-*` (base, dropdown, modal, tooltip, toast, navbar, settings, etc.)
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
