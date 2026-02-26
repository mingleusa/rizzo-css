import type { HTMLAttributes } from 'react';

export interface ResizableHandleProps extends HTMLAttributes<HTMLDivElement> {
  withHandle?: boolean;
  className?: string;
}

export function ResizableHandle({
  withHandle = false,
  className = '',
  ...rest
}: ResizableHandleProps) {
  const classes = [
    'resizable__handle',
    withHandle ? 'resizable__handle--with-handle' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ')
    .trim();
  return <div className={classes} data-resizable-handle {...rest} />;
}

export default ResizableHandle;
