import type { InputHTMLAttributes } from 'react';

export interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  ariaDescribedby?: string;
  ariaLabel?: string;
  className?: string;
}

export function Checkbox({
  id,
  name,
  value,
  checked = false,
  required = false,
  disabled = false,
  className = '',
  ariaDescribedby,
  ariaLabel,
  onChange,
  ...rest
}: CheckboxProps) {
  return (
    <input
      type="checkbox"
      id={id}
      name={name}
      value={value}
      checked={checked}
      required={required}
      disabled={disabled}
      className={className}
      aria-describedby={ariaDescribedby}
      aria-label={ariaLabel}
      onChange={onChange}
      {...rest}
    />
  );
}

export default Checkbox;
