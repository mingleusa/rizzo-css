# Design System TODO

A focused list of remaining tasks for the Rizzo CSS design system, **ordered by priority** (top = do first).

**Current state:** Single package **rizzo-css** (v0.0.35) with CSS, CLI, and scaffolds. **CLI:** `npx rizzo-css init` | `add` | `theme` | `doctor` | `help`. **Init:** framework (Vanilla / Astro / Svelte) → existing or new. **Existing** (or `add` command) → drop in CSS + hand-pick components. **New** → **Full** (everything) | **Minimal** (all interactive components) | **Manual** (same base; all interactive pre-selected), then package manager. Every scaffold includes **LICENSE-RIZZO**, **README-RIZZO.md**, and **.gitignore**; Astro/Svelte include package.json and .env.example. **Navbar** adds Search and Settings; **Settings** adds ThemeSwitcher; **Toast** adds Alert. **Add** = same as init → existing. **rizzo-css.json** always written (new and existing); **--yes**, **--template**, **--install**, **--no-install**; interactive run prompts “Run install now?”. See [GETTING_STARTED](./GETTING_STARTED.md), [CLI](./CLI.md), [CLI_FLOWS](./CLI_FLOWS.md).

**Completed:** One package any framework, full and minimal templates, prepublish scripts, scaffold READMEs, CDN/docs aligned, config file, install/add flags. **Accessibility:** Best practices doc ([ACCESSIBILITY.md](./ACCESSIBILITY.md#best-practices)); automated axe, keyboard, and ARIA tests ([ACCESSIBILITY_TESTING.md](./ACCESSIBILITY_TESTING.md#completed-automated)). **Colors:** Theme OKLCH map for all 14 themes and semantic variables ([COLORS.md](./COLORS.md#color-format-conversion)). **Community:** [CONTRIBUTING.md](../CONTRIBUTING.md) and [GitHub issue templates](../.github/ISSUE_TEMPLATE/) (bug report, feature request). Scaffold plan: [SCAFFOLD_REPLICA_PLAN](./SCAFFOLD_REPLICA_PLAN.md).

---

## ▶️ Next task (recommended)

**Manual a11y testing** — Automated axe, keyboard, and ARIA tests are in place (`pnpm test:a11y`). Run manual keyboard and screen reader testing on key components (Modal, Dropdown, Tabs, ThemeSwitcher, Search, Accordion) per [ACCESSIBILITY_TESTING.md](./ACCESSIBILITY_TESTING.md); log and fix any issues.

---

## After that (priority order)

1. ~~**Contributing guide + issue templates**~~ — Done: [CONTRIBUTING.md](../CONTRIBUTING.md), [.github/ISSUE_TEMPLATE/](../.github/ISSUE_TEMPLATE/) (bug_report.md, feature_request.md).
2. **TypeScript** — Type definitions and props interfaces for components and utils.
3. **Component composition patterns** (doc) → **automated testing** (component + a11y) → **focus/contrast** (deepen a11y) → **performance** → **React/Vue** when ready.

---

## 1. Documentation (priority)

- [ ] **Best practices**
  - [x] Accessibility best practices — In [ACCESSIBILITY.md](./ACCESSIBILITY.md#best-practices) (keyboard patterns, ARIA usage, focus order, how to test). Automated coverage in [ACCESSIBILITY_TESTING.md](./ACCESSIBILITY_TESTING.md#completed-automated).
  - [ ] Component composition patterns
  - [ ] Performance optimization tips

## 2. Community (priority)

- [x] **Contributing guide** — [CONTRIBUTING.md](../CONTRIBUTING.md): how to run/build, where to add components, code style, PR process.
- [x] **Issue templates** — Bug report and feature request in [.github/ISSUE_TEMPLATE/](../.github/ISSUE_TEMPLATE/).

## 3. Developer Experience (priority)

- [ ] **TypeScript** — Type definitions and props interfaces for components and utils.
- [ ] **Testing** — Component, accessibility, and (optionally) visual regression tests.
- [ ] **Build** — Bundle size, tree-shaking, critical CSS (if needed).
- [ ] **Storybook** *(optional)* — Interactive playground and design system showcase.

## 4. Accessibility

- [x] **Automated a11y tests** — Axe on entire main site (foundation docs, all component pages for Astro/Vanilla/Svelte, all theme pages), keyboard spec, and ARIA/roles spec; run `pnpm test:a11y`. Details: [ACCESSIBILITY_TESTING.md](./ACCESSIBILITY_TESTING.md#completed-automated).
- [ ] **Manual screen reader testing** — [ACCESSIBILITY_TESTING.md](./ACCESSIBILITY_TESTING.md) checklist: NVDA/VoiceOver/JAWS on Modal, Dropdown, Tabs, ThemeSwitcher, Search, Accordion; fix any announced-label or focus issues.
- [ ] **Focus** — Focus trap utilities, focus restoration, skip links (already in place for Modal/Search/Settings).
- [ ] **Contrast** — Themes use `--accent-fg` / `--accent-text` etc.; verify all themes meet WCAG AA.

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
