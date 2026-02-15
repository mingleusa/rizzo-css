# Accessibility testing checklist

Use this checklist for manual keyboard and screen reader testing. The [Accessibility best practices](./ACCESSIBILITY.md#best-practices) section is in place (keyboard patterns, ARIA usage, focus order, how to test). Automated axe, keyboard, and ARIA tests run via `pnpm test:a11y`.

## Completed (automated)

The following are implemented and run in `pnpm test:a11y`:

- **Axe (WCAG)** — `tests/a11y/docs.spec.mjs`: entire main site (homepage, all docs, every component page for Astro/Vanilla/Svelte, all theme pages), theme locked to `github-dark-classic`, WCAG 2/2.1 A & AA; critical/serious only. See [What is tested](#what-is-tested) below.
- **Keyboard** — `tests/a11y/keyboard.spec.mjs`: Modal (Escape closes, focus returns; focus in dialog), dropdown (Escape closes menu), tabs (arrow keys), search (trigger focusable, Escape closes overlay).
- **ARIA / roles** — `tests/a11y/aria.spec.mjs`: Modal (dialog, aria-modal, aria-labelledby), dropdown (menu/menuitem, aria-expanded), tabs (tablist/tab, aria-selected, aria-controls), accordion (aria-expanded, aria-controls), theme switcher (menuitemradio).

Manual keyboard and screen reader testing (Priority 1–3 below) is still recommended.

## How to use this doc

1. **Run the tests** (keyboard + screen reader + optional automated) for each component or group below.
2. **Log issues** (e.g. focus order, missing labels, wrong ARIA, keyboard traps).
3. **Fix issues** in the component or CSS.
4. **Re-test** until the checklist passes.
5. **Then** update the [Best practices](./ACCESSIBILITY.md#best-practices) section in ACCESSIBILITY.md if you discover new patterns or fixes.

---

## Automated accessibility tests (axe-core + Playwright)

The repo includes **free, automated** a11y tests using [axe-core](https://github.com/dequelabs/axe-core) and [Playwright](https://playwright.dev/). They run against the built docs site and fail on **critical** or **serious** WCAG 2/2.1 Level A and AA violations.

### Run locally

```bash
pnpm test:a11y
```

This builds the site (`pnpm build`), starts the preview server, and runs the a11y test suite in `tests/a11y/`. Tests cover the full docs site (see [What is tested](#what-is-tested)) plus keyboard and ARIA specs.

### Run in CI

```bash
pnpm test:a11y:ci
```

Installs Chromium for Playwright (e.g. in GitHub Actions) then runs the same tests. Add this to your CI pipeline:

```yaml
# Example: GitHub Actions
- run: pnpm install
- run: pnpm test:a11y:ci
```

### What is tested

- **Pages (full site):** Homepage (`/`), Getting started, Components overview, Design system, Theming, Accessibility, Colors; every component page under `/docs/components/<slug>` (accordion, alert, avatar, badge, breadcrumb, button, cards, copy-to-clipboard, divider, dropdown, forms, icons, modal, navbar, pagination, progress-bar, search, settings, spinner, table, tabs, theme-switcher, toast, tooltip); Vanilla docs index and every `/docs/vanilla/components/<slug>`; Svelte docs index and every `/docs/svelte/components/<slug>`; all 14 theme preview pages (`/docs/themes/<id>`). Each page is loaded, theme is set to `github-dark-classic`, then axe runs.
- **Rules:** WCAG 2.0 and 2.1 Level A and AA (`wcag2a`, `wcag2aa`, `wcag21a`, `wcag21aa`). This includes (among others): color-contrast, link-in-text-block (links distinguishable without color alone), scrollable-region-focusable (keyboard access to scroll areas; code block `<pre>` has `tabindex="0"`), aria-hidden-focus (no focusable elements in hidden/inert regions; modals use `inert` when closed), labels, roles, and other axe rules under those tags.
- **Impact:** Only **critical** and **serious** violations fail the build; **minor** and **moderate** are reported but do not fail (you can tighten this in `tests/a11y/*.spec.mjs` if needed).
- **Also in this suite:** `keyboard.spec.mjs` (keyboard behavior) and `aria.spec.mjs` (ARIA/roles). For full screen reader output, use manual testing (Priority 1–3 below).

### Adding more pages

The axe route list is built from `FOUNDATION_ROUTES`, `COMPONENT_SLUGS`, `THEME_SLUGS` in `tests/a11y/docs.spec.mjs`. To add a new route, extend the appropriate array or add a one-off entry to `DOCS_A11Y_ROUTES`. To scan only part of a page, use `.include(selector)`.

Automated tests **do not** replace manual keyboard and screen-reader testing (see Priority 1–3 below). They catch many WCAG violations (labels, contrast, roles) and help prevent regressions.

If tests fail, the output lists each violation (rule id, impact, help URL). Fix the reported issues in CSS or markup, or add a one-off exclusion in the spec (e.g. `.exclude(selector)` for a known false positive) only when justified.

**Current status:** The docs site a11y suite (`pnpm test:a11y`) includes:

- **Axe (WCAG):** `tests/a11y/docs.spec.mjs` — Runs axe on the entire main site: homepage, all foundation docs (getting-started, components, design-system, theming, accessibility, colors), every component page (Astro, Vanilla, Svelte), and all 14 theme pages. Only critical/serious violations fail.
- **Keyboard:** `tests/a11y/keyboard.spec.mjs` — Modal (Escape closes, focus returns; focus moves into dialog), dropdown (Escape closes menu), tabs (arrow keys change selection), search (trigger focusable, Escape closes overlay).
- **ARIA / roles:** `tests/a11y/aria.spec.mjs` — Checks markup that screen readers rely on: modal (role=dialog, aria-modal, aria-labelledby), dropdown (aria-haspopup, aria-expanded, role=menu/menuitem), tabs (role=tablist/tab, aria-selected, aria-controls), accordion (aria-expanded, aria-controls), theme switcher (menuitemradio options).

True screen reader testing (NVDA, VoiceOver, JAWS) is still manual; the ARIA tests verify the same markup that screen readers use.

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

### 5. Automated E2E a11y (implemented)

- **What:** [@axe-core/playwright](https://github.com/dequelabs/axe-core/blob/develop/doc/rule-descriptions.md) — axe-core runs in Playwright tests against the built docs site.
- **When:** Run `pnpm test:a11y` locally or `pnpm test:a11y:ci` in CI. Catches critical/serious WCAG violations on key pages.
- **How:** See [Automated accessibility tests (axe-core + Playwright)](#automated-accessibility-tests-axe-core--playwright) above. Tests live in `tests/a11y/`. Add more pages in `docs.spec.mjs` as needed.

---

## Suggested order of work

1. **Keyboard-only** pass on Priority 1 components (Modal, Dropdown, ThemeSwitcher, Tabs, Search, Accordion). Fix focus and keyboard traps.
2. **Screen reader** pass on the same set. Fix labels, roles, and announcements.
3. **axe DevTools** on those component pages. Fix any reported issues.
4. Repeat for **Priority 2** (forms, Tooltip, Toast, CopyToClipboard).
5. **Priority 3** keyboard + axe spot-check.
6. **Then** update the [Best practices](./ACCESSIBILITY.md#best-practices) section in ACCESSIBILITY.md if you discover new patterns (keyboard + screen reader + axe).

---

## Logging issues

Keep a simple list (e.g. in a GitHub issue or a local file) with:

- **Component** (e.g. Modal)
- **Check** (e.g. “Focus returns to trigger on close”)
- **Result** (Fail / Pass)
- **Notes** (e.g. “Focus went to body instead of trigger”)

Use this to drive fixes and to decide what to call out in the best-practices doc (e.g. “We ensure focus returns to the trigger when the modal closes”).
