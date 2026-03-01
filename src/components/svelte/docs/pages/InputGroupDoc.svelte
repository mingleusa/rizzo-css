<script lang="ts">
  import InputGroup from '../../InputGroup.svelte';
  import CodeBlock from '../CodeBlock.svelte';
  import AddComponentTabs from '../AddComponentTabs.svelte';
</script>

<section>
  <h2>Input Group</h2>
  <p>Input with optional prefix and suffix addons (e.g. currency, domain). Uses Rizzo BEM classes and design tokens.</p>
  <AddComponentTabs componentName="Input Group" />
  <div class="example">
    <div class="example-title">Currency</div>
    <InputGroup placeholder="0.00">
      {#snippet prefix()}${/snippet}
      {#snippet suffix()}USD{/snippet}
    </InputGroup>
  </div>
  <div class="example">
    <div class="example-title">Domain</div>
    <InputGroup placeholder="mysite">
      {#snippet prefix()}https://{/snippet}
      {#snippet suffix()}.com{/snippet}
    </InputGroup>
  </div>
  <CodeBlock code={`<script>
  import InputGroup from './components/svelte/InputGroup.svelte';
</script>

<InputGroup placeholder="0.00">
  {#snippet prefix()}\${/snippet}
  {#snippet suffix()}USD{/snippet}
</InputGroup>`} language="svelte" />
</section>

<style>
  .example { margin: var(--spacing-6) 0; padding: var(--spacing-4); background: var(--background-alt); border: 1px solid var(--border); border-radius: var(--radius-lg); }
  .example-title { font-size: var(--font-size-sm); font-weight: var(--font-weight-medium); color: var(--text-dim); margin-bottom: var(--spacing-3); text-transform: uppercase; letter-spacing: var(--letter-spacing-wider); }
</style>
