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
  <h3>Horizontal</h3>
  <div class="example">
    <div class="example-title">Live example</div>
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
  <h3>Vertical</h3>
  <div class="example">
    <div class="example-title">Live example</div>
    <ResizablePaneGroup direction="vertical" class="resizable-demo resizable-demo--vertical">
      <ResizablePane defaultSize={25}>
        <div class="resizable-pane-inner">Header</div>
      </ResizablePane>
      <ResizableHandle />
      <ResizablePane defaultSize={75}>
        <div class="resizable-pane-inner">Content</div>
      </ResizablePane>
    </ResizablePaneGroup>
  </div>
  <h3>Usage</h3>
  <CodeBlock code={`<script>
  import { ResizablePaneGroup, ResizablePane, ResizableHandle } from '$lib/rizzo';
</script>

<ResizablePaneGroup direction="horizontal">
  <ResizablePane defaultSize={50}>One</ResizablePane>
  <ResizableHandle />
  <ResizablePane defaultSize={50}>Two</ResizablePane>
</ResizablePaneGroup>`} language="svelte" />

  <p><strong>Other frameworks:</strong> <a href="/docs/components/resizable">Astro</a> · <a href="/docs/vanilla/components/resizable">Vanilla</a> · <a href="/docs/vue/components/resizable">Vue</a> · <a href="/docs/react/components/resizable">React</a></p>
  <p><a href="/docs/svelte/components">← Back to Svelte components</a></p>
</section>

<style>
  .example { margin: var(--spacing-6) 0; padding: var(--spacing-4); background: var(--background-alt); border: 1px solid var(--border); border-radius: var(--radius-lg); }
  .example-title { font-size: var(--font-size-sm); font-weight: var(--font-weight-medium); color: var(--text-dim); margin-bottom: var(--spacing-3); text-transform: uppercase; letter-spacing: var(--letter-spacing-wider); }
  .resizable-demo { max-width: 28rem; min-height: 200px; border: 1px solid var(--border); border-radius: var(--radius-lg); }
  .resizable-demo--vertical { min-height: 200px; }
  .resizable-pane-inner { display: flex; height: 100%; align-items: center; justify-content: center; padding: var(--spacing-6); font-weight: 600; }
</style>
