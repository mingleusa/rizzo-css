<script lang="ts">
  type Variant = 'primary' | 'success' | 'warning' | 'error' | 'info';
  type Size = 'sm' | 'md' | 'lg';
  interface Props {
    variant?: Variant;
    size?: Size;
    pill?: boolean;
    class?: string;
  }
  let {
    variant = 'primary',
    size = 'md',
    pill = false,
    class: className = '',
  }: Props = $props();

  const classes = [
    'badge',
    `badge--${variant}`,
    `badge--${size}`,
    pill ? 'badge--pill' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ')
    .trim();
</script>

<span class={classes}>
  <slot />
</span>
