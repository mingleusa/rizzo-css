/**
 * Single source of truth for theme id, label, type, icon, and preview colors.
 * Used by ThemeSwitcher and Navbar so theme icons and labels stay consistent.
 */

export type ThemeIconKey =
  | 'gear'
  | 'owl'
  | 'palette'
  | 'flame'
  | 'sunset'
  | 'zap'
  | 'shield'
  | 'heart'
  | 'sun'
  | 'cake'
  | 'lemon'
  | 'rainbow'
  | 'leaf'
  | 'cherry'
  | 'brush';

export interface ThemeEntry {
  value: string;
  label: string;
  type: 'dark' | 'light';
  iconKey: ThemeIconKey;
  /** OKLCH background for ThemeSwitcher preview */
  bg: string;
  /** OKLCH accent for ThemeSwitcher preview */
  accent: string;
}

export const THEMES_DARK: ThemeEntry[] = [
  { value: 'github-dark-classic', label: 'GitHub Dark Classic', type: 'dark', iconKey: 'owl', bg: 'oklch(18% 0.012 264deg)', accent: 'oklch(72% 0.12 250deg)' },
  { value: 'shades-of-purple', label: 'Shades of Purple', type: 'dark', iconKey: 'palette', bg: 'oklch(18% 0.08 290deg)', accent: 'oklch(65% 0.25 290deg)' },
  { value: 'sandstorm-classic', label: 'Sandstorm Classic', type: 'dark', iconKey: 'flame', bg: 'oklch(16% 0.025 25deg)', accent: 'oklch(58% 0.18 25deg)' },
  { value: 'rocky-blood-orange', label: 'Rocky Blood Orange', type: 'dark', iconKey: 'sunset', bg: 'oklch(16% 0.03 45deg)', accent: 'oklch(62% 0.16 55deg)' },
  { value: 'minimal-dark-neon-yellow', label: 'Minimal Dark Neon Yellow', type: 'dark', iconKey: 'zap', bg: 'oklch(14% 0.01 95deg)', accent: 'oklch(88% 0.18 95deg)' },
  { value: 'hack-the-box', label: 'Hack The Box', type: 'dark', iconKey: 'shield', bg: 'oklch(16% 0.03 255deg)', accent: 'oklch(88% 0.22 130deg)' },
  { value: 'pink-cat-boo', label: 'Pink Cat Boo', type: 'dark', iconKey: 'heart', bg: 'oklch(18% 0.03 280deg)', accent: 'oklch(78% 0.12 350deg)' },
];

export const THEMES_LIGHT: ThemeEntry[] = [
  { value: 'github-light', label: 'GitHub Light', type: 'light', iconKey: 'sun', bg: 'oklch(100% 0 0deg)', accent: 'oklch(55% 0.18 255deg)' },
  { value: 'red-velvet-cupcake', label: 'Red Velvet Cupcake', type: 'light', iconKey: 'cake', bg: 'oklch(99% 0.005 25deg)', accent: 'oklch(55% 0.17 25deg)' },
  { value: 'orangy-one-light', label: 'Orangy One Light', type: 'light', iconKey: 'lemon', bg: 'oklch(99% 0.008 70deg)', accent: 'oklch(58% 0.16 55deg)' },
  { value: 'sunflower', label: 'Sunflower', type: 'light', iconKey: 'rainbow', bg: 'oklch(98% 0.03 95deg)', accent: 'oklch(75% 0.16 95deg)' },
  { value: 'green-breeze-light', label: 'Green Breeze Light', type: 'light', iconKey: 'leaf', bg: 'oklch(98% 0.008 140deg)', accent: 'oklch(48% 0.16 155deg)' },
  { value: 'cute-pink', label: 'Cute Pink', type: 'light', iconKey: 'cherry', bg: 'oklch(98% 0.025 350deg)', accent: 'oklch(62% 0.22 350deg)' },
  { value: 'semi-light-purple', label: 'Semi Light Purple', type: 'light', iconKey: 'brush', bg: 'oklch(96% 0.02 290deg)', accent: 'oklch(52% 0.2 290deg)' },
];

export const ALL_THEMES = [...THEMES_DARK, ...THEMES_LIGHT];
