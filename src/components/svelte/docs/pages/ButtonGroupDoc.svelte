<script lang="ts">
  import ButtonGroup from '../../ButtonGroup.svelte';
  import Button from '../../Button.svelte';
  import CodeBlock from '../CodeBlock.svelte';
  import AddComponentTabs from '../AddComponentTabs.svelte';
</script>

<section>
  <h2>Button Group component</h2>
  <p>Group of buttons attached together (horizontal or vertical).</p>
  <AddComponentTabs componentName="ButtonGroup" />
  <div class="example">
    <div class="example-title">Live example</div>
    <ButtonGroup>
      <Button>One</Button>
      <Button>Two</Button>
      <Button>Three</Button>
    </ButtonGroup>
  </div>
  <CodeBlock code={`<script>
  import ButtonGroup from './components/svelte/ButtonGroup.svelte';
  import Button from './components/svelte/Button.svelte';
</script>

<ButtonGroup>
  <Button>One</Button>
  <Button>Two</Button>
</ButtonGroup>`} language="svelte" />
</section>

<style>
  .example { margin: var(--spacing-6) 0; padding: var(--spacing-4); background: var(--background-alt); border: 1px solid var(--border); border-radius: var(--radius-lg); }
  .example-title { font-size: var(--font-size-sm); font-weight: var(--font-weight-medium); color: var(--text-dim); margin-bottom: var(--spacing-3); text-transform: uppercase; letter-spacing: var(--letter-spacing-wider); }
</style>
