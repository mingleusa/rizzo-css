import type { ReactNode } from 'react';

export interface FormGroupProps {
  label?: string;
  labelFor?: string;
  required?: boolean;
  help?: string;
  error?: string;
  success?: string;
  className?: string;
  children?: ReactNode;
}

export function FormGroup({
  label,
  labelFor,
  required = false,
  help,
  error,
  success,
  className = '',
  children,
}: FormGroupProps) {
  const errorId = labelFor && error ? `${labelFor}-error` : undefined;
  const helpId = labelFor && help ? `${labelFor}-help` : undefined;

  return (
    <div className={`form-group ${className}`.trim()}>
      {label &&
        (labelFor ? (
          <label htmlFor={labelFor} className={`form-group__label ${required ? 'required' : ''}`.trim()}>
            {label}
          </label>
        ) : (
          <span className={`form-group__label ${required ? 'required' : ''}`.trim()}>{label}</span>
        ))}
      {children}
      {help && (
        <span id={helpId} className="form-group__help">
          {help}
        </span>
      )}
      {error && (
        <span id={errorId} className="form-error" role="alert">
          {error}
        </span>
      )}
      {success && (
        <span className="form-success" role="status">
          {success}
        </span>
      )}
    </div>
  );
}

export default FormGroup;
