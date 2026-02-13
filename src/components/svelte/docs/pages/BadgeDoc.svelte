<script lang="ts">
  import Badge from '../../Badge.svelte';
  import CodeBlock from '../CodeBlock.svelte';
  import AddComponentTabs from '../AddComponentTabs.svelte';
</script>

<section>
  <h2>Badge component</h2>
  <p>Small labels and tags with variants, sizes, and optional pill style. BEM: <code>badge</code>, <code>badge--primary</code>, etc. Text on solid semantic variants (success, warning, error, info) uses the same contrast variables as buttons (<code>--success-text-on-solid</code>, etc.) for theme-aware readability.</p>
  <AddComponentTabs componentName="Badge" />

  <h3>Props</h3>
  <ul>
    <li><code>variant</code> (string, optional) — <code>primary</code>, <code>success</code>, <code>warning</code>, <code>error</code>, <code>info</code></li>
    <li><code>size</code> (string, optional) — <code>sm</code>, <code>md</code>, <code>lg</code></li>
    <li><code>pill</code> (boolean, optional) — Rounded pill style</li>
    <li><code>class</code> (string, optional) — Additional CSS classes</li>
  </ul>

  <h3>Variants</h3>
  <div class="example">
    <div class="example-title">Live examples</div>
    <div class="example-badges">
      <Badge variant="primary">Primary</Badge>
      <Badge variant="success">Success</Badge>
      <Badge variant="warning">Warning</Badge>
      <Badge variant="error">Error</Badge>
      <Badge variant="info">Info</Badge>
    </div>
  </div>

  <h3>Sizes and pill</h3>
  <div class="example">
    <div class="example-badges">
      <Badge variant="primary" size="sm">Small</Badge>
      <Badge variant="primary" size="md">Medium</Badge>
      <Badge variant="primary" size="lg">Large</Badge>
      <Badge variant="success" pill>Pill</Badge>
    </div>
  </div>

  <h3>Usage</h3>
  <CodeBlock
    code={`<script>
  import Badge from './components/svelte/Badge.svelte';
</script>

<Badge variant="primary">New</Badge>
<Badge variant="success" size="sm">Active</Badge>
<Badge variant="error" pill>Urgent</Badge>`}
    language="svelte"
  />
</section>

<style>
  .example-badges {
    display: flex;
    flex-wrap: wrap;
    gap: var(--spacing-3);
    align-items: center;
  }
</style>
