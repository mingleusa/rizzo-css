<script lang="ts">
  import type { Snippet } from 'svelte';

  type Variant = 'default' | 'elevated' | 'outlined' | 'filled';
  interface Props {
    variant?: Variant;
    class?: string;
    children?: Snippet;
  }
  let { variant = 'default', class: className = '', children }: Props = $props();
  const variantClass = $derived(variant !== 'default' ? `card--${variant}` : '');
  const classes = $derived(['card', variantClass, className].filter(Boolean).join(' ').trim());
</script>

<div class={classes}>
  {@render children?.()}
</div>
