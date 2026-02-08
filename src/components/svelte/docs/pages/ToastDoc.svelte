<script lang="ts">
  import Toast from '../../Toast.svelte';
  import CodeBlock from '../CodeBlock.svelte';
</script>

<section>
  <h2>Toast component</h2>
  <p>Positioned alert (top-right, top-left, bottom-right, etc.). Wraps Alert with dismissible and auto-dismiss.</p>

  <h3>Live example</h3>
  <div class="example">
    <div class="example-title">Toast (top-right, dismissible, 5s auto-dismiss)</div>
    <Toast variant="success" dismissible autoDismiss={5000} position="top-right">
      Changes saved.
    </Toast>
  </div>

  <h3>Usage</h3>
  <CodeBlock
    code={`<script>
  import Toast from '@rizzo-css/svelte/Toast.svelte';
</script>

<Toast variant="success" dismissible autoDismiss={5000} position="top-right">
  Saved.
</Toast>
<Toast variant="error" position="bottom-center">Error message.</Toast>`}
    language="svelte"
  />
</section>
