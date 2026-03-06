import type { HTMLAttributes, ReactNode } from 'react';
import { useEffect, useRef, useCallback } from 'react';

const FOCUSABLE_SELECTORS = [
  'button:not([disabled])',
  'a[href]',
  'input:not([disabled])',
  'select:not([disabled])',
  'textarea:not([disabled])',
  '[tabindex]:not([tabindex="-1"])',
].join(', ');

function getFocusableElements(container: HTMLElement): HTMLElement[] {
  return Array.from(container.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTORS));
}

export interface ModalProps extends HTMLAttributes<HTMLDivElement> {
  id?: string;
  title?: string;
  size?: 'sm' | 'md' | 'lg';
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  closeOnOverlayClick?: boolean;
  closeOnEscape?: boolean;
  children?: ReactNode;
  footer?: ReactNode;
  className?: string;
}

export function Modal({
  id: idProp,
  title = 'Modal',
  size = 'md',
  open = false,
  onOpenChange,
  closeOnOverlayClick = true,
  closeOnEscape = true,
  children,
  footer,
  className = '',
  ...rest
}: ModalProps) {
  const modalId = idProp ?? `modal-${Math.random().toString(36).slice(2, 11)}`;
  const sizeClass = size !== 'md' ? `modal--${size}` : '';
  const classes = ['modal', sizeClass, className].filter(Boolean).join(' ').trim();
  const overlayRef = useRef<HTMLDivElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const previousActiveRef = useRef<HTMLElement | null>(null);

  const close = useCallback(() => {
    onOpenChange?.(false);
    previousActiveRef.current?.focus();
    previousActiveRef.current = null;
  }, [onOpenChange]);

  useEffect(() => {
    if (!open) return;
    previousActiveRef.current = document.activeElement as HTMLElement | null;
    const modalEl = modalRef.current;
    if (!modalEl) return;
    const focusable = getFocusableElements(modalEl);
    const closeBtn = modalEl.querySelector<HTMLElement>('[data-modal-close]');
    const first = focusable[0] ?? closeBtn;
    first?.focus();

    const keyHandler = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && closeOnEscape) {
        e.preventDefault();
        close();
        return;
      }
      if (e.key === 'Tab') {
        const focusableEls = getFocusableElements(modalEl);
        if (focusableEls.length === 0) return;
        const firstEl = focusableEls[0];
        const lastEl = focusableEls[focusableEls.length - 1];
        const active = document.activeElement as HTMLElement | null;
        if (e.shiftKey) {
          if (active === firstEl || !modalEl.contains(active)) {
            e.preventDefault();
            lastEl.focus();
          }
        } else {
          if (active === lastEl || !modalEl.contains(active)) {
            e.preventDefault();
            firstEl.focus();
          }
        }
      }
    };
    document.addEventListener('keydown', keyHandler);
    return () => document.removeEventListener('keydown', keyHandler);
  }, [open, closeOnEscape, close]);

  useEffect(() => {
    type ElementWithInert = HTMLElement & { inert?: boolean };
    if (overlayRef.current) (overlayRef.current as ElementWithInert).inert = !open;
    if (modalRef.current) (modalRef.current as ElementWithInert).inert = !open;
  }, [open]);

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (closeOnOverlayClick && e.target === overlayRef.current) close();
  };

  return (
    <div className="modal-root">
      <div
        ref={overlayRef}
        className="modal__overlay"
        data-modal-overlay
        aria-hidden={!open}
        {...(open ? {} : { inert: true })}
        {...(!open && { hidden: true })}
        id={`${modalId}-overlay`}
        onClick={handleOverlayClick}
        role="presentation"
      />
      <div
        ref={modalRef}
        className={classes}
        role="dialog"
        aria-modal="true"
        aria-labelledby={`${modalId}-title`}
        aria-hidden={!open}
        {...(open ? {} : { inert: true })}
        {...(!open && { hidden: true })}
        id={modalId}
        data-modal
        data-open={open || undefined}
        {...rest}
      >
        <div className="modal__header">
          <h2 id={`${modalId}-title`} className="modal__title">
            {title}
          </h2>
          <button type="button" className="modal__close" aria-label="Close modal" data-modal-close onClick={close}>
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M18 6L6 18" />
              <path d="M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div className="modal__body">{children}</div>
        {footer != null && <div className="modal__footer">{footer}</div>}
      </div>
    </div>
  );
}

export default Modal;
