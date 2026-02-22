# Rizzo CSS — Documentation overview

Rizzo CSS is a design system with semantic theming, 14 themes, and accessible BEM components. Same CSS and components for **Vanilla JS**, **Astro**, and **Svelte**. Open source. CLI for init, add, and templates (Landing, Docs, Dashboard, Full).

**Live docs:** [rizzo-css.vercel.app](https://rizzo-css.vercel.app)

---

## Overview

- **[Getting Started](./GETTING_STARTED.md)** — Installation, CLI, templates (Landing | Docs | Dashboard | Full), using components.
- **[CLI](./CLI.md)** — `npx rizzo-css init | add | theme | doctor | help`; templates and component picker.
- **[rizzo-css.json](./CLI.md#config-rizzo-cssjson)** — Optional config: `targetDir`, `framework`, `packageManager`, `theme`.
- **[Design System](./DESIGN_SYSTEM.md)** — Semantic variables, typography, utilities, naming.
- **[Theming](./THEMING.md)** — 14 themes, dark/light, persistence, custom themes.
- **[Accessibility](./ACCESSIBILITY.md)** — WCAG AA, keyboard, ARIA, reduced motion, testing.

---

## Installation

- **[Getting Started — Installation](./GETTING_STARTED.md#step-1-get-the-css)** — CLI, npm, clone, or CDN; link CSS once.
- **Vanilla JS** — `npx rizzo-css init` → Vanilla → template (Landing | Docs | Dashboard | Full). Or `add` to existing. [Vanilla components](/docs/vanilla/components).
- **Astro** — `npx rizzo-css init` → Astro → template. Or `npm create astro@latest my-app && cd my-app && npx rizzo-css add`. [Components](/docs/components).
- **SvelteKit** — `npx rizzo-css init` → Svelte → template. Or `npm create svelte@latest my-app && cd my-app && npx rizzo-css add`. [Svelte components](/docs/svelte/components).

---

## Components

All components in the CLI and scaffold; same BEM/CSS for Astro, Svelte, and Vanilla. Each has a doc page with live examples and Astro | Svelte | Vanilla tabs.

### Layout & navigation

- [Navbar](/docs/components/navbar), [Docs Sidebar](/docs/components/docs-sidebar), [Dashboard](/docs/components/dashboard), [Footer](/docs/components/footer)
- [Breadcrumb](/docs/components/breadcrumb), [Back to Top](/docs/components/back-to-top)

### Forms & input

- [Button](/docs/components/button), [Forms](/docs/components/forms) (Input, Checkbox, Textarea, Select, Radio), [Switch](/docs/components/switch), [Divider](/docs/components/divider)

### Data display

- [Cards](/docs/components/cards), [Table](/docs/components/table), [Badge](/docs/components/badge), [Pagination](/docs/components/pagination)

### Feedback

- [Alert](/docs/components/alert), [Skeleton](/docs/components/skeleton), [Spinner](/docs/components/spinner), [Progress Bar](/docs/components/progress-bar), [Toast](/docs/components/toast)

### Overlay

- [Modal](/docs/components/modal), [Dropdown](/docs/components/dropdown), [Tooltip](/docs/components/tooltip)

### Disclosure

- [Accordion](/docs/components/accordion), [Tabs](/docs/components/tabs)

### Other

- [Avatar](/docs/components/avatar), [Copy to Clipboard](/docs/components/copy-to-clipboard), [Theme Switcher](/docs/components/theme-switcher), [Font Switcher](/docs/components/font-switcher), [Settings](/docs/components/settings), [Search](/docs/components/search), [Icons](/docs/components/icons), [Sound Effects](/docs/components/sound-effects)

**Blocks** (pre-built layouts): [Blocks](/blocks) — [Dashboard](/blocks/dashboard-01), [Docs layout](/blocks/docs-layout).

---

## Theming & dark mode

- **[Theming](./THEMING.md)** — Available themes, dark/light, `data-theme`, persistence, custom themes.
- **[Colors](./COLORS.md)** — Color reference, core/accent/semantic, scales.
- Theme switcher is built-in (Theme Switcher component); 14 themes with unique icons.

---

## Comparison & contributing

- **[Component inventory and gaps](./COMPONENT_COMPARISON.md)** — Component mapping, Rizzo-only components, planned gaps, framework parity.
- **[Contributing](https://github.com/mingleusa/rizzo-css/blob/main/CONTRIBUTING.md)** — Adding components, nav, a11y, search index.
