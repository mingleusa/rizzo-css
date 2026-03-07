<script lang="ts">
  import Menubar from '../../Menubar.svelte';
  import CodeBlock from '../CodeBlock.svelte';
  import AddComponentTabs from '../AddComponentTabs.svelte';
</script>

<section>
  <h2>Menubar component</h2>
  <p>Horizontal menubar with dropdown menus. Each top-level item opens a menu of links or actions.</p>
  <AddComponentTabs componentName="Menubar" />
  <div class="example">
    <div class="example-title">Live example</div>
    <Menubar
      items={[
        { label: 'File', menu: [{ label: 'New', href: '#' }, { label: 'Open', href: '#' }, { label: 'Save', href: '#' }] },
        { label: 'Edit', menu: [{ label: 'Undo', href: '#' }, { label: 'Redo', href: '#' }] },
        { label: 'View', menu: [{ label: 'Zoom in', href: '#' }, { label: 'Zoom out', href: '#' }] },
      ]}
    />
  </div>
  <CodeBlock code={`<script>
  import { Menubar } from '$lib/rizzo';
</script>

<Menubar
  items={[
    { label: 'File', menu: [{ label: 'New', href: '#' }, { label: 'Open', href: '#' }] },
    { label: 'Edit', menu: [{ label: 'Undo', href: '#' }] },
  ]}
/>`} language="svelte" />

  <p><strong>Other frameworks:</strong> <a href="/docs/components/menubar">Astro</a> · <a href="/docs/vanilla/components/menubar">Vanilla</a> · <a href="/docs/vue/components/menubar">Vue</a> · <a href="/docs/react/components/menubar">React</a></p>
  <p><a href="/docs/svelte/components">← Back to Svelte components</a></p>
</section>

<style>
  .example { margin: var(--spacing-6) 0; padding: var(--spacing-4); background: var(--background-alt); border: 1px solid var(--border); border-radius: var(--radius-lg); }
  .example-title { font-size: var(--font-size-sm); font-weight: var(--font-weight-medium); color: var(--text-dim); margin-bottom: var(--spacing-3); text-transform: uppercase; letter-spacing: var(--letter-spacing-wider); }
</style>
