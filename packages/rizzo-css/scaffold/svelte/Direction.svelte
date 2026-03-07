<script lang="ts">
  import type { Snippet } from 'svelte';

  interface Props {
    dir?: 'ltr' | 'rtl';
    class?: string;
    children?: Snippet;
  }

  let { dir = 'ltr', class: className = '', children }: Props = $props();

  const dirClass = $derived(dir === 'rtl' ? 'direction--rtl' : 'direction--ltr');
</script>

<div class="direction {dirClass} {className}" {dir}>
  {@render children?.()}
</div>
