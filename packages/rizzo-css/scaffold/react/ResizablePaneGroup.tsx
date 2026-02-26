import type { HTMLAttributes, ReactNode } from 'react';

export interface ResizablePaneGroupProps extends HTMLAttributes<HTMLDivElement> {
  id?: string;
  direction?: 'horizontal' | 'vertical';
  children?: ReactNode;
  className?: string;
}

export function ResizablePaneGroup({
  id: idProp,
  direction = 'horizontal',
  className = '',
  children,
  ...rest
}: ResizablePaneGroupProps) {
  const id = idProp ?? `resizable-${Math.random().toString(36).slice(2, 9)}`;
  const classes = [`resizable__pane-group`, `resizable__pane-group--${direction}`, className]
    .filter(Boolean)
    .join(' ')
    .trim();
  return (
    <div className={classes} id={id} data-resizable-group data-direction={direction} {...rest}>
      {children}
    </div>
  );
}

export default ResizablePaneGroup;
