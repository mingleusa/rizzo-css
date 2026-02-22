<script lang="ts">
  import { onMount } from 'svelte';
  import Index from './pages/Index.svelte';
  import ComponentsOverview from './pages/ComponentsOverview.svelte';
  import ComingSoon from './pages/ComingSoon.svelte';
  import ButtonDoc from './pages/ButtonDoc.svelte';
  import BackToTopDoc from './pages/BackToTopDoc.svelte';
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
  import SkeletonDoc from './pages/SkeletonDoc.svelte';
  import SwitchDoc from './pages/SwitchDoc.svelte';
  import ThemeSwitcherDoc from './pages/ThemeSwitcherDoc.svelte';
  import FontSwitcherDoc from './pages/FontSwitcherDoc.svelte';
  import SoundEffectsDoc from './pages/SoundEffectsDoc.svelte';
  import DocsSidebarDoc from './pages/DocsSidebarDoc.svelte';
  import DashboardDoc from './pages/DashboardDoc.svelte';
  import FooterDoc from './pages/FooterDoc.svelte';
  import LabelDoc from './pages/LabelDoc.svelte';
  import KbdDoc from './pages/KbdDoc.svelte';
  import SeparatorDoc from './pages/SeparatorDoc.svelte';
  import AspectRatioDoc from './pages/AspectRatioDoc.svelte';
  import EmptyDoc from './pages/EmptyDoc.svelte';
  import ButtonGroupDoc from './pages/ButtonGroupDoc.svelte';
  import CollapsibleDoc from './pages/CollapsibleDoc.svelte';
  import SliderDoc from './pages/SliderDoc.svelte';
  import ToggleDoc from './pages/ToggleDoc.svelte';
  import ToggleGroupDoc from './pages/ToggleGroupDoc.svelte';
  import ScrollAreaDoc from './pages/ScrollAreaDoc.svelte';
  import AlertDialogDoc from './pages/AlertDialogDoc.svelte';
  import SheetDoc from './pages/SheetDoc.svelte';
  import PopoverDoc from './pages/PopoverDoc.svelte';
  import HoverCardDoc from './pages/HoverCardDoc.svelte';
  import ContextMenuDoc from './pages/ContextMenuDoc.svelte';
  import ResizableDoc from './pages/ResizableDoc.svelte';

  interface Props {
    /** Slug from URL (e.g. "components/badge"). Pass string so SSR and client hydrate the same. */
    slug?: string | undefined;
  }
  let { slug }: Props = $props();

  // Fallback: derive slug from URL when prop is missing (fixes hydration losing slug on Svelte docs routes)
  const effectiveSlug = $derived.by(() => {
    if (typeof slug === 'string' && slug !== '') return slug;
    if (typeof window === 'undefined') return '';
    const pathname = window.location.pathname;
    const m = pathname.match(/^\/docs\/svelte\/?(.*)$/);
    return m ? (m[1] ?? '').replace(/^\/+|\/+$/g, '') : '';
  });

  const path = $derived(
    effectiveSlug ? effectiveSlug.split('/').filter(Boolean) : []
  );
  const first = $derived(path[0] ?? '');
  const second = $derived(path[1] ?? '');

  onMount(() => {
    // Hide the Astro-rendered Skeleton loading placeholder once this island has mounted
    document.querySelector('[data-svelte-docs-loading]')?.classList.add('svelte-docs-loaded');
    // Debug: log resolved slug (helps figure out why content might not match the URL)
    if (import.meta.env.DEV && typeof effectiveSlug === 'string') {
      console.debug('[SvelteDocPage] mounted', {
        slugFromProps: slug,
        effectiveSlug,
        path: [...path],
        pathname: typeof window !== 'undefined' ? window.location.pathname : '',
      });
    }
  });
</script>

<div class="svelte-doc-page-root" data-effective-slug={effectiveSlug} data-slug-from-props={slug ?? ''}>
  {#if path.length === 0 || (path.length === 1 && first === '')}
    <Index />
  {:else if first === 'components' && !second}
    <ComponentsOverview />
  {:else if first === 'components' && second === 'button'}
    <ButtonDoc />
  {:else if first === 'components' && second === 'back-to-top'}
    <BackToTopDoc />
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
  {:else if first === 'components' && second === 'skeleton'}
    <SkeletonDoc />
  {:else if first === 'components' && second === 'switch'}
    <SwitchDoc />
  {:else if first === 'components' && second === 'theme-switcher'}
    <ThemeSwitcherDoc />
  {:else if first === 'components' && second === 'font-switcher'}
    <FontSwitcherDoc />
  {:else if first === 'components' && second === 'sound-effects'}
    <SoundEffectsDoc />
  {:else if first === 'components' && second === 'docs-sidebar'}
    <DocsSidebarDoc />
  {:else if first === 'components' && second === 'dashboard'}
    <DashboardDoc />
  {:else if first === 'components' && second === 'footer'}
    <FooterDoc />
  {:else if first === 'components' && second === 'label'}
    <LabelDoc />
  {:else if first === 'components' && second === 'kbd'}
    <KbdDoc />
  {:else if first === 'components' && second === 'separator'}
    <SeparatorDoc />
  {:else if first === 'components' && second === 'aspect-ratio'}
    <AspectRatioDoc />
  {:else if first === 'components' && second === 'empty'}
    <EmptyDoc />
  {:else if first === 'components' && second === 'button-group'}
    <ButtonGroupDoc />
  {:else if first === 'components' && second === 'collapsible'}
    <CollapsibleDoc />
  {:else if first === 'components' && second === 'slider'}
    <SliderDoc />
  {:else if first === 'components' && second === 'toggle'}
    <ToggleDoc />
  {:else if first === 'components' && second === 'toggle-group'}
    <ToggleGroupDoc />
  {:else if first === 'components' && second === 'scroll-area'}
    <ScrollAreaDoc />
  {:else if first === 'components' && second === 'alert-dialog'}
    <AlertDialogDoc />
  {:else if first === 'components' && second === 'sheet'}
    <SheetDoc />
  {:else if first === 'components' && second === 'popover'}
    <PopoverDoc />
  {:else if first === 'components' && second === 'hover-card'}
    <HoverCardDoc />
  {:else if first === 'components' && second === 'context-menu'}
    <ContextMenuDoc />
  {:else if first === 'components' && second === 'resizable'}
    <ResizableDoc />
  {:else}
    <ComingSoon title={second ? second.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase()) : first} />
  {/if}
</div>
