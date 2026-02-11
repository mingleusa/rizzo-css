<script lang="ts">
  import Index from './pages/Index.svelte';
  import ComponentsOverview from './pages/ComponentsOverview.svelte';
  import ComingSoon from './pages/ComingSoon.svelte';
  import ButtonDoc from './pages/ButtonDoc.svelte';
  import BadgeDoc from './pages/BadgeDoc.svelte';
  import CardsDoc from './pages/CardsDoc.svelte';
  import DividerDoc from './pages/DividerDoc.svelte';
  import SpinnerDoc from './pages/SpinnerDoc.svelte';
  import ProgressBarDoc from './pages/ProgressBarDoc.svelte';
  import AvatarDoc from './pages/AvatarDoc.svelte';
  import AlertDoc from './pages/AlertDoc.svelte';
  import BreadcrumbDoc from './pages/BreadcrumbDoc.svelte';
  import FormsDoc from './pages/FormsDoc.svelte';
  import CopyToClipboardDoc from './pages/CopyToClipboardDoc.svelte';
  import TooltipDoc from './pages/TooltipDoc.svelte';
  import PaginationDoc from './pages/PaginationDoc.svelte';
  import TabsDoc from './pages/TabsDoc.svelte';
  import AccordionDoc from './pages/AccordionDoc.svelte';
  import DropdownDoc from './pages/DropdownDoc.svelte';
  import ModalDoc from './pages/ModalDoc.svelte';
  import ToastDoc from './pages/ToastDoc.svelte';
  import TableDoc from './pages/TableDoc.svelte';
  import IconsDoc from './pages/IconsDoc.svelte';
  import NavbarDoc from './pages/NavbarDoc.svelte';
  import SearchDoc from './pages/SearchDoc.svelte';
  import SettingsDoc from './pages/SettingsDoc.svelte';
  import ThemeSwitcherDoc from './pages/ThemeSwitcherDoc.svelte';

  interface Props {
    /** Slug from URL (e.g. "components/badge"). Pass string so SSR and client hydrate the same. */
    slug?: string | undefined;
  }
  let { slug }: Props = $props();

  const path = $derived(
    typeof slug === 'string' && slug !== '' ? slug.split('/').filter(Boolean) : []
  );
  const first = $derived(path[0] ?? '');
  const second = $derived(path[1] ?? '');
</script>

<div class="svelte-doc-page-root">
  {#if path.length === 0 || (path.length === 1 && first === '')}
    <Index />
  {:else if first === 'components' && !second}
    <ComponentsOverview />
  {:else if first === 'components' && second === 'button'}
    <ButtonDoc />
  {:else if first === 'components' && second === 'badge'}
    <BadgeDoc />
  {:else if first === 'components' && second === 'cards'}
    <CardsDoc />
  {:else if first === 'components' && second === 'divider'}
    <DividerDoc />
  {:else if first === 'components' && second === 'spinner'}
    <SpinnerDoc />
  {:else if first === 'components' && second === 'progress-bar'}
    <ProgressBarDoc />
  {:else if first === 'components' && second === 'avatar'}
    <AvatarDoc />
  {:else if first === 'components' && second === 'alert'}
    <AlertDoc />
  {:else if first === 'components' && second === 'breadcrumb'}
    <BreadcrumbDoc />
  {:else if first === 'components' && second === 'forms'}
    <FormsDoc />
  {:else if first === 'components' && second === 'copy-to-clipboard'}
    <CopyToClipboardDoc />
  {:else if first === 'components' && second === 'tooltip'}
    <TooltipDoc />
  {:else if first === 'components' && second === 'pagination'}
    <PaginationDoc />
  {:else if first === 'components' && second === 'tabs'}
    <TabsDoc />
  {:else if first === 'components' && second === 'accordion'}
    <AccordionDoc />
  {:else if first === 'components' && second === 'dropdown'}
    <DropdownDoc />
  {:else if first === 'components' && second === 'modal'}
    <ModalDoc />
  {:else if first === 'components' && second === 'toast'}
    <ToastDoc />
  {:else if first === 'components' && second === 'table'}
    <TableDoc />
  {:else if first === 'components' && second === 'icons'}
    <IconsDoc />
  {:else if first === 'components' && second === 'navbar'}
    <NavbarDoc />
  {:else if first === 'components' && second === 'search'}
    <SearchDoc />
  {:else if first === 'components' && second === 'settings'}
    <SettingsDoc />
  {:else if first === 'components' && second === 'theme-switcher'}
    <ThemeSwitcherDoc />
  {:else}
    <ComingSoon title={second ? second.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase()) : first} />
  {/if}
</div>
