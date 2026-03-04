/**
 * Canonical component categories used across all frameworks (Astro, React, Vue, Svelte, Vanilla).
 * Same order and grouping for docs sidebar and component overview pages.
 */
export interface ComponentCategory {
  id: string;
  label: string;
  slugs: string[];
}

export const COMPONENT_CATEGORIES: ComponentCategory[] = [
  {
    id: 'layout',
    label: 'Layout',
    slugs: ['navbar', 'docs-sidebar', 'dashboard', 'resizable', 'footer'],
  },
  {
    id: 'forms',
    label: 'Forms & inputs',
    slugs: [
      'button',
      'button-group',
      'forms',
      'input-group',
      'switch',
      'slider',
      'toggle',
      'toggle-group',
      'divider',
      'separator',
      'label',
      'kbd',
    ],
  },
  {
    id: 'data',
    label: 'Data display',
    slugs: [
      'cards',
      'carousel',
      'table',
      'badge',
      'pagination',
      'aspect-ratio',
      'empty',
      'scroll-area',
      'calendar',
      'range-calendar',
    ],
  },
  {
    id: 'feedback',
    label: 'Feedback',
    slugs: ['alert', 'skeleton', 'spinner', 'progress-bar', 'toast'],
  },
  {
    id: 'overlay',
    label: 'Overlay',
    slugs: [
      'modal',
      'alert-dialog',
      'sheet',
      'popover',
      'hover-card',
      'context-menu',
      'dropdown',
      'tooltip',
    ],
  },
  {
    id: 'navigation',
    label: 'Navigation',
    slugs: ['breadcrumb', 'back-to-top'],
  },
  {
    id: 'disclosure',
    label: 'Disclosure',
    slugs: ['accordion', 'collapsible', 'tabs'],
  },
  {
    id: 'other',
    label: 'Other',
    slugs: [
      'avatar',
      'copy-to-clipboard',
      'theme-switcher',
      'font-switcher',
      'settings',
      'search',
      'icons',
      'sound-effects',
    ],
  },
];

export interface CategoryItem {
  href: string;
  title: string;
  description: string;
}

export interface CategoryWithItems {
  id: string;
  label: string;
  items: CategoryItem[];
}

/**
 * Build category list with hrefs and labels for a given docs path prefix.
 * @param pathPrefix - e.g. '/docs' (Astro), '/docs/react', '/docs/vue', '/docs/svelte', '/docs/vanilla'
 * @param getMeta - (slug) => { title, description }
 */
export function getCategoriesWithItems(
  pathPrefix: string,
  getMeta: (slug: string) => { title: string; description: string }
): CategoryWithItems[] {
  return COMPONENT_CATEGORIES.map((cat) => ({
    id: cat.id,
    label: cat.label,
    items: cat.slugs.map((slug) => {
      const { title, description } = getMeta(slug);
      return {
        href: `${pathPrefix}/components/${slug}`,
        title,
        description,
      };
    }),
  }));
}
