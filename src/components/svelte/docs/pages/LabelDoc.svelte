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
    <div class="form-group">
      <Label for="label-demo-input" required>Email</Label>
      <input id="label-demo-input" type="email" class="form-input" placeholder="you@example.com" style="display: block; margin-top: var(--spacing-1);" />
    </div>
  </div>
  <CodeBlock code={`<script>
  import { Label } from '$lib/rizzo';
</script>

<Label for="label-demo-input" required>Email</Label>
<input id="label-demo-input" type="email" placeholder="you@example.com" class="form-input" />`} language="svelte" />

  <p><strong>Other frameworks:</strong> <a href="/docs/components/label">Astro</a> · <a href="/docs/vanilla/components/label">Vanilla</a> · <a href="/docs/vue/components/label">Vue</a> · <a href="/docs/react/components/label">React</a></p>
  <p><a href="/docs/svelte/components">← Back to Svelte components</a></p>
</section>

<style>
  .example { margin: var(--spacing-6) 0; padding: var(--spacing-4); background: var(--background-alt); border: 1px solid var(--border); border-radius: var(--radius-lg); }
  .example-title { font-size: var(--font-size-sm); font-weight: var(--font-weight-medium); color: var(--text-dim); margin-bottom: var(--spacing-3); text-transform: uppercase; letter-spacing: var(--letter-spacing-wider); }
</style>
