/**
 * Docs sidebar navigation. Paths are canonical (e.g. getting-started, components/button).
 * - Introduction & Foundations: always use /docs/ (shared; no Svelte/Vanilla-specific pages).
 * - Components: use framework pathPrefix (/docs or /docs/svelte or /docs/vanilla).
 */
export interface DocsNavLink {
  href: string;
  label: string;
  /** If true, link uses pathPrefix (framework-specific). If false, link uses /docs (shared). */
  frameworkOnly?: boolean;
}

export interface DocsNavGroup {
  label: string;
  links: DocsNavLink[];
}

/** Canonical path segments (no leading slash). Full href = `${pathPrefix}/${href}`. */
export const DOCS_NAV: DocsNavGroup[] = [
  {
    label: 'Introduction',
    links: [
      { href: 'getting-started', label: 'Getting Started' },
    ],
  },
  {
    label: 'Foundations',
    links: [
      { href: 'design-system', label: 'Design System' },
      { href: 'theming', label: 'Theming' },
      { href: 'accessibility', label: 'Accessibility' },
      { href: 'colors', label: 'Colors' },
    ],
  },
  {
    label: 'Components',
    links: [
      { href: 'components', label: 'Overview', frameworkOnly: true },
      { href: 'components/accordion', label: 'Accordion', frameworkOnly: true },
      { href: 'components/alert', label: 'Alert', frameworkOnly: true },
      { href: 'components/avatar', label: 'Avatar', frameworkOnly: true },
      { href: 'components/badge', label: 'Badge', frameworkOnly: true },
      { href: 'components/breadcrumb', label: 'Breadcrumb', frameworkOnly: true },
      { href: 'components/button', label: 'Button', frameworkOnly: true },
      { href: 'components/cards', label: 'Cards', frameworkOnly: true },
      { href: 'components/copy-to-clipboard', label: 'CopyToClipboard', frameworkOnly: true },
      { href: 'components/divider', label: 'Divider', frameworkOnly: true },
      { href: 'components/dropdown', label: 'Dropdown', frameworkOnly: true },
      { href: 'components/forms', label: 'Forms', frameworkOnly: true },
      { href: 'components/icons', label: 'Icons', frameworkOnly: true },
      { href: 'components/modal', label: 'Modal', frameworkOnly: true },
      { href: 'components/navbar', label: 'Navbar', frameworkOnly: true },
      { href: 'components/pagination', label: 'Pagination', frameworkOnly: true },
      { href: 'components/progress-bar', label: 'Progress Bar', frameworkOnly: true },
      { href: 'components/search', label: 'Search', frameworkOnly: true },
      { href: 'components/settings', label: 'Settings', frameworkOnly: true },
      { href: 'components/spinner', label: 'Spinner', frameworkOnly: true },
      { href: 'components/table', label: 'Table', frameworkOnly: true },
      { href: 'components/tabs', label: 'Tabs', frameworkOnly: true },
      { href: 'components/theme-switcher', label: 'Theme Switcher', frameworkOnly: true },
      { href: 'components/toast', label: 'Toast', frameworkOnly: true },
      { href: 'components/tooltip', label: 'Tooltip', frameworkOnly: true },
    ],
  },
];
