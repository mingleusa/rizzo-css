# Storybook

Rizzo CSS includes an optional **Storybook** for the **React** components. Use it as an interactive playground and design system showcase. It supports **all React components** via the **Rizzo/All Components** story (dropdown) and the component registry; individual stories exist for Button, Badge, Card, Alert, Modal, Accordion, Tabs, Spinner, Progress Bar, Settings, Search, Navbar, Dropdown, Theme Switcher, Carousel, Calendar, Range Calendar, and Blocks.

**Frameworks:** This Storybook is **React-only**. The same BEM and CSS apply to Astro, Svelte, React, Vue, and Vanilla; Astro/Svelte/Vue/Vanilla components are documented on the docs site ([rizzo-css.vercel.app](https://rizzo-css.vercel.app)). Adding Vue or Svelte Storybook is optional (see [TODO.md](./TODO.md)).

## Dependencies (framework)

Storybook runs with **React** only in this repo. All required packages are in the root `package.json`:

| Package | Purpose |
|--------|---------|
| `storybook` | CLI (`storybook dev`, `storybook build`) |
| `@storybook/react-vite` | Framework integration; brings in `@storybook/react` (no need to add it separately) |
| `@storybook/addon-docs` | Docs tab, MDX; use `import { Meta } from '@storybook/addon-docs/blocks'` in `.mdx` files |
| `@storybook/addon-a11y` | Accessibility panel |
| `@storybook/addon-links` | Link stories |
| `@storybook/addon-onboarding` | Optional welcome/guide |

**Stories:** Use `import type { Meta, StoryObj } from '@storybook/react'` in `*.stories.tsx` (that package is provided by `@storybook/react-vite`; you don’t add it separately). Config uses `@storybook/react-vite` for `StorybookConfig` and `Preview`. Vue/Svelte/Astro Storybook are not included in this repo; only React components are showcased here.

## Running Storybook

1. **Build CSS first** (Storybook uses the built stylesheet):
   ```bash
   pnpm build:css
   ```

2. **Start Storybook** (builds CSS if needed, then starts the dev server on port 6006):
   ```bash
   pnpm storybook
   ```

3. **Build static Storybook** for deployment:
   ```bash
   pnpm build-storybook
   ```
   Output is in `storybook-static/`.

## What’s included

- **Introduction** — Overview and multi-framework note (same CSS for Astro, Svelte, React, Vue, Vanilla).
- **Rizzo/All Components** — One story that lets you browse **all React components** (50+ from the registry) from a dropdown. Uses the same registry as the docs site (`src/config/reactComponents.ts`, `src/components/react/registry.tsx`).
- **Rizzo/** — Individual stories for **Button**, **Badge**, **Card**, **Carousel**, **Alert**, **Modal**, **Accordion**, **Tabs**, **Spinner**, **Progress Bar**, **Settings** (with **Guide** and Controls), **Search**, **Navbar**, **Dropdown**, **Theme Switcher**, **Calendar**, **Range Calendar**, and others. Use the **Controls** panel to tweak props.
- **Blocks/** — Pre-built layouts: **Landing Hero**, **Pricing** (cards grid), **Dashboard** (sidebar + stats), **Docs Layout** (sidebar + main), **Login**, **Signup**. Same structure and BEM as the Astro block pages at /blocks/*.
- **Rizzo CSS** is loaded in the preview so all themes and BEM styles apply.
- **Addons:** Docs, Controls, Accessibility (a11y), Links, Onboarding.

## Adding stories

Stories live in `src/stories/`. Each story file imports the React component from `src/components/react/` and defines variants. Example:

```tsx
// src/stories/Button.stories.tsx
import type { Meta, StoryObj } from '@storybook/react';
import { Button } from '../components/react/Button';

const meta: Meta<typeof Button> = {
  title: 'Rizzo/Button',
  component: Button,
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj<typeof Button>;
export const Primary: Story = { args: { variant: 'primary', children: 'Primary' } };
```

To add more components, create a new `*.stories.tsx` file and re-run `pnpm storybook`.

**MDX:** The Introduction page is `src/stories/Introduction.mdx`. In Storybook 10, MDX imports use `@storybook/addon-docs/blocks` (e.g. `import { Meta } from '@storybook/addon-docs/blocks'`).

## Testing stories

All stories are run in a headless browser via **@storybook/test-runner** (Jest + Playwright). Each story is loaded and must render without errors.

- **`pnpm run test:storybook`** — Builds Storybook, serves it on port 6006, then runs the test runner. Requires Chromium (e.g. `pnpm exec playwright install chromium`).
- **`pnpm run test:storybook:ci`** — Installs Chromium, then runs `test:storybook` (for CI or fresh environments).

**Config:** `test-runner-jest.config.js` at the repo root re-exports `test-runner-jest.config.cjs`, which extends the test-runner Jest config: it adds `modulePathIgnorePatterns` so the monorepo `packages/` and `node_modules/` are not scanned (avoids Jest haste-map naming collisions) and sets `testTimeout: 20000`.

**Preview:** The default theme in Storybook is `github-dark-classic` (set in `.storybook/preview.ts`). A11y is set to `test: 'error'`, so the test-runner fails on any color-contrast or other a11y violations; components and tokens are adjusted so all stories pass.

**Output:** You may see a11y addon messages like “Found 1 a11y violations” for some stories (e.g. Button All Variants, Alert variants, Badge All Variants, Calendar With Initial Month, Dashboard Default). These are **warnings** only; the test run still **passes** (65 suites, 124 tests). To fail on a11y issues, use the test-runner config with `a11y: { test: 'error' }` or fix the reported issues and re-run.

## Configuration

- **Main config:** `.storybook/main.ts` — stories glob (including `*.mdx`), addons (Docs, a11y, Links, Onboarding), framework (`@storybook/react-vite`). Storybook 10.
- **Preview:** `.storybook/preview.ts` — sets default `data-theme` for the preview iframe.
- **CSS:** `.storybook/preview-head.html` — loads Rizzo CSS via `<link href="/css/main.min.css">` (static dir serves `public/` at `/`).

The same BEM classes and design tokens used in the Astro docs and React/Vue/Svelte apps apply in Storybook.
