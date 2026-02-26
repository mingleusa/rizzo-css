import type { LabelHTMLAttributes, ReactNode } from 'react';

export interface LabelProps extends LabelHTMLAttributes<HTMLLabelElement> {
  children?: ReactNode;
  className?: string;
}

export function Label({ className = '', children, ...rest }: LabelProps) {
  return (
    <label className={`label ${className}`.trim()} {...rest}>
      {children}
    </label>
  );
}

export default Label;
