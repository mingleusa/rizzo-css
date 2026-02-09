# Accessibility testing checklist

Use this checklist **before** writing the [Accessibility best practices](./ACCESSIBILITY.md) doc. Fix any issues you find; then document the verified patterns.

## How to use this doc

1. **Run the tests** (keyboard + screen reader + optional automated) for each component or group below.
2. **Log issues** (e.g. focus order, missing labels, wrong ARIA, keyboard traps).
3. **Fix issues** in the component or CSS.
4. **Re-test** until the checklist passes.
5. **Then** add the “Best practices” section to ACCESSIBILITY.md based on what you verified.

---

## Priority 1 — High interaction (test first)

These components have focus management, popups, or complex keyboard behavior. Test on the docs site (e.g. `/docs/components/...`).

### Modal

| Check | How to test |
|-------|-------------|
| Focus moves into modal when opened | Keyboard: open modal, next focus should be inside (focusable element or first focusable). |
| Focus is trapped inside modal | Tab and Shift+Tab should cycle only within modal, never to page behind. |
| Escape closes modal | Press Escape; modal closes, focus returns to trigger. |
| Focus returns to trigger on close | After closing (Escape or button), focus is on the element that opened the modal. |
| ARIA: `role="dialog"`, `aria-modal="true"`, `aria-labelledby` / `aria-label` | Inspect or use a11y tree (browser devtools or screen reader). |
| Screen reader announces modal and its purpose | NVDA / VoiceOver: open modal; title/purpose is announced. |

### Dropdown (and Navbar dropdowns)

| Check | How to test |
|-------|-------------|
| Trigger opens menu; focus moves to first item (or stays on trigger per pattern) | Keyboard: Enter/Space on trigger; arrow keys move between items. |
| Arrow keys move focus within menu | Up/Down (or Left/Right for horizontal) without leaving menu. |
| Enter/Space activates item and closes menu | No focus trap after selection. |
| Escape closes menu and returns focus to trigger | Focus back on trigger. |
| Nested submenus (if any) | Arrow/key to open submenu; focus moves into submenu; Escape closes submenu then menu. |
| ARIA: `aria-expanded`, `aria-haspopup`, `role="menu"` / `role="menuitem"` (or combobox pattern if applicable) | Inspect markup. |
| Screen reader announces menu open and items | Screen reader: menu state and option names are announced. |

### Theme Switcher

| Check | How to test |
|-------|-------------|
| Trigger opens list; keyboard moves between options | Same as Dropdown: Enter/Space to open; arrows to move; Enter to select theme. |
| Escape closes and returns focus to trigger | Focus returns to trigger. |
| Selected theme is announced (e.g. “System”, “GitHub Dark Classic”) | Screen reader or visible label. |
| ARIA: expanded, selected state, option roles | Inspect. |

### Tabs

| Check | How to test |
|-------|-------------|
| Tab key reaches tab list; arrow keys move between tabs | Left/Right (or Up/Down) to change tab; Enter/Space to activate. |
| Tab panel updates and is announced | Screen reader announces panel content or tab name when switching. |
| ARIA: `role="tablist"`, `role="tab"`, `role="tabpanel"`, `aria-selected`, `aria-controls`, `id` links | Inspect. |
| Focus does not get stuck | Tab moves from tab list into active panel content. |

### Search (modal / Cmd+K)

| Check | How to test |
|-------|-------------|
| Open with keyboard (e.g. Cmd+K / Ctrl+K); focus in search input | Focus in input when search opens. |
| Escape closes and returns focus to previous element | No focus trap; focus restored. |
| Results are keyboard navigable and announced | Arrow keys move in results; screen reader announces result text. |
| ARIA: search role, live region for results if dynamic | Inspect. |

### Accordion

| Check | How to test |
|-------|-------------|
| Each header focusable; Enter/Space toggles panel | Keyboard only; no mouse. |
| ARIA: `aria-expanded`, `aria-controls`, `aria-disabled` if needed | Inspect. |
| Screen reader announces expanded/collapsed | State change announced. |

---

## Priority 2 — Forms and feedback

### Forms (Input, Textarea, Select, Checkbox, Radio)

| Check | How to test |
|-------|-------------|
| All inputs reachable and focusable by Tab | Tab order is logical. |
| Labels associated (click label focuses input) | `for`/`id` or aria-label. |
| Error/required state announced | Screen reader: required, invalid, error message. |
| ARIA: `aria-required`, `aria-invalid`, `aria-describedby` for errors | Inspect. |

### Tooltip

| Check | How to test |
|-------|-------------|
| Trigger focus shows tooltip; keyboard user can read it | Focus on trigger; tooltip visible; screen reader can get content (or aria-label on trigger). |
| No focus trap in tooltip | Tab moves to next focusable on page. |

### Toast

| Check | How to test |
|-------|-------------|
| New toasts announced (live region) | Screen reader: `aria-live` region announces when toast appears. |
| Dismiss (if present) is focusable and keyboard operable | Button/link to dismiss. |

### CopyToClipboard

| Check | How to test |
|-------|-------------|
| Button has accessible name (e.g. “Copy to clipboard”) | aria-label or visible text. |
| Success/feedback announced | After copy, feedback is announced (live region or label update). |

---

## Priority 3 — Navigation and layout

### Navbar (desktop and mobile)

| Check | How to test |
|-------|-------------|
| Skip link or main content reachable first (if present) | Tab from top. |
| All nav items and dropdowns keyboard accessible | As per Dropdown checks. |
| Mobile menu: open/close and focus trap | Menu open = focus inside; close = focus back to toggle. |

### Pagination, Breadcrumb, Buttons, Badge, Card, Table

| Check | How to test |
|-------|-------------|
| Links/buttons focusable and have clear names | Tab through; screen reader announces purpose. |
| Table: headers associated with cells if sortable | `scope` or `headers`/`id`; screen reader can navigate by column/row if applicable. |

---

## Tools — What to use and when

### 1. Keyboard-only testing (manual)

- **What:** Unplug the mouse (or ignore it). Use only Tab, Shift+Tab, Enter, Space, Arrow keys, Escape.
- **When:** For every Priority 1 and 2 component; quick for Priority 3.
- **How:** Open docs site, go to each component page, run through the checklist. Verify focus order, no traps, and that all actions are doable.

### 2. Screen reader testing (manual)

- **What:** Use a screen reader to navigate and operate components.
- **Suggested:**  
  - **Windows:** [NVDA](https://www.nvaccess.org/) (free).  
  - **macOS:** VoiceOver (built-in; Cmd+F5).  
  - **Optional:** JAWS (Windows) if available.
- **When:** Priority 1 and 2; spot-check Priority 3. Focus on announcements (labels, state changes, live regions) and that nothing is missing or wrong.
- **How:** Same as keyboard: go to each component page, open/modify/close with keyboard, and listen for correct labels and state (e.g. “menu open”, “tab selected”, “modal dialog”).

### 3. Automated axe (quick regression)

- **What:** [axe DevTools](https://www.deque.com/axe/devtools/) (browser extension) or [axe-core](https://github.com/dequelabs/axe-core) in CI.
- **When:** After manual fixes; run on component pages and key flows. Catches many WCAG violations (contrast, labels, roles, etc.) but **not** focus order or “does the screen reader say the right thing?” — so manual testing is still required.
- **How:** Open a component page, run “Scan all of my page” (or “Scan part of my page” on the component). Fix reported issues; re-scan.

### 4. Lighthouse (optional)

- **What:** Chrome DevTools → Lighthouse → Accessibility.
- **When:** Periodic check on the docs site (e.g. home, one component, one theme).
- **How:** Run audit; use it to catch contrast, tap targets, and other high-level issues. Complements axe and manual testing.

### 5. Automated E2E a11y (later, for CI)

- **What:** [@axe-core/playwright](https://github.com/dequelabs/axe-core/blob/develop/doc/rule-descriptions.md) or [@axe-core/puppeteer](https://github.com/dequelabs/axe-core/tree/develop/doc) — run axe in headless browser tests.
- **When:** Once you want automated regression in CI. Write tests that open key pages and run `axe.run()`; fail the build on violations.
- **How:** Add Playwright (or Puppeteer) to the repo, one test per route or per component page that injects axe and asserts 0 violations (or only allowed ones). Can be added after manual + axe extension testing is in place.

---

## Suggested order of work

1. **Keyboard-only** pass on Priority 1 components (Modal, Dropdown, ThemeSwitcher, Tabs, Search, Accordion). Fix focus and keyboard traps.
2. **Screen reader** pass on the same set. Fix labels, roles, and announcements.
3. **axe DevTools** on those component pages. Fix any reported issues.
4. Repeat for **Priority 2** (forms, Tooltip, Toast, CopyToClipboard).
5. **Priority 3** keyboard + axe spot-check.
6. **Then** write the “Best practices” section in ACCESSIBILITY.md describing the patterns you verified and how you test (keyboard + screen reader + axe).

---

## Logging issues

Keep a simple list (e.g. in a GitHub issue or a local file) with:

- **Component** (e.g. Modal)
- **Check** (e.g. “Focus returns to trigger on close”)
- **Result** (Fail / Pass)
- **Notes** (e.g. “Focus went to body instead of trigger”)

Use this to drive fixes and to decide what to call out in the best-practices doc (e.g. “We ensure focus returns to the trigger when the modal closes”).
