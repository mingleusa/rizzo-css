<script lang="ts">
  import Spinner from '../../Spinner.svelte';
  import CodeBlock from '../CodeBlock.svelte';
  import AddComponentTabs from '../AddComponentTabs.svelte';
</script>

<section>
  <h2>Spinner component</h2>
  <p>Respects reduced motion via CSS.</p>
  <AddComponentTabs componentName="Spinner" />

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
  import { Spinner } from '$lib/rizzo';
</script>

<Spinner />
<Spinner size="lg" variant="success" label="Loading…" />`}
    language="svelte"
  />

  <p><strong>Other frameworks:</strong> <a href="/docs/components/spinner">Astro</a> · <a href="/docs/vanilla/components/spinner">Vanilla</a> · <a href="/docs/vue/components/spinner">Vue</a> · <a href="/docs/react/components/spinner">React</a></p>
  <p><a href="/docs/svelte/components">← Back to Svelte components</a></p>
</section>

<style>
  .example-row {
    display: flex;
    flex-wrap: wrap;
    gap: var(--spacing-4);
    align-items: center;
  }
</style>
