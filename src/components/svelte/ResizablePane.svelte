<script lang="ts">
  import type { Snippet } from 'svelte';

  interface Props {
    defaultSize?: number;
    class?: string;
    children?: Snippet;
  }

  let { defaultSize = 50, class: className = '', children }: Props = $props();
  const size = Math.min(100, Math.max(0, defaultSize));
</script>

<div class="resizable__pane {className}" data-resizable-pane style="flex: 1 1 {size}%">
  {@render children?.()}
</div>
