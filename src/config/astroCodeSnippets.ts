/**
 * Astro code snippets for each component. Used by React/Vue doc pages
 * so FrameworkCodeTabs can show all five frameworks (Astro, Svelte, React, Vue, Vanilla).
 */
import { REACT_COMPONENT_SLUGS, slugToPascal } from './reactComponents';

export function getAstroCodeSnippet(slug: string): string {
  return ASTRO_CODE_SNIPPETS[slug] ?? getDefaultSnippet(slug);
}

function getDefaultSnippet(slug: string): string {
  const name = slugToPascal(slug);
  return `---
import ${name} from '../components/astro/${name}.astro';
---

<${name} />`;
}

const ASTRO_CODE_SNIPPETS: Record<string, string> = {
  button: `---
import Button from '../components/astro/Button.astro';
---

<Button>Default</Button>
<Button class="btn-primary">Primary</Button>
<Button class="btn-secondary">Secondary</Button>
<Button class="btn-success">Success</Button>
<Button class="btn-outline">Outline</Button>
<Button class="btn-ghost">Ghost</Button>
<Button class="btn-primary btn--sm">Small</Button>
<Button class="btn-primary btn--lg">Large</Button>`,

  alert: `---
import Alert from '../components/astro/Alert.astro';
---

<Alert variant="success">Your changes have been saved.</Alert>
<Alert variant="error" dismissible>An error occurred. Please try again.</Alert>`,

  badge: `---
import Badge from '../components/astro/Badge.astro';
---

<Badge>Default</Badge>
<Badge class="badge--primary">Primary</Badge>
<Badge class="badge--success">Success</Badge>`,

  'button-group': `---
import ButtonGroup from '../components/astro/ButtonGroup.astro';
---

<ButtonGroup>
  <button type="button" class="btn">One</button>
  <button type="button" class="btn btn-primary">Two</button>
  <button type="button" class="btn">Three</button>
</ButtonGroup>`,

  divider: `---
import Divider from '../components/astro/Divider.astro';
---

<Divider />
<Divider label="OR" />
<Divider orientation="vertical" />`,

  spinner: `---
import Spinner from '../components/astro/Spinner.astro';
---

<Spinner />
<Spinner class="spinner--success spinner--lg" />`,

  kbd: `---
import Kbd from '../components/astro/Kbd.astro';
---

<p>Press <Kbd>Ctrl</Kbd>+<Kbd>K</Kbd> to open search.</p>`,

  label: `---
import Label from '../components/astro/Label.astro';
---

<Label for="email">Email</Label>
<input id="email" type="email" class="form-input" />`,

  empty: `---
import Empty from '../components/astro/Empty.astro';
---

<Empty title="No results" description="Try adjusting your search." />`,

  'aspect-ratio': `---
import AspectRatio from '../components/astro/AspectRatio.astro';
---

<AspectRatio ratio="16/9">
  <img src="/poster.jpg" alt="" />
</AspectRatio>`,

  skeleton: `---
import Skeleton from '../components/astro/Skeleton.astro';
---

<Skeleton />
<Skeleton variant="text" />`,

  avatar: `---
import Avatar from '../components/astro/Avatar.astro';
---

<Avatar name="Jane Doe" />
<Avatar src="/photo.jpg" alt="Jane" />`,

  'progress-bar': `---
import ProgressBar from '../components/astro/ProgressBar.astro';
---

<ProgressBar value={60} max={100} showLabel />`,

  breadcrumb: `---
import Breadcrumb from '../components/astro/Breadcrumb.astro';
---

<Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'Docs', href: '/docs' }, { label: 'Current' }]} />`,

  forms: `---
import FormGroup from '../components/astro/FormGroup.astro';
import Input from '../components/astro/Input.astro';
---

<FormGroup label="Email" for="email">
  <Input id="email" type="email" placeholder="you@example.com" />
</FormGroup>`,

  'input-group': `---
import InputGroup from '../components/astro/InputGroup.astro';
---

<InputGroup prefix="$" suffix="USD" placeholder="0.00" ariaLabel="Amount" />`,

  separator: `---
import Separator from '../components/astro/Separator.astro';
---

<Separator />
<Separator orientation="vertical" />`,

  calendar: `---
import Calendar from '../components/astro/Calendar.astro';
---

<Calendar label="Choose a date" />`,

  'range-calendar': `---
import RangeCalendar from '../components/astro/RangeCalendar.astro';
---

<RangeCalendar label="Choose date range" client:load />
<!-- Listen for range-calendar-select: event.detail.start, event.detail.end (YYYY-MM-DD) -->`,

  carousel: `---
import Carousel from '../components/astro/Carousel.astro';
---

<Carousel label="Slides">
  <div class="carousel__slide"><h4>Slide 1</h4><p>First slide content.</p></div>
  <div class="carousel__slide"><h4>Slide 2</h4><p>Second slide content.</p></div>
  <div class="carousel__slide"><h4>Slide 3</h4><p>Third slide content.</p></div>
</Carousel>`,

  accordion: `---
import Accordion from '../components/astro/Accordion.astro';
---

<Accordion
  items={[
    { id: '1', title: 'Section 1', content: '<p>Content 1.</p>' },
    { id: '2', title: 'Section 2', content: '<p>Content 2.</p>' },
  ]}
  allowMultiple={false}
  defaultExpanded="1"
/>`,

  'alert-dialog': `---
import AlertDialog from '../components/astro/AlertDialog.astro';
---

<AlertDialog id="alert-demo" title="Delete item?" description="This action cannot be undone.">
  <button type="button" slot="actions" class="btn" data-alert-dialog-close>Cancel</button>
  <button type="button" slot="actions" class="btn btn-error" data-alert-dialog-close>Delete</button>
</AlertDialog>
<button type="button" class="btn" onclick="window.openAlertDialog_alert_demo()">Open</button>`,

  'back-to-top': `---
import BackToTop from '../components/astro/BackToTop.astro';
---

<BackToTop threshold={400} label="Back to top" client:load />`,

  cards: `---
import Card from '../components/astro/Card.astro';
---

<Card variant="elevated">
  <div class="card__body">
    <h3>Card title</h3>
    <p>Card content.</p>
  </div>
</Card>`,

  collapsible: `---
import Collapsible from '../components/astro/Collapsible.astro';
---

<Collapsible triggerLabel="Show more" defaultOpen={false}>
  <p>Hidden content here.</p>
</Collapsible>`,

  'context-menu': `---
import ContextMenu from '../components/astro/ContextMenu.astro';
---

<ContextMenu triggerLabel="Right-click" client:load>
  <div class="context-menu__item">Edit</div>
  <div class="context-menu__separator" role="separator" />
  <div class="context-menu__item">Delete</div>
</ContextMenu>`,

  'copy-to-clipboard': `---
import CopyToClipboard from '../components/astro/CopyToClipboard.astro';
---

<CopyToClipboard value="npm install rizzo-css" label="Copy" />`,

  dashboard: `---
import Dashboard from '../components/astro/Dashboard.astro';
import Card from '../components/astro/Card.astro';
---

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

  'docs-sidebar': `---
import DocsSidebar from '../components/DocsSidebar.astro';
import { getFrameworkFromPath } from '../config/frameworks';

const currentPath = Astro.url.pathname;
const { framework } = getFrameworkFromPath(currentPath);
---

<DocsSidebar currentPath={currentPath} framework={framework} />`,

  dropdown: `---
import Dropdown from '../components/astro/Dropdown.astro';
---

<Dropdown trigger="Actions" client:load>
  <a href="#" class="dropdown__item">Edit</a>
  <a href="#" class="dropdown__item">Duplicate</a>
  <div class="dropdown__separator" role="separator" />
  <a href="#" class="dropdown__item">More</a>
</Dropdown>`,

  footer: `---
import Footer from '../components/astro/Footer.astro';
---

<Footer
  siteName="My App"
  year={new Date().getFullYear()}
  links={[{ href: '/docs', label: 'Docs' }, { href: '/privacy', label: 'Privacy' }]}
/>`,

  'font-switcher': `---
import FontSwitcher from '../components/astro/FontSwitcher.astro';
---

<FontSwitcher label="Font" client:load />`,

  'hover-card': `---
import HoverCard from '../components/astro/HoverCard.astro';
---

<HoverCard triggerLabel="Hover me" client:load>
  <p>Hover card content.</p>
</HoverCard>`,

  icons: `---
import Gear from '../components/icons/Gear.astro';
import Css3 from '../components/icons/devicons/Css3.astro';
---

<p>Theme-aware (currentColor): <Gear width={24} height={24} /></p>
<p>Devicon: <Css3 width={24} height={24} /></p>`,

  modal: `---
import Modal from '../components/astro/Modal.astro';
---

<Modal id="demo-modal" title="Modal title" triggerLabel="Open modal" client:load>
  <p>Modal content.</p>
</Modal>`,

  navbar: `---
import Navbar from '../components/astro/Navbar.astro';
import Settings from '../components/astro/Settings.astro';
---

<!-- Navbar includes Search; add Settings so the gear button works. -->
<Navbar siteName="My App" />
<Settings />
<main>
  <!-- page content -->
</main>`,

  pagination: `---
import Pagination from '../components/astro/Pagination.astro';
---

<Pagination
  currentPage={2}
  totalPages={10}
  hrefTemplate="?page={page}"
  showFirstLast
  maxVisible={5}
/>`,

  popover: `---
import Popover from '../components/astro/Popover.astro';
---

<Popover triggerLabel="Open" client:load>
  <p>Popover content.</p>
</Popover>`,

  resizable: `---
import ResizablePaneGroup from '../components/astro/ResizablePaneGroup.astro';
import ResizablePane from '../components/astro/ResizablePane.astro';
import ResizableHandle from '../components/astro/ResizableHandle.astro';
---

<ResizablePaneGroup direction="horizontal">
  <ResizablePane defaultSize={50}>Left</ResizablePane>
  <ResizableHandle />
  <ResizablePane>Right</ResizablePane>
</ResizablePaneGroup>`,

  'scroll-area': `---
import ScrollArea from '../components/astro/ScrollArea.astro';
---

<ScrollArea orientation="vertical" style="max-height: 200px">
  <div>Scrollable content here.</div>
</ScrollArea>`,

  search: `---
import Search from '../components/astro/Search.astro';
---

<Search placeholder="Search…" client:load />`,

  settings: `---
import Settings from '../components/astro/Settings.astro';
---

<Settings triggerLabel="Settings" client:load />`,

  sheet: `---
import Sheet from '../components/astro/Sheet.astro';
---

<Sheet id="demo-sheet" title="Panel" side="right" triggerLabel="Open sheet" client:load>
  <p>Sheet content.</p>
</Sheet>`,

  slider: `---
import Slider from '../components/astro/Slider.astro';
---

<Slider min={0} max={100} value={50} ariaLabel="Volume" client:load />`,

  'sound-effects': `---
import SoundEffects from '../components/astro/SoundEffects.astro';
---

<SoundEffects label="Sound on click" client:load />`,

  switch: `---
import Switch from '../components/astro/Switch.astro';
---

<Switch label="Enable notifications" client:load />`,

  table: `---
import Table from '../components/astro/Table.astro';
---

<Table
  columns={[{ key: 'name', label: 'Name', sortable: true }, { key: 'value', label: 'Value', sortable: true, type: 'number' }]}
  data={[{ name: 'Alpha', value: 10 }, { name: 'Beta', value: 20 }]}
  caption="Demo table"
  striped
/>`,

  tabs: `---
import Tabs from '../components/astro/Tabs.astro';
---

<Tabs tabs={[{ id: 'one', label: 'Tab One' }, { id: 'two', label: 'Tab Two' }]} defaultTab="one">
  <div slot="one"><p>Content for Tab One.</p></div>
  <div slot="two"><p>Content for Tab Two.</p></div>
</Tabs>`,

  'theme-switcher': `---
import ThemeSwitcher from '../components/astro/ThemeSwitcher.astro';
---

<ThemeSwitcher label="Theme" client:load />`,

  toast: `---
import Toast from '../components/astro/Toast.astro';
---

<Toast variant="info" position="top-right" dismissible client:load>Saved!</Toast>`,

  toggle: `---
import Toggle from '../components/astro/Toggle.astro';
---

<Toggle aria-label="Toggle" pressed={false} client:load>Bold</Toggle>`,

  'toggle-group': `---
import ToggleGroup from '../components/astro/ToggleGroup.astro';
---

<ToggleGroup type="single" aria-label="Format">
  <button type="button" class="btn" aria-pressed="false">Left</button>
  <button type="button" class="btn" aria-pressed="true">Center</button>
  <button type="button" class="btn" aria-pressed="false">Right</button>
</ToggleGroup>`,

  tooltip: `---
import Tooltip from '../components/astro/Tooltip.astro';
---

<button type="button" aria-describedby="tt-1">Hover me</button>
<Tooltip id="tt-1" text="Tooltip text" position="top" />`,
};
