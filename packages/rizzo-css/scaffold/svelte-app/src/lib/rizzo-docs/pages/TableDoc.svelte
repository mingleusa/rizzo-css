<script lang="ts">
  import Table from '$lib/rizzo/Table.svelte';
  import CodeBlock from '$lib/rizzo-docs/CodeBlock.svelte';

  const basicColumns = [
    { key: 'name', label: 'Name' },
    { key: 'role', label: 'Role' },
    { key: 'status', label: 'Status' },
  ];
  const basicData = [
    { name: 'Alice', role: 'Developer', status: 'Active' },
    { name: 'Bob', role: 'Designer', status: 'Active' },
    { name: 'Carol', role: 'Manager', status: 'Away' },
  ];

  const sortColumns = [
    { key: 'name', label: 'Name' },
    { key: 'score', label: 'Score', type: 'number' as const },
    { key: 'level', label: 'Level', type: 'number' as const },
  ];
  const sortData = [
    { name: 'Alice', score: 92, level: 3 },
    { name: 'Bob', score: 87, level: 2 },
    { name: 'Carol', score: 95, level: 4 },
  ];

  const filterColumns = [
    { key: 'name', label: 'Name' },
    { key: 'role', label: 'Role' },
    { key: 'status', label: 'Status' },
  ];
  const filterData = [
    { name: 'Alice', role: 'Developer', status: 'Active' },
    { name: 'Bob', role: 'Designer', status: 'Active' },
    { name: 'Carol', role: 'Manager', status: 'Away' },
    { name: 'Dave', role: 'Developer', status: 'Active' },
  ];

  const plainColumns = [{ key: 'a', label: 'A' }, { key: 'b', label: 'B' }];
  const plainData = [{ a: '1', b: '2' }, { a: '3', b: '4' }];
</script>

<section>
  <h2>Table component</h2>
  <p>An accessible data table for displaying tabular data. Supports column header sorting (click or Enter/Space), optional filter input to search across all columns, striped rows, and responsive horizontal scroll. Same styles and functionality as the <a href="/docs/components/table">Astro Table</a>.</p>

  <h3>Props</h3>
  <ul>
    <li><code>columns</code> (array, required) — Column definitions: <code>{'{ key, label, sortable?, type? }'}</code>. <code>type</code> is <code>'string'</code> or <code>'number'</code> for sort order.</li>
    <li><code>data</code> (array, required) — Row data: array of objects with keys matching column <code>key</code>.</li>
    <li><code>caption</code> (string, optional) — Table caption for accessibility.</li>
    <li><code>sortable</code> (boolean, optional) — Enable column header sorting (default: true).</li>
    <li><code>filterable</code> (boolean, optional) — Show filter input above table (default: false).</li>
    <li><code>filterPlaceholder</code> (string, optional) — Placeholder for filter input (default: "Filter table…").</li>
    <li><code>striped</code> (boolean, optional) — Striped rows (default: true).</li>
    <li><code>class</code> (string, optional) — Additional CSS classes.</li>
  </ul>

  <h3>Basic usage</h3>
  <div class="example">
    <div class="example-title">Live example</div>
    <Table columns={basicColumns} data={basicData} caption="Sample data" />
  </div>

  <h3>With sorting (number column)</h3>
  <p>Set <code>type: 'number'</code> on columns that should sort numerically.</p>
  <div class="example">
    <div class="example-title">Live example</div>
    <Table columns={sortColumns} data={sortData} caption="Scores" />
  </div>

  <h3>With filter</h3>
  <p>Use <code>filterable</code> to show a search input that filters rows by any column.</p>
  <div class="example">
    <div class="example-title">Live example</div>
    <Table columns={filterColumns} data={filterData} caption="Filterable list" filterable filterPlaceholder="Search…" />
  </div>

  <h3>Without stripes</h3>
  <div class="example">
    <div class="example-title">Live example</div>
    <Table columns={plainColumns} data={plainData} caption="Plain table" striped={false} />
  </div>

  <h3>Features</h3>
  <ul>
    <li><strong>Accessible</strong> — Semantic table, caption, <code>scope="col"</code>, <code>aria-sort</code> on sortable headers, keyboard (Enter/Space) to sort.</li>
    <li><strong>Sorting</strong> — Sortable column headers with Sort icon; click to sort ascending/descending; <code>type: 'number'</code> for numeric sort.</li>
    <li><strong>Filtering</strong> — Optional filter input with Filter icon; rows shown/hidden by matching text in any cell.</li>
    <li><strong>Striped rows</strong> — Optional alternating row background (default: true).</li>
    <li><strong>Responsive</strong> — Table wrapper scrolls horizontally on small screens.</li>
  </ul>

  <h3>Usage</h3>
  <CodeBlock
    code={`<script>
  import Table from './Table.svelte';
</script>

<Table
  caption="Sample data"
  columns={[
    { key: 'name', label: 'Name' },
    { key: 'role', label: 'Role' },
    { key: 'status', label: 'Status' },
  ]}
  data={[
    { name: 'Alice', role: 'Developer', status: 'Active' },
    { name: 'Bob', role: 'Designer', status: 'Active' },
    { name: 'Carol', role: 'Manager', status: 'Away' },
  ]}
/>`}
    language="svelte"
  />
  <p><strong>Astro & Vanilla:</strong> <a href="/docs/components/table">Astro</a> · <a href="/docs/vanilla/components/table">Vanilla</a></p>
</section>
