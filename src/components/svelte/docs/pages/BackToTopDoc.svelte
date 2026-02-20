<script lang="ts">
  import BackToTop from '../../BackToTop.svelte';
  import CodeBlock from '../CodeBlock.svelte';
  import AddComponentTabs from '../AddComponentTabs.svelte';
</script>

<section>
  <h2>Back to Top component</h2>
  <p>A fixed button that appears after the user scrolls down and scrolls the page back to the top on click. Uses smooth scrolling and is keyboard accessible. Optional <code>threshold</code> (pixels) and <code>label</code> props.</p>
  <AddComponentTabs componentName="Back to Top" />

  <h3>Props</h3>
  <ul>
    <li><code>threshold</code> (number, optional) — Pixels scrolled before the button appears (default: 400)</li>
    <li><code>label</code> (string, optional) — Accessible label for the button (default: "Back to top")</li>
    <li><code>class</code> (string, optional) — Additional CSS classes on the wrapper</li>
  </ul>

  <h3>Live example</h3>
  <p>Scroll down this page to see the button appear in the bottom-right corner, then click it to scroll back to top.</p>
  <div class="example">
    <div class="example-title">Back to Top (scroll to reveal)</div>
    <BackToTop threshold={200} />
  </div>

  <h3>Usage</h3>
  <CodeBlock
    code={`<script>
  import { BackToTop } from '$lib/rizzo';
</script>

<BackToTop />

<BackToTop threshold={300} label="Scroll to top" />`}
    language="svelte"
  />
</section>

<style>
  .example {
    margin: var(--spacing-6) 0;
    padding: var(--spacing-4);
    background: var(--background-alt);
    border: 1px solid var(--border);
    border-radius: var(--radius-lg);
  }
  .example-title {
    font-size: var(--font-size-sm);
    font-weight: var(--font-weight-medium);
    color: var(--text-dim);
    margin-bottom: var(--spacing-3);
    text-transform: uppercase;
    letter-spacing: var(--letter-spacing-wider);
  }
</style>
