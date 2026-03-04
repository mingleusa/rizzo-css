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

## Conclusion

**Yes** — all 53 components have aligned live examples across Astro, Vanilla, Svelte, Vue, and React. Vue overlay components (modal, alert-dialog, sheet, popover, hover-card, context-menu, dropdown) use custom blocks in `VueDocDemo.vue` with Rizzo BEM and Vue refs for open/close state.
