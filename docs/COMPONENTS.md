# Components

Rizzo CSS includes accessible, themeable components built with Astro.

## Navbar

A responsive, accessible navigation bar with integrated theme switcher.

### Usage

```astro
---
import Navbar from '../components/Navbar.astro';
---

<Navbar siteName="My Site" />
```

### Props

- `siteName` (string, optional) - Site name displayed in navbar (default: "Rizzo CSS")
- `logo` (string, optional) - Path to logo image

### Features

- Responsive mobile menu with hamburger toggle
- Keyboard accessible with full ARIA support
- ARIA labels and roles
- Settings button (gear icon) that opens Settings panel
- Sticky positioning at top
- Full width layout with no gaps
- Theme flash prevention (inline script in Layout)
- Navbar links use theme-specific hover colors (dark color for tiny-light theme)

### Accessibility

- Skip link to main content
- Proper ARIA attributes
- Keyboard navigation support
- Focus management

## Settings

A comprehensive settings panel for theme switching, font size adjustment, and accessibility options.

### Usage

The Settings component is included in the Layout and opened via the Navbar settings button:

```astro
---
import Settings from '../components/Settings.astro';
---

<Settings open={false} />
```

Or open programmatically:

```javascript
window.openSettings();
```

### Features

- **Theme Switcher** - Integrated ThemeSwitcher component with theme icons
- **Font Size Slider** - Adjustable from 75% to 150% with filled track indicator (uses CSS gradient with `--slider-progress` variable)
- **Reduce Motion Toggle** - Applies `.reduced-motion` class to document root
- **High Contrast Toggle** - Applies `.high-contrast` class to document root
- Slide-in panel with overlay
- All settings persist in localStorage
- Full keyboard navigation (Escape to close)
- Accessible ARIA attributes
- Slider track visibility optimized for all themes (dark color for tiny-light theme)

### Sections

1. **Theme** - Theme switcher dropdown
2. **Font Size** - Slider with live preview (75% - 150%)
3. **Accessibility** - Reduce motion and high contrast toggles

## Theme Switcher

An accessible dropdown menu for switching between themes. Integrated into the Settings component.

### Usage

```astro
---
import ThemeSwitcher from '../components/ThemeSwitcher.astro';
---

<ThemeSwitcher />
```

### Features

- Groups themes by Dark/Light
- Each theme has its own icon (Moon, Palette, Owl, Snowflake, IceCream, Circle, Rainbow, Eye)
- Active theme displays its name and icon in the trigger button
- Active theme option shows its theme background color
- Persists selection in localStorage
- Full keyboard navigation
- Accessible ARIA menu pattern
- Works standalone or within Settings panel

### Keyboard Navigation

- `Enter`/`Space` - Open/close menu
- `ArrowDown`/`ArrowUp` - Navigate options
- `Home`/`End` - Jump to first/last
- `Escape` - Close menu

### Accessibility

- ARIA menu pattern with `role="menu"` and `role="menuitemradio"`
- Keyboard accessible (Arrow keys, Enter, Space, Escape, Home, End)
- Screen reader support with proper ARIA attributes
- Focus management and tabindex handling
- `aria-hidden` and `aria-expanded` state management

## Button Component

### Button.astro

A simple button component:

```astro
---
import Button from '../components/Button.astro';
---

<Button>Click me</Button>
```

### Button Classes

Use semantic button classes with theme variables:

```html
<button class="btn">Default</button>
<button class="btn btn-primary">Primary</button>
<button class="btn btn-success">Success</button>
<button class="btn btn-warning">Warning</button>
<button class="btn btn-error">Error</button>
<button class="btn btn-info">Info</button>
<button class="btn btn-outline">Outline</button>
```

All buttons:
- Use semantic theme variables
- Have hover and focus states
- Support disabled state
- Are keyboard accessible

See [Design System](./DESIGN_SYSTEM.md) for styling details.

## Layout Components

### Container

```html
<div class="container">
  <!-- Content -->
</div>
```

### Card

```html
<div class="card">
  <h3>Card Title</h3>
  <p>Card content</p>
</div>
```

## Icon Components

Reusable SVG icon components using Tabler Icons (MIT licensed):

### Available Icons

- **Gear** - Settings/configuration icon
- **Close** - Close/dismiss icon
- **ChevronDown** - Dropdown indicator
- **Moon** - Dracula At Night theme icon
- **Palette** - Shades of Purple theme icon
- **Owl** - Night Owl theme icon
- **Snowflake** - Winter is Coming theme icon
- **IceCream** - Nord Light theme icon
- **Circle** - Grey Light Pro theme icon
- **Rainbow** - Snazzy Light theme icon
- **Eye** - Tiny Light theme icon

### Usage

```astro
---
import Gear from '../components/icons/Gear.astro';
import Moon from '../components/icons/Moon.astro';
---

<Gear width={20} height={20} />
<Moon width={16} height={16} class="my-icon" />
```

### Icon Props

All icons:
- Accept `width` and `height` props (default: 16)
- Accept optional `class` prop for styling
- Use `currentColor` for theming (adapts to theme)
- Include `aria-hidden="true"` by default
- Are accessible and theme-aware

## Utility Classes

See [Accessibility Documentation](./ACCESSIBILITY.md#utility-classes) for utility classes.
