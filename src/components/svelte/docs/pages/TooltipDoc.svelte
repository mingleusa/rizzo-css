<script lang="ts">
  import Tooltip from '../../Tooltip.svelte';
  import Button from '../../Button.svelte';
  import CodeBlock from '../CodeBlock.svelte';
</script>

<section>
  <h2>Tooltip component</h2>
  <p>Wrap the trigger in <code>tooltip-wrapper</code> and set <code>aria-describedby</code> to the tooltip <code>id</code>. Positions: top, bottom, left, right.</p>

  <h3>Basic and positions</h3>
  <div class="example">
    <div class="example-title">Live examples</div>
    <div class="example-tooltips">
      <div class="tooltip-wrapper" aria-describedby="tooltip-svelte-top">
        <Button variant="primary">Hover me (top)</Button>
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
  import Button from './components/svelte/Button.svelte';
  import Tooltip from './components/svelte/Tooltip.svelte';
</script>

<div class="tooltip-wrapper" aria-describedby="my-tooltip">
  <Button variant="primary">Hover me</Button>
  <Tooltip id="my-tooltip" text="Help text" position="top" />
</div>`}
    language="svelte"
  />
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
