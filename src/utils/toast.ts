/**
 * Toast Manager - Programmatic toast notification system
 * 
 * Creates and manages toast notifications dynamically.
 * Toasts are automatically positioned and stacked.
 */

export interface ToastOptions {
  variant?: 'success' | 'error' | 'warning' | 'info';
  dismissible?: boolean;
  autoDismiss?: number; // Duration in milliseconds (0 = disabled)
  position?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left' | 'top-center' | 'bottom-center';
  id?: string;
}

const defaultOptions: Required<ToastOptions> = {
  variant: 'info',
  dismissible: true,
  autoDismiss: 5000,
  position: 'top-right',
  id: '',
};

/**
 * Show a toast notification
 */
export function showToast(message: string, options: ToastOptions = {}): string {
  const opts = { ...defaultOptions, ...options };
  const toastId = opts.id || `toast-${Math.random().toString(36).substr(2, 9)}`;
  
  // Get or create toast container
  const container = getOrCreateToastContainer(opts.position);
  
  // Create toast element
  const toast = document.createElement('div');
  toast.className = 'alert';
  toast.id = toastId;
  toast.setAttribute('role', 'alert');
  toast.setAttribute('aria-live', 'polite');
  toast.setAttribute('aria-atomic', 'true');
  
  // Add variant class
  toast.classList.add(`alert--${opts.variant}`);
  
  // Set ARIA label
  const ariaLabels = {
    success: 'Success message',
    error: 'Error message',
    warning: 'Warning message',
    info: 'Information message',
  };
  toast.setAttribute('aria-label', ariaLabels[opts.variant]);
  
  // Create content
  const content = document.createElement('div');
  content.className = 'alert__content';
  content.textContent = message;
  toast.appendChild(content);
  
  // Add close button if dismissible
  if (opts.dismissible) {
    const closeBtn = document.createElement('button');
    closeBtn.type = 'button';
    closeBtn.className = 'alert__close';
    closeBtn.setAttribute('aria-label', 'Dismiss alert');
    closeBtn.setAttribute('data-alert-close', '');
    closeBtn.setAttribute('aria-controls', toastId);
    
    // Close icon (simple X)
    closeBtn.innerHTML = `
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <line x1="4" y1="4" x2="12" y2="12"></line>
        <line x1="12" y1="4" x2="4" y2="12"></line>
      </svg>
    `;
    
    toast.appendChild(closeBtn);
  }
  
  // Add to container
  container.appendChild(toast);
  
  // Initialize dismiss functionality
  setupToastDismiss(toast, opts.autoDismiss);
  
  // Trigger animation
  requestAnimationFrame(() => {
    toast.style.opacity = '1';
    toast.style.transform = 'translateY(0)';
  });
  
  return toastId;
}

/**
 * Get or create toast container for a position
 */
function getOrCreateToastContainer(position: ToastOptions['position'] = 'top-right'): HTMLElement {
  const containerId = `toast-container-${position}`;
  let container = document.getElementById(containerId);
  
  if (!container) {
    container = document.createElement('div');
    container.id = containerId;
    container.className = `toast-container toast-container--${position}`;
    document.body.appendChild(container);
  }
  
  return container;
}

/**
 * Setup dismiss functionality for a toast
 */
function setupToastDismiss(toast: HTMLElement, autoDismiss: number): void {
  const dismissToast = () => {
    // Announce dismissal to screen readers
    const announcement = document.createElement('div');
    announcement.setAttribute('role', 'status');
    announcement.setAttribute('aria-live', 'polite');
    announcement.className = 'sr-only';
    announcement.textContent = 'Toast dismissed';
    document.body.appendChild(announcement);
    
    // Remove toast with animation
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(-10px)';
    
    setTimeout(() => {
      toast.remove();
      if (document.body.contains(announcement)) {
        document.body.removeChild(announcement);
      }
      
      // Remove container if empty
      const container = toast.parentElement;
      if (container && container.classList.contains('toast-container') && container.children.length === 0) {
        container.remove();
      }
    }, 200);
  };
  
  // Auto-dismiss
  if (autoDismiss > 0) {
    const timeoutId = setTimeout(dismissToast, autoDismiss);
    
    // Clear timeout if manually dismissed
    const originalDismiss = dismissToast;
    const dismissWithCleanup = () => {
      clearTimeout(timeoutId);
      originalDismiss();
    };
    
    // Manual dismiss
    const closeBtn = toast.querySelector('[data-alert-close]');
    if (closeBtn) {
      closeBtn.addEventListener('click', dismissWithCleanup);
      closeBtn.addEventListener('keydown', (e: KeyboardEvent) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          dismissWithCleanup();
        }
      });
    }
  } else {
    // Manual dismiss only
    const closeBtn = toast.querySelector('[data-alert-close]');
    if (closeBtn) {
      closeBtn.addEventListener('click', dismissToast);
      closeBtn.addEventListener('keydown', (e: KeyboardEvent) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          dismissToast();
        }
      });
    }
  }
}

/**
 * Remove a specific toast by ID
 */
export function removeToast(toastId: string): void {
  const toast = document.getElementById(toastId);
  if (toast) {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(-10px)';
    setTimeout(() => {
      toast.remove();
      const container = toast.parentElement;
      if (container && container.classList.contains('toast-container') && container.children.length === 0) {
        container.remove();
      }
    }, 200);
  }
}

/**
 * Remove all toasts
 */
export function removeAllToasts(): void {
  const containers = document.querySelectorAll('.toast-container');
  containers.forEach((container) => {
    const toasts = container.querySelectorAll('.alert');
    toasts.forEach((toast) => {
      (toast as HTMLElement).style.opacity = '0';
      (toast as HTMLElement).style.transform = 'translateY(-10px)';
    });
    setTimeout(() => {
      container.remove();
    }, 200);
  });
}

// Expose globally for easy access (types in src/global.d.ts)
if (typeof window !== 'undefined') {
  window.showToast = showToast;
  window.removeToast = removeToast;
  window.removeAllToasts = removeAllToasts;
}
