<script lang="ts">
  interface Props {
    value?: number;
    max?: number;
    variant?: 'primary' | 'success' | 'warning' | 'error' | 'info';
    size?: 'sm' | 'md' | 'lg';
    showLabel?: boolean;
    indeterminate?: boolean;
    label?: string;
    class?: string;
  }
  let {
    value = 0,
    max = 100,
    variant = 'primary',
    size = 'md',
    showLabel = false,
    indeterminate = false,
    label,
    class: className = '',
  }: Props = $props();

  const safeMax = $derived(max <= 0 ? 100 : max);
  const clampedValue = $derived(indeterminate ? 0 : Math.max(0, Math.min(value, safeMax)));
  const percentage = $derived(indeterminate ? 0 : Math.round((clampedValue / safeMax) * 100));

  const classes = $derived(
    [
      'progress',
      `progress--${variant}`,
      `progress--${size}`,
      indeterminate ? 'progress--indeterminate' : '',
      className,
    ]
      .filter(Boolean)
      .join(' ')
      .trim()
  );

  const barStyle = $derived(indeterminate ? {} : { width: `${percentage}%` });
</script>

<div
  class={classes}
  role="progressbar"
  aria-valuemin={0}
  aria-valuemax={safeMax}
  aria-label={label ?? (indeterminate ? 'Loading' : undefined)}
  aria-valuetext={indeterminate ? 'Loading' : undefined}
  aria-valuenow={indeterminate ? undefined : clampedValue}
>
  <div class="progress__track">
    <div class="progress__bar" style={barStyle}></div>
  </div>
  {#if showLabel && !indeterminate}
    <span class="progress__label" aria-hidden="true">{percentage}%</span>
  {/if}
</div>
