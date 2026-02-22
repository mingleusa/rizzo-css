<script lang="ts">
  import type { Snippet } from 'svelte';

  interface Props {
    type?: 'single' | 'multiple';
    orientation?: 'horizontal' | 'vertical';
    class?: string;
    children?: Snippet;
  }

  let {
    type = 'single',
    orientation = 'horizontal',
    class: className = '',
    children,
  }: Props = $props();

  const orientationClass = $derived(orientation === 'vertical' ? 'toggle-group--vertical' : '');
  const role = $derived(type === 'single' ? 'radiogroup' : 'group');
</script>

<div
  class="toggle-group {orientationClass} {className}"
  role={role}
  aria-label="Toggle group"
  data-toggle-group
  data-toggle-type={type}
>
  {@render children?.()}
</div>
