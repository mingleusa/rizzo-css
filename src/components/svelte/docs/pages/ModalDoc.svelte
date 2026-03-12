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

  <h3>Standard Example</h3>
  <div class="example">
    <div class="example-title">Live Example</div>
    <p>Click the button below to open a standard modal dialog:</p>
    <Button onclick={() => (open = true)}>Open Example Modal</Button>
    <Modal bind:open title="Example Modal" closeOnOverlayClick closeOnEscape>
      <p>This is an example modal dialog. It demonstrates:</p>
      <ul>
        <li>Focus trapping — Tab cycles within the modal</li>
        <li>Keyboard navigation — Escape key closes the modal</li>
        <li>Backdrop overlay with blur effect</li>
        <li>Theme-aware styling</li>
      </ul>
      {#snippet footer()}
        <Button onclick={() => (open = false)}>Cancel</Button>
        <Button variant="primary" onclick={() => (open = false)}>Confirm</Button>
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
  import { Modal, Button } from '$lib/rizzo';
  let open = $state(false);
</script>

<Button onclick={() => (open = true)}>Open</Button>
<Modal bind:open title="Title" closeOnOverlayClick closeOnEscape>
  <p>Body content.</p>
  {#snippet footer()}
    <Button onclick={() => (open = false)}>Close</Button>
  {/snippet}
</Modal>`}
    language="svelte"
  />

  <p><strong>Other frameworks:</strong> <a href="/docs/components/modal">Astro</a> · <a href="/docs/vanilla/components/modal">Vanilla</a> · <a href="/docs/vue/components/modal">Vue</a> · <a href="/docs/react/components/modal">React</a></p>
  <p><a href="/docs/svelte/components">← Back to Svelte components</a></p>
</section>
