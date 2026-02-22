<script lang="ts">
  interface Props {
    variant?: 'text' | 'circle' | 'rect' | 'default';
    label?: string;
    class?: string;
  }
  let { variant = 'default', label = 'Loading', class: className = '' }: Props = $props();
  const variantClass = $derived(variant !== 'default' ? `skeleton--${variant}` : '');
  const classes = $derived(['skeleton', variantClass, className].filter(Boolean).join(' ').trim());
  const isDecorative = $derived(label === '');
</script>

<span
  class={classes}
  role={isDecorative ? undefined : 'status'}
  aria-label={isDecorative ? undefined : label}
  aria-busy={isDecorative ? undefined : 'true'}
  aria-hidden={isDecorative ? 'true' : undefined}
></span>
