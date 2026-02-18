/**
 * Global type augmentations for Rizzo CSS.
 * Toast APIs are attached to window by utils/toast.ts for layout scripts.
 */
import type { ToastOptions } from './utils/toast';

declare global {
  interface Window {
    showToast?: (message: string, options?: ToastOptions) => string;
    removeToast?: (toastId: string) => void;
    removeAllToasts?: () => void;
    openSettings?: () => void;
  }
}

export {};
