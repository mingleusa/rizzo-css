# Accessibility

Rizzo CSS is built with accessibility as a core principle, following WCAG 2.1 guidelines. This doc covers features, utility classes, best practices, and **manual accessibility testing** (keyboard, screen reader, tools). Automated axe, keyboard, and ARIA tests run via `pnpm test:a11y`; see [Automated accessibility tests](#automated-accessibility-tests) and [Manual accessibility testing](#manual-accessibility-testing) below.

## Accessibility Features

### Implemented

- **Keyboard** — Full support: Tab, arrows, Enter/Space, Escape on all interactive components.
- **ARIA** — Appropriate roles and attributes (aria-label, aria-expanded, aria-controls, etc.) on dialogs, menus, tabs, accordions.
- **Focus** — Visible focus indicators (`--accent` / `--accent-fg`). Focus trap in Modal, Search, Settings (Tab cycles inside; Escape closes and restores focus to trigger). Reusable utility: `src/utils/focus-trap.js` (`getFocusableElements`, `createFocusTrap`, `setFocusablesInert`, `restoreFocusables`). Skip link (`.skip-link`) in layout and scaffolds; scrollable regions use `tabindex="0"`.
- **Modals** — Overlay and dialog use `inert` when closed so focusable content is not in the tab order (axe aria-hidden-focus).
- **Theme contrast** — All themes meet WCAG AA; run `pnpm check:contrast` when adding or changing theme colors (see [Automated accessibility tests](#automated-accessibility-tests)).
- **High contrast & reduce motion** — Settings toggles (`.high-contrast`, reduce motion); `prefers-reduced-motion` supported (see [High Contrast Mode](#high-contrast-mode)).

### Keyboard Navigation

All interactive components support full keyboard navigation:

- Tab navigation (focus trap in modals, Search overlay, and Settings panel)
- Arrow keys for menus (dropdown, tabs, accordion)
- Enter/Space for activation
- Escape to close/dismiss (Search, Settings, Navbar mobile menu, Modal, Dropdown)

Overlays (Search, Settings, Modal) and the Navbar mobile menu also close when clicking outside (backdrop/overlay click) in addition to Escape and their close controls.

### ARIA Attributes

Components include proper ARIA attributes:

- `aria-label` - Descriptive labels for all interactive elements (buttons, links, menu items)
- `aria-expanded` - Menu/accordion state
- `aria-controls` - Element relationships
- `aria-describedby` - Additional descriptions
- `aria-haspopup` - Indicates elements with popup menus
- `role` - Semantic roles (menu, menuitem, dialog, etc.)

### Focus (details)

- **Indicators** — `--accent` or `--accent-fg` for links and outlines.
- **Trap & restore** — Modal, Search, Settings: focus moves to first focusable on open; Tab/Shift+Tab cycle inside; Escape closes and restores focus to trigger. Use `src/utils/focus-trap.js` for custom overlays.
- **Skip link** — `.skip-link` in layout and scaffolds; visible when focused.
- **Scrollable regions** — `<pre>` and code blocks use `tabindex="0"` for keyboard access.
- **Links** — Underlined so they are distinguishable without color alone (WCAG).

## Utility Classes

### Screen Reader Only

Hide content visually but keep it available to screen readers:

```html
<span class="sr-only">Screen reader only text</span>
```

Uses modern `clip-path: inset(50%)` instead of deprecated `clip` property.

### Focusable Screen Reader Content

Make screen reader content focusable:

```html
<a href="#content" class="sr-only sr-only-focusable">Skip to content</a>
```

When focused, the content becomes visible and accessible.

### Skip Links

Skip to main content link:

```html
<a href="#main-content" class="skip-link">Skip to main content</a>
```

The skip link:
- Is hidden by default using `clip-path: inset(100% 0 0 0)`
- Becomes visible when focused (keyboard navigation)
- Has a high z-index (`--z-skip-link: 10001`) to ensure it appears above all other elements, including the navbar
- Maintains accessibility principles while ensuring visibility when needed

### Visually Hidden

Hide content completely:

```html
<span class="visually-hidden">Hidden content</span>
```

## Focus Styles

All interactive elements have visible focus indicators:

```css
:focus-visible {
  outline: 2px solid var(--accent);
  outline-offset: 2px;
}
```

## Form Accessibility

### Labels

Always use labels with form inputs. Labels must:
- Be associated with a control using the `for` attribute (matching the input's `id`)
- OR contain the form control as a nested element
- Have visible text content (not empty)

**Correct usage:**

```html
<!-- Using for attribute -->
<label for="email">Email</label>
<input type="email" id="email" name="email" />

<!-- Using nested control -->
<label>
  <input type="checkbox" name="newsletter" />
  Subscribe to newsletter
</label>
```

**Incorrect usage:**

```html
<!-- ❌ Label without associated control or text -->
<label>Scrollbar style</label>
<!-- Should be a <div> or <span> instead -->
```

### Required Fields

```html
<label for="name" class="required">Name</label>
<input type="text" id="name" name="name" required />
```

### Error States

```html
<input type="email" aria-invalid="true" aria-describedby="email-error" />
<span id="email-error" class="error-message">Invalid email address</span>
```

### Success States

```html
<span class="success-message">Form submitted successfully</span>
```

## Content, links, and copy

These practices apply to content and any custom links you add; components already use descriptive labels and correct elements.

### Language changes (WCAG 2.2 AA)

When content includes phrases in a different language, mark them so screen readers use the correct pronunciation:

```html
<p>Welcome to our site. <span lang="fr">Bonjour</span> and <span lang="es">hola</span>.</p>
```

Set `lang` on the phrase (or parent) to the appropriate language code (e.g. `lang="fr"` for French). The page `<html lang="...">` should match the primary language.

### Links that open in a new window (WCAG 2.2 AA)

If a link opens in a new tab or window, make that clear so users can decide before activating. Options:

- **Text:** e.g. “Document (opens in new tab)”.
- **Icon + aria-label:** Use an icon and `aria-label="Opens in new tab"` (or similar) on the link, and ensure the icon is not the only indicator (visible text or sr-only text is best).

Rizzo components do not add `target="_blank"` by default; when you do, add one of the above.

### Sensory characteristics and descriptive labels

- Avoid referring to **sensory characteristics alone** (e.g. “click the red button”). Use position, name, or label as well.
- Use **unique, descriptive link and button text** (e.g. “View invoice” instead of “click here” or “read more” without context).
- **Abbreviations (AAA):** Expand on first use (e.g. “World Wide Web Consortium (W3C)”) or link to a definition.

## Responsive Design

- Mobile-first approach
- Touch-friendly targets (minimum 44x44px; Rizzo uses `--touch-target-min: 3rem` / 48px)
- Responsive typography
- Flexible layouts

## Images and media

Rizzo does not ship image or video components; these guidelines apply to content and any custom media you add.

### Images

- **Alt text (A):** Every meaningful image needs descriptive `alt` text. Use `alt=""` for purely decorative images (or `aria-hidden="true"` for decorative inline SVG).
- **Complex images (A):** For charts, graphs, or diagrams, provide a short description near the image or a link to a full description. Use `aria-describedby` if the description is in the page.
- **Image text (A):** If an image contains text, include that text in the `alt` attribute (or provide an equivalent).
- **Avoid images of text (AA):** Prefer live text (and Rizzo’s typography) instead of images of text so users can resize and reflow.

### Text over images (AA)

If you place text over background images, ensure contrast is sufficient (4.5:1 for normal text, 3:1 for large). Use a scrim/overlay or crop the image so text remains readable. Test with `pnpm check:contrast` and manual checks where text sits on photos or gradients.

### Media (audio and video)

- **No autoplay (A):** Do not autoplay audio or video with sound; if autoplay is used, ensure it can be paused and the sound can be muted.
- **Captions and transcripts (A):** Provide captions for video and transcripts for audio. Custom players need appropriate ARIA roles and keyboard support.
- **No seizure triggers (A):** Avoid content that flashes more than three times per second.

## Color Contrast

All themes meet WCAG AA contrast requirements:

- Normal text: 4.5:1 contrast ratio
- Large text: 3:1 contrast ratio
- Interactive elements: 3:1 contrast ratio

### Contrast-Aware Text Colors

Rizzo CSS automatically provides proper contrast through semantic text color variables:

- `--accent-text` - Automatically white or dark based on accent color lightness
- `--success-text` - Contrast-appropriate text for success backgrounds
- `--warning-text` - Dark text for light warning backgrounds
- `--error-text` - Contrast-appropriate text for error backgrounds
- `--info-text` - Contrast-appropriate text for info backgrounds

All buttons and components using colored backgrounds automatically use these contrast-aware variables to ensure accessibility.

### Theming variables used by components

Components (Astro and Svelte) use semantic theme variables so every theme can guarantee WCAG AA contrast:

| Use | Variables | Where used |
|-----|-----------|------------|
| Page and UI surface | `--background`, `--background-alt` | Body, cards, modals, dropdowns, inputs |
| Primary text | `--text` | Body, headings, list text |
| Secondary text | `--text-dim` | Descriptions, placeholders, labels (use `--text` where 4.5:1 is required, e.g. docs description, framework switcher label) |
| Icons | `--icon`, `--icon-dim` | Navbar, dropdown, accordion, table, breadcrumb (SVG `currentColor`) |
| Links and primary actions | `--accent-fg`, `--accent-fg-hover` (links, outlines); `--accent`, `--accent-hover` (solid buttons) | Links use `--accent-fg`; buttons use `--accent` + `--accent-text` |
| Text on accent | `--accent-text` | Buttons (primary), badges (primary), active segment, skip link |
| Text on solid semantic | `--success-text-on-solid`, `--warning-text-on-solid`, `--error-text-on-solid`, `--info-text-on-solid`, `--accent-text-on-hover`, `--text-on-solid-hover` | Buttons (semantic variants), badges (success, warning, error, info) — theme-tuned contrast on solid backgrounds |
| Semantic states | `--success` / `--success-text`, `--error` / `--error-text`, `--warning` / `--warning-text`, `--info` / `--info-text` | Alerts (soft backgrounds); buttons and badges use *-text-on-solid on solid fills |
| Borders and dividers | `--border` | Inputs, cards, dropdowns |
| Focus and overlays | `--accent` / `--accent-fg` (outline), `--overlay`, `--shadow-color` | Focus ring, modal backdrop, shadows |

Themes must set each `-text` variable to a color that meets at least 4.5:1 contrast on its paired background (e.g. `--accent-text` on `--accent`). The design system does not use hardcoded hex/rgb for UI colors; all interactive and text colors come from these variables. Run `pnpm check:contrast` to verify every theme meets WCAG AA.

### Text over images and AAA

- **Text over images:** When text is placed on top of images or gradients, ensure at least 4.5:1 (normal) or 3:1 (large). Use overlays or cropping if needed; see [Images and media](#images-and-media).
- **Enhanced contrast (AAA, 7:1):** Rizzo themes target AA (4.5:1). For AAA (7:1 normal text, 4.5:1 large), enable the Settings **High contrast** toggle (`.high-contrast`), which strengthens borders and contrast across components and can be combined with high-contrast themes.

## Reduced Motion

Respects user preferences:

```css
@media (prefers-reduced-motion: reduce) {
  /* Animations disabled */
}
```

## High Contrast Mode

Supports high contrast mode through both media queries and user settings:

**Media Query:**
```css
@media (prefers-contrast: high) {
  /* Enhanced borders and contrast */
}
```

**User Setting:**
The Settings component includes a "High contrast" toggle that applies the `.high-contrast` class to the document root, enabling enhanced contrast across all components.

**Reduce Motion:**
The Settings component also includes a "Reduce motion" toggle that applies the `.reduced-motion` class, respecting user motion preferences beyond just the `prefers-reduced-motion` media query.

## Best Practices

This section summarizes patterns used in Rizzo CSS components and how to test them. The docs site runs automated axe, keyboard, and ARIA tests (`pnpm test:a11y`); manual keyboard and screen reader testing is still recommended for key flows.

### General

1. **Always provide labels** — Every form input needs an associated label (`for`/`id` or wrapping) or `aria-label`; never rely on placeholder alone.
2. **Use semantic HTML** — Proper heading hierarchy, landmarks (`<main>`, `<nav>`, `<aside>`), and list structure so assistive tech can navigate by headings and regions.
3. **Check color contrast** — Use semantic variables (`--accent-fg`, `--*-text-on-solid`) so themes can meet WCAG AA (4.5:1 normal text, 3:1 large). Run axe or contrast checkers.
4. **Provide alternatives** — Alt text for images, captions for video; hide decorative images from screen readers (`alt=""` or `role="presentation"`).

### Keyboard patterns

- **Tab order** — Logical, top-to-bottom and left-to-right; no focus traps except inside modal/search/settings overlays where trap is intentional.
- **Enter/Space** — Activate buttons, links, tabs, menu items; toggle accordions and dropdowns.
- **Escape** — Close modal, dropdown, theme switcher, search overlay, settings; focus returns to the trigger that opened them.
- **Arrows** — Move within tab list (Left/Right), menu (Up/Down), and optionally accordion headers without activating.
- **Focus visible** — All interactive elements use `:focus-visible` with a visible outline (`--accent-fg` or `--accent`).

Components (Modal, Dropdown, Tabs, ThemeSwitcher, Search, Accordion) are covered by automated keyboard tests in `tests/a11y/keyboard.spec.mjs`. Manually verify focus order and no stray traps on new pages.

### ARIA usage

- **Dialogs** — `role="dialog"`, `aria-modal="true"`, `aria-labelledby` (or `aria-label`) so screen readers announce purpose and scope. When closed, overlay and dialog use `inert` so focusable descendants are not exposed (aria-hidden-focus).
- **Menus** — Trigger has `aria-haspopup="menu"` and `aria-expanded`; menu has `role="menu"`, items `role="menuitem"` (or `menuitemradio` for single-select like theme switcher).
- **Tabs** — `role="tablist"`, `role="tab"`, `aria-selected`, `aria-controls` linking to panel `id`; panels have `role="tabpanel"` and `aria-labelledby` to tab.
- **Accordions** — Headers have `aria-expanded` and `aria-controls`; panels are hidden with `hidden` or `aria-hidden` when collapsed.

ARIA and roles are asserted in `tests/a11y/aria.spec.mjs`. Real screen reader output (NVDA, VoiceOver, JAWS) still needs manual testing.

### Focus order and restoration

- When opening a modal or overlay, focus moves into the dialog (first focusable or the close button).
- When closing, focus returns to the element that opened it (trigger button).
- Scrollable regions (e.g. code block `<pre>`, sidebar `<aside>`) have `tabindex="0"` so keyboard users can focus and scroll.

### How to test

1. **Keyboard-only** — Unplug the mouse; Tab, Shift+Tab, Enter, Space, arrows, Escape. Confirm all actions are possible and focus never gets stuck.
2. **Screen reader** — NVDA (Windows), VoiceOver (macOS: Cmd+F5). Navigate by headings, landmarks, and form controls; open/close modals and menus and confirm labels and state (e.g. “dialog”, “menu open”, “tab selected”).
3. **Automated** — Run `pnpm test:a11y` (axe on entire main site, keyboard and ARIA specs). Fix any reported violations before release.
4. **Optional** — axe DevTools or Lighthouse accessibility audit for one-off checks.

## Automated accessibility tests

Run the full a11y suite: `pnpm test:a11y` (or `pnpm test:a11y:ci` in CI). This builds the site, starts the preview server, and runs:

- **Axe (WCAG)** — `tests/a11y/docs.spec.mjs`: entire main site (home, docs, every component page for Astro/Vanilla/Svelte, all theme pages). WCAG 2/2.1 A & AA; critical/serious only. Route list is built from `FOUNDATION_ROUTES`, `COMPONENT_SLUGS`, `THEME_SLUGS` in that spec; add new routes there as needed.
- **Keyboard** — `tests/a11y/keyboard.spec.mjs`: Modal (Escape, focus trap/return), dropdown (Escape), tabs (arrows), search (trigger, Escape), font switcher (Escape, focus return), accordion (Enter toggles), theme switcher (Escape, focus return), settings (trigger, Escape, focus return to trigger).
- **ARIA / roles** — `tests/a11y/aria.spec.mjs`: Modal, dropdown, tabs, accordion, theme switcher, font switcher, footer, **settings** (dialog, aria-modal, aria-labelledby), **search** (dialog, aria-modal, aria-labelledby), **back to top** (button label), **tooltip** (trigger aria-describedby, tooltip role and id).
- **Theme contrast** — `pnpm check:contrast`: verifies all themes meet WCAG AA (text/background and accent-text/accent ≥ 4.5:1). Run when adding or changing theme colors.
- **Lint in build** — We use axe (WCAG 2/2.1 A & AA) in CI as the primary automated accessibility check. There is no eslint-plugin-jsx-a11y for Astro/Svelte in this repo; axe covers markup and roles. Add component-level a11y linting in your app if your stack supports it.

Automated tests do **not** replace manual keyboard and screen reader testing; use the checklist below for that.

## Component accessibility checklist (all frameworks)

When implementing or porting a component (Astro, Svelte, or Vanilla), ensure it meets the following so behavior and screen reader support are consistent. The same ARIA, keyboard, and focus behavior must be present in each framework’s version.

| Component | ARIA / semantics | Keyboard | Focus |
|-----------|------------------|----------|--------|
| **Modal** | `role="dialog"`, `aria-modal="true"`, `aria-labelledby` (title id); overlay/dialog `inert` when closed | Enter/Space on trigger opens; Escape closes | Focus into dialog on open (first focusable); trap inside; return to trigger on close |
| **Dropdown / menus** | Trigger `aria-haspopup="true"`, `aria-expanded`; menu `role="menu"`, items `role="menuitem"` (or `menuitemradio`) | Arrows move; Enter/Space activate; Escape closes | Focus first item on open; return to trigger on close |
| **Theme Switcher** | Same as dropdown; options `role="menuitemradio"`, `aria-checked` | Same as dropdown | Same as dropdown |
| **Font Switcher** | Same as Theme Switcher | Same as dropdown | Same as dropdown |
| **Tabs** | `role="tablist"`, `role="tab"`, `aria-selected`, `aria-controls`; panels `role="tabpanel"`, `aria-labelledby` | Arrows change tab; Enter/Space activate | Tab reaches tablist; focus follows selection |
| **Accordion** | Headers `aria-expanded`, `aria-controls`; panel id matches | Enter/Space toggle | Headers focusable; no trap |
| **Search (overlay)** | Panel `role="dialog"`, `aria-modal="true"`, `aria-labelledby`; input `aria-label`; results `role="listbox"` | Enter on trigger opens; Escape closes | Focus in input on open; trap in panel; return to trigger on close |
| **Settings (panel)** | Panel `role="dialog"`, `aria-modal="true"`, `aria-labelledby="settings-title"`; content region `aria-label="Settings options"` | Escape closes | Focus in panel on open; trap; return to trigger on close |
| **Alert / Toast** | `role="alert"`, `aria-live="polite"`, `aria-atomic="true"`, `aria-label` by variant; dismiss button `aria-label="Dismiss"` | Dismiss button focusable | — |
| **Tooltip** | Trigger has `aria-describedby="{id}"`; tooltip element `id`, `role="tooltip"` | Focus on trigger shows tooltip (CSS or script) | No trap; tooltip is descriptive only |
| **Pagination** | `<nav aria-label="Pagination">`; current page `aria-current="page"`; links `aria-label="Page N"`, "First", "Previous", "Next", "Last" | All links/buttons in tab order | — |
| **Back to top** | Button `aria-label` (e.g. "Back to top"); wrapper `aria-hidden` when not visible | Button in tab order when visible | — |
| **CopyToClipboard** | Button `aria-label`; optional `aria-live` region for “Copied” feedback | Button focusable | — |
| **Footer** | Landmark: `role="contentinfo"` or semantic `<footer>` | Links in tab order | — |
| **Forms (Input, Checkbox, etc.)** | Label with `for`/`id` or `aria-label`; `aria-required`, `aria-invalid`, `aria-describedby` for errors | All controls in tab order | — |

Use this table when adding a new component or porting to another framework so Astro, Svelte, and Vanilla stay in sync.

## Manual accessibility testing

Use this checklist for manual keyboard and screen reader testing. Run automated tests first (`pnpm test:a11y`), then work through the priorities below. Log issues (component, check, result, notes) and fix before release; update [Best practices](#best-practices) if you discover new patterns.

### Priority 1 — High interaction (test first)

| Component | What to test |
|-----------|--------------|
| **Modal** | Focus moves into modal when opened; focus trapped inside (Tab/Shift+Tab); Escape closes and focus returns to trigger; ARIA: role=dialog, aria-modal, aria-labelledby; screen reader announces purpose. |
| **Dropdown / Navbar dropdowns** | Trigger opens menu; arrow keys move; Enter/Space activates and closes; Escape closes and returns focus; nested submenus if any; ARIA: aria-expanded, role=menu/menuitem; screen reader announces menu and items. |
| **Theme Switcher** | Same as Dropdown; selected theme announced; ARIA: expanded, selected, menuitemradio. |
| **Font Switcher** | Same as Dropdown (in Settings or standalone); arrow keys, Enter to select pair; Escape closes; preview and label announced. |
| **Tabs** | Tab reaches tab list; arrows change tab; Enter/Space activates; panel updates and is announced; ARIA: tablist, tab, tabpanel, aria-selected, aria-controls. |
| **Search (Cmd+K)** | Open with keyboard; focus in input; Escape closes and returns focus; results keyboard navigable and announced. |
| **Settings** | Open/close with trigger; focus trap when open; Escape closes; theme, font size, font pair, sound effects, and other toggles keyboard operable and announced. |
| **Accordion** | Headers focusable; Enter/Space toggles; ARIA: aria-expanded, aria-controls; screen reader announces expanded/collapsed. |

### Priority 2 — Forms and feedback

| Component | What to test |
|-----------|--------------|
| **Forms** | All inputs reachable by Tab; labels associated (for/id or aria-label); error/required announced; ARIA: aria-required, aria-invalid, aria-describedby. |
| **Tooltip** | Trigger focus shows tooltip; keyboard user can read it; no focus trap. |
| **Toast** | New toasts announced (live region); dismiss focusable and keyboard operable. |
| **CopyToClipboard** | Button has accessible name; success feedback announced. |

### Priority 3 — Navigation and layout

| Component | What to test |
|-----------|--------------|
| **Navbar** | Skip link or main content first; nav items and dropdowns keyboard accessible; mobile menu open/close and focus trap. |
| **Docs Sidebar** | Nav landmark; group labels and links focusable in order; current page indicated (e.g. aria-current or visible active state); collapse/expand if present. |
| **Footer** | Landmark (role="contentinfo" or semantic footer); links focusable with clear names; no interactive traps. |
| **Pagination, Breadcrumb, Buttons, Badge, Card, Table** | Links/buttons focusable with clear names; table headers associated if sortable. |
| **Sound Effects** | When used standalone: checkbox focusable, label “Play sound on click” and help text announced; state change announced. (When in Settings, covered by Settings.) |

### Tools

- **Keyboard-only** — No mouse. Tab, Shift+Tab, Enter, Space, arrows, Escape. Confirm all actions possible and no focus traps (except intentional in modal/search/settings).
- **Screen reader** — NVDA (Windows), VoiceOver (macOS: Cmd+F5), or JAWS. Check announcements (labels, state changes, live regions).
- **200% zoom** — Test at 200% browser zoom (or 200% text scaling). Content should reflow without horizontal scrolling; viewport meta and rem-based layout support this. Manually verify key flows (nav, modals, forms).
- **Increased font size** — Use the Settings font-size slider or OS font-size settings; Rizzo uses `--font-size-scale` so text scales with your choice.
- **Color blindness and blurry vision** — Use browser DevTools (e.g. Chrome Rendering → Emulate vision deficiencies) or simulators to check that information is not conveyed by color alone and that focus/buttons remain visible. Test with blur or low-vision simulators if available.
- **axe DevTools** — Browser extension for one-off page scans; fixes then re-scan.
- **Lighthouse** — Chrome DevTools → Lighthouse → Accessibility for periodic checks.

### Suggested order

1. Keyboard-only pass on Priority 1 (Modal, Dropdown, Theme Switcher, Font Switcher, Settings, Tabs, Search, Accordion). Fix focus and traps.
2. Screen reader pass on the same. Fix labels and announcements.
3. axe DevTools on those pages. Fix reported issues.
4. Repeat for Priority 2 and 3; update [Best practices](#best-practices) if you find new patterns.

## Resources

- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [WebAIM](https://webaim.org/)
- [A11y Project](https://www.a11yproject.com/)
- [MDN Accessibility](https://developer.mozilla.org/en-US/docs/Web/Accessibility)
