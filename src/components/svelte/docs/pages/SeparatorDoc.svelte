<script lang="ts">
  import Separator from '../../Separator.svelte';
  import CodeBlock from '../CodeBlock.svelte';
  import AddComponentTabs from '../AddComponentTabs.svelte';
</script>

<section>
  <h2>Separator component</h2>
  <p>Thin separator line (horizontal or vertical). Use <a href="/docs/components/divider">Divider</a> when you need a label (e.g. "OR").</p>
  <AddComponentTabs componentName="Separator" />
  <div class="example">
    <div class="example-title">Live example</div>
    <div>Above</div>
    <Separator />
    <div>Below</div>
  </div>
  <CodeBlock code={`<script>
  import Separator from './components/svelte/Separator.svelte';
</script>

<Separator />
<Separator orientation="vertical" />`} language="svelte" />
</section>

<style>
  .example { margin: var(--spacing-6) 0; padding: var(--spacing-4); background: var(--background-alt); border: 1px solid var(--border); border-radius: var(--radius-lg); }
  .example-title { font-size: var(--font-size-sm); font-weight: var(--font-weight-medium); color: var(--text-dim); margin-bottom: var(--spacing-3); text-transform: uppercase; letter-spacing: var(--letter-spacing-wider); }
</style>
