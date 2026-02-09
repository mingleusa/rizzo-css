<script lang="ts">
  type Variant = 'default' | 'primary' | 'success' | 'warning' | 'error' | 'info' | 'outline';
  interface Props {
    variant?: Variant;
    disabled?: boolean;
    type?: 'button' | 'submit' | 'reset';
    class?: string;
  }
  let {
    variant = 'default',
    disabled = false,
    type = 'button',
    class: className = '',
    ...rest
  }: Props = $props();

  const variantClass = variant === 'default' ? '' : `btn-${variant}`;
  const classes = ['btn', variantClass, className].filter(Boolean).join(' ');
</script>

<button {type} {disabled} class={classes} {...rest}>
  <slot />
</button>
