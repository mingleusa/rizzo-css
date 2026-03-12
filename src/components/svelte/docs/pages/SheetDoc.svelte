<script lang="ts">
  import Sheet from '../../Sheet.svelte';
  import CodeBlock from '../CodeBlock.svelte';
  import AddComponentTabs from '../AddComponentTabs.svelte';
  let open = $state(false);
</script>

<section>
  <h2>Sheet component</h2>
  <p>Slide-out panel (drawer) from top, right, bottom, or left.</p>
  <AddComponentTabs componentName="Sheet" />
  <div class="example">
    <div class="example-title">Live example</div>
    <Sheet id="sheet-doc-demo" title="Sheet title" side="right" bind:open>
      <p>Sheet content. Close via overlay or close button.</p>
    </Sheet>
    <button type="button" class="btn" onclick={() => (open = true)}>Open sheet</button>
  </div>
  <CodeBlock code={`<script>
  import { Sheet } from '$lib/rizzo';
  let open = $state(false);
</script>

<Sheet id="my-sheet" title="Title" side="right" bind:open>
  Content here.
</Sheet>
<button type="button" class="btn" onclick={() => (open = true)}>Open</button>`} language="svelte" />

  <p><strong>Other frameworks:</strong> <a href="/docs/components/sheet">Astro</a> · <a href="/docs/vanilla/components/sheet">Vanilla</a> · <a href="/docs/vue/components/sheet">Vue</a> · <a href="/docs/react/components/sheet">React</a></p>
  <p><a href="/docs/svelte/components">← Back to Svelte components</a></p>
</section>

<style>
  .example { margin: var(--spacing-6) 0; padding: var(--spacing-4); background: var(--background-alt); border: 1px solid var(--border); border-radius: var(--radius-lg); }
  .example-title { font-size: var(--font-size-sm); font-weight: var(--font-weight-medium); color: var(--text-dim); margin-bottom: var(--spacing-3); text-transform: uppercase; letter-spacing: var(--letter-spacing-wider); }
</style>
