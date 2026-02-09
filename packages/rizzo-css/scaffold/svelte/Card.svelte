<script lang="ts">
  type Variant = 'default' | 'elevated' | 'outlined' | 'filled';
  interface Props {
    variant?: Variant;
    class?: string;
  }
  let { variant = 'default', class: className = '' }: Props = $props();
  const variantClass = variant !== 'default' ? `card--${variant}` : '';
  const classes = ['card', variantClass, className].filter(Boolean).join(' ').trim();
</script>

<div class={classes}>
  <slot />
</div>
