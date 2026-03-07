import { useState, useEffect, useRef } from 'react';

export interface MenubarMenuItem {
  label: string;
  href?: string;
}

export interface MenubarItem {
  label: string;
  menu: MenubarMenuItem[];
}

export interface MenubarProps {
  items?: MenubarItem[];
  className?: string;
}

export function Menubar({
  items = [
    { label: 'File', menu: [{ label: 'New', href: '#' }, { label: 'Open', href: '#' }] },
    { label: 'Edit', menu: [{ label: 'Undo', href: '#' }] },
  ],
  className = '',
}: MenubarProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (openIndex === null) return;
    const onClose = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) setOpenIndex(null);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpenIndex(null);
    };
    setTimeout(() => document.addEventListener('click', onClose), 0);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('click', onClose);
      document.removeEventListener('keydown', onKey);
    };
  }, [openIndex]);

  return (
    <nav
      ref={navRef}
      className={`menubar ${className}`.trim()}
      role="menubar"
      aria-label="Main menu"
    >
      {items.map((item, i) => (
        <div key={item.label} className="menubar__item" role="none">
          <button
            type="button"
            role="menuitem"
            className="menubar__trigger"
            aria-haspopup="true"
            aria-expanded={openIndex === i}
            onClick={(e) => {
              e.stopPropagation();
              setOpenIndex(openIndex === i ? null : i);
            }}
          >
            {item.label}
          </button>
          <div
            className="menubar__menu"
            role="menu"
            aria-label={item.label}
            hidden={openIndex !== i}
          >
            {item.menu.map((entry) =>
              entry.href ? (
                <a
                  key={entry.label}
                  href={entry.href}
                  className="menubar__menu-item"
                  role="menuitem"
                >
                  {entry.label}
                </a>
              ) : (
                <button
                  key={entry.label}
                  type="button"
                  className="menubar__menu-item"
                  role="menuitem"
                >
                  {entry.label}
                </button>
              )
            )}
          </div>
        </div>
      ))}
    </nav>
  );
}

export default Menubar;
