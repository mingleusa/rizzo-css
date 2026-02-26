import type { HTMLAttributes, ReactNode } from 'react';

export interface ToggleGroupProps extends HTMLAttributes<HTMLDivElement> {
  type?: 'single' | 'multiple';
  orientation?: 'horizontal' | 'vertical';
  children?: ReactNode;
  className?: string;
}

export function ToggleGroup({
  type = 'single',
  orientation = 'horizontal',
  className = '',
  children,
  ...rest
}: ToggleGroupProps) {
  const orientationClass = orientation === 'vertical' ? 'toggle-group--vertical' : '';
  const role = type === 'single' ? 'radiogroup' : 'group';
  const classes = ['toggle-group', orientationClass, className].filter(Boolean).join(' ').trim();
  return (
    <div
      className={classes}
      role={role}
      aria-label="Toggle group"
      data-toggle-group
      data-toggle-type={type}
      {...rest}
    >
      {children}
    </div>
  );
}

export default ToggleGroup;
