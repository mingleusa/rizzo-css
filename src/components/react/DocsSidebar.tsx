import type { HTMLAttributes, ReactNode } from 'react';

export interface DocsSidebarLink {
  href: string;
  label: string;
  active?: boolean;
}

export interface DocsSidebarGroup {
  label: string;
  links: { href: string; label: string }[];
}

export interface DocsSidebarProps extends HTMLAttributes<HTMLElement> {
  /** Flat link list (no groups). Ignored if groups is set. */
  links?: DocsSidebarLink[];
  /** Grouped nav (same structure as Astro/Svelte). When set, pathPrefix and currentPath control active state. */
  groups?: DocsSidebarGroup[];
  /** Path prefix for hrefs when using groups (e.g. /docs, /docs/react). */
  pathPrefix?: string;
  /** Current pathname for active link (e.g. /docs/react/components/docs-sidebar). */
  currentPath?: string;
  children?: ReactNode;
  className?: string;
}

/** Demo nav groups: same content as Astro/Svelte/Vue/Vanilla live examples. Exported for doc showcase. */
export const DOCS_SIDEBAR_DEMO_GROUPS: DocsSidebarGroup[] = [
  {
    label: 'Introduction',
    links: [
      { href: 'overview', label: 'Overview' },
      { href: 'showcase', label: 'Showcase' },
      { href: 'getting-started', label: 'Getting Started' },
    ],
  },
  {
    label: 'Foundations',
    links: [
      { href: 'design-system', label: 'Design System' },
      { href: 'theming', label: 'Theming' },
      { href: 'accessibility', label: 'Accessibility' },
    ],
  },
  {
    label: 'Components',
    links: [
      { href: 'components', label: 'Overview' },
      { href: 'components/button', label: 'Button' },
      { href: 'components/docs-sidebar', label: 'Docs Sidebar' },
    ],
  },
];

const DEMO_GROUPS = DOCS_SIDEBAR_DEMO_GROUPS;

const DEFAULT_LINKS: DocsSidebarLink[] = [
  { href: '/docs/overview', label: 'Overview' },
  { href: '/docs/getting-started', label: 'Getting Started' },
  { href: '/docs/components', label: 'Components', active: true },
];

export function DocsSidebar({
  links = DEFAULT_LINKS,
  groups,
  pathPrefix = '/docs',
  currentPath = '',
  children,
  className = '',
  ...rest
}: DocsSidebarProps) {
  const effectiveGroups = groups ?? null;
  const path = (currentPath || '').replace(/\/$/, '');

  if (children) {
    return (
      <aside className={`docs-sidebar ${className}`.trim()} aria-label="Documentation navigation" {...rest}>
        <nav className="docs-sidebar__nav">{children}</nav>
      </aside>
    );
  }

  const useGroups = effectiveGroups ?? (pathPrefix && currentPath ? DEMO_GROUPS : null);
  if (useGroups) {
    return (
      <aside className={`docs-sidebar ${className}`.trim()} aria-label="Documentation navigation" {...rest}>
        <nav className="docs-sidebar__nav">
          {useGroups.map((group) => (
            <div key={group.label} className="docs-sidebar__group">
              <h2 className="docs-sidebar__group-label">{group.label}</h2>
              <ul className="docs-sidebar__list">
                {group.links.map((link) => {
                  const href = `${pathPrefix}/${link.href}`.replace(/\/+/g, '/');
                  const active = path === href;
                  return (
                    <li key={link.href} className="docs-sidebar__item">
                      <a
                        href={href}
                        className={`docs-sidebar__link ${active ? 'docs-sidebar__link--active' : ''}`.trim()}
                        aria-current={active ? 'page' : undefined}
                      >
                        {link.label}
                      </a>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </nav>
      </aside>
    );
  }

  return (
    <aside className={`docs-sidebar ${className}`.trim()} aria-label="Documentation navigation" {...rest}>
      <nav className="docs-sidebar__nav">
        <ul className="docs-sidebar__list">
          {links.map((link, i) => (
            <li key={i} className="docs-sidebar__item">
              <a
                href={link.href}
                className={`docs-sidebar__link ${link.active ? 'docs-sidebar__link--active' : ''}`.trim()}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}

export default DocsSidebar;
