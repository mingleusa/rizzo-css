<script lang="ts">
  import type { Snippet } from 'svelte';

  interface Props {
    orientation?: 'horizontal' | 'vertical';
    class?: string;
    children?: Snippet;
  }

  let { orientation = 'horizontal', class: className = '', children }: Props = $props();
  const orientationClass = $derived(orientation === 'vertical' ? 'button-group--vertical' : '');
</script>

<div class="button-group {orientationClass} {className}" role="group">
  {@render children?.()}
</div>
