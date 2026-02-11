<script lang="ts">
  import SvelteDocPage from '$lib/rizzo-docs/SvelteDocPage.svelte';
  import { page } from '$app/stores';

  const slug = $derived($page.params.slug ? 'components/' + $page.params.slug : 'components');
</script>
<SvelteDocPage slug={slug} />
