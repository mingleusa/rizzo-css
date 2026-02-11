<script lang="ts">
  import { onMount } from 'svelte';
  import ChevronDown from './icons/ChevronDown.svelte';

  export interface MenuItem {
    label: string;
    value?: string;
    href?: string;
    onClick?: (value: string) => void;
    disabled?: boolean;
    separator?: boolean;
    submenu?: MenuItem[];
  }

  interface Props {
    trigger: string;
    items: MenuItem[];
    id?: string;
    class?: string;
    position?: 'left' | 'right';
    align?: 'start' | 'end';
  }

  let {
    trigger,
    items,
    id,
    class: className = '',
    position = 'left',
    align = 'start',
  }: Props = $props();

  const fallbackId = `dropdown-${Math.random().toString(36).slice(2, 11)}`;
  const dropdownId = $derived(id ?? fallbackId);
  const menuId = $derived(`${dropdownId}-menu`);
  const triggerId = $derived(`${dropdownId}-trigger`);

  let open = $state(false);
  let openSubmenuIndex = $state<number | null>(null);
  let menuEl: HTMLDivElement;
  let triggerEl: HTMLButtonElement;

  const classes = $derived(['dropdown', className].filter(Boolean).join(' ').trim());
  const menuClasses = $derived(`dropdown__menu dropdown__menu--${position} dropdown__menu--${align}`);

  function closeMenu() {
    open = false;
    openSubmenuIndex = null;
  }

  function toggleMenu() {
    open = !open;
    if (!open) openSubmenuIndex = null;
  }

  function toggleSubmenu(index: number) {
    openSubmenuIndex = openSubmenuIndex === index ? null : index;
  }

  function handleItemClick(item: MenuItem, e: MouseEvent) {
    if (item.separator || item.disabled) return;
    if (item.submenu?.length) {
      e.preventDefault();
      return;
    }
    if (item.href) {
      window.location.href = item.href;
    }
    if (item.onClick) {
      item.onClick(item.value ?? item.label);
    }
    closeMenu();
  }

  function handleKeydown(e: KeyboardEvent) {
    if (!open) return;
    if (e.key === 'Escape') {
      e.preventDefault();
      closeMenu();
      triggerEl?.focus();
    }
  }

  function handleClickOutside(e: MouseEvent) {
    if (menuEl && triggerEl && !menuEl.contains(e.target as Node) && !triggerEl.contains(e.target as Node)) {
      closeMenu();
    }
  }

  onMount(() => {
    document.addEventListener('keydown', handleKeydown);
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('keydown', handleKeydown);
      document.removeEventListener('click', handleClickOutside);
    };
  });
</script>

<div class={classes} data-dropdown={dropdownId}>
  <button
    bind:this={triggerEl}
    type="button"
    class="dropdown__trigger"
    id={triggerId}
    aria-expanded={open}
    aria-haspopup="true"
    aria-controls={menuId}
    aria-label={trigger}
    onclick={toggleMenu}
    onkeydown={(e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        toggleMenu();
      }
      if (e.key === 'ArrowDown' && !open) {
        e.preventDefault();
        open = true;
      }
    }}
  >
    <span class="dropdown__trigger-text">{trigger}</span>
    <ChevronDown class="dropdown__icon" width={16} height={16} />
  </button>

  <div
    bind:this={menuEl}
    class="{menuClasses} {open ? 'dropdown__menu--open' : ''}"
    id={menuId}
    role="menu"
    aria-labelledby={triggerId}
    aria-label="{trigger} menu"
    aria-orientation="vertical"
    aria-hidden={!open}
    tabindex="-1"
  >
    {#each items as item, index}
      {#if item.separator}
        <div class="dropdown__separator" role="separator"></div>
      {:else}
        {@const hasSubmenu = item.submenu && item.submenu.length > 0}
        {@const isSubmenuOpen = openSubmenuIndex === index}
        <div class="dropdown__item-wrapper" class:dropdown__item-wrapper--has-submenu={hasSubmenu}>
          {#if item.href && !hasSubmenu}
            <a
              class="dropdown__item"
              class:dropdown__item--disabled={item.disabled}
              role="menuitem"
              href={item.href}
              aria-label={item.label}
              aria-disabled={item.disabled ? 'true' : undefined}
              tabindex={open ? 0 : -1}
              onclick={(e) => {
                if (item.disabled) e.preventDefault();
                else closeMenu();
              }}
            >
              <span>{item.label}</span>
            </a>
          {:else}
            <div
              class="dropdown__item"
              class:dropdown__item--disabled={item.disabled}
              class:dropdown__item--has-submenu={hasSubmenu}
              role="menuitem"
              aria-disabled={item.disabled ? 'true' : undefined}
              aria-expanded={hasSubmenu ? isSubmenuOpen : undefined}
              aria-haspopup={hasSubmenu ? 'true' : undefined}
              tabindex={open ? 0 : -1}
              onclick={(e) => {
                if (item.disabled) return;
                if (hasSubmenu) {
                  e.preventDefault();
                  toggleSubmenu(index);
                } else {
                  handleItemClick(item, e);
                }
              }}
              onkeydown={(e) => {
                if (item.disabled) return;
                if (hasSubmenu && (e.key === 'Enter' || e.key === ' ' || e.key === 'ArrowRight')) {
                  e.preventDefault();
                  toggleSubmenu(index);
                } else if (!hasSubmenu && (e.key === 'Enter' || e.key === ' ')) {
                  e.preventDefault();
                  handleItemClick(item, e as unknown as MouseEvent);
                }
              }}
            >
              <span>{item.label}</span>
              {#if hasSubmenu}
                <ChevronDown class="dropdown__item-arrow" width={12} height={12} />
              {/if}
            </div>
          {/if}
          {#if hasSubmenu && item.submenu}
            <div
              class="dropdown__submenu"
              class:dropdown__submenu--open={isSubmenuOpen}
              role="menu"
              aria-label="{item.label} submenu"
              aria-hidden={!isSubmenuOpen}
            >
              {#each item.submenu as subItem}
                {#if subItem.separator}
                  <div class="dropdown__separator" role="separator"></div>
                {:else if subItem.href}
                  <a
                    class="dropdown__item dropdown__submenu-item"
                    class:dropdown__item--disabled={subItem.disabled}
                    role="menuitem"
                    href={subItem.href}
                    aria-label={subItem.label}
                    aria-disabled={subItem.disabled ? 'true' : undefined}
                    onclick={(e) => {
                      if (subItem.disabled) e.preventDefault();
                      else closeMenu();
                    }}
                  >
                    <span>{subItem.label}</span>
                  </a>
                {:else}
                  <div
                    class="dropdown__item dropdown__submenu-item"
                    class:dropdown__item--disabled={subItem.disabled}
                    role="menuitem"
                    aria-disabled={subItem.disabled ? 'true' : undefined}
                    tabindex={open ? 0 : -1}
                    onclick={(e) => {
                      if (!subItem.disabled) {
                        subItem.onClick?.(subItem.value ?? subItem.label);
                        closeMenu();
                      }
                    }}
                    onkeydown={(e) => {
                      if (subItem.disabled) return;
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        subItem.onClick?.(subItem.value ?? subItem.label);
                        closeMenu();
                      }
                    }}
                  >
                    <span>{subItem.label}</span>
                  </div>
                {/if}
              {/each}
            </div>
          {/if}
        </div>
      {/if}
    {/each}
  </div>
</div>
