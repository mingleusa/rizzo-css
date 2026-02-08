<script lang="ts">
  import Tabs from '../../Tabs.svelte';
  import CodeBlock from '../CodeBlock.svelte';
</script>

<section>
  <h2>Tabs component</h2>
  <p>Variants: default, pills, underline. Keyboard navigation and ARIA.</p>

  <h3>Default and pills</h3>
  <div class="example">
    <div class="example-title">Live examples</div>
    <div class="example-stack">
      <Tabs
        tabs={[
          { id: 'one', label: 'Tab One', content: 'Content for tab one.' },
          { id: 'two', label: 'Tab Two', content: 'Content for tab two.' },
          { id: 'three', label: 'Tab Three', content: 'Content for tab three.' },
        ]}
        defaultTab="one"
      />
      <Tabs
        tabs={[
          { id: 'a', label: 'Pill A', content: 'Pill panel A.' },
          { id: 'b', label: 'Pill B', content: 'Pill panel B.' },
        ]}
        variant="pills"
      />
    </div>
  </div>

  <h3>Usage</h3>
  <CodeBlock
    code={`<script>
  import Tabs from '@rizzo-css/svelte/Tabs.svelte';
</script>

<Tabs
  tabs={[
    { id: 'overview', label: 'Overview', content: '…' },
    { id: 'api', label: 'API', content: '…' },
  ]}
  defaultTab="overview"
/>
<Tabs tabs={items} variant="pills" />`}
    language="svelte"
  />
</section>

<style>
  .example-stack {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-8);
  }
</style>
