<script lang="ts">
  import ScrollArea from '../../ScrollArea.svelte';
  import CodeBlock from '../CodeBlock.svelte';
  import AddComponentTabs from '../AddComponentTabs.svelte';
</script>

<section>
  <h2>Scroll Area component</h2>
  <p>Scrollable area with themed scrollbar. Use a fixed height (or width for horizontal).</p>
  <AddComponentTabs componentName="ScrollArea" />
  <div class="example">
    <div class="example-title">Live example (vertical)</div>
    <ScrollArea class="scroll-demo" style="height: 10rem; width: 12rem; border: 1px solid var(--border); border-radius: var(--radius-md);">
      <div style="padding: var(--spacing-4);">
        <p style="margin: 0 0 var(--spacing-2) 0;">Line 1</p>
        <p style="margin: 0 0 var(--spacing-2) 0;">Line 2</p>
        <p style="margin: 0 0 var(--spacing-2) 0;">Line 3</p>
        <p style="margin: 0 0 var(--spacing-2) 0;">Line 4</p>
        <p style="margin: 0;">Line 5</p>
      </div>
    </ScrollArea>
  </div>
  <CodeBlock code={`<script>
  import ScrollArea from './components/svelte/ScrollArea.svelte';
</script>

<ScrollArea style="height: 12rem;">
  ... content ...
</ScrollArea>`} language="svelte" />
</section>

<style>
  .example { margin: var(--spacing-6) 0; padding: var(--spacing-4); background: var(--background-alt); border: 1px solid var(--border); border-radius: var(--radius-lg); }
  .example-title { font-size: var(--font-size-sm); font-weight: var(--font-weight-medium); color: var(--text-dim); margin-bottom: var(--spacing-3); text-transform: uppercase; letter-spacing: var(--letter-spacing-wider); }
</style>
