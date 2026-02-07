# Theme Features – Current State and Next Steps

Reference for how theming works today and possible enhancements (transitions, preview). System preference is implemented; transitions and preview are optional next steps.

---

## Current State

- **Themes**: 14 themes (7 dark, 7 light). Applied via `data-theme` on `<html>`. Includes GitHub Dark Classic and GitHub Light.
- **Persistence**: `localStorage.getItem('theme')` / `localStorage.setItem('theme')`. Layout has an inline script that runs before paint to apply saved theme and prevent flash.
- **Default**: If no saved theme, HTML defaults to `data-theme="dracula-at-night"`.
- **ThemeSwitcher**: Reads current theme from DOM, applies theme on option click, syncs all switcher instances on the page.
- **System preference**: Implemented. "System" option in ThemeSwitcher; first visit and `theme=system` use `prefers-color-scheme` (default dark: dracula-at-night, default light: grey-light-pro). Live updates when OS preference changes.
- **High contrast**: Implemented via Settings toggle (`.high-contrast` class in `accessibility.css`). Works with any theme; no separate high-contrast theme variants.
- **Theme set**: We are not adding more dark/light themes or dedicated high-contrast theme variants. The 14 themes and the High contrast toggle are the intended set.

---

## 1. System Preference Detection ✅ Implemented

- **System** lives in a "Preference" group at the top of the theme menu (Gear icon).
- Live updates when OS preference changes while "System" is selected.
- First visit and `theme=system` resolve to default dark (`dracula-at-night`) or default light (`grey-light-pro`) via `prefers-color-scheme`.

---

## 2. Theme Transition Animations (Optional Next Step)

When switching theme, animate color/background changes over a short duration (e.g. 150–200 ms). Respect `prefers-reduced-motion: reduce` (disable or shorten the transition).

**Implementation outline:**
- On `html` (or a wrapper with `data-theme`), add `transition` for `color`, `background-color`, `border-color`. Use a token e.g. `--theme-transition-duration: 0.2s`.
- In `accessibility.css`, when `.reduced-motion` is set, set `--theme-transition-duration: 0s` so theme changes stay instant.

---

## 3. Theme Preview in Switcher (Optional Next Step)

Let users see a theme’s look before applying it (e.g. a small preview panel in the menu that updates on hover/focus of a theme option). Current behavior is swatch-only; a preview panel would require scoped theme variables or a similar approach so the preview container can show that theme’s colors without changing the full page.

---

## 4. Implementation Order (If Pursued)

| Phase | Task | Status |
|-------|------|--------|
| **1** | System preference detection | ✅ Done |
| **2** | Theme transition animations | Optional |
| **3** | Theme preview in switcher | Optional |

---

## 5. Files to Touch (If Implementing 2 or 3)

- **Transitions**: `base.css` or `variables.css` (tokens), `accessibility.css` (reduced motion).
- **Preview**: `ThemeSwitcher.astro` (markup + script), `components.css` (preview styles). Would need scoped theme variables or equivalent for the preview container.
