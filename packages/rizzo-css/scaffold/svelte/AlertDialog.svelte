<script lang="ts">
  import type { Snippet } from 'svelte';

  interface Props {
    id?: string;
    title?: string;
    description?: string;
    open?: boolean;
    class?: string;
    children?: Snippet;
    actions?: Snippet;
  }

  let {
    id: dialogId,
    title = 'Are you sure?',
    description,
    open = $bindable(false),
    class: className = '',
    children,
    actions,
  }: Props = $props();

  const id = $derived(dialogId ?? `alert-dialog-${Math.random().toString(36).slice(2, 9)}`);
</script>

<div
  class="alert-dialog__overlay {open ? 'alert-dialog__overlay--open' : ''}"
  data-alert-dialog-overlay
  aria-hidden={!open}
  id={`${id}-overlay`}
  onclick={() => (open = false)}
  role="presentation"
></div>
<div
  class="alert-dialog {className}"
  role="alertdialog"
  aria-modal="true"
  aria-labelledby={`${id}-title`}
  aria-describedby={description ? `${id}-desc` : undefined}
  aria-hidden={!open}
  id={id}
  data-alert-dialog
  hidden={!open}
>
  <div class="alert-dialog__content">
    <h2 id={`${id}-title`} class="alert-dialog__title">{title}</h2>
    {#if description}
      <p id={`${id}-desc`} class="alert-dialog__description">{description}</p>
    {/if}
    <div class="alert-dialog__actions">
      {@render actions?.()}
    </div>
  </div>
</div>
