import type { HTMLAttributes, ReactNode } from 'react';
import { useState, useEffect } from 'react';

export interface NavbarProps extends HTMLAttributes<HTMLElement> {
  siteName?: string;
  logo?: string;
  children?: ReactNode;
}

export function Navbar({
  siteName = 'Site',
  logo,
  children,
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
    <nav className={`navbar ${className}`.trim()} role="navigation" aria-label="Main navigation" {...rest}>
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
          onClick={() => setMenuOpen((o) => !o)}
        >
          <span className="navbar__toggle-icon" aria-hidden="true">
            <span /><span /><span />
          </span>
        </button>
      </div>
      {menuOpen && (
        <div className="navbar__mobile" aria-hidden="false">
          <div className="navbar__mobile-inner">Mobile menu</div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
