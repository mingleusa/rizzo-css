import type { HTMLAttributes, ReactNode } from 'react';
import { Alert } from './Alert';

export type ToastPosition =
  | 'top-right'
  | 'top-left'
  | 'bottom-right'
  | 'bottom-left'
  | 'top-center'
  | 'bottom-center';

export interface ToastProps extends HTMLAttributes<HTMLDivElement> {
  variant?: 'success' | 'error' | 'warning' | 'info';
  dismissible?: boolean;
  autoDismiss?: number;
  position?: ToastPosition;
  children?: ReactNode;
  className?: string;
  id?: string;
}

export function Toast({
  variant = 'info',
  dismissible = true,
  autoDismiss = 5000,
  position = 'top-right',
  children,
  className = '',
  id,
  ...rest
}: ToastProps) {
  const positionClass = `toast--${position}`;
  const classes = ['toast', positionClass, className].filter(Boolean).join(' ').trim();
  return (
    <div className={classes} data-toast-container {...rest}>
      <Alert variant={variant} dismissible={dismissible} autoDismiss={autoDismiss} id={id}>
        {children}
      </Alert>
    </div>
  );
}

export default Toast;
