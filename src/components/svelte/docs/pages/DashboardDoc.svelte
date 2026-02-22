<script lang="ts">
  import Dashboard from '../../Dashboard.svelte';
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
      <h3 style="margin: 0 0 var(--spacing-2);">Main content</h3>
      <p style="margin: 0;">Put your page content here. Combine with Card, Table, and other Rizzo components.</p>
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
