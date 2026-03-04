<script lang="ts">
  import Tooltip from '../../Tooltip.svelte';
  import Button from '../../Button.svelte';
  import CodeBlock from '../CodeBlock.svelte';
  import AddComponentTabs from '../AddComponentTabs.svelte';
</script>

<section>
  <h2>Tooltip component</h2>
  <p>Wrap the trigger in <code>tooltip-wrapper</code> and set <code>aria-describedby</code> to the tooltip <code>id</code>. Positions: top, bottom, left, right.</p>
  <AddComponentTabs componentName="Tooltip" />

  <h3>Basic and positions</h3>
  <div class="example">
    <div class="example-title">Live examples</div>
    <div class="example-tooltips">
      <div class="tooltip-wrapper" aria-describedby="tooltip-svelte-basic">
        <Button variant="primary">Hover me</Button>
        <Tooltip id="tooltip-svelte-basic" text="This is a basic tooltip" position="top" />
      </div>
      <div class="tooltip-wrapper" aria-describedby="tooltip-svelte-top">
        <Button variant="primary">Top</Button>
        <Tooltip id="tooltip-svelte-top" text="Tooltip on top" position="top" />
      </div>
      <div class="tooltip-wrapper" aria-describedby="tooltip-svelte-bottom">
        <Button variant="primary">Bottom</Button>
        <Tooltip id="tooltip-svelte-bottom" text="Tooltip on bottom" position="bottom" />
      </div>
      <div class="tooltip-wrapper" aria-describedby="tooltip-svelte-left">
        <Button variant="outline">Left</Button>
        <Tooltip id="tooltip-svelte-left" text="Left" position="left" />
      </div>
      <div class="tooltip-wrapper" aria-describedby="tooltip-svelte-right">
        <Button variant="outline">Right</Button>
        <Tooltip id="tooltip-svelte-right" text="Right" position="right" />
      </div>
    </div>
  </div>

  <h3>Usage</h3>
  <CodeBlock
    code={`<script>
  import { Button, Tooltip } from '$lib/rizzo';
</script>

<div class="tooltip-wrapper" aria-describedby="my-tooltip">
  <Button variant="primary">Hover me</Button>
  <Tooltip id="my-tooltip" text="This is a basic tooltip" position="top" />
</div>`}
    language="svelte"
  />

  <p><strong>Other frameworks:</strong> <a href="/docs/components/tooltip">Astro</a> · <a href="/docs/vanilla/components/tooltip">Vanilla</a> · <a href="/docs/vue/components/tooltip">Vue</a> · <a href="/docs/react/components/tooltip">React</a></p>
  <p><a href="/docs/svelte/components">← Back to Svelte components</a></p>
</section>

<style>
  .example-tooltips {
    display: flex;
    flex-wrap: wrap;
    gap: var(--spacing-4);
    align-items: center;
    padding: var(--spacing-8);
  }
</style>
