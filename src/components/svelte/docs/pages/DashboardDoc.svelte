<script lang="ts">
  import Dashboard from '../../Dashboard.svelte';
  import Card from '../../Card.svelte';
  import AddComponentTabs from '../AddComponentTabs.svelte';
  import CodeBlock from '../CodeBlock.svelte';
</script>

<section>
  <h2>Dashboard component</h2>
  <p>Two-column layout: a sidebar (for navigation) and a main content area. Same BEM and behavior as the <a href="/docs/components/dashboard">Astro Dashboard</a>: <code>dashboard</code>, <code>dashboard__sidebar</code>, <code>dashboard__main</code>, <code>dashboard__nav</code>, <code>dashboard__nav-link</code>. On small screens the layout stacks vertically.</p>
  <AddComponentTabs componentName="Dashboard" />
  <h3>Live example</h3>
  <div class="dashboard-demo-wrap">
    <Dashboard sidebarLabel="Dashboard navigation">
      {#snippet sidebar()}
        <nav class="dashboard__nav">
          <a href="/docs/svelte/components/dashboard" class="dashboard__nav-link dashboard__nav-link--active" aria-current="page">Dashboard</a>
          <a href="/docs/svelte/components/dashboard#items" class="dashboard__nav-link">Items</a>
          <a href="/docs/svelte/components/dashboard#settings" class="dashboard__nav-link">Settings</a>
        </nav>
      {/snippet}
      <div class="dashboard-page">
        <header class="dashboard-page__header">
          <h1 class="dashboard-page__title">Dashboard</h1>
          <p class="dashboard-page__subtitle">Overview. Same structure as the <a href="/blocks/dashboard-01">Dashboard block</a>.</p>
        </header>
        <section class="dashboard-page__stats" aria-labelledby="svelte-demo-stats-heading">
          <h2 id="svelte-demo-stats-heading" class="sr-only">Key metrics</h2>
          <div class="dashboard-page__stats-grid">
            <Card class="dashboard-page__stat">
              <div class="card__body">
                <span class="card__label">Total users</span>
                <span class="card__value">1,234</span>
              </div>
            </Card>
            <Card class="dashboard-page__stat">
              <div class="card__body">
                <span class="card__label">Revenue</span>
                <span class="card__value">$12,345</span>
              </div>
            </Card>
            <Card class="dashboard-page__stat">
              <div class="card__body">
                <span class="card__label">Active</span>
                <span class="card__value">89%</span>
              </div>
            </Card>
          </div>
        </section>
        <section class="dashboard-page__table" aria-labelledby="svelte-demo-table-heading">
          <h2 id="svelte-demo-table-heading" class="dashboard-page__section-title">Recent activity</h2>
          <div class="table-wrapper">
            <table class="table">
              <caption class="sr-only">Recent activity list</caption>
              <thead>
                <tr class="table__row">
                  <th scope="col" class="table__cell table__cell--header">Name</th>
                  <th scope="col" class="table__cell table__cell--header">Status</th>
                  <th scope="col" class="table__cell table__cell--header">Date</th>
                </tr>
              </thead>
              <tbody>
                <tr class="table__row">
                  <td class="table__cell">Item one</td>
                  <td class="table__cell"><span class="badge badge--success">Done</span></td>
                  <td class="table__cell">Today</td>
                </tr>
                <tr class="table__row">
                  <td class="table__cell">Item two</td>
                  <td class="table__cell"><span class="badge badge--warning">Pending</span></td>
                  <td class="table__cell">Yesterday</td>
                </tr>
                <tr class="table__row">
                  <td class="table__cell">Item three</td>
                  <td class="table__cell"><span class="badge badge--error">Failed</span></td>
                  <td class="table__cell">Jan 15</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </Dashboard>
  </div>
  <h3>Usage</h3>
  <CodeBlock
    code={`<script>
  import { Dashboard } from '$lib/rizzo';
</script>

<Dashboard sidebarLabel="App navigation">
  {#snippet sidebar()}
    <nav class="dashboard__nav">
      <a href="/dashboard" class="dashboard__nav-link dashboard__nav-link--active" aria-current="page">Dashboard</a>
      <a href="/items" class="dashboard__nav-link">Items</a>
      <a href="/settings" class="dashboard__nav-link">Settings</a>
    </nav>
  {/snippet}
  <h1>Dashboard</h1>
  <p>Your content here.</p>
</Dashboard>`}
    language="svelte"
  />
  <p><a href="/docs/components/dashboard">Full Astro Dashboard documentation</a> — props, BEM classes, and the <a href="/blocks/dashboard-01">Dashboard block</a> for a complete example.</p>
  <p><strong>Other frameworks:</strong> <a href="/docs/components/dashboard">Astro</a> · <a href="/docs/vanilla/components/dashboard">Vanilla</a> · <a href="/docs/vue/components/dashboard">Vue</a> · <a href="/docs/react/components/dashboard">React</a></p>
  <p><a href="/docs/svelte/components">← Back to Svelte components</a></p>
</section>

<style>
  .dashboard-demo-wrap {
    border: 1px solid var(--border);
    border-radius: var(--radius-lg);
    overflow: hidden;
    min-height: 14rem;
  }
  .dashboard-demo-wrap :global(.dashboard) {
    min-height: 14rem;
  }
</style>
