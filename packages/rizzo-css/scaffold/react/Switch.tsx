import type { InputHTMLAttributes, LabelHTMLAttributes } from 'react';

export interface SwitchProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  id?: string;
  name?: string;
  checked?: boolean;
  disabled?: boolean;
  label?: string;
  onCheckedChange?: (checked: boolean) => void;
  className?: string;
}

export function Switch({
  id: idProp,
  name,
  checked = false,
  disabled = false,
  label,
  onCheckedChange,
  onChange,
  className = '',
  ...rest
}: SwitchProps) {
  const id = idProp ?? `switch-${Math.random().toString(36).slice(2, 11)}`;
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange?.(e);
    onCheckedChange?.(e.target.checked);
  };
  const labelProps: LabelHTMLAttributes<HTMLLabelElement> = { htmlFor: id, className: `switch ${className}`.trim() };
  return (
    <label {...labelProps}>
      <input
        type="checkbox"
        id={id}
        name={name}
        checked={checked}
        disabled={disabled}
        className="switch__input"
        role="switch"
        aria-checked={checked}
        onChange={handleChange}
        {...rest}
      />
      <span className="switch__track" aria-hidden="true">
        <span className="switch__thumb" />
      </span>
      {label && <span className="switch__label">{label}</span>}
    </label>
  );
}

export default Switch;
