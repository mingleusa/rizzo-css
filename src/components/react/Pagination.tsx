import type { HTMLAttributes } from 'react';

function buildHref(template: string, page: number): string {
  return template.replace(/\{page\}/g, String(page));
}

function getPageItems(
  total: number,
  current: number,
  maxVisible: number
): (number | 'ellipsis')[] {
  if (total <= 1) return [];
  if (total <= maxVisible) return Array.from({ length: total }, (_, i) => i + 1);
  const items: (number | 'ellipsis')[] = [1];
  const delta = Math.max(0, Math.floor((maxVisible - 2) / 2));
  const start = Math.max(2, current - delta);
  const end = Math.min(total - 1, current + delta);
  if (start > 2) items.push('ellipsis');
  for (let p = start; p <= end; p++) {
    if (p !== 1 && p !== total) items.push(p);
  }
  if (end < total - 1) items.push('ellipsis');
  if (total > 1) items.push(total);
  return items;
}

export interface PaginationProps extends HTMLAttributes<HTMLElement> {
  currentPage: number;
  totalPages: number;
  hrefTemplate?: string;
  showFirstLast?: boolean;
  maxVisible?: number;
  className?: string;
}

export function Pagination({
  currentPage,
  totalPages,
  hrefTemplate = '?page={page}',
  showFirstLast = true,
  maxVisible = 5,
  className = '',
  ...rest
}: PaginationProps) {
  const classes = ['pagination', className].filter(Boolean).join(' ').trim();
  const pageItems = getPageItems(totalPages, currentPage, maxVisible);
  const hasPrev = currentPage > 1;
  const hasNext = currentPage < totalPages;

  return (
    <nav className={classes} aria-label="Pagination" {...rest}>
      <ul className="pagination__list">
        {showFirstLast && totalPages > 1 && (
          <li className="pagination__item">
            {hasPrev ? (
              <a
                className="pagination__link pagination__link--prev"
                href={buildHref(hrefTemplate, 1)}
                aria-label="First page"
              >
                First
              </a>
            ) : (
              <span
                className="pagination__link pagination__link--prev pagination__link--disabled"
                aria-disabled="true"
              >
                First
              </span>
            )}
          </li>
        )}
        <li className="pagination__item">
          {hasPrev ? (
            <a
              className="pagination__link pagination__link--prev"
              href={buildHref(hrefTemplate, currentPage - 1)}
              aria-label="Previous page"
            >
              Previous
            </a>
          ) : (
            <span
              className="pagination__link pagination__link--prev pagination__link--disabled"
              aria-disabled="true"
            >
              Previous
            </span>
          )}
        </li>
        {pageItems.map((item, i) => (
          <li key={i} className="pagination__item">
            {item === 'ellipsis' ? (
              <span className="pagination__ellipsis" aria-hidden="true">
                …
              </span>
            ) : item === currentPage ? (
              <span className="pagination__link pagination__link--current" aria-current="page">
                {item}
              </span>
            ) : (
              <a
                className="pagination__link"
                href={buildHref(hrefTemplate, item)}
                aria-label={`Page ${item}`}
              >
                {item}
              </a>
            )}
          </li>
        ))}
        <li className="pagination__item">
          {hasNext ? (
            <a
              className="pagination__link pagination__link--next"
              href={buildHref(hrefTemplate, currentPage + 1)}
              aria-label="Next page"
            >
              Next
            </a>
          ) : (
            <span
              className="pagination__link pagination__link--next pagination__link--disabled"
              aria-disabled="true"
            >
              Next
            </span>
          )}
        </li>
        {showFirstLast && totalPages > 1 && (
          <li className="pagination__item">
            {hasNext ? (
              <a
                className="pagination__link pagination__link--next"
                href={buildHref(hrefTemplate, totalPages)}
                aria-label="Last page"
              >
                Last
              </a>
            ) : (
              <span
                className="pagination__link pagination__link--next pagination__link--disabled"
                aria-disabled="true"
              >
                Last
              </span>
            )}
          </li>
        )}
      </ul>
    </nav>
  );
}

export default Pagination;
