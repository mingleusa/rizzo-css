<script lang="ts">
  import Modal from '../../Modal.svelte';
  import Button from '../../Button.svelte';
  import CodeBlock from '../CodeBlock.svelte';

  let open = $state(false);
  let openLarge = $state(false);
</script>

<section>
  <h2>Modal component</h2>
  <p>Dialog with overlay, focus trap, optional sizes (sm, md, lg). Close via button, overlay click, or Escape.</p>

  <h3>Live example</h3>
  <div class="example">
    <div class="example-title">Open modal</div>
    <Button onclick={() => (open = true)}>Open modal</Button>
    <Modal bind:open title="Example modal" closeOnOverlayClick closeOnEscape>
      <p>Modal body content. Focus is trapped; Escape or overlay click closes.</p>
      <svelte:fragment slot="footer">
        <Button variant="primary" onclick={() => (open = false)}>Close</Button>
      </svelte:fragment>
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
  import Modal from '@rizzo-css/svelte/Modal.svelte';
  let open = $state(false);
</script>

<button onclick={() => (open = true)}>Open</button>
<Modal bind:open title="Title" closeOnOverlayClick closeOnEscape>
  <p>Body content.</p>
  <svelte:fragment slot="footer">
    <button onclick={() => (open = false)}>Close</button>
  </svelte:fragment>
</Modal>`}
    language="svelte"
  />
</section>
