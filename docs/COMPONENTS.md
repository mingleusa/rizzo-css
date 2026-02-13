# Components

Rizzo CSS includes accessible, themeable components with **the same CSS and BEM markup** for **Vanilla JS**, Astro, and Svelte. Each component has a dedicated documentation page with live examples, usage instructions, and API details.

**Package:** Scaffolds: vanilla, astro-minimal, svelte-minimal, plus `scaffold/astro/` and `scaffold/svelte/` (25 components including ThemeSwitcher). **Create new** → **Full**, **Minimal**, or **Manual** (minimal base + component picker; list shows which components add others, e.g. "Settings (adds ThemeSwitcher)"); **Add to existing** → CSS + hand-pick components. Full and Minimal include all required dependencies (Settings→ThemeSwitcher, Toast→Alert); run `npx rizzo-css help components` for the list. [GETTING_STARTED](./GETTING_STARTED.md) for setup.

- **Vanilla JS** — Same class names and HTML structure; use `npx rizzo-css init` and choose Vanilla JS for an example with theme (System option), Settings panel, toast, and samples. For copy-paste HTML and interactive demos per component, see the [Vanilla component pages](/docs/vanilla/components).
- **Astro** — Reference implementation in this repo; use `npx rizzo-css init` and choose Astro, then optionally add components from `scaffold/astro/` via the CLI or copy from the installed package.
- **Svelte** — Component files and docs at [/docs/svelte](/docs/svelte); use the **framework switcher** ("View as: Astro | Svelte | Vanilla") on any component or theme page. Use `npx rizzo-css init` and choose Svelte, then optionally add components from `scaffold/svelte/`.

See [Getting Started](./GETTING_STARTED.md) for full setup.

## Component Pages

- [Accordion](/docs/components/accordion) - Collapsible sections with single/multiple open and keyboard navigation
- [Navbar](/docs/components/navbar) - Responsive, accessible navigation bar with default Cat logo in the brand link (optional `logo` prop for custom image)
- [Settings](/docs/components/settings) - Comprehensive settings panel
- [Theme Switcher](/docs/components/theme-switcher) - Accessible theme dropdown with Preference (System), Dark/Light groups, preview panel (current theme by default, hover to preview), and unique icon per theme
- [Theme Icon](/docs/components/theme-switcher#building-your-own-theme-switcher) - Renders the same icon as the Theme Switcher for a given theme id (Astro: `ThemeIcon.astro`, Svelte: `ThemeIcon.svelte`; props: `themeId`, optional `size`, optional `class`)
- [Button](/docs/components/button) - Semantic button component
- [Badge](/docs/components/badge) - Small labels and tags with variants and sizes
- [Breadcrumb](/docs/components/breadcrumb) - Navigation breadcrumbs with separator customization
- [Icons](/docs/components/icons) - Reusable SVG icon components
- [CopyToClipboard](/docs/components/copy-to-clipboard) - Copy to clipboard component
- [Forms](/docs/components/forms) - Form components (FormGroup, Input, Textarea, Select, Checkbox, Radio)
- [Cards](/docs/components/cards) - Flexible card component
- [Modal](/docs/components/modal) - Accessible modal/dialog component
- [Pagination](/docs/components/pagination) - Pagination navigation with prev/next, page numbers, ellipsis
- [Progress Bar](/docs/components/progress-bar) - Progress bar with variants, sizes, label, and indeterminate state
- [Spinner](/docs/components/spinner) - Accessible loading spinner with variants and sizes
- [Avatar](/docs/components/avatar) - User avatar with image or initials fallback, sizes and shapes
- [Divider](/docs/components/divider) - Horizontal or vertical divider line with optional label
- [Table](/docs/components/table) - Data table with sorting and optional filtering
- [Alert](/docs/components/alert) - Alert/notification component with auto-dismiss
- [Toast](/docs/components/toast) - Fixed position toast notifications
- [Search](/docs/components/search) - Search component with Algolia integration; trigger shows Cmd icon + K (same size as search icon); Astro, Svelte, and Vanilla docs share the same live standalone search example
- [Tooltip](/docs/components/tooltip) - Accessible tooltip component with positioning options
- [Dropdown](/docs/components/dropdown) - Accessible dropdown menu with keyboard navigation, nested submenus (up to 3 levels), menu items, separators, and custom click handlers. Svelte and Vanilla docs match Astro in look and behavior (Vanilla live examples use the same Astro Dropdown component).
- [Tabs](/docs/components/tabs) - Accessible tabs component with keyboard navigation, ARIA tab pattern, and three variants (default, pills, underline)

## Features

### Implemented Components

All of the following components are implemented with dedicated documentation pages, live examples, and full keyboard and screen reader support:

**Navigation & layout:** Accordion, Breadcrumb, Navbar, Pagination, Tabs, Divider, Table  
**Forms & input:** Forms (FormGroup, Input, Textarea, Select, Checkbox, Radio), CopyToClipboard  
**Feedback & overlay:** Alert, Modal, Toast, Tooltip, Spinner, Progress Bar  
**Display:** Button, Badge, Cards, Avatar, Icons  
**Theme & settings:** Theme Switcher, Theme Icon, Settings  
**Search:** Search (with Algolia integration). Trigger uses Cmd icon and “K” at the same size as the search icon (20px). Astro, Svelte, and Vanilla doc pages all include the same live standalone search example. Search modal UX: bottom padding and list spacer so the last result is fully visible when scrolled; compact padding for empty/loading/no-results state; close button (X) and Settings close button use bordered style and stay visible on hover; theme dropdown larger (trigger, menu, options).  
**Menus:** Dropdown (keyboard navigation, nested submenus)

(24 component doc pages on the site; the CLI/scaffold offers 25 copyable components because form controls are separate files.)

## Component Features

All components in Rizzo CSS share these core features:

- **Semantic Theming** - All components use semantic CSS variables that adapt to the selected theme
- **Accessibility** - Full keyboard navigation, ARIA attributes, and screen reader support
- **BEM Naming** - Consistent class naming convention (block__element--modifier)
- **Responsive** - Mobile-first design with responsive breakpoints
- **Theme-Aware** - Automatically adapt to all 14 available themes
- **WCAG AA Compliant** - Proper contrast ratios and accessible color combinations
- **Multi-framework** - Same BEM classes and CSS; Svelte component examples at /docs/svelte (see [Framework Structure](./FRAMEWORK_STRUCTURE.md))

## Documentation and examples by framework

Every component has documentation and examples for **Astro**, **Svelte**, and **Vanilla** (HTML + same BEM). Each component page includes **Astro | Svelte | Vanilla** code tabs with complete, copy-paste examples so you can use the block that matches your project. Some pages use multiple code blocks (e.g. setup + usage) where needed.

**Interactive components work when imported:** All interactive components (Navbar, Settings, ThemeSwitcher, Modal, Dropdown, Tabs, Accordion, Search, Alert, Toast, Table, Pagination, CopyToClipboard, etc.) run their scripts after the DOM is ready (`DOMContentLoaded` or equivalent). When you add a component via the CLI or copy from the docs, it will work without extra setup in Astro, Svelte, or Vanilla.

| Framework | Where to find it | What you get |
|-----------|------------------|--------------|
| **Astro** | [/docs/components/&lt;name&gt;](/docs/components) (e.g. [/docs/components/button](/docs/components/button)) | Full Astro usage with **Astro | Svelte | Vanilla** code tabs (complete, copy-paste examples per framework), live demos, and props. |
| **Svelte** | [/docs/svelte/components/&lt;name&gt;](/docs/svelte/components) (e.g. [/docs/svelte/components/button](/docs/svelte/components/button)) | Svelte usage and live examples. Search, Navbar, Settings, Theme Switcher, and Icons pages include the same live standalone example as Astro (e.g. full Search component on the Search doc page). |
| **Vanilla** | [/docs/vanilla/components/&lt;name&gt;](/docs/vanilla/components) (e.g. [/docs/vanilla/components/button](/docs/vanilla/components/button)) | One static `.astro` page per component with real HTML, optional inline script for interactive behavior (modal, dropdown, tabs, accordion, toast, etc.), copyable code blocks, and a live demo. Same BEM as Astro/Svelte. Component scripts in the package run on `DOMContentLoaded`. |

Use the **framework switcher** ("View as: Astro | Svelte | Vanilla") at the top of any component or theme page to switch between framework docs.

## Accordion

An accessible accordion for collapsible sections. Supports single or multiple open panels and full keyboard navigation.

### Usage

```astro
---
import Accordion from '../components/Accordion.astro';
---

<Accordion
  items={[
    { id: 'one', title: 'Section one' },
    { id: 'two', title: 'Section two' },
  ]}
>
  <div><p>Content for section one</p></div>
  <div><p>Content for section two</p></div>
</Accordion>
```

### Props

- `items` (array, required) - Array of objects with `id`, `title`, and optional `content` (HTML string)
- `id` (string, optional) - Unique identifier for the accordion
- `allowMultiple` (boolean, optional) - Allow multiple panels open at once (default: false)
- `defaultExpanded` (string | string[], optional) - ID or array of IDs to expand by default (defaults to first item)
- `class` (string, optional) - Additional CSS classes

### Features

- **Collapsible sections** - Expand/collapse with smooth transitions
- **Single or multiple open** - `allowMultiple` controls whether one or several panels can be open
- **Keyboard navigation** - Arrow Up/Down, Home, End, Enter, Space
- **ARIA** - `aria-expanded`, `aria-controls`, `region`, `aria-labelledby`
- **Content from props or slots** - Use `content` (HTML string) or pass children for panel content

See [Accordion Documentation](/docs/components/accordion) for complete details.

## Breadcrumb

An accessible breadcrumb navigation component with separator customization and responsive behavior.

### Usage

```astro
---
import Breadcrumb from '../components/Breadcrumb.astro';
---

<Breadcrumb
  items={[
    { label: 'Home', href: '/' },
    { label: 'Docs', href: '/docs' },
    { label: 'Current Page' },
  ]}
/>
```

### Props

- `items` (array, required) - Array of objects with `label` and optional `href` (omit for current page)
- `separator` (string, optional) - `'chevron'` (default), `'slash'`, `'arrow'`, or a custom character (e.g. `'>'`)
- `class` (string, optional) - Additional CSS classes

### Features

- **Navigation breadcrumbs** - Semantic `<nav aria-label="Breadcrumb">` with ordered list
- **Separator customization** - Chevron icon, slash, arrow (›), or custom character
- **Responsive** - Long labels truncate with ellipsis on small screens; current page is not truncated
- **Current page** - Last item or item without `href` gets `aria-current="page"`

See [Breadcrumb Documentation](/docs/components/breadcrumb) for complete details.

## Pagination

An accessible pagination component for navigating between pages. Supports previous/next, first/last, page numbers with ellipsis, and a configurable URL pattern.

### Usage

```astro
---
import Pagination from '../components/Pagination.astro';
---

<Pagination
  currentPage={2}
  totalPages={10}
  hrefTemplate="?page={page}"
/>
```

### Props

- `currentPage` (number, required) - Current page number (1-based)
- `totalPages` (number, required) - Total number of pages
- `hrefTemplate` (string, optional) - URL pattern with `{page}` placeholder (default: `?page={page}`)
- `showFirstLast` (boolean, optional) - Show First and Last links (default: true)
- `maxVisible` (number, optional) - Max page numbers before ellipsis (default: 5)
- `syncHash` (boolean, optional) - When true with hash-based `hrefTemplate` (e.g. `#page-{page}`), keeps URL hash and current page in sync for demos (default: false)
- `class` (string, optional) - Additional CSS classes

### Features

- **Previous / Next** - Disabled on first/last page
- **First / Last** - Optional; controlled by `showFirstLast`
- **Page numbers with ellipsis** - Current page has `aria-current="page"`; long ranges show 1 … 4 5 6 … 10
- **Configurable URLs** - `hrefTemplate` with `{page}` placeholder
- **Hash sync (demos)** - Use `syncHash` with `hrefTemplate="#page-{page}"` so the current page and URL hash stay in sync without a full reload

**Vanilla:** The [Vanilla pagination](/docs/vanilla/components/pagination) page uses the same Pagination.astro for live demos and provides copyable HTML (with First/Last, ellipsis, disabled states) matching the BEM structure.

See [Pagination Documentation](/docs/components/pagination) for complete details.

## Progress Bar

An accessible progress bar for showing completion or loading state. Supports determinate (value-based) and indeterminate (animated) modes.

### Usage

```astro
---
import ProgressBar from '../components/ProgressBar.astro';
---

<ProgressBar value={60} max={100} />
<ProgressBar value={75} max={100} showLabel />
<ProgressBar indeterminate label="Loading" />
```

### Props

- `value` (number, optional) - Current value, 0 to max (default: 0)
- `max` (number, optional) - Maximum value (default: 100)
- `variant` (string, optional) - `primary`, `success`, `warning`, `error`, `info` (default: primary)
- `size` (string, optional) - `sm`, `md`, `lg` (default: md)
- `showLabel` (boolean, optional) - Show percentage label (default: false)
- `indeterminate` (boolean, optional) - Animated loading state (default: false)
- `label` (string, optional) - Accessible label (aria-label)
- `class` (string, optional) - Additional CSS classes

### Features

- **Semantic** - `role="progressbar"` with `aria-valuenow`, `aria-valuemin`, `aria-valuemax`; indeterminate uses `aria-valuetext="Loading"`
- **Variants** - Primary, success, warning, error, info using theme variables
- **Sizes** - sm, md, lg bar heights
- **Reduced motion** - Indeterminate animation disabled when user prefers reduced motion

**Vanilla:** The [Vanilla progress bar](/docs/vanilla/components/progress-bar) page uses the same ProgressBar.astro for live demos and provides copyable HTML for basic, label, variants, sizes, indeterminate, and custom max.

See [Progress Bar Documentation](/docs/components/progress-bar) for complete details.

## Spinner

An accessible loading spinner for indicating progress when content is loading.

### Usage

```astro
---
import Spinner from '../components/Spinner.astro';
---

<Spinner />
<Spinner size="lg" variant="success" />
<Spinner label="Loading results…" />
```

### Props

- `size` (string, optional) - `sm`, `md`, `lg` (default: md)
- `variant` (string, optional) - `primary`, `success`, `warning`, `error`, `info` (default: primary)
- `label` (string, optional) - Accessible label for screen readers (default: "Loading")
- `class` (string, optional) - Additional CSS classes

### Features

- **Accessible** - `role="status"` and `aria-label` so screen readers announce loading
- **Variants** - Primary, success, warning, error, info using theme variables
- **Sizes** - sm, md, lg
- **Reduced motion** - Animation disabled when user prefers reduced motion; static segment shown instead

See [Spinner Documentation](/docs/components/spinner) for complete details.

## Avatar

A user avatar that shows a profile image when available, or initials derived from a name (or custom initials) when no image is provided.

### Usage

```astro
---
import Avatar from '../components/Avatar.astro';
---

<Avatar name="Jane Doe" />
<Avatar name="Alice" />
<Avatar initials="AB" />
<Avatar src="/photo.jpg" alt="Jane Doe" size="md" />
```

### Props

- `src` (string, optional) - Image URL; when provided, the image is shown
- `alt` (string, optional) - Alt text for the image
- `name` (string, optional) - Full name used to derive initials when no image (e.g. "Jane Doe" → "JD")
- `initials` (string, optional) - Override initials when no image; ignored if `name` is provided
- `size` (string, optional) - `sm`, `md`, `lg` (default: md)
- `shape` (string, optional) - `circle`, `square` (default: circle)
- `class` (string, optional) - Additional CSS classes

### Features

- **Accessible** - `role="img"` and `aria-label` from alt, name, or initials
- **Initials** - Derived from `name` (first letter of first and last word, or first two letters of a single word) or set via `initials`
- **Image** - Optional `src` with `loading="lazy"` and `object-fit: cover`
- **Sizes** - sm, md, lg
- **Shape** - circle (default) or square with rounded corners

See [Avatar Documentation](/docs/components/avatar) for complete details.

## Divider

A horizontal or vertical divider line for visually separating content. Optional label (e.g. "OR") for horizontal dividers.

### Usage

```astro
---
import Divider from '../components/Divider.astro';
---

<Divider />
<Divider label="OR" />
<Divider orientation="vertical" />
```

### Props

- `orientation` (string, optional) - `horizontal`, `vertical` (default: horizontal)
- `label` (string, optional) - Optional text shown in the middle (horizontal only)
- `class` (string, optional) - Additional CSS classes

### Features

- **Accessible** - `role="separator"` and `aria-orientation`; optional `aria-label` when label is set
- **Horizontal** - Full-width line; optional label in the center
- **Vertical** - Full-height line for use in flex layouts (parent needs height)
- **Theme-aware** - Uses `--border` and `--text-dim`

See [Divider Documentation](/docs/components/divider) for complete details.

## Table

A data table with column header sorting and optional filter input. Supports string and number column types for correct sort order.

### Usage

```astro
---
import Table from '../components/Table.astro';
---

<Table
  caption="Sample data"
  columns={[
    { key: 'name', label: 'Name' },
    { key: 'score', label: 'Score', type: 'number' },
  ]}
  data={[
    { name: 'Alice', score: 92 },
    { name: 'Bob', score: 87 },
  ]}
  filterable
  filterPlaceholder="Search…"
/>
```

### Props

- `columns` (array, required) - Column definitions: `{ key, label, sortable?, type? }`. `type` is `'string'` or `'number'` for sort order.
- `data` (array, required) - Row data: array of objects with keys matching column `key`.
- `caption` (string, optional) - Table caption for accessibility.
- `sortable` (boolean, optional) - Enable column header sorting (default: true).
- `filterable` (boolean, optional) - Show filter input above table (default: false).
- `filterPlaceholder` (string, optional) - Placeholder for filter input.
- `striped` (boolean, optional) - Striped rows (default: true).
- `class` (string, optional) - Additional CSS classes.

### Features

- **Accessible** - Semantic `<table>`, `<caption>`, `scope="col"`, `aria-sort` on sortable headers, keyboard (Enter/Space) to sort.
- **Sorting** - Sortable column headers use the Sort icon; click to sort ascending/descending; `type: 'number'` for numeric sort.
- **Filtering** - Optional filter input with Filter icon; rows shown/hidden by matching text in any cell.
- **Striped rows** - Optional alternating row background; row hover uses theme variables for contrast.
- **Responsive** - Table wrapper scrolls horizontally on small screens.

See [Table Documentation](/docs/components/table) for complete details.

## Navbar

A responsive, accessible navigation bar with search, settings button, and mobile menu.

### Usage

```astro
---
import Navbar from '../components/Navbar.astro';
---

<Navbar siteName="My Site" />
```

### Props

- `siteName` (string, optional) - Site name displayed in navbar (default: "Rizzo CSS")
- `logo` (string, optional) - Path to custom logo image; when omitted, the default Cat icon is shown in the brand link

### Features

- **Desktop**: Search and settings on far right, dropdown menus with smart alignment
  - **Docs dropdown** - Introduction and Foundations only (Getting Started, Design System, Theming, Accessibility, Colors). Theming is under Docs; there is no separate Themes item in the main nav.
  - **Components dropdown** - Full-width Overview link at the top, then two columns of component links
  - Smart dropdown positioning - Automatically adjusts to prevent overflow
- **Mobile**: 
  - Mobile menu toggle positioned on the left (after logo/brand)
  - Search and settings on the right: **icon-only** (no labels), same size as menu toggle for a compact, responsive bar
  - Responsive mobile menu (activates at 1024px and below) with full-width layout; when open, uses **fixed positioning** and stacks **above site content** (z-index)
  - Increased vertical spacing for better readability, especially in dropdown menus
  - Smooth hamburger-to-X animation and menu open/close transitions
  - Dropdown toggles use **buttons** (not links) for accessibility and valid markup
- Active link indicator with underline
- Dropdown menus with sub-links and keyboard navigation
- Full-width border (100% width; avoids horizontal overflow on mobile)
- Settings button opens Settings panel
- Sticky positioning at top

See [Navbar Documentation](/docs/components/navbar) for complete details.

## Settings

A comprehensive settings panel for theme switching, font size adjustment, and accessibility options.

### Usage

The Settings component is included in the Layout and opened via the Navbar settings button:

```astro
---
import Settings from '../components/Settings.astro';
---

<Settings open={false} />
```

Or open programmatically:

```javascript
window.openSettings();
```

### Features

- **Theme Switcher** - Integrated ThemeSwitcher with **System** option (follows OS light/dark), Preference + Dark/Light groups, theme icons, and active state (theme background + accent bar). Persists in localStorage as `theme` (theme id or `system`).
- **Font Size Slider** - Adjustable from 75% to 150% with filled track indicator (uses CSS gradient with `--slider-progress` variable). Persists in localStorage as `fontSizeScale`
- **Reduce Motion Toggle** - Applies `.reduced-motion` class to document root. Persists in localStorage as `reducedMotion`
- **High Contrast Toggle** - Applies `.high-contrast` class to document root. Persists in localStorage as `highContrast`
- **Scrollbar Style** - Radio button group with three options: Thin (default, 0.5rem/8px), Thick (1.5rem/24px), and Hidden. Applies classes to `html` element (`scrollbar-thick` or `scrollbar-hidden`). Persists in localStorage as `scrollbarStyle` (values: `thin`, `thick`, `hidden`)
- **Close button (X)** - Bordered style (matches search modal close), visible on hover (accent border and icon)
- Slide-in panel with overlay
- **Opening and closing animations** - Smooth slide-in from right with overlay fade (respects `prefers-reduced-motion`)
- **All settings persist in localStorage** - All preferences are automatically saved and restored on page load
- Full keyboard navigation (Escape to close)
- Focus trapping - Tab cycles within panel when open
- Accessible ARIA attributes
- Returns focus to trigger element on close
- Slider track visibility optimized for all themes
- **Mobile responsive** - Full width on mobile devices, optimized layout

### Sections

1. **Theme** - Theme switcher dropdown
2. **Font Size** - Slider with live preview (75% - 150%)
3. **Accessibility** - Reduce motion, high contrast, and scrollbar style options

### Settings Persistence

All settings options automatically persist to localStorage and are restored when the page loads:

- `theme` - Selected theme name (e.g., `github-dark-classic`, `github-light`)
- `fontSizeScale` - Font size multiplier (e.g., `1.0` for 100%, `1.25` for 125%)
- `reducedMotion` - Boolean string (`true` or `false`)
- `highContrast` - Boolean string (`true` or `false`)
- `scrollbarStyle` - Scrollbar style preference (`thin`, `thick`, or `hidden`)

See [Settings Documentation](/docs/components/settings) for complete details.

## Theme Switcher

An accessible dropdown for switching themes, used in the Settings panel and standalone on doc pages. All 14 themes are in the CSS; the switcher sets `data-theme` on `<html>` and persists the choice in `localStorage`. The preview panel (when the menu is open, on viewports >480px) shows the current theme by default and the hovered theme on hover; only the word “Preview” is fixed. To build your own switcher, use the theme utilities (`applyTheme`, `getThemeLabel`, etc.) and see [Theme Switcher](/docs/components/theme-switcher) and [Theming – Building your own theme switcher](/docs/theming#building-your-own-theme-switcher).

### Features

- **Preference + Dark/Light groups** — Preference (System), Dark themes, and Light themes with section labels; on mobile, bold labels with underlines. Each theme has a unique icon (Owl, Palette, Flame, Sunset, Zap, Shield, Heart, Sun, Cake, Lemon, Rainbow, Leaf, Cherry, Brush).
- **Preview panel** — Always visible when the menu is open (viewports >480px). Fixed **Preview** label; theme name, swatch, and accent bar show the **current** theme by default and the **hovered** theme on hover/focus. Full-height vertical divider between list and preview. Hidden on viewports ≤480px.
- **Consistent look** — All theme switchers (Settings, Astro docs, Svelte docs, Vanilla docs) use the same styling and width: fixed-width trigger (wide enough to fit the longest theme name on one line) and matching dropdown menu; label and chevron with space-between.
- Active theme displays name and icon in trigger button.
- Full keyboard navigation (Arrow keys, Enter, Space, Escape, Home, End).
- Accessible ARIA menu pattern.
- Persists selection in localStorage.

## Button Component

Semantic button component with variants using theme variables.

### Variants

- `btn-primary`, `btn-success`, `btn-warning`, `btn-error`, `btn-info`, `btn-outline`

All buttons are keyboard accessible and theme-aware.

See [Button Documentation](/docs/components/button) for complete details.

## Badge Component

Small labels and tags for displaying status, categories, or counts.

### Features

- **Variants** - `badge--primary`, `badge--success`, `badge--warning`, `badge--error`, `badge--info`
- **Sizes** - `badge--sm`, `badge--md` (default), `badge--lg`
- **Pill variant** - Fully rounded badges with `badge--pill` class
- **Text contrast** - Same as buttons: primary uses `--accent-text`; success, warning, error, and info use `--success-text-on-solid`, `--warning-text-on-solid`, `--error-text-on-solid`, `--info-text-on-solid` for theme-aware contrast on solid backgrounds
- Inline element - Can be used within text or alongside other components
- Theme-aware styling using semantic variables

### Usage

```astro
---
import Badge from '../components/Badge.astro';
---

<Badge variant="primary">New</Badge>
<Badge variant="success" size="sm">Active</Badge>
<Badge variant="error" pill>Urgent</Badge>
```

Or using classes:

```html
<span class="badge badge--primary">Primary</span>
<span class="badge badge--success badge--sm">Small Success</span>
<span class="badge badge--error badge--lg badge--pill">Large Pill Error</span>
```

See [Badge Documentation](/docs/components/badge) for complete details.

## Card Component

Flexible card component with variants, sections, and image support.

### Variants

- `default` - Standard card with border
- `elevated` - Card with shadow (lifts on hover)
- `outlined` - Transparent background with border
- `filled` - Uses main background color

### Sections

Use `card__header`, `card__body`, and `card__footer` classes for structured cards.

See [Card Documentation](/docs/components/cards) for complete examples.

## Modal Component

Accessible modal/dialog component with focus trapping and keyboard navigation.

### Features

- Focus trapping and keyboard navigation
- Backdrop overlay with blur effect
- **Three sizes**: `sm` (24rem), `md` (32rem, default), `lg` (48rem)
- Programmatic control via global functions
- Accessible ARIA attributes
- Theme-aware styling
- Responsive design (95vw on mobile)

### Size Variants

- `sm` - Small (384px) - Best for confirmation dialogs
- `md` - Medium (512px) - Default, great for most use cases
- `lg` - Large (768px) - Ideal for complex forms and detailed content

**Vanilla:** The [Vanilla modal](/docs/vanilla/components/modal) page uses the same Modal.astro for live demos (small, medium, large) and provides copyable HTML with `modal__overlay`, `modal__header`/`body`/`footer`, and size classes.

See [Modal Documentation](/docs/components/modal) for complete details and live examples.

## Search Component

A powerful search component with Algolia integration and live filtering. The trigger displays a **Cmd icon** (⌘) and **K** at the same size as the search icon (20px) for consistent visual weight. **Cmd+K** / **Ctrl+K** toggles search (opens when closed, closes when open—including when focus is in the search box). **Escape** also closes. Closes when clicking the backdrop or the X button (not when clicking inside the modal). **Astro, Svelte, and Vanilla** doc pages all include the same live standalone search example (same as navbar).

### Features

- **Full-screen overlay** - When open, a full-screen overlay covers the viewport; the search modal is centered inside it both horizontally and vertically.
- Algolia integration with client-side fallback (works without Algolia for development).
- Keyboard shortcut: Cmd+K / Ctrl+K toggles open or close; Escape closes.
- Close button (X) with bordered style, visible on hover (accent border and icon).
- Modal bottom padding and list spacer so the last result is fully visible when scrolled; compact padding for empty/loading/no-results state.
- Mobile responsive with full-width panel; live search as you type; full keyboard navigation (Arrow keys, Enter, Tab). Mutually exclusive with mobile menu.

### Keyboard shortcuts

- **Ctrl+K** / **Cmd+K** — Toggle search (open/close).
- **Escape** — Close search.
- **Arrow Down/Up** — Next/previous result.
- **Enter** — Open selected result.
- **Tab** — Move focus through results.

### Algolia setup (optional)

For production search: create an Algolia app, get Application ID and Search-Only API Key, then index your content (e.g. run `node scripts/index-docs.js` with `ALGOLIA_APP_ID`, `ALGOLIA_API_KEY`, `ALGOLIA_INDEX_NAME`). Pass credentials to the Search component via props: `algoliaAppId`, `algoliaApiKey`, `algoliaIndexName`. Use environment variables (e.g. `PUBLIC_ALGOLIA_APP_ID`) and never commit the Admin API key. See [Algolia docs](https://www.algolia.com/doc/) and the repo’s `ALGOLIA_SETUP.md` if you use this repo’s indexing script.

### Customization

Search uses semantic theme variables. Customize via CSS (e.g. `.search__panel { max-width: var(--spacing-80); }`, `.search__result-item { padding: var(--spacing-4); }`). To change the client-side index, edit the `searchIndex` array in `Search.astro`.

### Troubleshooting

If search doesn’t work: check the browser console; verify Algolia credentials and index if using Algolia; ensure CSS is loaded. If results don’t show, confirm the query is at least 2 characters and the index contains the pages.

See [Search component page](/docs/components/search) for live examples and props.

## Alert Component

An accessible alert/notification component for displaying important messages to users. Supports both static usage in Astro templates and dynamic creation via JavaScript.

### Usage

**Static Usage (Astro Component):**
```astro
---
import Alert from '../components/Alert.astro';
---

<Alert variant="success" dismissible>
  Your changes have been saved successfully!
</Alert>

<Alert variant="error">
  An error occurred. Please try again.
</Alert>

<Alert variant="warning" dismissible>
  This action cannot be undone.
</Alert>

<Alert variant="info">
  New features are available. Check them out!
</Alert>
```

**Dynamic Usage (JavaScript):**
```javascript
// Show alert programmatically
showAlert('success', 'Success! Your changes have been saved successfully.');
showAlert('error', 'Error! Something went wrong.');
showAlert('warning', 'Warning! This action cannot be undone.', true, 7000); // Auto-dismiss in 7 seconds
```

### Props

- `variant` ('success' | 'error' | 'warning' | 'info', optional) - Alert variant (default: 'info')
- `dismissible` (boolean, optional) - Whether alert can be dismissed (default: false)
- `autoDismiss` (number, optional) - Auto-dismiss duration in milliseconds. Set to `0` to disable (default: 0)
- `id` (string, optional) - Unique ID for the alert. If not provided, a random ID will be generated
- `class` (string, optional) - Additional CSS classes

### Variants

- `success` - Green/positive feedback
- `error` - Red/error messages
- `warning` - Yellow/caution messages (uses white text for contrast)
- `info` - Blue/informational messages

### Features

- Four semantic variants (success, error, warning, info)
- Optional dismissible functionality with close button
- **Auto-dismiss functionality** - Automatically dismiss after a set duration
- **Dynamic creation** - Create alerts programmatically via `showAlert()` function
- **Live examples** - Interactive examples on documentation page
- Accessible ARIA attributes (`role="alert"`, `aria-live="polite"`)
- Theme-aware styling using semantic variables
- Smooth dismiss animation (respects `prefers-reduced-motion`)
- Proper spacing between multiple alerts
- Contrast-aware text colors (white text on warning alerts for visibility)

### Accessibility

- Proper ARIA roles (`role="alert"` with `aria-live="polite"`)
- Screen reader announcements
- Keyboard accessible close button
- Focus management on dismiss
- WCAG AA contrast compliance

See [Alert Documentation](/docs/components/alert) for complete details and live examples.

## Toast Component

Fixed position toast notifications with auto-dismiss and programmatic control. Toasts are available globally via `window.showToast()` on all pages.

### Usage

**Programmatic Usage (Global Functions):**
```javascript
// Show a toast (functions available globally via window.showToast)
showToast('Success! Your changes have been saved.', {
  variant: 'success',
  position: 'top-right',
  autoDismiss: 5000
});

// Show toast with different position
showToast('Error occurred', {
  variant: 'error',
  position: 'bottom-left',
  autoDismiss: 3000
});

// Show toast without auto-dismiss
showToast('This toast stays until dismissed', {
  variant: 'info',
  autoDismiss: 0
});

// Remove all toasts
removeAllToasts();

// Remove specific toast by ID
const toastId = showToast('This will be removed', { variant: 'info' });
setTimeout(() => removeToast(toastId), 2000);
```

### Features

- **Six position options** - top/bottom + left/center/right
- **Automatic stacking** - Multiple toasts stack vertically in the same position
- **Auto-dismiss** - Customizable duration (default: 5 seconds, set to 0 to disable)
- **Programmatic control** - `showToast()`, `removeToast()`, `removeAllToasts()` available globally
- **Live examples** - Interactive examples on documentation page
- Smooth slide-in animations (respects `prefers-reduced-motion`)
- All alert variants supported (success, error, warning, info)
- Mobile responsive (full width on mobile)
- Accessible with ARIA attributes (`role="alert"`, `aria-live="polite"`)
- Theme-aware styling using semantic variables
- Contrast-aware text colors (white text on warning toasts for visibility)

### Toast Options

- `variant` (string, optional) - Alert variant: 'success', 'error', 'warning', 'info' (default: 'info')
- `position` (string, optional) - Position: 'top-right', 'top-left', 'top-center', 'bottom-right', 'bottom-left', 'bottom-center' (default: 'top-right')
- `autoDismiss` (number, optional) - Duration in milliseconds (default: 5000, set to 0 to disable)
- `dismissible` (boolean, optional) - Whether toast can be manually dismissed (default: true)

### Global Functions

Toast functions are automatically available on all pages via `Layout.astro`:
- `window.showToast(message, options)` - Show a toast notification
- `window.removeToast(toastId)` - Remove a specific toast by ID
- `window.removeAllToasts()` - Remove all visible toasts

See [Toast Documentation](/docs/components/toast) for complete details and live examples.

## Layout Components

### Container Utilities

Responsive containers with automatic centering and padding:
- `.container-sm` through `.container-2xl` (640px to 1536px max-width)
- `.container-full` - 100% width with padding
- Default `.container` - 1200px max-width

### Max-Width Utilities

Constrain element width without centering:
- Size-based: `.max-w-xs` through `.max-w-7xl` (320px to 1280px)
- Screen-based: `.max-w-screen-sm` through `.max-w-screen-2xl`

## Utility Classes

Rizzo CSS includes comprehensive utility classes for rapid development:

### Spacing & Sizing
- **Spacing Utilities** - Margin and padding utilities (m-*, p-*, mx-*, my-*, px-*, py-*)
- **Sizing Utilities** - Width, height, min/max dimensions (w-*, h-*, min-w-*, max-w-*, etc.)

### Layout
- **Display Utilities** - Display types with responsive variants (block, flex, grid, hidden, etc.)
- **Position Utilities** - Position types and z-index scale (static, relative, absolute, fixed, sticky, z-*)
- **Flexbox Utilities** - Comprehensive flexbox utilities (flex-direction, flex-wrap, justify-content, align-items, etc.)
- **Grid Utilities** - CSS Grid utilities (grid-cols-*, grid-rows-*, col-span-*, row-span-*)
- **Gap Utilities** - Gap utilities for flexbox and grid (gap-*, gap-x-*, gap-y-*)

### Styling
- **Border Utilities** - Border radius, width, and color utilities (rounded-*, border-*, border-color, etc.)
- **Shadow Utilities** - Theme-aware shadow system (shadow-sm, shadow, shadow-md, shadow-lg, shadow-xl)
- **Color Utilities** - Background and text color utilities using semantic theme variables (bg-*, text-*, text-on-*)

### Animation
- **Animation Utilities** - Transition utilities that respect prefers-reduced-motion (transition-*, duration-*, ease-*, delay-*)

See [Design System Documentation](./DESIGN_SYSTEM.md) for complete utility reference with examples.

## Icon Components

Reusable SVG icon components using Tabler Icons (MIT licensed) and Devicons (MIT licensed).

### Regular Icons (Tabler Icons)

Gear, Close, ChevronDown, Cmd, Moon, Palette, Owl, Copy, Check, Search, Sort, Filter, Sun, Flame, Heart, Leaf, Shield, Zap, Flower, Cake, Sunset, Cherry, Brush, Lemon, Circle, Rainbow, Snowflake

All regular icons accept `width`, `height`, and `class` props, use `currentColor` for theming, and automatically adapt to both light and dark themes.

### Devicons (Colored Brand Icons)

CSS3, HTML5, JavaScript, Node.js, Astro, Plaintext, Git, Bash, Svelte, React, Vue

Devicons use brand colors and are visible on both light and dark themes. They include colored gradients and paths optimized for visibility across all themes.

### Icon Documentation

The [Icon Components Documentation](/docs/components/icons) page features:
- Interactive card-based grid layout (6 cards per row on desktop)
- Click any card to copy the SVG code to clipboard
- Visual preview of all icons
- Complete usage examples

All icons are organized in `/src/components/icons/` with devicons in the `devicons/` subfolder for maintainability.

## Form Components

Comprehensive set of accessible form components with validation states.

### Components

- **FormGroup** - Wrapper with labels, help text, and error/success messages
- **Input** - Text input with validation states and sizes
- **Textarea** - Multi-line text input
- **Select** - Dropdown selection
- **Checkbox** - Checkbox input
- **Radio** - Radio button

All form components support validation states, multiple sizes, and are fully accessible. **Svelte** and **Vanilla** form docs match Astro: same sections (FormGroup, Input types/sizes/validation, Textarea, Select, Checkbox with `checkbox-group`/`checkbox-label`, Radio with `radio-group`/`radio-label`), complete form example, and BEM classes.

See [Forms Documentation](/docs/components/forms) for complete examples. Svelte: [/docs/svelte/components/forms](/docs/svelte/components/forms). Vanilla: [/docs/vanilla/components/forms](/docs/vanilla/components/forms).

## CopyToClipboard Component

Component for copying text values to the clipboard with visual feedback.

### Features

- Visual feedback (copy → checkmark icon)
- Accessible with ARIA labels
- Auto-reset after 2 seconds
- Theme-aware styling

See [CopyToClipboard Documentation](/docs/components/copy-to-clipboard) for complete details.

## CodeBlock Component

A code block component with integrated copy-to-clipboard functionality. Used throughout documentation to display code examples with a copy button.

### Features

- **Icon-only copy button** - Clean copy button that doesn't duplicate code content (20px icons for better visibility)
- **Reads from code block** - Button copies the actual code from the `<code>` element
- **Language icons** - Displays colored brand icons (Devicons) for supported languages in the header (20px icons for better visibility)
- **Responsive labels** - Language text appears next to icons on large screens (≥768px), hidden on mobile for screen readers only
- **Vertically centered alignment** - Icons and copy button are properly aligned on both desktop and mobile
- **Theme-aware styling** - Matches current theme with proper contrast
- **Accessible** - Proper ARIA labels, keyboard support, and screen reader text

### Supported Languages

The CodeBlock component displays 20px colored brand icons (Devicons) for:
- **CSS** - CSS3 brand icon
- **HTML** - HTML5 brand icon
- **JavaScript** - JavaScript brand icon
- **Node.js** - Node.js brand icon
- **Astro** - Astro brand icon (with theme-aware color adjustments)
- **Plaintext** - Plaintext icon (theme-aware)
- **Git** - Git brand icon
- **Bash/Shell** - Bash brand icon
- **Svelte** - Svelte brand icon
- **React / JSX / TSX** - React brand icon
- **Vue** - Vue brand icon

For unsupported languages, the component falls back to text labels. All icons are displayed at 20px size for better visibility and are vertically centered with the copy button.

### Usage

```astro
---
import CodeBlock from '../components/CodeBlock.astro';
---

<CodeBlock code={`const example = 'Hello World';`} language="javascript" />
<CodeBlock code={`<div>HTML example</div>`} language="html" />
<CodeBlock code={`body { color: red; }`} language="css" />
```

### Props

- `code` (string, required) - The code content to display
- `language` (string, optional) - Language identifier (e.g., "javascript", "nodejs", "astro", "css", "html", "plaintext", "git", "bash", "shell", "sh")
- `class` (string, optional) - Additional CSS classes

**Note**: All code examples throughout the documentation use this component, ensuring consistent styling and easy copying. Language icons are automatically displayed for supported languages.

## Tooltip Component

Accessible tooltip component that provides additional context when users hover over or focus on elements.

### Usage

```astro
---
import Tooltip from '../components/Tooltip.astro';
---

<div class="tooltip-wrapper" aria-describedby="my-tooltip">
  <button class="btn btn-primary">Hover me</button>
  <Tooltip id="my-tooltip" text="This is a tooltip" position="top" />
</div>
```

### Props

- `text` (string, required) - The tooltip text content
- `position` ('top' | 'bottom' | 'left' | 'right', optional) - Tooltip position (default: 'top')
- `delay` (number, optional) - Delay in milliseconds before showing (default: 0)
- `id` (string, optional) - Unique ID for the tooltip
- `class` (string, optional) - Additional CSS classes

### Features

- Four position options (top, bottom, left, right)
- Automatic arrow positioning
- Accessible with ARIA attributes (`role="tooltip"`, `aria-describedby`)
- Keyboard accessible (works with focus states)
- Theme-aware styling using semantic variables
- Smooth animations (respects `prefers-reduced-motion`)
- Automatic text wrapping for long content
- Maximum width constraint for readability

### Accessibility

- Uses `role="tooltip"` for semantic meaning
- Requires `aria-describedby` on trigger element
- Works with keyboard focus (`:focus-within`)
- Screen reader compatible

See [Tooltip Documentation](/docs/components/tooltip) for complete details and live examples.

## Dropdown Component

Accessible dropdown menu component for displaying lists of actions or options. Supports nested submenus up to 3 levels deep.

### Usage

```astro
---
import Dropdown from '../components/Dropdown.astro';
---

<Dropdown 
  trigger="Actions"
  items={[
    { label: 'Edit', value: 'edit', onClick: 'handleAction' },
    { label: 'Delete', value: 'delete', onClick: 'handleAction' },
    { separator: true },
    { label: 'Settings', href: '/settings' },
  ]}
/>
```

### Props

- `trigger` (string, required) - Text displayed on the trigger button
- `items` (MenuItem[], required) - Array of menu items
- `id` (string, optional) - Unique ID for the dropdown. Auto-generated if not provided
- `class` (string, optional) - Additional CSS classes
- `position` ('left' | 'right', optional) - Menu position relative to trigger (default: 'left')
- `align` ('start' | 'end', optional) - Menu alignment within position (default: 'start')

### MenuItem Interface

- `label` (string, required) - Display text for the menu item
- `value` (string, optional) - Value passed to onClick handler
- `href` (string, optional) - If provided, renders as a link instead of button
- `onClick` (string, optional) - Name of global function to call when clicked (must be available on window)
- `disabled` (boolean, optional) - Whether the item is disabled
- `separator` (boolean, optional) - If true, renders as a separator line
- `submenu` (MenuItem[], optional) - Array of menu items for nested submenu (supports up to 3 levels)

### Features

- Full keyboard navigation (Arrow keys, Enter, Space, Escape, Home, End, Tab)
- Nested submenus with click-to-open and keyboard support (ArrowRight/ArrowLeft)
- Supports up to 3 levels of nested menus with proper parent menu preservation
- Submenu items properly handle clicks and close parent menu
- Accessible ARIA attributes (role="menu", role="menuitem", aria-expanded, aria-haspopup, aria-label)
- All menu items have accessible names via aria-label attributes
- WCAG AA compliant touch targets (minimum 2.5rem/40px height)
- No horizontal scrolling - submenus appear directly under parent items
- Menus expand to show all items without vertical scrollbars
- Smart submenu closing - only closes siblings at the same level, preserves parent menus
- Outside click to close
- Focus management (returns to trigger on close)
- Menu items can be links or buttons
- Separator support for grouping items
- Disabled item support
- Positioning options (left/right alignment)
- Theme-aware styling using semantic variables
- Smooth animations (respects prefers-reduced-motion)
- Mobile responsive

**Svelte & Vanilla:** The [Svelte dropdown](/docs/svelte/components/dropdown) and [Vanilla dropdown](/docs/vanilla/components/dropdown) pages use the same examples and behavior as Astro. Vanilla live demos use the same Astro Dropdown component for full parity.

See [Dropdown Documentation](/docs/components/dropdown) for complete details and live examples.

## Tabs Component

An accessible tabs component for organizing content into multiple panels.

### Usage

```astro
---
import Tabs from '../components/Tabs.astro';
---

<Tabs
  tabs={[
    { id: 'overview', label: 'Overview' },
    { id: 'features', label: 'Features' },
    { id: 'pricing', label: 'Pricing' },
  ]}
>
  <div>
    <h4>Overview</h4>
    <p>Overview content here</p>
  </div>
  <div>
    <h4>Features</h4>
    <p>Features content here</p>
  </div>
  <div>
    <h4>Pricing</h4>
    <p>Pricing content here</p>
  </div>
</Tabs>
```

### Props

- `tabs` (array, required) - Array of tab objects with `id` and `label` properties
- `id` (string, optional) - Unique identifier for the tabs component
- `defaultTab` (string, optional) - ID of the tab to show by default (defaults to first tab)
- `variant` (string, optional) - Visual variant: `'default'`, `'pills'`, or `'underline'` (default: `'default'`)
- `class` (string, optional) - Additional CSS classes

### Features

- **ARIA Tab Pattern** - Full ARIA support with `role="tablist"`, `role="tab"`, `role="tabpanel"`, `aria-selected`, `aria-controls`, and `aria-labelledby`
- **Keyboard Navigation** - Arrow keys (Left/Right or Up/Down), Home, End, Enter, and Space for activation
- **Three Variants** - Default (border indicator), Pills (filled background), and Underline (thicker border)
- **Theme-Aware** - Automatically adapts to all 14 available themes
- **Responsive** - Horizontal scrolling on mobile for many tabs
- **Accessible** - WCAG AA compliant with proper focus indicators

### Keyboard Navigation

- **Arrow Right / Arrow Down** - Move to next tab
- **Arrow Left / Arrow Up** - Move to previous tab
- **Home** - Move to first tab
- **End** - Move to last tab
- **Enter / Space** - Activate focused tab
- **Tab** - Move focus to tab panel content

See [Tabs Documentation](/docs/components/tabs) for complete details.

## Utility Classes

See [Accessibility Documentation](./ACCESSIBILITY.md#utility-classes) for utility classes.
