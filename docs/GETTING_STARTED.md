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
│   │   ├── Button.astro
│   │   ├── Navbar.astro
│   │   ├── Settings.astro
│   │   ├── ThemeSwitcher.astro
│   │   └── icons/      # Icon components
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
│   │       └── Snowflake.astro
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
│       ├── typography.css
│       ├── utilities.css
│       ├── variables.css
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

### Navbar

The navbar component includes a settings button:

```astro
---
import Navbar from '../components/Navbar.astro';
---

<Navbar siteName="My Site" />
```

**Props:**
- `siteName` (string, optional) - Site name displayed in navbar (default: "Rizzo CSS")
- `logo` (string, optional) - Path to logo image

The navbar includes a settings button that opens the Settings panel.

### Settings

The Settings component provides a comprehensive settings panel:

```astro
---
import Settings from '../components/Settings.astro';
---

<Settings open={false} />
```

**Features:**
- Theme switcher (integrated ThemeSwitcher component)
- Font size slider (75% - 150% with filled track)
- Reduce motion toggle
- High contrast toggle
- All settings persist in localStorage
- Accessible with keyboard navigation and ARIA attributes

**Opening Settings:**
The Settings panel is opened via `window.openSettings()` function, which is exposed globally. The Navbar component includes a settings button that calls this function.

### Theme Switcher

The ThemeSwitcher is integrated into the Settings panel, but can also be used standalone:

```astro
---
import ThemeSwitcher from '../components/ThemeSwitcher.astro';
---

<ThemeSwitcher />
```

The theme switcher automatically:
- Groups themes by Dark/Light
- Shows active theme name and icon in trigger button
- Each theme has its own icon (Moon, Palette, Owl, Snowflake, IceCream, Circle, Rainbow, Eye)
- Active theme option displays its theme background color
- Persists selection in localStorage
- Supports full keyboard navigation

### Button

Use the button component:

```astro
---
import Button from '../components/Button.astro';
---

<Button>Click me</Button>
```

Or use button classes:

```html
<button class="btn">Default</button>
<button class="btn btn-primary">Primary</button>
<button class="btn btn-outline">Outline</button>
```

## Using Themes

Themes are applied via the `data-theme` attribute on the HTML element:

```html
<html lang="en" data-theme="dracula-at-night">
```

See [Theming Documentation](./THEMING.md) for more details.

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
- `utilities.css` - Utility classes
- `components.css` - Component styles (Navbar, Settings, ThemeSwitcher)
- `themes/` - Theme definitions (dark/light)

### Semantic Variables

All styles use semantic theme variables:

```css
.my-component {
  background-color: var(--background);
  color: var(--text);
  border: 1px solid var(--border);
}
```

### PostCSS Processing

- **Development**: PostCSS processes imports and adds vendor prefixes
- **Production**: CSS is minified via `build:css` script
- **Linting**: Stylelint configured for BEM naming convention
- **No Inline Styles**: All component styles are in external CSS files

See [Design System Documentation](./DESIGN_SYSTEM.md) for available variables.
