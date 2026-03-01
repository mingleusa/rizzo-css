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
<Button variant="success">Success</Button>
<Button variant="outline">Outline</Button>
<Button disabled>Disabled</Button>`,

  badge: `import { Badge } from './components/react';

<Badge>Default</Badge>
<Badge variant="primary">Primary</Badge>
<Badge variant="success">Success</Badge>
<Badge variant="warning" pill>Pill</Badge>`,

  'button-group': `import { ButtonGroup, Button } from './components/react';

<ButtonGroup>
  <Button>One</Button>
  <Button variant="primary">Two</Button>
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
<Spinner variant="success" size="lg" />
<Spinner label="Loading data…" />`,

  kbd: `import { Kbd } from './components/react';

<Kbd>Ctrl</Kbd> + <Kbd>K</Kbd>`,

  label: `import { Label } from './components/react';

<Label htmlFor="my-input">Email</Label>
<input id="my-input" type="email" />`,

  empty: `import { Empty } from './components/react';
import { Button } from './components/react';

<Empty
  title="No results"
  description="Try adjusting your search."
  action={<Button variant="primary">Clear filters</Button>}
/>`,

  'aspect-ratio': `import { AspectRatio } from './components/react';

<AspectRatio ratio={16 / 9}>
  <img src="/video-poster.jpg" alt="" />
</AspectRatio>`,

  skeleton: `import { Skeleton } from './components/react';

<Skeleton />
<Skeleton variant="text" />
<Skeleton variant="circle" />`,

  alert: `import { Alert } from './components/react';

<Alert variant="info">Information message.</Alert>
<Alert variant="success" dismissible onDismiss={() => {}}>Saved!</Alert>
<Alert variant="error">Something went wrong.</Alert>`,

  avatar: `import { Avatar } from './components/react';

<Avatar name="Jane Doe" />
<Avatar src="/avatar.jpg" alt="User" />
<Avatar initials="AB" size="lg" />`,

  cards: `import { Card } from './components/react';

<Card variant="elevated">
  <div className="card__body">
    <h3>Card title</h3>
    <p>Card content.</p>
  </div>
</Card>`,

  'progress-bar': `import { ProgressBar } from './components/react';

<ProgressBar value={60} max={100} showLabel />
<ProgressBar indeterminate label="Loading…" />`,

  breadcrumb: `import { Breadcrumb } from './components/react';

<Breadcrumb
  items={[
    { label: 'Home', href: '/' },
    { label: 'Docs', href: '/docs' },
    { label: 'Current' },
  ]}
  separator="chevron"
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

  switch: `import { Switch } from './components/react';

const [checked, setChecked] = useState(false);
<Switch
  label="Enable notifications"
  checked={checked}
  onCheckedChange={setChecked}
/>`,

  toggle: `import { Toggle } from './components/react';

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

  slider: `import { Slider } from './components/react';

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
<AlertDialog open={open} onOpenChange={setOpen} title="Delete item?" description="This cannot be undone."
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
  { label: 'Edit', onClick: (v) => {} },
  { label: 'Duplicate' },
  { separator: true },
  { label: 'More', submenu: [{ label: 'Option A' }, { label: 'Option B' }] },
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

<InputGroup prefix="$" suffix="USD" placeholder="0.00" />
<InputGroup prefix="https://" suffix=".com" placeholder="site" />`,

  'context-menu': `import { ContextMenu } from './components/react';

<ContextMenu trigger={<span>Right-click here</span>}>
  <div className="dropdown__item" role="menuitem">Copy</div>
  <div className="dropdown__item" role="menuitem">Paste</div>
</ContextMenu>`,

  navbar: `import { Navbar } from './components/react';

<Navbar siteName="My App">
  <Search id="nav-search" />
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

<DocsSidebar links={[
  { href: '/docs', label: 'Overview' },
  { href: '/docs/components', label: 'Components', active: true },
]} />`,

  dashboard: `import { Dashboard, DocsSidebar } from './components/react';

<Dashboard sidebar={<DocsSidebar links={[...]} />}>
  <p>Main content.</p>
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
