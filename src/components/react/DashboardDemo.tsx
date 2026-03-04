import { Dashboard } from './Dashboard';

export function DashboardDemo() {
  return (
    <Dashboard
      sidebarLabel="Dashboard navigation"
      sidebar={
        <nav className="dashboard__nav">
          <a href="/docs/react/components/dashboard" className="dashboard__nav-link dashboard__nav-link--active" aria-current="page">Dashboard</a>
          <a href="#" className="dashboard__nav-link">Items</a>
          <a href="#" className="dashboard__nav-link">Settings</a>
        </nav>
      }
    >
      <div>
        <h3 style={{ margin: '0 0 var(--spacing-2)' }}>Main content</h3>
        <p style={{ margin: 0 }}>Put your page content here. Combine with Card, Table, and other Rizzo components.</p>
      </div>
    </Dashboard>
  );
}
