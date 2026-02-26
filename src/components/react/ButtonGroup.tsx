import type { HTMLAttributes, ReactNode } from 'react';

export interface ButtonGroupProps extends HTMLAttributes<HTMLDivElement> {
  orientation?: 'horizontal' | 'vertical';
  children?: ReactNode;
  className?: string;
}

export function ButtonGroup({
  orientation = 'horizontal',
  className = '',
  children,
  ...rest
}: ButtonGroupProps) {
  const orientationClass = orientation === 'vertical' ? 'button-group--vertical' : '';
  const classes = ['button-group', orientationClass, className].filter(Boolean).join(' ').trim();
  return (
    <div className={classes} role="group" {...rest}>
      {children}
    </div>
  );
}

export default ButtonGroup;
