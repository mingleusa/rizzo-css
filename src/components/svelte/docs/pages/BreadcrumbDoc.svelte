<script lang="ts">
  import Breadcrumb from '../../Breadcrumb.svelte';
  import CodeBlock from '../CodeBlock.svelte';
  import AddComponentTabs from '../AddComponentTabs.svelte';
</script>

<section>
  <h2>Breadcrumb component</h2>
  <p>Separator options: chevron, slash, arrow.</p>
  <AddComponentTabs componentName="Breadcrumb" />

  <h3>Examples</h3>
  <div class="example">
    <div class="example-title">Live examples</div>
    <div class="example-stack">
      <Breadcrumb
        items={[
          { label: 'Home', href: '/' },
          { label: 'Docs', href: '/docs' },
          { label: 'Svelte' },
        ]}
      />
      <Breadcrumb
        items={[
          { label: 'Home', href: '/' },
          { label: 'Current' },
        ]}
        separator="slash"
      />
    </div>
  </div>

  <h3>Usage</h3>
  <CodeBlock
    code={`<script>
  import Breadcrumb from './components/svelte/Breadcrumb.svelte';
</script>

<Breadcrumb
  items={[
    { label: 'Home', href: '/' },
    { label: 'Docs', href: '/docs' },
    { label: 'Current' },
  ]}
/>
<Breadcrumb items={items} separator="slash" />`}
    language="svelte"
  />
</section>

<style>
  .example-stack {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-4);
  }
</style>
