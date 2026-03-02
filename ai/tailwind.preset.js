/**
 * Optional Tailwind preset mapping to Rizzo CSS semantic tokens and base variables.
 * Rizzo does not use Tailwind; this preset is for projects that use Tailwind alongside
 * Rizzo and want utility classes to reference Rizzo's theme-aware tokens.
 * Token names match src/styles/variables.css and theme files (e.g. --background, --accent).
 */
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: "var(--accent)",
        "primary-hover": "var(--accent-hover)",
        background: "var(--background)",
        "background-alt": "var(--background-alt)",
        surface: "var(--background-alt)",
        foreground: "var(--text)",
        "foreground-dim": "var(--text-dim)",
        border: "var(--border)",
        success: "var(--success)",
        warning: "var(--warning)",
        danger: "var(--danger)",
      },
      spacing: {
        0: "var(--spacing-0)",
        1: "var(--spacing-1)",
        2: "var(--spacing-2)",
        3: "var(--spacing-3)",
        4: "var(--spacing-4)",
        5: "var(--spacing-5)",
        6: "var(--spacing-6)",
        8: "var(--spacing-8)",
        10: "var(--spacing-10)",
        12: "var(--spacing-12)",
        16: "var(--spacing-16)",
        20: "var(--spacing-20)",
        24: "var(--spacing-24)",
      },
      borderRadius: {
        none: "var(--radius-none)",
        sm: "var(--radius-sm)",
        DEFAULT: "var(--radius)",
        md: "var(--radius-md)",
        lg: "var(--radius-lg)",
        xl: "var(--radius-xl)",
        "2xl": "var(--radius-2xl)",
        full: "var(--radius-full)",
      },
      fontSize: {
        xs: "var(--font-size-xs)",
        sm: "var(--font-size-sm)",
        base: "var(--font-size-base)",
        lg: "var(--font-size-lg)",
        xl: "var(--font-size-xl)",
        "2xl": "var(--font-size-2xl)",
      },
      transitionDuration: {
        fast: "var(--transition-fast)",
        DEFAULT: "var(--transition-base)",
        slow: "var(--transition-slow)",
      },
    },
  },
};
