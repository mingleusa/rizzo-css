# Component inventory and gaps

This document lists Rizzo CSS components, Rizzo-only components, and planned or missing patterns. Use it to spot gaps, plan new components, and keep framework parity (Astro, Svelte, React, Vue, Vanilla) and accessibility in mind.

## Summary

- **Rizzo has** all components in the CLI and scaffold (including Skeleton, Switch, AlertDialog, Slider, Sheet, etc.). Same BEM/CSS for Astro, Svelte, React, Vue, and Vanilla. Dashboard has full parity across frameworks.
- **Framework parity:** All components (including **Dashboard**) have docs and examples for Astro, Svelte, React, Vue, and Vanilla.
- **Accessibility:** Rizzo runs axe (WCAG 2 A/AA) on all doc and block routes via `pnpm test:a11y`. New or updated components should follow the same a11y patterns (keyboard, ARIA, focus, contrast).

---

## Component mapping (common patterns → Rizzo)

| Common pattern   | Rizzo equivalent        | Notes |
|------------------|-------------------------|--------|
| Accordion        | Accordion               | ✓ Same |
| Alert Dialog     | Alert Dialog            | ✓ Same (confirm/cancel dialog, focus trap). |
| Alert            | Alert                   | ✓ Same |
| Aspect Ratio     | Aspect Ratio            | ✓ Same (wrapper for 16/9, 1/1, etc.). |
| Avatar           | Avatar                  | ✓ Same |
| Badge            | Badge                   | ✓ Same |
| Breadcrumb       | Breadcrumb              | ✓ Same |
| Button Group     | Button Group            | ✓ Same (horizontal/vertical attached buttons). |
| Button           | Button                  | ✓ Same |
| Calendar         | —                       | **Missing.** Date calendar. |
| Card             | Cards                   | ✓ Same (we use "Cards" doc). |
| Carousel         | —                       | **Missing.** Image/content carousel. |
| Chart            | —                       | **Missing.** Data charts. |
| Checkbox         | Forms (Checkbox)        | ✓ Same |
| Collapsible      | Collapsible             | ✓ Same (single expand/collapse; Accordion for multiple). |
| Combobox         | —                       | **Missing.** Autocomplete + select. |
| Command          | —                       | **Missing.** Command palette (e.g. Cmd+K). We have Search, not full command. |
| Context Menu     | Context Menu            | ✓ Same (right-click menu). |
| Data Table       | Table                   | ✓ Same (we have sorting/filtering). |
| Date Picker      | —                       | **Missing.** Date input + calendar. |
| Dialog           | Modal                   | ✓ Same |
| Drawer           | Sheet                   | ✓ Same (slide-out from top/right/bottom/left). |
| Dropdown Menu    | Dropdown                | ✓ Same |
| Empty            | Empty                   | ✓ Same (empty state with icon, title, description, CTA). |
| Field            | Forms (FormGroup)       | ✓ Same |
| Form             | Forms                   | ✓ Same |
| Hover Card       | Hover Card              | ✓ Same (floating panel on hover). |
| Input Group      | Input Group             | ✓ Same (input with optional prefix/suffix addons). |
| Input OTP        | —                       | **Missing.** OTP/code input. |
| Input            | Forms (Input)           | ✓ Same |
| Item             | —                       | Optional; only if a distinct list primitive is needed. |
| Kbd              | Kbd                     | ✓ Same (keyboard key styling component). |
| Label            | Label                   | ✓ Same (standalone form label). |
| Menubar          | Navbar / Dropdown       | We have Navbar + Dropdown. |
| Native Select    | Forms (Select)          | ✓ Same |
| Navigation Menu  | Navbar, Docs Sidebar    | ✓ Same |
| Pagination       | Pagination              | ✓ Same |
| Popover          | Popover                 | ✓ Same (floating panel triggered by button). |
| Progress         | Progress Bar            | ✓ Same |
| Radio Group      | Forms (Radio)           | ✓ Same |
| Range Calendar   | —                       | **Missing.** Date range. |
| Resizable        | Resizable               | ✓ Same (panel groups with drag handles). |
| Scroll Area      | Scroll Area             | ✓ Same (themed scrollbar region). |
| Select           | Forms (Select)          | ✓ Same |
| Separator        | Separator               | ✓ Same (thin line; Divider has optional label). |
| Sheet            | Sheet                   | ✓ Same (slide-out panel from any edge). |
| Sidebar          | Docs Sidebar, Dashboard | ✓ Same |
| Skeleton         | Skeleton                | ✓ Same |
| Slider           | Slider                  | ✓ Same (range input, themeable). |
| Sonner / Toast   | Toast                   | ✓ Same |
| Spinner          | Spinner                 | ✓ Same |
| Switch           | Switch                  | ✓ Same |
| Table            | Table                   | ✓ Same |
| Tabs             | Tabs                    | ✓ Same |
| Textarea         | Forms (Textarea)        | ✓ Same |
| Toggle Group     | Toggle Group            | ✓ Same (single or multiple selection). |
| Toggle           | Toggle                  | ✓ Same (pressed/unpressed button). |
| Tooltip          | Tooltip                 | ✓ Same |
| Typography       | —                       | Design system typography only; no Typography component. |

---

## Rizzo-only components

- **Back to Top** — Scroll-to-top button.
- **Copy to Clipboard** — Copy with feedback.
- **Docs Sidebar** — Doc nav with groups and active state.
- **Font Switcher** — Font pair (sans + mono) picker.
- **Icons** — SVG icon set (Tabler, Devicons).
- **Navbar** — Site nav.
- **Settings** — Panel for theme, font, sound, a11y.
- **Sound Effects** — "Play sound on click" toggle.
- **Theme Switcher** — Theme picker with icons.
- **Dashboard** — Layout (sidebar + main) for app dashboards.
- **Footer** — Site footer (role="contentinfo").

---

## Gaps: planned or missing

Prioritized for planning (not all may be needed):

| Component       | Priority | Notes |
|-----------------|----------|--------|
| **Skeleton**    | ~~High~~ ✓ Done | Implemented: loading placeholder, role="status", reduced-motion. |
| **Switch**      | ~~High~~ ✓ Done | Implemented: role="switch", aria-checked, keyboard (Space). |
| **Aspect Ratio**| ~~Medium~~ ✓ Done | Implemented: wrapper for 16/9, 1/1, etc. |
| **Slider**      | ~~Medium~~ ✓ Done | Implemented: range input, themeable, keyboard. |
| **Input Group** | ~~Medium~~ ✓ Done | Implemented: input with prefix/suffix addons (BEM: input-group, input-group__addon). |
| **Empty**       | ~~Medium~~ ✓ Done | Implemented: empty state with icon, title, description, CTA. |
| **Drawer / Sheet** | ~~Medium~~ ✓ Done | Implemented: Sheet component (slide-out from any edge). |
| **Button Group**| ~~Low~~ ✓ Done | Implemented: horizontal/vertical attached buttons. |
| **Toggle / Toggle Group** | ~~Low~~ ✓ Done | Implemented: Toggle and Toggle Group. |
| **Kbd**         | ~~Low~~ ✓ Done | Implemented: Kbd component for keyboard shortcuts. |
| **Resizable**   | ~~Low~~ ✓ Done | Implemented: resizable panel groups. |
| **Scroll Area** | ~~Low~~ ✓ Done | Implemented: scroll area with themed scrollbar. |
| **Calendar / Date Picker / Range Calendar** | Low | Heavier; consider later or external lib. |
| **Carousel**    | Low      | Often app-specific. |
| **Chart**       | Low      | Usually use a chart library. |
| **Combobox**    | Low      | Autocomplete; more complex. |
| **Command**     | Low      | Command palette; Search is related. |
| **Input OTP**   | Low      | Niche (verification codes). |
| **Item**        | —        | Only if a distinct list primitive is needed. |
| **Typography**  | —        | We use design system typography; optional component. |

---

## Framework parity

- **Astro:** Component doc pages under `/docs/components/` (including Dashboard, Forms, Icons, etc.).
- **Svelte:** Component doc pages under `/docs/svelte` (components overview and per-component pages).
- **React:** Component doc pages under `/docs/react` (all 52 components with live demos and TSX snippets).
- **Vue:** Component doc pages under `/docs/vue` (all 52 components with live demos and SFC snippets).
- **Vanilla:** Component doc pages under `/docs/vanilla/components/` (including Dashboard).
- **A11y:** Dashboard is included in `COMPONENT_SLUGS` in `tests/a11y/docs.spec.mjs`, so all framework doc routes (Astro, Svelte, React, Vue, Vanilla) are tested.

---

## Accessibility

- **Tests:** `pnpm test:a11y` runs axe (WCAG 2 A/AA) on all doc and block routes. Fix any critical/serious violations (e.g. color contrast, focus, ARIA).
- **Patterns:** New or updated components should:
  - Use semantic HTML and ARIA where needed (e.g. `role="dialog"`, `aria-expanded`, `aria-controls`).
  - Support keyboard (Tab, Enter, Space, Escape, arrows where appropriate).
  - Trap focus in modals/dialogs; restore focus on close.
  - Respect `prefers-reduced-motion` and theme contrast variables.
- **Docs:** Component pages already document a11y where relevant; keep that up to date.

---

## References

- Rizzo: `src/config/docsNav.ts`, `tests/a11y/docs.spec.mjs`, `docs/COMPONENTS.md`, `CONTRIBUTING.md` (adding components, nav, a11y, search index)
