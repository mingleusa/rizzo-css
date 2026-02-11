<script lang="ts">
  import Divider from '$lib/rizzo/Divider.svelte';
  import CodeBlock from '$lib/rizzo-docs/CodeBlock.svelte';
</script>

<section>
  <h2>Divider component</h2>
  <p>A simple divider for visually separating content. Supports horizontal (default) and vertical orientation, and an optional label (e.g. "OR") in the middle for horizontal dividers.</p>

  <h3>Props</h3>
  <ul>
    <li><code>orientation</code> (string, optional) — <code>horizontal</code>, <code>vertical</code> (default: horizontal)</li>
    <li><code>label</code> (string, optional) — Optional text shown in the middle (horizontal only)</li>
    <li><code>class</code> (string, optional) — Additional CSS classes</li>
  </ul>

  <h3>Basic usage (horizontal)</h3>
  <div class="example">
    <div class="example-title">Live example</div>
    <div>
      <p class="example-content">Content above</p>
      <Divider />
      <p class="example-content example-content-below">Content below</p>
    </div>
  </div>
  <CodeBlock code={`<script>
  import Divider from './components/svelte/Divider.svelte';
</script>

<Divider />`} language="svelte" />

  <h3>With label</h3>
  <p>Use <code>label</code> to show text in the middle (e.g. "OR" between two options).</p>
  <div class="example">
    <div class="example-title">Live example</div>
    <Divider label="OR" />
  </div>
  <CodeBlock code={`<Divider label="OR" />`} language="svelte" />

  <h3>Vertical</h3>
  <p>Use <code>orientation="vertical"</code> inside a flex row to separate items. The parent should have a defined height (e.g. <code>min-height</code> or <code>height</code>).</p>
  <div class="example">
    <div class="example-title">Live example</div>
    <div class="example-vertical-row">
      <span>Item 1</span>
      <Divider orientation="vertical" />
      <span>Item 2</span>
      <Divider orientation="vertical" />
      <span>Item 3</span>
    </div>
  </div>
  <CodeBlock code={`<div style="display: flex; align-items: center; gap: var(--spacing-3); min-height: var(--spacing-16);">
  <span>Item 1</span>
  <Divider orientation="vertical" />
  <span>Item 2</span>
  <Divider orientation="vertical" />
  <span>Item 3</span>
</div>`} language="svelte" />

  <h3>Features</h3>
  <ul>
    <li><strong>Accessible</strong> — <code>role="separator"</code> and <code>aria-orientation</code>; optional <code>aria-label</code> when label is set</li>
    <li><strong>Horizontal</strong> — Full-width line; optional label in the center</li>
    <li><strong>Vertical</strong> — Full-height line for use in flex layouts</li>
    <li><strong>Theme-aware</strong> — Uses <code>--border</code> and <code>--text-dim</code></li>
  </ul>

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
  .example-content { margin: 0 0 var(--spacing-2) 0; }
  .example-content-below { margin: var(--spacing-2) 0 0 0; }
  .example-vertical-row {
    display: flex;
    align-items: center;
    gap: var(--spacing-3);
    min-height: var(--spacing-16);
  }
</style>
