<script lang="ts">
  import Skeleton from '../../Skeleton.svelte';
  import CodeBlock from '../CodeBlock.svelte';
  import AddComponentTabs from '../AddComponentTabs.svelte';
</script>

<section>
  <h2>Skeleton component</h2>
  <p>Loading placeholder with shimmer. Respects reduced motion.</p>
  <AddComponentTabs componentName="Skeleton" />

  <h3>Variants</h3>
  <div class="example">
    <div class="example-title">Live examples</div>
    <div class="example-col">
      <Skeleton />
      <Skeleton variant="text" />
      <Skeleton variant="circle" style="width:3rem;height:3rem;" />
      <Skeleton variant="rect" style="width:100%;" />
    </div>
  </div>

  <h3>Usage</h3>
  <CodeBlock
    code={`<script>
  import Skeleton from '$lib/rizzo';
</script>

<Skeleton />
<Skeleton variant="text" />
<Skeleton variant="circle" />`}
    language="svelte"
  />
</section>

<style>
  .example-col {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-4);
    max-width: 20rem;
  }
</style>
