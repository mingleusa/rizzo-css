<script>
  import favicon from '$lib/assets/favicon.svg?url';
  // Root layout — Rizzo CSS is loaded via app.html
</script>

<svelte:head>
  <link rel="icon" type="image/svg+xml" href={favicon} />
</svelte:head>

<slot />
