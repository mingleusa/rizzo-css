<script lang="ts">
  import Card from '../../Card.svelte';
  import CodeBlock from '../CodeBlock.svelte';
</script>

<section>
  <h2>Card component</h2>
  <p>Flexible card with variants and optional sections (header, body, footer). BEM: <code>card</code>, <code>card__body</code>, etc.</p>

  <h3>Props</h3>
  <ul>
    <li><code>variant</code> (string, optional) — <code>default</code>, <code>elevated</code>, <code>outlined</code>, <code>filled</code></li>
    <li><code>class</code> (string, optional) — Additional CSS classes</li>
  </ul>

  <h3>Variants</h3>
  <div class="example">
    <div class="example-title">Live examples</div>
    <div class="example-cards">
      <Card variant="default">
        <div class="card__body"><h4 style="margin:0 0 0.5rem 0">Default</h4><p style="margin:0">Standard card.</p></div>
      </Card>
      <Card variant="elevated">
        <div class="card__body"><h4 style="margin:0 0 0.5rem 0">Elevated</h4><p style="margin:0">With shadow.</p></div>
      </Card>
      <Card variant="outlined">
        <div class="card__body"><h4 style="margin:0 0 0.5rem 0">Outlined</h4><p style="margin:0">Border only.</p></div>
      </Card>
      <Card variant="filled">
        <div class="card__body"><h4 style="margin:0 0 0.5rem 0">Filled</h4><p style="margin:0">Background.</p></div>
      </Card>
    </div>
  </div>

  <h3>Usage</h3>
  <CodeBlock
    code={`<script>
  import Card from '@rizzo-css/svelte/Card.svelte';
</script>

<Card variant="elevated">
  <div class="card__body">
    <h3>Title</h3>
    <p>Content</p>
  </div>
</Card>`}
    language="svelte"
  />
</section>

<style>
  .example-cards {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(12rem, 1fr));
    gap: var(--spacing-4);
  }
</style>
