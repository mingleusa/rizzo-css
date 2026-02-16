/**
 * Font pairs (sans + mono) for the Settings font changer.
 * Each option sets both --font-family (body/UI) and --font-family-mono (code blocks, pre, kbd).
 * Used by Settings components and layout flash scripts to apply and persist the chosen pair.
 */

export interface FontPairEntry {
  value: string;
  label: string;
  /** CSS value for --font-family (sans stack) */
  sans: string;
  /** CSS value for --font-family-mono */
  mono: string;
}

export const FONT_PAIR_DEFAULT = 'geist' as const;

export const FONT_PAIRS: FontPairEntry[] = [
  {
    value: 'geist',
    label: 'Geist (Sans + Mono)',
    sans: 'var(--font-family-geist-sans)',
    mono: 'var(--font-family-geist-mono)',
  },
  {
    value: 'inter-jetbrains',
    label: 'Inter + JetBrains Mono',
    sans: 'var(--font-family-inter)',
    mono: 'var(--font-family-jetbrains-mono)',
  },
  {
    value: 'ibm-plex',
    label: 'IBM Plex Sans + Mono',
    sans: 'var(--font-family-ibm-plex-sans)',
    mono: 'var(--font-family-ibm-plex-mono)',
  },
  {
    value: 'source',
    label: 'Source Sans 3 + Source Code Pro',
    sans: 'var(--font-family-source-sans-3)',
    mono: 'var(--font-family-source-code-pro)',
  },
  {
    value: 'dm',
    label: 'DM Sans + DM Mono',
    sans: 'var(--font-family-dm-sans)',
    mono: 'var(--font-family-dm-mono)',
  },
  {
    value: 'outfit-jetbrains',
    label: 'Outfit + JetBrains Mono',
    sans: 'var(--font-family-outfit)',
    mono: 'var(--font-family-jetbrains-mono)',
  },
];

export function getFontPairById(id: string): FontPairEntry | undefined {
  return FONT_PAIRS.find((p) => p.value === id);
}
