<script lang="ts">
  import ResizablePaneGroup from '../../ResizablePaneGroup.svelte';
  import ResizablePane from '../../ResizablePane.svelte';
  import ResizableHandle from '../../ResizableHandle.svelte';
  import CodeBlock from '../CodeBlock.svelte';
  import AddComponentTabs from '../AddComponentTabs.svelte';
</script>

<section>
  <h2>Resizable component</h2>
  <p>Resizable panel groups. Use <code>ResizablePaneGroup</code> with <code>direction="horizontal"</code> or <code>vertical</code>, <code>ResizablePane</code> (defaultSize 0–100), and <code>ResizableHandle</code> between panes. Drag the handle to resize.</p>
  <AddComponentTabs componentName="Resizable" />
  <div class="example">
    <div class="example-title">Live example (horizontal)</div>
    <ResizablePaneGroup direction="horizontal" class="resizable-demo">
      <ResizablePane defaultSize={50}>
        <div class="resizable-pane-inner">One</div>
      </ResizablePane>
      <ResizableHandle />
      <ResizablePane defaultSize={50}>
        <div class="resizable-pane-inner">Two</div>
      </ResizablePane>
    </ResizablePaneGroup>
  </div>
  <CodeBlock code={`<script>
  import ResizablePaneGroup from './components/svelte/ResizablePaneGroup.svelte';
  import ResizablePane from './components/svelte/ResizablePane.svelte';
  import ResizableHandle from './components/svelte/ResizableHandle.svelte';
</script>

<ResizablePaneGroup direction="horizontal">
  <ResizablePane defaultSize={50}>One</ResizablePane>
  <ResizableHandle />
  <ResizablePane defaultSize={50}>Two</ResizablePane>
</ResizablePaneGroup>`} language="svelte" />
</section>

<style>
  .example { margin: var(--spacing-6) 0; padding: var(--spacing-4); background: var(--background-alt); border: 1px solid var(--border); border-radius: var(--radius-lg); }
  .example-title { font-size: var(--font-size-sm); font-weight: var(--font-weight-medium); color: var(--text-dim); margin-bottom: var(--spacing-3); text-transform: uppercase; letter-spacing: var(--letter-spacing-wider); }
  .resizable-demo { max-width: 28rem; min-height: 200px; border: 1px solid var(--border); border-radius: var(--radius-lg); }
  .resizable-pane-inner { display: flex; height: 100%; align-items: center; justify-content: center; padding: var(--spacing-6); font-weight: 600; }
</style>
