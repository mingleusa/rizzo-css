<script lang="ts">
  import Toggle from '../../Toggle.svelte';
  import CodeBlock from '../CodeBlock.svelte';
  import AddComponentTabs from '../AddComponentTabs.svelte';
</script>

<section>
  <h2>Toggle component</h2>
  <p>Toggle button with <code>aria-pressed</code> state.</p>
  <AddComponentTabs componentName="Toggle" />
  <div class="example">
    <div class="example-title">Live example</div>
    <Toggle>Off</Toggle>
    <Toggle pressed>On</Toggle>
  </div>
  <CodeBlock code={`<script>
  import Toggle from './components/svelte/Toggle.svelte';
</script>

<Toggle>Off</Toggle>
<Toggle pressed>On</Toggle>`} language="svelte" />
</section>

<style>
  .example { margin: var(--spacing-6) 0; padding: var(--spacing-4); background: var(--background-alt); border: 1px solid var(--border); border-radius: var(--radius-lg); }
  .example-title { font-size: var(--font-size-sm); font-weight: var(--font-weight-medium); color: var(--text-dim); margin-bottom: var(--spacing-3); text-transform: uppercase; letter-spacing: var(--letter-spacing-wider); }
  .example :global(button + button) { margin-left: var(--spacing-2); }
</style>
