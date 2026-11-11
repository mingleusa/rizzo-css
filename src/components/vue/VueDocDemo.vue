<script setup>
/**
 * Live Vue demo for /docs/vue/components/<slug>. Uses the real components from the npm package
 * (see registry.js) with the same content as the Astro demos, so each page shows working behavior.
 */
import { ref } from 'vue';
import { getVueComponent } from './registry.js';
import Button from './Button.vue';
import Label from './Label.vue';

const props = defineProps({
  slug: { type: String, required: true },
});

/** Component for a slug or helper key (lazy; only the ones a demo uses are loaded). */
const C = (key) => getVueComponent(key);
const Component = C(props.slug);

// Props for demos that just render the page's component (components without a custom template below).
const DEMO_PROPS = {
  calendar: { label: 'Choose a date' },
  'range-calendar': { label: 'Choose date range' },
  carousel: { label: 'Slides' },
  chart: { data: [{ label: 'A', value: 40 }, { label: 'B', value: 65 }, { label: 'C', value: 30 }] },
  command: {
    triggerLabel: 'Open command palette (⌘K)',
    searchPlaceholder: 'Search…',
    items: [{ id: 'new', label: 'New file', shortcut: '⌘N' }, { id: 'save', label: 'Save', shortcut: '⌘S' }],
  },
  'input-otp': { length: 6 },
  menubar: {
    items: [
      { label: 'File', menu: [{ label: 'New', href: '#' }, { label: 'Open', href: '#' }] },
      { label: 'Edit', menu: [{ label: 'Undo', href: '#' }] },
    ],
  },
};
const demoProps = DEMO_PROPS[props.slug] ?? {};

// Interactive state
const modalOpen = ref(false);
const alertDialogOpen = ref(false);
const sheetOpen = ref(false);
const popoverOpen = ref(false);
const sliderValue = ref(50);
const boldPressed = ref(false);
const onPressed = ref(true);
const alignment = ref('center');
const toastShown = ref(0);
const toastVisible = ref(false);

function showToast() {
  toastShown.value++;
  toastVisible.value = true;
}

function openSiteSettings() {
  window.openSettings?.();
}

const dropdownItems = [
  { label: 'Edit', value: 'edit' },
  { label: 'Duplicate', value: 'duplicate' },
  { separator: true, label: '' },
  { label: 'More', value: 'more' },
];
const accordionItems = [
  { id: 'section-1', title: 'Section 1', content: 'Content 1.' },
  { id: 'section-2', title: 'Section 2', content: 'Content 2.' },
];
const tabs = [
  { id: 'one', label: 'Tab One', content: 'Content for Tab One.' },
  { id: 'two', label: 'Tab Two', content: 'Content for Tab Two.' },
];
const tableColumns = [
  { key: 'name', label: 'Name' },
  { key: 'value', label: 'Value', type: 'number' },
];
const tableRows = [
  { name: 'Alpha', value: 10 },
  { name: 'Beta', value: 20 },
];
const footerLinks = [
  { href: '/docs', label: 'Docs' },
  { href: '/privacy', label: 'Privacy' },
];
const breadcrumbItems = [
  { label: 'Home', href: '/' },
  { label: 'Docs', href: '/docs' },
  { label: 'Current' },
];
const navbarLinks = [
  { href: '/docs', label: 'Docs' },
  { href: '/docs/components', label: 'Components' },
  { href: '/blocks', label: 'Blocks' },
  { href: '/themes', label: 'Themes' },
];
// Same groups as the Astro/Svelte/React/Vanilla demos: shared pages + Vue component pages.
const docsNav = [
  {
    label: 'Introduction',
    links: [
      { href: 'overview', label: 'Overview' },
      { href: 'showcase', label: 'Showcase' },
      { href: 'getting-started', label: 'Getting Started' },
    ],
  },
  {
    label: 'Foundations',
    links: [
      { href: 'design-system', label: 'Design System' },
      { href: 'theming', label: 'Theming' },
      { href: 'accessibility', label: 'Accessibility' },
    ],
  },
  {
    label: 'Components',
    links: [
      { href: 'components', label: 'Overview', frameworkOnly: true },
      { href: 'components/button', label: 'Button', frameworkOnly: true },
      { href: 'components/docs-sidebar', label: 'Docs Sidebar', frameworkOnly: true },
    ],
  },
];
</script>

<template>
  <div class="vue-doc-demo">
    <!-- Overlays: trigger + the real component (focus trap, Escape, overlay click) -->
    <template v-if="slug === 'modal'">
      <Button @click="modalOpen = true">Open modal</Button>
      <component :is="Component" v-model:open="modalOpen" title="Modal title">
        <p>Modal content.</p>
      </component>
    </template>

    <template v-else-if="slug === 'alert-dialog'">
      <Button @click="alertDialogOpen = true">Open alert dialog</Button>
      <component :is="Component" v-model:open="alertDialogOpen" title="Delete item?" description="This action cannot be undone.">
        <template #actions>
          <button type="button" class="btn" @click="alertDialogOpen = false">Cancel</button>
          <button type="button" class="btn btn-error" @click="alertDialogOpen = false">Delete</button>
        </template>
      </component>
    </template>

    <template v-else-if="slug === 'sheet'">
      <Button @click="sheetOpen = true">Open sheet</Button>
      <component :is="Component" v-model:open="sheetOpen" title="Panel" side="right">
        <p>Sheet content.</p>
      </component>
    </template>

    <template v-else-if="slug === 'popover'">
      <component :is="Component" v-model:open="popoverOpen">
        <template #trigger>Open</template>
        <p style="margin: 0;">Popover content.</p>
      </component>
    </template>

    <template v-else-if="slug === 'hover-card'">
      <component :is="Component">
        <template #trigger><a href="#hover-card" class="vue-demo-link">Hover me</a></template>
        <p style="margin: 0;">Hover card content.</p>
      </component>
    </template>

    <template v-else-if="slug === 'context-menu'">
      <component :is="Component">
        <template #trigger>
          <div class="vue-context-menu-area">Right-click</div>
        </template>
        <button type="button" class="context-menu__item" role="menuitem">Edit</button>
        <div class="context-menu__separator" role="separator"></div>
        <button type="button" class="context-menu__item" role="menuitem">Delete</button>
      </component>
    </template>

    <template v-else-if="slug === 'dropdown'">
      <component :is="Component" trigger="Actions" :items="dropdownItems" />
    </template>

    <template v-else-if="slug === 'toast'">
      <Button @click="showToast">Show toast</Button>
      <component
        :is="Component"
        v-if="toastVisible"
        :key="toastShown"
        variant="info"
        position="top-right"
        dismissible
        @dismiss="toastVisible = false"
      >
        Saved!
      </component>
    </template>

    <template v-else-if="slug === 'tooltip'">
      <span class="tooltip-wrapper">
        <Button aria-describedby="vue-demo-tooltip">Hover me</Button>
        <component :is="Component" id="vue-demo-tooltip" text="Tooltip text" position="top" />
      </span>
    </template>

    <!-- Page-level components: one instance already lives in the site chrome -->
    <template v-else-if="slug === 'settings'">
      <p style="margin-top: 0;">Settings is a page-level panel: the site already has one, so this opens it (same as the navbar gear).</p>
      <Button @click="openSiteSettings">Open settings</Button>
    </template>

    <template v-else-if="slug === 'search'">
      <component :is="Component" id="vue-demo-search" />
    </template>

    <template v-else-if="slug === 'navbar'">
      <div class="vue-navbar-demo-wrapper">
        <component :is="Component" site-name="Rizzo" :menu-links="navbarLinks" />
      </div>
    </template>

    <template v-else-if="slug === 'theme-switcher' || slug === 'font-switcher'">
      <component :is="Component" id-prefix="vue-demo" />
    </template>

    <template v-else-if="slug === 'docs-sidebar'">
      <div class="docs-sidebar-demo vue-docs-sidebar-demo">
        <component :is="Component" :nav="docsNav" path-prefix="/docs/vue" current-path="/docs/vue/components/docs-sidebar" omit-id />
      </div>
    </template>

    <template v-else-if="slug === 'dashboard'">
      <div class="dashboard-demo-wrap">
        <component :is="Component">
          <div class="dashboard-page">
            <header class="dashboard-page__header">
              <h1 class="dashboard-page__title">Dashboard</h1>
              <p class="dashboard-page__subtitle">Overview. Same structure as the Dashboard block.</p>
            </header>
            <section class="dashboard-page__stats" aria-labelledby="vue-demo-stats-heading">
              <h2 id="vue-demo-stats-heading" class="sr-only">Key metrics</h2>
              <div class="dashboard-page__stats-grid">
                <div class="card dashboard-page__stat"><div class="card__body"><span class="card__label">Total users</span><span class="card__value">1,234</span></div></div>
                <div class="card dashboard-page__stat"><div class="card__body"><span class="card__label">Revenue</span><span class="card__value">$12,345</span></div></div>
                <div class="card dashboard-page__stat"><div class="card__body"><span class="card__label">Active</span><span class="card__value">89%</span></div></div>
              </div>
            </section>
          </div>
        </component>
      </div>
    </template>

    <!-- Form controls -->
    <template v-else-if="slug === 'switch'">
      <component :is="Component" label="Enable notifications" />
    </template>

    <template v-else-if="slug === 'slider'">
      <component :is="Component" v-model:value="sliderValue" aria-label="Volume" />
    </template>

    <template v-else-if="slug === 'toggle'">
      <div class="vue-showcase-grid">
        <component :is="Component" v-model:pressed="boldPressed" aria-label="Toggle bold">Bold</component>
        <component :is="Component" v-model:pressed="onPressed" aria-label="On">On</component>
      </div>
    </template>

    <template v-else-if="slug === 'toggle-group'">
      <component :is="Component" aria-label="Alignment">
        <component
          :is="C('toggle')"
          v-for="option in ['Left', 'Center', 'Right']"
          :key="option"
          :pressed="alignment === option.toLowerCase()"
          :aria-label="option"
          @update:pressed="(on) => { if (on) alignment = option.toLowerCase(); }"
        >
          {{ option }}
        </component>
      </component>
    </template>

    <template v-else-if="slug === 'label' || slug === 'forms'">
      <div class="form-group">
        <Label for="vue-demo-email">Email</Label>
        <input id="vue-demo-email" type="email" name="email" class="form-input" placeholder="you@example.com" />
      </div>
    </template>

    <template v-else-if="slug === 'input-group'">
      <component :is="Component" placeholder="0.00" aria-label="Amount">
        <template #prefix>$</template>
        <template #suffix>USD</template>
      </component>
    </template>

    <template v-else-if="slug === 'copy-to-clipboard'">
      <component :is="Component" value="npm install rizzo-css" label="Copy" />
    </template>

    <!-- Disclosure / navigation -->
    <template v-else-if="slug === 'accordion'">
      <component :is="Component" :items="accordionItems" default-expanded="section-1" />
    </template>

    <template v-else-if="slug === 'tabs'">
      <component :is="Component" :tabs="tabs" />
    </template>

    <template v-else-if="slug === 'collapsible'">
      <component :is="Component" trigger-label="Show more">
        <p>Hidden content here.</p>
      </component>
    </template>

    <template v-else-if="slug === 'table'">
      <component :is="Component" :columns="tableColumns" :data="tableRows" caption="Demo table" />
    </template>

    <template v-else-if="slug === 'pagination'">
      <component :is="Component" :current-page="2" :total-pages="10" href-template="#page={page}" />
    </template>

    <template v-else-if="slug === 'breadcrumb'">
      <component :is="Component" :items="breadcrumbItems" separator="slash" />
    </template>

    <template v-else-if="slug === 'footer'">
      <component :is="Component" site-name="My App" :links="footerLinks" />
    </template>

    <template v-else-if="slug === 'back-to-top'">
      <p style="margin-top: 0;">Scroll down the page: the button appears in the bottom corner.</p>
      <component :is="Component" :threshold="400" label="Back to top" />
    </template>

    <template v-else-if="slug === 'scroll-area'">
      <component :is="Component" class="vue-scroll-area-demo">
        <p v-for="n in 12" :key="n" style="margin: 0 0 var(--spacing-2);">Scrollable content line {{ n }}.</p>
      </component>
    </template>

    <template v-else-if="slug === 'resizable'">
      <div class="vue-resizable-demo-wrap">
        <component :is="Component" class="vue-resizable-demo" direction="horizontal">
          <component :is="C('resizable-pane')" :default-size="50"><div class="vue-resizable-pane-inner">Left</div></component>
          <component :is="C('resizable-handle')" with-handle />
          <component :is="C('resizable-pane')" :default-size="50"><div class="vue-resizable-pane-inner">Right</div></component>
        </component>
      </div>
    </template>

    <!-- Display -->
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
        <component :is="Component">Default</component>
        <component :is="Component" variant="primary">Primary</component>
        <component :is="Component" variant="success">Success</component>
      </div>
    </template>

    <template v-else-if="slug === 'alert'">
      <div class="vue-showcase-stack">
        <component :is="Component" variant="success">Your changes have been saved.</component>
        <component :is="Component" variant="error" dismissible>An error occurred. Please try again.</component>
      </div>
    </template>

    <template v-else-if="slug === 'cards'">
      <component :is="Component" variant="elevated">
        <div class="card__body">
          <h3>Card title</h3>
          <p>Card content.</p>
        </div>
      </component>
    </template>

    <template v-else-if="slug === 'progress-bar'">
      <component :is="Component" :value="60" show-label label="Progress" />
    </template>

    <template v-else-if="slug === 'avatar'">
      <div class="vue-showcase-grid">
        <component :is="Component" name="Jane Doe" />
        <component :is="Component" src="https://api.dicebear.com/7.x/initials/svg?seed=Alice" alt="Alice" />
      </div>
    </template>

    <template v-else-if="slug === 'skeleton'">
      <div class="vue-showcase-stack">
        <component :is="Component" />
        <component :is="Component" variant="text" />
      </div>
    </template>

    <template v-else-if="slug === 'divider'">
      <div class="vue-showcase-stack">
        <component :is="Component" orientation="horizontal" />
        <component :is="Component" orientation="horizontal" label="OR" />
        <div class="vue-showcase-divider-vertical-wrap">
          <span>Left</span>
          <component :is="Component" orientation="vertical" />
          <span>Right</span>
        </div>
      </div>
    </template>

    <template v-else-if="slug === 'separator'">
      <div class="vue-showcase-stack">
        <component :is="Component" />
        <div class="vue-showcase-divider-vertical-wrap">
          <span>Section A</span>
          <component :is="Component" orientation="vertical" />
          <span>Section B</span>
        </div>
      </div>
    </template>

    <template v-else-if="slug === 'kbd'">
      <p style="margin: 0;">Press <component :is="Component">Ctrl</component>+<component :is="Component">K</component> to open search.</p>
    </template>

    <template v-else-if="slug === 'button-group'">
      <component :is="Component">
        <Button>One</Button>
        <Button>Two</Button>
        <Button>Three</Button>
      </component>
    </template>

    <template v-else-if="slug === 'spinner'">
      <div class="vue-showcase-stack">
        <component :is="Component" />
        <component :is="Component" variant="success" size="lg" />
      </div>
    </template>

    <template v-else-if="slug === 'empty'">
      <component :is="Component" title="No items yet" description="Get started by adding your first item.">
        <template #action><Button variant="primary">Add item</Button></template>
      </component>
    </template>

    <template v-else-if="slug === 'aspect-ratio'">
      <component :is="Component" :ratio="16 / 9">
        <div class="vue-aspect-placeholder">16:9</div>
      </component>
    </template>

    <template v-else-if="slug === 'carousel'">
      <component :is="Component" v-bind="demoProps">
        <div class="carousel__slide"><h4>Slide 1</h4><p>First slide content.</p></div>
        <div class="carousel__slide"><h4>Slide 2</h4><p>Second slide content.</p></div>
        <div class="carousel__slide"><h4>Slide 3</h4><p>Third slide content.</p></div>
      </component>
    </template>

    <template v-else-if="slug === 'direction'">
      <component :is="Component" dir="rtl">
        <p style="margin: 0;">Right-to-left content here.</p>
      </component>
    </template>

    <!-- Everything else: the page's component with its demo props -->
    <component :is="Component" v-else-if="Component" v-bind="demoProps" />

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
.vue-aspect-placeholder {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  background: var(--background-alt);
  border-radius: var(--radius);
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
.vue-context-menu-area {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 150px;
  max-width: 300px;
  border: var(--border-width) dashed var(--border);
  border-radius: var(--radius-md);
  font-size: var(--font-size-sm);
  cursor: context-menu;
}
.vue-demo-link {
  text-decoration: underline;
}
.vue-scroll-area-demo {
  max-height: 200px;
  border: var(--border-width) solid var(--border);
  border-radius: var(--radius-md);
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
