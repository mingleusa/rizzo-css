<script lang="ts">
  import Label from '../../Label.svelte';
  import CodeBlock from '../CodeBlock.svelte';
  import AddComponentTabs from '../AddComponentTabs.svelte';
</script>

<section>
  <h2>Label component</h2>
  <p>Standalone form label. Use <code>for</code> and matching <code>id</code> on the input. Set <code>required</code> for required fields.</p>
  <AddComponentTabs componentName="Label" />
  <div class="example">
    <div class="example-title">Live example</div>
    <Label for="label-demo">Email</Label>
    <input id="label-demo" type="email" class="input" style="display: block; margin-top: var(--spacing-1);" />
  </div>
  <CodeBlock code={`<script>
  import Label from './components/svelte/Label.svelte';
</script>

<Label for="email-id">Email</Label>
<input id="email-id" type="email" />`} language="svelte" />
</section>

<style>
  .example { margin: var(--spacing-6) 0; padding: var(--spacing-4); background: var(--background-alt); border: 1px solid var(--border); border-radius: var(--radius-lg); }
  .example-title { font-size: var(--font-size-sm); font-weight: var(--font-weight-medium); color: var(--text-dim); margin-bottom: var(--spacing-3); text-transform: uppercase; letter-spacing: var(--letter-spacing-wider); }
</style>
