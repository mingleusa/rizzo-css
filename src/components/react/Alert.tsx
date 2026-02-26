import type { HTMLAttributes, ReactNode } from 'react';
import { useEffect, useRef, useState } from 'react';

export type AlertVariant = 'success' | 'error' | 'warning' | 'info';

export interface AlertProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onDismiss'> {
  variant?: AlertVariant;
  dismissible?: boolean;
  autoDismiss?: number;
  onDismiss?: () => void;
  children?: ReactNode;
  className?: string;
  id?: string;
}

const ARIA_LABELS: Record<AlertVariant, string> = {
  success: 'Success message',
  error: 'Error message',
  warning: 'Warning message',
  info: 'Information message',
};

export function Alert({
  variant = 'info',
  dismissible = false,
  autoDismiss = 0,
  onDismiss,
  className = '',
  id: idProp,
  children,
  ...rest
}: AlertProps) {
  const [visible, setVisible] = useState(true);
  const id = idProp ?? `alert-${Math.random().toString(36).slice(2, 11)}`;
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const dismiss = () => {
    setVisible(false);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    onDismiss?.();
  };

  useEffect(() => {
    if (autoDismiss > 0) {
      timeoutRef.current = setTimeout(dismiss, autoDismiss);
    }
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [autoDismiss]);

  if (!visible) return null;

  const classes = ['alert', `alert--${variant}`, className].filter(Boolean).join(' ').trim();

  return (
    <div
      className={classes}
      id={id}
      role="alert"
      aria-live="polite"
      aria-atomic="true"
      aria-label={ARIA_LABELS[variant]}
      {...rest}
    >
      <div className="alert__content">{children}</div>
      {dismissible && (
        <button
          type="button"
          className="alert__close"
          aria-label="Dismiss alert"
          aria-controls={id}
          onClick={dismiss}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              dismiss();
            }
          }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        </button>
      )}
    </div>
  );
}

export default Alert;
