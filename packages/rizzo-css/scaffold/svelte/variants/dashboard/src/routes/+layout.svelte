<script lang="ts">
  let { children } = $props();
</script>

<div class="dashboard">
  <aside class="dashboard__sidebar" aria-label="Dashboard navigation">
    <nav class="dashboard__nav">
      <a href="/" class="dashboard__nav-link dashboard__nav-link--active" aria-current="page">Dashboard</a>
      <a href="/" class="dashboard__nav-link">Items</a>
      <a href="/" class="dashboard__nav-link">Settings</a>
    </nav>
  </aside>
  <main id="main-content" class="dashboard__main">
    {@render children()}
  </main>
</div>

<style>
  .dashboard {
    display: flex;
    min-height: 100vh;
  }
  .dashboard__sidebar {
    width: 16rem;
    flex-shrink: 0;
    border-right: 1px solid var(--border);
    padding: var(--spacing-4);
    background: var(--background-alt);
  }
  .dashboard__nav {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-1);
  }
  .dashboard__nav-link {
    display: block;
    padding: var(--spacing-2) var(--spacing-3);
    border-radius: var(--radius-md);
    color: var(--text);
    text-decoration: none;
  }
  .dashboard__nav-link:hover {
    background: var(--background);
  }
  .dashboard__nav-link--active {
    background: var(--accent);
    color: var(--accent-text);
  }
  .dashboard__main {
    flex: 1;
    padding: var(--spacing-6);
    overflow: auto;
  }
  @media (max-width: 768px) {
    .dashboard {
      flex-direction: column;
    }
    .dashboard__sidebar {
      width: 100%;
      border-right: none;
      border-bottom: 1px solid var(--border);
    }
  }
</style>
