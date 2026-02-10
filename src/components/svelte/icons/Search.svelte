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
  class={className}
  aria-hidden="true"
>
  <title>Search</title>
  <circle cx="11" cy="11" r="8" />
  <path d="m21 21-4.3-4.3" />
</svg>
