# Rizzo CSS

<div align="center">

![Astro](https://img.shields.io/badge/Astro-5.16.13-FF5D01?style=for-the-badge&logo=astro&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-18+-339933?style=for-the-badge&logo=node.js&logoColor=white)
![PostCSS](https://img.shields.io/badge/PostCSS-8.5.6-DD3A0A?style=for-the-badge&logo=postcss&logoColor=white)
![Stylelint](https://img.shields.io/badge/Stylelint-17.0.0-263238?style=for-the-badge&logo=stylelint&logoColor=white)

A modern CSS design system built on Astro with semantic theming, accessibility-first components, and PostCSS optimization.

[Getting Started](#-getting-started) • [Documentation](#-documentation) • [Components](#-components) • [Theming](#-theming-system)

</div>

---

## ✨ Features

- 🎨 **8 Built-in Themes** - 4 dark and 4 light themes with semantic variable support
- ♿ **Accessibility First** - WCAG AA compliant with full keyboard navigation and screen reader support
- 🎯 **Semantic Theming** - All components use semantic CSS variables that adapt automatically
- 📦 **Comprehensive Components** - 15+ accessible, themeable components
- 🛠️ **Utility Classes** - Display, position, borders, flexbox, grid, gap, animations, and more
- 🎨 **OKLCH Colors** - Perceptually uniform color space for better color manipulation
- 📱 **Responsive** - Mobile-first design with responsive breakpoints
- ⚡ **Optimized** - PostCSS processing with minification and vendor prefixes
- 🎯 **Design System as Source of Truth** - 165+ CSS variables ensure all styling is consistent and framework-portable

## 🛠️ Tech Stack

- **[Astro](https://astro.build)** `^5.16.13` - Web framework
- **[PostCSS](https://postcss.org/)** `^8.5.6` - CSS transformation with import support
- **[postcss-import](https://github.com/postcss/postcss-import)** `^16.1.1` - CSS import support (SCSS/SASS-like)
- **[Autoprefixer](https://github.com/postcss/autoprefixer)** `^10.4.23` - Automatic vendor prefixes
- **[cssnano](https://cssnano.co/)** `^7.1.2` - CSS minification
- **[Stylelint](https://stylelint.io/)** `^17.0.0` - CSS linter
- **[Algolia Search](https://www.algolia.com/)** `^5.47.0` - Search integration
- **OKLCH color format** - Perceptually uniform color space

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- pnpm (recommended) or npm

### Installation

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
| `pnpm dev` | Start development server |
| `pnpm build` | Build production site (includes CSS minification) |
| `pnpm build:css` | Build minified CSS to `public/css/main.min.css` |
| `pnpm preview` | Preview production build |
| `pnpm lint:css` | Lint CSS files |
| `pnpm lint:css:fix` | Auto-fix CSS linting issues |

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
- All 8 themes are available

**Production:**
- CSS is minified and optimized via `build:css` script
- Layout automatically uses `public/css/main.min.css` in production builds
- Minification preserves pseudo-element syntax (`::before`, `::after`)

### CSS Architecture

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
- `components.css` - Component styles (Navbar, Settings, ThemeSwitcher, Modal, CopyToClipboard, Card, Alert, Toast, Badge, Tooltip, CodeBlock, Dropdown)
- `pages.css` - Page-specific styles
- `media-queries.css` - Responsive breakpoints and media query definitions
- `themes/` - Theme definitions (dark/light folders)

**Naming Convention**: All component classes use BEM (Block Element Modifier) naming:
- `.navbar` (block)
- `.navbar__container` (element)
- `.navbar__menu--open` (modifier)

### Theming System

Rizzo CSS includes **8 built-in themes** (4 dark, 4 light) with semantic variable support:

- All components automatically adapt to the selected theme
- Themes use OKLCH color format for better color manipulation
- **Contrast-aware text colors** - Automatic text color selection based on background lightness for WCAG AA compliance
- Settings panel for theme switching, font size adjustment, and accessibility options
- **All settings persist in localStorage** - Theme, font size, reduced motion, high contrast, and scrollbar style preferences are automatically saved and restored
- Shadow and overlay variables for theme-aware effects

See [Theming Documentation](./docs/THEMING.md) for details.

### Components

Accessible, themeable components:
- **Navbar** - Responsive navigation with dropdown menus, search, and settings button. Mobile menu with smooth transitions and full-width layout
- **Settings** - Settings panel with theme switcher, font size control, and accessibility options (reduce motion, high contrast, scrollbar style). All settings persist in localStorage. Opening/closing animations, mobile responsive
- **ThemeSwitcher** - Accessible dropdown for theme selection with theme-specific icons (integrated in Settings)
- **Button** - Semantic button component with variants using theme variables
- **Badge** - Small labels and tags for displaying status, categories, or counts with variants, sizes, and pill option
- **Icons** - Reusable SVG icon components using Tabler Icons
- **Form Components** - Complete form system (FormGroup, Input, Textarea, Select, Checkbox, Radio) with validation states
- **Card** - Flexible card component with variants, sections, and image support
- **Modal** - Accessible modal/dialog component with focus trapping and keyboard navigation. Three sizes: sm, md (default), lg
- **CopyToClipboard** - Copy to clipboard component with visual feedback
- **CodeBlock** - Code block component with integrated copy-to-clipboard functionality. Used throughout documentation for code examples with icon-only copy buttons
- **Search** - Search component with Algolia integration, keyboard shortcuts (Cmd+K/Ctrl+K), close button on desktop, and mobile responsive
- **Alert** - Alert/notification component with variants, dismissible functionality, auto-dismiss, and dynamic creation via JavaScript
- **Toast** - Fixed position toast notifications with auto-dismiss and programmatic control. Available globally via `window.showToast()`. Six position options with automatic stacking
- **Tooltip** - Accessible tooltip component with four position options (top, bottom, left, right), keyboard support, and theme-aware styling
- **Dropdown** - Accessible dropdown menu component with keyboard navigation, nested submenus (up to 3 levels), menu items, separators, and custom click handlers

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

Comprehensive documentation is available in the `docs/` directory:

- [Getting Started](./docs/GETTING_STARTED.md) - Quick start guide and installation
- [Design System](./docs/DESIGN_SYSTEM.md) - Core design principles and semantic variables
- [Theming](./docs/THEMING.md) - Theme system documentation and custom theme creation
- [Colors](./docs/COLORS.md) - Color reference with multiple format options (OKLCH, Hex, RGB, HSL, CSS Variable)
- [Components](./docs/COMPONENTS.md) - Component library and usage examples
- [Accessibility](./docs/ACCESSIBILITY.md) - Accessibility guidelines and utility classes
- [Multi-Framework Strategy](./docs/MULTI_FRAMEWORK.md) - Strategy for adding Vue, React, and Svelte support
- [TODO](./docs/TODO.md) - Roadmap and tasks for continuing the design system

## 📚 External Resources

- [Astro Documentation](https://docs.astro.build)
- [PostCSS Documentation](https://postcss.org/docs)
- [Stylelint Documentation](https://stylelint.io/user-guide)
