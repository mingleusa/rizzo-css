<script setup>
import { computed, ref } from 'vue';
import { getVueComponent } from './registry.js';
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
import ResizablePaneGroup from './ResizablePaneGroup.vue';
import ResizablePane from './ResizablePane.vue';
import ResizableHandle from './ResizableHandle.vue';
import Label from './Label.vue';
import InputGroup from './InputGroup.vue';
import Toast from './Toast.vue';

const props = defineProps({
  slug: { type: String, required: true },
});

const Component = computed(() => getVueComponent(props.slug));

// Props for Vue component demos (match React DEMO_PROPS where Vue accepts same props).
function demoPropsForSlug(slug) {
  const map = {
    button: {},
    badge: {},
    alert: {},
    spinner: { label: 'Loading…' },
    'progress-bar': {},
    avatar: { name: 'Jane Doe' },
    skeleton: {},
    'back-to-top': { threshold: 400, label: 'Back to top' },
    breadcrumb: {},
    empty: {},
    footer: { siteName: 'My App', year: new Date().getFullYear(), links: [{ href: '/docs', label: 'Docs' }, { href: '/privacy', label: 'Privacy' }] },
    pagination: { currentPage: 2, totalPages: 10, showFirstLast: true, maxVisible: 5 },
    tabs: {},
    accordion: {},
    calendar: { label: 'Choose a date' },
    'range-calendar': { label: 'Choose date range' },
    carousel: { label: 'Slides' },
    forms: { placeholder: 'Enter text…' },
    'input-group': { ariaLabel: 'Amount', placeholder: '0.00' },
    'copy-to-clipboard': { value: 'npm install rizzo-css', label: 'Copy' },
    tooltip: {},
    collapsible: {},
    table: {},
    navbar: { siteName: 'Rizzo' },
    cards: { variant: 'elevated' },
    label: { for: 'demo-input' },
    kbd: {},
    divider: {},
    separator: {},
    'aspect-ratio': {},
    icons: {},
    chart: { data: [{ label: 'A', value: 40 }, { label: 'B', value: 65 }, { label: 'C', value: 30 }] },
    command: { triggerLabel: 'Open command palette (⌘K)', searchPlaceholder: 'Search…', items: [{ id: 'new', label: 'New file', shortcut: '⌘N' }, { id: 'save', label: 'Save', shortcut: '⌘S' }] },
    direction: { dir: 'rtl' },
    'input-otp': { length: 6 },
    menubar: { items: [{ label: 'File', menu: [{ label: 'New', href: '#' }, { label: 'Open', href: '#' }] }, { label: 'Edit', menu: [{ label: 'Undo', href: '#' }] }] },
  };
  return map[slug] ?? {};
}

const demoProps = computed(() => demoPropsForSlug(props.slug));

function showToast(msg, opts) {
  if (typeof window !== 'undefined' && typeof window.showToast === 'function') {
    window.showToast(msg, opts);
  }
}

// Overlay demo state (same as Astro — open/close for modal, alert-dialog, sheet, popover, dropdown; hover/context for hover-card, context-menu)
const modalOpen = ref(false);
const alertDialogOpen = ref(false);
const sheetOpen = ref(false);
const popoverOpen = ref(false);
const hoverCardOpen = ref(false);
const contextMenuOpen = ref(false);
const dropdownOpen = ref(false);
</script>

<template>
  <div class="vue-doc-demo">
    <!-- Docs Sidebar: grouped nav (Introduction, Foundations, Components) — same as Astro/Svelte/React/Vanilla -->
    <template v-if="slug === 'docs-sidebar'">
      <div class="docs-sidebar-demo vue-docs-sidebar-demo">
        <Component>
          <div class="docs-sidebar__group">
            <h2 class="docs-sidebar__group-label">Introduction</h2>
            <ul class="docs-sidebar__list">
              <li class="docs-sidebar__item"><a href="/docs/vue/overview" class="docs-sidebar__link">Overview</a></li>
              <li class="docs-sidebar__item"><a href="/docs/vue/showcase" class="docs-sidebar__link">Showcase</a></li>
              <li class="docs-sidebar__item"><a href="/docs/vue/getting-started" class="docs-sidebar__link">Getting Started</a></li>
            </ul>
          </div>
          <div class="docs-sidebar__group">
            <h2 class="docs-sidebar__group-label">Foundations</h2>
            <ul class="docs-sidebar__list">
              <li class="docs-sidebar__item"><a href="/docs/vue/design-system" class="docs-sidebar__link">Design System</a></li>
              <li class="docs-sidebar__item"><a href="/docs/vue/theming" class="docs-sidebar__link">Theming</a></li>
              <li class="docs-sidebar__item"><a href="/docs/vue/accessibility" class="docs-sidebar__link">Accessibility</a></li>
            </ul>
          </div>
          <div class="docs-sidebar__group">
            <h2 class="docs-sidebar__group-label">Components</h2>
            <ul class="docs-sidebar__list">
              <li class="docs-sidebar__item"><a href="/docs/vue/components" class="docs-sidebar__link">Overview</a></li>
              <li class="docs-sidebar__item"><a href="/docs/vue/components/button" class="docs-sidebar__link">Button</a></li>
              <li class="docs-sidebar__item"><a href="/docs/vue/components/docs-sidebar" class="docs-sidebar__link docs-sidebar__link--active">Docs Sidebar</a></li>
            </ul>
          </div>
        </Component>
      </div>
    </template>
    <!-- Switch: same as Astro — "Enable notifications" (vanilla HTML for Rizzo styles) -->
    <template v-else-if="slug === 'switch'">
      <label class="switch">
        <input type="checkbox" class="switch__input" role="switch" aria-checked="false" />
        <span class="switch__track" aria-hidden="true"><span class="switch__thumb"></span></span>
        <span class="switch__label">Enable notifications</span>
      </label>
    </template>
    <!-- Slider: same as Astro — Volume, 0–100, value 50 -->
    <template v-else-if="slug === 'slider'">
      <div class="slider" data-slider>
        <div class="slider__track">
          <div class="slider__fill" style="--slider-fill: 50%;"></div>
          <input type="range" min="0" max="100" value="50" aria-label="Volume" class="slider__input" />
        </div>
      </div>
    </template>
    <!-- Toggle: same as Astro — Bold + On (pressed) -->
    <template v-else-if="slug === 'toggle'">
      <div style="display: flex; flex-wrap: wrap; gap: var(--spacing-2);">
        <button type="button" class="toggle" aria-pressed="false" aria-label="Toggle bold">Bold</button>
        <button type="button" class="toggle toggle--pressed" aria-pressed="true" aria-label="On">On</button>
      </div>
    </template>
    <!-- Toggle group: same as Astro — Left, Center (pressed), Right -->
    <template v-else-if="slug === 'toggle-group'">
      <div class="toggle-group" role="group" aria-label="Alignment">
        <button type="button" class="toggle" aria-pressed="false" aria-label="Left">Left</button>
        <button type="button" class="toggle toggle--pressed" aria-pressed="true" aria-label="Center">Center</button>
        <button type="button" class="toggle" aria-pressed="false" aria-label="Right">Right</button>
      </div>
    </template>
    <!-- Label: same design as Astro — Email + input id="email" -->
    <template v-else-if="slug === 'label'">
      <div class="form-group">
        <Label for="email">Email</Label>
        <input id="email" type="email" class="form-input" placeholder="you@example.com" />
      </div>
    </template>
    <!-- Input group: same as Astro — Amount $ 0.00 USD -->
    <template v-else-if="slug === 'input-group'">
      <InputGroup placeholder="0.00" aria-label="Amount">
        <template #prefix>$</template>
        <template #suffix>USD</template>
      </InputGroup>
    </template>
    <!-- Scroll area: same design as Astro — vertical, max-height 200px, "Scrollable content here." -->
    <template v-else-if="slug === 'scroll-area'">
      <div class="scroll-area" style="max-height: 200px; border-radius: var(--radius-md); border: var(--border-width) solid var(--border);">
        <div class="scroll-area__viewport" tabindex="0">
          <div>Scrollable content here.</div>
        </div>
      </div>
    </template>
    <!-- Toast: same design as Astro — info, top-right, dismissible, "Saved!" -->
    <template v-else-if="slug === 'toast'">
      <Toast variant="info" position="top-right" dismissible>Saved!</Toast>
    </template>
    <!-- Tooltip: same design as Astro — "Hover me" + "Tooltip text" -->
    <template v-else-if="slug === 'tooltip'">
      <div>
        <button type="button" aria-describedby="tt-1">Hover me</button>
        <span id="tt-1" class="tooltip tooltip--top" role="tooltip" aria-hidden="true">Tooltip text</span>
      </div>
    </template>
    <!-- Modal: same design as Astro — title "Modal title", trigger "Open modal", content "Modal content." -->
    <template v-else-if="slug === 'modal'">
      <div class="vue-overlay-demo">
        <button type="button" class="btn" @click="modalOpen = true">Open modal</button>
        <div class="modal-root">
          <div class="modal__overlay" :aria-hidden="!modalOpen" @click="modalOpen = false"></div>
          <div class="modal modal--md" role="dialog" aria-modal="true" aria-labelledby="vue-modal-title" :aria-hidden="!modalOpen" :hidden="!modalOpen">
            <div class="modal__header">
              <h2 id="vue-modal-title" class="modal__title">Modal title</h2>
              <button type="button" class="modal__close" aria-label="Close" :tabindex="modalOpen ? 0 : -1" @click="modalOpen = false">×</button>
            </div>
            <div class="modal__body">
              <p>Modal content.</p>
            </div>
          </div>
        </div>
      </div>
    </template>
    <!-- Alert Dialog: same as Astro — "Delete item?" + This action cannot be undone. + Cancel/Delete -->
    <template v-else-if="slug === 'alert-dialog'">
      <div class="vue-overlay-demo">
        <div class="alert-dialog-root">
          <div class="alert-dialog__overlay" :class="{ 'alert-dialog__overlay--open': alertDialogOpen }" :aria-hidden="!alertDialogOpen" @click="alertDialogOpen = false"></div>
          <div class="alert-dialog" role="alertdialog" aria-modal="true" aria-labelledby="vue-alert-dialog-title" aria-describedby="vue-alert-dialog-desc" :aria-hidden="!alertDialogOpen" :hidden="!alertDialogOpen">
            <div class="alert-dialog__content">
              <h2 id="vue-alert-dialog-title" class="alert-dialog__title">Delete item?</h2>
              <p id="vue-alert-dialog-desc" class="alert-dialog__description">This action cannot be undone.</p>
              <div class="alert-dialog__actions">
                <button type="button" class="btn" :tabindex="alertDialogOpen ? 0 : -1" @click="alertDialogOpen = false">Cancel</button>
                <button type="button" class="btn btn-error" :tabindex="alertDialogOpen ? 0 : -1" @click="alertDialogOpen = false">Delete</button>
              </div>
            </div>
          </div>
        </div>
        <button type="button" class="btn" @click="alertDialogOpen = true">Open alert dialog</button>
      </div>
    </template>
    <!-- Sheet: same design as Astro — title "Panel", content "Sheet content.", trigger "Open sheet" -->
    <template v-else-if="slug === 'sheet'">
      <div class="vue-overlay-demo">
        <button type="button" class="btn" @click="sheetOpen = true">Open sheet</button>
        <div class="sheet-root">
          <div class="sheet__overlay" :class="{ 'sheet__overlay--open': sheetOpen }" :aria-hidden="!sheetOpen" @click="sheetOpen = false"></div>
          <div class="sheet sheet--right" :class="{ 'sheet--open': sheetOpen }" role="dialog" aria-modal="true" aria-labelledby="vue-sheet-title" :aria-hidden="!sheetOpen" :hidden="!sheetOpen">
            <div class="sheet__content">
              <div class="sheet__header">
                <h2 id="vue-sheet-title" class="sheet__title">Panel</h2>
                <button type="button" class="sheet__close" aria-label="Close" :tabindex="sheetOpen ? 0 : -1" @click="sheetOpen = false">×</button>
              </div>
              <div class="sheet__body"><p>Sheet content.</p></div>
            </div>
          </div>
        </div>
      </div>
    </template>
    <!-- Popover: same design as Astro — trigger "Open" + "Popover content." -->
    <template v-else-if="slug === 'popover'">
      <div class="vue-overlay-demo vue-popover-demo">
        <div class="popover" :class="{ 'popover--open': popoverOpen }">
          <button type="button" class="btn" data-popover-trigger aria-haspopup="true" :aria-expanded="popoverOpen" @click="popoverOpen = !popoverOpen">Open</button>
          <div class="popover__content" :class="{ 'popover__content--open': popoverOpen }" role="dialog" :aria-hidden="!popoverOpen" :hidden="!popoverOpen">
            <p style="margin:0;">Popover content.</p>
          </div>
        </div>
      </div>
    </template>
    <!-- Hover Card: same design as Astro — "Hover me" + "Hover card content." -->
    <template v-else-if="slug === 'hover-card'">
      <div class="vue-overlay-demo vue-hover-card-demo">
        <div class="hover-card" @mouseenter="hoverCardOpen = true" @mouseleave="hoverCardOpen = false">
          <span data-hover-card-trigger style="cursor: pointer; text-decoration: underline;">Hover me</span>
          <div class="hover-card__content" :class="{ 'hover-card__content--open': hoverCardOpen }" style="min-width: 16rem;" :aria-hidden="!hoverCardOpen" :hidden="!hoverCardOpen">
            <p style="margin: 0;">Hover card content.</p>
          </div>
        </div>
      </div>
    </template>
    <!-- Context Menu: same design as Astro — Right-click + Edit, separator, Delete -->
    <template v-else-if="slug === 'context-menu'">
      <div class="vue-overlay-demo vue-context-menu-demo">
        <div class="context-menu" style="display: inline-block;">
          <div
            data-context-menu-trigger
            style="display: flex; align-items: center; justify-content: center; height: 150px; width: 300px; border: var(--border-width) dashed var(--border); border-radius: var(--radius-md); font-size: var(--font-size-sm); cursor: context-menu;"
            @contextmenu.prevent="contextMenuOpen = true"
          >
            Right-click
          </div>
          <div v-show="contextMenuOpen" class="context-menu__content" :class="{ 'context-menu__content--open': contextMenuOpen }" role="menu" style="left: 50%; top: 50%; transform: translate(-50%, -50%);">
            <button type="button" class="context-menu__item" @click="contextMenuOpen = false">Edit</button>
            <div class="context-menu__separator" role="separator"></div>
            <button type="button" class="context-menu__item" @click="contextMenuOpen = false">Delete</button>
          </div>
        </div>
      </div>
    </template>
    <!-- Dropdown: same design as Astro — trigger "Actions" + Edit, Duplicate, separator, More -->
    <template v-else-if="slug === 'dropdown'">
      <div class="vue-overlay-demo vue-dropdown-demo">
        <div class="dropdown" :class="{ 'dropdown--open': dropdownOpen }">
          <button type="button" class="dropdown__trigger" aria-haspopup="true" :aria-expanded="dropdownOpen" @click="dropdownOpen = !dropdownOpen">Actions</button>
          <div class="dropdown__menu" :class="{ 'dropdown__menu--open': dropdownOpen }" role="menu" :aria-hidden="!dropdownOpen" :hidden="!dropdownOpen">
            <a href="#" class="dropdown__item" role="menuitem" @click.prevent="dropdownOpen = false">Edit</a>
            <a href="#" class="dropdown__item" role="menuitem" @click.prevent="dropdownOpen = false">Duplicate</a>
            <div class="dropdown__separator" role="separator"></div>
            <a href="#" class="dropdown__item" role="menuitem" @click.prevent="dropdownOpen = false">More</a>
          </div>
        </div>
      </div>
    </template>
    <!-- Copy-to-clipboard: same design as Astro — value "npm install rizzo-css", label "Copy" -->
    <template v-else-if="slug === 'copy-to-clipboard'">
      <component :is="Component" v-bind="demoProps" />
    </template>
    <!-- Forms: same design as Astro — Email, placeholder you@example.com -->
    <template v-else-if="slug === 'forms'">
      <div class="form-group">
        <Label for="email">Email</Label>
        <input id="email" type="email" name="email" class="form-input" placeholder="you@example.com" />
      </div>
    </template>
    <!-- Resizable: same design as Astro — horizontal Left | Right -->
    <template v-else-if="slug === 'resizable'">
      <div class="vue-resizable-demo-wrap">
        <ResizablePaneGroup class="vue-resizable-demo resizable-pane-group--horizontal" direction="horizontal">
          <ResizablePane :default-size="50"><div class="vue-resizable-pane-inner">Left</div></ResizablePane>
          <ResizableHandle />
          <ResizablePane><div class="vue-resizable-pane-inner">Right</div></ResizablePane>
        </ResizablePaneGroup>
      </div>
    </template>
    <!-- Button: same design as Astro — Default, Primary, Secondary, Success, Outline, Ghost, Small, Large -->
    <template v-else-if="slug === 'button'">
      <div class="vue-showcase-stack">
        <div class="vue-showcase-grid">
          <Button>Default</Button>
          <Button variant="primary">Primary</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="success">Success</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="ghost">Ghost</Button>
        </div>
        <p class="vue-showcase-caption">Sizes: <Button variant="primary" class="btn--sm">Small</Button> <Button variant="primary" class="btn--lg">Large</Button></p>
      </div>
    </template>
    <template v-else-if="slug === 'badge'">
      <div class="vue-showcase-grid">
        <Badge>Default</Badge>
        <Badge variant="primary">Primary</Badge>
        <Badge variant="success">Success</Badge>
      </div>
    </template>
    <template v-else-if="slug === 'alert'">
      <div class="vue-showcase-stack">
        <Alert class="alert--success"><span class="alert__content">Your changes have been saved.</span></Alert>
        <Alert class="alert--error alert--dismissible">
          <span class="alert__content">An error occurred. Please try again.</span>
          <button type="button" class="alert__close" aria-label="Dismiss">×</button>
        </Alert>
      </div>
    </template>
    <!-- Cards: same design as Astro — one elevated card "Card title" / "Card content." -->
    <template v-else-if="slug === 'cards'">
      <Card variant="elevated">
        <div class="card__body">
          <h3>Card title</h3>
          <p>Card content.</p>
        </div>
      </Card>
    </template>
    <!-- Progress bar: same design as Astro — one bar value 60, showLabel -->
    <template v-else-if="slug === 'progress-bar'">
      <div class="progress progress--primary progress--md" role="progressbar" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100" aria-label="Progress">
        <div class="progress__track"><div class="progress__bar" style="width: 60%;" /></div>
        <span class="progress__label" aria-hidden="true">60%</span>
      </div>
    </template>
    <!-- Avatar: same design as Astro — Jane Doe (initials) + src photo.jpg -->
    <template v-else-if="slug === 'avatar'">
      <div class="vue-showcase-grid">
        <Avatar name="Jane Doe" />
        <Avatar src="/photo.jpg" alt="Jane" />
      </div>
    </template>
    <!-- Skeleton: same design as Astro — default + text variant -->
    <template v-else-if="slug === 'skeleton'">
      <div class="vue-showcase-stack">
        <Skeleton />
        <Skeleton class="skeleton--text" />
      </div>
    </template>
    <template v-else-if="slug === 'divider'">
      <div class="vue-showcase-stack">
        <Divider orientation="horizontal" />
        <Divider orientation="horizontal" label="OR" />
        <div class="vue-showcase-divider-vertical-wrap">
          <span>Left</span>
          <Divider orientation="vertical" />
          <span>Right</span>
        </div>
      </div>
    </template>
    <!-- Kbd: same design as Astro — Press Ctrl+K to open search -->
    <template v-else-if="slug === 'kbd'">
      <p style="margin: 0;">Press <Kbd>Ctrl</Kbd>+<Kbd>K</Kbd> to open search.</p>
    </template>
    <template v-else-if="slug === 'separator'">
      <div class="vue-showcase-stack">
        <Separator class="separator--horizontal" />
        <div class="vue-showcase-divider-vertical-wrap">
          <span>Section A</span>
          <Separator class="separator--vertical" />
          <span>Section B</span>
        </div>
      </div>
    </template>
    <template v-else-if="slug === 'button-group'">
      <div class="vue-showcase-stack">
        <ButtonGroup>
          <Button>One</Button>
          <Button>Two</Button>
          <Button>Three</Button>
        </ButtonGroup>
      </div>
    </template>
    <template v-else-if="slug === 'spinner'">
      <div class="vue-showcase-stack">
        <Spinner />
        <Spinner variant="success" size="lg" />
      </div>
    </template>
    <template v-else-if="slug === 'empty'">
      <div class="empty">
        <h3 class="empty__title">No items yet</h3>
        <p class="empty__description">Get started by adding your first item.</p>
        <div class="empty__action">
          <Button variant="primary">Add item</Button>
        </div>
      </div>
    </template>
    <template v-else-if="Component">
      <!-- Single-component examples with slot content where needed -->
      <component :is="Component" v-bind="demoProps">
        <template v-if="slug === 'accordion'" #default>
          <div class="accordion__item">
            <button type="button" class="accordion__trigger accordion__trigger--expanded" aria-expanded="true" aria-controls="vue-acc-1" id="vue-acc-trigger-1">Section 1</button>
            <div id="vue-acc-1" class="accordion__panel accordion__panel--expanded">
              <div class="accordion__panel-inner">
                <div class="accordion__panel-content"><p>Content 1.</p></div>
              </div>
            </div>
          </div>
          <div class="accordion__item">
            <button type="button" class="accordion__trigger" aria-expanded="false" aria-controls="vue-acc-2" id="vue-acc-trigger-2">Section 2</button>
            <div id="vue-acc-2" class="accordion__panel" hidden>
              <div class="accordion__panel-inner">
                <div class="accordion__panel-content"><p>Content 2.</p></div>
              </div>
            </div>
          </div>
        </template>
        <template v-else-if="slug === 'tabs'" #default>
          <div class="tabs__list" role="tablist" aria-label="Tabs">
            <span class="tabs__tab tabs__tab--active" id="vue-tabs-tab-one" role="tab" tabindex="0" aria-selected="true" aria-controls="vue-tabs-panel-one" data-tab-id="one">Tab One</span>
            <span class="tabs__tab" id="vue-tabs-tab-two" role="tab" tabindex="-1" aria-selected="false" aria-controls="vue-tabs-panel-two" data-tab-id="two">Tab Two</span>
          </div>
          <div class="tabs__panels-wrapper">
            <div class="tabs__panel tabs__panel--active" id="vue-tabs-panel-one" role="tabpanel" aria-labelledby="vue-tabs-tab-one" data-panel-id="one">
              <div class="tabs__panel-content"><p>Content for Tab One.</p></div>
            </div>
            <div class="tabs__panel" id="vue-tabs-panel-two" role="tabpanel" aria-labelledby="vue-tabs-tab-two" aria-hidden="true" data-panel-id="two">
              <div class="tabs__panel-content"><p>Content for Tab Two.</p></div>
            </div>
          </div>
        </template>
        <template v-else-if="slug === 'table'" #default>
          <div class="table__wrapper">
            <table class="table__table table--striped">
              <caption class="table__caption">Demo table</caption>
              <thead class="table__head">
                <tr class="table__row">
                  <th class="table__cell table__cell--head" scope="col">Name</th>
                  <th class="table__cell table__cell--head" scope="col">Value</th>
                </tr>
              </thead>
              <tbody class="table__body">
                <tr class="table__row"><td class="table__cell">Alpha</td><td class="table__cell">10</td></tr>
                <tr class="table__row"><td class="table__cell">Beta</td><td class="table__cell">20</td></tr>
              </tbody>
            </table>
          </div>
        </template>
        <template v-else-if="slug === 'collapsible'" #default>
          <button type="button" class="collapsible__trigger" aria-expanded="false" aria-controls="vue-collapsible-panel" id="vue-collapsible-trigger">
            <span class="collapsible__trigger-label">Show more</span>
            <span class="collapsible__icon" aria-hidden="true">▼</span>
          </button>
          <div id="vue-collapsible-panel" class="collapsible__panel" role="region" aria-labelledby="vue-collapsible-trigger" hidden>
            <div class="collapsible__panel-inner">
              <p>Hidden content here.</p>
            </div>
          </div>
        </template>
        <template v-else-if="slug === 'footer'" #default>
          <div class="footer__container">
            <div class="footer__inner">
              <p class="footer__copyright">
                <span class="footer__site-name">My App</span> · <span class="footer__year">© {{ new Date().getFullYear() }}</span>
              </p>
              <nav class="footer__nav" aria-label="Footer">
                <ul class="footer__links">
                  <li class="footer__link-item"><a class="footer__link" href="/docs">Docs</a></li>
                  <li class="footer__link-item"><a class="footer__link" href="/privacy">Privacy</a></li>
                </ul>
              </nav>
            </div>
          </div>
        </template>
        <template v-else-if="slug === 'dashboard'" #default>
          <div class="dashboard-demo-wrap">
            <div class="dashboard">
              <aside class="dashboard__sidebar" aria-label="Dashboard navigation">
                <nav class="dashboard__nav">
                  <a href="/docs/vue/components/dashboard" class="dashboard__nav-link dashboard__nav-link--active" aria-current="page">Dashboard</a>
                  <a href="#" class="dashboard__nav-link">Items</a>
                  <a href="#" class="dashboard__nav-link">Settings</a>
                </nav>
              </aside>
              <main class="dashboard__main">
                <div class="dashboard-page">
                  <header class="dashboard-page__header">
                    <h1 class="dashboard-page__title">Dashboard</h1>
                    <p class="dashboard-page__subtitle">Overview. Same structure as the Dashboard block.</p>
                  </header>
                  <section class="dashboard-page__stats" aria-labelledby="vue-demo-stats-heading">
                    <h2 id="vue-demo-stats-heading" class="sr-only">Key metrics</h2>
                    <div class="dashboard-page__stats-grid">
                      <div class="card dashboard-page__stat">
                        <div class="card__body">
                          <span class="card__label">Total users</span>
                          <span class="card__value">1,234</span>
                        </div>
                      </div>
                      <div class="card dashboard-page__stat">
                        <div class="card__body">
                          <span class="card__label">Revenue</span>
                          <span class="card__value">$12,345</span>
                        </div>
                      </div>
                      <div class="card dashboard-page__stat">
                        <div class="card__body">
                          <span class="card__label">Active</span>
                          <span class="card__value">89%</span>
                        </div>
                      </div>
                    </div>
                  </section>
                  <section class="dashboard-page__table" aria-labelledby="vue-demo-table-heading">
                    <h2 id="vue-demo-table-heading" class="dashboard-page__section-title">Recent activity</h2>
                    <div class="table-wrapper">
                      <table class="table">
                        <caption class="sr-only">Recent activity list</caption>
                        <thead>
                          <tr class="table__row">
                            <th scope="col" class="table__cell table__cell--header">Name</th>
                            <th scope="col" class="table__cell table__cell--header">Status</th>
                            <th scope="col" class="table__cell table__cell--header">Date</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr class="table__row">
                            <td class="table__cell">Item one</td>
                            <td class="table__cell"><span class="badge badge--success">Done</span></td>
                            <td class="table__cell">Today</td>
                          </tr>
                          <tr class="table__row">
                            <td class="table__cell">Item two</td>
                            <td class="table__cell"><span class="badge badge--warning">Pending</span></td>
                            <td class="table__cell">Yesterday</td>
                          </tr>
                          <tr class="table__row">
                            <td class="table__cell">Item three</td>
                            <td class="table__cell"><span class="badge badge--error">Failed</span></td>
                            <td class="table__cell">Jan 15</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </section>
                </div>
              </main>
            </div>
          </div>
        </template>
        <template v-else-if="slug === 'pagination'" #default>
          <nav class="pagination" aria-label="Pagination">
            <ul class="pagination__list">
              <li class="pagination__item"><a class="pagination__link pagination__link--prev" href="#page=1" aria-label="First page">First</a></li>
              <li class="pagination__item"><a class="pagination__link pagination__link--prev" href="#page=2" aria-label="Previous page">Previous</a></li>
              <li class="pagination__item"><a class="pagination__link" href="#page=1" aria-label="Page 1">1</a></li>
              <li class="pagination__item"><a class="pagination__link" href="#page=2" aria-label="Page 2">2</a></li>
              <li class="pagination__item"><span class="pagination__link pagination__link--current" aria-current="page">3</span></li>
              <li class="pagination__item"><a class="pagination__link" href="#page=4" aria-label="Page 4">4</a></li>
              <li class="pagination__item"><a class="pagination__link pagination__link--next" href="#page=4" aria-label="Next page">Next</a></li>
              <li class="pagination__item"><a class="pagination__link pagination__link--next" href="#page=10" aria-label="Last page">Last</a></li>
            </ul>
          </nav>
        </template>
        <template v-else-if="slug === 'navbar'" #default>
          <div class="vue-navbar-demo-wrapper">
          <Component>
            <div class="navbar__container">
              <div class="navbar__brand">
                <a href="/" class="navbar__brand-link">Rizzo</a>
              </div>
              <div class="navbar__actions-desktop">
                <button type="button" class="search__trigger" aria-label="Open search"><span class="search__trigger-text">Search</span></button>
                <button type="button" class="navbar__settings-btn" aria-label="Open settings"><span class="navbar__settings-label">Settings</span></button>
              </div>
              <button type="button" class="navbar__toggle" aria-label="Toggle menu" aria-expanded="false" aria-controls="vue-demo-navbar-menu">
                <span class="navbar__toggle-icon" aria-hidden="true"><span></span><span></span><span></span></span>
              </button>
              <div class="navbar__menu" id="vue-demo-navbar-menu" role="navigation" aria-label="Mobile menu" aria-hidden="true">
                <div class="navbar__item"><a href="/docs" class="navbar__link" tabindex="-1">Docs</a></div>
                <div class="navbar__item"><a href="/docs/components" class="navbar__link" tabindex="-1">Components</a></div>
                <div class="navbar__item"><a href="/blocks" class="navbar__link" tabindex="-1">Blocks</a></div>
                <div class="navbar__item"><a href="/themes" class="navbar__link" tabindex="-1">Themes</a></div>
              </div>
            </div>
          </Component>
          </div>
        </template>
        <template v-else-if="slug === 'back-to-top'" #default>
          <button type="button" class="back-to-top__btn" aria-label="Back to top" @click="() => { window.scrollTo({ top: 0, behavior: 'smooth' }); }">
            <span class="back-to-top__icon" aria-hidden="true">↑</span>
          </button>
        </template>
        <template v-else-if="slug === 'empty'" #default>
          <div class="empty">
            <h3 class="empty__title">No items yet</h3>
            <p class="empty__description">Get started by adding your first item.</p>
            <div class="empty__action">
              <Button variant="primary">Add item</Button>
            </div>
          </div>
        </template>
        <template v-else-if="slug === 'breadcrumb'" #default>
          <nav aria-label="Breadcrumb" class="breadcrumb">
            <ol class="breadcrumb__list">
              <li class="breadcrumb__item"><a href="/">Home</a></li>
              <li class="breadcrumb__item"><span class="breadcrumb__sep" aria-hidden="true">/</span></li>
              <li class="breadcrumb__item"><a href="/docs">Docs</a></li>
              <li class="breadcrumb__item"><span class="breadcrumb__sep" aria-hidden="true">/</span></li>
              <li class="breadcrumb__item breadcrumb__item--current" aria-current="page">Current</li>
            </ol>
          </nav>
        </template>
        <template v-else-if="slug === 'label'" #default>Email</template>
        <template v-else-if="slug === 'kbd'" #default>Ctrl</template>
        <template v-else-if="slug === 'aspect-ratio'" #default>
          <img src="/poster.jpg" alt="" />
        </template>
        <template v-else-if="slug === 'carousel'" #default>
          <div class="carousel__slide"><h4>Slide 1</h4><p>First slide content.</p></div>
          <div class="carousel__slide"><h4>Slide 2</h4><p>Second slide content.</p></div>
          <div class="carousel__slide"><h4>Slide 3</h4><p>Third slide content.</p></div>
        </template>
        <template v-else-if="slug === 'direction'" #default>
          <p>Right-to-left content here.</p>
        </template>
      </component>
    </template>
    <div v-else class="vue-doc-demo-placeholder">
      <p>Vue component for this page is not available. See <a href="/docs/components/button">Astro</a> or <a href="/docs/svelte/components/button">Svelte</a> docs for the same component.</p>
    </div>
  </div>
</template>

<style scoped>
.vue-doc-demo {
  min-height: 2rem;
}
.vue-navbar-demo-wrapper {
  margin: 0 calc(-1 * var(--spacing-6));
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
  overflow: hidden;
}
.vue-showcase-grid {
  display: flex;
  flex-wrap: wrap;
  gap: var(--spacing-3);
  align-items: center;
}
.vue-showcase-grid--stretch {
  align-items: stretch;
}
.vue-showcase-stack {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-3);
}
.vue-showcase-divider-vertical-wrap {
  display: flex;
  align-items: center;
  gap: var(--spacing-3);
  min-height: 32px;
}
.vue-showcase-caption {
  margin: 0;
  font-size: var(--font-size-sm);
  color: var(--text-dim);
}
.vue-showcase-card-title {
  margin-top: 0;
  margin-bottom: var(--spacing-2);
}
.vue-showcase-card-p {
  margin-bottom: 0;
}
.vue-aspect-placeholder {
  background: var(--background-alt);
  border-radius: var(--radius-md);
  padding: var(--spacing-4);
  text-align: center;
  color: var(--text-dim);
}
.vue-doc-demo-placeholder {
  padding: var(--spacing-4);
  background: var(--background-alt);
  border: 1px dashed var(--border);
  border-radius: var(--radius-md);
  color: var(--text-dim);
}
.vue-doc-demo-placeholder a {
  color: var(--link);
}
.vue-docs-sidebar-demo {
  max-height: 18rem;
  overflow: auto;
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
  padding: var(--spacing-4);
}
.vue-resizable-demo-wrap {
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
  overflow: hidden;
  max-width: 28rem;
}
.vue-resizable-demo {
  min-height: 200px;
  display: flex;
}
.vue-resizable-pane-inner {
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: center;
  padding: var(--spacing-6);
  font-weight: 600;
}
.vue-demo-slide {
  padding: var(--spacing-6);
  text-align: center;
  background: var(--background);
  border-radius: var(--radius-md);
  min-height: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
}
/* Overlay demos: contain fixed overlays and position dropdown/popover */
.vue-overlay-demo {
  position: relative;
  min-height: 120px;
}
.vue-popover-demo .popover {
  position: relative;
  display: inline-block;
}
.vue-hover-card-demo .hover-card {
  position: relative;
  display: inline-block;
}
.vue-dropdown-demo .dropdown {
  position: relative;
  display: inline-block;
}
.dashboard-demo-wrap {
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
  overflow: hidden;
  min-height: 14rem;
}
.dashboard-demo-wrap :deep(.dashboard) {
  min-height: 14rem;
}
</style>
