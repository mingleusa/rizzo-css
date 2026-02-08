# Multi-Framework Support Strategy

This document outlines the strategy for adding Vue, React, and Svelte support to Rizzo CSS after the Astro implementation is complete.

## Overview

Rizzo CSS is built with a **CSS-first architecture**, which makes it inherently framework-agnostic. The design system uses:

- **BEM naming conventions** - Framework-independent class names
- **Semantic CSS variables** - Theme-aware styling
- **External CSS files** - No framework-specific styling
- **Astro components** - Reference implementation showing how to use the CSS

This architecture allows the CSS to work with any framework, and framework-specific components are thin wrappers around the CSS classes.

### In-repo framework routes (docs site) — Svelte implemented

Svelte is integrated into **this same Astro project**; React/Vue can follow the same pattern.

**Done:**
1. **Framework** — `@astrojs/svelte` added; Astro renders Svelte components.
2. **Svelte components** — `src/components/svelte/` with 24 components (Button, Badge, Card, Divider, Spinner, ProgressBar, Avatar, Alert, Breadcrumb, Forms, CopyToClipboard, Tooltip, Pagination, Tabs, Accordion, Dropdown, Modal, Toast, Table, etc.) using the same BEM classes as Astro.
3. **Route** — `/docs/svelte`: index, theming, components overview, and 24 component pages (19 with full Svelte examples; Icons, Navbar, Search, Settings, Theme Switcher link to Astro reference and same CSS).
4. **Framework switcher** — “View as: Astro | Svelte” (segmented control) on component/theme doc pages; links to the same path under each framework. Config in `src/config/frameworks.ts`.

**Remaining:** Svelte theme pages for full parity (optional). When adding React or Vue, repeat: same folder pattern and register in `frameworks.ts`.

## Architecture Benefits

### Current Structure

```
src/
├── styles/              # Framework-agnostic CSS
│   ├── variables.css
│   ├── components.css
│   ├── buttons.css
│   └── themes/
└── components/          # Astro reference implementation
    ├── Badge.astro
    ├── Button.astro
    └── ...
```

**Key Insight**: The CSS is already framework-agnostic. Framework components just need to:
1. Import the CSS
2. Apply the same BEM classes
3. Handle framework-specific prop/event patterns

## Distribution Strategy

### Recommended: Monorepo with Packages

```
rizzo-css/
├── packages/
│   ├── core/              # CSS + utilities (framework-agnostic)
│   │   ├── dist/
│   │   │   ├── css/
│   │   │   │   ├── rizzo.css
│   │   │   │   └── rizzo.min.css
│   │   │   └── themes/
│   │   └── src/
│   │       └── utils/      # Shared JavaScript utilities
│   ├── react/             # React components
│   │   ├── src/
│   │   │   ├── Badge.tsx
│   │   │   ├── Button.tsx
│   │   │   └── index.ts
│   │   └── package.json
│   ├── vue/               # Vue components
│   │   ├── src/
│   │   │   ├── Badge.vue
│   │   │   ├── Button.vue
│   │   │   └── index.ts
│   │   └── package.json
│   └── svelte/            # Svelte components
│       ├── src/
│       │   ├── Badge.svelte
│       │   ├── Button.svelte
│       │   └── index.ts
│       └── package.json
├── src/                   # Astro reference implementation
└── package.json           # Root workspace config
```

### Package Structure

#### Core Package (`@rizzo-css/core`)

**Purpose**: Framework-agnostic CSS and utilities

```json
{
  "name": "@rizzo-css/core",
  "version": "1.0.0",
  "main": "./dist/css/rizzo.css",
  "exports": {
    ".": "./dist/css/rizzo.css",
    "./themes/*": "./dist/themes/*.css",
    "./utils/*": "./dist/utils/*.js"
  },
  "files": ["dist/"]
}
```

**Contents**:
- Compiled CSS bundle
- Individual theme files
- Shared JavaScript utilities (theme management, focus trap, etc.)

#### Framework Packages

Each framework package:
- Depends on `@rizzo-css/core` for CSS
- Provides framework-specific component wrappers
- Uses the same CSS classes as Astro components

## Implementation Approach

### Phase 1: CSS Distribution (Foundation)

**Goal**: Package CSS for distribution

1. **Build CSS bundle**
   - Compile all CSS files into single bundle
   - Create minified version
   - Export individual theme files

2. **Create core package**
   - Set up `packages/core/`
   - Configure build process
   - Export CSS and utilities

3. **Publish to npm**
   ```bash
   npm publish @rizzo-css/core
   ```

**Usage** (works immediately):
```javascript
// Any framework
import '@rizzo-css/core';
// or
import '@rizzo-css/core/themes/github-dark-classic.css';
```

### Phase 2: JavaScript Utilities Extraction

**Goal**: Extract shared logic from Astro components

**Components with JavaScript**:
- Settings (localStorage, focus trap)
- Modal (focus trap, backdrop)
- Search (Algolia integration; Cmd+K/Ctrl+K toggles, Escape closes)
- ThemeSwitcher (theme management)
- Alert (dismiss functionality)
- CopyToClipboard (clipboard API)

**Create shared utilities**:

```typescript
// packages/core/src/utils/theme.ts
export function applyTheme(theme: string) {
  document.documentElement.setAttribute('data-theme', theme);
  localStorage.setItem('theme', theme);
}

export function getTheme(): string {
  return localStorage.getItem('theme') || 'github-dark-classic';
}

// packages/core/src/utils/focus-trap.ts
export function createFocusTrap(container: HTMLElement) {
  // Framework-agnostic focus trap logic
  // Returns { activate, deactivate } functions
}

// packages/core/src/utils/localStorage.ts
export function saveSetting(key: string, value: string) {
  localStorage.setItem(key, value);
}

export function loadSetting(key: string, defaultValue: string): string {
  return localStorage.getItem(key) || defaultValue;
}
```

### Phase 3: Framework Component Wrappers

**Goal**: Create framework-specific components using CSS classes

#### Component Pattern

All framework components follow this pattern:

1. **Import CSS** from `@rizzo-css/core`
2. **Apply BEM classes** based on props
3. **Use shared utilities** for JavaScript logic
4. **Handle framework-specific** prop/event patterns

#### Example: Badge Component

**Astro Reference** (`src/components/Badge.astro`):
```astro
---
interface Props {
  variant?: 'primary' | 'success' | 'warning' | 'error' | 'info';
  size?: 'sm' | 'md' | 'lg';
  pill?: boolean;
}

const { variant = 'primary', size = 'md', pill = false } = Astro.props;
const classes = `badge badge--${variant} badge--${size} ${pill ? 'badge--pill' : ''}`;
---

<span class={classes}>
  <slot />
</span>
```

**React** (`packages/react/src/Badge.tsx`):
```tsx
import '@rizzo-css/core';
import { cn } from '../utils'; // className utility

interface BadgeProps {
  variant?: 'primary' | 'success' | 'warning' | 'error' | 'info';
  size?: 'sm' | 'md' | 'lg';
  pill?: boolean;
  children: React.ReactNode;
  className?: string;
}

export function Badge({ 
  variant = 'primary', 
  size = 'md', 
  pill = false,
  children,
  className 
}: BadgeProps) {
  const classes = cn(
    'badge',
    `badge--${variant}`,
    `badge--${size}`,
    pill && 'badge--pill',
    className
  );
  
  return <span className={classes}>{children}</span>;
}
```

**Vue** (`packages/vue/src/Badge.vue`):
```vue
<template>
  <span :class="badgeClasses">
    <slot />
  </span>
</template>

<script setup lang="ts">
import '@rizzo-css/core';

interface Props {
  variant?: 'primary' | 'success' | 'warning' | 'error' | 'info';
  size?: 'sm' | 'md' | 'lg';
  pill?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'primary',
  size: 'md',
  pill: false
});

const badgeClasses = computed(() => [
  'badge',
  `badge--${props.variant}`,
  `badge--${props.size}`,
  props.pill && 'badge--pill'
].filter(Boolean).join(' '));
</script>
```

**Svelte** (`packages/svelte/src/Badge.svelte`):
```svelte
<script lang="ts">
  import '@rizzo-css/core';
  
  interface Props {
    variant?: 'primary' | 'success' | 'warning' | 'error' | 'info';
    size?: 'sm' | 'md' | 'lg';
    pill?: boolean;
  }
  
  let { variant = 'primary', size = 'md', pill = false }: Props = $props();
  
  $: classes = [
    'badge',
    `badge--${variant}`,
    `badge--${size}`,
    pill && 'badge--pill'
  ].filter(Boolean).join(' ');
</script>

<span class={classes}>
  <slot />
</span>
```

#### Example: Component with JavaScript (Settings)

**Shared Logic** (`packages/core/src/utils/settings.ts`):
```typescript
export interface SettingsState {
  theme: string;
  fontSizeScale: number;
  reducedMotion: boolean;
  highContrast: boolean;
  scrollbarStyle: 'thin' | 'thick' | 'hidden';
}

export function loadSettings(): SettingsState {
  return {
    theme: localStorage.getItem('theme') || 'github-dark-classic',
    fontSizeScale: parseFloat(localStorage.getItem('fontSizeScale') || '1'),
    reducedMotion: localStorage.getItem('reducedMotion') === 'true',
    highContrast: localStorage.getItem('highContrast') === 'true',
    scrollbarStyle: (localStorage.getItem('scrollbarStyle') || 'thin') as 'thin' | 'thick' | 'hidden'
  };
}

export function saveSettings(settings: Partial<SettingsState>) {
  Object.entries(settings).forEach(([key, value]) => {
    localStorage.setItem(key, String(value));
  });
}
```

**React** (`packages/react/src/Settings.tsx`):
```tsx
import '@rizzo-css/core';
import { loadSettings, saveSettings, type SettingsState } from '@rizzo-css/core/utils/settings';
import { useState, useEffect } from 'react';

export function Settings() {
  const [settings, setSettings] = useState<SettingsState>(loadSettings);
  
  const updateSetting = (key: keyof SettingsState, value: any) => {
    const newSettings = { ...settings, [key]: value };
    setSettings(newSettings);
    saveSettings({ [key]: value });
  };
  
  // React-specific rendering using same CSS classes
  return (
    <div className="settings" data-settings>
      {/* Use same BEM classes as Astro component */}
    </div>
  );
}
```

## Migration Path

### Step-by-Step Implementation

1. **Complete Astro Implementation**
   - Finish all components in Astro
   - Ensure all CSS is external (no inline styles)
   - Document all BEM class patterns

2. **Set Up Package Structure**
   - Create `packages/` directory
   - Set up monorepo (pnpm workspaces, npm workspaces, or Turborepo)
   - Configure build tools

3. **Create Core Package**
   - Extract CSS build process
   - Create `packages/core/`
   - Set up CSS bundling and minification
   - Extract JavaScript utilities

4. **Choose First Framework**
   - Start with one framework (recommend React for largest ecosystem)
   - Create `packages/react/`
   - Implement simple components first (Badge, Button)
   - Test with real projects

5. **Expand to Other Frameworks**
   - Add Vue support
   - Add Svelte support
   - Ensure API consistency across frameworks

6. **Documentation**
   - Framework-specific usage guides
   - Migration guides
   - API reference for each framework

## Package Configuration

### Root `package.json` (Monorepo)

```json
{
  "name": "rizzo-css",
  "private": true,
  "workspaces": [
    "packages/*"
  ],
  "scripts": {
    "build": "pnpm -r build",
    "dev": "pnpm -r dev",
    "publish:core": "pnpm --filter @rizzo-css/core publish",
    "publish:react": "pnpm --filter @rizzo-css/react publish"
  }
}
```

### Core Package

```json
{
  "name": "@rizzo-css/core",
  "version": "1.0.0",
  "main": "./dist/css/rizzo.css",
  "types": "./dist/index.d.ts",
  "exports": {
    ".": {
      "import": "./dist/css/rizzo.css",
      "require": "./dist/css/rizzo.css"
    },
    "./themes/*": "./dist/themes/*.css",
    "./utils/*": "./dist/utils/*.js"
  },
  "files": ["dist/"],
  "scripts": {
    "build": "node scripts/build-css.js && tsc",
    "dev": "node scripts/build-css.js --watch"
  }
}
```

### React Package

```json
{
  "name": "@rizzo-css/react",
  "version": "1.0.0",
  "main": "./dist/index.js",
  "types": "./dist/index.d.ts",
  "exports": {
    ".": "./dist/index.js",
    "./css": "@rizzo-css/core"
  },
  "peerDependencies": {
    "react": "^18.0.0"
  },
  "dependencies": {
    "@rizzo-css/core": "workspace:*"
  },
  "scripts": {
    "build": "tsc && vite build",
    "dev": "vite build --watch"
  }
}
```

## Component Mapping

### Simple Components (CSS-only)

These components are pure CSS and translate directly:

| Astro Component | Framework Equivalent |
|----------------|---------------------|
| `Badge.astro` | `<Badge>` (React/Vue/Svelte) |
| `Button.astro` | `<Button>` (React/Vue/Svelte) |
| `Card.astro` | `<Card>` (React/Vue/Svelte) |
| `Alert.astro` | `<Alert>` (React/Vue/Svelte) |

### Complex Components (JavaScript required)

These need shared utilities:

| Astro Component | Shared Utilities Needed |
|----------------|-------------------------|
| `Settings.astro` | `settings.ts`, `focus-trap.ts`, `localStorage.ts` |
| `Modal.astro` | `focus-trap.ts`, `backdrop.ts` |
| `Search.astro` | `search.ts` (Algolia client), `keyboard.ts` |
| `ThemeSwitcher.astro` | `theme.ts` |
| `CopyToClipboard.astro` | `clipboard.ts` |

## Best Practices

### 1. CSS Classes as Source of Truth

- **Never duplicate CSS** in framework components
- Always import from `@rizzo-css/core`
- Use exact same BEM class names

### 2. Prop API Consistency

- Keep prop names consistent across frameworks
- Use TypeScript interfaces for type safety
- Document all props in each framework

### 3. JavaScript Logic Sharing

- Extract reusable logic to `@rizzo-css/core/utils`
- Framework components call shared utilities
- Avoid framework-specific logic in utilities

### 4. Testing Strategy

- Test CSS independently
- Test utilities independently
- Test framework components with CSS
- Use Astro components as reference implementation

### 5. Documentation

- Document CSS classes (framework-agnostic)
- Document component APIs per framework
- Provide migration guides
- Include live examples for each framework

## Alternative: CSS-Only Distribution

If framework components aren't needed immediately, you can distribute just the CSS:

```bash
npm install rizzo-css
```

```javascript
// In any framework
import 'rizzo-css';
// or
import 'rizzo-css/themes/github-dark-classic.css';
```

Then use CSS classes directly:

```tsx
// React
<button className="btn btn-primary">Click me</button>

// Vue
<button class="btn btn-primary">Click me</button>

// Svelte
<button class="btn btn-primary">Click me</button>
```

## Timeline Recommendation

1. **Phase 1** (After Astro completion): CSS distribution package
2. **Phase 2** (Month 1): Extract JavaScript utilities
3. **Phase 3** (Month 2-3): React components
4. **Phase 4** (Month 4-5): Vue components
5. **Phase 5** (Month 6): Svelte components

## Resources

- [Monorepo Tools](https://monorepo.tools/)
- [Turborepo](https://turbo.build/repo)
- [pnpm Workspaces](https://pnpm.io/workspaces)
- [npm Workspaces](https://docs.npmjs.com/cli/v7/using-npm/workspaces)

## Notes

- Astro components remain the **reference implementation**
- CSS is the **single source of truth** for styling
- Framework components are **thin wrappers** around CSS
- JavaScript utilities are **framework-agnostic**
- All frameworks use the **same CSS classes**

This strategy ensures consistency across frameworks while leveraging the CSS-first architecture already in place.
