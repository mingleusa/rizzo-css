# Scaffolds: Component Showcase + Link to Docs

**Internal planning.** For user-facing setup see [GETTING_STARTED](./GETTING_STARTED.md).

**Goal:** Each framework scaffold (Vanilla, Astro, Svelte) ships with the **same UI chrome** as the main site (navbar, search, settings, theme switcher, footer) and **component showcase only**. No local docs pages — link to [rizzo-css.vercel.app](https://rizzo-css.vercel.app) for Getting started, Theming, etc. Standard HTML/CSS/JS; works in any browser.

## Status

**All three phases done.** Scripts: `prepare-astro-scaffold.js`, `prepare-vanilla-scaffold.js`, `prepare-svelte-scaffold.js`. They run in `pnpm build:package` and the package `prepublishOnly`, so the published tarball ships the latest chrome and component demos. **Create new project** at `npx rizzo-css init` delivers this full clone for the chosen framework; **Add to existing** does not.

---

## Scope

### Clone (same on all frameworks)
- **Navbar** — Logo, nav links (e.g. Home, Components, Docs), theme switcher, search trigger, settings.
- **Search** — Same search UI/behavior (scaffold can use simple client-side filter over components, or link to main site search).
- **Settings** — Same panel (theme, font size, reduce motion, high contrast, scrollbar).
- **Theme switcher** — Same look and behavior (scaffold-safe theme list; no repo-only config).
- **Footer** — Same footer.

### In the scaffold (no docs pages)
- **Home** — Hero + cards linking to each component page + a prominent “Docs” link to **https://rizzo-css.vercel.app/docs** (or /docs/getting-started, /docs/theming, etc.).
- **Components index** — List/cards of all components with links to each component page (and optionally “Docs” link to main site).
- **Per-component pages only** — One page per component (24): Accordion, Alert, Avatar, Badge, Breadcrumb, Button, Cards, Copy-to-clipboard, Divider, Dropdown, Forms, Icons, Modal, Navbar, Pagination, Progress bar, Search, Settings, Spinner, Table, Tabs, Theme switcher, Toast, Tooltip. Each page:
  - Shows the **live component demo** (same as main site).
  - Optionally a short label/heading.
  - A **“Read the docs”** (or “Docs”) link to the corresponding page on the main site (e.g. rizzo-css.vercel.app/docs/components/button).

### Not in the scaffold (link to main site)
- Getting started, Theming, Accessibility, Colors, Design system, theme showcase pages — **not** replicated. Navbar “Docs” (or similar) goes to the live docs site.

---

## Strategy: single source, three outputs

- **Source of truth:** Main site in this repo (`src/`): Layout (Layout.astro), Navbar, Search, Settings, ThemeSwitcher, footer, and the **component demo content** from `src/pages/docs/components/*.astro` (and vanilla/svelte equivalents).
- **Scaffolds:** Copy or generate from that source so the chrome is identical and component pages only show the demo + link to docs.

| Framework | Approach |
|-----------|----------|
| **Astro** | Copy from `src/`: Layout, Navbar, Search, Settings, ThemeSwitcher (scaffold-safe), footer; copy only the **component pages** (docs/components/*.astro) and a components index. Add a single “Docs” nav item that links to rizzo-css.vercel.app. No getting-started, theming, or other doc pages. |
| **Vanilla** | Same chrome (navbar, search, settings, footer) as static HTML + js/main.js. One HTML page per component (live demo only) + components index + home. Every page has a “Docs” link to the main site. |
| **Svelte** | Same layout/nav/search/settings in Svelte; routes for /, /components, /components/[slug]. Component pages show demo + link to main site docs. No docs routes. |

---

## Phased implementation (one thing at a time)

### Phase 1 — Astro scaffold: chrome + component pages only ✅
- **Script:** `scripts/prepare-astro-scaffold.js` (run via `pnpm prepare:astro-scaffold`; also runs in `build:package` and package `prepublishOnly`). It:
  - Copies Layout, Navbar, Search, Settings, ThemeSwitcher (or scaffold-safe version), footer, and any shared components needed.
  - Copies **only** `src/pages/docs/components.astro` (components index) and `src/pages/docs/components/*.astro` (24 component pages).
  - Adds a minimal **index** (home) page: hero + cards to component pages + “Docs” link to https://rizzo-css.vercel.app/docs (or /docs/getting-started).
  - Adjusts Navbar so “Docs” (or “Getting started” / “Theming”) point to the **main site**, not local routes.
  - Strips Algolia from Search (use client-side filter over component list or link to main site).
  - Removes FrameworkSwitcher (scaffold is single-framework).
- Result: Astro scaffold = same navbar, search, settings, theme, footer + home + components index + 24 component pages. No local docs pages; docs live on the site. **Works in any browser.**

### Phase 2 — Vanilla scaffold: same chrome + component HTML pages ✅
- **Script:** `scripts/prepare-vanilla-scaffold.js` (run via `pnpm prepare:vanilla-scaffold`; also runs in `build:package` and package `prepublishOnly`). Builds component showcase: `scaffold/vanilla/components/index.html` and `scaffold/vanilla/components/<slug>.html` (24 components); updates root `index.html` with links to component showcase and docs.
- Same structure: navbar, search, settings, footer on every page (static HTML + js/main.js).
- Home (index.html), components index, one HTML file per component (demo only + “Read the docs” link).
- All “Docs” links go to main site.

### Phase 3 — Svelte scaffold: same chrome + component routes ✅
- **Script:** `scripts/prepare-svelte-scaffold.js` (run via `pnpm prepare:svelte-scaffold`; also runs in `build:package` and package `prepublishOnly`). Copies `src/components/svelte` (excl. docs) to `scaffold/svelte-app/src/lib/rizzo`; copies `src/components/svelte/docs` to `scaffold/svelte-app/src/lib/rizzo-docs`; adds routes `/components`, `/components/[slug]`; home links to component showcase and docs.
- Same layout/nav/search/settings in Svelte.
- Routes: / (home), /components (index), /components/[slug] (each component). No /getting-started, /theming, etc.
- “Docs” in nav links to main site.

### Phase 4 — Keep in sync
- All three prepare scripts (`prepare-astro-scaffold.js`, `prepare-vanilla-scaffold.js`, `prepare-svelte-scaffold.js`) run as part of `build:package` and the package `prepublishOnly`, so the published package ships the latest chrome and component demos.
- When main site component demos change, re-run the script(s); doc content stays on the site only.

---

## File layout (target)

### Astro (Phase 1)
```
scaffold/astro-app/
├── src/
│   ├── layouts/
│   │   └── Layout.astro      # Navbar, Search, Settings, theme, footer
│   ├── pages/
│   │   ├── index.astro      # Home: hero + cards to components + link to docs site
│   │   └── components/
│   │       ├── index.astro  # Component list
│   │       ├── accordion.astro
│   │       ├── button.astro
│   │       └── ...          # 24 total
│   ├── components/          # Navbar, Search, Settings, etc.
│   └── ...
├── public/css/
└── ...
```
No `getting-started.astro`, `theming.astro`, or other doc pages. Nav links to “Docs” → rizzo-css.vercel.app.

### Vanilla (Phase 2)
```
scaffold/vanilla/
├── index.html               # Home + cards to components + link to docs site
├── components/
│   ├── index.html           # Component list
│   ├── accordion.html
│   ├── button.html
│   └── ...
├── css/
├── js/
│   └── main.js
├── icons/
└── README.md
```
Same navbar/search/settings/footer on every page. No getting-started or theming HTML.

### Svelte (Phase 3)
```
scaffold/svelte-app/
├── src/
│   ├── app.html
│   ├── routes/
│   │   ├── +layout.svelte    # Navbar, Search, Settings, theme, footer
│   │   ├── +page.svelte      # Home
│   │   └── components/
│   │       ├── +page.svelte  # Index
│   │       └── [slug]/
│   │           └── +page.svelte
│   └── ...
└── ...
```
No docs routes. “Docs” in nav → main site.

---

## Summary

- **Clone:** Navbar, search, settings, theme switcher, footer — same on all three.
- **In scaffold:** Home, components index, one page per component (demo + “Read the docs” link to main site).
- **Not in scaffold:** Doc content (Getting started, Theming, etc.) — link to rizzo-css.vercel.app.
- **Scripts:** All three prepare scripts run in `build:package` and `prepublishOnly`; see [PUBLISHING](./PUBLISHING.md).
