<script lang="ts">
  interface Props {
    width?: number;
    height?: number;
    class?: string;
  }
  let { width = 16, height = 16, class: className = '' }: Props = $props();
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
  <path d="M22 17a10 10 0 0 0-20 0" />
  <path d="M6 17a6 6 0 0 1 12 0" />
  <path d="M10 17a2 2 0 0 1 4 0" />
</svg>

<style>
  .rizzo-icon {
    color: var(--icon);
  }
</style>
