import type { HTMLAttributes } from 'react';
import { useState } from 'react';

export interface FontPair {
  id: string;
  label: string;
}

export interface FontSwitcherProps extends HTMLAttributes<HTMLDivElement> {
  id?: string;
  fonts?: FontPair[];
  className?: string;
}

const DEFAULT_FONTS: FontPair[] = [
  { id: 'system', label: 'System' },
  { id: 'sans-mono', label: 'Sans + Mono' },
];

export function FontSwitcher({
  id: idProp,
  fonts = DEFAULT_FONTS,
  className = '',
  ...rest
}: FontSwitcherProps) {
  const id = idProp ?? `font-switcher-${Math.random().toString(36).slice(2, 9)}`;
  const [open, setOpen] = useState(false);
  const [current, setCurrent] = useState(fonts[0]?.id ?? 'system');

  return (
    <div className={`font-switcher ${className}`.trim()} data-font-switcher id={id} {...rest}>
      <button
        type="button"
        className="font-switcher__trigger"
        aria-expanded={open}
        aria-haspopup="true"
        aria-controls={`${id}-menu`}
        onClick={() => setOpen((o) => !o)}
      >
        {fonts.find((f) => f.id === current)?.label ?? 'Font'}
      </button>
      <div
        className={`font-switcher__menu ${open ? 'font-switcher__menu--open' : ''}`.trim()}
        id={`${id}-menu`}
        role="menu"
        aria-hidden={!open}
        hidden={!open}
      >
        {fonts.map((f) => (
          <button
            key={f.id}
            type="button"
            role="menuitem"
            className={`font-switcher__item ${current === f.id ? 'font-switcher__item--active' : ''}`.trim()}
            onClick={() => {
              setCurrent(f.id);
              setOpen(false);
            }}
          >
            {f.label}
          </button>
        ))}
      </div>
    </div>
  );
}

export default FontSwitcher;
