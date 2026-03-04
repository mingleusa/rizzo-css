import type { HTMLAttributes, ReactNode } from 'react';
import { useState, useEffect } from 'react';

export interface NavbarLink {
  href: string;
  label: string;
}

export interface NavbarProps extends HTMLAttributes<HTMLElement> {
  siteName?: string;
  logo?: string;
  /** Desktop: slot for Search + Settings. */
  children?: ReactNode;
  /** Mobile menu links (same as Astro/Svelte/Vue/Vanilla demos). */
  menuLinks?: NavbarLink[];
}

const DEFAULT_MENU_LINKS: NavbarLink[] = [
  { href: '/docs', label: 'Docs' },
  { href: '/docs/components', label: 'Components' },
  { href: '/blocks', label: 'Blocks' },
  { href: '/themes', label: 'Themes' },
];

export function Navbar({
  siteName = 'Site',
  logo,
  children,
  menuLinks = DEFAULT_MENU_LINKS,
  className = '',
  ...rest
}: NavbarProps) {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (!menuOpen) return;
    const onEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMenuOpen(false);
    };
    const onClick = (e: MouseEvent) => {
      const target = e.target as Node;
      if (target && !(target as Element).closest?.('.navbar')) setMenuOpen(false);
    };
    document.addEventListener('keydown', onEscape);
    const t = setTimeout(() => document.addEventListener('click', onClick), 0);
    return () => {
      document.removeEventListener('keydown', onEscape);
      document.removeEventListener('click', onClick);
      clearTimeout(t);
    };
  }, [menuOpen]);

  return (
    <nav className={`navbar ${menuOpen ? 'navbar--menu-open' : ''} ${className}`.trim()} role="navigation" aria-label="Main navigation" {...rest}>
      <div className="navbar__container">
        <div className="navbar__brand">
          <a href="/" className="navbar__brand-link">
            {logo ? (
              <img src={logo} alt="" className="navbar__logo" />
            ) : (
              <span className="navbar__logo" aria-hidden="true">◎</span>
            )}
            {siteName}
          </a>
        </div>
        {children && <div className="navbar__actions-desktop">{children}</div>}
        <button
          type="button"
          className="navbar__toggle"
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
          aria-controls="navbar-menu"
          onClick={() => setMenuOpen((o) => !o)}
        >
          <span className="navbar__toggle-icon" aria-hidden="true">
            <span /><span /><span />
          </span>
        </button>
        <div
          className={`navbar__menu ${menuOpen ? 'navbar__menu--open' : ''}`}
          id="navbar-menu"
          role="navigation"
          aria-label="Mobile menu"
          aria-hidden={!menuOpen}
        >
          {menuLinks.map((link) => (
            <div key={link.href} className="navbar__item">
              <a
                href={link.href}
                className="navbar__link"
                tabIndex={menuOpen ? 0 : -1}
              >
                {link.label}
              </a>
            </div>
          ))}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
