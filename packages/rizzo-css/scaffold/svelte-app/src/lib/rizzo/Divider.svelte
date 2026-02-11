<script lang="ts">
  interface Props {
    orientation?: 'horizontal' | 'vertical';
    label?: string;
    class?: string;
  }
  let { orientation = 'horizontal', label, class: className = '' }: Props = $props();
  const orientationClass = $derived(`divider--${orientation}`);
  const hasLabel = $derived(typeof label === 'string' && label.trim().length > 0);
  const labelClass = $derived(hasLabel ? 'divider--labeled' : '');
  const classes = $derived(['divider', orientationClass, labelClass, className].filter(Boolean).join(' ').trim());
  const labelText = $derived(label?.trim() ?? '');
</script>

<div
  class={classes}
  role="separator"
  aria-orientation={orientation}
  aria-label={labelText || undefined}
>
  {#if hasLabel && orientation === 'horizontal'}
    <span class="divider__line" aria-hidden="true"></span>
    <span class="divider__label">{labelText}</span>
    <span class="divider__line" aria-hidden="true"></span>
  {:else}
    <span class="divider__line" aria-hidden="true"></span>
  {/if}
</div>
