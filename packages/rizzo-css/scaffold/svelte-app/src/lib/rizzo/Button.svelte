<script lang="ts">
  import type { Snippet } from 'svelte';

  type Variant = 'default' | 'primary' | 'success' | 'warning' | 'error' | 'info' | 'outline';
  interface Props {
    variant?: Variant;
    disabled?: boolean;
    type?: 'button' | 'submit' | 'reset';
    class?: string;
    children?: Snippet;
  }
  let {
    variant = 'default',
    disabled = false,
    type = 'button',
    class: className = '',
    children,
    ...rest
  }: Props = $props();

  const variantClass = $derived(variant === 'default' ? '' : `btn-${variant}`);
  const classes = $derived(['btn', variantClass, className].filter(Boolean).join(' '));
</script>

<button {type} {disabled} class={classes} {...rest}>
  {@render children?.()}
</button>
