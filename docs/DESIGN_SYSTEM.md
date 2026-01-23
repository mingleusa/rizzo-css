# Design System

Rizzo CSS uses a semantic theming system with CSS custom properties (variables) that adapt to the selected theme.

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

### Spacing Utilities

Rizzo CSS includes comprehensive spacing utilities for margins and padding using a consistent scale:

**Spacing Scale:**
All spacing uses rem units for consistency and accessibility:
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
}
```

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

1. **Always use semantic variables** - Never hardcode colors
2. **Use contrast-aware text colors** - Use `--accent-text`, `--success-text`, etc. when using colored backgrounds
3. **Use appropriate variables** - `--background-alt` for cards, `--background` for page background
4. **Use spacing utilities** - Use margin and padding utility classes for consistent spacing
5. **Mobile-first responsive design** - Start with mobile styles, then add larger breakpoint styles
6. **Maintain contrast** - All themes meet WCAG AA contrast requirements automatically
7. **Test with multiple themes** - Verify components work with both light and dark themes
8. **No inline styles** - All CSS should be in external files (`components.css`, `buttons.css`, etc.)
9. **Follow BEM naming** - Use block__element--modifier pattern for all component classes
10. **Accessibility first** - All components must be keyboard navigable and screen reader friendly
11. **Use typography variables** - Use `--font-size-*`, `--font-weight-*`, `--line-height-*` for consistent typography
12. **Respect font size scale** - All font sizes automatically scale with `--font-size-scale` variable
