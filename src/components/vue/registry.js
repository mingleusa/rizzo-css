/**
 * Maps component slug to Vue component for docs. Used by VueDocDemo.
 * Keep in sync with REACT_COMPONENT_SLUGS; some slugs map to different file names (cards->Card, forms->Input, resizable->ResizablePaneGroup).
 */
import { defineAsyncComponent } from 'vue';

const componentMap = {
  'accordion': defineAsyncComponent(() => import('./Accordion.vue')),
  'alert': defineAsyncComponent(() => import('./Alert.vue')),
  'alert-dialog': defineAsyncComponent(() => import('./AlertDialog.vue')),
  'aspect-ratio': defineAsyncComponent(() => import('./AspectRatio.vue')),
  'avatar': defineAsyncComponent(() => import('./Avatar.vue')),
  'back-to-top': defineAsyncComponent(() => import('./BackToTop.vue')),
  'badge': defineAsyncComponent(() => import('./Badge.vue')),
  'breadcrumb': defineAsyncComponent(() => import('./Breadcrumb.vue')),
  'button': defineAsyncComponent(() => import('./Button.vue')),
  'button-group': defineAsyncComponent(() => import('./ButtonGroup.vue')),
  'cards': defineAsyncComponent(() => import('./Card.vue')),
  'collapsible': defineAsyncComponent(() => import('./Collapsible.vue')),
  'context-menu': defineAsyncComponent(() => import('./ContextMenu.vue')),
  'copy-to-clipboard': defineAsyncComponent(() => import('./CopyToClipboard.vue')),
  'dashboard': defineAsyncComponent(() => import('./Dashboard.vue')),
  'docs-sidebar': defineAsyncComponent(() => import('./DocsSidebar.vue')),
  'divider': defineAsyncComponent(() => import('./Divider.vue')),
  'dropdown': defineAsyncComponent(() => import('./Dropdown.vue')),
  'empty': defineAsyncComponent(() => import('./Empty.vue')),
  'footer': defineAsyncComponent(() => import('./Footer.vue')),
  'font-switcher': defineAsyncComponent(() => import('./FontSwitcher.vue')),
  'forms': defineAsyncComponent(() => import('./Input.vue')),
  'hover-card': defineAsyncComponent(() => import('./HoverCard.vue')),
  'icons': defineAsyncComponent(() => import('./Icons.vue')),
  'kbd': defineAsyncComponent(() => import('./Kbd.vue')),
  'label': defineAsyncComponent(() => import('./Label.vue')),
  'modal': defineAsyncComponent(() => import('./Modal.vue')),
  'navbar': defineAsyncComponent(() => import('./Navbar.vue')),
  'pagination': defineAsyncComponent(() => import('./Pagination.vue')),
  'popover': defineAsyncComponent(() => import('./Popover.vue')),
  'progress-bar': defineAsyncComponent(() => import('./ProgressBar.vue')),
  'resizable': defineAsyncComponent(() => import('./ResizablePaneGroup.vue')),
  'scroll-area': defineAsyncComponent(() => import('./ScrollArea.vue')),
  'search': defineAsyncComponent(() => import('./Search.vue')),
  'separator': defineAsyncComponent(() => import('./Separator.vue')),
  'settings': defineAsyncComponent(() => import('./Settings.vue')),
  'sheet': defineAsyncComponent(() => import('./Sheet.vue')),
  'skeleton': defineAsyncComponent(() => import('./Skeleton.vue')),
  'slider': defineAsyncComponent(() => import('./Slider.vue')),
  'sound-effects': defineAsyncComponent(() => import('./SoundEffects.vue')),
  'spinner': defineAsyncComponent(() => import('./Spinner.vue')),
  'switch': defineAsyncComponent(() => import('./Switch.vue')),
  'table': defineAsyncComponent(() => import('./Table.vue')),
  'tabs': defineAsyncComponent(() => import('./Tabs.vue')),
  'theme-switcher': defineAsyncComponent(() => import('./ThemeSwitcher.vue')),
  'toast': defineAsyncComponent(() => import('./Toast.vue')),
  'toggle': defineAsyncComponent(() => import('./Toggle.vue')),
  'toggle-group': defineAsyncComponent(() => import('./ToggleGroup.vue')),
  'tooltip': defineAsyncComponent(() => import('./Tooltip.vue')),
};

export function getVueComponent(slug) {
  return componentMap[slug] || null;
}

export function hasVueComponent(slug) {
  return slug in componentMap;
}
