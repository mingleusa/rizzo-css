# Framework structure (Vanilla JS, Astro, Svelte)

Rizzo CSS keeps each framework’s implementation **separate but integrated** in one repo.

## Features

- **Svelte in Astro** — Svelte is integrated into this Astro project via `@astrojs/svelte`. Svelte components live in `src/components/svelte/`; docs live under `src/pages/docs/svelte/`.
- **Framework switcher** — "View as: Astro | Svelte" (with framework icons) on component/theme doc pages; config in `src/config/frameworks.ts`.
- **24 Svelte component pages** at `/docs/svelte` (19 with full Svelte examples; Icons, Navbar, Search, Settings, Theme Switcher link to Astro reference).
- **Adding React/Vue** — Same pattern: add to `frameworks.ts`, create `src/components/<framework>/` and `src/pages/docs/<framework>/`. See [Adding a new framework](#adding-a-new-framework) below.

## Folder layout

```
src/
├── components/           # Astro components (reference implementation)
│   ├── Button.astro
│   ├── Badge.astro
│   ├── FrameworkSwitcher.astro
│   ├── icons/
│   └── ...
├── components/svelte/    # Svelte components (same BEM classes, Svelte API)
│   ├── index.ts          # Re-exports all Svelte components
│   ├── Button.svelte
│   ├── Badge.svelte
│   ├── Card.svelte
│   ├── Divider.svelte
│   ├── Spinner.svelte
│   ├── ProgressBar.svelte
│   ├── Avatar.svelte
│   ├── Alert.svelte
│   ├── Breadcrumb.svelte
│   ├── FormGroup.svelte
│   ├── Input.svelte
│   ├── Checkbox.svelte
│   ├── Textarea.svelte
│   ├── Select.svelte
│   ├── Radio.svelte
│   ├── CopyToClipboard.svelte
│   ├── Tooltip.svelte
│   ├── Pagination.svelte
│   ├── Tabs.svelte
│   └── ...
├── config/               # Shared config (frameworks, themes, search)
│   ├── frameworks.ts
│   ├── themes.ts         # Theme list + icons (ThemeSwitcher, Navbar)
│   └── search.ts
├── utils/                # JS utilities (theme, storage, clipboard, toast)
├── layouts/
├── pages/
│   └── docs/
│       ├── getting-started.astro   # Astro docs (default)
│       ├── components/
│       ├── themes/
│       └── svelte/                # Svelte docs (same structure)
│           ├── index.astro
│           └── [...slug].astro    # Routes to SvelteDocPage (theming, components/*)
└── styles/               # Shared CSS (all frameworks)
```

## Rules

- **Vanilla JS** — No in-repo component folder; same BEM classes and HTML as Astro/Svelte. The CLI scaffolds from `packages/rizzo-css/scaffold/vanilla/` (example index with theme flash prevention, theme switcher including System, full Settings panel, toast, and samples). Astro and Svelte scaffolds include theme flash and toast in their layout/app.html; add Navbar and Settings from this repo for full parity.
- **Astro** docs and components live under `src/pages/docs/` and `src/components/` (no subfolder).
- **Svelte** docs live under `src/pages/docs/svelte/`; Svelte components live under `src/components/svelte/`.
- **React/Vue** (when added): same pattern — `src/pages/docs/react/`, `src/components/react/`, etc.
- **Shared**: `src/config/` (frameworks, themes, search), `src/styles/`, and shared Astro pieces (CodeBlock, Card, Layout, DocsLayout).
- **Framework switcher**: Uses `config/frameworks.ts` and shows “View as: Astro | Svelte” (with framework icons) on component/theme pages; each option links to the same path under that framework’s prefix.
- **Theme icons**: `config/themes.ts` defines theme id, label, icon, and preview colors; used by ThemeSwitcher and Navbar for consistent icons.

## Adding a new framework

1. Add the framework to `src/config/frameworks.ts` (id, label, pathPrefix).
2. Create `src/components/<framework>/` and add components that use the same BEM classes.
3. Create `src/pages/docs/<framework>/` with the same doc structure (index, components, components/*, theming, themes/*).
4. The framework switcher will pick it up automatically.
