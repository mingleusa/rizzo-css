/**
 * Theme utilities — apply theme, resolve system preference, get/set stored theme.
 * Used by ThemeSwitcher, Layout (flash prevention), and any consumer that sets data-theme.
 */
import { ALL_THEMES } from '../config/themes';

/** Detail payload for the 'rizzo-theme-change' custom event. */
export interface RizzoThemeChangeDetail {
  themeValue: string;
  effective: string;
}

export const THEME_SYSTEM = 'system';
export const DEFAULT_THEME_DARK = 'github-dark-classic';
export const DEFAULT_THEME_LIGHT = 'github-light';

/** Current theme id from the DOM (data-theme on html). */
export function getCurrentTheme(): string {
  if (typeof document === 'undefined') return DEFAULT_THEME_DARK;
  return document.documentElement.getAttribute('data-theme') || DEFAULT_THEME_DARK;
}

/** Stored theme from localStorage (may be 'system' or a theme id). */
export function getStoredTheme(): string {
  if (typeof localStorage === 'undefined') return getCurrentTheme();
  return localStorage.getItem('theme') || getCurrentTheme();
}

/** Resolve system preference to a concrete theme id. */
export function resolveSystemTheme(): string {
  if (typeof window === 'undefined') return DEFAULT_THEME_DARK;
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? DEFAULT_THEME_DARK : DEFAULT_THEME_LIGHT;
}

/** Resolve stored theme to the effective theme id (for 'system', returns resolved dark/light). */
export function getResolvedTheme(): string {
  const stored = getStoredTheme();
  if (!stored || stored === THEME_SYSTEM) return resolveSystemTheme();
  return stored;
}

/** Theme display info returned by getThemeInfo. */
export interface ThemeInfo {
  value: string;
  label: string;
}

/** Get { value, label } for a theme (for UI display). */
export function getThemeInfo(themeValue: string): ThemeInfo {
  if (themeValue === THEME_SYSTEM) return { value: THEME_SYSTEM, label: 'System' };
  const entry = ALL_THEMES.find((t) => t.value === themeValue);
  return entry ? { value: entry.value, label: entry.label } : { value: themeValue, label: 'Theme' };
}

/** Get display label for a theme value (from config). */
export function getThemeLabel(themeValue: string): string {
  return getThemeInfo(themeValue).label;
}

/** Apply a theme: set data-theme and persist to localStorage. Use for ThemeSwitcher and programmatic changes. */
export function applyTheme(themeValue: string): void {
  if (typeof document === 'undefined' || typeof localStorage === 'undefined') return;
  let effective: string;
  if (themeValue === THEME_SYSTEM) {
    effective = resolveSystemTheme();
    document.documentElement.setAttribute('data-theme', effective);
    localStorage.setItem('theme', THEME_SYSTEM);
  } else {
    document.documentElement.setAttribute('data-theme', themeValue);
    localStorage.setItem('theme', themeValue);
    effective = themeValue;
  }
  // Allow listeners to sync UI (e.g. ThemeSwitcher)
  try {
    window.dispatchEvent(
      new CustomEvent<RizzoThemeChangeDetail>('rizzo-theme-change', { detail: { themeValue, effective } })
    );
  } catch (_) {}
}
