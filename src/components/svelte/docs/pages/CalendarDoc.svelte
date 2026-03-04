<script lang="ts">
  import Calendar from '../../Calendar.svelte';
  import CodeBlock from '../CodeBlock.svelte';
  import AddComponentTabs from '../AddComponentTabs.svelte';
</script>

<section>
  <h2>Calendar component</h2>
  <p>Month-grid calendar for date display or date picker. Previous/next month navigation, optional selected date. Fires <code>calendar-select</code> with <code>event.detail.date</code> (YYYY-MM-DD).</p>
  <AddComponentTabs componentName="Calendar" />

  <h3>Live example</h3>
  <div class="example">
    <div class="example-title">Calendar</div>
    <Calendar label="Choose a date" />
  </div>

  <h3>Usage</h3>
  <CodeBlock
    code={`<script>
  import { Calendar } from '$lib/rizzo';
</script>

<Calendar label="Choose a date" />`}
    language="svelte"
  />

  <p><strong>Other frameworks:</strong> <a href="/docs/components/calendar">Astro</a> · <a href="/docs/vanilla/components/calendar">Vanilla</a> · <a href="/docs/vue/components/calendar">Vue</a> · <a href="/docs/react/components/calendar">React</a></p>
  <p><a href="/docs/svelte/components">← Back to Svelte components</a></p>
</section>

<style>
  .example { margin: var(--spacing-6) 0; padding: var(--spacing-4); background: var(--background-alt); border: 1px solid var(--border); border-radius: var(--radius-lg); }
  .example-title { font-size: var(--font-size-sm); font-weight: var(--font-weight-medium); color: var(--text-dim); margin-bottom: var(--spacing-3); text-transform: uppercase; letter-spacing: var(--letter-spacing-wider); }
</style>
