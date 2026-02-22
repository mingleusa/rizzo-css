<script lang="ts">
  import type { Snippet } from 'svelte';

  interface Props {
    pressed?: boolean;
    disabled?: boolean;
    type?: 'button' | 'submit' | 'reset';
    value?: string;
    ariaLabel?: string;
    class?: string;
    children?: Snippet;
  }

  let {
    pressed = $bindable(false),
    disabled = false,
    type = 'button',
    value,
    ariaLabel,
    class: className = '',
    children,
  }: Props = $props();

  const pressedClass = $derived(pressed ? 'toggle--pressed' : '');
  function handleClick() {
    if (!disabled) pressed = !pressed;
  }
</script>

<button
  {type}
  class="toggle {pressedClass} {className}"
  aria-pressed={pressed}
  {disabled}
  {value}
  aria-label={ariaLabel}
  data-toggle
  onclick={handleClick}
>
  {@render children?.()}
</button>
