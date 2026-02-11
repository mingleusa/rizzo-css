# Colors

Rizzo CSS uses a semantic color system with CSS custom properties that adapt to the selected theme. All colors are available in multiple formats for easy copying and use. The color reference supports **all 14 themes** (7 dark, 7 light).

## Color Reference Page

Visit the [Colors Documentation Page](/docs/colors) on the docs site for an interactive color reference with:
- **Live color swatches** for all semantic variables (Core, Accent, Semantic)
- **All 14 themes** — OKLCH and other formats update when you switch themes
- **Multiple format options**: OKLCH, Hex, RGB, HSL, and CSS Variable (tabbed)
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

### Accent Colors

- `--accent` - Primary accent color
- `--accent-hover` - Accent color on hover
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
