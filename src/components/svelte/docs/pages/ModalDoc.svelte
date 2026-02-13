<script lang="ts">
  import Modal from '../../Modal.svelte';
  import Button from '../../Button.svelte';
  import CodeBlock from '../CodeBlock.svelte';
  import AddComponentTabs from '../AddComponentTabs.svelte';

  let open = $state(false);
  let openLarge = $state(false);
</script>

<section>
  <h2>Modal component</h2>
  <p>Dialog with overlay, focus trap, optional sizes (sm, md, lg). Close via button, overlay click, or Escape.</p>
  <AddComponentTabs componentName="Modal" />

  <h3>Live example</h3>
  <div class="example">
    <div class="example-title">Open modal</div>
    <Button onclick={() => (open = true)}>Open modal</Button>
    <Modal bind:open title="Example modal" closeOnOverlayClick closeOnEscape>
      <p>Modal body content. Focus is trapped; Escape or overlay click closes.</p>
      {#snippet footer()}
        <Button variant="primary" onclick={() => (open = false)}>Close</Button>
      {/snippet}
    </Modal>
  </div>

  <h3>Size</h3>
  <div class="example">
    <Button onclick={() => (openLarge = true)}>Open large modal</Button>
    <Modal bind:open={openLarge} title="Large modal" size="lg">
      <p>Large modal content.</p>
    </Modal>
  </div>

  <h3>Usage</h3>
  <CodeBlock
    code={`<script>
  import Modal from './components/svelte/Modal.svelte';
  let open = $state(false);
</script>

<button onclick={() => (open = true)}>Open</button>
<Modal bind:open title="Title" closeOnOverlayClick closeOnEscape>
  <p>Body content.</p>
  {#snippet footer()}
    <button onclick={() => (open = false)}>Close</button>
  {/snippet}
</Modal>`}
    language="svelte"
  />
</section>
