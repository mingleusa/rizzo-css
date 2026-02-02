# Theme Features – Brainstorm & Implementation Plan

A structured plan for the **Theming** section of the TODO: Theme Features, Additional Themes, and how they fit together. No implementation yet—this is the blueprint to review and approve before starting.

---

## Current State (Quick Reference)

- **Themes**: 8 themes (4 dark, 4 light). Applied via `data-theme` on `<html>`.
- **Persistence**: `localStorage.getItem('theme')` / `localStorage.setItem('theme')`. Layout has an inline script that runs before paint to apply saved theme and prevent flash.
- **Default**: If no saved theme, HTML defaults to `data-theme="dracula-at-night"`.
- **ThemeSwitcher**: Reads current theme from DOM, applies theme on option click, syncs all switcher instances on the page.

---

## 1. System Preference Detection (`prefers-color-scheme`) ✅ Implemented

### Goal
Respect OS light/dark preference when the user hasn’t chosen a theme yet. Once they pick a theme (or “System”), that choice is persisted.

### Behavior (Implemented)

| Scenario | Behavior |
|--------|----------|
| First visit, no `localStorage.theme` | Use `prefers-color-scheme`: pick one default dark theme (e.g. Dracula) if `dark`, one default light theme (e.g. Grey Light Pro) if `light`. |
| User selects a specific theme | Save to `localStorage`, use that theme. Ignore system preference until they change it. |
| User selects “System” | Save `"system"` (or similar). Resolve at runtime: `prefers-color-scheme: dark` → default dark theme; `light` → default light theme. |
| User has “System” and OS preference changes | Re-evaluate and switch theme (optional: can listen to `prefers-color-scheme` media query). |

### Implementation Outline

1. **Storage**
   - Allow `localStorage.theme` to be:
     - A theme id (e.g. `"dracula-at-night"`) → use that theme.
     - `"system"` → resolve from `prefers-color-scheme` to a concrete theme id.
   - Define “default dark” and “default light” theme ids (e.g. `dracula-at-night`, `grey-light-pro`) for system resolution.

2. **Layout inline script (flash prevention)**
   - If no saved theme: read `prefers-color-scheme` (e.g. `window.matchMedia('(prefers-color-scheme: dark)')`) and set `data-theme` to default dark or default light before first paint.
   - If saved theme is `"system"`: same resolution, set `data-theme` to the resolved theme.
   - If saved theme is a theme id: keep current behavior (set `data-theme` to that id).

3. **ThemeSwitcher**
   - Add a “System” option (e.g. first in the list, or a separate group).
   - When “System” is selected: `applyTheme('system')` → set `data-theme` to current resolved theme + `localStorage.setItem('theme', 'system')`.
   - On init: if stored value is `"system"`, resolve and apply; optionally listen to `matchMedia('(prefers-color-scheme: dark)').addEventListener('change', …)` to update when OS preference changes.

4. **Docs**
   - Update THEMING.md and ThemeSwitcher docs to describe “System” and first-visit behavior.

### Implemented
- **System** lives in a “Preference” group at the top of the theme menu (Gear icon).
- Live updates when OS preference changes while “System” is selected (media query listener).
- First visit and `theme=system` resolve to default dark (`dracula-at-night`) or default light (`grey-light-pro`) via `prefers-color-scheme`.

---

## 2. Theme Transition Animations

### Goal
When switching theme, animate color/background changes so the transition feels smooth instead of instant.

### Behavior (Proposed)
- On `data-theme` change, elements that use semantic variables (e.g. `background`, `color`, `border-color`) transition over a short duration (e.g. 150–300 ms).
- Respect `prefers-reduced-motion: reduce` (disable or shorten the transition).

### Implementation Outline

1. **CSS**
   - On `html` (or a wrapper that has `data-theme`), add:
     - `transition` for `color`, `background-color`, `border-color`, and optionally `box-shadow` (if themes change shadows).
   - Use a design token for duration, e.g. `--theme-transition-duration: 0.2s` (or 0.15s). Ease: `ease` or `ease-in-out`.

2. **Inheritance**
   - Child elements inherit `color` and often `background`; so transitioning `html` may be enough for a lot of the page. For components that set their own `background`/`color` from variables, the variables change and the transition on `html` won’t directly animate those. So we may need:
     - Either: apply a global rule like `*, *::before, *::after { transition: color var(--theme-transition-duration), background-color var(--theme-transition-duration), border-color var(--theme-transition-duration); }` (with care to not break intentional instant transitions).
     - Or: limit to `html, body` and key containers so the “main” background/text fade is smooth and accept that some components might snap (simpler, less risk).

3. **Reduced motion**
   - In `accessibility.css` (or wherever reduced-motion is handled): when `.reduced-motion` is set, set `--theme-transition-duration: 0s` (or omit the theme transition) so theme changes stay instant.

4. **Optional: class-based “transitioning”**
   - If we need to avoid animating on initial page load, we could add a class like `theme-transition-ready` after first paint and only apply theme transitions when that class is present. Not required for v1 if we’re okay with no transition on first load.

### Open Decisions
- How broad should the transition be? (Just `html/body` vs global.)
- Default duration: 200 ms is a good balance; 150 ms is snappier.

---

## 3. Theme Preview in Switcher

### Goal
Let users see a theme’s look before applying it (e.g. hover or focus on an option shows a small preview or temporarily applies the theme).

### Options (From least to more involved)

**A. Swatch-only (current)**  
- Already have a small `--theme-bg` swatch per option.  
- Could add a bit more (e.g. tiny text/button preview in the swatch).  
- No “live” full-page preview.

**B. Hover/focus = temporary apply**  
- On hover/focus of a theme option, set `data-theme` to that theme.  
- On blur/mouse leave, restore previous theme (from a JS-held value).  
- Pros: True preview of the full page.  
- Cons: Page really changes; can be disorienting; need to handle “click” vs “cancel” (restore) clearly.

**C. In-menu preview panel**  
- A small panel inside or next to the dropdown (e.g. “Sample” with a header, body, button in that theme).  
- Option hover/focus updates this panel’s theme (e.g. a scoped wrapper with `data-theme` or a class that applies the same variables).  
- Pros: Clear, no full-page change.  
- Cons: Need to duplicate a minimal set of theme variables into a small preview container or use an iframe; more layout/CSS.

**D. Hybrid**  
- Larger swatch + one or two sample elements (e.g. “Aa” text + a small button) per row, all using the theme’s variables for that option.  
- Implemented by rendering a tiny “preview” block per theme that uses CSS variables overridden from the theme’s palette (could be done with a data attribute and a single shared “preview” stylesheet).

### Recommended for v1
- **Option D (hybrid)** or a simpler **Option C**: a small preview area (e.g. “Preview” label + strip showing background, text, and accent) that updates when hovering/focusing a theme option.  
- Implementation: one preview container in the menu; on option hover/focus, set a `data-theme` (or class) on that container and optionally load the same CSS variable set there (e.g. by applying the theme class only on the preview div).  
- Avoid full-page temporary apply (B) for v1 to keep behavior predictable.

### Implementation Outline (for C/D)

1. **Markup**
   - Add a “Preview” block inside the theme menu (e.g. above or below the list) with a fixed structure: e.g. background strip, text sample, accent sample/button.

2. **Scoped theme on preview**
   - When a theme option is hovered/focused, set the preview container’s `data-theme` to that option’s theme (and ensure theme CSS applies in that subtree). If theme CSS is global (html[data-theme]), we’d need a way to “scope” the same variables to the preview div (e.g. duplicate variable definitions under `.theme-switcher__preview[data-theme="..."]` or a small script that copies computed styles—scoped variables are cleaner).

3. **Accessibility**
   - Preview is decorative; ensure it doesn’t grab focus. Option focus stays on the menu item; screen readers get the theme name as today.

4. **Fallback**
   - If we don’t want to maintain scoped theme copies, we could keep “preview” as enhanced swatches (Option A+) and document “Theme preview” as a future enhancement.

### Open Decisions
- Exact placement of preview (above list vs below vs side panel on wide screens).
- Whether to invest in scoped theme variables for the preview or ship with improved swatches first.

---

## 4. Additional Themes (High-Level)

### More dark/light themes (e.g. Monokai, One Dark)
- Add new theme files under `src/styles/themes/dark/` and `light/`.
- Each theme: CSS file with `[data-theme="theme-id"] { ... }` and semantic variables.
- Register in ThemeSwitcher `themes` config (label, value, bg swatch, icon).
- Add docs page under `docs/themes/<theme-id>.astro` and link from THEMING.md.
- **Order**: Can be done anytime; no dependency on 1–3.

### High contrast variant
- Option A: One or two full themes (“High Contrast Dark”, “High Contrast Light”) with higher contrast ratios.
- Option B: A “layer” (e.g. class or data attribute) that overrides borders/backgrounds/text for any theme to meet WCAG AAA where possible.
- Recommendation: Start with Option A (single “High Contrast Dark” theme) for clarity; add a layer later if needed.

### Custom theme builder/generator
- Defer until Theme Features (1–3) and at least one extra theme are done.
- Possible v1: “Create theme” doc page that explains copying a theme file and editing variables; optional “generator” that takes 2–3 base colors and outputs a theme file (script or simple UI).
- Full “theme builder” UI (sliders, live preview, export) can be a later phase.

---

## 5. Suggested Implementation Order

| Phase | Task | Rationale |
|-------|------|-----------|
| **1** | System preference detection | Small, clear scope; improves first-visit and “System” UX; no dependency on 2–3. |
| **2** | Theme transition animations | Independent; makes theme switches feel polished; respects reduced motion. |
| **3** | Theme preview in switcher | Builds on current switcher; can start with improved swatches (A+) and then add preview panel (C/D) if desired. |
| **4** | Additional themes / high contrast | Fits in whenever; can parallelize with 2–3 or after. |
| **5** | Custom theme docs / generator | After core theme features and at least one new theme are stable. |

---

## 6. Files to Touch (Summary)

- **System preference**: `Layout.astro` (inline script), `ThemeSwitcher.astro` (options, applyTheme, init, optional media listener), THEMING.md, GETTING_STARTED or Settings if we mention “System” there.
- **Transitions**: `base.css` or `variables.css` (tokens), possibly `accessibility.css` (reduced motion), maybe a small `themes/transitions.css` if we isolate theme transition rules.
- **Preview**: `ThemeSwitcher.astro` (markup + script), `components.css` (theme switcher preview styles). If scoped theme vars: either duplicate minimal vars under a preview selector or add a small build step; prefer CSS-only.
- **New themes**: New CSS files in `themes/dark|light/`, ThemeSwitcher config, new docs page, THEMING.md.

---

## 7. Success Criteria (Checklist)

- [ ] **System**: First visit uses light/dark based on OS; “System” option persists and resolves to default dark/light theme; optional: live update when OS preference changes.
- [ ] **Transitions**: Theme change animates (color/background) over ~200 ms; disabled or instant when `prefers-reduced-motion: reduce`.
- [ ] **Preview**: User can see a preview of a theme (swatch and/or small sample) before selecting; selecting still applies theme as today.
- [ ] **Docs**: THEMING.md and component docs updated; no regressions for existing theme switching or persistence.

---

When you’re ready to start, we can pick a phase (e.g. “Phase 1: System preference”) and break it into concrete steps and patches. No code will be written until you say go.
