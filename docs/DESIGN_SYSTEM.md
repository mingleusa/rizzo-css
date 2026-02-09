# Design System

Rizzo CSS uses a semantic theming system with CSS custom properties (variables) that adapt to the selected theme. **The design system is the source of truth for all styling** - all hardcoded values have been replaced with CSS variables and utility classes, ensuring consistency and making it easy to port to other frameworks (Vue, React, Svelte) by only porting JavaScript. For the small JS utilities used by interactive components (theme, storage, clipboard, toast), see [Getting Started – JavaScript utilities](./GETTING_STARTED.md#javascript-utilities).

## Semantic Variables

All components use semantic variables that automatically adapt to themes:

### Core Variables

- `--background` - Main background color
- `--background-alt` - Alternative background (cards, panels)
- `--text` - Primary text color
- `--text-dim` - Dimmed/secondary text color
- `--border` - Border color
- `--accent` - Primary accent color
- `--accent-hover` - Accent color on hover

### Semantic Colors

- `--success` - Success state color
- `--success-text` - Text color for success backgrounds (contrast-aware)
- `--warning` - Warning state color
- `--warning-text` - Text color for warning backgrounds (contrast-aware)
- `--error` - Error state color
- `--error-text` - Text color for error backgrounds (contrast-aware)
- `--info` - Informational color
- `--info-text` - Text color for info backgrounds (contrast-aware)

### Contrast-Aware Text Colors

All semantic colors include corresponding text color variables that automatically provide proper contrast:

- `--accent-text` - Text color for accent backgrounds (white on dark accents, dark on light accents)
- `--success-text` - Text color for success backgrounds
- `--warning-text` - Text color for warning backgrounds (typically dark text on light yellow)
- `--error-text` - Text color for error backgrounds
- `--info-text` - Text color for info backgrounds

These variables ensure WCAG AA contrast compliance (4.5:1 for normal text, 3:1 for large text).

### Typography System

Rizzo CSS includes a comprehensive typography system:

**Font Families:**
- `--font-family-sans` - System sans-serif stack
- `--font-family-serif` - System serif stack
- `--font-family-mono` - System monospace stack
- `--font-family` - Default font family (sans-serif)

**Font Weights:**
- `--font-weight-light` (300)
- `--font-weight-normal` (400)
- `--font-weight-medium` (500)
- `--font-weight-semibold` (600)
- `--font-weight-bold` (700)
- `--font-weight-extrabold` (800)

**Font Sizes (scalable via `--font-size-scale`):**
- `--font-size-xs` through `--font-size-6xl` (0.75rem to 3.75rem base)
- All sizes use `calc()` with `--font-size-scale` for dynamic scaling

**Line Heights:**
- `--line-height-tight` through `--line-height-loose` (1.25 to 2)

**Letter Spacing:**
- `--letter-spacing-tighter` through `--letter-spacing-widest` (-0.05em to 0.1em)

### Shadow and Overlay Variables

- `--shadow-color` - Base shadow color (black: `oklch(0% 0 0deg)`)
- `--shadow-sm`, `--shadow`, `--shadow-md`, `--shadow-lg`, `--shadow-xl` - Shadow presets with varying opacity
- `--overlay` - Overlay color for modals and overlays (50% opacity of `--shadow-color`)

### Selection Color

- `--selection` - Text selection background color (default: `oklch(70% 0.15 250deg)`)

### Additional Design Variables

**Opacity Values:**
- `--opacity-0` (0) - Fully transparent
- `--opacity-50` (0.5) - 50% opacity
- `--opacity-60` (0.6) - 60% opacity (commonly used for disabled states)
- `--opacity-70` (0.7) - 70% opacity
- `--opacity-80` (0.8) - 80% opacity
- `--opacity-90` (0.9) - 90% opacity
- `--opacity-100` (1) - Fully opaque

**Transform Scale Values:**
- `--scale-80` (0.8) - 80% scale
- `--scale-95` (0.95) - 95% scale (commonly used for tooltip animations)
- `--scale-100` (1) - 100% scale (normal size)
- `--scale-110` (1.1) - 110% scale (hover effects)

**Border Width Values:**
- `--border-width` (1px) - Standard border width (used throughout components, forms, layout)
- `--border-width-2` (2px), `--border-width-3` (3px), `--border-width-4` (4px) - Additional border widths
- `--border-width-accent` (3px) - Accent bar (e.g. theme switcher active option)
- `--border-width-arrow` (6px) - Border width for tooltip arrows and similar UI elements

**Viewport Heights:**
- `--vh-70` (70vh) - 70% of viewport height (e.g. search results max-height)
- `--vh-80` (80vh) - 80% of viewport height
- `--vh-90` (90vh) - 90% of viewport height

**Touch Target Sizes:**
- `--touch-target-min` (3rem / 48px) - WCAG AA compliant minimum touch target size

**Max Heights:**
- `--max-height-dropdown` (600px) - Maximum height for dropdown menus
- `--max-height-modal` (32rem) - Maximum height for modal dialogs
- `--max-height-navbar-submenu` (2000px) - Navbar dropdown scroll area

**Border Radius:**
- `--radius-circle` (50%) - Perfect circle (e.g. avatar, radio, range thumb)

**Cubic Bezier Easing:**
- `--ease-in-out-cubic` - `cubic-bezier(0.4, 0, 0.2, 1)` - Smooth easing function for animations

### Spacing Utilities

Rizzo CSS includes comprehensive spacing utilities for margins and padding using a consistent scale:

**Spacing Scale:**
All spacing uses rem units for consistency and accessibility. The spacing scale includes:
- `0` - 0
- `1` - 0.25rem (4px)
- `2` - 0.5rem (8px)
- `3` - 0.75rem (12px)
- `4` - 1rem (16px)
- `5` - 1.25rem (20px)
- `6` - 1.5rem (24px)
- `8` - 2rem (32px)
- `10` - 2.5rem (40px)
- `12` - 3rem (48px)
- `16` - 4rem (64px)
- `20` - 5rem (80px)
- `24` - 6rem (96px)
- Extended scale: `28`, `32`, `36`, `40`, `48`, `56`, `64`, `72`, `80`, `96`, `100`, `150`, and more
- Fractional values: `0-125` (2px), `0-375` (6px), `0-625` (10px), `0-875` (14px)
- Special values: `14`, `15`, `50`, `70`, `75`, `105`, `175`, `2500` (for screen reader positioning)

All spacing values are available as CSS variables: `--spacing-{size}`

**Margin Utilities:**
- `.m-{size}`, `.mt-{size}`, `.mr-{size}`, `.mb-{size}`, `.ml-{size}`, `.mx-{size}`, `.my-{size}`
- Auto margins: `.m-auto`, `.mx-auto`, `.my-auto` (for centering)

**Padding Utilities:**
- `.p-{size}`, `.pt-{size}`, `.pr-{size}`, `.pb-{size}`, `.pl-{size}`, `.px-{size}`, `.py-{size}`

**Examples:**
```html
<!-- Margin examples -->
<div class="m-4">Margin on all sides</div>
<div class="mx-auto">Centered with auto margins</div>
<div class="mt-6 mb-4">Top and bottom margins</div>

<!-- Padding examples -->
<div class="p-4">Padding on all sides</div>
<div class="px-6 py-4">Horizontal and vertical padding</div>
```

### Container Utilities

Container utilities provide responsive containers with automatic centering and padding:

**Container Sizes:**
- `.container-sm` - 640px max-width
- `.container-md` - 768px max-width
- `.container-lg` - 1024px max-width
- `.container-xl` - 1280px max-width
- `.container-2xl` - 1536px max-width
- `.container-full` - 100% width (with padding)

**Default Container:**
- `.container` - 1200px max-width (defined in `layout.css`)

All containers include auto left/right margins (centering) and 1rem horizontal padding.

**Examples:**
```html
<!-- Small container -->
<div class="container-sm">
  Content constrained to 640px
</div>

<!-- Large container -->
<div class="container-lg">
  Content constrained to 1024px
</div>
```

### Max-Width Utilities

Max-width utilities constrain element width without centering or padding:

**Size-Based Max-Width:**
- `.max-w-none` - No max-width
- `.max-w-xs` - 20rem (320px)
- `.max-w-sm` - 24rem (384px)
- `.max-w-md` - 28rem (448px)
- `.max-w-lg` - 32rem (512px)
- `.max-w-xl` - 36rem (576px)
- `.max-w-2xl` - 42rem (672px)
- `.max-w-3xl` - 48rem (768px)
- `.max-w-4xl` - 56rem (896px)
- `.max-w-5xl` - 64rem (1024px)
- `.max-w-6xl` - 72rem (1152px)
- `.max-w-7xl` - 80rem (1280px)
- `.max-w-full` - 100%

**Screen-Based Max-Width:**
- `.max-w-screen-sm` - 640px
- `.max-w-screen-md` - 768px
- `.max-w-screen-lg` - 1024px
- `.max-w-screen-xl` - 1280px
- `.max-w-screen-2xl` - 1536px

**Examples:**
```html
<!-- Constrain text width for readability -->
<p class="max-w-2xl">
  This paragraph is constrained to 672px for optimal readability.
</p>

<!-- Constrain to screen breakpoint -->
<div class="max-w-screen-lg">
  Content constrained to 1024px
</div>
```

### Sizing Utilities

Rizzo CSS includes comprehensive sizing utilities for width, height, and min/max dimensions:

**Width Utilities:**
- `.w-auto`, `.w-full`, `.w-screen`, `.w-fit`, `.w-max`, `.w-min`
- `.w-0`, `.w-1` through `.w-64` (0 to 16rem in increments)

**Height Utilities:**
- `.h-auto`, `.h-full`, `.h-screen`, `.h-fit`, `.h-max`, `.h-min`
- `.h-0`, `.h-1` through `.h-64` (0 to 16rem in increments)

**Min-Width Utilities:**
- `.min-w-0`, `.min-w-full`, `.min-w-min`, `.min-w-max`, `.min-w-fit`

**Min-Height Utilities:**
- `.min-h-0`, `.min-h-full`, `.min-h-screen`, `.min-h-fit`, `.min-h-max`, `.min-h-min`

**Max-Height Utilities:**
- `.max-h-none`, `.max-h-full`, `.max-h-screen`, `.max-h-fit`, `.max-h-max`, `.max-h-min`
- `.max-h-0`, `.max-h-1` through `.max-h-64` (0 to 16rem in increments)

**Examples:**
```html
<!-- Full width and height -->
<div class="w-full h-screen">Full viewport</div>

<!-- Fixed dimensions -->
<div class="w-64 h-48">Fixed size</div>

<!-- Minimum height -->
<div class="min-h-screen">At least viewport height</div>

<!-- Maximum height with scrolling -->
<div class="max-h-96 overflow-auto">Scrollable content</div>
```

### Display Utilities

Display utilities control how elements are displayed:

**Display Types:**
- `.block`, `.inline-block`, `.inline`
- `.flex`, `.inline-flex`
- `.grid`, `.inline-grid`
- `.table`, `.table-row`, `.table-cell`
- `.contents`, `.list-item`
- `.hidden` - Hide element (display: none)

**Responsive Display:**
All display utilities have responsive variants using breakpoint prefixes:
- `.sm:{display}` - Applies at 640px and up
- `.md:{display}` - Applies at 768px and up
- `.lg:{display}` - Applies at 1024px and up
- `.xl:{display}` - Applies at 1280px and up
- `.xxl:{display}` - Applies at 1536px and up

**Examples:**
```html
<!-- Hide on mobile, show on desktop -->
<div class="hidden md:block">Visible on tablet and up</div>

<!-- Flex on mobile, grid on desktop -->
<div class="flex lg:grid">Responsive layout</div>
```

### Position Utilities

Position utilities control element positioning:

**Position Types:**
- `.static` - Default positioning
- `.relative` - Relative to normal position
- `.absolute` - Absolute positioning
- `.fixed` - Fixed to viewport
- `.sticky` - Sticky positioning

**Z-Index Scale:**
- `.z-0`, `.z-10`, `.z-20`, `.z-30`, `.z-40`, `.z-50`, `.z-auto`
- Component-specific z-index classes:
  - `.z-dropdown` (1000)
  - `.z-dropdown-submenu` (1001)
  - `.z-modal` (2000)
  - `.z-modal-backdrop` (1999)
  - `.z-tooltip` (3000)
  - `.z-toast` (4000)
  - `.z-navbar` (5000)
  - `--z-navbar-mobile-menu-open` (5100) - Navbar when mobile menu is open; ensures menu overlays site content
  - `.z-skip-link` (10001) - Highest z-index for skip links to ensure visibility above all elements

**Examples:**
```html
<!-- Fixed header -->
<header class="fixed top-0 z-navbar">Fixed header</header>

<!-- Sticky sidebar -->
<aside class="sticky top-4">Sticky sidebar</aside>
```

### Border Utilities

Border utilities provide comprehensive border styling:

**Border Radius:**
- `.rounded-none`, `.rounded-sm`, `.rounded`, `.rounded-md`, `.rounded-lg`, `.rounded-xl`, `.rounded-2xl`, `.rounded-3xl`, `.rounded-full`
- Side-specific: `.rounded-t-*`, `.rounded-r-*`, `.rounded-b-*`, `.rounded-l-*`

**Border Width:**
- `.border-0`, `.border`, `.border-2`, `.border-4`, `.border-8`
- Side-specific: `.border-t-*`, `.border-r-*`, `.border-b-*`, `.border-l-*`

**Border Colors (using theme variables):**
- `.border-transparent`
- `.border-color` (uses `--border`)
- `.border-accent` (uses `--accent`)
- `.border-success`, `.border-warning`, `.border-error`, `.border-info`

**Examples:**
```html
<!-- Rounded card -->
<div class="rounded-lg border border-color">Card</div>

<!-- Full rounded button -->
<button class="rounded-full border-2 border-accent">Button</button>
```

### Flexbox Utilities

Comprehensive flexbox utilities for flexible layouts:

**Flex Direction:**
- `.flex-row`, `.flex-row-reverse`, `.flex-col`, `.flex-col-reverse`

**Flex Wrap:**
- `.flex-wrap`, `.flex-wrap-reverse`, `.flex-nowrap`

**Justify Content:**
- `.justify-start`, `.justify-end`, `.justify-center`
- `.justify-between`, `.justify-around`, `.justify-evenly`

**Align Items:**
- `.items-start`, `.items-end`, `.items-center`
- `.items-baseline`, `.items-stretch`

**Align Self:**
- `.self-auto`, `.self-start`, `.self-end`, `.self-center`, `.self-stretch`, `.self-baseline`

**Flex Grow/Shrink:**
- `.flex-1`, `.flex-auto`, `.flex-initial`, `.flex-none`
- `.grow`, `.grow-0`, `.shrink`, `.shrink-0`

**Examples:**
```html
<!-- Centered flex container -->
<div class="flex items-center justify-center">Centered content</div>

<!-- Space between items -->
<div class="flex justify-between">Space between</div>
```

### Grid Utilities

CSS Grid utilities for complex layouts:

**Grid Template Columns:**
- `.grid-cols-1` through `.grid-cols-12`, `.grid-cols-none`

**Grid Template Rows:**
- `.grid-rows-1` through `.grid-rows-6`, `.grid-rows-none`

**Grid Column Span:**
- `.col-auto`, `.col-span-1` through `.col-span-6`, `.col-span-full`

**Grid Row Span:**
- `.row-auto`, `.row-span-1` through `.row-span-6`, `.row-span-full`

**Examples:**
```html
<!-- 3-column grid -->
<div class="grid grid-cols-3 gap-4">
  <div>Item 1</div>
  <div>Item 2</div>
  <div>Item 3</div>
</div>

<!-- Responsive grid -->
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  Responsive grid
</div>
```

### Gap Utilities

Gap utilities for flexbox and grid layouts using the spacing scale:

**Gap (both row and column):**
- `.gap-0`, `.gap-1` through `.gap-24` (using spacing scale variables)

**Column Gap:**
- `.gap-x-0`, `.gap-x-1` through `.gap-x-24`

**Row Gap:**
- `.gap-y-0`, `.gap-y-1` through `.gap-y-24`

**Examples:**
```html
<!-- Grid with gap -->
<div class="grid grid-cols-3 gap-4">Grid with spacing</div>

<!-- Different row and column gaps -->
<div class="flex flex-col gap-y-2 gap-x-4">Different gaps</div>
```

### Animation & Transition Utilities

Transition utilities that respect `prefers-reduced-motion`:

**Transition Properties:**
- `.transition-none`, `.transition-all`, `.transition`
- `.transition-colors`, `.transition-opacity`, `.transition-shadow`, `.transition-transform`

**Transition Duration:**
- `.duration-75`, `.duration-100`, `.duration-150`, `.duration-200`, `.duration-300`, `.duration-500`, `.duration-700`, `.duration-1000`

**Transition Timing Functions:**
- `.ease-linear`, `.ease-in`, `.ease-out`, `.ease-in-out`

**Transition Delay:**
- `.delay-75`, `.delay-100`, `.delay-150`, `.delay-200`, `.delay-300`, `.delay-500`, `.delay-700`, `.delay-1000`

**Combined Utilities:**
- `.transition-fast` (150ms, ease-in-out)
- `.transition-base` (200ms, ease-in-out)
- `.transition-slow` (300ms, ease-in-out)

**Accessibility:**
All transition utilities automatically respect `prefers-reduced-motion` and reduce to 0.01ms duration when the user prefers reduced motion.

**Examples:**
```html
<!-- Fast color transition -->
<button class="transition-colors duration-200">Hover me</button>

<!-- Combined transition -->
<div class="transition-base hover:shadow-lg">Smooth transition</div>
```

### Media Queries

Rizzo CSS includes a dedicated `media-queries.css` file with responsive breakpoints:

**Breakpoints:**
- `640px` (sm) - Small devices, landscape phones
- `768px` (md) - Tablets
- `1024px` (lg) - Desktops
- `1280px` (xl) - Large desktops
- `1536px` (2xl) - Larger desktops

**Usage:**
```css
/* Mobile-first approach */
@media (width >= 768px) {
  /* Tablet and up styles */
}

@media (width <= 1023px) {
  /* Tablet and down styles */
}
```

**Accessibility Media Queries:**
- `prefers-reduced-motion` - Respects user motion preferences
- `prefers-contrast: high` - Enhanced contrast support

## Color Format

All colors use **OKLCH** format for better perceptual uniformity:

```css
--accent: oklch(65% 0.25 290deg);
```

OKLCH format uses:
- **Lightness** as percentage (0% = black, 100% = white)
- **Chroma** as decimal (0 = grayscale, higher = more saturated)
- **Hue** in degrees (0-360deg)

OKLCH provides:
- Perceptually uniform color space
- Better color manipulation
- Consistent appearance across displays

### Color Reference

Rizzo CSS includes an interactive [Colors Documentation Page](/docs/colors) that displays all semantic color variables in multiple formats:
- **OKLCH** - Original format (perceptually uniform)
- **Hex** - Standard hexadecimal format (e.g., `#FF5733`)
- **RGB** - Red, Green, Blue format (e.g., `rgb(255, 87, 51)`)
- **HSL** - Hue, Saturation, Lightness format (e.g., `hsl(9, 100%, 60%)`)
- **CSS Variable** - CSS custom property reference (e.g., `var(--accent)`)

All color formats are automatically converted and can be copied to clipboard. See [Colors Documentation](./COLORS.md) for complete details.

## Using Variables

### In CSS

```css
.my-component {
  background-color: var(--background);
  color: var(--text);
  border: 1px solid var(--border);
}

.my-button {
  background-color: var(--accent);
  color: var(--accent-text);
}

.my-button:hover {
  background-color: var(--accent-hover);
  color: var(--accent-text);
}
```

### In Components

**Note**: All component styles should be in external CSS files (`components.css`), not inline `<style>` blocks. Components use CSS variables from the semantic theme system.

Component CSS structure:
```css
/* In src/styles/components.css */
.my-component {
  background: var(--background-alt);
  color: var(--text);
  padding: var(--spacing-4);
  border-radius: var(--radius-md);
  border: 1px solid var(--border);
  transition: background-color var(--transition-base);
}
```

### Component Layout Patterns

**Navbar Dropdown Layout:**
The navbar uses CSS Grid for efficient dropdown layouts. Components and Themes dropdowns use a 2-column grid layout on desktop:

```css
/* 2-column dropdown layout using design system variables */
.navbar__submenu#navbar-submenu-components,
.navbar__submenu#navbar-submenu-themes {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0;
  min-width: var(--spacing-96); /* 24rem / 384px */
  max-width: var(--spacing-96);
  width: var(--spacing-96);
  padding: var(--spacing-2);
  position: relative;
}

/* Vertical divider using border color variable */
.navbar__submenu#navbar-submenu-components::before,
.navbar__submenu#navbar-submenu-themes::before {
  content: '';
  position: absolute;
  top: var(--spacing-2);
  bottom: var(--spacing-2);
  left: 50%;
  width: 1px;
  background-color: var(--border);
  transform: translateX(-50%);
  z-index: 1;
  pointer-events: none;
}
```

This pattern demonstrates:
- Using CSS Grid with design system spacing variables
- Creating visual dividers with semantic border colors
- Responsive behavior (single column on mobile)
- All values use design system variables for portability

## Theme Structure

Themes define colors using the same semantic variable names, ensuring all components adapt automatically when themes change.

## Naming Convention

All component classes use **BEM (Block Element Modifier)** naming:

- **Block**: `.navbar`, `.theme-switcher`
- **Element**: `.navbar__container`, `.theme-switcher__menu`
- **Modifier**: `.navbar__menu--open`, `.theme-switcher__option--active`

This ensures:
- Clear component structure
- Easy to understand relationships
- Consistent naming across the design system

## Best Practices

1. **Design System as Source of Truth** - Always use CSS variables and utility classes from the design system. Never hardcode values (colors, spacing, sizes, transitions, etc.). This ensures consistency and makes framework porting easier. **All styling must use design system variables for easy portability to Vue, React, and Svelte.**
2. **Always use semantic variables** - Never hardcode colors, spacing, sizes, or other values. Use `var(--spacing-*)`, `var(--radius-*)`, `var(--transition-*)`, etc.
3. **Use contrast-aware text colors** - Use `--accent-text`, `--success-text`, etc. when using colored backgrounds
4. **Use appropriate variables** - `--background-alt` for cards, `--background` for page background
5. **Use utility classes** - Leverage spacing, sizing, display, position, border, flexbox, grid, and gap utilities for consistent styling
6. **Use spacing utilities** - Use margin and padding utility classes for consistent spacing
7. **Use CSS variables for all values** - Use `--spacing-*`, `--radius-*`, `--transition-*`, `--opacity-*`, `--scale-*`, `--z-*`, `--outline-width`, `--outline-offset`, etc. instead of hardcoded values
8. **Mobile-first responsive design** - Start with mobile styles, then add larger breakpoint styles using responsive utility prefixes (sm:, md:, lg:, xl:, xxl:)
9. **Maintain contrast** - All themes meet WCAG AA contrast requirements automatically
10. **Test with multiple themes** - Verify components work with both light and dark themes
11. **No inline styles** - All CSS should be in external files (`components.css`, `buttons.css`, etc.). If inline styles are necessary (e.g., in documentation examples), always use design system variables.
12. **Follow BEM naming** - Use block__element--modifier pattern for all component classes
13. **Accessibility first** - All components must be keyboard navigable and screen reader friendly
14. **Use typography variables** - Use `--font-size-*`, `--font-weight-*`, `--line-height-*` for consistent typography
15. **Respect font size scale** - All font sizes automatically scale with `--font-size-scale` variable
16. **Respect reduced motion** - All transition utilities automatically respect `prefers-reduced-motion`
17. **Use theme-aware utilities** - Border colors, text colors, and background colors use semantic theme variables
18. **Use opacity variables** - Use `--opacity-*` variables instead of hardcoded opacity values
19. **Use transform scale variables** - Use `--scale-*` variables for consistent transform animations
20. **Use z-index variables** - Use `--z-*` variables for consistent layering
21. **Use outline variables** - Use `--outline-width` and `--outline-offset` for consistent focus indicators
22. **Component layout patterns** - Use CSS Grid with design system spacing for multi-column layouts (e.g., navbar 2-column dropdowns)
