/**
 * Full-fledged live examples for React doc pages. Renders multiple variants and
 * real content so each component page shows a working design-system example,
 * not a single "demo" placeholder.
 */
import type { ReactNode } from 'react';
import { Button } from './Button';
import { Badge } from './Badge';
import { Alert } from './Alert';
import { Card } from './Card';
import { ProgressBar } from './ProgressBar';
import { Avatar } from './Avatar';
import { Skeleton } from './Skeleton';
import { Divider } from './Divider';
import { Kbd } from './Kbd';
import { Separator } from './Separator';
import { ButtonGroup } from './ButtonGroup';
import { Spinner } from './Spinner';
import { Empty } from './Empty';
import { Navbar } from './Navbar';
import { Search } from './Search';
import { Settings } from './Settings';
import { DocsSidebar } from './DocsSidebar';
import { Footer } from './Footer';
import { Breadcrumb } from './Breadcrumb';
import { Pagination } from './Pagination';
import { Accordion } from './Accordion';
import { Tabs } from './Tabs';
import { Table } from './Table';
import { BackToTop } from './BackToTop';
import { ResizablePaneGroup } from './ResizablePaneGroup';
import { ResizablePane } from './ResizablePane';
import { ResizableHandle } from './ResizableHandle';
import { Switch } from './Switch';
import { Toggle } from './Toggle';
import { ToggleGroup } from './ToggleGroup';
import { Label } from './Label';
import { Input } from './Input';
import { InputGroup } from './InputGroup';
import { Carousel } from './Carousel';
import { ScrollArea } from './ScrollArea';
import { AspectRatio } from './AspectRatio';
import { Calendar } from './Calendar';
import { RangeCalendar } from './RangeCalendar';
import { CopyToClipboard } from './CopyToClipboard';
import { Collapsible } from './Collapsible';
import { Tooltip } from './Tooltip';
import { Toast } from './Toast';
import { Chart } from './Chart';
import { Command } from './Command';
import { Direction } from './Direction';
import { InputOtp } from './InputOtp';
import { Menubar } from './Menubar';
import { getReactComponent, getDemoProps } from './registry';

const showcaseGrid = { display: 'flex', flexWrap: 'wrap', gap: 'var(--spacing-3)', alignItems: 'center' } as const;
const showcaseStack = { display: 'flex', flexDirection: 'column' as const, gap: 'var(--spacing-3)' };

export function ReactDocShowcase({ slug }: { slug: string }): ReactNode {
  // Button: same design as Astro — Default, Primary, Secondary, Success, Outline, Ghost, Small, Large
  if (slug === 'button') {
    return (
      <div style={showcaseStack}>
        <div style={showcaseGrid}>
          <Button>Default</Button>
          <Button variant="primary">Primary</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="success">Success</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="ghost">Ghost</Button>
        </div>
        <p style={{ margin: 0, fontSize: 'var(--font-size-sm)', color: 'var(--text-dim)' }}>
          Sizes:{' '}
          <Button variant="primary" className="btn--sm">Small</Button>
          {' '}
          <Button variant="primary" className="btn--lg">Large</Button>
        </p>
      </div>
    );
  }

  // Badge: same design as Astro/Vanilla/Svelte — Default, Primary, Success
  if (slug === 'badge') {
    return (
      <div style={showcaseGrid}>
        <Badge>Default</Badge>
        <Badge variant="primary">Primary</Badge>
        <Badge variant="success">Success</Badge>
      </div>
    );
  }

  // Alert: same design as Astro/Vanilla/Svelte — success + error dismissible
  if (slug === 'alert') {
    return (
      <div style={showcaseStack}>
        <Alert variant="success">Your changes have been saved.</Alert>
        <Alert variant="error" dismissible>An error occurred. Please try again.</Alert>
      </div>
    );
  }

  // Cards: same design as Astro — one elevated card "Card title" / "Card content."
  if (slug === 'cards') {
    return (
      <Card variant="elevated">
        <div className="card__body">
          <h3>Card title</h3>
          <p>Card content.</p>
        </div>
      </Card>
    );
  }

  // Progress bar: same design as Astro — one bar value 60, showLabel
  if (slug === 'progress-bar') {
    return <ProgressBar value={60} max={100} showLabel />;
  }

  // Avatar: same design as Astro — Jane Doe (initials) + src photo.jpg
  if (slug === 'avatar') {
    return (
      <div style={showcaseGrid}>
        <Avatar name="Jane Doe" />
        <Avatar src="/photo.jpg" alt="Jane" />
      </div>
    );
  }

  // Skeleton: same design as Astro — default + text variant
  if (slug === 'skeleton') {
    return (
      <div style={showcaseStack}>
        <Skeleton />
        <Skeleton variant="text" />
      </div>
    );
  }

  // Divider: horizontal, vertical, with label
  if (slug === 'divider') {
    return (
      <div style={showcaseStack}>
        <Divider orientation="horizontal" />
        <Divider orientation="horizontal" label="OR" />
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-3)', minHeight: 32 }}>
          <span>Left</span>
          <Divider orientation="vertical" />
          <span>Right</span>
        </div>
      </div>
    );
  }

  // Kbd: same design as Astro — Press Ctrl+K to open search
  if (slug === 'kbd') {
    return (
      <p style={{ margin: 0 }}>
        Press <Kbd>Ctrl</Kbd>+<Kbd>K</Kbd> to open search.
      </p>
    );
  }

  // Separator: horizontal and vertical
  if (slug === 'separator') {
    return (
      <div style={showcaseStack}>
        <Separator orientation="horizontal" />
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-3)' }}>
          <span>Section A</span>
          <Separator orientation="vertical" />
          <span>Section B</span>
        </div>
      </div>
    );
  }

  // Button group: same design as Astro/Vanilla/Svelte — horizontal group with One, Two, Three
  if (slug === 'button-group') {
    return (
      <div style={showcaseStack}>
        <ButtonGroup>
          <Button>One</Button>
          <Button>Two</Button>
          <Button>Three</Button>
        </ButtonGroup>
      </div>
    );
  }

  // Spinner: sizes and variants
  // Spinner: same design as Astro — one default, then success lg (matching code blocks)
  if (slug === 'spinner') {
    return (
      <div style={showcaseStack}>
        <Spinner />
        <Spinner variant="success" size="lg" />
      </div>
    );
  }

  // Empty: same design as Astro/Vanilla/Svelte — No items yet, Get started by adding your first item., Add item
  if (slug === 'empty') {
    return (
      <Empty
        title="No items yet"
        description="Get started by adding your first item."
        action={<Button variant="primary">Add item</Button>}
      />
    );
  }

  // Navbar: full-width demo with Search and Settings (same as Astro/Svelte)
  if (slug === 'navbar') {
    return (
      <div style={{ margin: '0 calc(-1 * var(--spacing-6))', border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)', overflow: 'hidden' }}>
        <Navbar siteName="Rizzo">
          <Search id="demo-nav-search" placeholder="Search…" />
          <button type="button" className="navbar__settings-btn" aria-label="Open settings">
            <span className="navbar__settings-label">Settings</span>
          </button>
        </Navbar>
      </div>
    );
  }

  // Docs Sidebar: grouped nav (Introduction, Foundations, Components) — same as Astro/Svelte/Vue/Vanilla
  if (slug === 'docs-sidebar') {
    return (
      <div className="docs-sidebar-demo" style={{ maxHeight: '18rem', overflow: 'auto', border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)', padding: 'var(--spacing-4)' }}>
        <DocsSidebar
          pathPrefix="/docs/react"
          currentPath="/docs/react/components/docs-sidebar"
        />
      </div>
    );
  }

  // Footer: same design as Astro — My App, Docs, Privacy
  if (slug === 'footer') {
    return (
      <Footer
        siteName="My App"
        year={new Date().getFullYear()}
        links={[{ href: '/docs', label: 'Docs' }, { href: '/privacy', label: 'Privacy' }]}
      />
    );
  }

  // Breadcrumb: same design as Astro — Home, Docs, Current
  if (slug === 'breadcrumb') {
    return (
      <Breadcrumb
        items={[
          { label: 'Home', href: '/' },
          { label: 'Docs', href: '/docs' },
          { label: 'Current' },
        ]}
      />
    );
  }

  // Pagination: same as Astro main demo — current 3, total 10, first/last
  if (slug === 'pagination') {
    return (
      <Pagination
        currentPage={3}
        totalPages={10}
        showFirstLast
        maxVisible={5}
      />
    );
  }

  // Accordion: same design as Astro — Section 1, Section 2, Content 1., Content 2.
  if (slug === 'accordion') {
    return (
      <Accordion
        items={[
          { id: '1', title: 'Section 1', content: '<p>Content 1.</p>' },
          { id: '2', title: 'Section 2', content: '<p>Content 2.</p>' },
        ]}
        allowMultiple={false}
        defaultExpanded="1"
      />
    );
  }

  // Tabs: same design as Astro — Tab One, Tab Two, content "Content for Tab One." etc
  if (slug === 'tabs') {
    return (
      <Tabs
        tabs={[
          { id: 'one', label: 'Tab One' },
          { id: 'two', label: 'Tab Two' },
        ]}
        defaultTab="one"
      >
        {(activeId) => <p>Content for {activeId}.</p>}
      </Tabs>
    );
  }

  // Table: same design as Astro — Name/Value, Alpha 10, Beta 20, caption "Demo table"
  if (slug === 'table') {
    return (
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
      />
    );
  }

  // Back to top: same design as Astro — threshold 400, label "Back to top"
  if (slug === 'back-to-top') {
    return <BackToTop threshold={400} label="Back to top" />;
  }

  // Switch: same as Astro — "Enable notifications"
  if (slug === 'switch') {
    return <Switch label="Enable notifications" />;
  }

  // Toggle: same as Astro — Bold + On (pressed)
  if (slug === 'toggle') {
    return (
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--spacing-2)' }}>
        <Toggle ariaLabel="Toggle bold">Bold</Toggle>
        <Toggle pressed ariaLabel="On">On</Toggle>
      </div>
    );
  }

  // Toggle group: same as Astro — Left, Center (pressed), Right
  if (slug === 'toggle-group') {
    return (
      <ToggleGroup type="single">
        <Toggle ariaLabel="Left">Left</Toggle>
        <Toggle pressed ariaLabel="Center">Center</Toggle>
        <Toggle ariaLabel="Right">Right</Toggle>
      </ToggleGroup>
    );
  }

  // Label: same design as Astro — Email + input id="email"
  if (slug === 'label') {
    return (
      <div className="form-group">
        <Label htmlFor="email">Email</Label>
        <Input id="email" type="email" className="form-input" placeholder="you@example.com" />
      </div>
    );
  }

  // Input group: same as Astro — Amount $ 0.00 USD
  if (slug === 'input-group') {
    return (
      <InputGroup
        placeholder="0.00"
        prefix="$"
        suffix="USD"
        aria-label="Amount"
      />
    );
  }

  // Carousel: same design as Astro — label "Slides", Slide 1/2/3
  if (slug === 'carousel') {
    return (
      <Carousel label="Slides">
        <div className="carousel__slide"><h4>Slide 1</h4><p>First slide content.</p></div>
        <div className="carousel__slide"><h4>Slide 2</h4><p>Second slide content.</p></div>
        <div className="carousel__slide"><h4>Slide 3</h4><p>Third slide content.</p></div>
      </Carousel>
    );
  }

  // Aspect ratio: same design as Astro — 16/9, img poster.jpg
  if (slug === 'aspect-ratio') {
    return (
      <AspectRatio ratio={16 / 9}>
        <img src="/poster.jpg" alt="" />
      </AspectRatio>
    );
  }

  // Scroll area: same design as Astro — vertical, max-height 200px, "Scrollable content here."
  if (slug === 'scroll-area') {
    return (
      <ScrollArea orientation="vertical" style={{ maxHeight: '200px' }}>
        <div>Scrollable content here.</div>
      </ScrollArea>
    );
  }

  // Calendar: same as Astro — label "Choose a date"
  if (slug === 'calendar') {
    return <Calendar label="Choose a date" />;
  }

  // Range calendar: same as Astro — label "Choose date range"
  if (slug === 'range-calendar') {
    return <RangeCalendar label="Choose date range" />;
  }

  // Toast: same design as Astro — info, top-right, dismissible, "Saved!"
  if (slug === 'toast') {
    return <Toast variant="info" position="top-right" dismissible>Saved!</Toast>;
  }

  // Collapsible: same design as Astro — "Show more", "Hidden content here."
  if (slug === 'collapsible') {
    return (
      <Collapsible triggerLabel="Show more" defaultOpen={false}>
        <p>Hidden content here.</p>
      </Collapsible>
    );
  }

  // Tooltip: same design as Astro — "Hover me" + "Tooltip text"
  if (slug === 'tooltip') {
    return (
      <div>
        <button type="button" aria-describedby="tt-1">Hover me</button>
        <Tooltip id="tt-1" text="Tooltip text" position="top" />
      </div>
    );
  }

  // Copy-to-clipboard: same design as Astro — value "npm install rizzo-css", label "Copy"
  if (slug === 'copy-to-clipboard') {
    return <CopyToClipboard value="npm install rizzo-css" label="Copy" />;
  }

  // Forms: same design as Astro — FormGroup Email, placeholder you@example.com
  if (slug === 'forms') {
    return (
      <div className="form-group">
        <Label htmlFor="email">Email</Label>
        <Input id="email" type="email" placeholder="you@example.com" />
      </div>
    );
  }

  // Resizable: same design as Astro — horizontal Left | Right
  if (slug === 'resizable') {
    return (
      <ResizablePaneGroup direction="horizontal" style={{ minHeight: '120px' }}>
        <ResizablePane defaultSize={50}>Left</ResizablePane>
        <ResizableHandle />
        <ResizablePane>Right</ResizablePane>
      </ResizablePaneGroup>
    );
  }

  if (slug === 'chart') {
    return (
      <Chart data={[{ label: 'A', value: 40 }, { label: 'B', value: 65 }, { label: 'C', value: 30 }, { label: 'D', value: 90 }]} />
    );
  }

  if (slug === 'command') {
    return (
      <Command
        triggerLabel="Open command palette (⌘K)"
        searchPlaceholder="Search…"
        items={[
          { id: 'new', label: 'New file', shortcut: '⌘N' },
          { id: 'save', label: 'Save', shortcut: '⌘S' },
          { id: 'search', label: 'Search', shortcut: '⌘K' },
        ]}
      />
    );
  }

  if (slug === 'direction') {
    return (
      <Direction dir="rtl">
        <p style={{ margin: 0 }}>Right-to-left content here.</p>
      </Direction>
    );
  }

  if (slug === 'input-otp') {
    return <InputOtp length={6} aria-label="One-time code" />;
  }

  if (slug === 'menubar') {
    return (
      <Menubar
        items={[
          { label: 'File', menu: [{ label: 'New', href: '#' }, { label: 'Open', href: '#' }, { label: 'Save', href: '#' }] },
          { label: 'Edit', menu: [{ label: 'Undo', href: '#' }, { label: 'Redo', href: '#' }] },
          { label: 'View', menu: [{ label: 'Zoom in', href: '#' }, { label: 'Zoom out', href: '#' }] },
        ]}
      />
    );
  }

  // No custom showcase: render the registered component with demo props (already a working example)
  const Component = getReactComponent(slug);
  const demoProps = getDemoProps(slug);
  const content = <Component {...demoProps} />;

  // Dashboard: wrap in dashboard-demo-wrap for consistent height with Astro/Vanilla/Svelte/Vue
  if (slug === 'dashboard') {
    return <div className="dashboard-demo-wrap">{content}</div>;
  }

  return content;
}

export default ReactDocShowcase;
