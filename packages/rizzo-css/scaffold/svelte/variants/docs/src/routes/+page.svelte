<div class="docs-home">
  <h1 class="docs-home__title">Documentation</h1>
  <p class="docs-home__intro">
    Welcome to your docs. Add more pages under <code>src/routes/docs/</code> and link them from the sidebar.
  </p>
  <ul class="docs-home__list">
    <li><a href="/docs/getting-started">Getting started</a></li>
  </ul>
</div>

<style>
  .docs-home__title {
    font-size: var(--text-2xl);
    margin: 0 0 var(--spacing-4);
  }
  .docs-home__intro {
    margin: 0 0 var(--spacing-4);
    color: var(--text-dim);
  }
  .docs-home__intro :global(code) {
    padding: var(--spacing-1) var(--spacing-2);
    border-radius: var(--radius-sm);
    background: var(--background-alt);
    font-size: var(--text-sm);
  }
  .docs-home__list {
    list-style: none;
    margin: 0;
    padding: 0;
  }
  .docs-home__list li {
    margin-bottom: var(--spacing-2);
  }
</style>
