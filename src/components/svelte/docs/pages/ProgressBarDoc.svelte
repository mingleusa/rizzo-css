<script lang="ts">
  import ProgressBar from '../../ProgressBar.svelte';
  import CodeBlock from '../CodeBlock.svelte';
</script>

<section>
  <h2>Progress bar component</h2>
  <p>Determinate and indeterminate; optional label.</p>

  <h3>Examples</h3>
  <div class="example">
    <div class="example-title">Live examples</div>
    <div class="example-stack">
      <ProgressBar value={60} max={100} />
      <ProgressBar value={75} max={100} showLabel variant="success" />
      <ProgressBar indeterminate label="Loading" />
    </div>
  </div>

  <h3>Usage</h3>
  <CodeBlock
    code={`<script>
  import ProgressBar from './components/svelte/ProgressBar.svelte';
</script>

<ProgressBar value={60} max={100} />
<ProgressBar value={75} max={100} showLabel />
<ProgressBar indeterminate label="Loading" />`}
    language="svelte"
  />
</section>

<style>
  .example-stack {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-4);
  }
</style>
