/**
 * Docs sidebar navigation. Paths are canonical (e.g. getting-started, components/button).
 * - Introduction & Foundations: always use /docs/ (shared; no Svelte/Vanilla-specific pages).
 * - Components: use framework pathPrefix (/docs or /docs/svelte or /docs/vanilla).
 * - Optional sections: for long docs, sidebar shows subsection links (href#id) with smooth scroll.
 */
export interface DocsNavSection {
  id: string;
  label: string;
}

export interface DocsNavLink {
  href: string;
  label: string;
  /** If true, link uses pathPrefix (framework-specific). If false, link uses /docs (shared). */
  frameworkOnly?: boolean;
  /** Subsection anchors for this page (sidebar only; links use page#id, smooth scroll). */
  sections?: DocsNavSection[];
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
      {
        href: 'getting-started',
        label: 'Getting Started',
        sections: [
          { id: 'installation', label: 'Installation' },
          { id: 'project-structure', label: 'Project Structure' },
          { id: 'development', label: 'Development' },
          { id: 'building', label: 'Building' },
          { id: 'using-components', label: 'Using Components' },
          { id: 'using-themes', label: 'Using Themes' },
          { id: 'css-architecture', label: 'CSS Architecture' },
        ],
      },
    ],
  },
  {
    label: 'Foundations',
    links: [
      {
        href: 'design-system',
        label: 'Design System',
        sections: [
          { id: 'semantic-variables', label: 'Semantic Variables' },
          { id: 'typography-system', label: 'Typography System' },
          { id: 'shadow-and-overlay-variables', label: 'Shadow and Overlay Variables' },
          { id: 'selection-color', label: 'Selection Color' },
          { id: 'color-format', label: 'Color Format' },
          { id: 'using-variables', label: 'Using Variables' },
          { id: 'naming-convention', label: 'Naming Convention' },
          { id: 'spacing-utilities', label: 'Spacing Utilities' },
          { id: 'container-utilities', label: 'Container Utilities' },
          { id: 'max-width-utilities', label: 'Max-Width Utilities' },
          { id: 'sizing-utilities', label: 'Sizing Utilities' },
          { id: 'media-queries', label: 'Media Queries' },
          { id: 'display-utilities', label: 'Display Utilities' },
          { id: 'position-utilities', label: 'Position Utilities' },
          { id: 'border-utilities', label: 'Border Utilities' },
          { id: 'flexbox-utilities', label: 'Flexbox Utilities' },
          { id: 'grid-utilities', label: 'Grid Utilities' },
          { id: 'gap-utilities', label: 'Gap Utilities' },
          { id: 'animation-transition-utilities', label: 'Animation & Transition Utilities' },
          { id: 'best-practices', label: 'Best Practices' },
        ],
      },
      {
        href: 'theming',
        label: 'Theming',
        sections: [
          { id: 'available-themes', label: 'Available Themes' },
          { id: 'dark-themes', label: 'Dark Themes' },
          { id: 'light-themes', label: 'Light Themes' },
          { id: 'using-themes', label: 'Using Themes' },
          { id: 'theme-file-structure', label: 'Theme File Structure' },
          { id: 'creating-custom-themes', label: 'Creating Custom Themes' },
          { id: 'color-format', label: 'Color Format' },
          { id: 'theme-persistence', label: 'Theme Persistence' },
        ],
      },
      {
        href: 'accessibility',
        label: 'Accessibility',
        sections: [
          { id: 'accessibility-features', label: 'Accessibility Features' },
          { id: 'utility-classes', label: 'Utility Classes' },
          { id: 'focus-styles', label: 'Focus Styles' },
          { id: 'form-accessibility', label: 'Form Accessibility' },
          { id: 'responsive-design', label: 'Responsive Design' },
          { id: 'color-contrast', label: 'Color Contrast' },
          { id: 'reduced-motion', label: 'Reduced Motion' },
          { id: 'high-contrast-mode', label: 'High Contrast Mode' },
          { id: 'best-practices', label: 'Best Practices' },
          { id: 'testing', label: 'Testing' },
          { id: 'resources', label: 'Resources' },
        ],
      },
      {
        href: 'colors',
        label: 'Colors',
        sections: [
          { id: 'color-reference', label: 'Color Reference' },
          { id: 'core-colors', label: 'Core Colors' },
          { id: 'accent-colors', label: 'Accent Colors' },
          { id: 'semantic-colors', label: 'Semantic Colors' },
          { id: 'text-on-solid', label: 'Text on solid' },
          { id: 'color-scales', label: 'Color scales' },
        ],
      },
      {
        href: 'best-practices',
        label: 'Best Practices',
        sections: [
          { id: 'component-composition-patterns', label: 'Component Composition Patterns' },
          { id: 'performance-optimization-tips', label: 'Performance Optimization Tips' },
        ],
      },
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
      { href: 'components/copy-to-clipboard', label: 'Copy to Clipboard', frameworkOnly: true },
      { href: 'components/docs-sidebar', label: 'Docs Sidebar', frameworkOnly: true },
      { href: 'components/divider', label: 'Divider', frameworkOnly: true },
      { href: 'components/dropdown', label: 'Dropdown', frameworkOnly: true },
      { href: 'components/footer', label: 'Footer', frameworkOnly: true },
      { href: 'components/font-switcher', label: 'Font Switcher', frameworkOnly: true },
      { href: 'components/forms', label: 'Forms', frameworkOnly: true },
      { href: 'components/icons', label: 'Icons', frameworkOnly: true },
      { href: 'components/modal', label: 'Modal', frameworkOnly: true },
      { href: 'components/navbar', label: 'Navbar', frameworkOnly: true },
      { href: 'components/pagination', label: 'Pagination', frameworkOnly: true },
      { href: 'components/progress-bar', label: 'Progress Bar', frameworkOnly: true },
      { href: 'components/search', label: 'Search', frameworkOnly: true },
      { href: 'components/settings', label: 'Settings', frameworkOnly: true },
      { href: 'components/sound-effects', label: 'Sound Effects', frameworkOnly: true },
      { href: 'components/spinner', label: 'Spinner', frameworkOnly: true },
      { href: 'components/table', label: 'Table', frameworkOnly: true },
      { href: 'components/tabs', label: 'Tabs', frameworkOnly: true },
      { href: 'components/theme-switcher', label: 'Theme Switcher', frameworkOnly: true },
      { href: 'components/toast', label: 'Toast', frameworkOnly: true },
      { href: 'components/tooltip', label: 'Tooltip', frameworkOnly: true },
    ],
  },
];
