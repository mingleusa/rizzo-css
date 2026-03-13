import { useEffect, useState } from 'react';
import type { HTMLAttributes } from 'react';

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

export interface DocsSidebarProps extends HTMLAttributes<HTMLElement> {
  /** Current URL pathname (e.g. location.pathname or useLocation().pathname). */
  currentPath: string;
  /** Path prefix for framework-specific links (e.g. /docs). */
  pathPrefix?: string;
  /** When true, omit the aside id to avoid duplicate ids when used inside a demo box. */
  omitId?: boolean;
  /** Nav config (when not provided, sidebar renders minimal placeholder for base template). */
  nav?: DocsNavGroup[];
  className?: string;
}

function fullHref(link: { href: string; frameworkOnly?: boolean; absolute?: boolean }, pathPrefix: string): string {
  if (link.absolute && link.href) return link.href;
  const base = link.frameworkOnly ? pathPrefix : '/docs';
  return `${base}/${link.href}`;
}

function isActive(link: DocsNavLink, currentPath: string, pathPrefix: string): boolean {
  const path = currentPath.replace(/\/$/, '');
  const href = fullHref(link, pathPrefix);
  return path === href;
}

export function DocsSidebar({
  currentPath,
  pathPrefix = '/docs',
  omitId = false,
  nav = [],
  className = '',
  ...rest
}: DocsSidebarProps) {
  const [activeSectionId, setActiveSectionId] = useState<string | null>(null);

  useEffect(() => {
    function setActiveFromHash() {
      setActiveSectionId(window.location.hash.slice(1) || null);
    }
    setActiveFromHash();
    window.addEventListener('hashchange', setActiveFromHash);

    let io: IntersectionObserver | null = null;
    const content = document.querySelector('.docs__content');
    if (content) {
      const headings = content.querySelectorAll<HTMLHeadingElement>('h2[id]');
      if (headings.length) {
        io = new IntersectionObserver(
          (entries: IntersectionObserverEntry[]) => {
            for (const e of entries) {
              if (!e.isIntersecting) continue;
              const id = (e.target as HTMLElement).id;
              if (id) setActiveSectionId(id);
              break;
            }
          },
          { rootMargin: '-80px 0px -60% 0px', threshold: 0 }
        );
        headings.forEach((h) => io!.observe(h));
      }
    }
    return () => {
      window.removeEventListener('hashchange', setActiveFromHash);
      io?.disconnect();
    };
  }, []);

  const hasNav = nav && nav.length > 0;

  return (
    <aside
      id={omitId ? undefined : 'docs-sidebar'}
      className={`docs-sidebar ${className}`.trim()}
      aria-label="Documentation navigation"
      {...rest}
    >
      {hasNav ? (
        <nav className="docs-sidebar__nav">
          {nav.map((group) => (
            <div key={group.label} className="docs-sidebar__group">
              <h2 className="docs-sidebar__group-label">{group.label}</h2>
              <ul className="docs-sidebar__list">
                {group.links.map((link) => {
                  const href = fullHref(link, pathPrefix);
                  const active = isActive(link, currentPath, pathPrefix);
                  const sections = link.sections ?? [];
                  return (
                    <li key={link.href + link.label} className="docs-sidebar__item">
                      <a
                        href={href}
                        className={`docs-sidebar__link ${active && (sections.length === 0 || activeSectionId == null) ? 'docs-sidebar__link--active' : ''}`.trim()}
                        aria-current={active && (sections.length === 0 || activeSectionId == null) ? 'page' : undefined}
                        target={link.external ? '_blank' : undefined}
                        rel={link.external ? 'noopener noreferrer' : undefined}
                      >
                        {link.label}
                      </a>
                      {sections.length > 0 && (
                        <ul className="docs-sidebar__sublist" aria-label={`Sections in ${link.label}`}>
                          {sections.map((section) => {
                            const sublinkHref = `${href}#${section.id}`;
                            const sublinkActive = !link.external && activeSectionId === section.id && currentPath.replace(/\/$/, '') === href.split('#')[0];
                            return (
                              <li key={section.id} className="docs-sidebar__subitem">
                                <a
                                  href={sublinkHref}
                                  className={`docs-sidebar__sublink ${sublinkActive ? 'docs-sidebar__sublink--active' : ''}`.trim()}
                                  aria-current={sublinkActive ? 'location' : undefined}
                                  target={link.external ? '_blank' : undefined}
                                  rel={link.external ? 'noopener noreferrer' : undefined}
                                >
                                  {section.label}
                                </a>
                              </li>
                            );
                          })}
                        </ul>
                      )}
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </nav>
      ) : (
        <div className="docs-sidebar__nav docs-sidebar__nav--placeholder">
          <p className="docs-sidebar__placeholder">Docs sidebar — add <code>nav</code> prop with DOCS_NAV for full nav.</p>
        </div>
      )}
    </aside>
  );
}

export default DocsSidebar;
