import type { HTMLAttributes } from 'react';

export interface DividerProps extends HTMLAttributes<HTMLDivElement> {
  orientation?: 'horizontal' | 'vertical';
  label?: string;
  className?: string;
}

export function Divider({
  orientation = 'horizontal',
  label,
  className = '',
  ...rest
}: DividerProps) {
  const hasLabel = typeof label === 'string' && label.trim().length > 0;
  const labelText = label?.trim() ?? '';
  const classes = [
    'divider',
    `divider--${orientation}`,
    hasLabel ? 'divider--labeled' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ')
    .trim();
  return (
    <div
      className={classes}
      role="separator"
      aria-orientation={orientation}
      aria-label={labelText || undefined}
      {...rest}
    >
      {hasLabel && orientation === 'horizontal' ? (
        <>
          <span className="divider__line" aria-hidden="true" />
          <span className="divider__label">{labelText}</span>
          <span className="divider__line" aria-hidden="true" />
        </>
      ) : (
        <span className="divider__line" aria-hidden="true" />
      )}
    </div>
  );
}

export default Divider;
