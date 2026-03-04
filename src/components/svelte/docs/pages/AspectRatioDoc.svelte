<script lang="ts">
  import AspectRatio from '../../AspectRatio.svelte';
  import CodeBlock from '../CodeBlock.svelte';
  import AddComponentTabs from '../AddComponentTabs.svelte';
</script>

<section>
  <h2>Aspect Ratio component</h2>
  <p>Enforces an aspect ratio on content (e.g. 16/9, 1/1).</p>
  <AddComponentTabs componentName="AspectRatio" />
  <div class="example">
    <div class="example-title">Live example (16/9)</div>
    <AspectRatio ratio={16 / 9} class="example-ratio">
      <div class="example-ratio-inner">16:9</div>
    </AspectRatio>
  </div>
  <CodeBlock code={`<script>
  import { AspectRatio } from '$lib/rizzo';
</script>

<AspectRatio ratio={16/9}>
  <img src="/hero.jpg" alt="Hero" />
</AspectRatio>`} language="svelte" />

  <p><strong>Other frameworks:</strong> <a href="/docs/components/aspect-ratio">Astro</a> · <a href="/docs/vanilla/components/aspect-ratio">Vanilla</a> · <a href="/docs/vue/components/aspect-ratio">Vue</a> · <a href="/docs/react/components/aspect-ratio">React</a></p>
  <p><a href="/docs/svelte/components">← Back to Svelte components</a></p>
</section>

<style>
  .example { margin: var(--spacing-6) 0; padding: var(--spacing-4); background: var(--background-alt); border: 1px solid var(--border); border-radius: var(--radius-lg); }
  .example-title { font-size: var(--font-size-sm); font-weight: var(--font-weight-medium); color: var(--text-dim); margin-bottom: var(--spacing-3); text-transform: uppercase; letter-spacing: var(--letter-spacing-wider); }
  .example-ratio { max-width: 20rem; }
  .example-ratio-inner { width: 100%; height: 100%; background: var(--background); border-radius: var(--radius); display: flex; align-items: center; justify-content: center; }
</style>
