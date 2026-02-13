<script lang="ts">
  import Accordion from '../../Accordion.svelte';
  import CodeBlock from '../CodeBlock.svelte';
  import AddComponentTabs from '../AddComponentTabs.svelte';

  const items = [
    { id: 'one', title: 'Section one', content: '<p>Content for section one.</p>' },
    { id: 'two', title: 'Section two', content: '<p>Content for section two.</p>' },
    { id: 'three', title: 'Section three', content: '<p>Content for section three.</p>' },
  ];
</script>

<section>
  <h2>Accordion component</h2>
  <p>Expandable panels with single or multiple open. Keyboard (Arrow keys, Home, End, Enter/Space) and ARIA.</p>
  <AddComponentTabs componentName="Accordion" />

  <h3>Props</h3>
  <ul>
    <li><code>items</code> (array, required) — Objects with <code>id</code>, <code>title</code>, optional <code>content</code> (HTML string)</li>
    <li><code>id</code> (string, optional) — Unique accordion id</li>
    <li><code>allowMultiple</code> (boolean, optional) — Allow multiple panels open (default: false)</li>
    <li><code>defaultExpanded</code> (string | string[], optional) — ID(s) to expand by default</li>
    <li><code>class</code> (string, optional) — Additional CSS classes</li>
  </ul>

  <h3>Single open (default)</h3>
  <div class="example">
    <div class="example-title">Live example</div>
    <Accordion {items} defaultExpanded="one" />
  </div>

  <h3>Allow multiple</h3>
  <div class="example">
    <div class="example-title">Live example</div>
    <Accordion {items} allowMultiple defaultExpanded={['one', 'two']} />
  </div>

  <h3>Usage</h3>
  <CodeBlock
    code={`<script>
  import Accordion from './components/svelte/Accordion.svelte';
</script>

<Accordion
  items={[
    { id: 'a', title: 'Panel A', content: '<p>Content A.</p>' },
    { id: 'b', title: 'Panel B', content: '<p>Content B.</p>' },
  ]}
  defaultExpanded="a"
/>
<Accordion items={items} allowMultiple />`}
    language="svelte"
  />
</section>
