/**
 * Maps a docs slug (and a few helper keys) to the Vue component used by VueDocDemo.
 *
 * Source of truth: the hand-written components in the npm package (packages/rizzo-css/scaffold/vue,
 * imported via the `@rizzo/vue` alias in astro.config.mjs), so the docs demo exactly what
 * `npx rizzo-css add` installs. Components the package doesn't ship yet (Calendar, Carousel, Chart, …)
 * still come from this folder.
 *
 * Every entry is lazy so each docs page only loads the components its demo uses. Keys that aren't page
 * slugs (toggle, resizable-pane, …) are helpers for demos that compose several components.
 */
import { defineAsyncComponent } from 'vue';

const lazy = (load) => defineAsyncComponent(load);

const componentMap = {
  // From the package (packages/rizzo-css/scaffold/vue)
  accordion: lazy(() => import('@rizzo/vue/Accordion.vue')),
  alert: lazy(() => import('@rizzo/vue/Alert.vue')),
  'alert-dialog': lazy(() => import('@rizzo/vue/AlertDialog.vue')),
  'aspect-ratio': lazy(() => import('@rizzo/vue/AspectRatio.vue')),
  avatar: lazy(() => import('@rizzo/vue/Avatar.vue')),
  'back-to-top': lazy(() => import('@rizzo/vue/BackToTop.vue')),
  breadcrumb: lazy(() => import('@rizzo/vue/Breadcrumb.vue')),
  'button-group': lazy(() => import('@rizzo/vue/ButtonGroup.vue')),
  collapsible: lazy(() => import('@rizzo/vue/Collapsible.vue')),
  'context-menu': lazy(() => import('@rizzo/vue/ContextMenu.vue')),
  'copy-to-clipboard': lazy(() => import('@rizzo/vue/CopyToClipboard.vue')),
  dashboard: lazy(() => import('@rizzo/vue/Dashboard.vue')),
  'docs-sidebar': lazy(() => import('@rizzo/vue/DocsSidebar.vue')),
  dropdown: lazy(() => import('@rizzo/vue/Dropdown.vue')),
  empty: lazy(() => import('@rizzo/vue/Empty.vue')),
  'font-switcher': lazy(() => import('@rizzo/vue/FontSwitcher.vue')),
  footer: lazy(() => import('@rizzo/vue/Footer.vue')),
  'hover-card': lazy(() => import('@rizzo/vue/HoverCard.vue')),
  kbd: lazy(() => import('@rizzo/vue/Kbd.vue')),
  modal: lazy(() => import('@rizzo/vue/Modal.vue')),
  navbar: lazy(() => import('@rizzo/vue/Navbar.vue')),
  pagination: lazy(() => import('@rizzo/vue/Pagination.vue')),
  popover: lazy(() => import('@rizzo/vue/Popover.vue')),
  'progress-bar': lazy(() => import('@rizzo/vue/ProgressBar.vue')),
  resizable: lazy(() => import('@rizzo/vue/ResizablePaneGroup.vue')),
  'resizable-pane': lazy(() => import('@rizzo/vue/ResizablePane.vue')),
  'resizable-handle': lazy(() => import('@rizzo/vue/ResizableHandle.vue')),
  'scroll-area': lazy(() => import('@rizzo/vue/ScrollArea.vue')),
  search: lazy(() => import('@rizzo/vue/Search.vue')),
  separator: lazy(() => import('@rizzo/vue/Separator.vue')),
  sheet: lazy(() => import('@rizzo/vue/Sheet.vue')),
  skeleton: lazy(() => import('@rizzo/vue/Skeleton.vue')),
  slider: lazy(() => import('@rizzo/vue/Slider.vue')),
  'sound-effects': lazy(() => import('@rizzo/vue/SoundEffects.vue')),
  switch: lazy(() => import('@rizzo/vue/Switch.vue')),
  table: lazy(() => import('@rizzo/vue/Table.vue')),
  tabs: lazy(() => import('@rizzo/vue/Tabs.vue')),
  'theme-switcher': lazy(() => import('@rizzo/vue/ThemeSwitcher.vue')),
  toast: lazy(() => import('@rizzo/vue/Toast.vue')),
  toggle: lazy(() => import('@rizzo/vue/Toggle.vue')),
  'toggle-group': lazy(() => import('@rizzo/vue/ToggleGroup.vue')),
  tooltip: lazy(() => import('@rizzo/vue/Tooltip.vue')),

  // Simple components: docs-site copies (same API as the package)
  badge: lazy(() => import('./Badge.vue')),
  button: lazy(() => import('./Button.vue')),
  cards: lazy(() => import('./Card.vue')),
  divider: lazy(() => import('./Divider.vue')),
  forms: lazy(() => import('./Input.vue')),
  label: lazy(() => import('./Label.vue')),
  spinner: lazy(() => import('./Spinner.vue')),

  // Not in the package yet: docs-site implementations
  calendar: lazy(() => import('./Calendar.vue')),
  'range-calendar': lazy(() => import('./RangeCalendar.vue')),
  carousel: lazy(() => import('./Carousel.vue')),
  chart: lazy(() => import('./Chart.vue')),
  command: lazy(() => import('./Command.vue')),
  direction: lazy(() => import('./Direction.vue')),
  'input-group': lazy(() => import('./InputGroup.vue')),
  'input-otp': lazy(() => import('./InputOtp.vue')),
  menubar: lazy(() => import('./Menubar.vue')),
  icons: lazy(() => import('./IconsDemo.vue')),
};

export function getVueComponent(slug) {
  return componentMap[slug] || null;
}

export function hasVueComponent(slug) {
  return slug in componentMap;
}
