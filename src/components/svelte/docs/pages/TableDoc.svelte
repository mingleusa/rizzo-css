<script lang="ts">
  import Table from '../../Table.svelte';
  import CodeBlock from '../CodeBlock.svelte';

  const columns = [
    { key: 'name', label: 'Name', sortable: true },
    { key: 'role', label: 'Role', sortable: true },
    { key: 'score', label: 'Score', sortable: true, type: 'number' as const },
  ];
  const data = [
    { name: 'Alice', role: 'Admin', score: 100 },
    { name: 'Bob', role: 'Editor', score: 85 },
    { name: 'Carol', role: 'Viewer', score: 72 },
  ];
</script>

<section>
  <h2>Table component</h2>
  <p>Data table with optional sorting and filter. Accessible caption and column headers.</p>

  <h3>Sortable</h3>
  <div class="example">
    <div class="example-title">Live example</div>
    <Table {columns} {data} caption="Example users" sortable />
  </div>

  <h3>With filter</h3>
  <div class="example">
    <div class="example-title">Live example</div>
    <Table {columns} {data} caption="Filterable table" sortable filterable filterPlaceholder="Filter…" />
  </div>

  <h3>Usage</h3>
  <CodeBlock
    code={`<script>
  import Table from './components/svelte/Table.svelte';
</script>

<Table
  columns={[
    { key: 'name', label: 'Name', sortable: true },
    { key: 'score', label: 'Score', sortable: true, type: 'number' },
  ]}
  data={[{ name: 'Alice', score: 100 }, { name: 'Bob', score: 85 }]}
  caption="Scores"
  sortable
  filterable
/>`}
    language="svelte"
  />
</section>
