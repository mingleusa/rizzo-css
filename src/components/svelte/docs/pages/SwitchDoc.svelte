<script lang="ts">
  import Switch from '../../Switch.svelte';
  import CodeBlock from '../CodeBlock.svelte';
  import AddComponentTabs from '../AddComponentTabs.svelte';
</script>

<section>
  <h2>Switch component</h2>
  <p>On/off toggle with role="switch". Space toggles.</p>
  <AddComponentTabs componentName="Switch" />

  <h3>Examples</h3>
  <div class="example">
    <div class="example-title">Live examples</div>
    <div class="example-row">
      <Switch label="Enable notifications" />
      <Switch label="Checked" checked />
      <Switch label="Disabled" disabled />
    </div>
  </div>

  <h3>Usage</h3>
  <CodeBlock
    code={`<script>
  import Switch from '$lib/rizzo';
</script>

<Switch label="Enable notifications" />
<Switch label="Checked" checked />`}
    language="svelte"
  />
</section>

<style>
  .example-row {
    display: flex;
    flex-wrap: wrap;
    gap: var(--spacing-4);
    align-items: center;
  }
</style>
