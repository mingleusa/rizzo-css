# Component inventory and gaps

This document lists Rizzo CSS components, Rizzo-only components, and planned or missing patterns. Use it to spot gaps, plan new components, and keep framework parity (Astro, Svelte, Vanilla) and accessibility in mind.

## Summary

- **Rizzo has** all components in the CLI and scaffold (including Skeleton, Switch, AlertDialog, Slider, Sheet, etc.). Same BEM/CSS for Astro, Svelte, and Vanilla. Dashboard has full parity (Astro, Svelte, Vanilla).
- **Framework parity:** All components (including **Dashboard**) have docs and examples for Astro, Svelte, and Vanilla.
- **Accessibility:** Rizzo runs axe (WCAG 2 A/AA) on all doc and block routes via `pnpm test:a11y`. New or updated components should follow the same a11y patterns (keyboard, ARIA, focus, contrast).

---

## Component mapping (common patterns → Rizzo)

| Common pattern   | Rizzo equivalent        | Notes |
|------------------|-------------------------|--------|
| Accordion        | Accordion               | ✓ Same |
| Alert Dialog     | Modal                   | Same pattern (dialog, focus trap). |
| Alert            | Alert                   | ✓ Same |
| Aspect Ratio     | —                       | **Missing.** CSS aspect-ratio or wrapper. |
| Avatar           | Avatar                  | ✓ Same |
| Badge            | Badge                   | ✓ Same |
| Breadcrumb       | Breadcrumb              | ✓ Same |
| Button Group     | —                       | **Missing.** Button group (segmented control). We have button variants only. |
| Button           | Button                  | ✓ Same |
| Calendar         | —                       | **Missing.** Date calendar. |
| Card             | Cards                   | ✓ Same (we use "Cards" doc). |
| Carousel         | —                       | **Missing.** Image/content carousel. |
| Chart            | —                       | **Missing.** Data charts. |
| Checkbox         | Forms (Checkbox)        | ✓ Same |
| Collapsible      | Accordion               | Same idea (expand/collapse). |
| Combobox         | —                       | **Missing.** Autocomplete + select. |
| Command          | —                       | **Missing.** Command palette (e.g. Cmd+K). We have Search, not full command. |
| Context Menu     | Dropdown                | Same pattern; trigger = right-click. |
| Data Table       | Table                   | ✓ Same (we have sorting/filtering). |
| Date Picker      | —                       | **Missing.** Date input + calendar. |
| Dialog           | Modal                   | ✓ Same |
| Drawer           | —                       | **Missing.** Slide-out panel. |
| Dropdown Menu    | Dropdown                | ✓ Same |
| Empty            | —                       | **Missing.** Empty state (illustration + text + CTA). |
| Field            | Forms (FormGroup)       | ✓ Same |
| Form             | Forms                   | ✓ Same |
| Hover Card       | Tooltip                 | Similar (hover popover). We have Tooltip. |
| Input Group      | —                       | **Missing.** Input with prefix/suffix/addons. |
| Input OTP        | —                       | **Missing.** OTP/code input. |
| Input            | Forms (Input)           | ✓ Same |
| Item             | —                       | **Missing.** List/item component (if distinct). |
| Kbd              | —                       | **Missing as component.** We use `<kbd>` in code blocks. |
| Label            | Forms (label)           | ✓ Same |
| Menubar          | Navbar / Dropdown       | We have Navbar + Dropdown. |
| Native Select    | Forms (Select)          | ✓ Same |
| Navigation Menu  | Navbar, Docs Sidebar    | ✓ Same |
| Pagination       | Pagination              | ✓ Same |
| Popover          | Tooltip / Dropdown      | We cover with Tooltip and Dropdown. |
| Progress         | Progress Bar            | ✓ Same |
| Radio Group      | Forms (Radio)           | ✓ Same |
| Range Calendar   | —                       | **Missing.** Date range. |
| Resizable        | —                       | **Missing.** Resizable panels. |
| Scroll Area      | —                       | **Missing.** Custom scroll region. |
| Select           | Forms (Select)          | ✓ Same |
| Separator        | Divider                 | ✓ Same |
| Sheet            | —                       | **Missing.** Slide-out panel (like Drawer). |
| Sidebar          | Docs Sidebar, Dashboard | ✓ Same |
| Skeleton         | Skeleton                | ✓ Implemented. |
| Slider           | —                       | **Missing.** Range slider input. |
| Sonner / Toast   | Toast                   | ✓ Same |
| Spinner          | Spinner                 | ✓ Same |
| Switch           | Switch                  | ✓ Implemented. |
| Table            | Table                   | ✓ Same |
| Tabs             | Tabs                    | ✓ Same |
| Textarea         | Forms (Textarea)        | ✓ Same |
| Toggle Group     | —                       | **Missing.** Toggle button group. |
| Toggle           | —                       | **Missing.** Toggle button. |
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
| **Aspect Ratio**| Medium   | Wrapper for 16/9, 1/1, etc.; trivial with CSS. |
| **Slider**      | Medium   | Range input; themeable, keyboard. |
| **Input Group** | Medium   | Input + prefix/suffix (e.g. search icon, ".com"). |
| **Empty**       | Medium   | Empty state block (illustration + text + CTA). |
| **Drawer / Sheet** | Medium | Slide-out panel; could be one component. |
| **Button Group**| Low      | Group of buttons (e.g. segmented). |
| **Toggle / Toggle Group** | Low | Toggle button(s). |
| **Kbd**         | Low      | Optional component for keyboard shortcuts. |
| **Calendar / Date Picker / Range Calendar** | Low | Heavier; consider later or external lib. |
| **Carousel**    | Low      | Often app-specific. |
| **Chart**       | Low      | Usually use a chart library. |
| **Combobox**    | Low      | Autocomplete; more complex. |
| **Command**     | Low      | Command palette; Search is related. |
| **Resizable**   | Low      | Resizable split panels. |
| **Scroll Area** | Low      | Custom scrollbar region. |
| **Input OTP**   | Low      | Niche (verification codes). |
| **Item**        | —        | Only if a distinct list primitive is needed. |
| **Typography**  | —        | We use design system typography; optional component. |

---

## Framework parity

- **Astro:** Component doc pages under `/docs/components/` (including Dashboard, Forms, Icons, etc.).
- **Svelte:** Component doc pages under `/docs/svelte` (components overview and per-component pages).
- **Vanilla:** Component doc pages under `/docs/vanilla/components/` (including Dashboard).
- **A11y:** Dashboard is included in `COMPONENT_SLUGS` in `tests/a11y/docs.spec.mjs`, so all three framework routes are tested.

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
