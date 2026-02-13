<script lang="ts">
  import Dropdown from '../../Dropdown.svelte';
  import CodeBlock from '../CodeBlock.svelte';
  import AddComponentTabs from '../AddComponentTabs.svelte';

  const basicItems = [
    { label: 'Edit', value: 'edit', onClick: (v) => console.log('Action:', v) },
    { label: 'Delete', value: 'delete', onClick: (v) => console.log('Action:', v) },
    { separator: true },
    { label: 'Settings', href: '/settings' },
  ];

  const linkItems = [
    { label: 'Home', href: '/' },
    { label: 'Documentation', href: '/docs' },
    { label: 'Components', href: '/docs/components' },
    { separator: true },
    { label: 'GitHub', href: 'https://github.com' },
  ];

  const disabledItems = [
    { label: 'Available Option', value: 'available' },
    { label: 'Disabled Option', value: 'disabled', disabled: true },
    { separator: true },
    { label: 'Another Option', value: 'another' },
  ];

  const submenuItems = [
    {
      label: 'Edit',
      submenu: [
        { label: 'Cut', value: 'cut', onClick: (v) => console.log('Submenu:', v) },
        { label: 'Copy', value: 'copy', onClick: (v) => console.log('Submenu:', v) },
        { label: 'Paste', value: 'paste', onClick: (v) => console.log('Submenu:', v) },
        { separator: true },
        {
          label: 'Advanced',
          submenu: [
            { label: 'Find & Replace', value: 'find-replace', onClick: (v) => console.log('Submenu:', v) },
            { label: 'Go to Line', value: 'go-to-line', onClick: (v) => console.log('Submenu:', v) },
            { label: 'Format Document', value: 'format', onClick: (v) => console.log('Submenu:', v) },
          ],
        },
      ],
    },
    {
      label: 'View',
      submenu: [
        { label: 'Zoom In', value: 'zoom-in', onClick: (v) => console.log('Submenu:', v) },
        { label: 'Zoom Out', value: 'zoom-out', onClick: (v) => console.log('Submenu:', v) },
        { label: 'Reset Zoom', value: 'reset-zoom', onClick: (v) => console.log('Submenu:', v) },
      ],
    },
    { separator: true },
    { label: 'Help', href: '/docs' },
    { label: 'Settings', href: '/docs/components/settings' },
  ];

  const positionItems = [
    { label: 'Item 1', value: '1' },
    { label: 'Item 2', value: '2' },
    { label: 'Item 3', value: '3' },
  ];
</script>

<section>
  <h2>Dropdown component</h2>
  <p>An accessible dropdown menu component for displaying lists of actions or options. Supports menu items, separators, links, submenus, and click handlers. Matches the <a href="/docs/components/dropdown">Astro dropdown</a> in look and behavior.</p>
  <AddComponentTabs componentName="Dropdown" />

  <h3>Basic usage</h3>
  <div class="example">
    <h4 class="example-title">Live example</h4>
    <Dropdown trigger="Actions" items={basicItems} />
  </div>

  <h3>With links</h3>
  <div class="example">
    <h4 class="example-title">Live example</h4>
    <Dropdown trigger="Navigate" items={linkItems} />
  </div>

  <h3>With disabled items</h3>
  <div class="example">
    <h4 class="example-title">Live example</h4>
    <Dropdown trigger="Options" items={disabledItems} />
  </div>

  <h3>Nested submenus</h3>
  <div class="example">
    <h4 class="example-title">Live example</h4>
    <Dropdown trigger="Actions" items={submenuItems} />
  </div>

  <h3>Menu positioning</h3>
  <div class="example">
    <h4 class="example-title">Live examples</h4>
    <div class="example-row">
      <div>
        <p class="example-label">Left</p>
        <Dropdown trigger="Left position" position="left" items={positionItems} />
      </div>
      <div class="example-right">
        <p class="example-label">Right</p>
        <Dropdown trigger="Right position" position="right" items={positionItems} />
      </div>
    </div>
  </div>

  <h3>Usage</h3>
  <CodeBlock
    code={`<script>
  import Dropdown from './components/svelte/Dropdown.svelte';
</script>

<Dropdown
  trigger="Options"
  items={[
    { label: 'Save', onClick: (v) => save(v) },
    { label: 'Docs', href: '/docs' },
    { separator: true },
    { label: 'More', submenu: [{ label: 'A', value: 'a' }, { label: 'B', value: 'b' }] },
  ]}
/>`}
    language="svelte"
  />
</section>

<style>
  .example {
    margin: var(--spacing-6) 0;
    padding: var(--spacing-4);
    background: var(--background-alt);
    border: 1px solid var(--border);
    border-radius: var(--radius-lg);
  }
  .example-title {
    font-size: var(--font-size-sm);
    font-weight: var(--font-weight-medium);
    color: var(--text-dim);
    margin-bottom: var(--spacing-3);
    text-transform: uppercase;
    letter-spacing: var(--letter-spacing-wider);
  }
  .example-row {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    gap: var(--spacing-4);
    flex-wrap: wrap;
  }
  .example-label {
    margin: 0 0 var(--spacing-2) 0;
    font-size: var(--font-size-sm);
    color: var(--text-dim);
  }
  .example-right {
    margin-left: auto;
  }
  .example-right .example-label {
    text-align: right;
  }
</style>
