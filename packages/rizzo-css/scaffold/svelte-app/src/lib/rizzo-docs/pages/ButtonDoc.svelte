<script lang="ts">
  import Button from '$lib/rizzo/Button.svelte';
  import CodeBlock from '$lib/rizzo-docs/CodeBlock.svelte';
</script>

<section>
  <h2>Button component</h2>
  <p>Semantic theme variables and BEM classes (<code>btn</code>, <code>btn-primary</code>, etc.).</p>

  <h3>Button variants</h3>
  <div class="example">
    <div class="example-title">Live examples</div>
    <div class="example-buttons">
      <Button>Default</Button>
      <Button variant="primary">Primary</Button>
      <Button variant="success">Success</Button>
      <Button variant="warning">Warning</Button>
      <Button variant="error">Error</Button>
      <Button variant="info">Info</Button>
      <Button variant="outline">Outline</Button>
    </div>
  </div>

  <h3>Usage</h3>
  <CodeBlock
    code={`<script>
  import Button from './components/svelte/Button.svelte';
</script>

<Button>Click me</Button>
<Button variant="primary">Primary</Button>
<Button variant="outline">Outline</Button>

<button class="btn">Default</button>
<button class="btn btn-primary">Primary</button>`}
    language="svelte"
  />

  <h3>Disabled state</h3>
  <div class="example">
    <div class="example-title">Live example</div>
    <div class="example-buttons">
      <Button disabled>Disabled default</Button>
      <Button variant="primary" disabled>Disabled primary</Button>
    </div>
  </div>
</section>

<style>
  .example-buttons {
    display: flex;
    flex-wrap: wrap;
    gap: var(--spacing-3);
  }
</style>
