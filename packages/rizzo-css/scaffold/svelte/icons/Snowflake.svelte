<script>
  export let width = 16;
  export let height = 16;
  export let className = '';
</script>

<svg
  xmlns="http://www.w3.org/2000/svg"
  width={width}
  height={height}
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
  class={className}
  aria-hidden="true"
>
  <title>Snowflake</title>
  <path d="M12 2v20" />
  <path d="m17 5-5 5-5-5" />
  <path d="m17 19-5-5-5 5" />
  <path d="M2 12h20" />
  <path d="m5 17 5-5 5 5" />
  <path d="m5 7 5 5 5-5" />
</svg>
