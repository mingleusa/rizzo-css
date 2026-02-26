import type { HTMLAttributes, ReactNode } from 'react';

export interface KbdProps extends HTMLAttributes<HTMLElement> {
  children?: ReactNode;
  className?: string;
}

export function Kbd({ className = '', children, ...rest }: KbdProps) {
  return (
    <kbd className={`kbd ${className}`.trim()} {...rest}>
      {children}
    </kbd>
  );
}

export default Kbd;
