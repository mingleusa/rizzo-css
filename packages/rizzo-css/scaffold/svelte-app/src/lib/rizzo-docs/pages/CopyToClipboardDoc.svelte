<script lang="ts">
  import CopyToClipboard from '$lib/rizzo/CopyToClipboard.svelte';
  import CodeBlock from '$lib/rizzo-docs/CodeBlock.svelte';
</script>

<section>
  <h2>Copy to clipboard</h2>
  <p>Optional <code>label</code> and <code>format</code> for feedback text.</p>

  <h3>Example</h3>
  <div class="example">
    <div class="example-title">Live example</div>
    <CopyToClipboard value="pnpm add rizzo-css" label="Copy" format="command" />
  </div>

  <h3>Usage</h3>
  <CodeBlock
    code={`<script>
  import CopyToClipboard from './components/svelte/CopyToClipboard.svelte';
</script>

<CopyToClipboard value="npm install foo" label="Copy" />
<CopyToClipboard value={code} format="code" />`}
    language="svelte"
  />
</section>
