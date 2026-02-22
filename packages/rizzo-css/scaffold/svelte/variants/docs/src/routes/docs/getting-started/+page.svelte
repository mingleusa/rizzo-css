<article class="docs-page">
  <h1 class="docs-page__title">Getting started</h1>
  <p>This is a sample doc page. Edit <code>src/routes/docs/getting-started/+page.svelte</code> and add your own content.</p>
  <h2>Next steps</h2>
  <ul>
    <li>Add more pages in <code>src/routes/docs/</code></li>
    <li>Update the sidebar links in <code>src/routes/+layout.svelte</code></li>
    <li>Add the DocsSidebar component via <code>npx rizzo-css add DocsSidebar</code> for a richer nav</li>
  </ul>
</article>

<style>
  .docs-page__title {
    font-size: var(--text-2xl);
    margin: 0 0 var(--spacing-4);
  }
  .docs-page :global(h2) {
    font-size: var(--text-lg);
    margin: var(--spacing-6) 0 var(--spacing-2);
  }
  .docs-page :global(ul) {
    margin: 0 0 var(--spacing-4);
    padding-left: var(--spacing-6);
  }
  .docs-page :global(code) {
    padding: var(--spacing-1) var(--spacing-2);
    border-radius: var(--radius-sm);
    background: var(--background-alt);
    font-size: var(--text-sm);
  }
</style>
