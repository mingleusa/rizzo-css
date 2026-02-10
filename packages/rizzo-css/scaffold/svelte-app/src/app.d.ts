// See https://svelte.dev/docs/kit/types#app.d.ts
// for information about these interfaces

/** Toast options (injected by app.html script from Rizzo CSS scaffold) */
interface ToastOptions {
  variant?: 'info' | 'success' | 'warning' | 'error';
  position?: string;
  autoDismiss?: number;
  dismissible?: boolean;
}

declare global {
  namespace App {
    // interface Error {}
    // interface Locals {}
    // interface PageData {}
    // interface PageState {}
    // interface Platform {}
  }

  interface Window {
    showToast?(message: string, options?: ToastOptions): string | null;
    removeToast?(id: string): void;
    removeAllToasts?(): void;
  }
}

export {};
