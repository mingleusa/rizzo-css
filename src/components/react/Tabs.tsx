import type { HTMLAttributes, ReactNode } from 'react';
import { useState, useCallback, useRef } from 'react';

export interface Tab {
  id: string;
  label: string;
  icon?: string;
  content?: string;
}

export interface TabsProps extends HTMLAttributes<HTMLDivElement> {
  tabs: Tab[];
  id?: string;
  defaultTab?: string;
  variant?: 'default' | 'pills' | 'underline';
  children?: (activeTabId: string) => ReactNode;
  className?: string;
}

export function Tabs({
  tabs,
  id: idProp,
  defaultTab,
  variant = 'default',
  children,
  className = '',
  ...rest
}: TabsProps) {
  const defaultActiveId = defaultTab ?? tabs[0]?.id ?? '';
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const activeTabId = selectedId ?? defaultActiveId;
  const tabsId = idProp ?? `tabs-${Math.random().toString(36).slice(2, 11)}`;
  const variantClass = variant !== 'default' ? `tabs--${variant}` : '';
  const classes = ['tabs', variantClass, className].filter(Boolean).join(' ').trim();
  const tabListRef = useRef<HTMLDivElement>(null);

  const activateTab = useCallback(
    (index: number) => {
      if (index < 0 || index >= tabs.length) return;
      setSelectedId(tabs[index].id);
    },
    [tabs]
  );

  const handleKeydown = useCallback(
    (e: React.KeyboardEvent, index: number) => {
      let targetIndex = index;
      switch (e.key) {
        case 'ArrowRight':
        case 'ArrowDown':
          e.preventDefault();
          targetIndex = (index + 1) % tabs.length;
          break;
        case 'ArrowLeft':
        case 'ArrowUp':
          e.preventDefault();
          targetIndex = index === 0 ? tabs.length - 1 : index - 1;
          break;
        case 'Home':
          e.preventDefault();
          targetIndex = 0;
          break;
        case 'End':
          e.preventDefault();
          targetIndex = tabs.length - 1;
          break;
        case 'Enter':
        case ' ':
          e.preventDefault();
          activateTab(index);
          return;
        default:
          return;
      }
      activateTab(targetIndex);
      const buttons = tabListRef.current?.querySelectorAll('[role="tab"]');
      if (buttons && buttons[targetIndex]) (buttons[targetIndex] as HTMLElement).focus();
    },
    [tabs.length, activateTab]
  );

  return (
    <div className={classes} data-tabs={tabsId} {...rest}>
      <div className="tabs__list" role="tablist" aria-label="Tabs" ref={tabListRef}>
        {tabs.map((tab, index) => {
          const isActive = tab.id === activeTabId;
          return (
            <span
              key={tab.id}
              className={`tabs__tab ${isActive ? 'tabs__tab--active' : ''}`.trim()}
              id={`${tabsId}-tab-${tab.id}`}
              role="tab"
              tabIndex={isActive ? 0 : -1}
              aria-selected={isActive ? 'true' : 'false'}
              aria-controls={`${tabsId}-panel-${tab.id}`}
              data-tab-id={tab.id}
              data-tab-index={index}
              onClick={() => activateTab(index)}
              onKeyDown={(e) => handleKeydown(e, index)}
            >
              {tab.icon && (
                <img
                  src={tab.icon}
                  alt=""
                  className="tabs__tab-icon"
                  width={20}
                  height={20}
                  loading="lazy"
                  aria-hidden="true"
                />
              )}
              {tab.label}
            </span>
          );
        })}
      </div>
      <div className="tabs__panels-wrapper">
        {tabs.map((tab) => {
          const isActive = tab.id === activeTabId;
          return (
            <div
              key={tab.id}
              className={`tabs__panel ${isActive ? 'tabs__panel--active' : ''}`.trim()}
              id={`${tabsId}-panel-${tab.id}`}
              role="tabpanel"
              aria-labelledby={`${tabsId}-tab-${tab.id}`}
              aria-hidden={isActive ? 'false' : 'true'}
              data-panel-id={tab.id}
            >
              {tab.content ? (
                <div className="tabs__panel-content" dangerouslySetInnerHTML={{ __html: tab.content }} />
              ) : isActive && children ? (
                children(activeTabId)
              ) : null}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Tabs;
