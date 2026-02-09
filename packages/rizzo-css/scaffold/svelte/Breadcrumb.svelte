<script lang="ts">
  export interface BreadcrumbItem {
    label: string;
    href?: string;
  }

  interface Props {
    items: BreadcrumbItem[];
    separator?: 'chevron' | 'slash' | 'arrow' | string;
    class?: string;
  }
  let { items, separator = 'chevron', class: className = '' }: Props = $props();

  const separatorVariant =
    separator === 'slash' ? 'breadcrumb--slash' : separator === 'arrow' ? 'breadcrumb--arrow' : 'breadcrumb--chevron';
  const classes = ['breadcrumb', separatorVariant, className].filter(Boolean).join(' ').trim();
  const separatorChar = separator === 'slash' ? '/' : separator === 'arrow' ? '›' : typeof separator === 'string' ? separator : '›';
  const useIcon = separator === 'chevron';
</script>

<nav class={classes} aria-label="Breadcrumb">
  <ol class="breadcrumb__list">
    {#each items as item, index}
      {@const isLast = index === items.length - 1}
      {@const isCurrent = isLast || !item.href}
      <li class="breadcrumb__item {isCurrent ? 'breadcrumb__item--current' : ''}">
        {#if isCurrent}
          <span class="breadcrumb__current" aria-current="page">{item.label}</span>
        {:else}
          <a class="breadcrumb__link" href={item.href}>{item.label}</a>
        {/if}
        {#if !isLast}
          <span class="breadcrumb__separator" aria-hidden="true">
            {#if useIcon}
              <svg class="breadcrumb__separator-icon" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
                <path d="M6 9l6 6 6-6" />
              </svg>
            {:else}
              {separatorChar}
            {/if}
          </span>
        {/if}
      </li>
    {/each}
  </ol>
</nav>
