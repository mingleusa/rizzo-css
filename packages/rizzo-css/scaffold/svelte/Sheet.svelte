<script lang="ts">
  import type { Snippet } from 'svelte';
  import Close from './icons/Close.svelte';

  interface Props {
    id?: string;
    title?: string;
    side?: 'top' | 'right' | 'bottom' | 'left';
    open?: boolean;
    class?: string;
    children?: Snippet;
  }

  let {
    id: sheetId,
    title,
    side = 'right',
    open = $bindable(false),
    class: className = '',
    children,
  }: Props = $props();

  const id = $derived(sheetId ?? `sheet-${Math.random().toString(36).slice(2, 9)}`);

  function close() {
    open = false;
  }
</script>

<div
  class="sheet__overlay {open ? 'sheet__overlay--open' : ''}"
  data-sheet-overlay
  aria-hidden={!open}
  id={`${id}-overlay`}
  onclick={close}
  role="presentation"
></div>
<div
  class="sheet sheet--{side} {open ? 'sheet--open' : ''} {className}"
  role="dialog"
  aria-modal="true"
  aria-labelledby={title ? `${id}-title` : undefined}
  aria-hidden={!open}
  {id}
  data-sheet
  hidden={!open}
  onkeydown={(e) => e.key === 'Escape' && close()}
>
  <div class="sheet__content">
    {#if title}
      <div class="sheet__header">
        <h2 id={`${id}-title`} class="sheet__title">{title}</h2>
        <button type="button" class="sheet__close" aria-label="Close" onclick={close}>
          <Close width={20} height={20} />
        </button>
      </div>
    {/if}
    <div class="sheet__body">
      {@render children?.()}
    </div>
  </div>
</div>
