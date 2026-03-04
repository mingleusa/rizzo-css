import type { HTMLAttributes, ReactNode } from 'react';

export interface DashboardProps extends HTMLAttributes<HTMLDivElement> {
  /** Sidebar content (nav with dashboard__nav and dashboard__nav-link). If omitted, default Dashboard/Items/Settings links are shown. */
  sidebar?: ReactNode;
  children?: ReactNode;
  className?: string;
  /** Aria-label for the sidebar (default: "Dashboard navigation") */
  sidebarLabel?: string;
}

export function Dashboard({
  sidebar,
  children,
  className = '',
  sidebarLabel = 'Dashboard navigation',
  ...rest
}: DashboardProps) {
  return (
    <div className={`dashboard ${className}`.trim()} data-dashboard {...rest}>
      <aside className="dashboard__sidebar" aria-label={sidebarLabel}>
        {sidebar ?? (
          <nav className="dashboard__nav">
            <a href="/" className="dashboard__nav-link dashboard__nav-link--active" aria-current="page">Dashboard</a>
            <a href="/" className="dashboard__nav-link">Items</a>
            <a href="/" className="dashboard__nav-link">Settings</a>
          </nav>
        )}
      </aside>
      <main id="main-content" className="dashboard__main">{children}</main>
    </div>
  );
}

export default Dashboard;
