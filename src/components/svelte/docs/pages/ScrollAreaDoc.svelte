<script lang="ts">
  import ScrollArea from '../../ScrollArea.svelte';
  import CodeBlock from '../CodeBlock.svelte';
  import AddComponentTabs from '../AddComponentTabs.svelte';
  const scrollAreaTags = Array.from({ length: 20 }, (_, i) => `v1.2.0-beta.${20 - i}`);
</script>

<section>
  <h2>Scroll Area component</h2>
  <p>Scrollable area with themed scrollbar. Use a fixed height (or width for horizontal).</p>
  <AddComponentTabs componentName="ScrollArea" />
  <div class="example">
    <div class="example-title">Live example</div>
    <ScrollArea class="scroll-demo" style="height: 18rem; width: 12rem; border-radius: var(--radius-md); border: var(--border-width) solid var(--border);">
      <div style="padding: var(--spacing-4);">
        <h4 style="margin: 0 0 var(--spacing-4) 0; font-size: var(--font-size-sm); font-weight: 600;">Tags</h4>
        {#each scrollAreaTags as tag}
          <div style="font-size: var(--font-size-sm); margin-bottom: var(--spacing-2);">{tag}</div>
        {/each}
      </div>
    </ScrollArea>
  </div>
  <CodeBlock code={`<script>
  import { ScrollArea } from '$lib/rizzo';
</script>

<ScrollArea style="height: 18rem; width: 12rem;">
  <div style="padding: var(--spacing-4);">
    <h4>Tags</h4>
    <div>Item 1</div>
    <div>Item 2</div>
  </div>
</ScrollArea>`} language="svelte" />

  <p><strong>Other frameworks:</strong> <a href="/docs/components/scroll-area">Astro</a> · <a href="/docs/vanilla/components/scroll-area">Vanilla</a> · <a href="/docs/vue/components/scroll-area">Vue</a> · <a href="/docs/react/components/scroll-area">React</a></p>
  <p><a href="/docs/svelte/components">← Back to Svelte components</a></p>
</section>

<style>
  .example { margin: var(--spacing-6) 0; padding: var(--spacing-4); background: var(--background-alt); border: 1px solid var(--border); border-radius: var(--radius-lg); }
  .example-title { font-size: var(--font-size-sm); font-weight: var(--font-weight-medium); color: var(--text-dim); margin-bottom: var(--spacing-3); text-transform: uppercase; letter-spacing: var(--letter-spacing-wider); }
</style>
