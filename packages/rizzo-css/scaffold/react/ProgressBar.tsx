import type { HTMLAttributes } from 'react';

export type ProgressBarVariant = 'primary' | 'success' | 'warning' | 'error' | 'info';
export type ProgressBarSize = 'sm' | 'md' | 'lg';

export interface ProgressBarProps extends HTMLAttributes<HTMLDivElement> {
  value?: number;
  max?: number;
  variant?: ProgressBarVariant;
  size?: ProgressBarSize;
  showLabel?: boolean;
  indeterminate?: boolean;
  label?: string;
  className?: string;
}

export function ProgressBar({
  value = 0,
  max = 100,
  variant = 'primary',
  size = 'md',
  showLabel = false,
  indeterminate = false,
  label,
  className = '',
  ...rest
}: ProgressBarProps) {
  const safeMax = max <= 0 ? 100 : max;
  const clampedValue = indeterminate ? 0 : Math.max(0, Math.min(value, safeMax));
  const percentage = indeterminate ? 0 : Math.round((clampedValue / safeMax) * 100);
  const classes = [
    'progress',
    `progress--${variant}`,
    `progress--${size}`,
    indeterminate ? 'progress--indeterminate' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ')
    .trim();
  const barStyle = indeterminate ? {} : { width: `${percentage}%` };

  return (
    <div
      className={classes}
      role="progressbar"
      aria-valuemin={0}
      aria-valuemax={safeMax}
      aria-label={label ?? (indeterminate ? 'Loading' : 'Progress')}
      aria-valuetext={indeterminate ? 'Loading' : undefined}
      aria-valuenow={indeterminate ? undefined : clampedValue}
      {...rest}
    >
      <div className="progress__track">
        <div className="progress__bar" style={barStyle} />
      </div>
      {showLabel && !indeterminate && (
        <span className="progress__label" aria-hidden="true">
          {percentage}%
        </span>
      )}
    </div>
  );
}

export default ProgressBar;
