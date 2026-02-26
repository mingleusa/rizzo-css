import type { HTMLAttributes, ReactNode } from 'react';
import { useState } from 'react';

export interface CollapsibleProps extends HTMLAttributes<HTMLDivElement> {
  id?: string;
  defaultOpen?: boolean;
  triggerLabel?: string;
  children?: ReactNode;
  className?: string;
}

export function Collapsible({
  id: idProp,
  defaultOpen = false,
  triggerLabel = 'Toggle',
  children,
  className = '',
  ...rest
}: CollapsibleProps) {
  const id = idProp ?? `collapsible-${Math.random().toString(36).slice(2, 9)}`;
  const triggerId = `${id}-trigger`;
  const panelId = `${id}-panel`;
  const [open, setOpen] = useState(defaultOpen);

  const triggerClasses = ['collapsible__trigger', open ? 'collapsible__trigger--open' : ''].filter(Boolean).join(' ');
  const panelClasses = ['collapsible__panel', open ? 'collapsible__panel--open' : ''].filter(Boolean).join(' ');

  return (
    <div className={`collapsible ${className}`.trim()} data-collapsible id={id} {...rest}>
      <button
        type="button"
        className={triggerClasses}
        id={triggerId}
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((o) => !o)}
      >
        <span className="collapsible__trigger-label">{triggerLabel}</span>
        <span className="collapsible__icon" aria-hidden="true">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="m6 9 6 6 6-6" />
          </svg>
        </span>
      </button>
      <div
        className={panelClasses}
        id={panelId}
        role="region"
        aria-labelledby={triggerId}
        hidden={!open}
      >
        <div className="collapsible__panel-inner">{children}</div>
      </div>
    </div>
  );
}

export default Collapsible;
