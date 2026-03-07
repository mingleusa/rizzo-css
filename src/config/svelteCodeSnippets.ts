/**
 * Svelte code snippets for each component. Used by React/Vue doc pages
 * so FrameworkCodeTabs can show all five frameworks (Astro, Svelte, React, Vue, Vanilla).
 */
import { slugToPascal } from './reactComponents';

export function getSvelteCodeSnippet(slug: string): string {
  return SVELTE_CODE_SNIPPETS[slug] ?? getDefaultSnippet(slug);
}

function getDefaultSnippet(slug: string): string {
  const name = slugToPascal(slug);
  return `<script>
  import { ${name} } from '$lib/rizzo';
</script>

<${name} />`;
}

const SVELTE_CODE_SNIPPETS: Record<string, string> = {
  button: `<script>
  import { Button } from '$lib/rizzo';
</script>

<Button>Default</Button>
<Button variant="primary">Primary</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="success">Success</Button>
<Button variant="outline">Outline</Button>
<Button variant="ghost">Ghost</Button>
<Button variant="primary" class="btn--sm">Small</Button>
<Button variant="primary" class="btn--lg">Large</Button>`,

  alert: `<script>
  import { Alert } from '$lib/rizzo';
</script>

<Alert variant="success">Your changes have been saved.</Alert>
<Alert variant="error" dismissible>An error occurred. Please try again.</Alert>`,

  badge: `<script>
  import { Badge } from '$lib/rizzo';
</script>

<Badge>Default</Badge>
<Badge variant="primary">Primary</Badge>
<Badge variant="success">Success</Badge>`,

  'button-group': `<script>
  import { ButtonGroup, Button } from '$lib/rizzo';
</script>

<ButtonGroup>
  <Button>One</Button>
  <Button>Two</Button>
  <Button>Three</Button>
</ButtonGroup>`,

  divider: `<script>
  import { Divider } from '$lib/rizzo';
</script>

<Divider />
<Divider label="OR" />
<Divider orientation="vertical" />`,

  spinner: `<script>
  import { Spinner } from '$lib/rizzo';
</script>

<Spinner />
<Spinner class="spinner--success spinner--lg" />`,

  kbd: `<script>
  import { Kbd } from '$lib/rizzo';
</script>

<p>Press <Kbd>Ctrl</Kbd>+<Kbd>K</Kbd> to open search.</p>`,

  label: `<script>
  import { Label } from '$lib/rizzo';
</script>

<Label for="email">Email</Label>
<input id="email" type="email" class="form-input" />`,

  empty: `<script>
  import { Empty } from '$lib/rizzo';
</script>

<Empty title="No items yet" description="Get started by adding your first item.">
  <button type="button" class="btn btn-primary">Add item</button>
</Empty>`,

  'aspect-ratio': `<script>
  import { AspectRatio } from '$lib/rizzo';
</script>

<AspectRatio ratio={16/9}>
  <img src="/poster.jpg" alt="" />
</AspectRatio>`,

  skeleton: `<script>
  import { Skeleton } from '$lib/rizzo';
</script>

<Skeleton />
<Skeleton variant="text" />`,

  avatar: `<script>
  import { Avatar } from '$lib/rizzo';
</script>

<Avatar name="Jane Doe" />
<Avatar src="/photo.jpg" alt="Jane" />`,

  'progress-bar': `<script>
  import { ProgressBar } from '$lib/rizzo';
</script>

<ProgressBar value={60} max={100} showLabel />`,

  breadcrumb: `<script>
  import { Breadcrumb } from '$lib/rizzo';
</script>

<Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'Docs', href: '/docs' }, { label: 'Current' }]} />`,

  forms: `<script>
  import { FormGroup, Input } from '$lib/rizzo';
</script>

<FormGroup label="Email" for="email">
  <Input id="email" type="email" placeholder="you@example.com" />
</FormGroup>`,

  'input-group': `<script>
  import { InputGroup } from '$lib/rizzo';
</script>

<InputGroup prefix="$" suffix="USD" placeholder="0.00" ariaLabel="Amount" />`,

  separator: `<script>
  import { Separator } from '$lib/rizzo';
</script>

<Separator />
<Separator orientation="vertical" />`,

  calendar: `<script>
  import { Calendar } from '$lib/rizzo';
</script>

<Calendar label="Choose a date" onSelect={(date) => console.log(date)} />`,

  'range-calendar': `<script>
  import { RangeCalendar } from '$lib/rizzo';
</script>

<RangeCalendar label="Choose date range" onRangeSelect={(start, end) => console.log(start, end)} />`,

  carousel: `<script>
  import { Carousel } from '$lib/rizzo';
</script>

<Carousel label="Slides">
  <div class="carousel__slide"><h4>Slide 1</h4><p>First slide content.</p></div>
  <div class="carousel__slide"><h4>Slide 2</h4><p>Second slide content.</p></div>
  <div class="carousel__slide"><h4>Slide 3</h4><p>Third slide content.</p></div>
</Carousel>`,

  chart: `<script>
  import { Chart } from '$lib/rizzo';
</script>

<Chart data={[{ label: 'A', value: 40 }, { label: 'B', value: 65 }, { label: 'C', value: 30 }]} />`,

  command: `<script>
  import { Command } from '$lib/rizzo';
</script>

<Command
  triggerLabel="Open command palette (⌘K)"
  searchPlaceholder="Search…"
  items={[{ id: 'new', label: 'New file', shortcut: '⌘N' }, { id: 'save', label: 'Save', shortcut: '⌘S' }]}
/>`,

  direction: `<script>
  import { Direction } from '$lib/rizzo';
</script>

<Direction dir="rtl">
  <p>Right-to-left content here.</p>
</Direction>`,

  'input-otp': `<script>
  import { InputOtp } from '$lib/rizzo';
</script>

<InputOtp length={6} ariaLabel="One-time code" />`,

  menubar: `<script>
  import { Menubar } from '$lib/rizzo';
</script>

<Menubar
  items={[
    { label: 'File', menu: [{ label: 'New', href: '#' }, { label: 'Open', href: '#' }] },
    { label: 'Edit', menu: [{ label: 'Undo', href: '#' }] },
  ]}
/>`,

  accordion: `<script>
  import { Accordion } from '$lib/rizzo';
</script>

<Accordion
  items={[
    { id: '1', title: 'Section 1', content: '<p>Content 1.</p>' },
    { id: '2', title: 'Section 2', content: '<p>Content 2.</p>' },
  ]}
  allowMultiple={false}
  defaultExpanded="1"
/>`,

  'alert-dialog': `<script>
  import { AlertDialog, Button } from '$lib/rizzo';
  let open = $state(false);
</script>

<Button variant="error" onclick={() => (open = true)}>Delete</Button>
<AlertDialog bind:open title="Delete item?" description="This action cannot be undone.">
  {#snippet actions()}
    <Button variant="outline" onclick={() => (open = false)}>Cancel</Button>
    <Button variant="error" onclick={() => (open = false)}>Delete</Button>
  {/snippet}
</AlertDialog>`,

  'back-to-top': `<script>
  import { BackToTop } from '$lib/rizzo';
</script>

<BackToTop threshold={400} label="Back to top" />`,

  cards: `<script>
  import { Card } from '$lib/rizzo';
</script>

<Card variant="elevated">
  <div class="card__body">
    <h3>Card title</h3>
    <p>Card content.</p>
  </div>
</Card>`,

  collapsible: `<script>
  import { Collapsible } from '$lib/rizzo';
</script>

<Collapsible triggerLabel="Show more" defaultOpen={false}>
  <p>Hidden content here.</p>
</Collapsible>`,

  'context-menu': `<script>
  import { ContextMenu } from '$lib/rizzo';
</script>

<ContextMenu triggerLabel="Right-click">
  <div class="context-menu__item">Edit</div>
  <div class="context-menu__separator" role="separator" />
  <div class="context-menu__item">Delete</div>
</ContextMenu>`,

  'copy-to-clipboard': `<script>
  import { CopyToClipboard } from '$lib/rizzo';
</script>

<CopyToClipboard value="npm install rizzo-css" label="Copy" />`,

  dashboard: `<script>
  import { Dashboard, Card } from '$lib/rizzo';
</script>

<Dashboard sidebarLabel="Dashboard navigation">
  <nav slot="sidebar" class="dashboard__nav">
    <a href="/dashboard" class="dashboard__nav-link dashboard__nav-link--active" aria-current="page">Dashboard</a>
    <a href="#" class="dashboard__nav-link">Items</a>
  </nav>
  <div class="dashboard-page">
    <header class="dashboard-page__header">
      <h1 class="dashboard-page__title">Dashboard</h1>
    </header>
    <section class="dashboard-page__stats">
      <Card class="dashboard-page__stat"><div class="card__body"><span class="card__label">Total</span><span class="card__value">1,234</span></div></Card>
    </section>
  </div>
</Dashboard>`,

  'docs-sidebar': `<script>
  import { DocsSidebar } from '$lib/rizzo';
</script>

<DocsSidebar currentPath={$page.url.pathname} pathPrefix="/docs" />`,

  dropdown: `<script>
  import { Dropdown } from '$lib/rizzo';
</script>

<Dropdown trigger="Actions" items={[
  { label: 'Edit' },
  { label: 'Duplicate' },
  { separator: true },
  { label: 'More', submenu: [{ label: 'Option A' }, { label: 'Option B' }] },
]} />`,

  footer: `<script>
  import { Footer } from '$lib/rizzo';
</script>

<Footer
  siteName="My App"
  year={new Date().getFullYear()}
  links={[{ href: '/docs', label: 'Docs' }, { href: '/privacy', label: 'Privacy' }]}
/>`,

  'font-switcher': `<script>
  import { FontSwitcher } from '$lib/rizzo';
</script>

<FontSwitcher label="Font" />`,

  'hover-card': `<script>
  import { HoverCard } from '$lib/rizzo';
</script>

<HoverCard triggerLabel="Hover me">
  <p>Hover card content.</p>
</HoverCard>`,

  icons: `<script>
  import { Gear } from '$lib/rizzo/icons';
  import Css3 from '$lib/rizzo/icons/devicons/Css3.svelte';
</script>

<p>Theme-aware: <Gear width={24} height={24} /></p>
<p>Devicon: <Css3 width={24} height={24} /></p>`,

  modal: `<script>
  import { Modal, Button } from '$lib/rizzo';
  let open = $state(false);
</script>

<Button onclick={() => (open = true)}>Open modal</Button>
<Modal bind:open title="Modal title">
  <p>Modal content.</p>
</Modal>`,

  navbar: `<script>
  import { Navbar, Settings } from '$lib/rizzo';
</script>

<!-- Navbar includes Search; add Settings so the gear button works. -->
<Navbar siteName="My App" />
<Settings />
<main>
  <!-- page content -->
</main>`,

  pagination: `<script>
  import { Pagination } from '$lib/rizzo';
</script>

<Pagination
  currentPage={2}
  totalPages={10}
  hrefTemplate="?page={page}"
  showFirstLast
  maxVisible={5}
/>`,

  popover: `<script>
  import { Popover, Button } from '$lib/rizzo';
  let open = $state(false);
</script>

<Popover bind:open>
  {#snippet trigger()}
    <Button>Open</Button>
  {/snippet}
  <p>Popover content.</p>
</Popover>`,

  resizable: `<script>
  import { ResizablePaneGroup, ResizablePane, ResizableHandle } from '$lib/rizzo';
</script>

<ResizablePaneGroup direction="horizontal">
  <ResizablePane defaultSize={50}>Left</ResizablePane>
  <ResizableHandle />
  <ResizablePane>Right</ResizablePane>
</ResizablePaneGroup>`,

  'scroll-area': `<script>
  import { ScrollArea } from '$lib/rizzo';
</script>

<ScrollArea orientation="vertical" style="max-height: 200px">
  <div>Scrollable content here.</div>
</ScrollArea>`,

  search: `<script>
  import { Search } from '$lib/rizzo';
</script>

<Search placeholder="Search…" />`,

  settings: `<script>
  import { Settings } from '$lib/rizzo';
</script>

<Settings triggerLabel="Settings" />`,

  sheet: `<script>
  import { Sheet, Button } from '$lib/rizzo';
  let open = $state(false);
</script>

<Button onclick={() => (open = true)}>Open sheet</Button>
<Sheet bind:open title="Panel" side="right">
  <p>Sheet content.</p>
</Sheet>`,

  slider: `<script>
  import { Slider } from '$lib/rizzo';
  let value = $state(50);
</script>

<Slider min={0} max={100} bind:value ariaLabel="Volume" />`,

  'sound-effects': `<script>
  import { SoundEffects } from '$lib/rizzo';
</script>

<SoundEffects label="Sound on click" />`,

  switch: `<script>
  import { Switch } from '$lib/rizzo';
  let checked = $state(false);
</script>

<Switch label="Enable notifications" bind:checked />`,

  table: `<script>
  import { Table } from '$lib/rizzo';
</script>

<Table
  columns={[
    { key: 'name', label: 'Name', sortable: true },
    { key: 'value', label: 'Value', sortable: true, type: 'number' },
  ]}
  data={[
    { name: 'Alpha', value: 10 },
    { name: 'Beta', value: 20 },
  ]}
  caption="Demo table"
  striped
/>`,

  tabs: `<script>
  import { Tabs } from '$lib/rizzo';
</script>

<Tabs tabs={[{ id: 'one', label: 'Tab One' }, { id: 'two', label: 'Tab Two' }]} defaultTab="one">
  {#snippet children(activeTabId)}
    <p>Content for {activeTabId}</p>
  {/snippet}
</Tabs>`,

  'theme-switcher': `<script>
  import { ThemeSwitcher } from '$lib/rizzo';
</script>

<ThemeSwitcher label="Theme" />`,

  toast: `<script>
  import { Toast } from '$lib/rizzo';
</script>

<Toast variant="info" position="top-right" dismissible>Saved!</Toast>`,

  toggle: `<script>
  import { Toggle } from '$lib/rizzo';
  let pressed = $state(false);
</script>

<Toggle bind:pressed aria-label="Toggle">Bold</Toggle>`,

  'toggle-group': `<script>
  import { ToggleGroup, Toggle } from '$lib/rizzo';
</script>

<ToggleGroup type="single" aria-label="Format">
  <Toggle pressed={false}>Left</Toggle>
  <Toggle pressed={true}>Center</Toggle>
  <Toggle pressed={false}>Right</Toggle>
</ToggleGroup>`,

  tooltip: `<script>
  import { Tooltip } from '$lib/rizzo';
</script>

<button type="button" aria-describedby="tt-1">Hover me</button>
<Tooltip id="tt-1" text="Tooltip text" position="top" />`,
};
