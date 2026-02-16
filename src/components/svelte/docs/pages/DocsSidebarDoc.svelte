<script lang="ts">
  import DocsSidebar from '../../DocsSidebar.svelte';
  import AddComponentTabs from '../AddComponentTabs.svelte';
  import CodeBlock from '../CodeBlock.svelte';

  // In a real Svelte Kit app you'd use $page.url.pathname
  const currentPath = typeof window !== 'undefined' ? window.location.pathname : '/docs/svelte/components/docs-sidebar';
  const pathPrefix = '/docs/svelte';
</script>

<section>
  <h2>Docs Sidebar component</h2>
  <p>Sidebar navigation for documentation sites. Same BEM and behavior as the <a href="/docs/components/docs-sidebar">Astro Docs Sidebar</a>: grouped links (Introduction, Foundations, Components) with active state. Pass <code>currentPath</code> and <code>pathPrefix</code> so hrefs and active styling match.</p>
  <AddComponentTabs componentName="Docs Sidebar" />
  <h3>Live example</h3>
  <p>The sidebar on the left of this page is the docs layout sidebar. Below is a standalone instance.</p>
  <div class="example" style="max-height: 18rem; overflow: auto; border: 1px solid var(--border); border-radius: var(--radius-lg); padding: var(--spacing-4);">
    <DocsSidebar currentPath={currentPath} pathPrefix={pathPrefix} />
  </div>
  <h3>Usage</h3>
  <CodeBlock
    code={`<script>
  import { DocsSidebar } from '$lib/rizzo';
</script>

<DocsSidebar currentPath={$page.url.pathname} pathPrefix="/docs/svelte" />`}
    language="svelte"
  />
  <p><a href="/docs/components/docs-sidebar">Full Astro Docs Sidebar documentation</a> — props, BEM classes, and layout (toggle + overlay on mobile).</p>
  <p><a href="/docs/svelte/components">← Back to Svelte components</a></p>
</section>
