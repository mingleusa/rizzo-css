import type { HTMLAttributes } from 'react';

export interface DirectionProps extends HTMLAttributes<HTMLDivElement> {
  dir?: 'ltr' | 'rtl';
  className?: string;
}

export function Direction({
  dir = 'ltr',
  className = '',
  children,
  ...rest
}: DirectionProps) {
  const dirClass = dir === 'rtl' ? 'direction--rtl' : 'direction--ltr';
  return (
    <div className={`direction ${dirClass} ${className}`.trim()} dir={dir} {...rest}>
      {children}
    </div>
  );
}

export default Direction;
