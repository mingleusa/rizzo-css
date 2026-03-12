<script lang="ts">
  import type { Snippet } from 'svelte';

  type Variant = 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'info' | 'outline' | 'ghost';
  type Size = 'sm' | 'md' | 'lg';
  interface Props {
    variant?: Variant;
    size?: Size;
    disabled?: boolean;
    type?: 'button' | 'submit' | 'reset';
    class?: string;
    children?: Snippet;
  }
  let {
    variant = 'default',
    size = 'md',
    disabled = false,
    type = 'button',
    class: className = '',
    children,
    ...rest
  }: Props = $props();

  const variantClass = $derived(variant === 'default' ? '' : `btn-${variant}`);
  const sizeClass = $derived(size !== 'md' ? `btn--${size}` : '');
  const classes = $derived(['btn', variantClass, sizeClass, className].filter(Boolean).join(' '));
</script>

<button {type} {disabled} class={classes} {...rest}>
  {@render children?.()}
</button>
