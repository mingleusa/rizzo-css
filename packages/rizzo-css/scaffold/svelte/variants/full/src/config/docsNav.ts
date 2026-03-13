/**
 * Docs sidebar nav for full template. Matches https://rizzo-css.vercel.app exactly.
 * Local routes: /docs/overview, /docs/getting-started, /docs/components. All other links point to the main site.
 */
import { COMPONENT_CATEGORIES } from './componentCategories';

const SITE_BASE = 'https://rizzo-css.vercel.app';
const FRAMEWORK_PREFIX = '/docs/svelte';

function slugToTitle(slug: string): string {
  return slug.split('-').map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
}

export interface DocsNavSection {
  id: string;
  label: string;
}

export interface DocsNavLink {
  href: string;
  label: string;
  frameworkOnly?: boolean;
  absolute?: boolean;
  sections?: DocsNavSection[];
  /** When true, open in new tab (external to main site). */
  external?: boolean;
}

export interface DocsNavGroup {
  label: string;
  links: DocsNavLink[];
}

export const DOCS_NAV: DocsNavGroup[] = [
  {
    label: 'Introduction',
    links: [
      {
        href: '/docs/overview',
        label: 'Overview',
        absolute: true,
        sections: [
          { id: 'overview', label: 'Overview' },
          { id: 'installation', label: 'Installation' },
          { id: 'components', label: 'Components' },
          { id: 'blocks', label: 'Blocks' },
        ],
      },
      {
        href: `${SITE_BASE}/docs/showcase`,
        label: 'Showcase',
        absolute: true,
        external: true,
        sections: [
          { id: 'components', label: 'Components' },
          { id: 'themes', label: 'Themes' },
          { id: 'blocks', label: 'Blocks' },
          { id: 'examples', label: 'Examples' },
        ],
      },
      {
        href: '/docs/getting-started',
        label: 'Getting Started',
        absolute: true,
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
        href: `${SITE_BASE}/docs/design-system`,
        label: 'Design System',
        absolute: true,
        external: true,
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
        href: `${SITE_BASE}/docs/theming`,
        label: 'Theming',
        absolute: true,
        external: true,
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
        href: `${SITE_BASE}/docs/accessibility`,
        label: 'Accessibility',
        absolute: true,
        external: true,
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
        href: `${SITE_BASE}/docs/accessibility/manual-testing`,
        label: 'Manual testing checklist',
        absolute: true,
        external: true,
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
        href: `${SITE_BASE}/docs/colors`,
        label: 'Colors',
        absolute: true,
        external: true,
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
        href: `${SITE_BASE}/docs/tokens`,
        label: 'Tokens reference',
        absolute: true,
        external: true,
        sections: [
          { id: 'spacing', label: 'Spacing' },
          { id: 'typography', label: 'Typography' },
          { id: 'semantic-colors', label: 'Semantic colors' },
          { id: 'radius-transition', label: 'Radius & transition' },
        ],
      },
      {
        href: `${SITE_BASE}/docs/best-practices`,
        label: 'Best Practices',
        absolute: true,
        external: true,
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
      { href: '/docs/components', label: 'Overview', absolute: true },
      ...COMPONENT_CATEGORIES.flatMap((cat) =>
        cat.slugs.map((slug) => ({
          href: `${SITE_BASE}${FRAMEWORK_PREFIX}/components/${slug}`,
          label: slugToTitle(slug),
          absolute: true as const,
          external: true as const,
        }))
      ),
    ],
  },
  {
    label: 'Blocks',
    links: [
      { href: `${SITE_BASE}/blocks`, label: 'Blocks overview', absolute: true, external: true },
      { href: `${SITE_BASE}/blocks/landing-hero`, label: 'Landing hero', absolute: true, external: true },
      { href: `${SITE_BASE}/blocks/pricing`, label: 'Pricing cards', absolute: true, external: true },
      { href: `${SITE_BASE}/blocks/dashboard-01`, label: 'Dashboard', absolute: true, external: true },
      { href: `${SITE_BASE}/blocks/docs-layout`, label: 'Docs layout', absolute: true, external: true },
      { href: `${SITE_BASE}/blocks/login`, label: 'Login', absolute: true, external: true },
      { href: `${SITE_BASE}/blocks/signup`, label: 'Sign up', absolute: true, external: true },
    ],
  },
  {
    label: 'Examples',
    links: [
      { href: `${SITE_BASE}/docs/examples`, label: 'Examples overview', absolute: true, external: true },
      {
        href: `${SITE_BASE}/docs/examples/form-layouts`,
        label: 'Form & layout examples',
        absolute: true,
        external: true,
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
