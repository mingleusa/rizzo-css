# Components

Rizzo CSS includes accessible, themeable components built with Astro. Each component has its own dedicated documentation page with live examples, usage instructions, and API details.

## Component Pages

- [Navbar](/docs/components/navbar) - Responsive, accessible navigation bar
- [Settings](/docs/components/settings) - Comprehensive settings panel
- [Theme Switcher](/docs/components/theme-switcher) - Accessible theme switcher
- [Button](/docs/components/button) - Semantic button component
- [Badge](/docs/components/badge) - Small labels and tags with variants and sizes
- [Icons](/docs/components/icons) - Reusable SVG icon components
- [CopyToClipboard](/docs/components/copy-to-clipboard) - Copy to clipboard component
- [Forms](/docs/components/forms) - Form components (FormGroup, Input, Textarea, Select, Checkbox, Radio)
- [Cards](/docs/components/cards) - Flexible card component
- [Modal](/docs/components/modal) - Accessible modal/dialog component
- [Alert](/docs/components/alert) - Alert/notification component with auto-dismiss
- [Toast](/docs/components/toast) - Fixed position toast notifications
- [Search](/docs/components/search) - Search component with Algolia integration
- [Tooltip](/docs/components/tooltip) - Accessible tooltip component with positioning options
- [Dropdown](/docs/components/dropdown) - Accessible dropdown menu with keyboard navigation, nested submenus (up to 3 levels), menu items, separators, and custom click handlers

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
- **Scrollbar Style** - Radio button group with three options: Thin (default, 0.5rem/8px), Thick (1.5rem/24px), and Hidden. Applies classes to `html` element (`scrollbar-thick` or `scrollbar-hidden`). Persists in localStorage as `scrollbarStyle` (values: `thin`, `thick`, `hidden`)
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

## Badge Component

Small labels and tags for displaying status, categories, or counts.

### Features

- **Variants** - `badge--primary`, `badge--success`, `badge--warning`, `badge--error`, `badge--info`
- **Sizes** - `badge--sm`, `badge--md` (default), `badge--lg`
- **Pill variant** - Fully rounded badges with `badge--pill` class
- Inline element - Can be used within text or alongside other components
- Theme-aware styling using semantic variables

### Usage

```astro
---
import Badge from '../components/Badge.astro';
---

<Badge variant="primary">New</Badge>
<Badge variant="success" size="sm">Active</Badge>
<Badge variant="error" pill>Urgent</Badge>
```

Or using classes:

```html
<span class="badge badge--primary">Primary</span>
<span class="badge badge--success badge--sm">Small Success</span>
<span class="badge badge--error badge--lg badge--pill">Large Pill Error</span>
```

See [Badge Documentation](/docs/components/badge) for complete details.

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
- **Three sizes**: `sm` (24rem), `md` (32rem, default), `lg` (48rem)
- Programmatic control via global functions
- Accessible ARIA attributes
- Theme-aware styling
- Responsive design (95vw on mobile)

### Size Variants

- `sm` - Small (384px) - Best for confirmation dialogs
- `md` - Medium (512px) - Default, great for most use cases
- `lg` - Large (768px) - Ideal for complex forms and detailed content

See [Modal Documentation](/docs/components/modal) for complete details and live examples.

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

An accessible alert/notification component for displaying important messages to users. Supports both static usage in Astro templates and dynamic creation via JavaScript.

### Usage

**Static Usage (Astro Component):**
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

**Dynamic Usage (JavaScript):**
```javascript
// Show alert programmatically
showAlert('success', 'Success! Your changes have been saved successfully.');
showAlert('error', 'Error! Something went wrong.');
showAlert('warning', 'Warning! This action cannot be undone.', true, 7000); // Auto-dismiss in 7 seconds
```

### Props

- `variant` ('success' | 'error' | 'warning' | 'info', optional) - Alert variant (default: 'info')
- `dismissible` (boolean, optional) - Whether alert can be dismissed (default: false)
- `autoDismiss` (number, optional) - Auto-dismiss duration in milliseconds. Set to `0` to disable (default: 0)
- `id` (string, optional) - Unique ID for the alert. If not provided, a random ID will be generated
- `class` (string, optional) - Additional CSS classes

### Variants

- `success` - Green/positive feedback
- `error` - Red/error messages
- `warning` - Yellow/caution messages (uses white text for contrast)
- `info` - Blue/informational messages

### Features

- Four semantic variants (success, error, warning, info)
- Optional dismissible functionality with close button
- **Auto-dismiss functionality** - Automatically dismiss after a set duration
- **Dynamic creation** - Create alerts programmatically via `showAlert()` function
- **Live examples** - Interactive examples on documentation page
- Accessible ARIA attributes (`role="alert"`, `aria-live="polite"`)
- Theme-aware styling using semantic variables
- Smooth dismiss animation (respects `prefers-reduced-motion`)
- Proper spacing between multiple alerts
- Contrast-aware text colors (white text on warning alerts for visibility)

### Accessibility

- Proper ARIA roles (`role="alert"` with `aria-live="polite"`)
- Screen reader announcements
- Keyboard accessible close button
- Focus management on dismiss
- WCAG AA contrast compliance

See [Alert Documentation](/docs/components/alert) for complete details and live examples.

## Toast Component

Fixed position toast notifications with auto-dismiss and programmatic control. Toasts are available globally via `window.showToast()` on all pages.

### Usage

**Programmatic Usage (Global Functions):**
```javascript
// Show a toast (functions available globally via window.showToast)
showToast('Success! Your changes have been saved.', {
  variant: 'success',
  position: 'top-right',
  autoDismiss: 5000
});

// Show toast with different position
showToast('Error occurred', {
  variant: 'error',
  position: 'bottom-left',
  autoDismiss: 3000
});

// Show toast without auto-dismiss
showToast('This toast stays until dismissed', {
  variant: 'info',
  autoDismiss: 0
});

// Remove all toasts
removeAllToasts();

// Remove specific toast by ID
const toastId = showToast('This will be removed', { variant: 'info' });
setTimeout(() => removeToast(toastId), 2000);
```

### Features

- **Six position options** - top/bottom + left/center/right
- **Automatic stacking** - Multiple toasts stack vertically in the same position
- **Auto-dismiss** - Customizable duration (default: 5 seconds, set to 0 to disable)
- **Programmatic control** - `showToast()`, `removeToast()`, `removeAllToasts()` available globally
- **Live examples** - Interactive examples on documentation page
- Smooth slide-in animations (respects `prefers-reduced-motion`)
- All alert variants supported (success, error, warning, info)
- Mobile responsive (full width on mobile)
- Accessible with ARIA attributes (`role="alert"`, `aria-live="polite"`)
- Theme-aware styling using semantic variables
- Contrast-aware text colors (white text on warning toasts for visibility)

### Toast Options

- `variant` (string, optional) - Alert variant: 'success', 'error', 'warning', 'info' (default: 'info')
- `position` (string, optional) - Position: 'top-right', 'top-left', 'top-center', 'bottom-right', 'bottom-left', 'bottom-center' (default: 'top-right')
- `autoDismiss` (number, optional) - Duration in milliseconds (default: 5000, set to 0 to disable)
- `dismissible` (boolean, optional) - Whether toast can be manually dismissed (default: true)

### Global Functions

Toast functions are automatically available on all pages via `Layout.astro`:
- `window.showToast(message, options)` - Show a toast notification
- `window.removeToast(toastId)` - Remove a specific toast by ID
- `window.removeAllToasts()` - Remove all visible toasts

See [Toast Documentation](/docs/components/toast) for complete details and live examples.

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

## Utility Classes

Rizzo CSS includes comprehensive utility classes for rapid development:

### Spacing & Sizing
- **Spacing Utilities** - Margin and padding utilities (m-*, p-*, mx-*, my-*, px-*, py-*)
- **Sizing Utilities** - Width, height, min/max dimensions (w-*, h-*, min-w-*, max-w-*, etc.)

### Layout
- **Display Utilities** - Display types with responsive variants (block, flex, grid, hidden, etc.)
- **Position Utilities** - Position types and z-index scale (static, relative, absolute, fixed, sticky, z-*)
- **Flexbox Utilities** - Comprehensive flexbox utilities (flex-direction, flex-wrap, justify-content, align-items, etc.)
- **Grid Utilities** - CSS Grid utilities (grid-cols-*, grid-rows-*, col-span-*, row-span-*)
- **Gap Utilities** - Gap utilities for flexbox and grid (gap-*, gap-x-*, gap-y-*)

### Styling
- **Border Utilities** - Border radius, width, and color utilities (rounded-*, border-*, border-color, etc.)
- **Shadow Utilities** - Theme-aware shadow system (shadow-sm, shadow, shadow-md, shadow-lg, shadow-xl)
- **Color Utilities** - Background and text color utilities using semantic theme variables (bg-*, text-*, text-on-*)

### Animation
- **Animation Utilities** - Transition utilities that respect prefers-reduced-motion (transition-*, duration-*, ease-*, delay-*)

See [Design System Documentation](./DESIGN_SYSTEM.md) for complete utility reference with examples.

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

## CodeBlock Component

A code block component with integrated copy-to-clipboard functionality. Used throughout documentation to display code examples with a copy button.

### Features

- **Icon-only copy button** - Clean copy button that doesn't duplicate code content
- **Reads from code block** - Button copies the actual code from the `<code>` element
- **Language labels** - Optional language indicator in header
- **Theme-aware styling** - Matches current theme
- **Accessible** - Proper ARIA labels and keyboard support

### Usage

```astro
---
import CodeBlock from '../components/CodeBlock.astro';
---

<CodeBlock code={`const example = 'Hello World';`} language="javascript" />
```

### Props

- `code` (string, required) - The code content to display
- `language` (string, optional) - Language label (e.g., "javascript", "astro", "css")
- `class` (string, optional) - Additional CSS classes

**Note**: All code examples throughout the documentation use this component, ensuring consistent styling and easy copying.

## Tooltip Component

Accessible tooltip component that provides additional context when users hover over or focus on elements.

### Usage

```astro
---
import Tooltip from '../components/Tooltip.astro';
---

<div class="tooltip-wrapper" aria-describedby="my-tooltip">
  <button class="btn btn-primary">Hover me</button>
  <Tooltip id="my-tooltip" text="This is a tooltip" position="top" />
</div>
```

### Props

- `text` (string, required) - The tooltip text content
- `position` ('top' | 'bottom' | 'left' | 'right', optional) - Tooltip position (default: 'top')
- `delay` (number, optional) - Delay in milliseconds before showing (default: 0)
- `id` (string, optional) - Unique ID for the tooltip
- `class` (string, optional) - Additional CSS classes

### Features

- Four position options (top, bottom, left, right)
- Automatic arrow positioning
- Accessible with ARIA attributes (`role="tooltip"`, `aria-describedby`)
- Keyboard accessible (works with focus states)
- Theme-aware styling using semantic variables
- Smooth animations (respects `prefers-reduced-motion`)
- Automatic text wrapping for long content
- Maximum width constraint for readability

### Accessibility

- Uses `role="tooltip"` for semantic meaning
- Requires `aria-describedby` on trigger element
- Works with keyboard focus (`:focus-within`)
- Screen reader compatible

See [Tooltip Documentation](/docs/components/tooltip) for complete details and live examples.

## Dropdown Component

Accessible dropdown menu component for displaying lists of actions or options. Supports nested submenus up to 3 levels deep.

### Usage

```astro
---
import Dropdown from '../components/Dropdown.astro';
---

<Dropdown 
  trigger="Actions"
  items={[
    { label: 'Edit', value: 'edit', onClick: 'handleAction' },
    { label: 'Delete', value: 'delete', onClick: 'handleAction' },
    { separator: true },
    { label: 'Settings', href: '/settings' },
  ]}
/>
```

### Props

- `trigger` (string, required) - Text displayed on the trigger button
- `items` (MenuItem[], required) - Array of menu items
- `id` (string, optional) - Unique ID for the dropdown. Auto-generated if not provided
- `class` (string, optional) - Additional CSS classes
- `position` ('left' | 'right', optional) - Menu position relative to trigger (default: 'left')
- `align` ('start' | 'end', optional) - Menu alignment within position (default: 'start')

### MenuItem Interface

- `label` (string, required) - Display text for the menu item
- `value` (string, optional) - Value passed to onClick handler
- `href` (string, optional) - If provided, renders as a link instead of button
- `onClick` (string, optional) - Name of global function to call when clicked (must be available on window)
- `disabled` (boolean, optional) - Whether the item is disabled
- `separator` (boolean, optional) - If true, renders as a separator line
- `submenu` (MenuItem[], optional) - Array of menu items for nested submenu (supports up to 3 levels)

### Features

- Full keyboard navigation (Arrow keys, Enter, Space, Escape, Home, End, Tab)
- Nested submenus with click-to-open and keyboard support (ArrowRight/ArrowLeft)
- Supports up to 3 levels of nested menus with proper parent menu preservation
- Submenu items properly handle clicks and close parent menu
- Accessible ARIA attributes (role="menu", role="menuitem", aria-expanded, aria-haspopup, aria-label)
- All menu items have accessible names via aria-label attributes
- WCAG AA compliant touch targets (minimum 2.5rem/40px height)
- No horizontal scrolling - submenus appear directly under parent items
- Menus expand to show all items without vertical scrollbars
- Smart submenu closing - only closes siblings at the same level, preserves parent menus
- Outside click to close
- Focus management (returns to trigger on close)
- Menu items can be links or buttons
- Separator support for grouping items
- Disabled item support
- Positioning options (left/right alignment)
- Theme-aware styling using semantic variables
- Smooth animations (respects prefers-reduced-motion)
- Mobile responsive

See [Dropdown Documentation](/docs/components/dropdown) for complete details and live examples.

## Utility Classes

See [Accessibility Documentation](./ACCESSIBILITY.md#utility-classes) for utility classes.
