import type { HTMLAttributes, ReactNode } from 'react';
import { useEffect } from 'react';

export interface AlertDialogProps extends HTMLAttributes<HTMLDivElement> {
  id?: string;
  title?: string;
  description?: string;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  children?: ReactNode;
  actions?: ReactNode;
  className?: string;
}

export function AlertDialog({
  id: idProp,
  title = 'Are you sure?',
  description,
  open = false,
  onOpenChange,
  children,
  actions,
  className = '',
  ...rest
}: AlertDialogProps) {
  const id = idProp ?? `alert-dialog-${Math.random().toString(36).slice(2, 9)}`;

  const close = () => onOpenChange?.(false);

  useEffect(() => {
    if (!open) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        close();
      }
    };
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [open, onOpenChange]);

  return (
    <div className="alert-dialog-root">
      <div
        className={`alert-dialog__overlay ${open ? 'alert-dialog__overlay--open' : ''}`.trim()}
        data-alert-dialog-overlay
        aria-hidden={!open}
        id={`${id}-overlay`}
        onClick={close}
        role="presentation"
      />
      <div
        className={`alert-dialog ${className}`.trim()}
        role="alertdialog"
        aria-modal="true"
        aria-labelledby={`${id}-title`}
        aria-describedby={description ? `${id}-desc` : undefined}
        aria-hidden={!open}
        id={id}
        data-alert-dialog
        hidden={!open}
        {...rest}
      >
        <div className="alert-dialog__content">
          <h2 id={`${id}-title`} className="alert-dialog__title">
            {title}
          </h2>
          {description && (
            <p id={`${id}-desc`} className="alert-dialog__description">
              {description}
            </p>
          )}
          <div className="alert-dialog__actions">{actions}</div>
        </div>
      </div>
    </div>
  );
}

export default AlertDialog;
