# Plan: Fonts + Font Changer in Settings

**Status: Implemented.** The design system has **font pairs** (sans + mono) and a **font changer** in Settings. Each option applies two faces: one for body/UI (sans) and one for code (mono). **Six pairs:** Geist (default), Inter + JetBrains Mono, IBM Plex Sans + Mono, Source Sans 3 + Source Code Pro, **DM Sans + DM Mono**, **Outfit + JetBrains Mono** (JetBrains Mono reused). See [Design System – Typography](./DESIGN_SYSTEM.md#typography-system) and [COMPONENTS – Settings](./COMPONENTS.md#settings).

---

## Current state

- **Font variables** (`src/styles/variables.css`):  
  `--font-family-sans` (Geist Sans + system fallbacks), `--font-family-serif` (system), `--font-family-mono` (system).  
  `--font-family` = `var(--font-family-sans)` (body/UI); code uses `--font-family-mono`.
- **Loaded webfonts**: All pair faces via `@font-face` in `src/styles/fonts.css` (Geist Sans/Mono, Inter, JetBrains Mono, IBM Plex Sans/Mono, Source Sans 3, Source Code Pro, DM Sans, DM Mono, Outfit). Variables in `variables.css`; default pair Geist.
- **Settings**: Theme (ThemeSwitcher), Font Size (slider → `--font-size-scale`, persisted as `fontSizeScale`), Font (font pair dropdown — same UI pattern as Theme: trigger button, menu with options, preview panel; persisted as `fontPair`), Accessibility. All apply to `document.documentElement` and persist in localStorage.
- **Persistence pattern**: One localStorage key per setting; restore on load (layout / vanilla flash script) and on change in Settings.

---

## Font pairs: one selection = two faces (sans + mono)

Each option in the font changer is a **pair**:
- **Sans** → used for `--font-family` (body, UI, headings).
- **Mono** → used for `--font-family-mono` (code blocks, pre, terminal-style UI).

On change, set **both** variables on `html` so the whole app gets a consistent sans + mono combo.

---

## Phase 1: Add the fonts (pairs)

**1.1 Curate 2–4 font pairs (sans + mono)**

Suggested pairs (all open license, self-hostable, good for UI + code):

| Pair id       | Sans (body/UI) | Mono (code)     | Status |
|---------------|----------------|-----------------|--------|
| `geist`       | Geist Sans     | Geist Mono      | **Shipped** (default). |
| `inter-jetbrains` | Inter       | JetBrains Mono  | **Shipped.** OFL; neutral, readable. |
| `ibm-plex`    | IBM Plex Sans  | IBM Plex Mono   | **Shipped.** OFL; designed as a family. |
| `source`      | Source Sans 3  | Source Code Pro | **Shipped.** Adobe OFL; classic, legible. |
| `dm`          | DM Sans        | DM Mono         | **Shipped.** OFL; Google Fonts; geometric, friendly. |
| `outfit-jetbrains` | Outfit   | JetBrains Mono  | **Shipped.** OFL; geometric sans; mono reused from repo. |

Optional future pairs: **Plus Jakarta Sans + Fira Code**, **Manrope + JetBrains Mono**.

**1.2 Where fonts live**

- **Repo / docs site:** `src/assets/fonts/` — one folder per family, e.g. `GeistSans/`, `GeistMono/`, `Inter/`, `JetBrainsMono/`, etc. All `@font-face` in `src/styles/fonts.css` (or one file per font, imported).
- **Package dist:** Same structure under `packages/rizzo-css/dist/fonts/` so built CSS can reference them and CLI `copyRizzoFonts` (or equivalent) copies into scaffolded projects.

**1.3 Variables and @font-face**

- **Per-face variables (recommended):** Define one variable per webfont stack, e.g.  
  `--font-family-geist-sans`, `--font-family-geist-mono`, `--font-family-inter`, `--font-family-jetbrains-mono`, etc., each with system fallbacks.
- **Pairs in config:** A list of pairs, e.g. `{ value: 'geist', label: 'Geist', sans: 'var(--font-family-geist-sans)', mono: 'var(--font-family-geist-mono)' }`. Applying a pair = set `--font-family` and `--font-family-mono` on `html` to those values.
- **Default:** Keep current default = Geist pair (`--font-family` = Geist Sans stack, `--font-family-mono` = Geist Mono stack). Variables in `:root` can point to the default pair until overridden by the font changer.

**1.4 Licenses**

- Geist: already in repo with LICENSE.
- Inter, JetBrains Mono, IBM Plex, Source Sans 3 / Source Code Pro: OFL or equivalent; document in repo and in package; self-host (no CDN dependency).

---

## Phase 2: Font changer in Settings

**2.1 Behavior**

- **UI:** New section, e.g. "Font", with a single-select (dropdown or list like Theme). Each option shows a **pair label** (e.g. "Geist", "Inter + JetBrains Mono").
- **Apply:** On change, set **two** properties on `document.documentElement`:  
  `--font-family` = chosen sans stack, `--font-family-mono` = chosen mono stack.
- **Persistence:** One localStorage key (e.g. `fontPair` or `fontFamily`), value = pair id (e.g. `"geist"`, `"inter-jetbrains"`). On load, read and apply both variables so the pair is active before first paint.

**2.2 Data shape**

- **Config list (like themes):** e.g. `src/config/fonts.ts` with an array of:
  - `value` (id for localStorage and option),
  - `label` (display name),
  - `sans` (CSS font stack or `var(--font-family-…)`),
  - `mono` (CSS font stack or `var(--font-family-…)`).
- Settings (and any flash script) use this list to render options and to apply the correct two variables when a pair is selected.

**2.3 Where to implement**

- **Settings:** Add "Font" section; on change set both `--font-family` and `--font-family-mono` on `html`, and `localStorage.setItem('fontPair', value)`.
- **Initial load:** In the same place theme and `fontSizeScale` are restored, read `fontPair`, look up sans/mono for that pair, set both variables on `html`.
- **Scaffolds:** Mirror in Astro, Svelte, and Vanilla Settings + vanilla flash script so all frameworks get the same behavior.

**2.4 Accessibility**

- Label the control (e.g. "Font"); use accessible dropdown/list. Option labels can include both faces (e.g. "Geist (Sans + Mono)") so screen reader users understand the choice.

---

## Phase 3: Package and CLI

- **Dist:** Built CSS (and any font assets) in `packages/rizzo-css/dist/` must include the new @font-face rules and font files so that when the CLI copies "CSS + fonts" into a project, the font changer options work.
- **CLI:** No change required if fonts are already under `dist/fonts/` and `copyRizzoFonts` copies that folder; if you add a new folder (e.g. `dist/fonts/GeistMono/`), ensure the build and copy step include it.
- **Docs:** Document the new Setting in the Settings component doc and in any "design system variables" doc (e.g. DESIGN_SYSTEM.md) with the new localStorage key and variable name.

---

## Suggested order

1. **Phase 1a:** Wire Geist Mono @font-face and variables; ensure Geist Sans + Geist Mono = default pair.
2. **Phase 1b:** Add 1–3 more pairs (e.g. Inter + JetBrains Mono, IBM Plex, Source) with @font-face and per-face variables.
3. **Phase 2:** Add `fontPair` config list, Settings "Font" section (apply both `--font-family` and `--font-family-mono`), persist and restore on load; update all scaffolds.
4. **Phase 3:** Confirm dist and CLI copy all font assets; update docs.

---

## Open decisions (before coding)

- **Which pairs to ship first?** Resolved: we ship 6 pairs (Geist, Inter + JetBrains Mono, IBM Plex, Source, DM Sans + DM Mono, Outfit + JetBrains Mono).
- **Naming:** localStorage key `fontPair` vs. `fontFamily`; value = pair id (e.g. `"geist"`, `"inter-jetbrains"`).
- **Default:** If no saved choice, use Geist pair (current behavior).
- **Scope:** One selection applies both sans (body/UI) and mono (code) site-wide.
