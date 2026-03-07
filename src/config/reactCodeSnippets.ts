/**
 * React (TSX) code snippets for each component doc page.
 * Used by /docs/react/[...slug].astro with FrameworkCodeTabs (defaultTab="react").
 */
import { REACT_COMPONENT_SLUGS } from './reactComponents';

export function getReactCodeSnippet(slug: string): string {
  return REACT_CODE_SNIPPETS[slug] ?? getDefaultSnippet(slug);
}

function getDefaultSnippet(slug: string): string {
  const name = slug.split('-').map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join('');
  return `import { ${name} } from './components/react';

<${name} />`;
}

const REACT_CODE_SNIPPETS: Record<string, string> = {
  button: `import { Button } from './components/react';

<Button>Default</Button>
<Button variant="primary">Primary</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="success">Success</Button>
<Button variant="outline">Outline</Button>
<Button variant="ghost">Ghost</Button>
<Button variant="primary" className="btn--sm">Small</Button>
<Button variant="primary" className="btn--lg">Large</Button>`,

  badge: `import { Badge } from './components/react';

<Badge>Default</Badge>
<Badge variant="primary">Primary</Badge>
<Badge variant="success">Success</Badge>`,

  'button-group': `import { ButtonGroup, Button } from './components/react';

<ButtonGroup>
  <Button>One</Button>
  <Button>Two</Button>
  <Button>Three</Button>
</ButtonGroup>`,

  divider: `import { Divider } from './components/react';

<Divider />
<Divider label="OR" />
<Divider orientation="vertical" />`,

  separator: `import { Separator } from './components/react';

<Separator />
<Separator orientation="vertical" />`,

  spinner: `import { Spinner } from './components/react';

<Spinner />
<Spinner variant="success" size="lg" />`,

  kbd: `import { Kbd } from './components/react';

<p>Press <Kbd>Ctrl</Kbd>+<Kbd>K</Kbd> to open search.</p>`,

  label: `import { Label } from './components/react';

<Label htmlFor="email">Email</Label>
<input id="email" type="email" className="form-input" placeholder="you@example.com" />`,

  empty: `import { Empty } from './components/react';
import { Button } from './components/react';

<Empty
  title="No items yet"
  description="Get started by adding your first item."
  action={<Button variant="primary">Add item</Button>}
/>`,

  'aspect-ratio': `import { AspectRatio } from './components/react';

<AspectRatio ratio={16 / 9}>
  <img src="/poster.jpg" alt="" />
</AspectRatio>`,

  skeleton: `import { Skeleton } from './components/react';

<Skeleton />
<Skeleton variant="text" />`,

  alert: `import { Alert } from './components/react';

<Alert variant="success">Your changes have been saved.</Alert>
<Alert variant="error" dismissible>An error occurred. Please try again.</Alert>`,

  avatar: `import { Avatar } from './components/react';

<Avatar name="Jane Doe" />
<Avatar src="/photo.jpg" alt="Jane" />`,

  cards: `import { Card } from './components/react';

<Card variant="elevated">
  <div className="card__body">
    <h3>Card title</h3>
    <p>Card content.</p>
  </div>
</Card>`,

  'progress-bar': `import { ProgressBar } from './components/react';

<ProgressBar value={60} max={100} showLabel />`,

  breadcrumb: `import { Breadcrumb } from './components/react';

<Breadcrumb
  items={[
    { label: 'Home', href: '/' },
    { label: 'Docs', href: '/docs' },
    { label: 'Current' },
  ]}
/>`,

  'back-to-top': `import { BackToTop } from './components/react';

<BackToTop threshold={400} label="Back to top" />`,

  footer: `import { Footer } from './components/react';

<Footer
  siteName="My App"
  year={new Date().getFullYear()}
  links={[
    { href: '/docs', label: 'Docs' },
    { href: '/privacy', label: 'Privacy' },
  ]}
/>`,

  switch: `import { useState } from 'react';
import { Switch } from './components/react';

const [checked, setChecked] = useState(false);
<Switch
  label="Enable notifications"
  checked={checked}
  onCheckedChange={setChecked}
/>`,

  toggle: `import { useState } from 'react';
import { Toggle } from './components/react';

const [pressed, setPressed] = useState(false);
<Toggle pressed={pressed} onPressedChange={setPressed} aria-label="Toggle">
  Bold
</Toggle>`,

  'toggle-group': `import { ToggleGroup, Toggle } from './components/react';

<ToggleGroup type="single" aria-label="Format">
  <Toggle pressed={false}>Left</Toggle>
  <Toggle pressed={true}>Center</Toggle>
  <Toggle pressed={false}>Right</Toggle>
</ToggleGroup>`,

  pagination: `import { Pagination } from './components/react';

<Pagination
  currentPage={2}
  totalPages={10}
  hrefTemplate="?page={page}"
  showFirstLast
  maxVisible={5}
/>`,

  tabs: `import { Tabs } from './components/react';

<Tabs
  tabs={[
    { id: 'one', label: 'Tab One' },
    { id: 'two', label: 'Tab Two' },
  ]}
  defaultTab="one"
>
  {(activeId) => <p>Content for {activeId}</p>}
</Tabs>`,

  accordion: `import { Accordion } from './components/react';

<Accordion
  items={[
    { id: '1', title: 'Section 1', content: '<p>Content 1.</p>' },
    { id: '2', title: 'Section 2', content: '<p>Content 2.</p>' },
  ]}
  allowMultiple={false}
  defaultExpanded="1"
/>`,

  slider: `import { useState } from 'react';
import { Slider } from './components/react';

const [value, setValue] = useState(50);
<Slider
  min={0}
  max={100}
  value={value}
  onValueChange={setValue}
  ariaLabel="Volume"
/>`,

  forms: `import { Input, Label } from './components/react';

<Label htmlFor="email">Email</Label>
<Input id="email" type="email" placeholder="you@example.com" />`,

  'copy-to-clipboard': `import { CopyToClipboard } from './components/react';

<CopyToClipboard value="npm install rizzo-css" label="Copy" />`,

  tooltip: `import { Tooltip } from './components/react';

<button type="button" aria-describedby="tt-1">Hover me</button>
<Tooltip id="tt-1" text="Tooltip text" position="top" />`,

  calendar: `import { Calendar } from './components/react';

<Calendar label="Choose a date" onSelect={(date) => console.log(date)} />`,

  'range-calendar': `import { RangeCalendar } from './components/react';

<RangeCalendar label="Choose date range" onRangeSelect={(start, end) => console.log(start, end)} />`,

  carousel: `import { Carousel } from './components/react';

<Carousel label="Slides">
  <div className="carousel__slide"><h4>Slide 1</h4><p>First slide content.</p></div>
  <div className="carousel__slide"><h4>Slide 2</h4><p>Second slide content.</p></div>
  <div className="carousel__slide"><h4>Slide 3</h4><p>Third slide content.</p></div>
</Carousel>`,

  chart: `import { Chart } from './components/react';

<Chart data={[{ label: 'A', value: 40 }, { label: 'B', value: 65 }, { label: 'C', value: 30 }]} />`,

  command: `import { Command } from './components/react';

<Command
  triggerLabel="Open command palette (⌘K)"
  searchPlaceholder="Search…"
  items={[{ id: 'new', label: 'New file', shortcut: '⌘N' }, { id: 'save', label: 'Save', shortcut: '⌘S' }]}
/>`,

  direction: `import { Direction } from './components/react';

<Direction dir="rtl">
  <p>Right-to-left content here.</p>
</Direction>`,

  'input-otp': `import { InputOtp } from './components/react';

<InputOtp length={6} ariaLabel="One-time code" />`,

  menubar: `import { Menubar } from './components/react';

<Menubar
  items={[
    { label: 'File', menu: [{ label: 'New', href: '#' }, { label: 'Open', href: '#' }] },
    { label: 'Edit', menu: [{ label: 'Undo', href: '#' }] },
  ]}
/>`,

  collapsible: `import { Collapsible } from './components/react';

<Collapsible triggerLabel="Show more" defaultOpen={false}>
  <p>Hidden content here.</p>
</Collapsible>`,

  table: `import { Table } from './components/react';

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

  modal: `import { useState } from 'react';
import { Modal, Button } from './components/react';

const [open, setOpen] = useState(false);
<Button onClick={() => setOpen(true)}>Open modal</Button>
<Modal open={open} onOpenChange={setOpen} title="Modal title">
  <p>Modal content.</p>
</Modal>`,

  'alert-dialog': `import { useState } from 'react';
import { AlertDialog, Button } from './components/react';

const [open, setOpen] = useState(false);
<Button variant="error" onClick={() => setOpen(true)}>Delete</Button>
<AlertDialog open={open} onOpenChange={setOpen} title="Delete item?" description="This action cannot be undone."
  actions={<><Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button><Button variant="error" onClick={() => setOpen(false)}>Delete</Button></>}
/>`,

  toast: `import { Toast } from './components/react';

<Toast variant="info" position="top-right" dismissible>Saved!</Toast>`,

  sheet: `import { useState } from 'react';
import { Sheet, Button } from './components/react';

const [open, setOpen] = useState(false);
<Button onClick={() => setOpen(true)}>Open sheet</Button>
<Sheet open={open} onOpenChange={setOpen} title="Panel" side="right">
  <p>Sheet content.</p>
</Sheet>`,

  'scroll-area': `import { ScrollArea } from './components/react';

<ScrollArea orientation="vertical" style={{ maxHeight: '200px' }}>
  <div>Scrollable content here.</div>
</ScrollArea>`,

  dropdown: `import { Dropdown } from './components/react';

<Dropdown trigger="Actions" items={[
  { label: 'Edit', href: '#' },
  { label: 'Duplicate', href: '#' },
  { separator: true },
  { label: 'More', href: '#' },
]} />`,

  popover: `import { useState } from 'react';
import { Popover, Button } from './components/react';

const [open, setOpen] = useState(false);
<Popover open={open} onOpenChange={setOpen} trigger={<Button>Open</Button>}>
  <p>Popover content.</p>
</Popover>`,

  resizable: `import { ResizablePaneGroup, ResizablePane, ResizableHandle } from './components/react';

<ResizablePaneGroup direction="horizontal">
  <ResizablePane defaultSize={50}>Left</ResizablePane>
  <ResizableHandle />
  <ResizablePane defaultSize={50}>Right</ResizablePane>
</ResizablePaneGroup>`,

  'hover-card': `import { useState } from 'react';
import { HoverCard, Button } from './components/react';

const [open, setOpen] = useState(false);
<HoverCard open={open} onOpenChange={setOpen} trigger={<Button variant="outline">Hover me</Button>}>
  <p>Hover card content.</p>
</HoverCard>`,

  'input-group': `import { InputGroup } from './components/react';

<InputGroup prefix="$" suffix="USD" placeholder="0.00" ariaLabel="Amount" />`,

  'context-menu': `import { ContextMenu } from './components/react';

<ContextMenu trigger={<span>Right-click</span>}>
  <div className="context-menu__item">Edit</div>
  <div className="context-menu__separator" role="separator" />
  <div className="context-menu__item">Delete</div>
</ContextMenu>`,

  navbar: `import { Navbar, Search } from './components/react';

<Navbar siteName="My App">
  <Search id="nav-search" placeholder="Search…" />
  <button type="button" className="navbar__settings-btn" aria-label="Open settings" onClick={() => window.openSettings?.()}>
    <svg className="navbar__settings-icon icon" width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/><circle cx="12" cy="12" r="3"/></svg>
    <span className="navbar__settings-label">Settings</span>
  </button>
</Navbar>`,

  search: `import { Search } from './components/react';

<Search id="search-1" placeholder="Search…" />`,

  settings: `import { useState } from 'react';
import { Settings, Button } from './components/react';

const [open, setOpen] = useState(false);
<Button onClick={() => setOpen(true)}>Settings</Button>
<Settings open={open} onOpenChange={setOpen} title="Settings">
  <p>Theme, font, options.</p>
</Settings>`,

  'theme-switcher': `import { ThemeSwitcher } from './components/react';

<ThemeSwitcher themes={[
  { value: 'github-dark-classic', label: 'Dark' },
  { value: 'github-light', label: 'Light' },
  { value: 'system', label: 'System' },
]} />`,

  'font-switcher': `import { FontSwitcher } from './components/react';

<FontSwitcher fonts={[
  { id: 'system', label: 'System' },
  { id: 'sans-mono', label: 'Sans + Mono' },
]} />`,

  'sound-effects': `import { SoundEffects } from './components/react';

<SoundEffects />`,

  'docs-sidebar': `import { DocsSidebar } from './components/react';

<DocsSidebar
  pathPrefix="/docs/react"
  currentPath={pathname}
/>`,

  dashboard: `import { Dashboard } from './components/react';

<Dashboard
  sidebarLabel="Dashboard navigation"
  sidebar={
    <nav className="dashboard__nav">
      <a href="/dashboard" className="dashboard__nav-link dashboard__nav-link--active" aria-current="page">Dashboard</a>
      <a href="/items" className="dashboard__nav-link">Items</a>
      <a href="/settings" className="dashboard__nav-link">Settings</a>
    </nav>
  }
>
  <div>
    <h3>Main content</h3>
    <p>Put your page content here. Combine with Card, Table, and other Rizzo components.</p>
  </div>
</Dashboard>`,

  icons: `import { Icons } from './components/react';

<Icons />`,
};

// Ensure we have an entry for every slug so docs always get a snippet
export function getAllReactCodeSnippets(): Record<string, string> {
  const out: Record<string, string> = {};
  for (const slug of REACT_COMPONENT_SLUGS) {
    out[slug] = REACT_CODE_SNIPPETS[slug] ?? getDefaultSnippet(slug);
  }
  return out;
}
