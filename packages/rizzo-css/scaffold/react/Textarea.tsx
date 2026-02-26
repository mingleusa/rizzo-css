import type { TextareaHTMLAttributes } from 'react';

export type TextareaSize = 'sm' | 'md' | 'lg';

export interface TextareaProps extends Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, 'size'> {
  size?: TextareaSize;
  error?: boolean;
  success?: boolean;
  ariaDescribedby?: string;
  ariaInvalid?: boolean | 'true' | 'false';
  onValueChange?: (value: string) => void;
  className?: string;
}

export function Textarea({
  id,
  name,
  value = '',
  placeholder,
  required = false,
  disabled = false,
  readOnly = false,
  rows = 4,
  cols,
  size = 'md',
  error = false,
  success = false,
  className = '',
  ariaDescribedby,
  ariaInvalid,
  onChange,
  onValueChange,
  ...rest
}: TextareaProps) {
  const sizeClass = size !== 'md' ? `form-input--${size}` : '';
  const errorClass = error ? 'form-input--error' : '';
  const successClass = success ? 'form-input--success' : '';
  const classes = ['form-input', sizeClass, errorClass, successClass, className]
    .filter(Boolean)
    .join(' ')
    .trim();
  const invalid = error || ariaInvalid === true || ariaInvalid === 'true';

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onChange?.(e);
    onValueChange?.(e.target.value);
  };

  return (
    <textarea
      id={id}
      name={name}
      value={value}
      placeholder={placeholder}
      required={required}
      disabled={disabled}
      readOnly={readOnly}
      rows={rows}
      cols={cols}
      className={classes}
      aria-invalid={invalid ? 'true' : 'false'}
      aria-describedby={ariaDescribedby}
      onChange={handleChange}
      {...rest}
    />
  );
}

export default Textarea;
