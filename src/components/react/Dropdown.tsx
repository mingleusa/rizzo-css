import type { ReactNode } from 'react';
import { useState, useRef, useEffect } from 'react';

export interface MenuItem {
  label: string;
  value?: string;
  href?: string;
  onClick?: (value: string) => void;
  disabled?: boolean;
  separator?: boolean;
  submenu?: MenuItem[];
}

export interface DropdownProps {
  trigger: string;
  items: MenuItem[];
  id?: string;
  className?: string;
  position?: 'left' | 'right';
  align?: 'start' | 'end';
}

export function Dropdown({
  trigger,
  items,
  id: idProp,
  className = '',
  position = 'left',
  align = 'start',
}: DropdownProps) {
  const dropdownId = idProp ?? `dropdown-${Math.random().toString(36).slice(2, 11)}`;
  const menuId = `${dropdownId}-menu`;
  const triggerId = `${dropdownId}-trigger`;
  const [open, setOpen] = useState(false);
  const [openSubmenuIndex, setOpenSubmenuIndex] = useState<number | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  const closeMenu = () => {
    setOpen(false);
    setOpenSubmenuIndex(null);
  };

  const toggleSubmenu = (index: number) => {
    setOpenSubmenuIndex((prev) => (prev === index ? null : index));
  };

  const handleItemClick = (item: MenuItem, e: React.MouseEvent) => {
    if (item.separator || item.disabled) return;
    if (item.submenu?.length) {
      e.preventDefault();
      return;
    }
    if (item.href) window.location.href = item.href;
    item.onClick?.(item.value ?? item.label);
    closeMenu();
  };

  useEffect(() => {
    const handleKeydown = (e: KeyboardEvent) => {
      if (!open) return;
      if (e.key === 'Escape') {
        e.preventDefault();
        closeMenu();
        triggerRef.current?.focus();
      }
    };
    document.addEventListener('keydown', handleKeydown);
    return () => document.removeEventListener('keydown', handleKeydown);
  }, [open]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        menuRef.current &&
        triggerRef.current &&
        !menuRef.current.contains(e.target as Node) &&
        !triggerRef.current.contains(e.target as Node)
      ) {
        closeMenu();
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  const classes = ['dropdown', className].filter(Boolean).join(' ').trim();
  const menuClasses = `dropdown__menu dropdown__menu--${position} dropdown__menu--${align} ${open ? 'dropdown__menu--open' : ''}`.trim();

  return (
    <div className={classes} data-dropdown={dropdownId}>
      <button
        ref={triggerRef}
        type="button"
        className="dropdown__trigger"
        id={triggerId}
        aria-expanded={open}
        aria-haspopup="true"
        aria-controls={menuId}
        aria-label={trigger}
        onClick={() => setOpen((o) => !o)}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            setOpen((o) => !o);
          }
          if (e.key === 'ArrowDown' && !open) {
            e.preventDefault();
            setOpen(true);
          }
        }}
      >
        <span className="dropdown__trigger-text">{trigger}</span>
        <span className="dropdown__icon" aria-hidden="true">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="m6 9 6 6 6-6" />
          </svg>
        </span>
      </button>
      <div
        ref={menuRef}
        className={menuClasses}
        id={menuId}
        role="menu"
        aria-labelledby={triggerId}
        aria-label={`${trigger} menu`}
        aria-orientation="vertical"
        aria-hidden={!open}
        tabIndex={-1}
      >
        {items.map((item, index) => {
          if (item.separator) {
            return <div key={index} className="dropdown__separator" role="separator" />;
          }
          const hasSubmenu = item.submenu && item.submenu.length > 0;
          const isSubmenuOpen = openSubmenuIndex === index;
          return (
            <div
              key={index}
              className={`dropdown__item-wrapper ${hasSubmenu ? 'dropdown__item-wrapper--has-submenu' : ''}`.trim()}
            >
              {item.href && !hasSubmenu ? (
                <a
                  className={`dropdown__item ${item.disabled ? 'dropdown__item--disabled' : ''}`.trim()}
                  role="menuitem"
                  href={item.href}
                  aria-label={item.label}
                  aria-disabled={item.disabled ? 'true' : undefined}
                  tabIndex={open ? 0 : -1}
                  onClick={(e) => {
                    if (item.disabled) e.preventDefault();
                    else closeMenu();
                  }}
                >
                  <span>{item.label}</span>
                </a>
              ) : (
                <div
                  className={`dropdown__item ${item.disabled ? 'dropdown__item--disabled' : ''} ${hasSubmenu ? 'dropdown__item--has-submenu' : ''}`.trim()}
                  role="menuitem"
                  aria-disabled={item.disabled ? 'true' : undefined}
                  aria-expanded={hasSubmenu ? isSubmenuOpen : undefined}
                  aria-haspopup={hasSubmenu ? 'true' : undefined}
                  tabIndex={open ? 0 : -1}
                  onClick={(e) => {
                    if (item.disabled) return;
                    if (hasSubmenu) {
                      e.preventDefault();
                      toggleSubmenu(index);
                    } else {
                      handleItemClick(item, e);
                    }
                  }}
                  onKeyDown={(e) => {
                    if (item.disabled) return;
                    if (hasSubmenu && (e.key === 'Enter' || e.key === ' ' || e.key === 'ArrowRight')) {
                      e.preventDefault();
                      toggleSubmenu(index);
                    } else if (!hasSubmenu && (e.key === 'Enter' || e.key === ' ')) {
                      e.preventDefault();
                      handleItemClick(item, e as unknown as React.MouseEvent);
                    }
                  }}
                >
                  <span>{item.label}</span>
                  {hasSubmenu && (
                    <span className="dropdown__item-arrow" aria-hidden="true">
                      <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="m9 6 6 6-6 6" />
                      </svg>
                    </span>
                  )}
                </div>
              )}
              {hasSubmenu && item.submenu && (
                <div
                  className={`dropdown__submenu ${isSubmenuOpen ? 'dropdown__submenu--open' : ''}`.trim()}
                  role="menu"
                  aria-label={`${item.label} submenu`}
                  aria-hidden={!isSubmenuOpen}
                >
                  {item.submenu.map((subItem, i) =>
                    subItem.separator ? (
                      <div key={i} className="dropdown__separator" role="separator" />
                    ) : subItem.href ? (
                      <a
                        key={i}
                        className={`dropdown__item dropdown__submenu-item ${subItem.disabled ? 'dropdown__item--disabled' : ''}`.trim()}
                        role="menuitem"
                        href={subItem.href}
                        aria-label={subItem.label}
                        aria-disabled={subItem.disabled ? 'true' : undefined}
                        onClick={(e) => {
                          if (subItem.disabled) e.preventDefault();
                          else closeMenu();
                        }}
                      >
                        <span>{subItem.label}</span>
                      </a>
                    ) : (
                      <div
                        key={i}
                        className={`dropdown__item dropdown__submenu-item ${subItem.disabled ? 'dropdown__item--disabled' : ''}`.trim()}
                        role="menuitem"
                        aria-disabled={subItem.disabled ? 'true' : undefined}
                        tabIndex={open ? 0 : -1}
                        onClick={(e) => {
                          if (!subItem.disabled) {
                            subItem.onClick?.(subItem.value ?? subItem.label);
                            closeMenu();
                          }
                        }}
                        onKeyDown={(e) => {
                          if (subItem.disabled) return;
                          if (e.key === 'Enter' || e.key === ' ') {
                            e.preventDefault();
                            subItem.onClick?.(subItem.value ?? subItem.label);
                            closeMenu();
                          }
                        }}
                      >
                        <span>{subItem.label}</span>
                      </div>
                    )
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Dropdown;
