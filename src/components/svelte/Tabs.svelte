<script lang="ts">
  export interface Tab {
    id: string;
    label: string;
    content?: string;
  }

  interface Props {
    tabs: Tab[];
    id?: string;
    defaultTab?: string;
    variant?: 'default' | 'pills' | 'underline';
    class?: string;
  }
  let {
    tabs,
    id,
    defaultTab,
    variant = 'default',
    class: className = '',
  }: Props = $props();

  let activeTabId = $state(defaultTab ?? tabs[0]?.id ?? '');
  const tabsId = id ?? `tabs-${Math.random().toString(36).slice(2, 11)}`;
  const variantClass = variant !== 'default' ? `tabs--${variant}` : '';
  const classes = ['tabs', variantClass, className].filter(Boolean).join(' ').trim();

  let tabListEl: HTMLElement | null = $state(null);

  function activateTab(index: number) {
    if (index < 0 || index >= tabs.length) return;
    activeTabId = tabs[index].id;
  }

  function handleKeydown(e: KeyboardEvent, index: number) {
    let targetIndex = index;
    switch (e.key) {
      case 'ArrowRight':
      case 'ArrowDown':
        e.preventDefault();
        targetIndex = (index + 1) % tabs.length;
        break;
      case 'ArrowLeft':
      case 'ArrowUp':
        e.preventDefault();
        targetIndex = index === 0 ? tabs.length - 1 : index - 1;
        break;
      case 'Home':
        e.preventDefault();
        targetIndex = 0;
        break;
      case 'End':
        e.preventDefault();
        targetIndex = tabs.length - 1;
        break;
      case 'Enter':
      case ' ':
        e.preventDefault();
        activateTab(index);
        return;
      default:
        return;
    }
    activateTab(targetIndex);
    const buttons = tabListEl?.querySelectorAll('[role="tab"]');
    if (buttons && buttons[targetIndex]) (buttons[targetIndex] as HTMLElement).focus();
  }
</script>

<div class={classes} data-tabs={tabsId}>
  <div class="tabs__list" role="tablist" aria-label="Tabs" bind:this={tabListEl}>
    {#each tabs as tab, index}
      {@const isActive = tab.id === activeTabId}
      <span
        class="tabs__tab {isActive ? 'tabs__tab--active' : ''}"
        id="{tabsId}-tab-{tab.id}"
        role="tab"
        tabindex={isActive ? 0 : -1}
        aria-selected={isActive ? 'true' : 'false'}
        aria-controls="{tabsId}-panel-{tab.id}"
        data-tab-id={tab.id}
        onclick={() => activateTab(index)}
        onkeydown={(e) => handleKeydown(e, index)}
      >
        {tab.label}
      </span>
    {/each}
  </div>

  <div class="tabs__panels-wrapper">
    {#each tabs as tab}
      {@const isActive = tab.id === activeTabId}
      <div
        class="tabs__panel {isActive ? 'tabs__panel--active' : ''}"
        id="{tabsId}-panel-{tab.id}"
        role="tabpanel"
        aria-labelledby="{tabsId}-tab-{tab.id}"
        aria-hidden={isActive ? 'false' : 'true'}
        data-panel-id={tab.id}
      >
        {#if tab.content}
          <div class="tabs__panel-content">{@html tab.content}</div>
        {:else if isActive}
          <slot {activeTabId} />
        {/if}
      </div>
    {/each}
  </div>
</div>
