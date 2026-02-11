<script lang="ts">
  interface Props {
    width?: number;
    height?: number;
    class?: string;
  }
  let { width = 20, height = 20, class: className = '' }: Props = $props();
</script>
<svg
  xmlns="http://www.w3.org/2000/svg"
  {width}
  {height}
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
  class={`icon rizzo-icon ${className}`.trim()}
  aria-hidden="true"
>
  <title>Sort</title>
  <path d="m7 15 5 5 5-5" />
  <path d="m7 9 5-5 5 5" />
</svg>

<style>
  .rizzo-icon {
    color: var(--icon);
  }
</style>
