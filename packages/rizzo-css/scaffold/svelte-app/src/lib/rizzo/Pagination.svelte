<script lang="ts">
  function buildHref(template: string, page: number): string {
    return template.replace(/\{page\}/g, String(page));
  }

  function getPageItems(total: number, current: number, maxVisible: number): (number | 'ellipsis')[] {
    if (total <= 1) return [];
    if (total <= maxVisible) {
      return Array.from({ length: total }, (_, i) => i + 1);
    }
    const items: (number | 'ellipsis')[] = [1];
    const delta = Math.max(0, Math.floor((maxVisible - 2) / 2));
    const start = Math.max(2, current - delta);
    const end = Math.min(total - 1, current + delta);
    if (start > 2) items.push('ellipsis');
    for (let p = start; p <= end; p++) {
      if (p !== 1 && p !== total) items.push(p);
    }
    if (end < total - 1) items.push('ellipsis');
    if (total > 1) items.push(total);
    return items;
  }

  interface Props {
    currentPage: number;
    totalPages: number;
    hrefTemplate?: string;
    showFirstLast?: boolean;
    maxVisible?: number;
    class?: string;
  }
  let {
    currentPage,
    totalPages,
    hrefTemplate = '?page={page}',
    showFirstLast = true,
    maxVisible = 5,
    class: className = '',
  }: Props = $props();

  const classes = $derived(['pagination', className].filter(Boolean).join(' ').trim());
  const pageItems = $derived(getPageItems(totalPages, currentPage, maxVisible));
  const hasPrev = $derived(currentPage > 1);
  const hasNext = $derived(currentPage < totalPages);
</script>

<nav class={classes} aria-label="Pagination">
  <ul class="pagination__list">
    {#if showFirstLast && totalPages > 1}
      <li class="pagination__item">
        {#if hasPrev}
          <a class="pagination__link pagination__link--prev" href={buildHref(hrefTemplate, 1)} aria-label="First page">First</a>
        {:else}
          <span class="pagination__link pagination__link--prev pagination__link--disabled" aria-disabled="true">First</span>
        {/if}
      </li>
    {/if}
    <li class="pagination__item">
      {#if hasPrev}
        <a class="pagination__link pagination__link--prev" href={buildHref(hrefTemplate, currentPage - 1)} aria-label="Previous page">Previous</a>
      {:else}
        <span class="pagination__link pagination__link--prev pagination__link--disabled" aria-disabled="true">Previous</span>
      {/if}
    </li>
    {#each pageItems as item}
      <li class="pagination__item">
        {#if item === 'ellipsis'}
          <span class="pagination__ellipsis" aria-hidden="true">…</span>
        {:else if item === currentPage}
          <span class="pagination__link pagination__link--current" aria-current="page">{item}</span>
        {:else}
          <a class="pagination__link" href={buildHref(hrefTemplate, item)} aria-label="Page {item}">{item}</a>
        {/if}
      </li>
    {/each}
    <li class="pagination__item">
      {#if hasNext}
        <a class="pagination__link pagination__link--next" href={buildHref(hrefTemplate, currentPage + 1)} aria-label="Next page">Next</a>
      {:else}
        <span class="pagination__link pagination__link--next pagination__link--disabled" aria-disabled="true">Next</span>
      {/if}
    </li>
    {#if showFirstLast && totalPages > 1}
      <li class="pagination__item">
        {#if hasNext}
          <a class="pagination__link pagination__link--next" href={buildHref(hrefTemplate, totalPages)} aria-label="Last page">Last</a>
        {:else}
          <span class="pagination__link pagination__link--next pagination__link--disabled" aria-disabled="true">Last</span>
        {/if}
      </li>
    {/if}
  </ul>
</nav>
