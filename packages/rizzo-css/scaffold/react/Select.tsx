import type { SelectHTMLAttributes, ReactNode } from 'react';

export type SelectSize = 'sm' | 'md' | 'lg';

export interface SelectProps extends Omit<SelectHTMLAttributes<HTMLSelectElement>, 'size'> {
  size?: SelectSize;
  error?: boolean;
  success?: boolean;
  ariaDescribedby?: string;
  ariaInvalid?: boolean | 'true' | 'false';
  onValueChange?: (value: string) => void;
  className?: string;
  children?: ReactNode;
}

export function Select({
  id,
  name,
  value = '',
  required = false,
  disabled = false,
  size = 'md',
  error = false,
  success = false,
  className = '',
  ariaDescribedby,
  ariaInvalid,
  children,
  onChange,
  onValueChange,
  ...rest
}: SelectProps) {
  const sizeClass = size !== 'md' ? `form-input--${size}` : '';
  const errorClass = error ? 'form-input--error' : '';
  const successClass = success ? 'form-input--success' : '';
  const classes = ['form-input', sizeClass, errorClass, successClass, className]
    .filter(Boolean)
    .join(' ')
    .trim();
  const invalid = error || ariaInvalid === true || ariaInvalid === 'true';

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onChange?.(e);
    onValueChange?.(e.target.value);
  };

  return (
    <select
      id={id}
      name={name}
      value={value}
      required={required}
      disabled={disabled}
      className={classes}
      aria-invalid={invalid ? 'true' : 'false'}
      aria-describedby={ariaDescribedby}
      onChange={handleChange}
      {...rest}
    >
      {children}
    </select>
  );
}

export default Select;
