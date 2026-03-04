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
    <ToggleGroup type="single">
      <Toggle ariaLabel="Left">Left</Toggle>
      <Toggle pressed ariaLabel="Center">Center</Toggle>
      <Toggle ariaLabel="Right">Right</Toggle>
    </ToggleGroup>
  </div>
  <CodeBlock code={`<script>
  import { ToggleGroup, Toggle } from '$lib/rizzo';
</script>

<ToggleGroup type="single">
  <Toggle ariaLabel="Left">Left</Toggle>
  <Toggle pressed ariaLabel="Center">Center</Toggle>
  <Toggle ariaLabel="Right">Right</Toggle>
</ToggleGroup>`} language="svelte" />

  <p><strong>Other frameworks:</strong> <a href="/docs/components/toggle-group">Astro</a> · <a href="/docs/vanilla/components/toggle-group">Vanilla</a> · <a href="/docs/vue/components/toggle-group">Vue</a> · <a href="/docs/react/components/toggle-group">React</a></p>
  <p><a href="/docs/svelte/components">← Back to Svelte components</a></p>
</section>

<style>
  .example { margin: var(--spacing-6) 0; padding: var(--spacing-4); background: var(--background-alt); border: 1px solid var(--border); border-radius: var(--radius-lg); }
  .example-title { font-size: var(--font-size-sm); font-weight: var(--font-weight-medium); color: var(--text-dim); margin-bottom: var(--spacing-3); text-transform: uppercase; letter-spacing: var(--letter-spacing-wider); }
</style>
