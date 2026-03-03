/**
 * Vue 3 (SFC) code snippets for each component doc page.
 * Used by component docs with FrameworkCodeTabs to show accurate Vue usage.
 */
import { REACT_COMPONENT_SLUGS } from './reactComponents';

export function getVueCodeSnippet(slug: string): string {
  return VUE_CODE_SNIPPETS[slug] ?? getDefaultSnippet(slug);
}

function getDefaultSnippet(slug: string): string {
  const name = slug.split('-').map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join('');
  return `<script setup>
import { ${name} } from '@/components/rizzo';
</script>

<template>
  <${name} />
</template>`;
}

const VUE_CODE_SNIPPETS: Record<string, string> = {
  button: `<script setup>
import Button from '@/components/rizzo/Button.vue';
</script>

<template>
  <Button>Default</Button>
  <Button variant="primary">Primary</Button>
  <Button variant="secondary">Secondary</Button>
  <Button variant="success">Success</Button>
  <Button variant="outline">Outline</Button>
  <Button variant="ghost">Ghost</Button>
  <Button variant="primary" class="btn--sm">Small</Button>
  <Button variant="primary" class="btn--lg">Large</Button>
</template>`,

  badge: `<script setup>
import Badge from '@/components/rizzo/Badge.vue';
</script>

<template>
  <Badge>Default</Badge>
  <Badge variant="primary">Primary</Badge>
  <Badge variant="success">Success</Badge>
  <Badge variant="warning" pill>Pill</Badge>
</template>`,

  'button-group': `<script setup>
import ButtonGroup from '@/components/rizzo/ButtonGroup.vue';
import Button from '@/components/rizzo/Button.vue';
</script>

<template>
  <ButtonGroup>
    <Button>One</Button>
    <Button variant="primary">Two</Button>
    <Button>Three</Button>
  </ButtonGroup>
</template>`,

  divider: `<script setup>
import Divider from '@/components/rizzo/Divider.vue';
</script>

<template>
  <Divider />
  <Divider label="OR" />
  <Divider orientation="vertical" />
</template>`,

  separator: `<script setup>
import Separator from '@/components/rizzo/Separator.vue';
</script>

<template>
  <Separator />
  <Separator orientation="vertical" />
</template>`,

  spinner: `<script setup>
import Spinner from '@/components/rizzo/Spinner.vue';
</script>

<template>
  <Spinner />
  <Spinner variant="success" size="lg" />
  <Spinner label="Loading data…" />
</template>`,

  kbd: `<script setup>
import Kbd from '@/components/rizzo/Kbd.vue';
</script>

<template>
  <Kbd>Ctrl</Kbd> + <Kbd>K</Kbd>
</template>`,

  label: `<script setup>
import Label from '@/components/rizzo/Label.vue';
</script>

<template>
  <Label for="my-input">Email</Label>
  <input id="my-input" type="email" />
</template>`,

  empty: `<script setup>
import Empty from '@/components/rizzo/Empty.vue';
import Button from '@/components/rizzo/Button.vue';
</script>

<template>
  <Empty
    title="No results"
    description="Try adjusting your search."
  >
    <template #action>
      <Button variant="primary">Clear filters</Button>
    </template>
  </Empty>
</template>`,

  'aspect-ratio': `<script setup>
import AspectRatio from '@/components/rizzo/AspectRatio.vue';
</script>

<template>
  <AspectRatio ratio="16/9">
    <img src="/video-poster.jpg" alt="" />
  </AspectRatio>
</template>`,

  skeleton: `<script setup>
import Skeleton from '@/components/rizzo/Skeleton.vue';
</script>

<template>
  <Skeleton />
  <Skeleton variant="text" />
  <Skeleton variant="circle" />
</template>`,

  alert: `<script setup>
import Alert from '@/components/rizzo/Alert.vue';
</script>

<template>
  <Alert variant="info">Information message.</Alert>
  <Alert variant="success" dismissible>Saved!</Alert>
  <Alert variant="error">Something went wrong.</Alert>
</template>`,

  avatar: `<script setup>
import Avatar from '@/components/rizzo/Avatar.vue';
</script>

<template>
  <Avatar name="Jane Doe" />
  <Avatar src="/avatar.jpg" alt="User" />
  <Avatar initials="AB" size="lg" />
</template>`,

  cards: `<script setup>
import Card from '@/components/rizzo/Card.vue';
</script>

<template>
  <Card variant="elevated">
    <div class="card__body">
      <h3>Card title</h3>
      <p>Card content.</p>
    </div>
  </Card>
</template>`,

  'progress-bar': `<script setup>
import ProgressBar from '@/components/rizzo/ProgressBar.vue';
</script>

<template>
  <ProgressBar :value="60" :max="100" show-label />
  <ProgressBar indeterminate label="Loading…" />
</template>`,

  breadcrumb: `<script setup>
import Breadcrumb from '@/components/rizzo/Breadcrumb.vue';
</script>

<template>
  <Breadcrumb
    :items="[
      { label: 'Home', href: '/' },
      { label: 'Docs', href: '/docs' },
      { label: 'Current' },
    ]"
    separator="chevron"
  />
</template>`,

  'back-to-top': `<script setup>
import BackToTop from '@/components/rizzo/BackToTop.vue';
</script>

<template>
  <BackToTop :threshold="400" label="Back to top" />
</template>`,

  footer: `<script setup>
import Footer from '@/components/rizzo/Footer.vue';
</script>

<template>
  <Footer
    site-name="My App"
    :year="new Date().getFullYear()"
    :links="[
      { href: '/docs', label: 'Docs' },
      { href: '/privacy', label: 'Privacy' },
    ]"
  />
</template>`,

  switch: `<script setup>
import { ref } from 'vue';
import Switch from '@/components/rizzo/Switch.vue';
</script>

<template>
  <Switch
    v-model:checked="checked"
    label="Enable notifications"
  />
</template>`,

  toggle: `<script setup>
import { ref } from 'vue';
import Toggle from '@/components/rizzo/Toggle.vue';
</script>

<template>
  <Toggle v-model:pressed="pressed" aria-label="Toggle">
    Bold
  </Toggle>
</template>`,

  'toggle-group': `<script setup>
import ToggleGroup from '@/components/rizzo/ToggleGroup.vue';
import Toggle from '@/components/rizzo/Toggle.vue';
</script>

<template>
  <ToggleGroup type="single" aria-label="Format">
    <Toggle :pressed="false">Left</Toggle>
    <Toggle :pressed="true">Center</Toggle>
    <Toggle :pressed="false">Right</Toggle>
  </ToggleGroup>
</template>`,

  pagination: `<script setup>
import Pagination from '@/components/rizzo/Pagination.vue';
</script>

<template>
  <Pagination
    :current-page="2"
    :total-pages="10"
    href-template="?page={page}"
    show-first-last
    :max-visible="5"
  />
</template>`,

  tabs: `<script setup>
import Tabs from '@/components/rizzo/Tabs.vue';
</script>

<template>
  <Tabs
    :tabs="[
      { id: 'one', label: 'Tab One' },
      { id: 'two', label: 'Tab Two' },
    ]"
    default-tab="one"
  >
    <template #content="{ activeId }">
      <p>Content for {{ activeId }}</p>
    </template>
  </Tabs>
</template>`,

  accordion: `<script setup>
import Accordion from '@/components/rizzo/Accordion.vue';
</script>

<template>
  <Accordion
    :items="[
      { id: '1', title: 'Section 1', content: '<p>Content 1.</p>' },
      { id: '2', title: 'Section 2', content: '<p>Content 2.</p>' },
    ]"
    :allow-multiple="false"
    default-expanded="1"
  />
</template>`,

  slider: `<script setup>
import { ref } from 'vue';
import Slider from '@/components/rizzo/Slider.vue';
</script>

<template>
  <Slider
    v-model:value="value"
    :min="0"
    :max="100"
    aria-label="Volume"
  />
</template>`,

  forms: `<script setup>
import Input from '@/components/rizzo/Input.vue';
import Label from '@/components/rizzo/Label.vue';
</script>

<template>
  <Label for="email">Email</Label>
  <Input id="email" type="email" placeholder="you@example.com" />
</template>`,

  'copy-to-clipboard': `<script setup>
import CopyToClipboard from '@/components/rizzo/CopyToClipboard.vue';
</script>

<template>
  <CopyToClipboard value="npm install rizzo-css" label="Copy" />
</template>`,

  tooltip: `<script setup>
import Tooltip from '@/components/rizzo/Tooltip.vue';
</script>

<template>
  <button type="button" aria-describedby="tt-1">Hover me</button>
  <Tooltip id="tt-1" text="Tooltip text" position="top" />
</template>`,

  calendar: `<script setup>
import Calendar from '@/components/rizzo/Calendar.vue';
</script>

<template>
  <Calendar label="Choose a date" @select="(date) => console.log(date)" />
</template>`,

  carousel: `<script setup>
import Carousel from '@/components/rizzo/Carousel.vue';
</script>

<template>
  <Carousel label="Slides">
    <div class="carousel__slide"><h4>Slide 1</h4><p>First slide content.</p></div>
    <div class="carousel__slide"><h4>Slide 2</h4><p>Second slide content.</p></div>
    <div class="carousel__slide"><h4>Slide 3</h4><p>Third slide content.</p></div>
  </Carousel>
</template>`,

  collapsible: `<script setup>
import Collapsible from '@/components/rizzo/Collapsible.vue';
</script>

<template>
  <Collapsible trigger-label="Show more" :default-open="false">
    <p>Hidden content here.</p>
  </Collapsible>
</template>`,

  table: `<script setup>
import Table from '@/components/rizzo/Table.vue';
</script>

<template>
  <Table
    :columns="[
      { key: 'name', label: 'Name', sortable: true },
      { key: 'value', label: 'Value', sortable: true, type: 'number' },
    ]"
    :data="[
      { name: 'Alpha', value: 10 },
      { name: 'Beta', value: 20 },
    ]"
    caption="Demo table"
    striped
  />
</template>`,

  modal: `<script setup>
import { ref } from 'vue';
import Modal from '@/components/rizzo/Modal.vue';
import Button from '@/components/rizzo/Button.vue';
</script>

<template>
  <Button @click="open = true">Open modal</Button>
  <Modal v-model:open="open" title="Modal title">
    <p>Modal content.</p>
  </Modal>
</template>`,

  'alert-dialog': `<script setup>
import { ref } from 'vue';
import AlertDialog from '@/components/rizzo/AlertDialog.vue';
import Button from '@/components/rizzo/Button.vue';
</script>

<template>
  <Button variant="error" @click="open = true">Delete</Button>
  <AlertDialog
    v-model:open="open"
    title="Delete item?"
    description="This cannot be undone."
  >
    <template #actions>
      <Button variant="outline" @click="open = false">Cancel</Button>
      <Button variant="error" @click="open = false">Delete</Button>
    </template>
  </AlertDialog>
</template>`,

  toast: `<script setup>
import Toast from '@/components/rizzo/Toast.vue';
</script>

<template>
  <Toast variant="info" position="top-right" dismissible>Saved!</Toast>
</template>`,

  sheet: `<script setup>
import { ref } from 'vue';
import Sheet from '@/components/rizzo/Sheet.vue';
import Button from '@/components/rizzo/Button.vue';
</script>

<template>
  <Button @click="open = true">Open sheet</Button>
  <Sheet v-model:open="open" title="Panel" side="right">
    <p>Sheet content.</p>
  </Sheet>
</template>`,

  'scroll-area': `<script setup>
import ScrollArea from '@/components/rizzo/ScrollArea.vue';
</script>

<template>
  <ScrollArea orientation="vertical" style="max-height: 200px">
    <div>Scrollable content here.</div>
  </ScrollArea>
</template>`,

  dropdown: `<script setup>
import Dropdown from '@/components/rizzo/Dropdown.vue';
</script>

<template>
  <Dropdown
    trigger="Actions"
    :items="[
      { label: 'Edit' },
      { label: 'Duplicate' },
      { separator: true },
      { label: 'More', submenu: [{ label: 'Option A' }, { label: 'Option B' }] },
    ]"
  />
</template>`,

  popover: `<script setup>
import { ref } from 'vue';
import Popover from '@/components/rizzo/Popover.vue';
import Button from '@/components/rizzo/Button.vue';
</script>

<template>
  <Popover v-model:open="open">
    <template #trigger>
      <Button>Open</Button>
    </template>
    <p>Popover content.</p>
  </Popover>
</template>`,

  resizable: `<script setup>
import ResizablePaneGroup from '@/components/rizzo/ResizablePaneGroup.vue';
import ResizablePane from '@/components/rizzo/ResizablePane.vue';
import ResizableHandle from '@/components/rizzo/ResizableHandle.vue';
</script>

<template>
  <ResizablePaneGroup direction="horizontal">
    <ResizablePane :default-size="50">Left</ResizablePane>
    <ResizableHandle />
    <ResizablePane :default-size="50">Right</ResizablePane>
  </ResizablePaneGroup>
</template>`,

  'hover-card': `<script setup>
import { ref } from 'vue';
import HoverCard from '@/components/rizzo/HoverCard.vue';
import Button from '@/components/rizzo/Button.vue';
</script>

<template>
  <HoverCard v-model:open="open">
    <template #trigger>
      <Button variant="outline">Hover me</Button>
    </template>
    <p>Hover card content.</p>
  </HoverCard>
</template>`,

  'context-menu': `<script setup>
import ContextMenu from '@/components/rizzo/ContextMenu.vue';
</script>

<template>
  <ContextMenu>
    <template #trigger>
      <span>Right-click here</span>
    </template>
    <div class="dropdown__item" role="menuitem">Copy</div>
    <div class="dropdown__item" role="menuitem">Paste</div>
  </ContextMenu>
</template>`,

  navbar: `<script setup>
import Navbar from '@/components/rizzo/Navbar.vue';
import Search from '@/components/rizzo/Search.vue';
</script>

<template>
  <Navbar site-name="My App">
    <Search id="nav-search" />
  </Navbar>
</template>`,

  search: `<script setup>
import Search from '@/components/rizzo/Search.vue';
</script>

<template>
  <Search id="search-1" placeholder="Search…" />
</template>`,

  settings: `<script setup>
import { ref } from 'vue';
import Settings from '@/components/rizzo/Settings.vue';
import Button from '@/components/rizzo/Button.vue';
</script>

<template>
  <Button @click="open = true">Settings</Button>
  <Settings v-model:open="open" title="Settings">
    <p>Theme, font, options.</p>
  </Settings>
</template>`,

  'theme-switcher': `<script setup>
import ThemeSwitcher from '@/components/rizzo/ThemeSwitcher.vue';
</script>

<template>
  <ThemeSwitcher
    :themes="[
      { value: 'github-dark-classic', label: 'Dark' },
      { value: 'github-light', label: 'Light' },
      { value: 'system', label: 'System' },
    ]"
  />
</template>`,

  'font-switcher': `<script setup>
import FontSwitcher from '@/components/rizzo/FontSwitcher.vue';
</script>

<template>
  <FontSwitcher
    :fonts="[
      { id: 'system', label: 'System' },
      { id: 'sans-mono', label: 'Sans + Mono' },
    ]"
  />
</template>`,

  'sound-effects': `<script setup>
import SoundEffects from '@/components/rizzo/SoundEffects.vue';
</script>

<template>
  <SoundEffects />
</template>`,

  'docs-sidebar': `<script setup>
import DocsSidebar from '@/components/rizzo/DocsSidebar.vue';
</script>

<template>
  <DocsSidebar
    :links="[
      { href: '/docs', label: 'Overview' },
      { href: '/docs/components', label: 'Components', active: true },
    ]"
  />
</template>`,

  dashboard: `<script setup>
import Dashboard from '@/components/rizzo/Dashboard.vue';
import DocsSidebar from '@/components/rizzo/DocsSidebar.vue';
</script>

<template>
  <Dashboard>
    <template #sidebar>
      <DocsSidebar :links="[]" />
    </template>
    <p>Main content.</p>
  </Dashboard>
</template>`,

  icons: `<script setup>
import Icons from '@/components/rizzo/Icons.vue';
</script>

<template>
  <Icons />
</template>`,

  'input-group': `<script setup>
import InputGroup from '@/components/rizzo/InputGroup.vue';
</script>

<template>
  <InputGroup aria-label="Amount" placeholder="0.00">
    <template #prefix>$</template>
    <template #suffix>USD</template>
  </InputGroup>
</template>`,
};

export function getAllVueCodeSnippets(): Record<string, string> {
  const out: Record<string, string> = {};
  for (const slug of REACT_COMPONENT_SLUGS) {
    out[slug] = VUE_CODE_SNIPPETS[slug] ?? getDefaultSnippet(slug);
  }
  return out;
}
