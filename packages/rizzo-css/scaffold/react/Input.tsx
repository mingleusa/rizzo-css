import type { InputHTMLAttributes } from 'react';

export type InputSize = 'sm' | 'md' | 'lg';

export interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  size?: InputSize;
  error?: boolean;
  success?: boolean;
  ariaDescribedby?: string;
  ariaInvalid?: boolean | 'true' | 'false';
  onValueChange?: (value: string) => void;
  className?: string;
}

export function Input({
  type = 'text',
  id,
  name,
  value = '',
  placeholder,
  required = false,
  disabled = false,
  readOnly = false,
  autoComplete,
  size = 'md',
  error = false,
  success = false,
  className = '',
  ariaDescribedby,
  ariaInvalid,
  onChange,
  onValueChange,
  ...rest
}: InputProps) {
  const sizeClass = size !== 'md' ? `form-input--${size}` : '';
  const errorClass = error ? 'form-input--error' : '';
  const successClass = success ? 'form-input--success' : '';
  const classes = ['form-input', sizeClass, errorClass, successClass, className]
    .filter(Boolean)
    .join(' ')
    .trim();
  const invalid = error || ariaInvalid === true || ariaInvalid === 'true';

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange?.(e);
    onValueChange?.(e.target.value);
  };

  return (
    <input
      type={type}
      id={id}
      name={name}
      value={value}
      placeholder={placeholder}
      required={required}
      disabled={disabled}
      readOnly={readOnly}
      autoComplete={autoComplete}
      className={classes}
      aria-invalid={invalid ? 'true' : 'false'}
      aria-describedby={ariaDescribedby}
      onChange={handleChange}
      {...rest}
    />
  );
}

export default Input;
