import type { HTMLAttributes } from 'react';

export type TooltipPosition = 'top' | 'bottom' | 'left' | 'right';

export interface TooltipProps extends HTMLAttributes<HTMLSpanElement> {
  text: string;
  position?: TooltipPosition;
  delay?: number;
  className?: string;
  id?: string;
}

export function Tooltip({
  text,
  position = 'top',
  delay = 0,
  className = '',
  id: idProp,
  style,
  ...rest
}: TooltipProps) {
  const tooltipId = idProp ?? `tooltip-${Math.random().toString(36).slice(2, 11)}`;
  const positionClass = `tooltip--${position}`;
  const classes = ['tooltip', positionClass, className].filter(Boolean).join(' ').trim();
  const delayStyle = delay > 0 ? { ['--tooltip-delay' as string]: `${delay}ms`, ...(style as object) } : style;
  return (
    <span
      className={classes}
      role="tooltip"
      id={tooltipId}
      aria-hidden="true"
      style={delayStyle}
      {...rest}
    >
      {text}
    </span>
  );
}

export default Tooltip;
