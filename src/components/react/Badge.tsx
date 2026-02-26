import type { HTMLAttributes, ReactNode } from 'react';

export type BadgeVariant = 'primary' | 'success' | 'warning' | 'error' | 'info';
export type BadgeSize = 'sm' | 'md' | 'lg';

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
  size?: BadgeSize;
  pill?: boolean;
  children?: ReactNode;
  className?: string;
}

export function Badge({
  variant = 'primary',
  size = 'md',
  pill = false,
  className = '',
  children,
  ...rest
}: BadgeProps) {
  const classes = [
    'badge',
    `badge--${variant}`,
    `badge--${size}`,
    pill ? 'badge--pill' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ')
    .trim();
  return (
    <span className={classes} {...rest}>
      {children}
    </span>
  );
}

export default Badge;
