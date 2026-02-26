import type { HTMLAttributes, ReactNode } from 'react';
import { useState, useEffect } from 'react';

export interface PopoverProps extends HTMLAttributes<HTMLDivElement> {
  id?: string;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  children?: ReactNode;
  trigger?: ReactNode;
  className?: string;
}

export function Popover({
  id: idProp,
  open = false,
  onOpenChange,
  children,
  trigger,
  className = '',
  ...rest
}: PopoverProps) {
  const id = idProp ?? `popover-${Math.random().toString(36).slice(2, 9)}`;

  const toggle = (e: React.MouseEvent) => {
    e.preventDefault();
    onOpenChange?.(!open);
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as Node;
      if (target && !document.getElementById(id)?.contains(target)) {
        onOpenChange?.(false);
      }
    };
    if (open) {
      const t = setTimeout(() => document.addEventListener('click', handleClickOutside), 0);
      return () => {
        clearTimeout(t);
        document.removeEventListener('click', handleClickOutside);
      };
    }
  }, [open, id, onOpenChange]);

  return (
    <div className={`popover ${className}`.trim()} data-popover id={id} {...rest}>
      <span data-popover-trigger onClick={toggle}>
        {trigger}
      </span>
      <div
        className={`popover__content ${open ? 'popover__content--open' : ''}`.trim()}
        role="dialog"
        aria-modal="false"
        aria-hidden={!open}
        hidden={!open}
        data-popover-content
        id={`${id}-content`}
        onKeyDown={(e) => e.key === 'Escape' && onOpenChange?.(false)}
      >
        {children}
      </div>
    </div>
  );
}

export default Popover;
