<script lang="ts">
  import CopyToClipboard from '../../CopyToClipboard.svelte';
  import CodeBlock from '../CodeBlock.svelte';
</script>

<section>
  <h2>Copy to clipboard</h2>
  <p>Optional <code>label</code> and <code>format</code> for feedback text.</p>

  <h3>Example</h3>
  <div class="example">
    <div class="example-title">Live example</div>
    <CopyToClipboard value="npm install @rizzo-css/svelte" label="Copy" format="command" />
  </div>

  <h3>Usage</h3>
  <CodeBlock
    code={`<script>
  import CopyToClipboard from '@rizzo-css/svelte/CopyToClipboard.svelte';
</script>

<CopyToClipboard value="npm install foo" label="Copy" />
<CopyToClipboard value={code} format="code" />`}
    language="svelte"
  />
</section>
