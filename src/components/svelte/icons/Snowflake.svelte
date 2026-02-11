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
  <path d="M12 2v20" />
  <path d="m17 5-5 5-5-5" />
  <path d="m17 19-5-5-5 5" />
  <path d="M2 12h20" />
  <path d="m5 17 5-5 5 5" />
  <path d="m5 7 5 5 5-5" />
</svg>

<style>
  .rizzo-icon {
    color: var(--icon);
  }
</style>
