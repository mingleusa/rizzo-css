import type { HTMLAttributes, ReactNode } from 'react';

export interface DashboardProps extends HTMLAttributes<HTMLDivElement> {
  sidebar?: ReactNode;
  children?: ReactNode;
  className?: string;
}

export function Dashboard({
  sidebar,
  children,
  className = '',
  ...rest
}: DashboardProps) {
  return (
    <div className={`dashboard ${className}`.trim()} data-dashboard {...rest}>
      {sidebar && <div className="dashboard__sidebar">{sidebar}</div>}
      <main className="dashboard__main">{children}</main>
    </div>
  );
}

export default Dashboard;
