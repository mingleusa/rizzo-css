<script lang="ts">
  import Spinner from '../../Spinner.svelte';
  import CodeBlock from '../CodeBlock.svelte';
</script>

<section>
  <h2>Spinner component</h2>
  <p>Respects reduced motion via CSS.</p>

  <h3>Sizes and variants</h3>
  <div class="example">
    <div class="example-title">Live examples</div>
    <div class="example-row">
      <Spinner size="sm" />
      <Spinner size="md" />
      <Spinner size="lg" />
      <Spinner variant="success" />
      <Spinner variant="error" label="Loading…" />
    </div>
  </div>

  <h3>Usage</h3>
  <CodeBlock
    code={`<script>
  import Spinner from '@rizzo-css/svelte/Spinner.svelte';
</script>

<Spinner />
<Spinner size="lg" variant="success" label="Loading…" />`}
    language="svelte"
  />
</section>

<style>
  .example-row {
    display: flex;
    flex-wrap: wrap;
    gap: var(--spacing-4);
    align-items: center;
  }
</style>
