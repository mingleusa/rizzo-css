# Theming System

Rizzo CSS includes 14 carefully crafted themes organized into light and dark categories. Each theme has its own dedicated documentation page with detailed information, color palettes, usage examples, and links to the author and theme source (opening in a new tab).

## Available Themes

Visit individual theme pages for detailed information:
- [GitHub Dark Classic](/docs/themes/github-dark-classic)
- [Shades of Purple](/docs/themes/shades-of-purple)
- [Sandstorm Classic](/docs/themes/sandstorm-classic)
- [Rocky Blood Orange](/docs/themes/rocky-blood-orange)
- [Minimal Dark Neon Yellow](/docs/themes/minimal-dark-neon-yellow)
- [Hack The Box](/docs/themes/hack-the-box)
- [Pink Cat Boo](/docs/themes/pink-cat-boo)
- [GitHub Light](/docs/themes/github-light)
- [Red Velvet Cupcake](/docs/themes/red-velvet-cupcake)
- [Orangy One Light](/docs/themes/orangy-one-light)
- [Sunflower](/docs/themes/sunflower)
- [Green Breeze Light](/docs/themes/green-breeze-light)
- [Cute Pink](/docs/themes/cute-pink)
- [Semi Light Purple](/docs/themes/semi-light-purple)

### Dark Themes

1. **GitHub Dark Classic** (`github-dark-classic`)
   - Author: Primer (GitHub)
   - Official GitHub dark theme for VS Code
   - [GitHub](https://github.com/primer/github-vscode-theme-dark-classic)

2. **Shades of Purple** (`shades-of-purple`)
   - Author: Ahmad Awais
   - Professional theme with bold purple shades
   - [GitHub](https://github.com/ahmadawais/shades-of-purple-vscode)

3. **Sandstorm Classic** (`sandstorm-classic`)
   - Author: Devan Sisson (Bardleware)
   - Dark, red-based theme for late-night coding
   - [VS Code Marketplace](https://marketplace.visualstudio.com/items?itemName=Bardleware.sandstorm)

4. **Rocky Blood Orange** (`rocky-blood-orange`)
   - Author: Luca Heyworth
   - Dark theme with blood-orange accent
   - [VS Code Themes](https://vscodethemes.com/e/LucaHeyworth.rocky-blood-orange-theme/rocky-blood-orange)

5. **Minimal Dark Neon Yellow** (`minimal-dark-neon-yellow`)
   - Author: Gabriel D Sanchez
   - Minimal dark theme with neon yellow accent
   - [VS Code Themes](https://vscodethemes.com/e/GabrielDSanchez.minimal-dark-neon-yellow-theme/minimal-dark-neon-yellow-theme)

6. **Hack The Box** (`hack-the-box`)
   - Author: silofy
   - Dark blue with lime green accent, built for hackers
   - [GitHub](https://github.com/silofy/hackthebox)

7. **Pink Cat Boo** (`pink-cat-boo`)
   - Author: Fiona Fan (ftsamoyed)
   - Sweet and cute dark theme with rose pink accents
   - [GitHub](https://github.com/ftsamoyed/PinkCatBoo)

### Light Themes

1. **GitHub Light** (`github-light`)
   - Author: Primer (GitHub) / Hyzeta
   - Official GitHub light theme for VS Code
   - [GitHub](https://github.com/primer/github-vscode-theme)

2. **Red Velvet Cupcake** (`red-velvet-cupcake`)
   - Author: Fahad Ashraf Chaudhry
   - Velvet-cupcake light theme with red accent
   - [GitHub](https://github.com/fahadachaudhry/valvet-cupcake-vscode-theme)

3. **Orangy One Light** (`orangy-one-light`)
   - Author: maher-cshub
   - Light theme with orange accent
   - [VS Code Themes](https://vscodethemes.com/e/maher-cshub.orangy-one-light-theme/orangy-one-light-theme)

4. **Sunflower** (`sunflower`)
   - Author: Hashirama Naiff
   - Yellow light theme
   - [VS Code Themes](https://vscodethemes.com/e/HashiramaNaiff.beSunflower-theme/sunflower)

5. **Green Breeze Light** (`green-breeze-light`)
   - Author: icy9ptcl
   - Green and blue focused light theme with good contrast
   - [GitHub](https://github.com/Icy9ptcl/GreenBreeze-Light-Theme)

6. **Cute Pink** (`cute-pink`)
   - Author: WebFreak
   - Cute pink light theme for VSCode
   - [GitLab](https://gitlab.com/WebFreak001/cute-vscode)

7. **Semi Light Purple** (`semi-light-purple`)
   - Author: Kapil Yadav
   - Light aesthetic theme with soft purple tones
   - [VS Code Marketplace](https://marketplace.visualstudio.com/items?itemName=KapilYadav.semi-light-purple-theme)

## Features

### Implemented Theming Features

- **14 built-in themes** (7 dark, 7 light) — GitHub Dark Classic, Shades of Purple, Sandstorm Classic, Rocky Blood Orange, Minimal Dark Neon Yellow, Hack The Box, Pink Cat Boo, GitHub Light, Red Velvet Cupcake, Orangy One Light, Sunflower, Green Breeze Light, Cute Pink, Semi Light Purple. Theme IDs listed in [Available Themes](#available-themes) above.
- **Individual theme doc pages** — Each theme has a dedicated page with author link (under heading and in Theme Information card), source link (opens in new tab), color palette, usage snippet, and “Best for” notes.
- **Theme persistence** — Selected theme (or `system`) stored in `localStorage`; restored on load. Theme flash prevented via inline script in Layout.
- **System preference** — “System” option in ThemeSwitcher follows OS light/dark (`prefers-color-scheme`). Default dark: `github-dark-classic`; default light: `github-light`. Theme updates when OS preference changes while System is selected.
- **High contrast** — Provided by the Settings “High contrast” toggle (`.high-contrast` in `accessibility.css`), not by separate theme variants. Works with any of the 14 themes.
- **Theme transition animations** — When switching themes, `html` and `body` animate `color`, `background-color`, and `border-color` over `--theme-transition-duration` (default 0.2s, ease-out). Set to 0s when `prefers-reduced-motion: reduce` or when the Settings “Reduce motion” toggle is on.
- **Theme preview in switcher** — Hover or focus a theme option in the ThemeSwitcher menu to see a preview panel with the theme name, background swatch, and accent bar. The swatch has a bordered frame so light and dark themes are both visible. System option has no preview. Preview is hidden on viewports ≤480px so the theme list has full width on mobile.
- **Unique icon per theme** — Theme switcher shows a distinct icon for each of the 14 themes (Sunflower uses Rainbow). Dark themes and Light themes are grouped with section labels; on mobile, section labels use underlines.

## Using Themes

### Setting Theme

Set the theme via the `data-theme` attribute on the HTML element:

```html
<html lang="en" data-theme="github-dark-classic">
```

### Programmatic Theme Switching

The `ThemeSwitcher` component handles theme switching automatically. It:

- Updates the `data-theme` attribute
- Persists choice in `localStorage`
- Updates all components instantly

### System Preference

You can follow the operating system light/dark preference:

- **First visit** (no saved theme): The site uses `prefers-color-scheme` to pick a default dark theme (GitHub Dark Classic) or default light theme (GitHub Light) before the first paint, so there is no flash.
- **"System" option**: In the theme switcher, choose **System** under **Preference** to follow OS preference. The resolved theme (dark or light default) is applied, and your choice is stored as `theme=system` in `localStorage`.
- **Live updates**: When System is selected and the user changes their OS light/dark setting, the theme updates automatically.

Manual theme choices (e.g. Shades of Purple, Sunflower) override system preference until the user selects System again.

### Manual Theme Switching

```javascript
// Set a specific theme
document.documentElement.setAttribute('data-theme', 'shades-of-purple');
localStorage.setItem('theme', 'shades-of-purple');

// Or set System (follow OS preference)
localStorage.setItem('theme', 'system');
const resolved = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'github-dark-classic' : 'github-light';
document.documentElement.setAttribute('data-theme', resolved);

// Load saved theme (resolve 'system' to dark/light default)
const savedTheme = localStorage.getItem('theme') || 'github-dark-classic';
const themeToApply = savedTheme === 'system'
  ? (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'github-dark-classic' : 'github-light')
  : savedTheme;
document.documentElement.setAttribute('data-theme', themeToApply);
```

## Theme accent colors (reference)

Each theme sets `--accent` (links, buttons, active states). OKLCH hue roughly maps to: 0–30° Red; 50–70° Orange/Yellow; 90–160° Green; 200–260° Blue/Cyan; 270–300° Purple; 320–360° Pink. The set is balanced with one dark and one light theme per color family:

| Color      | Dark theme                | Light theme           |
|-----------|---------------------------|------------------------|
| Red       | Sandstorm Classic         | Red Velvet Cupcake    |
| Orange    | Rocky Blood Orange        | Orangy One Light      |
| Yellow    | Minimal Dark Neon Yellow  | Sunflower             |
| Green     | Hack The Box              | Green Breeze Light     |
| Blue/Cyan | GitHub Dark Classic       | GitHub Light           |
| Purple    | Shades of Purple          | Semi Light Purple     |
| Pink      | Pink Cat Boo              | Cute Pink             |

Theme files live in `src/styles/themes/dark/` and `src/styles/themes/light/`.

## Theme File Structure

Themes are organized in `src/styles/themes/`:

```
themes/
├── dark/
│   ├── github-dark-classic.css
│   ├── shades-of-purple.css
│   ├── sandstorm-classic.css
│   ├── rocky-blood-orange.css
│   ├── minimal-dark-neon-yellow.css
│   ├── hack-the-box.css
│   └── pink-cat-boo.css
└── light/
    ├── github-light.css
    ├── red-velvet-cupcake.css
    ├── orangy-one-light.css
    ├── sunflower.css
    ├── green-breeze-light.css
    ├── cute-pink.css
    └── semi-light-purple.css
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
  --warning-text: oklch(100% 0 0deg); /* White text for better visibility and consistency across all themes */
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

The theme switcher automatically saves the selected theme to `localStorage` and restores it on page load. Stored values can be:

- A theme id (e.g. `github-dark-classic`, `github-light`) — that theme is applied.
- `system` — the theme is resolved from `prefers-color-scheme` (dark → GitHub Dark Classic, light → GitHub Light) and updates when the OS preference changes.

An inline script in `Layout.astro` prevents theme flash by resolving the theme (including system preference on first visit) and setting `data-theme` immediately before the page renders.

## CSS Build Process

Themes are included in the CSS build process:

1. All theme files are imported in `src/styles/main.css`
2. During development, themes are processed by PostCSS
3. In production, `pnpm build:css` creates a minified version
4. The layout automatically uses the minified CSS in production builds
