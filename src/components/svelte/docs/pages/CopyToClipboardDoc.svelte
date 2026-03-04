<script lang="ts">
  import CopyToClipboard from '../../CopyToClipboard.svelte';
  import CodeBlock from '../CodeBlock.svelte';
  import AddComponentTabs from '../AddComponentTabs.svelte';
</script>

<section>
  <h2>Copy to clipboard</h2>
  <p>Optional <code>label</code> and <code>format</code> for feedback text.</p>
  <AddComponentTabs componentName="Copy to Clipboard" />

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

  <p><strong>Other frameworks:</strong> <a href="/docs/components/copy-to-clipboard">Astro</a> · <a href="/docs/vanilla/components/copy-to-clipboard">Vanilla</a> · <a href="/docs/vue/components/copy-to-clipboard">Vue</a> · <a href="/docs/react/components/copy-to-clipboard">React</a></p>
  <p><a href="/docs/svelte/components">← Back to Svelte components</a></p>
</section>
