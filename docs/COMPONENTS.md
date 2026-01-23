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

## Component Features

All components in Rizzo CSS share these core features:

- **Semantic Theming** - All components use semantic CSS variables that adapt to the selected theme
- **Accessibility** - Full keyboard navigation, ARIA attributes, and screen reader support
- **BEM Naming** - Consistent class naming convention (block__element--modifier)
- **Responsive** - Mobile-first design with responsive breakpoints
- **Theme-Aware** - Automatically adapt to all 8 available themes
- **WCAG AA Compliant** - Proper contrast ratios and accessible color combinations

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

- Responsive mobile menu with hamburger toggle (activates at 1024px and below)
- Smooth hamburger-to-X animation
- Active link indicator with underline matching hover effect
- Dropdown menus with sub-links (Components and Themes dropdowns)
- Dropdown arrow rotates on hover
- Smart dropdown alignment (prevents viewport overflow)
- Full keyboard navigation for dropdowns (Arrow keys, Enter, Space, Escape, Home, End, Tab)
- Keyboard accessible with full ARIA support
- Settings button (gear icon) that opens Settings panel
- Sticky positioning at top
- Full width layout with no gaps
- Theme flash prevention (inline script in Layout)

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

- **Theme Switcher** - Integrated ThemeSwitcher component with theme icons
- **Font Size Slider** - Adjustable from 75% to 150% with filled track indicator (uses CSS gradient with `--slider-progress` variable)
- **Reduce Motion Toggle** - Applies `.reduced-motion` class to document root
- **High Contrast Toggle** - Applies `.high-contrast` class to document root
- **Hide Scrollbars Toggle** - Applies `.hide-scrollbars` class to document root
- Slide-in panel with overlay
- All settings persist in localStorage
- Full keyboard navigation (Escape to close)
- Focus trapping - Tab cycles within panel when open
- Accessible ARIA attributes
- Returns focus to trigger element on close
- Slider track visibility optimized for all themes (dark color for tiny-light theme)

### Sections

1. **Theme** - Theme switcher dropdown
2. **Font Size** - Slider with live preview (75% - 150%)
3. **Accessibility** - Reduce motion, high contrast, and hide scrollbars toggles

See [Settings Documentation](/docs/components/settings) for complete details.

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

See [Button Documentation](/docs/components/button) for complete details.

## Card Component

A flexible card component with variants, sections, and image support.

### Usage

```astro
---
import Card from '../components/Card.astro';
---

<Card>
  <h3>Card Title</h3>
  <p>Card content</p>
</Card>
```

### Variants

- `default` - Standard card with border
- `elevated` - Card with shadow, no border (lifts on hover)
- `outlined` - Transparent background with border
- `filled` - Uses main background color

### Card Sections

Use `card__header`, `card__body`, and `card__footer` classes for structured cards:

```html
<Card>
  <div class="card__header">
    <h3 class="card__title">Card Title</h3>
    <p class="card__subtitle">Subtitle</p>
  </div>
  <div class="card__body">
    <p>Card content</p>
  </div>
  <div class="card__footer">
    <button class="btn">Action</button>
  </div>
</Card>
```

### Card with Image

```html
<Card variant="elevated">
  <img src="image.jpg" alt="Description" class="card__image" />
  <div class="card__header">
    <h3 class="card__title">Card Title</h3>
  </div>
  <div class="card__body">
    <p>Card content</p>
  </div>
</Card>
```

See [Card Documentation](./cards.md) for complete examples and API.

## Modal Component

An accessible modal/dialog component with focus trapping, keyboard navigation, and backdrop overlay.

### Usage

```astro
---
import Modal from '../components/Modal.astro';
import Button from '../components/Button.astro';
---

<Modal id="example-modal" title="Example Modal" size="md">
  <p>Modal content goes here.</p>
  
  <div slot="footer">
    <Button>Cancel</Button>
    <Button class="btn-primary">Confirm</Button>
  </div>
</Modal>

<Button onclick="window.openModal_example-modal()">Open Modal</Button>
```

### Props

- `id` (string, optional) - Unique ID for the modal (auto-generated if not provided)
- `title` (string, optional) - Modal title (default: "Modal")
- `size` ('sm' | 'md' | 'lg', optional) - Modal size (default: "md")
- `open` (boolean, optional) - Whether modal is open by default (default: false)
- `closeOnOverlayClick` (boolean, optional) - Close when clicking overlay (default: true)
- `closeOnEscape` (boolean, optional) - Close on Escape key (default: true)
- `class` (string, optional) - Additional CSS classes

### Slots

- **Default slot** - Main modal content (goes in `modal__body`)
- **footer** - Footer content with action buttons

### Programmatic Control

Each modal exposes global functions based on its ID (hyphens converted to underscores):

```javascript
// Open modal (ID: example-modal becomes example_modal)
window.openModal_example_modal();

// Close modal
window.closeModal_example_modal();
```

### Features

- Full keyboard accessibility (Tab, Shift+Tab, Escape)
- Focus trapping - focus stays within modal when open
- ARIA attributes for screen readers
- Backdrop overlay with blur effect
- Responsive design (mobile-friendly)
- Theme-aware styling using semantic variables
- Respects `prefers-reduced-motion`

### Sizes

- `sm` - Small (24rem / 384px max-width)
- `md` - Medium (32rem / 512px max-width) - default
- `lg` - Large (48rem / 768px max-width)

### Accessibility

- Proper ARIA roles and attributes (`role="dialog"`, `aria-modal="true"`)
- Focus management - returns focus to trigger element on close
- Keyboard navigation - Tab cycles through focusable elements
- Escape key closes modal (if enabled)
- Screen reader announcements via `aria-labelledby`

See [Modal Documentation](/docs/components/modal) for complete details.

## Layout Components

### Container

The default container class:

```html
<div class="container">
  <!-- Content -->
</div>
```

**Default container**: 1200px max-width with 1rem horizontal padding and auto margins.

### Container Utilities

Container utilities provide responsive containers with automatic centering and padding:

- `.container-sm` - 640px max-width
- `.container-md` - 768px max-width
- `.container-lg` - 1024px max-width
- `.container-xl` - 1280px max-width
- `.container-2xl` - 1536px max-width
- `.container-full` - 100% width (with padding)

All containers include auto left/right margins (centering) and 1rem horizontal padding.

### Max-Width Utilities

Max-width utilities constrain element width without centering or padding:

**Size-Based:**
- `.max-w-xs` through `.max-w-7xl` (320px to 1280px)
- `.max-w-full` - 100%
- `.max-w-none` - No max-width

**Screen-Based:**
- `.max-w-screen-sm` - 640px
- `.max-w-screen-md` - 768px
- `.max-w-screen-lg` - 1024px
- `.max-w-screen-xl` - 1280px
- `.max-w-screen-2xl` - 1536px

See [Design System Documentation](./DESIGN_SYSTEM.md) for complete utility reference.

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
- **Copy** - Copy to clipboard icon
- **Check** - Checkmark/success icon

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

See [Icon Components Documentation](/docs/components/icons) for complete details.

## Form Components

Rizzo CSS includes a comprehensive set of accessible form components. See the [Forms Documentation](/docs/components/forms) for complete details and examples.

### Available Form Components

- **FormGroup** - Wrapper component for form fields with labels, help text, and error/success messages
- **Input** - Text input component with validation states and sizes (text, email, password, number, etc.)
- **Textarea** - Multi-line text input component
- **Select** - Dropdown selection component
- **Checkbox** - Checkbox input component
- **Radio** - Radio button component

### Quick Example

```astro
---
import FormGroup from '../components/FormGroup.astro';
import Input from '../components/Input.astro';
---

<FormGroup label="Email Address" labelFor="email" required help="We'll never share your email">
  <Input type="email" id="email" name="email" placeholder="you@example.com" />
</FormGroup>
```

All form components:
- Use semantic theme variables
- Support validation states (error, success)
- Support multiple sizes (sm, md, lg)
- Are fully accessible with ARIA attributes
- Work with all themes

See [Forms Documentation](/docs/components/forms) for complete usage examples and API documentation.

## CopyToClipboard Component

A reusable component for copying text values to the clipboard with visual feedback.

### Usage

```astro
---
import CopyToClipboard from '../components/CopyToClipboard.astro';
---

<CopyToClipboard value="example@email.com" format="Email" />
<CopyToClipboard value="var(--accent)" format="CSS Variable" />
<CopyToClipboard value="#FF5733" format="Hex" />
```

### Props

- `value` (string, required) - The text value to copy
- `label` (string, optional) - ARIA label for the button
- `format` (string, optional) - Format name shown in feedback message
- `class` (string, optional) - Additional CSS classes

### Features

- Visual feedback with icon change (copy → checkmark)
- Accessible with ARIA labels and keyboard support
- Fallback for older browsers (document.execCommand)
- Theme-aware styling
- Auto-reset after 2 seconds

See [CopyToClipboard Documentation](/docs/components/copy-to-clipboard) for complete details.

## Utility Classes

See [Accessibility Documentation](./ACCESSIBILITY.md#utility-classes) for utility classes.
