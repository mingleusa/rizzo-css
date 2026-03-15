/**
 * Minimal component categories for the full template components page.
 * Same structure as main site for consistent layout.
 */
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

function slugToTitle(slug: string): string {
  return slug
    .split('-')
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ');
}

export const COMPONENT_CATEGORIES: { id: string; label: string; slugs: string[] }[] = [
  { id: 'layout', label: 'Layout', slugs: ['navbar', 'docs-sidebar', 'dashboard', 'resizable', 'footer'] },
  { id: 'forms', label: 'Forms & inputs', slugs: ['button', 'button-group', 'forms', 'switch', 'slider', 'toggle', 'toggle-group', 'divider', 'separator', 'label', 'kbd'] },
  { id: 'data', label: 'Data display', slugs: ['cards', 'table', 'badge', 'pagination', 'aspect-ratio', 'empty', 'scroll-area', 'alert', 'skeleton', 'spinner', 'progress-bar', 'toast'] },
  { id: 'overlay', label: 'Overlay', slugs: ['modal', 'sheet', 'popover', 'dropdown', 'tooltip', 'accordion', 'collapsible', 'tabs'] },
  { id: 'other', label: 'Other', slugs: ['avatar', 'copy-to-clipboard', 'theme-switcher', 'font-switcher', 'settings', 'search', 'breadcrumb', 'back-to-top'] },
];

export function getComponentsByCategory(): CategoryWithItems[] {
  const pathPrefix = '/docs/components';
  return COMPONENT_CATEGORIES.map((cat) => ({
    id: cat.id,
    label: cat.label,
    items: cat.slugs.map((slug) => ({
      href: `${pathPrefix}/${slug}`,
      title: slugToTitle(slug),
      description: `Accessible, themeable ${slugToTitle(slug).toLowerCase()} component.`,
    })),
  }));
}
