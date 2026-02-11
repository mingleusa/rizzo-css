<script lang="ts">
  import type { Snippet } from 'svelte';

  type Variant = 'primary' | 'success' | 'warning' | 'error' | 'info';
  type Size = 'sm' | 'md' | 'lg';
  interface Props {
    variant?: Variant;
    size?: Size;
    pill?: boolean;
    class?: string;
    children?: Snippet;
  }
  let {
    variant = 'primary',
    size = 'md',
    pill = false,
    class: className = '',
    children,
  }: Props = $props();

  const classes = $derived(
    ['badge', `badge--${variant}`, `badge--${size}`, pill ? 'badge--pill' : '', className]
      .filter(Boolean)
      .join(' ')
      .trim()
  );
</script>

<span class={classes}>
  {@render children?.()}
</span>
