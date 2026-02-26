import type { HTMLAttributes, ReactNode } from 'react';

export interface IconsProps extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode;
  className?: string;
}

export function Icons({ children, className = '', ...rest }: IconsProps) {
  return (
    <div className={`icons-grid ${className}`.trim()} data-icons-grid {...rest}>
      {children ?? (
        <>
          <div className="icons-grid__item"><span className="kbd">Icon 1</span></div>
          <div className="icons-grid__item"><span className="kbd">Icon 2</span></div>
          <div className="icons-grid__item"><span className="kbd">Icon 3</span></div>
        </>
      )}
    </div>
  );
}

export default Icons;
