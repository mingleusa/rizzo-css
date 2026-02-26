import type { HTMLAttributes, ReactNode } from 'react';
import { useEffect } from 'react';

export type SheetSide = 'top' | 'right' | 'bottom' | 'left';

export interface SheetProps extends HTMLAttributes<HTMLDivElement> {
  id?: string;
  title?: string;
  side?: SheetSide;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  children?: ReactNode;
  className?: string;
}

export function Sheet({
  id: idProp,
  title,
  side = 'right',
  open = false,
  onOpenChange,
  children,
  className = '',
  onKeyDown,
  ...rest
}: SheetProps) {
  const id = idProp ?? `sheet-${Math.random().toString(36).slice(2, 9)}`;

  const close = () => onOpenChange?.(false);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
    };
    if (open) document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [open]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    onKeyDown?.(e);
    if (e.key === 'Escape') close();
  };

  return (
    <>
      <div
        className={`sheet__overlay ${open ? 'sheet__overlay--open' : ''}`.trim()}
        data-sheet-overlay
        aria-hidden={!open}
        id={`${id}-overlay`}
        onClick={close}
        role="presentation"
      />
      <div
        className={`sheet sheet--${side} ${open ? 'sheet--open' : ''} ${className}`.trim()}
        role="dialog"
        aria-modal="true"
        aria-labelledby={title ? `${id}-title` : undefined}
        aria-hidden={!open}
        id={id}
        data-sheet
        hidden={!open}
        onKeyDown={handleKeyDown}
        {...rest}
      >
        <div className="sheet__content">
          {title && (
            <div className="sheet__header">
              <h2 id={`${id}-title`} className="sheet__title">
                {title}
              </h2>
              <button type="button" className="sheet__close" aria-label="Close" onClick={close}>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              </button>
            </div>
          )}
          <div className="sheet__body">{children}</div>
        </div>
      </div>
    </>
  );
}

export default Sheet;
