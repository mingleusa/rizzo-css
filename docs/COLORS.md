# Colors

Rizzo CSS uses a semantic color system with CSS custom properties that adapt to the selected theme. All colors are available in multiple formats for easy copying and use. The color reference supports **all 14 themes** (7 dark, 7 light).

**Features:** OKLCH theme map for all 14 themes; semantic color variables (see below); interactive color reference on the docs site with live swatches, format tabs (OKLCH, Hex, RGB, HSL, CSS variable), and copy-to-clipboard.

## Color Reference Page

Visit the [Colors Documentation Page](/docs/colors) on the docs site for an interactive color reference with:
- **Live color swatches** for all semantic variables (Core, Accent, Semantic, Text on solid)
- **All 14 themes** — OKLCH and other formats update when you switch themes
- **Multiple format options**: OKLCH, Hex, RGB, HSL, and CSS Variable (tabbed; tabs use `aria-controls` and a single `role="tabpanel"` for accessibility)
- **Copy-to-clipboard** for each color value in the selected format
- **Theme switcher** so you can see how colors adapt across themes

## Semantic Color Variables

All components use semantic variables that automatically adapt to themes:

### Core Colors

- `--background` - Main background color
- `--background-alt` - Alternative background (cards, panels)
- `--text` - Primary text color
- `--text-dim` - Dimmed/secondary text color
- `--border` - Border color
- `--selection` - Text selection highlight color
- `--icon` - Icon color (SVG `currentColor`); primary icons
- `--icon-dim` - Secondary/dimmed icon color

### Accent Colors

- `--accent` - Primary accent color (solid buttons, fills)
- `--accent-hover` - Accent color on hover
- `--accent-fg` - Accent as foreground (links, outline buttons, tabs, code); dark themes may set a lighter value for contrast
- `--accent-fg-hover` - Accent foreground on hover
- `--accent-text` - Text color for accent backgrounds (contrast-aware)

### Semantic Colors

- `--success` - Success state color
- `--success-text` - Text color for success backgrounds (contrast-aware)
- `--success-text-on-solid` - Text on solid success (buttons, badges); themes may override for dark/light
- `--warning` - Warning state color
- `--warning-text` - Text color for warning backgrounds (contrast-aware)
- `--warning-text-on-solid` - Text on solid warning (buttons, badges)
- `--error` - Error state color
- `--error-text` - Text color for error backgrounds (contrast-aware)
- `--error-text-on-solid` - Text on solid error (buttons, badges)
- `--info` - Informational color
- `--info-text` - Text color for info backgrounds (contrast-aware)
- `--info-text-on-solid` - Text on solid info (buttons, badges)
- `--accent-text-on-hover` - Text on primary button hover; themes may set for light accent-hover
- `--text-on-solid-hover` - Dark text on semantic button hover (success, warning, error, info)

## Color Scales (Design Tokens)

Color scales provide stepped shades (50–950) for each semantic color. **Scale 500 is the theme base** (e.g. `--color-accent-500` = `var(--accent)`); other steps are derived so they work across all themes.

### Scale Variables

| Scale   | Base token   | Design token steps |
|--------|--------------|----------------------|
| Neutral | (fixed gray) | `--color-neutral-50` … `--color-neutral-950` |
| Accent  | `--accent`   | `--color-accent-50` … `--color-accent-950` |
| Success | `--success`  | `--color-success-50` … `--color-success-950` |
| Warning | `--warning`  | `--color-warning-50` … `--color-warning-950` |
| Error   | `--error`    | `--color-error-50` … `--color-error-950` |
| Info    | `--info`     | `--color-info-50` … `--color-info-950` |

- **Neutral** is a fixed gray scale (theme-agnostic).
- **Accent, success, warning, error, info** scales are derived from the theme’s semantic color using OKLCH relative color syntax, so they stay in sync when you switch themes.

### All color scale tokens (design tokens)

Every scale has 11 steps: `50`, `100`, `200`, `300`, `400`, `500`, `600`, `700`, `800`, `900`, `950`. Step `500` is the theme base for accent/success/warning/error/info.

**Neutral** (fixed gray scale):

- `--color-neutral-50`, `--color-neutral-100`, `--color-neutral-200`, `--color-neutral-300`, `--color-neutral-400`, `--color-neutral-500`, `--color-neutral-600`, `--color-neutral-700`, `--color-neutral-800`, `--color-neutral-900`, `--color-neutral-950`

**Accent** (derived from `--accent`):

- `--color-accent-50`, `--color-accent-100`, `--color-accent-200`, `--color-accent-300`, `--color-accent-400`, `--color-accent-500`, `--color-accent-600`, `--color-accent-700`, `--color-accent-800`, `--color-accent-900`, `--color-accent-950`

**Success** (derived from `--success`):

- `--color-success-50`, `--color-success-100`, `--color-success-200`, `--color-success-300`, `--color-success-400`, `--color-success-500`, `--color-success-600`, `--color-success-700`, `--color-success-800`, `--color-success-900`, `--color-success-950`

**Warning** (derived from `--warning`):

- `--color-warning-50`, `--color-warning-100`, `--color-warning-200`, `--color-warning-300`, `--color-warning-400`, `--color-warning-500`, `--color-warning-600`, `--color-warning-700`, `--color-warning-800`, `--color-warning-900`, `--color-warning-950`

**Error** (derived from `--error`):

- `--color-error-50`, `--color-error-100`, `--color-error-200`, `--color-error-300`, `--color-error-400`, `--color-error-500`, `--color-error-600`, `--color-error-700`, `--color-error-800`, `--color-error-900`, `--color-error-950`

**Info** (derived from `--info`):

- `--color-info-50`, `--color-info-100`, `--color-info-200`, `--color-info-300`, `--color-info-400`, `--color-info-500`, `--color-info-600`, `--color-info-700`, `--color-info-800`, `--color-info-900`, `--color-info-950`

### Using scale tokens in CSS

```css
.panel {
  background-color: var(--color-accent-50);
  border: 1px solid var(--color-accent-200);
  color: var(--color-accent-800);
}
```

### Color scale utility classes

Utility classes follow the pattern `{property}-{scale}-{step}` (e.g. background, text, border):

- **Background:** `bg-neutral-50`, `bg-accent-100`, `bg-success-500`, `bg-warning-200`, `bg-error-50`, `bg-info-100`, etc.
- **Text:** `text-neutral-700`, `text-accent-600`, `text-success-700`, etc.
- **Border:** `border-accent-200`, `border-success-300`, `border-error-500`, etc.

Steps: `50`, `100`, `200`, `300`, `400`, `500`, `600`, `700`, `800`, `900`, `950`.

Example:

```html
<div class="bg-accent-50 border border-accent-200 text-accent-900">
  Light accent panel
</div>
```

Theme colors (`--accent`, `--success`, etc.) are unchanged and remain the primary semantic tokens; scale tokens and utilities extend the system for backgrounds, borders, and stepped text colors.

## Color Format

All colors use **OKLCH** format for better perceptual uniformity:

```css
--accent: oklch(65% 0.25 290deg);
```

OKLCH format uses:
- **Lightness** as percentage (0% = black, 100% = white)
- **Chroma** as decimal (0 = grayscale, higher = more saturated)
- **Hue** in degrees (0-360deg)

## Color Format Conversion

The Colors page automatically converts OKLCH values to other formats:

### Available Formats

1. **OKLCH** - Perceptually uniform color space (original format)
2. **Hex** - Standard hexadecimal format (e.g., `#FF5733`)
3. **RGB** - Red, Green, Blue format (e.g., `rgb(255, 87, 51)`)
4. **HSL** - Hue, Saturation, Lightness format (e.g., `hsl(9, 100%, 60%)`)
5. **CSS Variable** - CSS custom property reference (e.g., `var(--accent)`)

### Conversion Details

- **OKLCH to RGB**: Uses mathematical conversion from OKLCH color space to sRGB
- **RGB to Hex**: Direct conversion from RGB values to hexadecimal
- **RGB to HSL**: Standard RGB to HSL conversion algorithm
- All conversions are performed client-side using JavaScript
- **Theme map:** The Colors page uses a theme OKLCH map for all 14 themes and all semantic variables (Core, Accent, Semantic, Text on solid) so format tabs display consistent values when you switch themes.

## Using Colors

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

### Copying Color Values

1. Visit the [Colors Documentation Page](/docs/colors)
2. Select your desired format tab (OKLCH, Hex, RGB, HSL, or CSS Variable)
3. Click the copy button next to any color value
4. The value is copied to your clipboard with format feedback

### Format Selection

The Colors page includes a tabbed interface for selecting color formats:
- Click any format tab to switch all color values to that format
- Each color swatch updates automatically
- Copy buttons reflect the currently selected format

## Contrast-Aware Text Colors

All semantic colors include corresponding text color variables that automatically provide proper contrast:

- `--accent-text` - Text color for accent backgrounds
- `--success-text` - Text color for success backgrounds
- `--warning-text` - Text color for warning backgrounds
- `--error-text` - Text color for error backgrounds
- `--info-text` - Text color for info backgrounds

These variables ensure WCAG AA contrast compliance (4.5:1 for normal text, 3:1 for large text).

## Theme Adaptation

Colors automatically adapt when themes change:
- Switch themes using the theme switcher on the Colors page (or the site navbar)
- Color values update to reflect the active theme (all 14 themes supported)
- All format conversions (OKLCH, Hex, RGB, HSL) recalculate based on the new theme
- Copy-to-clipboard values update automatically for the selected format

## Color Reference

For a complete interactive reference with all colors in all formats and all 14 themes, visit the [Colors Documentation Page](/docs/colors) on the docs site.
