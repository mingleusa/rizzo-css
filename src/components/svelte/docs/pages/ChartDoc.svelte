<script lang="ts">
  import Chart from '../../Chart.svelte';
  import CodeBlock from '../CodeBlock.svelte';
  import AddComponentTabs from '../AddComponentTabs.svelte';
</script>

<section>
  <h2>Chart component</h2>
  <p>Simple bar chart using theme variables. Pass a <code>data</code> array of <code>{ label, value }</code>.</p>
  <AddComponentTabs componentName="Chart" />
  <div class="example">
    <div class="example-title">Live example</div>
    <Chart data={[{ label: 'A', value: 40 }, { label: 'B', value: 65 }, { label: 'C', value: 30 }, { label: 'D', value: 90 }]} />
  </div>
  <CodeBlock code={`<script>
  import { Chart } from '$lib/rizzo';
</script>

<Chart data={[{ label: 'A', value: 40 }, { label: 'B', value: 65 }, { label: 'C', value: 30 }]} />`} language="svelte" />

  <p><strong>Other frameworks:</strong> <a href="/docs/components/chart">Astro</a> · <a href="/docs/vanilla/components/chart">Vanilla</a> · <a href="/docs/vue/components/chart">Vue</a> · <a href="/docs/react/components/chart">React</a></p>
  <p><a href="/docs/svelte/components">← Back to Svelte components</a></p>
</section>

<style>
  .example { margin: var(--spacing-6) 0; padding: var(--spacing-4); background: var(--background-alt); border: 1px solid var(--border); border-radius: var(--radius-lg); }
  .example-title { font-size: var(--font-size-sm); font-weight: var(--font-weight-medium); color: var(--text-dim); margin-bottom: var(--spacing-3); text-transform: uppercase; letter-spacing: var(--letter-spacing-wider); }
</style>
