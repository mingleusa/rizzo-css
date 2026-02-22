<script lang="ts">
  import type { Snippet } from 'svelte';
  import ChevronDown from './icons/ChevronDown.svelte';

  interface Props {
    id?: string;
    defaultOpen?: boolean;
    triggerLabel?: string;
    class?: string;
    children?: Snippet;
  }

  let {
    id: collapsibleId,
    defaultOpen = false,
    triggerLabel = 'Toggle',
    class: className = '',
    children,
  }: Props = $props();

  const id = $derived(collapsibleId ?? `collapsible-${Math.random().toString(36).slice(2, 9)}`);
  const triggerId = $derived(`${id}-trigger`);
  const panelId = $derived(`${id}-panel`);
  let open = $state(defaultOpen);

  function toggle() {
    open = !open;
  }

  const triggerClasses = $derived(['collapsible__trigger', open ? 'collapsible__trigger--open' : ''].filter(Boolean).join(' '));
  const panelClasses = $derived(['collapsible__panel', open ? 'collapsible__panel--open' : ''].filter(Boolean).join(' '));
</script>

<div class="collapsible {className}" data-collapsible id={id}>
  <button
    type="button"
    class={triggerClasses}
    id={triggerId}
    aria-expanded={open}
    aria-controls={panelId}
    onclick={toggle}
  >
    <span class="collapsible__trigger-label">{triggerLabel}</span>
    <ChevronDown class="collapsible__icon" width={16} height={16} aria-hidden="true" />
  </button>
  <div
    class={panelClasses}
    id={panelId}
    role="region"
    aria-labelledby={triggerId}
    hidden={!open}
  >
    <div class="collapsible__panel-inner">
      {@render children?.()}
    </div>
  </div>
</div>
