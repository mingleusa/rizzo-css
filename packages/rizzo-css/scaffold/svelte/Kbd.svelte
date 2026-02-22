<script lang="ts">
  import type { Snippet } from 'svelte';

  interface Props {
    class?: string;
    children?: Snippet;
  }

  let { class: className = '', children }: Props = $props();
  const classes = $derived(['kbd', className].filter(Boolean).join(' '));
</script>

<kbd class={classes}>{@render children?.()}</kbd>
