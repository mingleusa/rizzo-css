<script lang="ts">
  import Command from '../../Command.svelte';
  import CodeBlock from '../CodeBlock.svelte';
  import AddComponentTabs from '../AddComponentTabs.svelte';
</script>

<section>
  <h2>Command component</h2>
  <p>Command palette: trigger opens a dialog with search and list. Use ⌘K (or Ctrl+K) to open.</p>
  <AddComponentTabs componentName="Command" />
  <div class="example">
    <div class="example-title">Live example</div>
    <Command
      triggerLabel="Open command palette (⌘K)"
      searchPlaceholder="Search…"
      items={[{ id: 'new', label: 'New file', shortcut: '⌘N' }, { id: 'save', label: 'Save', shortcut: '⌘S' }, { id: 'search', label: 'Search', shortcut: '⌘K' }]}
    />
  </div>
  <CodeBlock code={`<script>
  import { Command } from '$lib/rizzo';
</script>

<Command
  triggerLabel="Open command palette (⌘K)"
  searchPlaceholder="Search…"
  items={[{ id: 'new', label: 'New file', shortcut: '⌘N' }, { id: 'save', label: 'Save', shortcut: '⌘S' }]}
/>`} language="svelte" />

  <p><strong>Other frameworks:</strong> <a href="/docs/components/command">Astro</a> · <a href="/docs/vanilla/components/command">Vanilla</a> · <a href="/docs/vue/components/command">Vue</a> · <a href="/docs/react/components/command">React</a></p>
  <p><a href="/docs/svelte/components">← Back to Svelte components</a></p>
</section>

<style>
  .example { margin: var(--spacing-6) 0; padding: var(--spacing-4); background: var(--background-alt); border: 1px solid var(--border); border-radius: var(--radius-lg); }
  .example-title { font-size: var(--font-size-sm); font-weight: var(--font-weight-medium); color: var(--text-dim); margin-bottom: var(--spacing-3); text-transform: uppercase; letter-spacing: var(--letter-spacing-wider); }
</style>
