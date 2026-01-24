# Theming System

Rizzo CSS includes 8 carefully crafted themes organized into light and dark categories. Each theme has its own dedicated documentation page with detailed information, color palettes, and usage examples.

## Available Themes

Visit individual theme pages for detailed information:
- [Dracula At Night](/docs/themes/dracula-at-night)
- [Shades of Purple](/docs/themes/shades-of-purple)
- [Night Owl](/docs/themes/night-owl)
- [Winter is Coming](/docs/themes/winter-is-coming-dark-black)
- [Nord Light](/docs/themes/nord-light)
- [Grey Light Pro](/docs/themes/grey-light-pro)
- [Snazzy Light](/docs/themes/snazzy-light)
- [Tiny Light](/docs/themes/tiny-light)

### Dark Themes

1. **Dracula At Night** (`dracula-at-night`)
   - Author: bceskavich
   - A darker fork of Dracula theme
   - [GitHub](https://github.com/bceskavich/dracula-at-night)

2. **Shades of Purple** (`shades-of-purple`)
   - Author: Ahmad Awais
   - Professional theme with bold purple shades
   - [GitHub](https://github.com/ahmadawais/shades-of-purple-vscode)

3. **Night Owl** (`night-owl`)
   - Author: Sarah Drasner
   - Optimized for nighttime coding
   - [GitHub](https://github.com/sdras/night-owl-vscode-theme)

4. **Winter is Coming Dark Black** (`winter-is-coming-dark-black`)
   - Author: John Papa
   - Very dark black with vibrant accents
   - [GitHub](https://github.com/johnpapa/vscode-winteriscoming)

### Light Themes

1. **Nord Light** (`nord-light`)
   - Author: arcticicestudio
   - Arctic, north-bluish color palette
   - [Website](https://www.nordtheme.com/)

2. **Grey Light Pro** (`grey-light-pro`)
   - Author: Emilio Lanzalaco
   - Soft grey theme, easier on the eyes
   - [VS Code Marketplace](https://marketplace.visualstudio.com/items?itemName=elanzalaco.grey-light-plus-pro)

3. **Snazzy Light** (`snazzy-light`)
   - Author: Florian Reuschel (loilo)
   - Vivid colors for bright environments
   - [GitHub](https://github.com/loilo/vscode-snazzy-light)

4. **Tiny Light** (`tiny-light`)
   - Author: luqimin
   - Minimal, eye-friendly theme
   - [GitHub](https://github.com/luqimin/tinylight-vscode)

## Using Themes

### Setting Theme

Set the theme via the `data-theme` attribute on the HTML element:

```html
<html lang="en" data-theme="dracula-at-night">
```

### Programmatic Theme Switching

The `ThemeSwitcher` component handles theme switching automatically. It:

- Updates the `data-theme` attribute
- Persists choice in `localStorage`
- Updates all components instantly

### Manual Theme Switching

```javascript
// Set theme
document.documentElement.setAttribute('data-theme', 'night-owl');

// Save to localStorage
localStorage.setItem('theme', 'night-owl');

// Load saved theme
const savedTheme = localStorage.getItem('theme') || 'dracula-at-night';
document.documentElement.setAttribute('data-theme', savedTheme);
```

## Theme File Structure

Themes are organized in `src/styles/themes/`:

```
themes/
├── dark/
│   ├── dracula-at-night.css
│   ├── shades-of-purple.css
│   ├── night-owl.css
│   └── winter-is-coming-dark-black.css
└── light/
    ├── nord-light.css
    ├── grey-light-pro.css
    ├── snazzy-light.css
    └── tiny-light.css
```

## Creating Custom Themes

1. Create a new theme file in `src/styles/themes/dark/` or `src/styles/themes/light/`
2. Use the `[data-theme="your-theme-name"]` selector
3. Define all semantic variables including contrast-aware text colors
4. Import in `src/styles/main.css`

Example:

```css
/* My Custom Theme */
/* Author: Your Name */
/* Description */

[data-theme="my-theme"] {
  --bg: oklch(15% 0.015 270.5deg);
  --bg-alt: oklch(12% 0.012 270.5deg);
  --fg: oklch(95% 0.003 100.2deg);
  --fg-dim: oklch(85% 0.003 100.2deg);
  --current-line: oklch(25% 0.022 270.5deg);
  --selection: oklch(25% 0.022 270.5deg);
  
  /* Accent colors */
  --accent-color: oklch(65% 0.180 290.1deg);
  --accent-hover-color: oklch(70% 0.195 340.1deg);
  
  /* Semantic mappings */
  --background: var(--bg);
  --background-alt: var(--bg-alt);
  --text: var(--fg);
  --text-dim: var(--fg-dim);
  --border: var(--current-line);
  --accent: var(--accent-color);
  --accent-hover: var(--accent-hover-color);
  
  /* Contrast-aware text colors */
  /* For dark themes (accent < 50% lightness): use white text */
  /* For light themes (accent >= 50% lightness): use dark text */
  --accent-text: oklch(100% 0 0deg); /* White text for dark accent */
  --success-text: oklch(100% 0 0deg);
  --warning-text: oklch(20% 0 0deg); /* Dark text for light yellow */
  --error-text: oklch(100% 0 0deg);
  --info-text: oklch(100% 0 0deg);
}
```

### Contrast Text Colors

When creating themes, ensure proper contrast by setting text colors based on background lightness:

- **Dark backgrounds** (< 50% lightness): Use white text (`oklch(100% 0 0deg)`)
- **Light backgrounds** (>= 50% lightness): Use dark text (`oklch(20% 0 0deg)`)
- **Warning colors** (typically 80%+ lightness): Use white text (`oklch(100% 0 0deg)`) for better visibility and consistency across all themes

This ensures WCAG AA compliance (4.5:1 contrast ratio for normal text).

## Color Conversion

All themes use OKLCH format with percentages and degrees:

```css
--bg: oklch(15% 0.015 270.5deg);
```

Format: `oklch(lightness% chroma hue)`

To convert from hex:
- Use online tools like [oklch.com](https://oklch.com)
- Or use [hex2oklch.com](https://www.hex2oklch.com/)

## Theme Persistence

The theme switcher automatically saves the selected theme to `localStorage` and restores it on page load. An inline script in `Layout.astro` prevents theme flash by setting the theme immediately before the page renders.

## Theme-Specific Overrides

Some themes include specific overrides for better visibility:

- **Tiny Light Theme**: Navbar link hover effects use dark color (`var(--text)`) instead of accent color for better visibility on the very light background
- **Tiny Light Theme**: Font size slider uses dark colors for track and thumb for visibility

## CSS Build Process

Themes are included in the CSS build process:

1. All theme files are imported in `src/styles/main.css`
2. During development, themes are processed by PostCSS
3. In production, `pnpm build:css` creates a minified version
4. The layout automatically uses the minified CSS in production builds
