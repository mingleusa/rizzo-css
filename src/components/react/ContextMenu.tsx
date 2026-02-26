import type { HTMLAttributes, ReactNode } from 'react';
import { useState, useRef, useEffect } from 'react';

export interface ContextMenuProps extends HTMLAttributes<HTMLDivElement> {
  id?: string;
  children?: ReactNode;
  trigger?: ReactNode;
  className?: string;
}

export function ContextMenu({
  id: idProp,
  children,
  trigger,
  className = '',
  ...rest
}: ContextMenuProps) {
  const id = idProp ?? `context-menu-${Math.random().toString(36).slice(2, 9)}`;
  const [open, setOpen] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const contentRef = useRef<HTMLDivElement>(null);

  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    setPosition({ x: e.clientX, y: e.clientY });
    setOpen(true);
    requestAnimationFrame(() => document.addEventListener('click', closeMenu));
  };

  const closeMenu = () => {
    setOpen(false);
    document.removeEventListener('click', closeMenu);
  };

  const handleKeydown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') closeMenu();
  };

  useEffect(() => {
    if (open && contentRef.current) {
      contentRef.current.style.left = `${position.x}px`;
      contentRef.current.style.top = `${position.y}px`;
    }
  }, [open, position]);

  return (
    <div className={`context-menu ${className}`.trim()} data-context-menu id={id} {...rest}>
      <div data-context-menu-trigger onContextMenu={handleContextMenu}>
        {trigger}
      </div>
      <div
        ref={contentRef}
        className={`context-menu__content ${open ? 'context-menu__content--open' : ''}`.trim()}
        role="menu"
        aria-hidden={!open}
        hidden={!open}
        data-context-menu-content
        id={`${id}-content`}
        onKeyDown={handleKeydown}
      >
        {children}
      </div>
    </div>
  );
}

export default ContextMenu;
