/**
 * Focus trap and focus restoration utilities for dialogs and overlays.
 * Use in Modal, Search, Settings, and any overlay that should keep focus inside until closed.
 * WCAG: focus moves into the container when opened; Tab cycles within; Escape closes; focus restores on close.
 *
 * @module utils/focus-trap
 */

const FOCUSABLE_SELECTOR = [
  'button:not([disabled])',
  'a[href]',
  'input:not([disabled])',
  'select:not([disabled])',
  'textarea:not([disabled])',
  '[tabindex]:not([tabindex="-1"])',
].join(', ');

/**
 * Get elements that can receive focus inside a container.
 * @param {HTMLElement} container
 * @returns {HTMLElement[]}
 */
export function getFocusableElements(container) {
  if (!container || !container.querySelectorAll) return [];
  return Array.from(container.querySelectorAll(FOCUSABLE_SELECTOR));
}

/**
 * Set focusable descendants to tabindex="-1" so they are not in tab order (e.g. when dialog is closed).
 * Stores previous tabindex in data-focus-trap-previous-tabindex for restore.
 * @param {HTMLElement} container
 */
export function setFocusablesInert(container) {
  getFocusableElements(container).forEach((el) => {
    if (el.getAttribute('tabindex') !== '-1') {
      el.setAttribute('data-focus-trap-previous-tabindex', el.getAttribute('tabindex') || '0');
      el.setAttribute('tabindex', '-1');
    }
  });
}

/**
 * Restore focusable descendants to their previous tabindex (after setFocusablesInert).
 * @param {HTMLElement} container
 */
export function restoreFocusables(container) {
  if (!container) return;
  container.querySelectorAll('[data-focus-trap-previous-tabindex]').forEach((el) => {
    const prev = el.getAttribute('data-focus-trap-previous-tabindex');
    el.setAttribute('tabindex', prev || '0');
    el.removeAttribute('data-focus-trap-previous-tabindex');
  });
}

/**
 * Create a focus trap for a container (e.g. dialog, overlay panel).
 * - Listens for Tab/Shift+Tab and cycles focus within the container.
 * - Optionally handles Escape and calls onEscape; call restoreFocus() on close.
 *
 * @param {HTMLElement} container - The element that should trap focus (e.g. .modal, .settings__panel).
 * @param {Object} [options]
 * @param {() => void} [options.onEscape] - Called when Escape is pressed; typically close the overlay.
 * @param {HTMLElement} [options.initialFocus] - Element to focus when trap activates; default first focusable or container.
 * @returns {{ activate: () => void, deactivate: () => void, restoreFocus: (element?: HTMLElement | null) => void }}
 */
export function createFocusTrap(container, options = {}) {
  const { onEscape, initialFocus } = options;
  let previousActiveElement = null;
  let keydownHandler = null;

  function activate() {
    previousActiveElement = document.activeElement;
    const focusable = getFocusableElements(container);
    const first = focusable[0];
    const target = initialFocus || first || container;
    if (target && target.focus) {
      if (typeof requestAnimationFrame !== 'undefined') {
        requestAnimationFrame(() => target.focus());
      } else {
        setTimeout(() => target.focus(), 0);
      }
    }

    keydownHandler = (e) => {
      if (e.key === 'Escape' && onEscape) {
        e.preventDefault();
        onEscape();
        return;
      }
      if (e.key === 'Tab') {
        const focusableEls = getFocusableElements(container);
        if (focusableEls.length === 0) return;
        const firstEl = focusableEls[0];
        const lastEl = focusableEls[focusableEls.length - 1];
        const active = document.activeElement;

        if (e.shiftKey) {
          if (active === firstEl || !container.contains(active)) {
            e.preventDefault();
            lastEl.focus();
          }
        } else {
          if (active === lastEl || !container.contains(active)) {
            e.preventDefault();
            firstEl.focus();
          }
        }
      }
    };

    document.addEventListener('keydown', keydownHandler);
  }

  function deactivate() {
    if (keydownHandler) {
      document.removeEventListener('keydown', keydownHandler);
      keydownHandler = null;
    }
  }

  function restoreFocus(element) {
    const el = element !== undefined ? element : previousActiveElement;
    if (el && el.focus) el.focus();
    previousActiveElement = null;
  }

  return { activate, deactivate, restoreFocus };
}
