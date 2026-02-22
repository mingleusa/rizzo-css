<script lang="ts">
  import type { Snippet } from 'svelte';

  interface Props {
    for?: string;
    required?: boolean;
    class?: string;
    children?: Snippet;
  }

  let { for: forId, required = false, class: className = '', children }: Props = $props();
  const classes = $derived(['label', required ? 'label--required' : '', className].filter(Boolean).join(' '));
</script>

{#if forId}
  <label for={forId} class={classes}>{@render children?.()}</label>
{:else}
  <span class={classes}>{@render children?.()}</span>
{/if}
