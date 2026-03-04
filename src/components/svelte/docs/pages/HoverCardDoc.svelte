<script lang="ts">
  import HoverCard from '../../HoverCard.svelte';
  import CodeBlock from '../CodeBlock.svelte';
  import AddComponentTabs from '../AddComponentTabs.svelte';
</script>

<section>
  <h2>Hover Card component</h2>
  <p>Floating panel that opens on hover (with optional open/close delay).</p>
  <AddComponentTabs componentName="HoverCard" />
  <div class="example">
    <div class="example-title">Live example</div>
    <HoverCard>
      {#snippet trigger()}
        <span style="cursor: pointer; text-decoration: underline;">Hover me</span>
      {/snippet}
      <div style="min-width: 16rem;">
        <p style="margin: 0; font-size: var(--font-size-sm);">SvelteKit — Web development, streamlined.</p>
      </div>
    </HoverCard>
  </div>
  <CodeBlock code={`<script>
  import HoverCard from './components/svelte/HoverCard.svelte';
</script>

<HoverCard>
  {#snippet trigger()} Hover me {/snippet}
  <p>Content on hover.</p>
</HoverCard>`} language="svelte" />

  <p><strong>Other frameworks:</strong> <a href="/docs/components/hover-card">Astro</a> · <a href="/docs/vanilla/components/hover-card">Vanilla</a> · <a href="/docs/vue/components/hover-card">Vue</a> · <a href="/docs/react/components/hover-card">React</a></p>
  <p><a href="/docs/svelte/components">← Back to Svelte components</a></p>
</section>

<style>
  .example { margin: var(--spacing-6) 0; padding: var(--spacing-4); background: var(--background-alt); border: 1px solid var(--border); border-radius: var(--radius-lg); }
  .example-title { font-size: var(--font-size-sm); font-weight: var(--font-weight-medium); color: var(--text-dim); margin-bottom: var(--spacing-3); text-transform: uppercase; letter-spacing: var(--letter-spacing-wider); }
</style>
