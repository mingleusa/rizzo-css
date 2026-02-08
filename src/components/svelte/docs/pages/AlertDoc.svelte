<script lang="ts">
  import Alert from '../../Alert.svelte';
  import CodeBlock from '../CodeBlock.svelte';
</script>

<section>
  <h2>Alert component</h2>
  <p>Variants: success, error, warning, info. Optional dismissible and auto-dismiss.</p>

  <h3>Variants</h3>
  <div class="example">
    <div class="example-title">Live examples</div>
    <div class="example-stack">
      <Alert variant="success">Success message.</Alert>
      <Alert variant="error">Error message.</Alert>
      <Alert variant="warning">Warning message.</Alert>
      <Alert variant="info" dismissible>Dismissible info alert.</Alert>
    </div>
  </div>

  <h3>Usage</h3>
  <CodeBlock
    code={`<script>
  import Alert from '@rizzo-css/svelte/Alert.svelte';
</script>

<Alert variant="success">Saved.</Alert>
<Alert variant="error" dismissible>Something went wrong.</Alert>
<Alert variant="info" autoDismiss={5000}>Auto-dismiss in 5s.</Alert>`}
    language="svelte"
  />
</section>

<style>
  .example-stack {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-3);
  }
</style>
