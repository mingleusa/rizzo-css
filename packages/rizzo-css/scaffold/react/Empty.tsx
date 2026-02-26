import type { HTMLAttributes, ReactNode } from 'react';

export interface EmptyProps extends HTMLAttributes<HTMLDivElement> {
  title?: string;
  description?: string;
  icon?: ReactNode;
  action?: ReactNode;
  className?: string;
}

export function Empty({
  title = 'No results',
  description,
  icon,
  action,
  className = '',
  ...rest
}: EmptyProps) {
  return (
    <div className={`empty ${className}`.trim()} {...rest}>
      {icon && <div className="empty__icon">{icon}</div>}
      <h3 className="empty__title">{title}</h3>
      {description && <p className="empty__description">{description}</p>}
      {action && <div className="empty__action">{action}</div>}
    </div>
  );
}

export default Empty;
