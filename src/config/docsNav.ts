import { COMPONENT_CATEGORIES } from './componentCategories';
import { slugToTitle } from './reactComponents';

/**
 * Docs sidebar navigation. Paths are canonical (e.g. getting-started, components/button).
 * - Introduction & Foundations: always use /docs/ (shared; no Svelte/Vanilla-specific pages).
 * - Components: use framework pathPrefix (/docs or /docs/svelte or /docs/vanilla). Order matches category layout (Layout, Forms & inputs, etc.).
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
  /** If true, href is used as-is (e.g. /blocks/landing-hero). Use for cross-section links. */
  absolute?: boolean;
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
        href: 'overview',
        label: 'Overview',
        sections: [
          { id: 'overview', label: 'Overview' },
          { id: 'installation', label: 'Installation' },
          { id: 'components', label: 'Components' },
          { id: 'blocks', label: 'Blocks' },
        ],
      },
      {
        href: 'showcase',
        label: 'Showcase',
        sections: [
          { id: 'components', label: 'Components' },
          { id: 'themes', label: 'Themes' },
          { id: 'blocks', label: 'Blocks' },
          { id: 'examples', label: 'Examples' },
        ],
      },
      {
        href: 'getting-started',
        label: 'Getting Started',
        sections: [
          { id: 'installation', label: 'Installation' },
          { id: 'installation-by-framework', label: 'By framework' },
          { id: 'vanilla', label: 'Vanilla' },
          { id: 'astro', label: 'Astro' },
          { id: 'svelte', label: 'Svelte' },
          { id: 'react', label: 'React' },
          { id: 'vue', label: 'Vue' },
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
        href: 'accessibility/manual-testing',
        label: 'Manual testing checklist',
        sections: [
          { id: 'overview', label: 'Overview' },
          { id: 'before-you-start', label: 'Before you start' },
          { id: 'priority-1', label: 'Priority 1 — High interaction' },
          { id: 'priority-2', label: 'Priority 2 — Forms and feedback' },
          { id: 'priority-3', label: 'Priority 3 — Navigation and layout' },
          { id: 'tools', label: 'Tools' },
          { id: 'step-by-step-example', label: 'Step-by-step example (Modal)' },
          { id: 'results-log', label: 'Results log' },
          { id: 'screen-reader-keys', label: 'Screen reader quick reference' },
          { id: 'suggested-order', label: 'Suggested order' },
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
        href: 'tokens',
        label: 'Tokens reference',
        sections: [
          { id: 'spacing', label: 'Spacing' },
          { id: 'typography', label: 'Typography' },
          { id: 'semantic-colors', label: 'Semantic colors' },
          { id: 'radius-transition', label: 'Radius & transition' },
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
      ...COMPONENT_CATEGORIES.flatMap((cat) =>
        cat.slugs.map((slug) => ({
          href: `components/${slug}` as const,
          label: slugToTitle(slug),
          frameworkOnly: true as const,
        }))
      ),
    ],
  },
  {
    label: 'Blocks',
    links: [
      { href: '/blocks', label: 'Blocks overview', absolute: true },
      { href: '/blocks/landing-hero', label: 'Landing hero', absolute: true },
      { href: '/blocks/pricing', label: 'Pricing cards', absolute: true },
      { href: '/blocks/dashboard-01', label: 'Dashboard', absolute: true },
      { href: '/blocks/docs-layout', label: 'Docs layout', absolute: true },
      { href: '/blocks/login', label: 'Login', absolute: true },
      { href: '/blocks/signup', label: 'Sign up', absolute: true },
    ],
  },
  {
    label: 'Examples',
    links: [
      { href: 'examples', label: 'Examples overview' },
      {
        href: 'examples/form-layouts',
        label: 'Form & layout examples',
        sections: [
          { id: 'login-form', label: 'Login form' },
          { id: 'contact-form', label: 'Contact form' },
          { id: 'dashboard-stats', label: 'Dashboard stats cards' },
          { id: 'card-grid', label: 'Card grid' },
          { id: 'settings-panel', label: 'Settings panel' },
        ],
      },
    ],
  },
];
