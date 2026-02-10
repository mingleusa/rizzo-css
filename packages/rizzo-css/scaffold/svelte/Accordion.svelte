<script lang="ts">
  export interface AccordionItem {
    id: string;
    title: string;
    content?: string;
  }

  interface Props {
    items: AccordionItem[];
    id?: string;
    allowMultiple?: boolean;
    defaultExpanded?: string | string[];
    class?: string;
  }

  let {
    items,
    id,
    allowMultiple = false,
    defaultExpanded,
    class: className = '',
  }: Props = $props();

  const accordionId = $derived(id ?? `accordion-${Math.random().toString(36).slice(2, 11)}`);

  function getDefaultExpanded(): Set<string> {
    if (defaultExpanded === undefined) return new Set(items[0] ? [items[0].id] : []);
    if (typeof defaultExpanded === 'string') return new Set([defaultExpanded]);
    return new Set(defaultExpanded);
  }

  let expanded = $state<Set<string>>(getDefaultExpanded());

  const classes = ['accordion', className].filter(Boolean).join(' ').trim();

  function toggle(itemId: string) {
    expanded = new Set(
      allowMultiple
        ? (expanded.has(itemId) ? [...expanded].filter((id) => id !== itemId) : [...expanded, itemId])
        : expanded.has(itemId)
          ? []
          : [itemId]
    );
  }

  function handleKeydown(e: KeyboardEvent, itemId: string, index: number) {
    const triggers = e.currentTarget?.parentElement?.querySelectorAll?.('[data-accordion-trigger]') ?? [];
    const len = triggers.length;
    let targetIndex = index;
    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        targetIndex = Math.min(index + 1, len - 1);
        break;
      case 'ArrowUp':
        e.preventDefault();
        targetIndex = Math.max(index - 1, 0);
        break;
      case 'Home':
        e.preventDefault();
        targetIndex = 0;
        break;
      case 'End':
        e.preventDefault();
        targetIndex = len - 1;
        break;
      case 'Enter':
      case ' ':
        e.preventDefault();
        toggle(itemId);
        return;
      default:
        return;
    }
    if (targetIndex !== index && triggers[targetIndex]) (triggers[targetIndex] as HTMLElement).focus();
  }
</script>

<div
  class={classes}
  data-accordion={accordionId}
  data-allow-multiple={allowMultiple ? 'true' : 'false'}
>
  {#each items as item, i}
    {@const triggerId = `${accordionId}-trigger-${item.id}`}
    {@const panelId = `${accordionId}-panel-${item.id}`}
    {@const isExpanded = expanded.has(item.id)}
    <div class="accordion__item" data-accordion-item data-item-id={item.id}>
      <h3 class="accordion__heading">
        <button
          type="button"
          class="accordion__trigger"
          class:accordion__trigger--expanded={isExpanded}
          id={triggerId}
          aria-expanded={isExpanded}
          aria-controls={panelId}
          data-accordion-trigger
          onclick={() => toggle(item.id)}
          onkeydown={(e) => handleKeydown(e, item.id, i)}
        >
          <span class="accordion__title">{item.title}</span>
          <span class="accordion__icon" aria-hidden="true">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
              <title>Expand or collapse section</title>
              <path d="m6 9 6 6 6-6" />
            </svg>
          </span>
        </button>
      </h3>
      <div
        class="accordion__panel"
        class:accordion__panel--expanded={isExpanded}
        id={panelId}
        role="region"
        aria-labelledby={triggerId}
        hidden={!isExpanded}
        data-accordion-panel
      >
        <div class="accordion__panel-inner">
          <div class="accordion__panel-content">
            {#if item.content}
              {@html item.content}
            {/if}
          </div>
        </div>
      </div>
    </div>
  {/each}
</div>
