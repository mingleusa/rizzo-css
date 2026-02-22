<script lang="ts">
  import AlertDialog from '../../AlertDialog.svelte';
  import CodeBlock from '../CodeBlock.svelte';
  import AddComponentTabs from '../AddComponentTabs.svelte';
  let open = $state(false);
</script>

<section>
  <h2>Alert Dialog component</h2>
  <p>Confirm/cancel dialog for destructive or important actions. Use the <code>actions</code> snippet for buttons.</p>
  <AddComponentTabs componentName="AlertDialog" />
  <div class="example">
    <div class="example-title">Live example</div>
    <AlertDialog id="alert-doc-demo" title="Delete item?" description="This action cannot be undone." bind:open>
      {#snippet actions()}
        <button type="button" class="btn" onclick={() => (open = false)}>Cancel</button>
        <button type="button" class="btn btn-error" onclick={() => (open = false)}>Delete</button>
      {/snippet}
    </AlertDialog>
    <button type="button" class="btn" onclick={() => (open = true)}>Open alert dialog</button>
  </div>
  <CodeBlock code={`<script>
  import AlertDialog from './components/svelte/AlertDialog.svelte';
</script>

<AlertDialog id="my-alert" title="Delete item?" description="This action cannot be undone.">
  {#snippet actions()}
    <button type="button" class="btn" data-alert-dialog-close>Cancel</button>
    <button type="button" class="btn btn-error" data-alert-dialog-close>Delete</button>
  {/snippet}
</AlertDialog>`} language="svelte" />
</section>

<style>
  .example { margin: var(--spacing-6) 0; padding: var(--spacing-4); background: var(--background-alt); border: 1px solid var(--border); border-radius: var(--radius-lg); }
  .example-title { font-size: var(--font-size-sm); font-weight: var(--font-weight-medium); color: var(--text-dim); margin-bottom: var(--spacing-3); text-transform: uppercase; letter-spacing: var(--letter-spacing-wider); }
  .example :global(.btn + .btn) { margin-left: var(--spacing-2); }
</style>
