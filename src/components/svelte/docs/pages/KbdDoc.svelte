<script lang="ts">
  import Kbd from '../../Kbd.svelte';
  import CodeBlock from '../CodeBlock.svelte';
  import AddComponentTabs from '../AddComponentTabs.svelte';
</script>

<section>
  <h2>Kbd component</h2>
  <p>Keyboard key styling for shortcuts (e.g. Ctrl+K).</p>
  <AddComponentTabs componentName="Kbd" />
  <div class="example">
    <div class="example-title">Live example</div>
    <p style="margin: 0;"><Kbd>Ctrl</Kbd>+<Kbd>K</Kbd> to open search · <Kbd>Enter</Kbd> to submit</p>
  </div>
  <CodeBlock code={`<script>
  import { Kbd } from '$lib/rizzo';
</script>

<Kbd>Ctrl</Kbd>+<Kbd>K</Kbd>`} language="svelte" />

  <p><strong>Other frameworks:</strong> <a href="/docs/components/kbd">Astro</a> · <a href="/docs/vanilla/components/kbd">Vanilla</a> · <a href="/docs/vue/components/kbd">Vue</a> · <a href="/docs/react/components/kbd">React</a></p>
  <p><a href="/docs/svelte/components">← Back to Svelte components</a></p>
</section>

<style>
  .example { margin: var(--spacing-6) 0; padding: var(--spacing-4); background: var(--background-alt); border: 1px solid var(--border); border-radius: var(--radius-lg); }
  .example-title { font-size: var(--font-size-sm); font-weight: var(--font-weight-medium); color: var(--text-dim); margin-bottom: var(--spacing-3); text-transform: uppercase; letter-spacing: var(--letter-spacing-wider); }
</style>
