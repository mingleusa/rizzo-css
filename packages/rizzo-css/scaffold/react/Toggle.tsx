import type { ButtonHTMLAttributes, ReactNode } from 'react';

export interface ToggleProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children'> {
  pressed?: boolean;
  onPressedChange?: (pressed: boolean) => void;
  children?: ReactNode;
  className?: string;
}

export function Toggle({
  pressed = false,
  onPressedChange,
  disabled = false,
  type = 'button',
  value,
  'aria-label': ariaLabel,
  className = '',
  children,
  onClick,
  ...rest
}: ToggleProps) {
  const pressedClass = pressed ? 'toggle--pressed' : '';
  const classes = ['toggle', pressedClass, className].filter(Boolean).join(' ').trim();
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    onClick?.(e);
    if (!disabled) onPressedChange?.(!pressed);
  };
  return (
    <button
      type={type}
      className={classes}
      aria-pressed={pressed}
      disabled={disabled}
      value={value}
      aria-label={ariaLabel}
      data-toggle
      onClick={handleClick}
      {...rest}
    >
      {children}
    </button>
  );
}

export default Toggle;
