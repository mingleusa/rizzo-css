<script lang="ts">
  import Divider from '../../Divider.svelte';
  import CodeBlock from '../CodeBlock.svelte';
</script>

<section>
  <h2>Divider component</h2>
  <p>BEM classes: <code>divider</code>, optional label.</p>

  <h3>Horizontal and labeled</h3>
  <div class="example">
    <div class="example-title">Live examples</div>
    <Divider />
    <Divider label="OR" />
  </div>

  <h3>Usage</h3>
  <CodeBlock
    code={`<script>
  import Divider from './components/svelte/Divider.svelte';
</script>

<Divider />
<Divider label="OR" />
<Divider orientation="vertical" />`}
    language="svelte"
  />
</section>
