import type { HTMLAttributes } from 'react';
import { useState, useEffect } from 'react';

export interface ThemeOption {
  value: string;
  label: string;
}

export interface ThemeSwitcherProps extends HTMLAttributes<HTMLDivElement> {
  idPrefix?: string;
  themes?: ThemeOption[];
  className?: string;
}

const DEFAULT_THEMES: ThemeOption[] = [
  { value: 'github-dark-classic', label: 'GitHub Dark' },
  { value: 'github-light', label: 'GitHub Light' },
  { value: 'system', label: 'System' },
];

export function ThemeSwitcher({
  idPrefix = '',
  themes = DEFAULT_THEMES,
  className = '',
  ...rest
}: ThemeSwitcherProps) {
  const [open, setOpen] = useState(false);
  const [current, setCurrent] = useState(themes[0]?.value ?? 'system');

  useEffect(() => {
    const stored = typeof localStorage !== 'undefined' ? localStorage.getItem('theme') : null;
    if (stored) setCurrent(stored);
  }, []);

  const menuId = idPrefix ? `theme-switcher-${idPrefix}-menu` : 'theme-switcher-menu';
  const triggerId = idPrefix ? `theme-switcher-${idPrefix}-trigger` : 'theme-switcher-trigger';

  const apply = (value: string) => {
    if (value === 'system') {
      document.documentElement.removeAttribute('data-theme');
      localStorage.removeItem('theme');
    } else {
      document.documentElement.setAttribute('data-theme', value);
      localStorage.setItem('theme', value);
    }
    setCurrent(value);
    setOpen(false);
  };

  return (
    <div className={`theme-switcher ${className}`.trim()} data-theme-switcher {...rest}>
      <button
        type="button"
        id={triggerId}
        className="theme-switcher__trigger"
        aria-expanded={open}
        aria-haspopup="true"
        aria-controls={menuId}
        aria-label="Theme"
        onClick={() => setOpen((o) => !o)}
      >
        <span className="theme-switcher__trigger-icon" aria-hidden="true">◐</span>
        <span className="theme-switcher__trigger-label">{themes.find((t) => t.value === current)?.label ?? 'Theme'}</span>
      </button>
      <div
        className={`theme-switcher__menu ${open ? 'theme-switcher__menu--open' : ''}`.trim()}
        id={menuId}
        role="menu"
        aria-labelledby={triggerId}
        aria-hidden={!open}
        hidden={!open}
      >
        {themes.map((t) => (
          <button
            key={t.value}
            type="button"
            role="menuitem"
            className={`theme-switcher__item ${current === t.value ? 'theme-switcher__item--active' : ''}`.trim()}
            onClick={() => apply(t.value)}
          >
            {t.label}
          </button>
        ))}
      </div>
    </div>
  );
}

export default ThemeSwitcher;
