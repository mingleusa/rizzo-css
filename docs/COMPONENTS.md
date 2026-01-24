# Components

Rizzo CSS includes accessible, themeable components built with Astro. Each component has its own dedicated documentation page with live examples, usage instructions, and API details.

## Component Pages

- [Navbar](/docs/components/navbar) - Responsive, accessible navigation bar
- [Settings](/docs/components/settings) - Comprehensive settings panel
- [Theme Switcher](/docs/components/theme-switcher) - Accessible theme switcher
- [Button](/docs/components/button) - Semantic button component
- [Icons](/docs/components/icons) - Reusable SVG icon components
- [CopyToClipboard](/docs/components/copy-to-clipboard) - Copy to clipboard component
- [Forms](/docs/components/forms) - Form components (FormGroup, Input, Textarea, Select, Checkbox, Radio)
- [Cards](/docs/components/cards) - Flexible card component
- [Modal](/docs/components/modal) - Accessible modal/dialog component
- [Search](/docs/components/search) - Search component with Algolia integration
- [Alert](/docs/components/alert) - Alert/notification component

## Component Features

All components in Rizzo CSS share these core features:

- **Semantic Theming** - All components use semantic CSS variables that adapt to the selected theme
- **Accessibility** - Full keyboard navigation, ARIA attributes, and screen reader support
- **BEM Naming** - Consistent class naming convention (block__element--modifier)
- **Responsive** - Mobile-first design with responsive breakpoints
- **Theme-Aware** - Automatically adapt to all 8 available themes
- **WCAG AA Compliant** - Proper contrast ratios and accessible color combinations

## Navbar

A responsive, accessible navigation bar with search, settings button, and mobile menu.

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

- **Desktop**: Search and settings on far right, dropdown menus with smart alignment
- **Mobile**: Search on far right, settings on far right, hamburger menu with smooth transitions
- Responsive mobile menu (activates at 1024px and below) with full-width layout
- Smooth hamburger-to-X animation and menu open/close transitions
- Active link indicator with underline
- Dropdown menus with sub-links and keyboard navigation
- Full-width border that spans 100vw
- Settings button opens Settings panel
- Sticky positioning at top

See [Navbar Documentation](/docs/components/navbar) for complete details.

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

- **Theme Switcher** - Integrated ThemeSwitcher component with theme icons (persists in localStorage as `theme`)
- **Font Size Slider** - Adjustable from 75% to 150% with filled track indicator (uses CSS gradient with `--slider-progress` variable). Persists in localStorage as `fontSizeScale`
- **Reduce Motion Toggle** - Applies `.reduced-motion` class to document root. Persists in localStorage as `reducedMotion`
- **High Contrast Toggle** - Applies `.high-contrast` class to document root. Persists in localStorage as `highContrast`
- **Scrollbar Style** - Radio button group with three options: Thin (default), Thick, and Hidden. Persists in localStorage as `scrollbarStyle` (values: `thin`, `thick`, `hidden`)
- Slide-in panel with overlay
- **Opening and closing animations** - Smooth slide-in from right with overlay fade (respects `prefers-reduced-motion`)
- **All settings persist in localStorage** - All preferences are automatically saved and restored on page load
- Full keyboard navigation (Escape to close)
- Focus trapping - Tab cycles within panel when open
- Accessible ARIA attributes
- Returns focus to trigger element on close
- Slider track visibility optimized for all themes (dark color for tiny-light theme)
- **Mobile responsive** - Full width on mobile devices, optimized layout

### Sections

1. **Theme** - Theme switcher dropdown
2. **Font Size** - Slider with live preview (75% - 150%)
3. **Accessibility** - Reduce motion, high contrast, and scrollbar style options

### Settings Persistence

All settings options automatically persist to localStorage and are restored when the page loads:

- `theme` - Selected theme name (e.g., `dracula-at-night`, `nord-light`)
- `fontSizeScale` - Font size multiplier (e.g., `1.0` for 100%, `1.25` for 125%)
- `reducedMotion` - Boolean string (`true` or `false`)
- `highContrast` - Boolean string (`true` or `false`)
- `scrollbarStyle` - Scrollbar style preference (`thin`, `thick`, or `hidden`)

See [Settings Documentation](/docs/components/settings) for complete details.

## Theme Switcher

An accessible dropdown menu for switching between themes, integrated into the Settings component.

### Features

- Groups themes by Dark/Light with theme-specific icons
- Active theme displays name and icon in trigger button
- Full keyboard navigation (Arrow keys, Enter, Space, Escape, Home, End)
- Accessible ARIA menu pattern
- Persists selection in localStorage

## Button Component

Semantic button component with variants using theme variables.

### Variants

- `btn-primary`, `btn-success`, `btn-warning`, `btn-error`, `btn-info`, `btn-outline`

All buttons are keyboard accessible and theme-aware.

See [Button Documentation](/docs/components/button) for complete details.

## Card Component

Flexible card component with variants, sections, and image support.

### Variants

- `default` - Standard card with border
- `elevated` - Card with shadow (lifts on hover)
- `outlined` - Transparent background with border
- `filled` - Uses main background color

### Sections

Use `card__header`, `card__body`, and `card__footer` classes for structured cards.

See [Card Documentation](/docs/components/cards) for complete examples.

## Modal Component

Accessible modal/dialog component with focus trapping and keyboard navigation.

### Features

- Focus trapping and keyboard navigation
- Backdrop overlay with blur effect
- Sizes: sm, md (default), lg
- Programmatic control via global functions
- Accessible ARIA attributes
- Theme-aware styling

See [Modal Documentation](/docs/components/modal) for complete details.

## Search Component

A powerful search component with Algolia integration and live filtering.

### Features

- Algolia integration with client-side fallback
- Keyboard shortcut (Cmd+K / Ctrl+K)
- Close button on desktop (X icon with screen reader label)
- Mobile responsive with full-width panel
- Live search results as you type
- Full keyboard navigation
- Mutually exclusive with mobile menu (only one open at a time)

See [Search Documentation](/docs/components/search) for complete details.

## Alert Component

An accessible alert/notification component for displaying important messages to users.

### Usage

```astro
---
import Alert from '../components/Alert.astro';
---

<Alert variant="success" dismissible>
  Your changes have been saved successfully!
</Alert>

<Alert variant="error">
  An error occurred. Please try again.
</Alert>

<Alert variant="warning" dismissible>
  This action cannot be undone.
</Alert>

<Alert variant="info">
  New features are available. Check them out!
</Alert>
```

### Props

- `variant` ('success' | 'error' | 'warning' | 'info', optional) - Alert variant (default: 'info')
- `dismissible` (boolean, optional) - Whether alert can be dismissed (default: false)
- `class` (string, optional) - Additional CSS classes

### Variants

- `success` - Green/positive feedback
- `error` - Red/error messages
- `warning` - Yellow/caution messages
- `info` - Blue/informational messages

### Features

- Four semantic variants (success, error, warning, info)
- Optional dismissible functionality with close button
- Accessible ARIA attributes
- Theme-aware styling
- Smooth dismiss animation (respects `prefers-reduced-motion`)

### Accessibility

- Proper ARIA roles (`role="alert"` for non-dismissible, `role="alertdialog"` for dismissible)
- Screen reader announcements
- Keyboard accessible close button
- Focus management on dismiss

See [Alert Documentation](/docs/components/alert) for complete details.

## Layout Components

### Container Utilities

Responsive containers with automatic centering and padding:
- `.container-sm` through `.container-2xl` (640px to 1536px max-width)
- `.container-full` - 100% width with padding
- Default `.container` - 1200px max-width

### Max-Width Utilities

Constrain element width without centering:
- Size-based: `.max-w-xs` through `.max-w-7xl` (320px to 1280px)
- Screen-based: `.max-w-screen-sm` through `.max-w-screen-2xl`

See [Design System Documentation](./DESIGN_SYSTEM.md) for complete utility reference.

## Icon Components

Reusable SVG icon components using Tabler Icons (MIT licensed).

### Available Icons

Gear, Close, ChevronDown, Moon, Palette, Owl, Snowflake, IceCream, Circle, Rainbow, Eye, Copy, Check

All icons accept `width`, `height`, and `class` props, use `currentColor` for theming, and are accessible.

See [Icon Components Documentation](/docs/components/icons) for complete details.

## Form Components

Comprehensive set of accessible form components with validation states.

### Components

- **FormGroup** - Wrapper with labels, help text, and error/success messages
- **Input** - Text input with validation states and sizes
- **Textarea** - Multi-line text input
- **Select** - Dropdown selection
- **Checkbox** - Checkbox input
- **Radio** - Radio button

All form components support validation states, multiple sizes, and are fully accessible.

See [Forms Documentation](/docs/components/forms) for complete examples.

## CopyToClipboard Component

Component for copying text values to the clipboard with visual feedback.

### Features

- Visual feedback (copy → checkmark icon)
- Accessible with ARIA labels
- Auto-reset after 2 seconds
- Theme-aware styling

See [CopyToClipboard Documentation](/docs/components/copy-to-clipboard) for complete details.

## Utility Classes

See [Accessibility Documentation](./ACCESSIBILITY.md#utility-classes) for utility classes.
