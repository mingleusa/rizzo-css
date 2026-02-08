<script lang="ts">
  import Dropdown from '../../Dropdown.svelte';
  import CodeBlock from '../CodeBlock.svelte';

  const items = [
    { label: 'Action', value: 'action', onClick: (v) => console.log(v) },
    { label: 'Link', href: '/docs/svelte' },
    { label: 'Disabled', disabled: true },
    { separator: true },
    {
      label: 'Submenu',
      submenu: [
        { label: 'Sub one', onClick: () => {} },
        { label: 'Sub two', href: '/docs/svelte/components' },
      ],
    },
  ];
</script>

<section>
  <h2>Dropdown component</h2>
  <p>Menu trigger with items: links, actions (onClick), separators, and submenus. Keyboard and ARIA.</p>

  <h3>Live example</h3>
  <div class="example">
    <div class="example-title">Dropdown</div>
    <Dropdown trigger="Menu" {items} />
  </div>

  <h3>Usage</h3>
  <CodeBlock
    code={`<script>
  import Dropdown from '@rizzo-css/svelte/Dropdown.svelte';
</script>

<Dropdown
  trigger="Options"
  items={[
    { label: 'Save', onClick: () => save() },
    { label: 'Docs', href: '/docs' },
    { separator: true },
    { label: 'More', submenu: [{ label: 'A' }, { label: 'B' }] },
  ]}
/>`}
    language="svelte"
  />
</section>
