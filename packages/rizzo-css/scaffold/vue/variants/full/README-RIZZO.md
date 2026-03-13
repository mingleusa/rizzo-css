# Rizzo CSS — Vue Full Template

This project was generated with the **Full** template (Vue + Vue Router). It mirrors the structure of the Rizzo docs site: home, docs (overview, getting started, components), blocks, and themes.

## Project structure

- **Home** (`/`) — Hero, features, add-command, doc cards.
- **Docs** (`/docs`, `/docs/overview`, `/docs/getting-started`, `/docs/components`) — Docs layout with sidebar (Introduction, Components, Blocks, Themes). Uses `DocsSidebar` with `DOCS_NAV` from `src/config/docsNav.ts`.
- **Blocks** (`/blocks`) — Blocks layout with sidebar and index of block links (main site).
- **Themes** (`/themes`) — Theme picker with ThemeSwitcher, Dark/Light theme cards (Card + ThemeIcon), and code snippet.

Config used by the full template:

- `src/config/docsNav.ts` — Sidebar nav (matches main site structure).
- `src/config/componentCategories.ts` — Component categories for the components page.

## Scripts

- `pnpm dev` — Start dev server (Vite).
- `pnpm build` — Build for production.
- `pnpm preview` — Preview production build.

## Adding components

From the project root:

```bash
npx rizzo-css add <ComponentName>
```

Example: `npx rizzo-css add Modal` adds the Modal component to `src/components/rizzo`.

## Settings panel

The Settings panel (gear in the navbar) includes Theme (ThemeSwitcher), Font Size, Font (FontSwitcher), Sound (SoundEffects), and Accessibility options. Preferences are stored in `localStorage`.
