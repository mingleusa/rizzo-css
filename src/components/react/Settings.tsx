import type { HTMLAttributes, ReactNode } from 'react';
import { useEffect } from 'react';

export interface SettingsProps extends HTMLAttributes<HTMLDivElement> {
  id?: string;
  title?: string;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  children?: ReactNode;
  className?: string;
}

export function Settings({
  id: idProp,
  title = 'Settings',
  open = false,
  onOpenChange,
  children,
  className = '',
  ...rest
}: SettingsProps) {
  const id = idProp ?? `settings-${Math.random().toString(36).slice(2, 9)}`;

  useEffect(() => {
    if (!open) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onOpenChange?.(false);
      }
    };
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [open, onOpenChange]);

  return (
    <div
      className={`settings ${open ? 'settings--open' : ''} ${className}`.trim()}
      id={id}
      data-settings
      role="dialog"
      aria-modal="true"
      aria-labelledby={`${id}-title`}
      aria-hidden={!open}
      hidden={!open}
      {...rest}
    >
      <div className="settings__backdrop" onClick={() => onOpenChange?.(false)} aria-hidden="true" />
      <div className="settings__panel">
        <div className="settings__header">
          <h2 id={`${id}-title`} className="settings__title">{title}</h2>
          <button type="button" className="settings__close" aria-label="Close settings" onClick={() => onOpenChange?.(false)}>×</button>
        </div>
        <div className="settings__body">{children}</div>
      </div>
    </div>
  );
}

export default Settings;
