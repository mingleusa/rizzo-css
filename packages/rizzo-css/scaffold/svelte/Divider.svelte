<script lang="ts">
  interface Props {
    orientation?: 'horizontal' | 'vertical';
    label?: string;
    class?: string;
  }
  let { orientation = 'horizontal', label, class: className = '' }: Props = $props();
  const orientationClass = `divider--${orientation}`;
  const hasLabel = typeof label === 'string' && label.trim().length > 0;
  const labelClass = hasLabel ? 'divider--labeled' : '';
  const classes = ['divider', orientationClass, labelClass, className].filter(Boolean).join(' ').trim();
  const labelText = label?.trim() ?? '';
</script>

<div
  class={classes}
  role="separator"
  aria-orientation={orientation}
  aria-label={labelText || undefined}
>
  {#if hasLabel && orientation === 'horizontal'}
    <span class="divider__line" aria-hidden="true" />
    <span class="divider__label">{labelText}</span>
    <span class="divider__line" aria-hidden="true" />
  {:else}
    <span class="divider__line" aria-hidden="true" />
  {/if}
</div>
