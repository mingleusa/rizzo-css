<script lang="ts">
  import Empty from '../../Empty.svelte';
  import CodeBlock from '../CodeBlock.svelte';
  import AddComponentTabs from '../AddComponentTabs.svelte';
</script>

<section>
  <h2>Empty component</h2>
  <p>Empty state for no results or empty lists. Slots: <code>icon</code>, default (none), <code>action</code>.</p>
  <AddComponentTabs componentName="Empty" />
  <div class="example">
    <div class="example-title">Live example</div>
    <Empty title="No items yet" description="Get started by adding your first item.">
      {#snippet action()}
        <button type="button" class="btn btn-primary">Add item</button>
      {/snippet}
    </Empty>
  </div>
  <CodeBlock code={`<script>
  import Empty from './components/svelte/Empty.svelte';
</script>

<Empty title="No items yet" description="Get started by adding your first item.">
  {#snippet action()}
    <button type="button" class="btn btn-primary">Add item</button>
  {/snippet}
</Empty>`} language="svelte" />
</section>

<style>
  .example { margin: var(--spacing-6) 0; padding: var(--spacing-4); background: var(--background-alt); border: 1px solid var(--border); border-radius: var(--radius-lg); }
  .example-title { font-size: var(--font-size-sm); font-weight: var(--font-weight-medium); color: var(--text-dim); margin-bottom: var(--spacing-3); text-transform: uppercase; letter-spacing: var(--letter-spacing-wider); }
</style>
