<script lang="ts">
  import Collapsible from '../../Collapsible.svelte';
  import CodeBlock from '../CodeBlock.svelte';
  import AddComponentTabs from '../AddComponentTabs.svelte';
</script>

<section>
  <h2>Collapsible component</h2>
  <p>Single expand/collapse section (one trigger, one panel).</p>
  <AddComponentTabs componentName="Collapsible" />
  <div class="example">
    <div class="example-title">Live example</div>
    <Collapsible triggerLabel="Show more" defaultOpen={false}>
      <p>This content is shown when the collapsible is expanded. Use <strong>Accordion</strong> when you need multiple sections.</p>
    </Collapsible>
  </div>
  <CodeBlock code={`<script>
  import { Collapsible } from '$lib/rizzo';
</script>

<Collapsible triggerLabel="Show more">
  <p>This content is shown when the collapsible is expanded. Use <strong>Accordion</strong> when you need multiple sections.</p>
</Collapsible>`} language="svelte" />

  <p><strong>Other frameworks:</strong> <a href="/docs/components/collapsible">Astro</a> · <a href="/docs/vanilla/components/collapsible">Vanilla</a> · <a href="/docs/vue/components/collapsible">Vue</a> · <a href="/docs/react/components/collapsible">React</a></p>
  <p><a href="/docs/svelte/components">← Back to Svelte components</a></p>
</section>

<style>
  .example { margin: var(--spacing-6) 0; padding: var(--spacing-4); background: var(--background-alt); border: 1px solid var(--border); border-radius: var(--radius-lg); }
  .example-title { font-size: var(--font-size-sm); font-weight: var(--font-weight-medium); color: var(--text-dim); margin-bottom: var(--spacing-3); text-transform: uppercase; letter-spacing: var(--letter-spacing-wider); }
</style>
