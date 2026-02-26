import type { HTMLAttributes, ReactNode } from 'react';

export interface ResizablePaneProps extends HTMLAttributes<HTMLDivElement> {
  defaultSize?: number;
  children?: ReactNode;
  className?: string;
}

export function ResizablePane({
  defaultSize = 50,
  className = '',
  children,
  style,
  ...rest
}: ResizablePaneProps) {
  const size = Math.min(100, Math.max(0, defaultSize));
  return (
    <div
      className={`resizable__pane ${className}`.trim()}
      data-resizable-pane
      style={{ flex: `1 1 ${size}%`, ...(style as object) }}
      {...rest}
    >
      {children}
    </div>
  );
}

export default ResizablePane;
