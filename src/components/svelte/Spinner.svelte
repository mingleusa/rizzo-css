<script lang="ts">
  interface Props {
    size?: 'sm' | 'md' | 'lg';
    variant?: 'primary' | 'success' | 'warning' | 'error' | 'info';
    label?: string;
    class?: string;
  }
  let { size = 'md', variant = 'primary', label = 'Loading', class: className = '' }: Props = $props();
  const classes = ['spinner', `spinner--${size}`, `spinner--${variant}`, className].filter(Boolean).join(' ').trim();
</script>

<span class={classes} role="status" aria-label={label}>
  <span class="spinner__ring" aria-hidden="true" />
</span>
