# Design System TODO

A focused list of **remaining** tasks for the Rizzo CSS design system, **ordered by priority** (top = do first).

**Current state:** Single package **rizzo-css** (v0.0.40) with CSS, CLI, and scaffolds for Vanilla, Astro, and Svelte. For feature summaries and what’s already done, see: [CONTRIBUTING.md](../CONTRIBUTING.md) (community), [ACCESSIBILITY.md](./ACCESSIBILITY.md#accessibility-features) (a11y features), [ACCESSIBILITY_TESTING.md](./ACCESSIBILITY_TESTING.md#features-automated-coverage) (automated tests), [COLORS.md](./COLORS.md) (theming). Full product state: [GETTING_STARTED.md](./GETTING_STARTED.md), [CLI](./CLI.md), [CLI_FLOWS](./CLI_FLOWS.md).

---

## ▶️ Next task (recommended)

**Manual a11y testing** — Automated axe, keyboard, and ARIA tests are in place (`pnpm test:a11y`). Run manual keyboard and screen reader testing on key components (Modal, Dropdown, Tabs, ThemeSwitcher, Search, Accordion) per [ACCESSIBILITY_TESTING.md](./ACCESSIBILITY_TESTING.md); log and fix any issues.

---

## After that (priority order)

1. **TypeScript** — Type definitions and props interfaces for components and utils.
2. **Component composition patterns** (doc) → **automated testing** (component + a11y) → **focus/contrast** (deepen a11y) → **performance** → **React/Vue** when ready.

---

## 1. Documentation

- [ ] **Best practices**
  - [ ] Component composition patterns
  - [ ] Performance optimization tips

## 2. Developer Experience

- [ ] **TypeScript** — Type definitions and props interfaces for components and utils.
- [ ] **Testing** — Component, accessibility, and (optionally) visual regression tests.
- [ ] **Build** — Bundle size, tree-shaking, critical CSS (if needed).
- [ ] **Storybook** *(optional)* — Interactive playground and design system showcase.

## 3. Accessibility

- [ ] **Manual screen reader testing** — [ACCESSIBILITY_TESTING.md](./ACCESSIBILITY_TESTING.md) checklist: NVDA/VoiceOver/JAWS on Modal, Dropdown, Tabs, ThemeSwitcher, Search, Accordion; fix any announced-label or focus issues.
- [ ] **Focus** — Focus trap utilities, focus restoration, skip links (already in place for Modal/Search/Settings).
- [ ] **Contrast** — Themes use `--accent-fg` / `--accent-text` etc.; verify all themes meet WCAG AA.

## 4. Package distribution

- [ ] **Multi-framework**
  - [ ] React components (in-repo or separate later)
  - [ ] Vue components (in-repo or separate later)
- [ ] **In-repo framework routes** — Svelte done; React/Vue same pattern. See [FRAMEWORK_STRUCTURE](./FRAMEWORK_STRUCTURE.md).

## 5. Performance

- [ ] **Optimization** — Bundle analysis, unused CSS removal, critical CSS, load strategy.
- [ ] **Lazy loading** *(optional)* — Themes or component CSS on demand.

## 6. CSS variables & design system (as needed)

- [ ] Additional spacing/transform/animation variables if discovered during porting.

## 7. Browser support

- [ ] **Polyfills** — OKLCH fallbacks; modern CSS feature detection.
- [ ] **Testing** — Cross-browser, mobile, accessibility tooling.

## 8. Examples & demos

- [ ] Example pages — Component/theme showcase; form and layout examples.
- [ ] Templates — Landing, dashboard, or docs-site starter (optional).

---

## Notes

- All components follow BEM naming convention.
- All styles use semantic theme variables.
- All components must be accessible (WCAG 2.1 AA minimum).
- No inline styles — all CSS in appropriate files.
- All components keyboard navigable and work with all themes.
- **Design system as source of truth:** Styling uses CSS variables and utility classes; when porting to other frameworks only JavaScript is ported, not styling.
