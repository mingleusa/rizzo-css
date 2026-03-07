import { Dashboard } from './Dashboard';
import { Card } from './Card';
import { Badge } from './Badge';

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
      <div className="dashboard-page">
        <header className="dashboard-page__header">
          <h1 className="dashboard-page__title">Dashboard</h1>
          <p className="dashboard-page__subtitle">Overview. Same structure as the Dashboard block.</p>
        </header>
        <section className="dashboard-page__stats" aria-labelledby="react-demo-stats-heading">
          <h2 id="react-demo-stats-heading" className="sr-only">Key metrics</h2>
          <div className="dashboard-page__stats-grid">
            <Card className="dashboard-page__stat">
              <div className="card__body">
                <span className="card__label">Total users</span>
                <span className="card__value">1,234</span>
              </div>
            </Card>
            <Card className="dashboard-page__stat">
              <div className="card__body">
                <span className="card__label">Revenue</span>
                <span className="card__value">$12,345</span>
              </div>
            </Card>
            <Card className="dashboard-page__stat">
              <div className="card__body">
                <span className="card__label">Active</span>
                <span className="card__value">89%</span>
              </div>
            </Card>
          </div>
        </section>
        <section className="dashboard-page__table" aria-labelledby="react-demo-table-heading">
          <h2 id="react-demo-table-heading" className="dashboard-page__section-title">Recent activity</h2>
          <div className="table-wrapper">
            <table className="table">
              <caption className="sr-only">Recent activity list</caption>
              <thead>
                <tr className="table__row">
                  <th scope="col" className="table__cell table__cell--header">Name</th>
                  <th scope="col" className="table__cell table__cell--header">Status</th>
                  <th scope="col" className="table__cell table__cell--header">Date</th>
                </tr>
              </thead>
              <tbody>
                <tr className="table__row">
                  <td className="table__cell">Item one</td>
                  <td className="table__cell"><Badge variant="success">Done</Badge></td>
                  <td className="table__cell">Today</td>
                </tr>
                <tr className="table__row">
                  <td className="table__cell">Item two</td>
                  <td className="table__cell"><Badge variant="warning">Pending</Badge></td>
                  <td className="table__cell">Yesterday</td>
                </tr>
                <tr className="table__row">
                  <td className="table__cell">Item three</td>
                  <td className="table__cell"><Badge variant="error">Failed</Badge></td>
                  <td className="table__cell">Jan 15</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </Dashboard>
  );
}
