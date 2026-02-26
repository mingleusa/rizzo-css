# Framework structure (Vanilla JS, Astro, Svelte)

Rizzo CSS keeps each framework’s implementation **separate but integrated** in one repo.

## Features

- **Svelte in Astro** — Svelte is integrated into this Astro project via `@astrojs/svelte`. Svelte components live in `src/components/svelte/`; docs live under `src/pages/docs/svelte/`.
- **Framework switcher** — "View as: Astro | Svelte | Vanilla" (with framework icons) on component/theme doc pages; config in `src/config/frameworks.ts`.
- **32 Svelte component pages** at `/docs/svelte` (with full Svelte examples; Icons, Navbar, Search, Settings, Theme Switcher, Font Switcher, Sound Effects include the same live standalone example as Astro, e.g. full Search component on the Search doc page).
- **Vanilla component pages** at `/docs/vanilla/components` — one static `.astro` file per component (e.g. `accordion.astro`, `button.astro`) with real HTML, optional inline script for behavior, copyable code blocks, and a live demo. For **Dropdown**, the Vanilla page uses the same Astro Dropdown component for live examples so look and behavior match Astro and Svelte.
- **Scaffold docs** — Each scaffold folder ships **README-RIZZO.md** and **LICENSE-RIZZO** (no overwrite of project README/LICENSE). Main and package READMEs reference them. Markdown docs (GETTING_STARTED, FRAMEWORK_STRUCTURE, COMPONENTS, MULTI_FRAMEWORK, PUBLISHING, DESIGN_SYSTEM) are aligned with npm/CLI and what ships.
- **Adding React/Vue** — Same pattern: add to `frameworks.ts`, create `src/components/<framework>/` and `src/pages/docs/<framework>/`. Use **Astro integrations** (`@astrojs/react`, `@astrojs/vue`) for the docs site; React/Vue **scaffolds** will be Vite-based. See [Adding a new framework](#adding-a-new-framework) below and [planning/REACT_VUE_VITE_PLAN.md](./planning/REACT_VUE_VITE_PLAN.md).

## Repository layout (high level)

- **`docs/`** — Markdown documentation. User-facing guides (GETTING_STARTED, DESIGN_SYSTEM, THEMING, etc.) and reference (COMPONENTS, CLI) at top level; internal planning in **`docs/planning/`** (CLI_PLANNING, PLAN_FONT_CHANGER, SCAFFOLD_REPLICA_PLAN). See [docs/README.md](./README.md) for the full index.
- **`src/`** — Astro docs site and reference components (see below).
- **`packages/rizzo-css/`** — Published npm package: `bin/`, `dist/`, `scaffold/` (landing/, minimal/, vanilla/, astro/ with base + variants + components, svelte/ with base + variants + components, config/, shared/, utils/).
- **`scripts/`** — Build and copy: `build-css.js`, `copy-scaffold.js`, `prepare-vanilla-scaffold.js`, `index-docs.js`.

## Folder layout (src)

```
src/
├── components/           # Astro components (reference implementation)
│   ├── Button.astro
│   ├── Badge.astro
│   ├── FrameworkSwitcher.astro
│   ├── icons/
│   └── ...
├── components/svelte/    # Svelte components (same BEM classes, Svelte API)
│   ├── index.ts          # Re-exports Svelte components (layout components below available in scaffold)
│   ├── Accordion.svelte
│   ├── Alert.svelte
│   ├── Avatar.svelte
│   ├── Badge.svelte
│   ├── Breadcrumb.svelte
│   ├── Button.svelte
│   ├── Card.svelte
│   ├── CopyToClipboard.svelte
│   ├── Divider.svelte
│   ├── Dropdown.svelte
│   ├── FormGroup.svelte
│   ├── Input.svelte
│   ├── Checkbox.svelte
│   ├── Textarea.svelte
│   ├── Select.svelte
│   ├── Radio.svelte
│   ├── Modal.svelte
│   ├── Navbar.svelte
│   ├── Pagination.svelte
│   ├── ProgressBar.svelte
│   ├── Search.svelte
│   ├── Settings.svelte
│   ├── Spinner.svelte
│   ├── Table.svelte
│   ├── Tabs.svelte
│   ├── ThemeIcon.svelte
│   ├── ThemeSwitcher.svelte
│   ├── Toast.svelte
│   ├── Tooltip.svelte
│   ├── icons/
│   └── docs/             # Svelte doc page components
├── config/               # Shared config (frameworks, themes, search, vanilla index)
│   ├── frameworks.ts
│   ├── themes.ts         # Theme list + icons (ThemeSwitcher, Navbar)
│   ├── search.ts
│   └── vanillaSnippets.ts  # VANILLA_COMPONENT_SLUGS + VANILLA_COMPONENT_TITLES (for vanilla components index only)
├── utils/                # JS utilities (theme, storage, clipboard, toast)
├── layouts/
├── pages/
│   └── docs/
│       ├── getting-started.astro   # Astro docs (default)
│       ├── components/
│       ├── themes/
│       ├── svelte/                # Svelte docs (same structure)
│       │   ├── index.astro
│       │   └── [...slug].astro    # Routes to SvelteDocPage (theming, components/*)
│       └── vanilla/               # Vanilla docs (one .astro page per component)
│           ├── index.astro
│           ├── components.astro   # Index of vanilla components
│           └── components/       # One file per component (e.g. accordion.astro, modal.astro)
│               ├── accordion.astro
│               ├── button.astro
│               └── ...
└── styles/               # Shared CSS (all frameworks)
```

## Rules

- **Vanilla JS** — No in-repo component folder; same BEM classes and HTML as Astro/Svelte. The **npm package and CLI** ship `scaffold/vanilla/` (`index.html` with inline theme flash prevention and `js/main.js` for theme, toast, settings, tabs, modal, dropdown, accordion, search (header + input + icons + sample results), navbar mobile menu, copy-to-clipboard, back-to-top; see `scaffold/vanilla/README-RIZZO.md`). The Vanilla scaffold does **not** use the npm package from node_modules: the CLI copies the built CSS into the project as `css/rizzo.min.css` and copies `js/main.js`; users can alternatively use a CDN link for CSS. Astro and Svelte ship base scaffolds (`scaffold/astro/base/`, `scaffold/svelte/base/`) and variant overlays (`scaffold/astro/variants/`, `scaffold/svelte/variants/`) and component templates (`scaffold/astro/`, `scaffold/utils/` (theme for ThemeSwitcher), `scaffold/svelte/`) including **Navbar**, **Search**, and **Settings** (Search has full overlay UI: header, input, icons, close button, example results). For full parity with the docs site, use the CLI to add these components or copy the full versions from this repo.
- **Astro** docs and components live under `src/pages/docs/` and `src/components/` (no subfolder).
- **Svelte** docs live under `src/pages/docs/svelte/`; Svelte components live under `src/components/svelte/`.
- **React/Vue** (when added): Astro integrations (`@astrojs/react`, `@astrojs/vue`); same pattern — `src/pages/docs/react/`, `src/components/react/`, and likewise for Vue. Scaffolds for React/Vue are Vite-based (see [planning/REACT_VUE_VITE_PLAN.md](./planning/REACT_VUE_VITE_PLAN.md)).
- **Shared**: `src/config/` (frameworks, themes, search), `src/styles/`, and shared Astro pieces (CodeBlock, Card, Layout, DocsLayout, BlocksLayout). DocsLayout and BlocksLayout provide a sticky sidebar on desktop (docs: Introduction, Foundations, Components; blocks: Overview and block pages). On mobile (≤1024px) the sidebars are hidden and the main nav (hamburger) shows top-level links (Docs, Components, Blocks, Themes, Colors). Sidebar styles use the design system (see [GETTING_STARTED – Documentation layout and site nav](./GETTING_STARTED.md#documentation-layout-and-site-nav)).
- **Framework switcher**: Uses `config/frameworks.ts` and shows “View as: Astro | Svelte | Vanilla” (with framework icons) on component/theme pages; each option links to the same path under that framework’s prefix.
- **Theme icons**: `config/themes.ts` defines theme id, label, icon, and preview colors; used by ThemeSwitcher and Navbar for consistent icons. **ThemeIcon** (Astro and Svelte) renders the same icon for a theme id (`themeId`, optional `size`, optional `class`); use on theme pages or in theme cards. Vanilla: use icon SVGs and map theme id to icon via `iconKey` in themes config.

## Adding a new framework

1. Add the framework to `src/config/frameworks.ts` (id, label, pathPrefix).
2. Create `src/components/<framework>/` and add components that use the same BEM classes.
3. Create `src/pages/docs/<framework>/` with the same doc structure (index, components, components/*, theming, themes/*).
4. The framework switcher will pick it up automatically.
