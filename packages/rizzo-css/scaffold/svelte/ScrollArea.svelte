<script lang="ts">
  import type { Snippet } from 'svelte';

  interface Props {
    orientation?: 'vertical' | 'horizontal';
    class?: string;
    children?: Snippet;
  }

  let { orientation = 'vertical', class: className = '', children }: Props = $props();
  const horizontal = $derived(orientation === 'horizontal');
</script>

<div class="scroll-area {horizontal ? 'scroll-area--horizontal' : ''} {className}">
  <div class="scroll-area__viewport" tabindex="0">
    {@render children?.()}
  </div>
</div>
