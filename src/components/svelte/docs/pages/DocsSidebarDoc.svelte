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
  <p>The sidebar on the left of this page is the docs layout sidebar. Below is a compact demo with placeholder main content.</p>
  <div class="docs-sidebar-demo-layout">
    <div class="docs-sidebar-demo">
      <DocsSidebar currentPath={currentPath} pathPrefix={pathPrefix} omitId />
    </div>
    <main class="docs-sidebar-demo__main">
      <h2>Page title</h2>
      <p>This is the main content area. The sidebar links to Introduction, Foundations, and Components. Use the same layout in your docs: DocsSidebar + a main container with your page content.</p>
      <p>On mobile, the sidebar typically collapses behind a toggle.</p>
    </main>
  </div>
  <h3>Usage</h3>
  <CodeBlock
    code={`<script>
  import { DocsSidebar } from '$lib/rizzo';
</script>

<div class="docs-layout">
  <DocsSidebar currentPath={$page.url.pathname} pathPrefix="/docs/svelte" />
  <main class="docs__main">
    <div class="docs__container">
      <div class="docs__content"><!-- Your page content --></div>
    </div>
  </main>
</div>`}
    language="svelte"
  />
  <p><a href="/docs/components/docs-sidebar">Full Astro Docs Sidebar documentation</a> — props, BEM classes, and layout (toggle + overlay on mobile).</p>
  <p><strong>Other frameworks:</strong> <a href="/docs/components/docs-sidebar">Astro</a> · <a href="/docs/vanilla/components/docs-sidebar">Vanilla</a> · <a href="/docs/vue/components/docs-sidebar">Vue</a> · <a href="/docs/react/components/docs-sidebar">React</a></p>
  <p><a href="/docs/svelte/components">← Back to Svelte components</a></p>
</section>
