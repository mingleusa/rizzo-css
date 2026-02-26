import type { ButtonHTMLAttributes, ReactNode } from 'react';

export type ButtonVariant =
  | 'default'
  | 'primary'
  | 'success'
  | 'warning'
  | 'error'
  | 'info'
  | 'outline';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  children?: ReactNode;
  className?: string;
}

/**
 * Button component using Rizzo CSS BEM classes (btn, btn-primary, etc.).
 * Same API and markup as Astro/Svelte Button for design system parity.
 */
export function Button({
  variant = 'default',
  type = 'button',
  disabled = false,
  className = '',
  children,
  ...rest
}: ButtonProps) {
  const variantClass = variant === 'default' ? '' : `btn-${variant}`;
  const classes = ['btn', variantClass, className].filter(Boolean).join(' ');

  return (
    <button type={type} disabled={disabled} className={classes} {...rest}>
      {children}
    </button>
  );
}

export default Button;
