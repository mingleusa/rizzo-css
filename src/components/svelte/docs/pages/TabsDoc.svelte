<script lang="ts">
  import Tabs from '../../Tabs.svelte';
  import CodeBlock from '../CodeBlock.svelte';
  import AddComponentTabs from '../AddComponentTabs.svelte';
</script>

<section>
  <h2>Tabs component</h2>
  <p>An accessible tabs component for organizing content into multiple panels. Same styles and functionality as the <a href="/docs/components/tabs">Astro Tabs</a>: full keyboard navigation and ARIA tab pattern.</p>
  <AddComponentTabs componentName="Tabs" />

  <h3>Props</h3>
  <ul>
    <li><code>tabs</code> (array, required) — Array of tab objects with <code>id</code> and <code>label</code> (optional <code>content</code>)</li>
    <li><code>id</code> (string, optional) — Unique identifier for the tabs component</li>
    <li><code>defaultTab</code> (string, optional) — ID of the tab to show by default (defaults to first tab)</li>
    <li><code>variant</code> (string, optional) — <code>'default'</code>, <code>'pills'</code>, or <code>'underline'</code></li>
    <li><code>class</code> (string, optional) — Additional CSS classes</li>
  </ul>

  <h3>Basic usage</h3>
  <p>Use the <code>content</code> property on each tab or pass panel content via the default snippet (one child per tab, in order).</p>
  <div class="example">
    <div class="example-title">Live example</div>
    <Tabs
      tabs={[
        { id: 'overview', label: 'Overview' },
        { id: 'features', label: 'Features' },
        { id: 'pricing', label: 'Pricing' },
      ]}
    >
      {#snippet children(activeTabId)}
        {#if activeTabId === 'overview'}
          <div class="tabs__panel-content">
            <h4>Overview</h4>
            <p>This is the overview content. It provides a general introduction to the topic.</p>
          </div>
        {:else if activeTabId === 'features'}
          <div class="tabs__panel-content">
            <h4>Features</h4>
            <ul>
              <li>Feature 1: Accessible design</li>
              <li>Feature 2: Keyboard navigation</li>
              <li>Feature 3: Theme-aware styling</li>
            </ul>
          </div>
        {:else if activeTabId === 'pricing'}
          <div class="tabs__panel-content">
            <h4>Pricing</h4>
            <p>Choose the plan that works best for you.</p>
          </div>
        {/if}
      {/snippet}
    </Tabs>
  </div>

  <h3>With content property</h3>
  <div class="example">
    <div class="example-title">Live example</div>
    <Tabs
      tabs={[
        { id: 'tab1', label: 'Tab 1', content: '<p>Content for tab 1</p>' },
        { id: 'tab2', label: 'Tab 2', content: '<p>Content for tab 2</p>' },
        { id: 'tab3', label: 'Tab 3', content: '<p>Content for tab 3</p>' },
      ]}
    />
  </div>

  <h3>Variants</h3>
  <h4>Default</h4>
  <div class="example">
    <div class="example-title">Live example</div>
    <Tabs
      variant="default"
      tabs={[
        { id: 'd1', label: 'Tab 1', content: '<p>Default variant with bottom border indicator</p>' },
        { id: 'd2', label: 'Tab 2', content: '<p>Tab 2 content</p>' },
        { id: 'd3', label: 'Tab 3', content: '<p>Tab 3 content</p>' },
      ]}
    />
  </div>
  <h4>Pills</h4>
  <div class="example">
    <div class="example-title">Live example</div>
    <Tabs
      variant="pills"
      tabs={[
        { id: 'p1', label: 'Tab 1', content: '<p>Pills variant with filled background for active tab</p>' },
        { id: 'p2', label: 'Tab 2', content: '<p>Tab 2 content</p>' },
        { id: 'p3', label: 'Tab 3', content: '<p>Tab 3 content</p>' },
      ]}
    />
  </div>
  <h4>Underline</h4>
  <div class="example">
    <div class="example-title">Live example</div>
    <Tabs
      variant="underline"
      tabs={[
        { id: 'u1', label: 'Tab 1', content: '<p>Underline variant with thicker bottom border for active tab</p>' },
        { id: 'u2', label: 'Tab 2', content: '<p>Tab 2 content</p>' },
        { id: 'u3', label: 'Tab 3', content: '<p>Tab 3 content</p>' },
      ]}
    />
  </div>

  <h3>Default tab</h3>
  <div class="example">
    <div class="example-title">Live example</div>
    <Tabs
      defaultTab="second"
      tabs={[
        { id: 'first', label: 'First', content: '<p>First tab content</p>' },
        { id: 'second', label: 'Second', content: '<p>Second tab is active by default</p>' },
        { id: 'third', label: 'Third', content: '<p>Third tab content</p>' },
      ]}
    />
  </div>

  <h3>Usage</h3>
  <CodeBlock
    code={`<script>
  import Tabs from './components/svelte/Tabs.svelte';
</script>

<!-- With content on each tab -->
<Tabs
  tabs={[
    { id: 'overview', label: 'Overview', content: '<p>…</p>' },
    { id: 'api', label: 'API', content: '<p>…</p>' },
  ]}
  defaultTab="overview"
/>

<!-- With snippet (dynamic content by active tab) -->
<Tabs tabs={[{ id: 'a', label: 'A' }, { id: 'b', label: 'B' }]}>
  {#snippet children(activeTabId)}
    {#if activeTabId === 'a'}…{:else}…{/if}
  {/snippet}
</Tabs>

<Tabs tabs={items} variant="pills" />`}
    language="svelte"
  />

  <h3>Features</h3>
  <ul>
    <li><strong>ARIA tab pattern</strong> — <code>role="tablist"</code>, <code>role="tab"</code>, <code>role="tabpanel"</code>, <code>aria-selected</code>, <code>aria-controls</code>, <code>aria-labelledby</code></li>
    <li><strong>Keyboard</strong> — Arrow Right/Down, Arrow Left/Up, Home, End, Enter, Space</li>
    <li><strong>Three variants</strong> — Default, Pills, Underline</li>
    <li><strong>Theme-aware</strong> — Adapts to all 14 themes</li>
  </ul>
  <p><strong>Astro & Vanilla:</strong> <a href="/docs/components/tabs">Astro</a> · <a href="/docs/vanilla/components/tabs">Vanilla</a></p>
</section>
