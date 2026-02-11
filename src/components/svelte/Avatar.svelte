<script lang="ts">
  function getInitials(name: string): string {
    const parts = name.trim().split(/\s+/).filter(Boolean);
    if (parts.length === 0) return '';
    if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  }

  interface Props {
    src?: string;
    alt?: string;
    name?: string;
    initials?: string;
    size?: 'sm' | 'md' | 'lg';
    shape?: 'circle' | 'square';
    class?: string;
  }
  let {
    src,
    alt = '',
    name = '',
    initials: initialsProp = '',
    size = 'md',
    shape = 'circle',
    class: className = '',
  }: Props = $props();

  const displayInitials = $derived(name ? getInitials(name) : initialsProp);
  const classes = $derived(['avatar', `avatar--${size}`, `avatar--${shape}`, className].filter(Boolean).join(' ').trim());
  const ariaLabel = $derived(alt || name || (displayInitials ? `Avatar: ${displayInitials}` : 'Avatar'));
</script>

<span class={classes} role="img" aria-label={ariaLabel}>
  {#if src}
    <img src={src} alt={alt || name || ''} class="avatar__img" loading="lazy" />
  {:else}
    <span class="avatar__initials" aria-hidden="true">{displayInitials || '?'}</span>
  {/if}
</span>
