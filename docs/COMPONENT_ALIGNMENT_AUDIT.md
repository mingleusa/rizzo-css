# Component & Live Example Alignment Audit

**Date:** 2025-02  
**Scope:** All 53 design-system components across Astro, Vanilla, Svelte, Vue, React.

---

## Summary

| Status | Count | Notes |
|--------|--------|--------|
| **Fully aligned** | 53 | All components have matching live demo content across Astro, Vanilla, Svelte, Vue, and React. |
| **Partially aligned** | 0 | — |

---

## Fully Aligned (53 components)

Live examples and/or code snippets match Astro's canonical content across **Astro, Vanilla, Svelte, Vue, React**.

### Layout (5)
- **navbar** — Custom blocks all frameworks (Rizzo, Search, Settings, same nav links).
- **docs-sidebar** — Grouped nav (Introduction, Foundations, Components) everywhere.
- **dashboard** — Same sidebar + main content in React/Vue/Svelte; Vanilla/Astro equivalent.
- **resizable** — Horizontal (One/Two) + vertical (Header/Content) in React/Vue/Svelte.
- **footer** — Same site name, year, links (Docs, Home).

### Forms & inputs (12)
- **button**, **button-group**, **forms**, **input-group**, **switch**, **slider**, **toggle**, **toggle-group**, **label**, **divider**, **separator**, **kbd** — Demos and copy aligned (e.g. "Enable notifications", Bold/On, Left/Center/Right, Email + placeholder, $ 0.00 USD, FormGroup Email Address + help text).

### Data display (10)
- **cards**, **carousel**, **table**, **badge**, **pagination**, **aspect-ratio**, **empty**, **scroll-area**, **calendar**, **range-calendar** — Same labels, slide text, table caption/columns, Tags list, 16:9, "No items yet" + CTA, calendar labels.

### Feedback (5)
- **alert**, **skeleton**, **spinner**, **progress-bar**, **toast** — Same variants and copy (e.g. toast Success/Error/Warning/Info messages).

### Overlay (9)
- **tooltip** — "Hover me" + "This is a basic tooltip" in all frameworks.
- **copy-to-clipboard** — Intro text + value `example@email.com`, format "Email".
- **modal**, **alert-dialog**, **sheet**, **popover**, **hover-card**, **context-menu**, **dropdown** — Vue custom blocks in `VueDocDemo.vue` with Rizzo BEM and refs for open/close; React uses *Demo components; Astro/Svelte/Vanilla have full demos.

### Navigation (2)
- **breadcrumb**, **back-to-top** — Same items (Home → Docs → Components → Breadcrumb), threshold/label.

### Disclosure (3)
- **accordion**, **collapsible**, **tabs** — Same sections (Section one/two/three, "Show more" panel, Overview/Features/Pricing) and table content.

### Other (avatar + theme-switcher, font-switcher, settings, search, icons, sound-effects)
- **avatar** — Used in demos consistently.
- **theme-switcher**, **font-switcher**, **settings**, **search**, **icons**, **sound-effects** — Doc pages and live examples in all frameworks; copy may vary slightly.

---

## File Reference

- **Astro pages:** `src/pages/docs/components/*.astro`
- **Vanilla pages:** `src/pages/docs/vanilla/components/*.astro`
- **Svelte pages:** `src/components/svelte/docs/pages/*Doc.svelte`
- **Vue demo:** `src/components/vue/VueDocDemo.vue` (custom blocks + `<component :is="Component" v-bind="demoProps">`)
- **React demo:** `src/components/react/ReactDocShowcase.tsx` (custom blocks + registry `getReactComponent` / `getDemoProps`)
- **Categories:** `src/config/componentCategories.ts`

---

## Post-scan alignment (pristine pass)

The following were updated so live examples match the Astro originals in each framework’s syntax:

- **Vanilla accordion** — Three items: "Section one", "Section two", "Section three"; panel copy "Content for section one. Only one panel is open at a time." etc.; first panel expanded by default.
- **Vanilla breadcrumb** — Four items: Home → Docs → Components → Breadcrumb (current); live example and copyable HTML updated.
- **Vanilla modal** — Standard example: title "Example Modal", body bullet list (focus trapping, keyboard, backdrop, theme-aware), footer Cancel + Confirm; copyable HTML aligned.
- **Vanilla button** — All nine variants (Default, Primary, Secondary, Success, Warning, Error, Info, Outline, Ghost); separate "Sizes:" row (Small, Default, Large) and "Disabled State" (Disabled Default, Disabled Primary); copyable HTML updated.
- **Svelte button** — Added Secondary and Ghost; "Sizes:" caption with Small/Default/Large; "Disabled State" heading and "Live Example" label; labels "Disabled Default" / "Disabled Primary".
- **Svelte modal** — Standard example: "Open Example Modal" trigger, title "Example Modal", body bullet list (same as Astro), footer Cancel + Confirm.
- **React modal** — `ModalDemo.tsx` updated to match Astro: intro text, "Open Example Modal" button, title "Example Modal", body bullet list (focus trapping, keyboard, backdrop, theme-aware), footer Cancel + Confirm via `footer` prop.
- **Vue** — Already aligned: modal and button custom blocks match Astro copy; accordion, breadcrumb, and other demos use matching content.

---

## Conclusion

**Yes** — all 53 components have aligned live examples across Astro, Vanilla, Svelte, Vue, and React. Vue overlay components (modal, alert-dialog, sheet, popover, hover-card, context-menu, dropdown) use custom blocks in `VueDocDemo.vue` with Rizzo BEM and Vue refs for open/close state. Vanilla, Svelte, and React demos for accordion, breadcrumb, modal, and button now match Astro’s content and structure in their respective syntax. Vue modal and button demos were already aligned.
