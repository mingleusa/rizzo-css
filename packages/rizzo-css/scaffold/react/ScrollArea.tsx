import type { HTMLAttributes, ReactNode } from 'react';

export interface ScrollAreaProps extends HTMLAttributes<HTMLDivElement> {
  orientation?: 'vertical' | 'horizontal';
  children?: ReactNode;
  className?: string;
}

export function ScrollArea({
  orientation = 'vertical',
  className = '',
  children,
  ...rest
}: ScrollAreaProps) {
  const horizontal = orientation === 'horizontal';
  const classes = ['scroll-area', horizontal ? 'scroll-area--horizontal' : '', className]
    .filter(Boolean)
    .join(' ')
    .trim();
  return (
    <div className={classes} {...rest}>
      <div className="scroll-area__viewport" tabIndex={0}>
        {children}
      </div>
    </div>
  );
}

export default ScrollArea;
