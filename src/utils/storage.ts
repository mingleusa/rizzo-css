/**
 * Safe localStorage helpers — no-op when localStorage is unavailable (SSR, private mode).
 */

export function getItem(key: string, defaultValue: string | null = null): string | null {
  try {
    if (typeof localStorage === 'undefined') return defaultValue;
    const value = localStorage.getItem(key);
    return value !== null ? value : defaultValue;
  } catch {
    return defaultValue;
  }
}

export function setItem(key: string, value: string): void {
  try {
    if (typeof localStorage === 'undefined') return;
    localStorage.setItem(key, value);
  } catch (_) {
    // ignore
  }
}

export function removeItem(key: string): void {
  try {
    if (typeof localStorage === 'undefined') return;
    localStorage.removeItem(key);
  } catch (_) {
    // ignore
  }
}
