import { useState, useEffect, useCallback } from 'react';

export interface CommandItem {
  id: string;
  label: string;
  shortcut?: string;
}

export interface CommandProps {
  triggerLabel?: string;
  searchPlaceholder?: string;
  items?: CommandItem[];
  onSelect?: (id: string) => void;
  className?: string;
}

export function Command({
  triggerLabel = 'Open command palette (⌘K)',
  searchPlaceholder = 'Search…',
  items = [],
  onSelect,
  className = '',
}: CommandProps) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);

  const filtered = items.filter((item) =>
    item.label.toLowerCase().includes(query.toLowerCase())
  );

  const close = useCallback(() => {
    setOpen(false);
    setQuery('');
    setSelectedIndex(0);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setOpen((o) => !o);
      }
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open, close]);

  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  const handleSelect = (id: string) => {
    onSelect?.(id);
    close();
  };

  return (
    <div className={`command-root ${className}`.trim()}>
      <button
        type="button"
        className="btn btn-outline"
        onClick={() => setOpen(true)}
        aria-haspopup="dialog"
        aria-expanded={open}
      >
        {triggerLabel}
      </button>
      {open && (
        <>
          <div
            className="command__overlay"
            aria-hidden="false"
            onClick={close}
            onKeyDown={() => {}}
          />
          <div
            className="command__dialog"
            role="dialog"
            aria-modal="true"
            aria-label="Command palette"
          >
            <div className="command__search-wrap">
              <input
                type="search"
                className="command__search"
                placeholder={searchPlaceholder}
                autoComplete="off"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                autoFocus
              />
            </div>
            <div className="command__list" role="listbox">
              {filtered.map((item, i) => (
                <button
                  key={item.id}
                  type="button"
                  className="command__item"
                  role="option"
                  aria-selected={i === selectedIndex}
                  onClick={() => handleSelect(item.id)}
                  onMouseEnter={() => setSelectedIndex(i)}
                >
                  {item.label}
                  {item.shortcut && <kbd>{item.shortcut}</kbd>}
                </button>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default Command;
