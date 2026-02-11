<script lang="ts">
  import Pagination from '../../Pagination.svelte';
  import CodeBlock from '../CodeBlock.svelte';

  const docsPageTemplate = '/docs/svelte?page={page}';
</script>

<section>
  <h2>Pagination component</h2>
  <p>First/last links, ellipsis, and <code>hrefTemplate</code> for URLs.</p>

  <h3>Examples</h3>
  <div class="example">
    <div class="example-title">Live examples</div>
    <div class="example-stack">
      <Pagination currentPage={1} totalPages={10} hrefTemplate={docsPageTemplate} />
      <Pagination currentPage={5} totalPages={10} hrefTemplate={docsPageTemplate} />
      <Pagination currentPage={1} totalPages={3} showFirstLast={false} />
    </div>
  </div>

  <h3>Usage</h3>
  <CodeBlock
    code={`<script>
  import Pagination from './components/svelte/Pagination.svelte';
</script>

<Pagination
  currentPage={page}
  totalPages={totalPages}
  hrefTemplate="/posts?page={page}"
/>
<Pagination currentPage={1} totalPages={5} showFirstLast={false} />`}
    language="svelte"
  />
</section>

<style>
  .example-stack {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-6);
  }
</style>
