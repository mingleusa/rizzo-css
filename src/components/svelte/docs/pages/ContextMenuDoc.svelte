<script lang="ts">
  import ContextMenu from '../../ContextMenu.svelte';
  import CodeBlock from '../CodeBlock.svelte';
  import AddComponentTabs from '../AddComponentTabs.svelte';
</script>

<section>
  <h2>Context Menu component</h2>
  <p>Right-click menu. Use <code>context-menu__item</code> and <code>context-menu__separator</code> for content.</p>
  <AddComponentTabs componentName="ContextMenu" />
  <div class="example">
    <div class="example-title">Live example (right-click the area)</div>
    <ContextMenu>
      {#snippet trigger()}
        <div class="context-menu-trigger-demo">Right click here</div>
      {/snippet}
      <button type="button" class="context-menu__item">Profile</button>
      <button type="button" class="context-menu__item">Billing</button>
      <div class="context-menu__separator"></div>
      <button type="button" class="context-menu__item">Subscription</button>
    </ContextMenu>
  </div>
  <CodeBlock code={`<script>
  import ContextMenu from './components/svelte/ContextMenu.svelte';
</script>

<ContextMenu>
  {#snippet trigger()} Right click here {/snippet}
  <button type="button" class="context-menu__item">Profile</button>
  <button type="button" class="context-menu__item">Billing</button>
</ContextMenu>`} language="svelte" />
</section>

<style>
  .example { margin: var(--spacing-6) 0; padding: var(--spacing-4); background: var(--background-alt); border: 1px solid var(--border); border-radius: var(--radius-lg); }
  .example-title { font-size: var(--font-size-sm); font-weight: var(--font-weight-medium); color: var(--text-dim); margin-bottom: var(--spacing-3); text-transform: uppercase; letter-spacing: var(--letter-spacing-wider); }
  .context-menu-trigger-demo {
    display: flex; align-items: center; justify-content: center;
    height: 150px; width: 300px;
    border: var(--border-width) dashed var(--border); border-radius: var(--radius-md);
    font-size: var(--font-size-sm); cursor: context-menu;
  }
</style>
