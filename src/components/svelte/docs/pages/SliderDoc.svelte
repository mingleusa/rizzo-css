<script lang="ts">
  import Slider from '../../Slider.svelte';
  import CodeBlock from '../CodeBlock.svelte';
  import AddComponentTabs from '../AddComponentTabs.svelte';
</script>

<section>
  <h2>Slider component</h2>
  <p>Range slider input with themed track and fill.</p>
  <AddComponentTabs componentName="Slider" />
  <div class="example">
    <div class="example-title">Live example</div>
    <Slider ariaLabel="Volume" min={0} max={100} value={50} />
  </div>
  <CodeBlock code={`<script>
  import { Slider } from '$lib/rizzo';
</script>

<Slider ariaLabel="Volume" min={0} max={100} value={50} />`} language="svelte" />

  <p><strong>Other frameworks:</strong> <a href="/docs/components/slider">Astro</a> · <a href="/docs/vanilla/components/slider">Vanilla</a> · <a href="/docs/vue/components/slider">Vue</a> · <a href="/docs/react/components/slider">React</a></p>
  <p><a href="/docs/svelte/components">← Back to Svelte components</a></p>
</section>

<style>
  .example { margin: var(--spacing-6) 0; padding: var(--spacing-4); background: var(--background-alt); border: 1px solid var(--border); border-radius: var(--radius-lg); }
  .example-title { font-size: var(--font-size-sm); font-weight: var(--font-weight-medium); color: var(--text-dim); margin-bottom: var(--spacing-3); text-transform: uppercase; letter-spacing: var(--letter-spacing-wider); }
</style>
