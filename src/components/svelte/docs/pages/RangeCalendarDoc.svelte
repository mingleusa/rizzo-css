<script lang="ts">
  import RangeCalendar from '../../RangeCalendar.svelte';
  import CodeBlock from '../CodeBlock.svelte';
  import AddComponentTabs from '../AddComponentTabs.svelte';
</script>

<section>
  <h2>Range Calendar component</h2>
  <p>Date range selection: two clicks set start and end. Fires <code>range-calendar-select</code> with <code>event.detail.start</code> and <code>event.detail.end</code> (YYYY-MM-DD).</p>
  <AddComponentTabs componentName="Range Calendar" />

  <h3>Live example</h3>
  <div class="example">
    <div class="example-title">Range Calendar</div>
    <RangeCalendar label="Choose date range" />
  </div>

  <h3>Usage</h3>
  <CodeBlock
    code={`<script>
  import { RangeCalendar } from '$lib/rizzo';
</script>

<RangeCalendar label="Choose date range" />`}
    language="svelte"
  />

  <p><strong>Other frameworks:</strong> <a href="/docs/components/range-calendar">Astro</a> · <a href="/docs/vanilla/components/range-calendar">Vanilla</a> · <a href="/docs/vue/components/range-calendar">Vue</a> · <a href="/docs/react/components/range-calendar">React</a></p>
  <p><a href="/docs/svelte/components">← Back to Svelte components</a></p>
</section>

<style>
  .example { margin: var(--spacing-6) 0; padding: var(--spacing-4); background: var(--background-alt); border: 1px solid var(--border); border-radius: var(--radius-lg); }
  .example-title { font-size: var(--font-size-sm); font-weight: var(--font-weight-medium); color: var(--text-dim); margin-bottom: var(--spacing-3); text-transform: uppercase; letter-spacing: var(--letter-spacing-wider); }
</style>
