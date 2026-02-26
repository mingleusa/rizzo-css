import type { InputHTMLAttributes } from 'react';

export interface RadioProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  /** Selected value for the radio group. Use the same name for all radios in the group. */
  group?: string;
  ariaDescribedby?: string;
  ariaLabel?: string;
  className?: string;
}

export function Radio({
  id,
  name,
  value = '',
  required = false,
  disabled = false,
  className = '',
  ariaDescribedby,
  ariaLabel,
  ...rest
}: RadioProps) {
  return (
    <input
      type="radio"
      id={id}
      name={name}
      value={value}
      required={required}
      disabled={disabled}
      className={className}
      aria-describedby={ariaDescribedby}
      aria-label={ariaLabel}
      {...rest}
    />
  );
}

export default Radio;
