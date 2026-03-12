<script lang="ts">
  import Button from '../../Button.svelte';
  import CodeBlock from '../CodeBlock.svelte';
  import AddComponentTabs from '../AddComponentTabs.svelte';
</script>

<section>
  <h2>Button component</h2>
  <p>Semantic theme variables and BEM classes (<code>btn</code>, <code>btn-primary</code>, <code>btn--sm</code>, <code>btn--lg</code>, etc.).</p>
  <AddComponentTabs componentName="Button" />

  <h3>Props</h3>
  <ul>
    <li><code>variant</code> (optional) — <code>default</code>, <code>primary</code>, <code>secondary</code>, <code>success</code>, <code>warning</code>, <code>error</code>, <code>info</code>, <code>outline</code>, <code>ghost</code></li>
    <li><code>size</code> (optional) — <code>sm</code>, <code>md</code>, <code>lg</code> (default: <code>md</code>)</li>
    <li><code>disabled</code>, <code>type</code>, <code>class</code></li>
  </ul>

  <h3>Button variants</h3>
  <div class="example">
    <div class="example-title">Live examples</div>
    <div class="example-buttons">
      <Button>Default</Button>
      <Button variant="primary">Primary</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="success">Success</Button>
      <Button variant="warning">Warning</Button>
      <Button variant="error">Error</Button>
      <Button variant="info">Info</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="ghost">Ghost</Button>
    </div>
    <p class="example-caption">Sizes: <Button variant="primary" size="sm">Small</Button> <Button variant="primary">Default</Button> <Button variant="primary" size="lg">Large</Button></p>
  </div>

  <h3>Usage</h3>
  <CodeBlock
    code={`<script>
  import { Button } from '$lib/rizzo';
</script>

<Button>Click me</Button>
<Button variant="primary">Primary</Button>
<Button variant="outline" size="sm">Outline small</Button>

<!-- Or use BEM classes on native elements -->
<button class="btn">Default</button>
<button class="btn btn-primary">Primary</button>
<button class="btn btn-outline btn--sm">Small</button>`}
    language="svelte"
  />

  <h3>Disabled State</h3>
  <div class="example">
    <div class="example-title">Live Example</div>
    <div class="example-buttons">
      <Button disabled>Disabled Default</Button>
      <Button variant="primary" disabled>Disabled Primary</Button>
    </div>
  </div>

  <p><strong>Other frameworks:</strong> <a href="/docs/components/button">Astro</a> · <a href="/docs/vanilla/components/button">Vanilla</a> · <a href="/docs/vue/components/button">Vue</a> · <a href="/docs/react/components/button">React</a></p>
  <p><a href="/docs/svelte/components">← Back to Svelte components</a></p>
</section>

<style>
  .example-buttons {
    display: flex;
    flex-wrap: wrap;
    gap: var(--spacing-3);
  }
  .example-caption {
    font-size: var(--font-size-sm);
    color: var(--text-dim);
    margin: var(--spacing-3) 0 0;
  }
</style>
