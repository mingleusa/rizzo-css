# React, Vue, and Vite — Implementation plan

**Status:** Phase 1 (React) and Vue complete. React: `@astrojs/react`, `src/components/react/` with **all 52 components** fully implemented; each component has a doc page with live demo and **Astro | Svelte | React | Vue | Vanilla** Usage tabs. Vue: `@astrojs/vue`, `src/components/vue/` with all 52 components; doc pages at `/docs/vue/components/<slug>` with the same five framework tabs (default: Vue). Config: React — `reactComponents.ts`, `reactCodeSnippets.ts`, `astroCodeSnippets.ts`, `svelteCodeSnippets.ts`, `vanillaCodeSnippets.ts`, `reactDocPaths.ts`; Vue — `vueCodeSnippets.ts`, same snippet configs, `getVueDocStaticPaths`, `registry.js`, `VueDocDemo.vue`. Vite-based scaffolds for React and Vue are implemented (`scaffold/react/base/`, `scaffold/vue/base/`).

**Summary:**
- **Docs site:** Use **Astro integrations** (`@astrojs/react`, `@astrojs/vue`) so React and Vue components run inside the existing Astro docs site, same pattern as `@astrojs/svelte`. No separate app.
- **Scaffolds:** React and Vue **scaffolds** (CLI `init` / `add`) are **Vite-based** — the user gets a Vite + React or Vite + Vue project; Rizzo CSS and optional components are added into that project. Vite is the bundler for those scaffolds only.

---

## 1. Docs site: Astro integrations

The docs site stays a single **Astro** app. React and Vue are integrated via official Astro integrations, same as Svelte today.

| Framework | Astro integration | Component folder        | Doc routes        |
|-----------|-------------------|-------------------------|-------------------|
| Svelte    | `@astrojs/svelte` | `src/components/svelte/`| `/docs/svelte/*`  |
| React     | `@astrojs/react`  | `src/components/react/` | `/docs/react/*`   |
| Vue       | `@astrojs/vue`    | `src/components/vue/`   | `/docs/vue/*`     |

**Steps (when implementing):**
1. Add `@astrojs/react` and `@astrojs/vue` to the Astro project; register in `astro.config.mjs`.
2. Add `src/components/react/` and `src/components/vue/` with components that use the same BEM classes and shared types (`src/types/`).
3. Add `src/pages/docs/react/` and `src/pages/docs/vue/` (index, components overview, per-component pages), mirroring the Svelte doc structure.
4. Extend `src/config/frameworks.ts` with `react` and `vue` (pathPrefix `/docs/react`, `/docs/vue`) so the framework switcher shows **View as: Astro | Svelte | Vanilla | React | Vue**.
5. Extend a11y test route lists so `/docs/react/*` and `/docs/vue/*` are included in the Playwright runs.

React and Vue component pages can render live examples using the same pattern as Svelte (Astro page imports and renders the React/Vue component with `client:*` where needed).

---

## 2. Scaffolds: Vite as the bundler

**Scaffolds** are the projects the CLI generates or augments (e.g. `npx rizzo-css init --framework react`). For React and Vue, those projects are **Vite apps**.

- **React scaffold:** A **Vite + React** project (e.g. created with `npm create vite@latest my-app -- --template react-ts` or a shipped `scaffold/react/` that is a Vite + React app). Rizzo CSS, fonts, and optional React components are added into this project. **Vite** is the bundler.
- **Vue scaffold:** A **Vite + Vue** project (e.g. `npm create vite@latest my-app -- --template vue-ts` or a shipped `scaffold/vue/`). Same idea: Rizzo CSS and optional Vue components; **Vite** is the bundler.

So:
- **Astro integrations** = how we run React and Vue *inside the docs site* (Astro remains the host).
- **Vite** = the bundler used *in the React and Vue scaffolds* that users create or add to. We do not add “Vite” as a separate framework option; Vite is the build tool for the React and Vue scaffolds.

**CLI (when implementing):**
- `init --framework react`: create a Vite + React app (via create-vite or copy `scaffold/react/`), then run the same “add” logic (CSS, fonts, optional components).
- `init --framework vue`: same with Vite + Vue.
- `add --framework react` / `add --framework vue`: in an existing Vite + React or Vite + Vue project, copy Rizzo CSS, fonts, and optionally component files; update `package.json` and entry (e.g. import CSS in `main.tsx` / `main.ts`).

---

## 3. Package layout (single package)

Remain with a **single package** `rizzo-css`:

- **dist/** — Same CSS and fonts (unchanged).
- **scaffold/vanilla/**, **scaffold/astro/**, **scaffold/svelte/** — Unchanged.
- **scaffold/react/** *(new)* — Optional. Vite + React base (package.json, vite.config, index.html, src/main.tsx, Rizzo CSS wired in). Used by CLI when `init --framework react` or when copying into an existing React app.
- **scaffold/vue/** *(new)* — Optional. Vite + Vue base. Same idea for Vue.

React and Vue **component source** lives in the repo under `src/components/react/` and `src/components/vue/`; the build/copy pipeline (e.g. a script or copy-scaffold step) can copy them into `scaffold/react/` and `scaffold/vue/` for the published package, or we ship components only via the docs and let “add” copy from a different path. To be decided in implementation.

---

## 4. Component porting

- **Same BEM, same behavior:** React and Vue components render the same HTML structure and class names as Astro/Svelte; they use the same design tokens and a11y behavior (ARIA, keyboard, focus).
- **Shared types:** Use `src/types/` (Tab, MenuItem, ButtonProps, etc.) so props stay aligned across Astro, Svelte, React, and Vue.
- **Order:** Port a small core set first (e.g. Button, Card, Modal, Tabs, Dropdown, ThemeSwitcher, FormGroup, Input) to establish patterns; then expand to full parity with the 52 components.

---

## 5. Implementation phases (suggested)

| Phase | Scope |
|-------|--------|
| **1. Docs only** | Add @astrojs/react and @astrojs/vue. Implement a few React and Vue components; add `/docs/react` and `/docs/vue` routes and framework switcher. Extend a11y route list. No CLI changes. |
| **2. CLI add** | Support `add --framework react` and `add --framework vue` for existing Vite+React and Vite+Vue projects (detect, copy CSS/fonts, optional components). |
| **3. CLI init** | Support `init --framework react` and `init --framework vue`: create Vite+React or Vite+Vue app (create-vite or copy scaffold), then run add logic. |
| **4. Parity** | Port remaining components; optional scaffold variants (Landing/Docs/Dashboard/Full) for React/Vue if desired. |

---

## 6. References

- [FRAMEWORK_STRUCTURE.md](../FRAMEWORK_STRUCTURE.md) — Repo layout and “Adding a new framework.”
- [MULTI_FRAMEWORK.md](../MULTI_FRAMEWORK.md) — Multi-framework strategy; React/Vue follow the same pattern.
- [TODO.md](../TODO.md) — React and Vue are listed under Remaining / Frameworks.
- Astro: [React integration](https://docs.astro.build/en/guides/integrations-guide/react/), [Vue integration](https://docs.astro.build/en/guides/integrations-guide/vue/).
- Vite: [Scaffolding](https://vitejs.dev/guide/#scaffolding-your-first-vite-project) (create-vite).
