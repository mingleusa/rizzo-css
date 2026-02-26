import type { HTMLAttributes, ReactNode } from 'react';

export interface DocsSidebarLink {
  href: string;
  label: string;
  active?: boolean;
}

export interface DocsSidebarProps extends HTMLAttributes<HTMLElement> {
  links?: DocsSidebarLink[];
  children?: ReactNode;
  className?: string;
}

const DEFAULT_LINKS: DocsSidebarLink[] = [
  { href: '/docs', label: 'Overview' },
  { href: '/docs/getting-started', label: 'Getting started' },
  { href: '/docs/components', label: 'Components', active: true },
];

export function DocsSidebar({
  links = DEFAULT_LINKS,
  children,
  className = '',
  ...rest
}: DocsSidebarProps) {
  return (
    <aside className={`docs-sidebar ${className}`.trim()} {...rest}>
      <nav className="docs-sidebar__nav" aria-label="Docs">
        <ul className="docs-sidebar__list">
          {children ??
            links.map((link, i) => (
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
