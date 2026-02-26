import type { HTMLAttributes, ReactNode } from 'react';
import { useState, useRef } from 'react';

export interface HoverCardProps extends HTMLAttributes<HTMLDivElement> {
  id?: string;
  openDelay?: number;
  closeDelay?: number;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  children?: ReactNode;
  trigger?: ReactNode;
  className?: string;
}

export function HoverCard({
  id: idProp,
  openDelay = 200,
  closeDelay = 100,
  open = false,
  onOpenChange,
  children,
  trigger,
  className = '',
  ...rest
}: HoverCardProps) {
  const id = idProp ?? `hover-card-${Math.random().toString(36).slice(2, 9)}`;
  const openTRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const closeTRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const openContent = () => {
    if (closeTRef.current) clearTimeout(closeTRef.current);
    openTRef.current = setTimeout(() => onOpenChange?.(true), openDelay);
  };

  const closeContent = () => {
    if (openTRef.current) clearTimeout(openTRef.current);
    closeTRef.current = setTimeout(() => onOpenChange?.(false), closeDelay);
  };

  return (
    <div className={`hover-card ${className}`.trim()} data-hover-card id={id} {...rest}>
      <div data-hover-card-trigger onMouseEnter={openContent} onMouseLeave={closeContent}>
        {trigger}
      </div>
      <div
        className={`hover-card__content ${open ? 'hover-card__content--open' : ''}`.trim()}
        role="dialog"
        aria-hidden={!open}
        hidden={!open}
        data-hover-card-content
        id={`${id}-content`}
        onMouseEnter={openContent}
        onMouseLeave={closeContent}
      >
        {children}
      </div>
    </div>
  );
}

export default HoverCard;
