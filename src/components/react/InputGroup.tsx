import type { InputHTMLAttributes, ReactNode } from 'react';

export interface InputGroupProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  /** Content before the input (e.g. icon, "$") */
  prefix?: ReactNode;
  /** Content after the input (e.g. ".com", icon) */
  suffix?: ReactNode;
  /** Visual error state */
  error?: boolean;
  /** Visual success state */
  success?: boolean;
  className?: string;
}

/**
 * Input Group – input with optional prefix/suffix addons.
 * Uses Rizzo BEM: input-group, input-group__wrapper, input-group__addon, input-group__input.
 */
export function InputGroup({
  prefix,
  suffix,
  error = false,
  success = false,
  className = '',
  id,
  ...inputProps
}: InputGroupProps) {
  const rootClass = [
    'input-group',
    error && 'input-group--error',
    success && 'input-group--success',
    className,
  ]
    .filter(Boolean)
    .join(' ')
    .trim();

  const inputId = id ?? `input-group-${Math.random().toString(36).slice(2, 9)}`;

  return (
    <div className={rootClass}>
      <div className="input-group__wrapper">
        {prefix != null && (
          <span className="input-group__addon input-group__addon--prefix" aria-hidden="true">
            {prefix}
          </span>
        )}
        <input
          id={inputId}
          className="input-group__input"
          aria-invalid={error ? 'true' : undefined}
          {...inputProps}
        />
        {suffix != null && (
          <span className="input-group__addon input-group__addon--suffix" aria-hidden="true">
            {suffix}
          </span>
        )}
      </div>
    </div>
  );
}

export default InputGroup;
