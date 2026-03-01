# Storybook

Rizzo CSS includes an optional **Storybook** for the React components. Use it as an interactive playground and design system showcase.

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

**Stories:** Use `import type { Meta, StoryObj } from '@storybook/react'` in `*.stories.tsx` (that package is provided by `@storybook/react-vite`; you don’t add it separately). Config uses `@storybook/react-vite` for `StorybookConfig` and `Preview`. No Vue/Svelte/Astro Storybook in this repo—only React components are showcased.

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
- **Rizzo/All Components** — One story that lets you browse all **50 components** from a dropdown (uses the same registry as the docs).
- **Rizzo/** — Individual stories: **Button**, **Badge**, **Card**, **Alert**, **Modal**, **Accordion**, **Tabs**, **Spinner**, **Progress Bar**, **Settings** (with a **Guide** story and Controls for `title`), **Search**, **Navbar**, **Dropdown**, **Theme Switcher**, and more. Use the **Controls** panel to tweak props (e.g. at **Rizzo/Settings/Guide**).
- **Blocks/** — Pre-built layouts: **Landing Hero**, **Pricing** (cards grid), **Dashboard** (sidebar + stats), **Docs Layout** (sidebar + main), **Login**, **Signup**. Same structure and BEM as the Astro block pages at /blocks/*.
- **Rizzo CSS** is loaded in the preview so all themes and BEM styles apply.
- **Addons:** Docs, Controls, Accessibility (a11y), Links, Onboarding. The **Onboarding** addon may show a guide (e.g. under the app’s Settings or a welcome flow); you can complete its tasks or ignore it—all Rizzo stories and Controls work independently.

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

## Configuration

- **Main config:** `.storybook/main.ts` — stories glob (including `*.mdx`), addons (Docs, a11y, Links, Onboarding), framework (`@storybook/react-vite`). Storybook 10.
- **Preview:** `.storybook/preview.ts` — sets default `data-theme` for the preview iframe.
- **CSS:** `.storybook/preview-head.html` — loads Rizzo CSS via `<link href="/css/main.min.css">` (static dir serves `public/` at `/`).

The same BEM classes and design tokens used in the Astro docs and React/Vue/Svelte apps apply in Storybook.
