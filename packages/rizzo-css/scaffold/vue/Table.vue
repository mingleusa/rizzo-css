<script setup lang="ts">
import { computed, ref, useId } from 'vue';

export interface TableColumn {
  key: string;
  label: string;
  sortable?: boolean;
  type?: 'string' | 'number';
}

const props = withDefaults(
  defineProps<{
    columns: TableColumn[];
    data: Record<string, string | number>[];
    caption?: string;
    sortable?: boolean;
    filterable?: boolean;
    filterPlaceholder?: string;
    striped?: boolean;
  }>(),
  { sortable: true, filterable: false, filterPlaceholder: 'Filter table…', striped: true }
);

const tableId = `table-${useId()}`;
const sortColumnIndex = ref<number | null>(null);
const sortDirection = ref<'ascending' | 'descending'>('ascending');
const filterQuery = ref('');

const filteredData = computed(() => {
  if (!props.filterable || !filterQuery.value.trim()) return props.data;
  const q = filterQuery.value.trim().toLowerCase();
  return props.data.filter((row) => props.columns.some((col) => String(row[col.key] ?? '').toLowerCase().includes(q)));
});

const sortedData = computed(() => {
  if (!props.sortable || sortColumnIndex.value === null) return filteredData.value;
  const col = props.columns[sortColumnIndex.value];
  const type = col?.type ?? 'string';
  const dir = sortDirection.value === 'ascending' ? 1 : -1;
  return [...filteredData.value].sort((a, b) => {
    const aVal = a[col.key];
    const bVal = b[col.key];
    if (type === 'number') {
      const aNum = parseFloat(String(aVal).replace(/[^0-9.-]/g, '')) || 0;
      const bNum = parseFloat(String(bVal).replace(/[^0-9.-]/g, '')) || 0;
      return dir * (aNum - bNum);
    }
    return dir * String(aVal).localeCompare(String(bVal), undefined, { numeric: true });
  });
});

function sortState(index: number): 'none' | 'ascending' | 'descending' {
  return sortColumnIndex.value === index ? sortDirection.value : 'none';
}

function sortBy(index: number) {
  if (sortColumnIndex.value === index) {
    sortDirection.value = sortDirection.value === 'ascending' ? 'descending' : 'ascending';
  } else {
    sortColumnIndex.value = index;
    sortDirection.value = 'ascending';
  }
}
</script>

<template>
  <div
    :class="['table', { 'table--striped': striped, 'table--sortable': sortable, 'table--filterable': filterable }]"
    :data-table-id="tableId"
    :data-table-sortable="sortable ? 'true' : undefined"
    :data-table-filterable="filterable ? 'true' : undefined"
  >
    <div v-if="filterable" class="table__filter-wrap">
      <label :for="`${tableId}-filter`" class="sr-only">Filter table</label>
      <span class="table__filter-icon" aria-hidden="true">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="table__filter-icon-svg icon" aria-hidden="true">
          <path d="M22 3H2l8 9.46V19l4 2v-8.54L22 3z" />
        </svg>
      </span>
      <input
        v-model="filterQuery"
        type="search"
        :id="`${tableId}-filter`"
        class="table__filter"
        :placeholder="filterPlaceholder"
        :aria-controls="tableId"
        data-table-filter
        autocomplete="off"
      />
    </div>
    <div class="table__wrapper">
      <table class="table__table" :id="tableId">
        <caption v-if="caption" class="table__caption">{{ caption }}</caption>
        <thead class="table__head">
          <tr class="table__row">
            <th
              v-for="(col, i) in columns"
              :key="col.key"
              class="table__cell table__cell--head"
              scope="col"
              :data-column-index="i"
              :data-sortable="sortable && col.sortable !== false ? 'true' : undefined"
              :data-type="col.type ?? 'string'"
              :aria-sort="sortable && col.sortable !== false ? sortState(i) : undefined"
            >
              <button
                v-if="sortable && col.sortable !== false"
                type="button"
                class="table__sort-trigger"
                :data-column-index="i"
                :aria-label="`Sort by ${col.label}`"
                @click="sortBy(i)"
              >
                <span class="table__cell-content">{{ col.label }}</span>
                <span class="table__sort-icon" aria-hidden="true">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="table__sort-icon-svg icon" aria-hidden="true">
                    <path d="m7 15 5 5 5-5" />
                    <path d="m7 9 5-5 5 5" />
                  </svg>
                </span>
              </button>
              <span v-else class="table__cell-content">{{ col.label }}</span>
            </th>
          </tr>
        </thead>
        <tbody class="table__body">
          <tr v-for="(row, rowIndex) in sortedData" :key="rowIndex" class="table__row" :data-row-index="rowIndex">
            <td v-for="col in columns" :key="col.key" class="table__cell" :data-column-key="col.key">
              {{ row[col.key] ?? '' }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
