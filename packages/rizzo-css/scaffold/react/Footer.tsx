import type { HTMLAttributes } from 'react';

export interface FooterLink {
  href: string;
  label: string;
}

export interface FooterProps extends HTMLAttributes<HTMLElement> {
  siteName?: string;
  year?: number;
  links?: FooterLink[];
  className?: string;
}

export function Footer({
  siteName = '',
  year = new Date().getFullYear(),
  links = [],
  className = '',
  ...rest
}: FooterProps) {
  const classes = ['footer', className].filter(Boolean).join(' ').trim();
  return (
    <footer className={classes} {...rest}>
      <div className="footer__container">
        <div className="footer__inner">
          <p className="footer__copyright">
            {siteName && (
              <>
                <span className="footer__site-name">{siteName}</span>
                {' · '}
              </>
            )}
            <span className="footer__year">© {year}</span>
          </p>
          {links && links.length > 0 && (
            <nav className="footer__nav" aria-label="Footer">
              <ul className="footer__links">
                {links.map((link, i) => (
                  <li key={i} className="footer__link-item">
                    <a className="footer__link" href={link.href}>
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          )}
        </div>
      </div>
    </footer>
  );
}

export default Footer;
