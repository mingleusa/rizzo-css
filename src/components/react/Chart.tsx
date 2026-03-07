import type { HTMLAttributes } from 'react';

export interface ChartDataItem {
  label: string;
  value: number;
}

export interface ChartProps extends HTMLAttributes<HTMLDivElement> {
  data?: ChartDataItem[];
  className?: string;
}

export function Chart({
  data = [
    { label: 'A', value: 40 },
    { label: 'B', value: 65 },
    { label: 'C', value: 30 },
  ],
  className = '',
  ...rest
}: ChartProps) {
  const max = Math.max(1, ...data.map((d) => d.value));
  return (
    <div
      className={`chart ${className}`.trim()}
      role="img"
      aria-label={`Bar chart: ${data.map((d) => `${d.label} ${d.value}`).join(', ')}`}
      {...rest}
    >
      <div className="chart__bars">
        {data.map((d) => (
          <div key={d.label} className="chart__bar-wrap">
            <div
              className="chart__bar"
              style={{ height: `${(d.value / max) * 100}%` }}
            />
            <span className="chart__label">{d.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Chart;
