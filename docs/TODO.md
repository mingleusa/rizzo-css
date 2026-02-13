# Design System TODO

A focused list of remaining tasks for the Rizzo CSS design system, **ordered by priority** (top = do first).

**Current state:** Single package **rizzo-css** (v0.0.25) with CSS, CLI, and scaffolds. **CLI:** `npx rizzo-css init` | `add` | `theme` | `help`. **Init:** framework (Vanilla / Astro / Svelte) → existing or new. **Existing** (or `add` command) → drop in CSS + hand-pick components. **New** → **Full** (everything) | **Minimal** (recommended) | **Manual** (minimal base + component picker with minimal set pre-selected), then package manager. Every scaffold includes **LICENSE-RIZZO** and **README-RIZZO.md** (no overwrite of project LICENSE/README); Astro/Svelte include package.json and .env.example. **Add** = same as init → existing. **rizzo-css.json** always written (new and existing); **--yes**, **--template**, **--install**, **--no-install**; interactive run prompts “Run install now?”. See [GETTING_STARTED](./GETTING_STARTED.md), [CLI](./CLI.md).

**Completed:** One package any framework, full and minimal templates, prepublish scripts, scaffold READMEs, CDN/docs aligned, config file, run install/add flags, accessibility docs and testing checklist. Scaffold plan: [SCAFFOLD_REPLICA_PLAN](./SCAFFOLD_REPLICA_PLAN.md).

---

## ▶️ Next task (recommended)

**Accessibility testing** — Run ARIA, keyboard, and screen reader testing on key components (Modal, Dropdown, Tabs, ThemeSwitcher, Search, etc.). Fix any issues found. Do this *before* writing the a11y best-practices doc so the docs reflect actual, tested behavior.

- **Scope:** Use [ACCESSIBILITY_TESTING.md](./ACCESSIBILITY_TESTING.md) as the checklist: keyboard nav, screen reader (NVDA/JAWS/VoiceOver), and axe (or similar) on Modal, Dropdown, Tabs, ThemeSwitcher, Search, Accordion, Toast, Settings.
- **Output:** Fix any bugs found; then add a "Best practices" section to [ACCESSIBILITY.md](./ACCESSIBILITY.md) (keyboard patterns, ARIA usage, focus order, how to test).

---

## After that (priority order)

1. **Accessibility best practices (doc)** — After testing, add "Best practices" to [ACCESSIBILITY.md](./ACCESSIBILITY.md).
2. **Contributing guide + issue templates** — CONTRIBUTING.md and GitHub issue templates (bug report, feature request).
3. **TypeScript** — Type definitions and props interfaces for components and utils.
4. **Component composition patterns** (doc) → **automated testing** (component + a11y) → **focus/contrast** (deepen a11y) → **performance** → **React/Vue** when ready.

---

## 1. Documentation (priority)

- [ ] **Best practices** *(after §4 Accessibility testing)*
  - [ ] Accessibility best practices in [ACCESSIBILITY.md](./ACCESSIBILITY.md)
  - [ ] Component composition patterns
  - [ ] Performance optimization tips

## 2. Community (priority)

- [ ] **Contributing guide** — CONTRIBUTING.md: how to run/build, where to add components, code style, PR process.
- [ ] **Issue templates** — Bug report and feature request (e.g. `.github/ISSUE_TEMPLATE/`).

## 3. Developer Experience (priority)

- [ ] **TypeScript** — Type definitions and props interfaces for components and utils.
- [ ] **Testing** — Component, accessibility, and (optionally) visual regression tests.
- [ ] **Build** — Bundle size, tree-shaking, critical CSS (if needed).
- [ ] **Storybook** *(optional)* — Interactive playground and design system showcase.

## 4. Accessibility (do before a11y best-practices doc)

- [ ] **ARIA & accessibility testing** — [ACCESSIBILITY_TESTING.md](./ACCESSIBILITY_TESTING.md) checklist: keyboard + screen reader + axe on key components; fix issues.
- [ ] **Focus** — Focus trap utilities, focus restoration, skip links.
- [ ] **Contrast** — Verify themes meet WCAG AA/AAA; contrast tooling.

## 5. Package distribution

- [ ] **Multi-framework**
  - [ ] React components (in-repo or separate later)
  - [ ] Vue components (in-repo or separate later)
- [ ] **In-repo framework routes** — Svelte done; React/Vue same pattern. See [FRAMEWORK_STRUCTURE](./FRAMEWORK_STRUCTURE.md).

## 6. Performance

- [ ] **Optimization** — Bundle analysis, unused CSS removal, critical CSS, load strategy.
- [ ] **Lazy loading** *(optional)* — Themes or component CSS on demand.

## 7. CSS variables & design system (as needed)

- [ ] Additional spacing/transform/animation variables if discovered during porting.

## 8. Browser support

- [ ] **Polyfills** — OKLCH fallbacks; modern CSS feature detection.
- [ ] **Testing** — Cross-browser, mobile, accessibility tooling.

## 9. Examples & demos

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
