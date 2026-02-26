import type { HTMLAttributes } from 'react';

export type SkeletonVariant = 'text' | 'circle' | 'rect' | 'default';

export interface SkeletonProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: SkeletonVariant;
  label?: string;
  className?: string;
}

export function Skeleton({
  variant = 'default',
  label = 'Loading',
  className = '',
  ...rest
}: SkeletonProps) {
  const variantClass = variant !== 'default' ? `skeleton--${variant}` : '';
  const classes = ['skeleton', variantClass, className].filter(Boolean).join(' ').trim();
  const isDecorative = label === '';
  return (
    <span
      className={classes}
      role={isDecorative ? undefined : 'status'}
      aria-label={isDecorative ? undefined : label}
      aria-busy={isDecorative ? undefined : 'true'}
      aria-hidden={isDecorative ? 'true' : undefined}
      {...rest}
    />
  );
}

export default Skeleton;
