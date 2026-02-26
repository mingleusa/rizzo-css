import type { HTMLAttributes } from 'react';

export type SpinnerVariant = 'primary' | 'success' | 'warning' | 'error' | 'info';
export type SpinnerSize = 'sm' | 'md' | 'lg';

export interface SpinnerProps extends HTMLAttributes<HTMLSpanElement> {
  size?: SpinnerSize;
  variant?: SpinnerVariant;
  label?: string;
  className?: string;
}

export function Spinner({
  size = 'md',
  variant = 'primary',
  label = 'Loading',
  className = '',
  ...rest
}: SpinnerProps) {
  const classes = [
    'spinner',
    `spinner--${size}`,
    `spinner--${variant}`,
    className,
  ]
    .filter(Boolean)
    .join(' ')
    .trim();
  return (
    <span className={classes} role="status" aria-label={label} {...rest}>
      <span className="spinner__ring" aria-hidden="true" />
    </span>
  );
}

export default Spinner;
