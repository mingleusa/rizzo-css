import type { HTMLAttributes, ReactNode } from 'react';

export interface AspectRatioProps extends HTMLAttributes<HTMLDivElement> {
  ratio?: number;
  children?: ReactNode;
  className?: string;
}

export function AspectRatio({
  ratio = 16 / 9,
  className = '',
  children,
  style,
  ...rest
}: AspectRatioProps) {
  const paddingPercent = (1 / ratio) * 100;
  return (
    <div
      className={`aspect-ratio ${className}`.trim()}
      style={{
        ['--aspect-ratio' as string]: ratio,
        ['--aspect-ratio-padding' as string]: `${paddingPercent}%`,
        ...(style as React.CSSProperties),
      }}
      {...rest}
    >
      <div className="aspect-ratio__inner">{children}</div>
    </div>
  );
}

export default AspectRatio;
