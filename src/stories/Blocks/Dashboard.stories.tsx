import type { Meta, StoryObj } from '@storybook/react';
import { Card } from '../../components/react/Card';

function DashboardBlock() {
  return (
    <div className="dashboard">
      <aside className="dashboard__sidebar" aria-label="Dashboard navigation">
        <nav className="dashboard__nav">
          <a href="/dashboard" className="dashboard__nav-link dashboard__nav-link--active" aria-current="page">
            Dashboard
          </a>
          <a href="#" className="dashboard__nav-link">
            Items
          </a>
          <a href="#" className="dashboard__nav-link">
            Settings
          </a>
        </nav>
      </aside>
      <main className="dashboard__main">
        <div className="dashboard-page">
          <header className="dashboard-page__header">
            <h1 className="dashboard-page__title">Dashboard</h1>
            <p className="dashboard-page__subtitle">Overview.</p>
          </header>
          <section className="dashboard-page__stats" aria-labelledby="stats-heading">
            <h2 id="stats-heading" className="sr-only">
              Key metrics
            </h2>
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
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

const meta: Meta = {
  title: 'Blocks/Dashboard',
  component: DashboardBlock,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        story: 'Dashboard layout with sidebar and stats. Same structure for all frameworks.',
      },
    },
  },
};

export default meta;

type Story = StoryObj;

export const Default: Story = {
  render: () => <DashboardBlock />,
};
