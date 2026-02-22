<script lang="ts">
  import type { Snippet } from 'svelte';

  interface Props {
    title?: string;
    description?: string;
    class?: string;
    icon?: Snippet;
    action?: Snippet;
  }

  let {
    title = 'No results',
    description,
    class: className = '',
    icon,
    action,
  }: Props = $props();
</script>

<div class="empty {className}">
  {#if icon}
    <div class="empty__icon">
      {@render icon()}
    </div>
  {/if}
  <h3 class="empty__title">{title}</h3>
  {#if description}
    <p class="empty__description">{description}</p>
  {/if}
  {#if action}
    <div class="empty__action">
      {@render action()}
    </div>
  {/if}
</div>
