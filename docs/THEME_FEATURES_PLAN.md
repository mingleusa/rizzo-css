# Theme Features – Current State

Reference for how theming works in Rizzo CSS. All planned theme features are implemented.

---

## Current State

- **Themes**: 14 themes (7 dark, 7 light). Applied via `data-theme` on `<html>`. Default dark: `github-dark-classic`; default light: `github-light`.
- **Persistence**: `localStorage.getItem('theme')` / `localStorage.setItem('theme')`. Layout inline script runs before paint to apply saved theme and prevent flash.
- **ThemeSwitcher**: Preference (System) + Dark/Light groups, unique icon per theme, active state and preview panel. Syncs all instances on the page.
- **System preference**: "System" option uses `prefers-color-scheme`; live updates when OS preference changes.
- **High contrast**: Settings toggle (`.high-contrast` in `accessibility.css`). Works with any theme.
- **Theme transitions**: 0.2s on `html`/`body` for color/background; set to 0s when reduced motion is on.
- **Theme preview**: Hover/focus on a theme option shows name, background swatch, and accent bar; hidden on viewports ≤360px.
