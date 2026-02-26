import type { HTMLAttributes } from 'react';
import { useState } from 'react';

export interface SearchProps extends HTMLAttributes<HTMLDivElement> {
  id?: string;
  placeholder?: string;
  className?: string;
}

export function Search({
  id: idProp,
  placeholder = 'Search…',
  className = '',
  ...rest
}: SearchProps) {
  const id = idProp ?? `search-${Math.random().toString(36).slice(2, 9)}`;
  const [open, setOpen] = useState(false);

  return (
    <div className={`search ${className}`.trim()} data-search id={id} {...rest}>
      <button
        type="button"
        className="search__trigger"
        aria-label="Open search"
        aria-expanded={open}
        aria-controls={`${id}-overlay`}
        onClick={() => setOpen(true)}
      >
        <span className="search__trigger-icon" aria-hidden="true">⌘</span>
        <span className="search__trigger-label">Search</span>
      </button>
      <div
        className={`search__overlay ${open ? 'search__overlay--open' : ''}`.trim()}
        id={`${id}-overlay`}
        role="dialog"
        aria-label="Search"
        aria-hidden={!open}
        hidden={!open}
      >
        <div className="search__overlay-inner">
          <input
            type="search"
            className="search__input"
            placeholder={placeholder}
            autoFocus
            aria-label="Search"
          />
          <button
            type="button"
            className="search__close"
            aria-label="Close search"
            onClick={() => setOpen(false)}
          >
            ×
          </button>
        </div>
      </div>
    </div>
  );
}

export default Search;
