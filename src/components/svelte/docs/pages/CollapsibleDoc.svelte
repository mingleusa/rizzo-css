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
    <Collapsible triggerLabel="Toggle" defaultOpen={false}>
      Panel content here. Click the trigger to expand or collapse.
    </Collapsible>
  </div>
  <CodeBlock code={`<script>
  import Collapsible from './components/svelte/Collapsible.svelte';
</script>

<Collapsible triggerLabel="Toggle">
  Content inside panel.
</Collapsible>`} language="svelte" />
</section>

<style>
  .example { margin: var(--spacing-6) 0; padding: var(--spacing-4); background: var(--background-alt); border: 1px solid var(--border); border-radius: var(--radius-lg); }
  .example-title { font-size: var(--font-size-sm); font-weight: var(--font-weight-medium); color: var(--text-dim); margin-bottom: var(--spacing-3); text-transform: uppercase; letter-spacing: var(--letter-spacing-wider); }
</style>
