# Design System TODO

A focused list of **remaining** tasks for the Rizzo CSS design system, **ordered by priority** (top = do first).

---

## Current state

- **Package:** Single **rizzo-css** (v0.0.51) — CSS, CLI, and scaffolds for Vanilla, Astro, and Svelte.
- **Docs:** [GETTING_STARTED.md](./GETTING_STARTED.md), [CLI](./CLI.md), [CONTRIBUTING.md](../CONTRIBUTING.md), [ACCESSIBILITY.md](./ACCESSIBILITY.md#accessibility-features), [COLORS.md](./COLORS.md).

**Ready to ship:** Sound effects support click.wav; build and CLI copy both .mp3 and .wav; docs and site updated.

**Distribution build:** From repo root, `pnpm build:package` runs: **lint:css:fix** → **build:css** (writes `public/css/main.min.css`, `packages/rizzo-css/dist/rizzo.min.css`, `dist/fonts/`, `dist/sfx/`) → **copy-scaffold** (src/components → scaffold/astro, src/components/svelte → scaffold/svelte, src/config → scaffold/config, scaffold/utils/theme, scaffold/vanilla/icons from Astro icons) → **prepare-vanilla-scaffold** (scaffold/vanilla/components/ from template). Scaffolds **astro-core** and **svelte-core** are static in the package; the CLI copies **dist/** (CSS, fonts, sfx) and **scaffold/** content into the user’s project. See [PUBLISHING.md](./PUBLISHING.md) and [GETTING_STARTED.md – Where the CLI puts CSS and assets](./GETTING_STARTED.md#where-the-cli-puts-css-and-assets-per-framework).

---

## Recently completed

- **Sound effects (click.wav + distribution)** — Click sound now supports **click.wav** alongside click.mp3. Build and CLI copy both formats; sound script tries mp3 then wav. Sound on nav links and logo (Core scaffolds). Docs, READMEs, and site pages updated. See [SOUNDS_AND_FONTS.md](./SOUNDS_AND_FONTS.md).
- **Best practices** — [BEST_PRACTICES.md](./BEST_PRACTICES.md) and [/docs/best-practices](/docs/best-practices): component composition patterns and performance optimization tips.
- **Installation guide** — Per-framework steps (Vanilla, Astro, Svelte) in GETTING_STARTED.md and docs getting-started page.
- **TypeScript** — Central types in `src/types/` (config, utils, component props/data); theme and toast types; global `Window` types for scaffold scripts.
- Font changer (Settings), six font pairs, sound effects, Navbar Components dropdown, docs sidebar, scaffold nav, home copy button, version 0.0.51. See [CONTRIBUTING.md](../CONTRIBUTING.md) and [SOUNDS_AND_FONTS.md](./SOUNDS_AND_FONTS.md).

**Font pairs (current):** Geist, Inter + JetBrains Mono, IBM Plex Sans + Mono, Source Sans 3 + Source Code Pro, DM Sans + DM Mono, Outfit + JetBrains Mono. [PLAN_FONT_CHANGER](./planning/PLAN_FONT_CHANGER.md).

---

## Next task (recommended)

**Manual a11y testing** — Run manual keyboard and screen reader testing on key components (Modal, Dropdown, Tabs, ThemeSwitcher, Font Switcher, Settings, Search, Accordion) per [ACCESSIBILITY.md – Manual accessibility testing](./ACCESSIBILITY.md#manual-accessibility-testing). Automated tests: `pnpm test:a11y`.

---

## Roadmap (priority order)

1. **Manual a11y** (see above) → **Automated testing** (component + a11y) → **Focus/contrast** (deepen a11y) → **Performance** → **React/Vue** when ready.

---

## Remaining tasks by area

### Documentation
- [x] Best practices — [BEST_PRACTICES.md](./BEST_PRACTICES.md) (composition + performance).

### Developer experience
- [x] TypeScript — Types in `src/types/`, utils and theme/toast types.
- [ ] **Testing** — Component, accessibility, and (optionally) visual regression tests.
- [ ] **Build** — Bundle size, tree-shaking, critical CSS (if needed).
- [ ] **Storybook** *(optional)* — Interactive playground and design system showcase.

### Accessibility
- [ ] **Manual screen reader testing** — [ACCESSIBILITY.md – Manual accessibility testing](./ACCESSIBILITY.md#manual-accessibility-testing) checklist; fix any announced-label or focus issues.
- [ ] **Focus** — Focus trap utilities, focus restoration, skip links (already in place for Modal/Search/Settings).
- [ ] **Contrast** — Verify all themes meet WCAG AA.

### Package distribution
- [ ] **Multi-framework** — React components; Vue components (in-repo or separate later).
- [ ] **In-repo framework routes** — Svelte done; React/Vue same pattern. [FRAMEWORK_STRUCTURE](./FRAMEWORK_STRUCTURE.md).

### Performance
- [ ] **Optimization** — Bundle analysis, unused CSS removal, critical CSS, load strategy.
- [ ] **Lazy loading** *(optional)* — Themes or component CSS on demand.

### CSS & design system (as needed)
- [ ] Additional spacing/transform/animation variables if discovered during porting.

### Browser support
- [ ] **Polyfills** — OKLCH fallbacks; modern CSS feature detection.
- [ ] **Testing** — Cross-browser, mobile, accessibility tooling.

### Examples & demos
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
