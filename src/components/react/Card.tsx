import type { HTMLAttributes, ReactNode } from 'react';

export type CardVariant = 'default' | 'elevated' | 'outlined' | 'filled';

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: CardVariant;
  children?: ReactNode;
  className?: string;
}

export function Card({
  variant = 'default',
  className = '',
  children,
  ...rest
}: CardProps) {
  const variantClass = variant !== 'default' ? `card--${variant}` : '';
  const classes = ['card', variantClass, className].filter(Boolean).join(' ').trim();
  return (
    <div className={classes} {...rest}>
      {children}
    </div>
  );
}

export default Card;
