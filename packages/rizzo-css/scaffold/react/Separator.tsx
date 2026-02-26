import type { HTMLAttributes } from 'react';

export interface SeparatorProps extends HTMLAttributes<HTMLDivElement> {
  orientation?: 'horizontal' | 'vertical';
  decorative?: boolean;
  className?: string;
}

export function Separator({
  orientation = 'horizontal',
  decorative = true,
  className = '',
  ...rest
}: SeparatorProps) {
  const classes = [
    'separator',
    `separator--${orientation}`,
    className,
  ]
    .filter(Boolean)
    .join(' ')
    .trim();
  return (
    <div
      className={classes}
      role={decorative ? 'none' : 'separator'}
      aria-orientation={decorative ? undefined : orientation}
      {...rest}
    />
  );
}

export default Separator;
