<script lang="ts">
  import Direction from '../../Direction.svelte';
  import CodeBlock from '../CodeBlock.svelte';
  import AddComponentTabs from '../AddComponentTabs.svelte';
</script>

<section>
  <h2>Direction component</h2>
  <p>Wrapper that sets <code>dir="ltr"</code> or <code>dir="rtl"</code> on the container for bidirectional content.</p>
  <AddComponentTabs componentName="Direction" />
  <div class="example">
    <div class="example-title">Live example</div>
    <Direction dir="rtl">
      <p>Right-to-left content here.</p>
    </Direction>
  </div>
  <CodeBlock code={`<script>
  import { Direction } from '$lib/rizzo';
</script>

<Direction dir="rtl">
  <p>Right-to-left content here.</p>
</Direction>`} language="svelte" />

  <p><strong>Other frameworks:</strong> <a href="/docs/components/direction">Astro</a> · <a href="/docs/vanilla/components/direction">Vanilla</a> · <a href="/docs/vue/components/direction">Vue</a> · <a href="/docs/react/components/direction">React</a></p>
  <p><a href="/docs/svelte/components">← Back to Svelte components</a></p>
</section>

<style>
  .example { margin: var(--spacing-6) 0; padding: var(--spacing-4); background: var(--background-alt); border: 1px solid var(--border); border-radius: var(--radius-lg); }
  .example-title { font-size: var(--font-size-sm); font-weight: var(--font-weight-medium); color: var(--text-dim); margin-bottom: var(--spacing-3); text-transform: uppercase; letter-spacing: var(--letter-spacing-wider); }
</style>
