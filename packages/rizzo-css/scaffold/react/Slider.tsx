import type { HTMLAttributes, InputHTMLAttributes } from 'react';

export interface SliderProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  id?: string;
  name?: string;
  min?: number;
  max?: number;
  step?: number;
  value?: number;
  disabled?: boolean;
  ariaLabel?: string;
  onValueChange?: (value: number) => void;
  className?: string;
}

export function Slider({
  id: idProp,
  name,
  min = 0,
  max = 100,
  step = 1,
  value = min,
  disabled = false,
  ariaLabel,
  onValueChange,
  onChange,
  className = '',
  ...rest
}: SliderProps) {
  const id = idProp ?? `slider-${Math.random().toString(36).slice(2, 9)}`;
  const pct = Math.min(100, Math.max(0, ((value - min) / (max - min)) * 100));

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange?.(e);
    const v = parseFloat(e.target.value);
    if (!Number.isNaN(v)) onValueChange?.(v);
  };

  return (
    <div className={`slider ${className}`.trim()} data-slider>
      <input
        type="range"
        id={id}
        name={name}
        className="slider__input"
        min={min}
        max={max}
        step={step}
        value={value}
        disabled={disabled}
        aria-valuemin={min}
        aria-valuemax={max}
        aria-valuenow={value}
        aria-label={ariaLabel}
        data-slider-input
        onChange={handleInput}
        {...rest}
      />
      <div className="slider__track" aria-hidden="true">
        <div className="slider__fill" data-slider-fill style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
}

export default Slider;
