<script lang="ts">
  export interface TableColumn {
    key: string;
    label: string;
    sortable?: boolean;
    type?: 'string' | 'number';
  }

  interface Props {
    columns: TableColumn[];
    data: Record<string, string | number>[];
    caption?: string;
    sortable?: boolean;
    filterable?: boolean;
    filterPlaceholder?: string;
    striped?: boolean;
    class?: string;
  }

  let {
    columns,
    data,
    caption,
    sortable = true,
    filterable = false,
    filterPlaceholder = 'Filter table…',
    striped = true,
    class: className = '',
  }: Props = $props();

  const tableId = `table-${Math.random().toString(36).slice(2, 11)}`;
  const classes = $derived(
    ['table', striped ? 'table--striped' : '', sortable ? 'table--sortable' : '', filterable ? 'table--filterable' : '', className]
      .filter(Boolean)
      .join(' ')
      .trim()
  );

  let sortColumnIndex = $state<number | null>(null);
  let sortDirection = $state<'ascending' | 'descending'>('ascending');
  let filterQuery = $state('');

  const filteredData = $derived.by(() => {
    if (!filterable || !filterQuery.trim()) return data;
    const q = filterQuery.trim().toLowerCase();
    return data.filter((row) =>
      columns.some((col) => String(row[col.key] ?? '').toLowerCase().includes(q))
    );
  });

  const sortedData = $derived.by(() => {
    if (!sortable || sortColumnIndex === null) return filteredData;
    const col = columns[sortColumnIndex];
    const type = col?.type ?? 'string';
    const dir = sortDirection === 'ascending' ? 1 : -1;
    return [...filteredData].sort((a, b) => {
      const aVal = a[col.key];
      const bVal = b[col.key];
      if (type === 'number') {
        const aNum = parseFloat(String(aVal).replace(/[^0-9.-]/g, '')) || 0;
        const bNum = parseFloat(String(bVal).replace(/[^0-9.-]/g, '')) || 0;
        return dir * (aNum - bNum);
      }
      const cmp = String(aVal).localeCompare(String(bVal), undefined, { numeric: true });
      return dir * cmp;
    });
  });

  function getSortState(colIndex: number): 'none' | 'ascending' | 'descending' {
    if (sortColumnIndex !== colIndex) return 'none';
    return sortDirection;
  }

  function handleSort(colIndex: number) {
    if (sortColumnIndex === colIndex) {
      sortDirection = sortDirection === 'ascending' ? 'descending' : 'ascending';
    } else {
      sortColumnIndex = colIndex;
      sortDirection = 'ascending';
    }
  }
</script>

<div class={classes} data-table-id={tableId}>
  {#if filterable}
    <div class="table__filter-wrap">
      <label for="{tableId}-filter" class="sr-only">Filter table</label>
      <span class="table__filter-icon" aria-hidden="true">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="table__filter-icon-svg" aria-hidden="true">
          <path d="M4 6h16M4 12h10M4 18h6" />
        </svg>
      </span>
      <input
        type="search"
        id="{tableId}-filter"
        class="table__filter"
        placeholder={filterPlaceholder}
        aria-controls={tableId}
        data-table-filter
        autocomplete="off"
        bind:value={filterQuery}
      />
    </div>
  {/if}
  <div class="table__wrapper">
    <table class="table__table" id={tableId}>
      {#if caption}
        <caption class="table__caption">{caption}</caption>
      {/if}
      <thead class="table__head">
        <tr class="table__row">
          {#each columns as col, i}
            {@const canSort = sortable && col.sortable !== false}
            <th
              class="table__cell table__cell--head"
              scope="col"
              data-column-index={i}
              data-sortable={canSort ? 'true' : undefined}
              data-type={col.type ?? 'string'}
              aria-sort={canSort ? getSortState(i) : undefined}
            >
              {#if canSort}
                <button
                  type="button"
                  class="table__sort-trigger"
                  data-column-index={i}
                  aria-label="Sort by {col.label}"
                  onclick={() => handleSort(i)}
                >
                  <span class="table__cell-content">{col.label}</span>
                  <span class="table__sort-icon" aria-hidden="true">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="table__sort-icon-svg" aria-hidden="true">
                      <path d="M3 6h18M7 12h10M10 18h4" />
                    </svg>
                  </span>
                </button>
              {:else}
                <span class="table__cell-content">{col.label}</span>
              {/if}
            </th>
          {/each}
        </tr>
      </thead>
      <tbody class="table__body">
        {#each sortedData as row, rowIndex}
          <tr class="table__row" data-row-index={rowIndex}>
            {#each columns as col}
              <td class="table__cell" data-column-key={col.key}>
                {row[col.key] ?? ''}
              </td>
            {/each}
          </tr>
        {/each}
      </tbody>
    </table>
  </div>
</div>
