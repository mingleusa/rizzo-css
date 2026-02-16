<script lang="ts">
  import { tick } from 'svelte';
  import type { Snippet } from 'svelte';

  interface Props {
    id?: string;
    title?: string;
    size?: 'sm' | 'md' | 'lg';
    open?: boolean;
    closeOnOverlayClick?: boolean;
    closeOnEscape?: boolean;
    class?: string;
    children?: Snippet;
    footer?: Snippet;
  }

  let {
    id,
    title = 'Modal',
    size = 'md',
    open = $bindable(false),
    closeOnOverlayClick = true,
    closeOnEscape = true,
    class: className = '',
    children,
    footer,
  }: Props = $props();

  const modalId = $derived(id ?? `modal-${Math.random().toString(36).slice(2, 11)}`);
  const sizeClass = $derived(size !== 'md' ? `modal--${size}` : '');
  const classes = $derived(['modal', sizeClass, className].filter(Boolean).join(' ').trim());

  let overlayEl: HTMLDivElement;
  let modalEl: HTMLDivElement;
  let previousActiveElement: HTMLElement | null = null;
  let keyHandler: ((e: KeyboardEvent) => void) | null = null;

  const focusableSelectors = [
    'button:not([disabled])',
    'a[href]',
    'input:not([disabled])',
    'select:not([disabled])',
    'textarea:not([disabled])',
    '[tabindex]:not([tabindex="-1"])',
  ].join(', ');

  function getFocusableElements(container: HTMLElement): HTMLElement[] {
    return Array.from(container.querySelectorAll<HTMLElement>(focusableSelectors));
  }

  function close() {
    open = false;
    if (keyHandler) {
      document.removeEventListener('keydown', keyHandler);
      keyHandler = null;
    }
    if (previousActiveElement) {
      previousActiveElement.focus();
      previousActiveElement = null;
    }
  }

  function setupFocusTrap() {
    if (!modalEl) return;
    keyHandler = (e: KeyboardEvent) => {
      if (!open) return;
      if (e.key === 'Escape' && closeOnEscape) {
        e.preventDefault();
        close();
        return;
      }
      if (e.key === 'Tab') {
        const focusable = getFocusableElements(modalEl);
        if (focusable.length === 0) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        const active = document.activeElement as HTMLElement | null;
        if (e.shiftKey) {
          if (active === first || !modalEl.contains(active)) {
            e.preventDefault();
            last.focus();
          }
        } else {
          if (active === last || !modalEl.contains(active)) {
            e.preventDefault();
            first.focus();
          }
        }
      }
    };
    document.addEventListener('keydown', keyHandler);
  }

  function openModal() {
    previousActiveElement = document.activeElement as HTMLElement | null;
    const focusable = modalEl ? getFocusableElements(modalEl) : [];
    const closeBtn = modalEl?.querySelector<HTMLElement>('[data-modal-close]');
    const first = focusable[0] ?? closeBtn;
    tick().then(() => {
      first?.focus();
      setupFocusTrap();
    });
  }

  $effect(() => {
    if (open && modalEl) {
      openModal();
    } else {
      if (keyHandler) {
        document.removeEventListener('keydown', keyHandler);
        keyHandler = null;
      }
    }
  });

  $effect(() => {
    if (overlayEl) overlayEl.inert = !open;
    if (modalEl) modalEl.inert = !open;
  });

  function handleOverlayClick(e: MouseEvent) {
    if (closeOnOverlayClick && e.target === overlayEl) close();
  }
</script>

<div
  bind:this={overlayEl}
  class="modal__overlay"
  data-modal-overlay
  aria-hidden={!open}
  inert={!open ? true : undefined}
  hidden={open ? undefined : true}
  id="{modalId}-overlay"
  onclick={handleOverlayClick}
  role="presentation"
></div>

<div
  bind:this={modalEl}
  class={classes}
  role="dialog"
  aria-modal="true"
  aria-labelledby="{modalId}-title"
  aria-hidden={!open}
  inert={!open ? true : undefined}
  hidden={open ? undefined : true}
  id={modalId}
  data-modal
  data-open={open || undefined}
>
  <div class="modal__header">
    <h2 id="{modalId}-title" class="modal__title">{title}</h2>
    <button type="button" class="modal__close" aria-label="Close modal" data-modal-close onclick={close}>
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
        <path d="M18 6L6 18" />
        <path d="M6 6l12 12" />
      </svg>
    </button>
  </div>
  <div class="modal__body">
    {@render children?.()}
  </div>
  <div class="modal__footer">
    {@render footer?.()}
  </div>
</div>
