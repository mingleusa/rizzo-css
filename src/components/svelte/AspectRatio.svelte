<script lang="ts">
  import type { Snippet } from 'svelte';

  interface Props {
    ratio?: number;
    class?: string;
    children?: Snippet;
  }

  let { ratio = 16 / 9, class: className = '', children }: Props = $props();
  const paddingPercent = $derived((1 / ratio) * 100);
</script>

<div
  class="aspect-ratio {className}"
  style="--aspect-ratio: {ratio}; --aspect-ratio-padding: {paddingPercent}%;"
>
  <div class="aspect-ratio__inner">
    {@render children?.()}
  </div>
</div>
