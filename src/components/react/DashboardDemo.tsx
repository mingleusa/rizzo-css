import { Dashboard } from './Dashboard';
import { DocsSidebar } from './DocsSidebar';

export function DashboardDemo() {
  return (
    <Dashboard
      sidebar={<DocsSidebar links={[{ href: '#', label: 'Overview' }, { href: '#', label: 'Components', active: true }]} />}
    >
      <p style={{ padding: 'var(--spacing-4)' }}>Main content area. Same BEM as Astro and Svelte.</p>
    </Dashboard>
  );
}
