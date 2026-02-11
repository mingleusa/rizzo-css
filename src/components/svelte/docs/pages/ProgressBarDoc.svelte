<script lang="ts">
  import ProgressBar from '../../ProgressBar.svelte';
  import CodeBlock from '../CodeBlock.svelte';
</script>

<section>
  <h2>Progress bar component</h2>
  <p>An accessible progress bar for showing completion or loading state. Supports determinate (value-based) and indeterminate (animated) modes, multiple variants and sizes, and an optional percentage label.</p>

  <h3>Props</h3>
  <ul>
    <li><code>value</code> (number, optional) - Current value, 0 to max (default: 0)</li>
    <li><code>max</code> (number, optional) - Maximum value (default: 100)</li>
    <li><code>variant</code> (string, optional) - <code>primary</code>, <code>success</code>, <code>warning</code>, <code>error</code>, <code>info</code> (default: primary)</li>
    <li><code>size</code> (string, optional) - <code>sm</code>, <code>md</code>, <code>lg</code> (default: md)</li>
    <li><code>showLabel</code> (boolean, optional) - Show percentage label (default: false)</li>
    <li><code>indeterminate</code> (boolean, optional) - Animated loading state, ignores value (default: false)</li>
    <li><code>label</code> (string, optional) - Accessible label (aria-label)</li>
    <li><code>class</code> (string, optional) - Additional CSS classes</li>
  </ul>

  <h3>Basic usage</h3>
  <div class="example">
    <div class="example-title">Live example</div>
    <ProgressBar value={60} max={100} />
  </div>
  <CodeBlock
    code={`<ProgressBar value={60} max={100} />`}
    language="svelte"
  />

  <h3>With label</h3>
  <p>Use <code>showLabel</code> to display the percentage next to the bar.</p>
  <div class="example">
    <div class="example-title">Live example</div>
    <ProgressBar value={75} max={100} showLabel />
  </div>
  <CodeBlock code={`<ProgressBar value={75} max={100} showLabel />`} language="svelte" />

  <h3>Variants</h3>
  <div class="example">
    <div class="example-title">Live example</div>
    <div class="example-stack">
      <ProgressBar value={40} variant="primary" />
      <ProgressBar value={55} variant="success" />
      <ProgressBar value={70} variant="warning" />
      <ProgressBar value={85} variant="error" />
      <ProgressBar value={25} variant="info" />
    </div>
  </div>

  <h3>Sizes</h3>
  <div class="example">
    <div class="example-title">Live example</div>
    <div class="example-stack">
      <ProgressBar value={50} size="sm" />
      <ProgressBar value={50} size="md" />
      <ProgressBar value={50} size="lg" />
    </div>
  </div>

  <h3>Indeterminate</h3>
  <p>Use <code>indeterminate</code> for loading states when progress is unknown. The bar shows an animated fill. Provide an <code>aria-label</code> (e.g. "Loading") for accessibility.</p>
  <div class="example">
    <div class="example-title">Live example</div>
    <ProgressBar indeterminate label="Loading" />
  </div>
  <CodeBlock code={`<ProgressBar indeterminate label="Loading" />`} language="svelte" />

  <h3>Custom max</h3>
  <p>Use <code>max</code> and <code>value</code> for non-percentage progress (e.g. steps). The bar width is computed as value/max.</p>
  <div class="example">
    <div class="example-title">Live example (3 of 5 steps)</div>
    <ProgressBar value={3} max={5} showLabel />
  </div>
  <CodeBlock code={`<ProgressBar value={3} max={5} showLabel />`} language="svelte" />

  <h3>Features</h3>
  <ul>
    <li><strong>Semantic</strong> - <code>role="progressbar"</code> with <code>aria-valuenow</code>, <code>aria-valuemin</code>, <code>aria-valuemax</code></li>
    <li><strong>Indeterminate</strong> - <code>aria-valuetext="Loading"</code> when progress is unknown</li>
    <li><strong>Variants</strong> - Primary, success, warning, error, info using theme variables</li>
    <li><strong>Sizes</strong> - sm, md, lg bar heights</li>
    <li><strong>Reduced motion</strong> - Indeterminate animation disabled when user prefers reduced motion</li>
  </ul>
  <p><strong>Astro & Vanilla:</strong> <a href="/docs/components/progress-bar">Astro</a> · <a href="/docs/vanilla/components/progress-bar">Vanilla</a></p>
</section>

<style>
  .example-stack {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-4);
  }
</style>
