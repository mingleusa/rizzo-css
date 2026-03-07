import { useRef, useState, useCallback, type KeyboardEvent, type ClipboardEvent } from 'react';

export interface InputOtpProps {
  length?: number;
  value?: string;
  onChange?: (value: string) => void;
  'aria-label'?: string;
  className?: string;
}

export function InputOtp({
  length = 6,
  value: controlledValue,
  onChange,
  'aria-label': ariaLabel = 'One-time code',
  className = '',
}: InputOtpProps) {
  const isControlled = controlledValue !== undefined;
  const [internalValue, setInternalValue] = useState<string[]>(() => Array(length).fill(''));
  const refs = useRef<(HTMLInputElement | null)[]>([]);

  const getValue = useCallback((): string[] => {
    if (isControlled) return controlledValue.split('').slice(0, length);
    return internalValue;
  }, [isControlled, controlledValue, length, internalValue]);

  const setValue = useCallback(
    (digits: string[]) => {
      const str = digits.join('');
      if (onChange) onChange(str);
      if (!isControlled) setInternalValue([...digits]);
    },
    [onChange, isControlled]
  );

  const handleInput = (index: number, v: string) => {
    const digit = v.replace(/\D/g, '').slice(-1);
    const current = getValue();
    const next = [...current];
    next[index] = digit;
    setValue(next);
    if (digit && index < length - 1) refs.current[index + 1]?.focus();
  };

  const handleKeyDown = (index: number, e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !getValue()[index] && index > 0) {
      refs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pasted = (e.clipboardData?.getData('text') || '').replace(/\D/g, '').slice(0, length);
    const current = getValue();
    const next = [...current];
    pasted.split('').forEach((ch, j) => {
      if (next[j] !== undefined) next[j] = ch;
    });
    setValue(next);
    const focusIdx = Math.min(pasted.length, length) - 1;
    refs.current[focusIdx]?.focus();
  };

  const raw = getValue();
  const values = Array.from({ length }, (_, i) => raw[i] ?? '');
  return (
    <div className={`input-otp ${className}`.trim()} role="group" aria-label={ariaLabel}>
      {Array.from({ length }, (_, i) => (
        <input
          key={i}
          ref={(el) => { refs.current[i] = el; }}
          type="text"
          inputMode="numeric"
          maxLength={1}
          autoComplete="one-time-code"
          className="input-otp__digit"
          aria-label={`Digit ${i + 1} of ${length}`}
          value={values[i]}
          onChange={(e) => handleInput(i, e.target.value)}
          onKeyDown={(e) => handleKeyDown(i, e)}
          onPaste={handlePaste}
        />
      ))}
    </div>
  );
}

export default InputOtp;
