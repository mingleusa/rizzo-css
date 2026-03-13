/**
 * Docs sidebar nav for full template. Matches https://rizzo-css.vercel.app exactly.
 * Local routes: /docs/overview, /docs/getting-started, /docs/components. All other links point to the main site.
 */
import { COMPONENT_CATEGORIES } from './componentCategories';

const SITE_BASE = 'https://rizzo-css.vercel.app';
const FRAMEWORK_PREFIX = '/docs/vue';

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
      { href: '/docs/overview', label: 'Overview', absolute: true, sections: [{ id: 'overview', label: 'Overview' }, { id: 'installation', label: 'Installation' }, { id: 'components', label: 'Components' }, { id: 'blocks', label: 'Blocks' }] },
      { href: `${SITE_BASE}/docs/showcase`, label: 'Showcase', absolute: true, external: true, sections: [{ id: 'components', label: 'Components' }, { id: 'themes', label: 'Themes' }, { id: 'blocks', label: 'Blocks' }, { id: 'examples', label: 'Examples' }] },
      { href: '/docs/getting-started', label: 'Getting Started', absolute: true, sections: [{ id: 'installation', label: 'Installation' }, { id: 'installation-by-framework', label: 'By framework' }, { id: 'vanilla', label: 'Vanilla' }, { id: 'astro', label: 'Astro' }, { id: 'svelte', label: 'Svelte' }, { id: 'react', label: 'React' }, { id: 'vue', label: 'Vue' }, { id: 'project-structure', label: 'Project Structure' }, { id: 'development', label: 'Development' }, { id: 'building', label: 'Building' }, { id: 'using-components', label: 'Using Components' }, { id: 'using-themes', label: 'Using Themes' }, { id: 'css-architecture', label: 'CSS Architecture' }] },
    ],
  },
  {
    label: 'Foundations',
    links: [
      { href: `${SITE_BASE}/docs/design-system`, label: 'Design System', absolute: true, external: true },
      { href: `${SITE_BASE}/docs/theming`, label: 'Theming', absolute: true, external: true },
      { href: `${SITE_BASE}/docs/accessibility`, label: 'Accessibility', absolute: true, external: true },
      { href: `${SITE_BASE}/docs/accessibility/manual-testing`, label: 'Manual testing checklist', absolute: true, external: true },
      { href: `${SITE_BASE}/docs/colors`, label: 'Colors', absolute: true, external: true },
      { href: `${SITE_BASE}/docs/tokens`, label: 'Tokens reference', absolute: true, external: true },
      { href: `${SITE_BASE}/docs/best-practices`, label: 'Best Practices', absolute: true, external: true },
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
      { href: `${SITE_BASE}/docs/examples/form-layouts`, label: 'Form & layout examples', absolute: true, external: true, sections: [{ id: 'login-form', label: 'Login form' }, { id: 'contact-form', label: 'Contact form' }, { id: 'dashboard-stats', label: 'Dashboard stats cards' }, { id: 'card-grid', label: 'Card grid' }, { id: 'settings-panel', label: 'Settings panel' }] },
    ],
  },
];
