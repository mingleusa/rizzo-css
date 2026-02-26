import type { HTMLAttributes } from 'react';
import { useState, useCallback } from 'react';

export interface AccordionItem {
  id: string;
  title: string;
  content?: string;
}

export interface AccordionProps extends HTMLAttributes<HTMLDivElement> {
  items: AccordionItem[];
  id?: string;
  allowMultiple?: boolean;
  defaultExpanded?: string | string[];
  className?: string;
}

export function Accordion({
  items,
  id: idProp,
  allowMultiple = false,
  defaultExpanded,
  className = '',
  ...rest
}: AccordionProps) {
  const accordionId = idProp ?? `accordion-${Math.random().toString(36).slice(2, 11)}`;

  function getInitialExpanded(): Set<string> {
    if (defaultExpanded === undefined) return new Set(items[0] ? [items[0].id] : []);
    if (typeof defaultExpanded === 'string') return new Set([defaultExpanded]);
    return new Set(defaultExpanded);
  }

  const [expanded, setExpanded] = useState<Set<string>>(getInitialExpanded);

  const toggle = useCallback(
    (itemId: string) => {
      setExpanded((prev) => {
        const next = new Set(prev);
        if (allowMultiple) {
          if (next.has(itemId)) next.delete(itemId);
          else next.add(itemId);
        } else {
          next.clear();
          if (!prev.has(itemId)) next.add(itemId);
        }
        return next;
      });
    },
    [allowMultiple]
  );

  const handleKeydown = useCallback(
    (e: React.KeyboardEvent, itemId: string, index: number) => {
      const triggers = e.currentTarget?.parentElement?.querySelectorAll?.('[data-accordion-trigger]') ?? [];
      const len = triggers.length;
      let targetIndex = index;
      switch (e.key) {
        case 'ArrowDown':
          e.preventDefault();
          targetIndex = Math.min(index + 1, len - 1);
          break;
        case 'ArrowUp':
          e.preventDefault();
          targetIndex = Math.max(index - 1, 0);
          break;
        case 'Home':
          e.preventDefault();
          targetIndex = 0;
          break;
        case 'End':
          e.preventDefault();
          targetIndex = len - 1;
          break;
        case 'Enter':
        case ' ':
          e.preventDefault();
          toggle(itemId);
          return;
        default:
          return;
      }
      if (targetIndex !== index && triggers[targetIndex]) (triggers[targetIndex] as HTMLElement).focus();
    },
    [toggle]
  );

  const classes = ['accordion', className].filter(Boolean).join(' ').trim();

  return (
    <div
      className={classes}
      data-accordion={accordionId}
      data-allow-multiple={allowMultiple ? 'true' : 'false'}
      {...rest}
    >
      {items.map((item, i) => {
        const triggerId = `${accordionId}-trigger-${item.id}`;
        const panelId = `${accordionId}-panel-${item.id}`;
        const isExpanded = expanded.has(item.id);
        return (
          <div key={item.id} className="accordion__item" data-accordion-item data-item-id={item.id}>
            <h3 className="accordion__heading">
              <button
                type="button"
                className={`accordion__trigger ${isExpanded ? 'accordion__trigger--expanded' : ''}`.trim()}
                id={triggerId}
                aria-expanded={isExpanded}
                aria-controls={panelId}
                data-accordion-trigger
                onClick={() => toggle(item.id)}
                onKeyDown={(e) => handleKeydown(e, item.id, i)}
              >
                <span className="accordion__title">{item.title}</span>
                <span className="accordion__icon" aria-hidden="true">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="m6 9 6 6 6-6" />
                  </svg>
                </span>
              </button>
            </h3>
            <div
              className={`accordion__panel ${isExpanded ? 'accordion__panel--expanded' : ''}`.trim()}
              id={panelId}
              role="region"
              aria-labelledby={triggerId}
              hidden={!isExpanded}
              data-accordion-panel
            >
              <div className="accordion__panel-inner">
                <div className="accordion__panel-content">
                  {item.content && <div dangerouslySetInnerHTML={{ __html: item.content }} />}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default Accordion;
