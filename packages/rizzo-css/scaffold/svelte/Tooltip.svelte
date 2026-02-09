<script lang="ts">
  interface Props {
    text: string;
    position?: 'top' | 'bottom' | 'left' | 'right';
    delay?: number;
    class?: string;
    id?: string;
  }
  let { text, position = 'top', delay = 0, class: className = '', id }: Props = $props();

  const tooltipId = id ?? `tooltip-${Math.random().toString(36).slice(2, 11)}`;
  const positionClass = `tooltip--${position}`;
  const classes = ['tooltip', positionClass, className].filter(Boolean).join(' ').trim();
  const delayStyle = delay > 0 ? `--tooltip-delay: ${delay}ms;` : '';
</script>

<span class={classes} role="tooltip" id={tooltipId} aria-hidden="true" style={delayStyle}>
  {text}
</span>
