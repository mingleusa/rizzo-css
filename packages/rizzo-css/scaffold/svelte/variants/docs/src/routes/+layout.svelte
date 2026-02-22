<script lang="ts">
  let { children } = $props();
</script>

<div class="docs-layout">
  <aside class="docs-layout__sidebar" aria-label="Documentation navigation">
    <nav class="docs-layout__nav">
      <a href="/" class="docs-layout__nav-link">Home</a>
      <a href="/docs/getting-started" class="docs-layout__nav-link">Getting started</a>
    </nav>
  </aside>
  <main id="main-content" class="docs-layout__main">
    {@render children()}
  </main>
</div>

<style>
  .docs-layout {
    display: flex;
    min-height: 100vh;
  }
  .docs-layout__sidebar {
    width: 16rem;
    flex-shrink: 0;
    border-right: 1px solid var(--border);
    padding: var(--spacing-4);
    background: var(--background-alt);
  }
  .docs-layout__nav {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-1);
  }
  .docs-layout__nav-link {
    display: block;
    padding: var(--spacing-2) var(--spacing-3);
    border-radius: var(--radius-md);
    color: var(--text);
    text-decoration: none;
  }
  .docs-layout__nav-link:hover {
    background: var(--background);
  }
  .docs-layout__main {
    flex: 1;
    padding: var(--spacing-6);
    max-width: 65ch;
    overflow: auto;
  }
  @media (max-width: 768px) {
    .docs-layout {
      flex-direction: column;
    }
    .docs-layout__sidebar {
      width: 100%;
      border-right: none;
      border-bottom: 1px solid var(--border);
    }
  }
</style>
