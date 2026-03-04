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
    <p class="example-hint">Click to toggle pressed state.</p>
    <div style="display: flex; flex-wrap: wrap; gap: var(--spacing-2);">
      <Toggle ariaLabel="Toggle bold">Bold</Toggle>
      <Toggle pressed ariaLabel="On">On</Toggle>
    </div>
  </div>
  <CodeBlock code={`<script>
  import { Toggle } from '$lib/rizzo';
</script>

<Toggle ariaLabel="Toggle bold">Bold</Toggle>
<Toggle pressed ariaLabel="On">On</Toggle>`} language="svelte" />

  <p><strong>Other frameworks:</strong> <a href="/docs/components/toggle">Astro</a> · <a href="/docs/vanilla/components/toggle">Vanilla</a> · <a href="/docs/vue/components/toggle">Vue</a> · <a href="/docs/react/components/toggle">React</a></p>
  <p><a href="/docs/svelte/components">← Back to Svelte components</a></p>
</section>

<style>
  .example { margin: var(--spacing-6) 0; padding: var(--spacing-4); background: var(--background-alt); border: 1px solid var(--border); border-radius: var(--radius-lg); }
  .example-title { font-size: var(--font-size-sm); font-weight: var(--font-weight-medium); color: var(--text-dim); margin-bottom: var(--spacing-3); text-transform: uppercase; letter-spacing: var(--letter-spacing-wider); }
  .example :global(button + button) { margin-left: var(--spacing-2); }
</style>
