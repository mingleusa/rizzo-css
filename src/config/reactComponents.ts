/**
 * Canonical list of React component slugs and metadata for docs.
 * Must match COMPONENT_SLUGS in tests/a11y/docs.spec.mjs and DOCS_NAV components.
 */
export const REACT_COMPONENT_SLUGS = [
  'accordion', 'alert', 'alert-dialog', 'aspect-ratio', 'avatar', 'back-to-top', 'badge', 'breadcrumb',
  'button', 'button-group', 'cards', 'collapsible', 'context-menu', 'copy-to-clipboard', 'dashboard',
  'docs-sidebar', 'divider', 'dropdown', 'empty', 'footer', 'font-switcher', 'forms', 'hover-card',
  'icons', 'input-group', 'kbd', 'label', 'modal', 'navbar', 'pagination', 'popover', 'progress-bar',
  'resizable', 'scroll-area', 'search', 'separator', 'settings', 'sheet', 'skeleton', 'slider', 'sound-effects',
  'spinner', 'switch', 'table', 'tabs', 'theme-switcher', 'toast', 'toggle', 'toggle-group', 'tooltip',
] as const;

export type ReactComponentSlug = (typeof REACT_COMPONENT_SLUGS)[number];

/** Slug to display title (e.g. button-group -> Button Group). */
export function slugToTitle(slug: string): string {
  return slug
    .split('-')
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ');
}

/** Slug to PascalCase component name (e.g. button-group -> ButtonGroup). */
export function slugToPascal(slug: string): string {
  return slug
    .split('-')
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join('');
}

export interface ReactComponentMeta {
  slug: ReactComponentSlug;
  title: string;
  description: string;
}

const DESCRIPTIONS: Record<string, string> = {
  accordion: 'Collapsible sections with single/multiple open and keyboard navigation',
  alert: 'Accessible alert component with variants, dismissible functionality, and auto-dismiss',
  'alert-dialog': 'Confirm/cancel dialog for destructive or important actions',
  'aspect-ratio': 'Enforces an aspect ratio on content (e.g. 16/9, 1/1)',
  avatar: 'User avatar with image or initials fallback, sizes and circle/square shape',
  'back-to-top': 'Fixed button that appears on scroll and smoothly scrolls the page back to top',
  badge: 'Small labels and tags for displaying status, categories, or counts',
  breadcrumb: 'Navigation breadcrumbs with separator customization and responsive truncation',
  button: 'Semantic button component with variants using theme variables',
  'button-group': 'Group of buttons attached together (horizontal or vertical)',
  cards: 'Flexible card component with variants, sections, and image support',
  collapsible: 'Single expand/collapse section (one trigger, one panel)',
  'context-menu': 'Right-click menu with items and separators',
  'copy-to-clipboard': 'Component for copying text values to the clipboard with visual feedback',
  dashboard: 'Layout with sidebar and main content area for app dashboards',
  'docs-sidebar': 'Documentation sidebar navigation with grouped links and active state',
  divider: 'Horizontal or vertical divider line with optional label (e.g. OR)',
  dropdown: 'Accessible dropdown menu with keyboard navigation, nested submenus, and menu items',
  empty: 'Empty state with optional icon, title, description, and action',
  footer: 'Site footer with copyright, optional site name, and optional link list (role="contentinfo")',
  'font-switcher': 'Font pair (sans + mono) dropdown with preview and keyboard navigation',
  forms: 'Comprehensive set of accessible form components with validation states',
  'hover-card': 'Floating panel that opens on hover',
  icons: 'Reusable SVG icon components (Tabler Icons and Devicons) with interactive card grid',
  'input-group': 'Input with optional prefix and suffix addons (e.g. icon, currency, domain)',
  kbd: 'Keyboard key styling for shortcuts (e.g. Ctrl+K)',
  label: 'Standalone form label; use with for/id to associate with inputs',
  modal: 'Accessible modal/dialog component with focus trapping and keyboard navigation',
  navbar: 'Responsive, accessible navigation bar with Search and Settings',
  pagination: 'Accessible pagination with prev/next, page numbers, ellipsis, and configurable URLs',
  popover: 'Floating panel triggered by a button',
  'progress-bar': 'Progress bar with variants, sizes, optional label, and indeterminate (loading) state',
  resizable: 'Resizable panel groups with drag handles (horizontal or vertical)',
  'scroll-area': 'Scrollable area with themed scrollbar (vertical or horizontal)',
  search: 'Search with Algolia integration; Cmd+K in trigger',
  separator: 'Thin separator line (horizontal or vertical)',
  settings: 'Comprehensive settings panel for theme switching and accessibility options',
  sheet: 'Slide-out panel (drawer) from top, right, bottom, or left',
  skeleton: 'Loading placeholder with shimmer animation; respects reduced motion',
  slider: 'Range slider input with themed track and fill',
  'sound-effects': 'Toggle for play sound on click (Web Audio); off by default',
  spinner: 'Accessible loading spinner with variants and sizes; respects reduced motion',
  switch: 'Accessible on/off toggle with role="switch" and keyboard support',
  table: 'Data table with column sorting and optional filtering',
  tabs: 'Accessible tabs component with keyboard navigation and ARIA tab pattern',
  'theme-switcher': 'Accessible theme switcher with theme icons and keyboard navigation',
  toast: 'Fixed position toast notifications with auto-dismiss and programmatic control',
  toggle: 'Toggle button with pressed/unpressed state',
  'toggle-group': 'Group of toggle buttons (single or multiple selection)',
  tooltip: 'Accessible tooltip component with positioning options and hover states',
};

export function getReactComponentMeta(slug: ReactComponentSlug): ReactComponentMeta {
  return {
    slug,
    title: slugToTitle(slug),
    description: DESCRIPTIONS[slug] ?? `${slugToTitle(slug)} component`,
  };
}

export const REACT_COMPONENT_META = REACT_COMPONENT_SLUGS.map((slug) =>
  getReactComponentMeta(slug)
);
