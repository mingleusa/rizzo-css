import type { HTMLAttributes } from 'react';

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

export type BreadcrumbSeparator = 'chevron' | 'slash' | 'arrow' | string;

export interface BreadcrumbProps extends HTMLAttributes<HTMLElement> {
  items: BreadcrumbItem[];
  separator?: BreadcrumbSeparator;
  className?: string;
}

export function Breadcrumb({
  items,
  separator = 'chevron',
  className = '',
  ...rest
}: BreadcrumbProps) {
  const separatorVariant =
    separator === 'slash'
      ? 'breadcrumb--slash'
      : separator === 'arrow'
        ? 'breadcrumb--arrow'
        : 'breadcrumb--chevron';
  const classes = ['breadcrumb', separatorVariant, className].filter(Boolean).join(' ').trim();
  const separatorChar =
    separator === 'slash' ? '/' : separator === 'arrow' ? '›' : typeof separator === 'string' ? separator : '›';
  const useIcon = separator === 'chevron';

  return (
    <nav className={classes} aria-label="Breadcrumb" {...rest}>
      <ol className="breadcrumb__list">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          const isCurrent = isLast || !item.href;
          return (
            <li
              key={index}
              className={`breadcrumb__item ${isCurrent ? 'breadcrumb__item--current' : ''}`.trim()}
            >
              {isCurrent ? (
                <span className="breadcrumb__current" aria-current="page">
                  {item.label}
                </span>
              ) : (
                <a className="breadcrumb__link" href={item.href}>
                  {item.label}
                </a>
              )}
              {!isLast && (
                <span className="breadcrumb__separator" aria-hidden="true">
                  {useIcon ? (
                    <svg
                      className="breadcrumb__separator-icon"
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      aria-hidden="true"
                    >
                      <path d="M6 9l6 6 6-6" />
                    </svg>
                  ) : (
                    separatorChar
                  )}
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

export default Breadcrumb;
