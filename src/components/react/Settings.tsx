import type { HTMLAttributes, ReactNode } from 'react';
import { useCallback, useEffect, useState, useRef } from 'react';

export interface SettingsProps extends HTMLAttributes<HTMLDivElement> {
  id?: string;
  title?: string;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  children?: ReactNode;
  className?: string;
}

const CLOSE_DURATION = 300;

function getReduceMotion(): boolean {
  if (typeof window === 'undefined') return true;
  return (
    window.matchMedia('(prefers-reduced-motion: reduce)').matches ||
    document.documentElement.classList.contains('reduced-motion')
  );
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
  const [closing, setClosing] = useState(false);
  const [opening, setOpening] = useState(false);
  const prevOpen = useRef(open);

  /** Keep panel visible while close animation runs; hide only when not open and not closing. */
  const visible = open || closing;
  /** Panel data-open: show slide-in only after first frame when opening; remove for slide-out when closing. */
  const panelDataOpen = open && !closing && !opening;

  useEffect(() => {
    if (open && !prevOpen.current) {
      setOpening(true);
      const t = requestAnimationFrame(() => {
        requestAnimationFrame(() => setOpening(false));
      });
      return () => cancelAnimationFrame(t);
    }
    prevOpen.current = open;
  }, [open]);

  const handleClose = useCallback(() => {
    const duration = getReduceMotion() ? 0 : CLOSE_DURATION;
    if (duration === 0) {
      onOpenChange?.(false);
      return;
    }
    setClosing(true);
    const t = setTimeout(() => {
      setClosing(false);
      onOpenChange?.(false);
    }, duration);
    return () => clearTimeout(t);
  }, [onOpenChange]);

  useEffect(() => {
    if (!open) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        handleClose();
      }
    };
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [open, handleClose]);

  return (
    <div
      className={`settings ${className}`.trim()}
      id={id}
      data-settings
      aria-hidden={!visible}
      {...rest}
    >
      <div
        className="settings__overlay"
        data-settings-overlay
        aria-hidden="true"
        onClick={handleClose}
      />
      <div
        className="settings__panel"
        role="dialog"
        aria-modal="true"
        aria-labelledby={`${id}-title`}
        aria-hidden={!visible}
        data-open={panelDataOpen ? 'true' : undefined}
      >
        <div className="settings__header">
          <h2 id={`${id}-title`} className="settings__title">
            {title}
          </h2>
          <button
            type="button"
            className="settings__close"
            data-settings-close
            aria-label="Close settings"
            title="Close settings"
            onClick={handleClose}
          >
            ×
          </button>
        </div>
        <div className="settings__content" tabIndex={-1} aria-label="Settings options">
          {children}
        </div>
      </div>
    </div>
  );
}

export default Settings;
