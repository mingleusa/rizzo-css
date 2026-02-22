<script lang="ts">
  import ToggleGroup from '../../ToggleGroup.svelte';
  import Toggle from '../../Toggle.svelte';
  import CodeBlock from '../CodeBlock.svelte';
  import AddComponentTabs from '../AddComponentTabs.svelte';
</script>

<section>
  <h2>Toggle Group component</h2>
  <p>Group of toggle buttons (horizontal or vertical).</p>
  <AddComponentTabs componentName="ToggleGroup" />
  <div class="example">
    <div class="example-title">Live example</div>
    <ToggleGroup>
      <Toggle>Left</Toggle>
      <Toggle pressed>Center</Toggle>
      <Toggle>Right</Toggle>
    </ToggleGroup>
  </div>
  <CodeBlock code={`<script>
  import ToggleGroup from './components/svelte/ToggleGroup.svelte';
  import Toggle from './components/svelte/Toggle.svelte';
</script>

<ToggleGroup>
  <Toggle>Left</Toggle>
  <Toggle pressed>Center</Toggle>
  <Toggle>Right</Toggle>
</ToggleGroup>`} language="svelte" />
</section>

<style>
  .example { margin: var(--spacing-6) 0; padding: var(--spacing-4); background: var(--background-alt); border: 1px solid var(--border); border-radius: var(--radius-lg); }
  .example-title { font-size: var(--font-size-sm); font-weight: var(--font-weight-medium); color: var(--text-dim); margin-bottom: var(--spacing-3); text-transform: uppercase; letter-spacing: var(--letter-spacing-wider); }
</style>
