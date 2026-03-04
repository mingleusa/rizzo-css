/**
 * Maps component slug to Vue component for docs. Used by VueDocDemo.
 * Keep in sync with REACT_COMPONENT_SLUGS; some slugs map to different file names (cards->Card, forms->Input, resizable->ResizablePaneGroup).
 * Components that VueDocDemo.vue statically imports are imported here too (no defineAsyncComponent) to avoid Vite "dynamically imported but also statically imported" warnings.
 */
import { defineAsyncComponent } from 'vue';
import Button from './Button.vue';
import Badge from './Badge.vue';
import Alert from './Alert.vue';
import Card from './Card.vue';
import Avatar from './Avatar.vue';
import Skeleton from './Skeleton.vue';
import Divider from './Divider.vue';
import Kbd from './Kbd.vue';
import Separator from './Separator.vue';
import ButtonGroup from './ButtonGroup.vue';
import Spinner from './Spinner.vue';
import Label from './Label.vue';
import InputGroup from './InputGroup.vue';
import ResizablePaneGroup from './ResizablePaneGroup.vue';

const componentMap = {
  'accordion': defineAsyncComponent(() => import('./Accordion.vue')),
  'alert': Alert,
  'alert-dialog': defineAsyncComponent(() => import('./AlertDialog.vue')),
  'aspect-ratio': defineAsyncComponent(() => import('./AspectRatio.vue')),
  'avatar': Avatar,
  'back-to-top': defineAsyncComponent(() => import('./BackToTop.vue')),
  'badge': Badge,
  'breadcrumb': defineAsyncComponent(() => import('./Breadcrumb.vue')),
  'button': Button,
  'button-group': ButtonGroup,
  'cards': Card,
  'calendar': defineAsyncComponent(() => import('./Calendar.vue')),
  'range-calendar': defineAsyncComponent(() => import('./RangeCalendar.vue')),
  'carousel': defineAsyncComponent(() => import('./Carousel.vue')),
  'collapsible': defineAsyncComponent(() => import('./Collapsible.vue')),
  'context-menu': defineAsyncComponent(() => import('./ContextMenu.vue')),
  'copy-to-clipboard': defineAsyncComponent(() => import('./CopyToClipboard.vue')),
  'dashboard': defineAsyncComponent(() => import('./Dashboard.vue')),
  'docs-sidebar': defineAsyncComponent(() => import('./DocsSidebar.vue')),
  'divider': Divider,
  'dropdown': defineAsyncComponent(() => import('./Dropdown.vue')),
  'empty': defineAsyncComponent(() => import('./Empty.vue')),
  'footer': defineAsyncComponent(() => import('./Footer.vue')),
  'font-switcher': defineAsyncComponent(() => import('./FontSwitcher.vue')),
  'forms': defineAsyncComponent(() => import('./Input.vue')),
  'hover-card': defineAsyncComponent(() => import('./HoverCard.vue')),
  'icons': defineAsyncComponent(() => import('./Icons.vue')),
  'input-group': InputGroup,
  'kbd': Kbd,
  'label': Label,
  'modal': defineAsyncComponent(() => import('./Modal.vue')),
  'navbar': defineAsyncComponent(() => import('./Navbar.vue')),
  'pagination': defineAsyncComponent(() => import('./Pagination.vue')),
  'popover': defineAsyncComponent(() => import('./Popover.vue')),
  'progress-bar': defineAsyncComponent(() => import('./ProgressBar.vue')),
  'resizable': ResizablePaneGroup,
  'scroll-area': defineAsyncComponent(() => import('./ScrollArea.vue')),
  'search': defineAsyncComponent(() => import('./Search.vue')),
  'separator': Separator,
  'settings': defineAsyncComponent(() => import('./Settings.vue')),
  'sheet': defineAsyncComponent(() => import('./Sheet.vue')),
  'skeleton': Skeleton,
  'slider': defineAsyncComponent(() => import('./Slider.vue')),
  'sound-effects': defineAsyncComponent(() => import('./SoundEffects.vue')),
  'spinner': Spinner,
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
