/**
 * Rizzo CSS – JavaScript utilities
 * Re-export for use in Astro, Svelte, or other consumers.
 */

export {
  THEME_SYSTEM,
  DEFAULT_THEME_DARK,
  DEFAULT_THEME_LIGHT,
  getCurrentTheme,
  getStoredTheme,
  resolveSystemTheme,
  getResolvedTheme,
  getThemeInfo,
  getThemeLabel,
  applyTheme,
} from './theme';

export { getItem, setItem, removeItem } from './storage';
export { copyToClipboard } from './clipboard';
export { showToast, removeToast, removeAllToasts } from './toast';
export type { ToastOptions } from './toast';
