<script lang="ts">
  import Popover from '../../Popover.svelte';
  import CodeBlock from '../CodeBlock.svelte';
  import AddComponentTabs from '../AddComponentTabs.svelte';
  let open = $state(false);
</script>

<section>
  <h2>Popover component</h2>
  <p>Floating panel triggered by a button. Click outside or Escape to close.</p>
  <AddComponentTabs componentName="Popover" />
  <div class="example">
    <div class="example-title">Live example</div>
    <Popover bind:open>
      {#snippet trigger()}
        Open popover
      {/snippet}
      <p style="margin: 0;">Popover content here.</p>
    </Popover>
  </div>
  <CodeBlock code={`<script>
  import Popover from './components/svelte/Popover.svelte';
  let open = $state(false);
</script>

<Popover bind:open>
  {#snippet trigger()} Open popover {/snippet}
  <p>Content here.</p>
</Popover>`} language="svelte" />

  <p><strong>Other frameworks:</strong> <a href="/docs/components/popover">Astro</a> · <a href="/docs/vanilla/components/popover">Vanilla</a> · <a href="/docs/vue/components/popover">Vue</a> · <a href="/docs/react/components/popover">React</a></p>
  <p><a href="/docs/svelte/components">← Back to Svelte components</a></p>
</section>

<style>
  .example { margin: var(--spacing-6) 0; padding: var(--spacing-4); background: var(--background-alt); border: 1px solid var(--border); border-radius: var(--radius-lg); }
  .example-title { font-size: var(--font-size-sm); font-weight: var(--font-weight-medium); color: var(--text-dim); margin-bottom: var(--spacing-3); text-transform: uppercase; letter-spacing: var(--letter-spacing-wider); }
</style>
