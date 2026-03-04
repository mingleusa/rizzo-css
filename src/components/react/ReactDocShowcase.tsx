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
import { getReactComponent, getDemoProps } from './registry';

const showcaseGrid = { display: 'flex', flexWrap: 'wrap', gap: 'var(--spacing-3)', alignItems: 'center' } as const;
const showcaseStack = { display: 'flex', flexDirection: 'column' as const, gap: 'var(--spacing-3)' };

export function ReactDocShowcase({ slug }: { slug: string }): ReactNode {
  // Button: full variant grid + sizes (matches Astro button page)
  if (slug === 'button') {
    return (
      <div style={showcaseStack}>
        <div style={showcaseGrid}>
          <Button>Default</Button>
          <Button variant="primary">Primary</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="success">Success</Button>
          <Button variant="warning">Warning</Button>
          <Button variant="error">Error</Button>
          <Button variant="info">Info</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="ghost">Ghost</Button>
        </div>
        <p style={{ margin: 0, fontSize: 'var(--font-size-sm)', color: 'var(--text-dim)' }}>
          Sizes:{' '}
          <Button variant="primary" className="btn--sm">Small</Button>
          {' '}
          <Button variant="primary">Default</Button>
          {' '}
          <Button variant="primary" className="btn--lg">Large</Button>
        </p>
        <div style={showcaseGrid}>
          <Button disabled>Disabled Default</Button>
          <Button variant="primary" disabled>Disabled Primary</Button>
        </div>
      </div>
    );
  }

  // Badge: all variants + pill + sizes
  if (slug === 'badge') {
    return (
      <div style={showcaseStack}>
        <div style={showcaseGrid}>
          <Badge variant="primary">Primary</Badge>
          <Badge variant="success">Success</Badge>
          <Badge variant="warning">Warning</Badge>
          <Badge variant="error">Error</Badge>
          <Badge variant="info">Info</Badge>
        </div>
        <div style={showcaseGrid}>
          <Badge variant="primary" pill>Pill</Badge>
          <Badge variant="success" size="sm">Small</Badge>
          <Badge variant="warning" size="md">Medium</Badge>
          <Badge variant="error" size="lg">Large</Badge>
        </div>
      </div>
    );
  }

  // Alert: all variants with real copy
  if (slug === 'alert') {
    return (
      <div style={showcaseStack}>
        <Alert variant="info">Your session will expire in 5 minutes. Save your work to avoid losing changes.</Alert>
        <Alert variant="success">Your profile has been updated successfully.</Alert>
        <Alert variant="warning">This action cannot be undone. Please confirm before proceeding.</Alert>
        <Alert variant="error">We couldn’t save your changes. Check your connection and try again.</Alert>
        <Alert variant="info" dismissible>Dismissible alert. Click the close button to remove.</Alert>
      </div>
    );
  }

  // Cards: multiple variants with real content
  if (slug === 'cards') {
    return (
      <div style={{ ...showcaseGrid, alignItems: 'stretch' }}>
        <Card variant="elevated">
          <div className="card__body">
            <h4 style={{ marginTop: 0 }}>Elevated card</h4>
            <p style={{ marginBottom: 0 }}>Use for primary content or calls to action.</p>
          </div>
        </Card>
        <Card variant="outlined">
          <div className="card__body">
            <h4 style={{ marginTop: 0 }}>Outlined card</h4>
            <p style={{ marginBottom: 0 }}>Subtle border for secondary content.</p>
          </div>
        </Card>
        <Card variant="filled">
          <div className="card__body">
            <h4 style={{ marginTop: 0 }}>Filled card</h4>
            <p style={{ marginBottom: 0 }}>Background tint for grouping.</p>
          </div>
        </Card>
      </div>
    );
  }

  // Progress bar: multiple variants and values
  if (slug === 'progress-bar') {
    return (
      <div style={showcaseStack}>
        <ProgressBar value={60} max={100} variant="primary" showLabel />
        <ProgressBar value={85} max={100} variant="success" showLabel />
        <ProgressBar value={30} max={100} variant="warning" showLabel />
        <ProgressBar value={15} max={100} variant="error" size="sm" showLabel />
      </div>
    );
  }

  // Avatar: sizes and with/without image placeholder
  if (slug === 'avatar') {
    return (
      <div style={showcaseGrid}>
        <Avatar name="Jane Doe" size="sm" />
        <Avatar name="Jane Doe" size="md" />
        <Avatar name="Jane Doe" size="lg" />
        <Avatar name="Alex Chen" size="md" />
        <Avatar initials="AB" size="md" />
      </div>
    );
  }

  // Skeleton: loading states
  if (slug === 'skeleton') {
    return (
      <div style={showcaseStack}>
        <div>
          <Skeleton variant="text" style={{ display: 'block', marginBottom: 'var(--spacing-2)' }} />
          <Skeleton variant="text" style={{ display: 'block', width: '75%' }} />
        </div>
        <div style={showcaseGrid}>
          <Skeleton variant="circle" style={{ width: 40, height: 40 }} />
          <Skeleton variant="rect" style={{ width: 120, height: 80 }} />
        </div>
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

  // Kbd: keyboard shortcuts
  if (slug === 'kbd') {
    return (
      <div style={showcaseGrid}>
        <Kbd>Ctrl</Kbd>
        <Kbd>Shift</Kbd>
        <Kbd>K</Kbd>
        <span>
          Press <Kbd>Ctrl</Kbd> + <Kbd>K</Kbd> to open search.
        </span>
      </div>
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

  // Button group: grouped buttons
  if (slug === 'button-group') {
    return (
      <div style={showcaseStack}>
        <ButtonGroup>
          <Button variant="primary">Save</Button>
          <Button variant="outline">Cancel</Button>
        </ButtonGroup>
        <ButtonGroup orientation="vertical">
          <Button>First</Button>
          <Button>Second</Button>
          <Button>Third</Button>
        </ButtonGroup>
      </div>
    );
  }

  // Spinner: sizes and variants
  if (slug === 'spinner') {
    return (
      <div style={showcaseStack}>
        <Spinner label="Loading…" />
        <div style={showcaseGrid}>
          <Spinner size="sm" variant="primary" label="Loading" />
          <Spinner size="md" variant="success" label="Loading" />
          <Spinner size="lg" variant="warning" label="Loading" />
        </div>
      </div>
    );
  }

  // Empty: full empty state with action
  if (slug === 'empty') {
    return (
      <Empty
        title="No items yet"
        description="Get started by adding your first item. You can edit or remove it anytime."
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

  // Footer: same as Astro/Svelte/Vue/Vanilla — Rizzo, Docs, Home
  if (slug === 'footer') {
    return (
      <Footer
        siteName="Rizzo"
        year={new Date().getFullYear()}
        links={[{ href: '/docs', label: 'Docs' }, { href: '/', label: 'Home' }]}
      />
    );
  }

  // Breadcrumb: same items as Astro — Home, Docs, Components, Breadcrumb (current)
  if (slug === 'breadcrumb') {
    return (
      <Breadcrumb
        items={[
          { label: 'Home', href: '/' },
          { label: 'Docs', href: '/docs' },
          { label: 'Components', href: '/docs/components' },
          { label: 'Breadcrumb' },
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

  // Accordion: same as Astro — Section one, two, three with content
  if (slug === 'accordion') {
    return (
      <Accordion
        items={[
          { id: 'one', title: 'Section one', content: '<p>Content for section one. Only one panel is open at a time.</p>' },
          { id: 'two', title: 'Section two', content: '<p>Content for section two.</p>' },
          { id: 'three', title: 'Section three', content: '<p>Content for section three.</p>' },
        ]}
      />
    );
  }

  // Tabs: same as Astro — Overview, Features, Pricing
  if (slug === 'tabs') {
    return (
      <Tabs
        tabs={[
          { id: 'overview', label: 'Overview', content: '<h4>Overview</h4><p>This is the overview content. It provides a general introduction to the topic.</p>' },
          { id: 'features', label: 'Features', content: '<h4>Features</h4><ul><li>Feature 1: Accessible design</li><li>Feature 2: Keyboard navigation</li><li>Feature 3: Theme-aware styling</li></ul>' },
          { id: 'pricing', label: 'Pricing', content: '<h4>Pricing</h4><p>Choose the plan that works best for you.</p>' },
        ]}
      />
    );
  }

  // Table: same as Astro — Sample data, Name/Role/Status, Alice/Bob/Carol
  if (slug === 'table') {
    return (
      <Table
        caption="Sample data"
        columns={[
          { key: 'name', label: 'Name' },
          { key: 'role', label: 'Role' },
          { key: 'status', label: 'Status' },
        ]}
        data={[
          { name: 'Alice', role: 'Developer', status: 'Active' },
          { name: 'Bob', role: 'Designer', status: 'Active' },
          { name: 'Carol', role: 'Manager', status: 'Away' },
        ]}
      />
    );
  }

  // Back to top: same as Astro live example — threshold 200
  if (slug === 'back-to-top') {
    return <BackToTop threshold={200} label="Back to top" />;
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

  // Label: same as Astro — Email (required) + Input
  if (slug === 'label') {
    const inputId = 'label-demo-input';
    return (
      <div className="form-group">
        <Label htmlFor={inputId} className="label--required">Email</Label>
        <Input id={inputId} type="email" placeholder="you@example.com" />
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

  // Carousel: same as Astro — "Example slides", 3 slides
  if (slug === 'carousel') {
    return (
      <Carousel label="Example slides">
        <div className="carousel__slide">
          <h4 style={{ marginTop: 0 }}>Slide 1</h4>
          <p>First slide content. Use previous/next or the indicators to navigate.</p>
        </div>
        <div className="carousel__slide">
          <h4 style={{ marginTop: 0 }}>Slide 2</h4>
          <p>Second slide content.</p>
        </div>
        <div className="carousel__slide">
          <h4 style={{ marginTop: 0 }}>Slide 3</h4>
          <p>Third slide content.</p>
        </div>
      </Carousel>
    );
  }

  // Aspect ratio: same as Astro — 16:9 with "16:9" placeholder
  if (slug === 'aspect-ratio') {
    return (
      <AspectRatio ratio={16 / 9}>
        <div style={{ background: 'var(--background-alt)', borderRadius: 'var(--radius)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-dim)' }}>
          16:9
        </div>
      </AspectRatio>
    );
  }

  // Scroll area: same as Astro — Tags list, 18rem × 12rem
  if (slug === 'scroll-area') {
    const tags = Array.from({ length: 20 }, (_, i) => `v1.2.0-beta.${20 - i}`);
    return (
      <ScrollArea
        style={{
          height: '18rem',
          width: '12rem',
          borderRadius: 'var(--radius-md)',
          border: 'var(--border-width) solid var(--border)',
        }}
      >
        <div style={{ padding: 'var(--spacing-4)' }}>
          <h4 style={{ margin: '0 0 var(--spacing-4) 0', fontSize: 'var(--font-size-sm)', fontWeight: 600 }}>Tags</h4>
          {tags.map((tag) => (
            <div key={tag} style={{ fontSize: 'var(--font-size-sm)', marginBottom: 'var(--spacing-2)' }}>{tag}</div>
          ))}
        </div>
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

  // Toast: same as Astro — trigger buttons (Success, Error, Warning, Info)
  if (slug === 'toast') {
    const trigger = (msg: string, opts?: { variant?: string }) => {
      if (typeof window !== 'undefined' && (window as unknown as { showToast?: (m: string, o?: object) => void }).showToast) {
        (window as unknown as { showToast: (m: string, o?: object) => void }).showToast(msg, opts);
      }
    };
    return (
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--spacing-3)' }}>
        <button type="button" className="btn btn-success" onClick={() => trigger('Success! Your changes have been saved.', { variant: 'success' })}>Show Success Toast</button>
        <button type="button" className="btn btn-error" onClick={() => trigger('Error! Something went wrong.', { variant: 'error' })}>Show Error Toast</button>
        <button type="button" className="btn btn-warning" onClick={() => trigger('Warning! Please review your changes.', { variant: 'warning' })}>Show Warning Toast</button>
        <button type="button" className="btn btn-info" onClick={() => trigger('Info: New features are available.', { variant: 'info' })}>Show Info Toast</button>
      </div>
    );
  }

  // Collapsible: same as Astro — "Show more" + panel content
  if (slug === 'collapsible') {
    return (
      <Collapsible triggerLabel="Show more" defaultOpen={false}>
        <p>This content is shown when the collapsible is expanded. Use <strong>Accordion</strong> when you need multiple sections.</p>
      </Collapsible>
    );
  }

  // Tooltip: same as Astro — "Hover me" + "This is a basic tooltip"
  if (slug === 'tooltip') {
    return (
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--spacing-4)', alignItems: 'center', padding: 'var(--spacing-8)' }}>
        <div className="tooltip-wrapper" aria-describedby="tooltip-basic">
          <button type="button" className="btn btn-primary">Hover me</button>
          <Tooltip id="tooltip-basic" text="This is a basic tooltip" position="top" />
        </div>
      </div>
    );
  }

  // Copy-to-clipboard: same as Astro — value example@email.com, format Email
  if (slug === 'copy-to-clipboard') {
    return (
      <div>
        <p style={{ marginBottom: 'var(--spacing-3)' }}>Click the button below to copy text:</p>
        <CopyToClipboard id="copy-example-email" value="example@email.com" format="Email" />
      </div>
    );
  }

  // Forms: same as Astro — FormGroup-style (Email Address, placeholder, help text)
  if (slug === 'forms') {
    const inputId = 'forms-demo-email';
    return (
      <div className="form-group">
        <Label htmlFor={inputId} className="label--required">Email Address</Label>
        <Input id={inputId} type="email" name="email" placeholder="you@example.com" />
        <p className="form-group__help">We'll never share your email</p>
      </div>
    );
  }

  // Resizable: same as Astro — horizontal (One/Two) + vertical (Header/Content)
  if (slug === 'resizable') {
    return (
      <div style={showcaseStack}>
        <ResizablePaneGroup direction="horizontal" style={{ minHeight: '200px', maxWidth: '28rem', borderRadius: 'var(--radius-lg)', border: 'var(--border-width) solid var(--border)' }}>
          <ResizablePane defaultSize={50}>
            <div style={{ display: 'flex', height: '200px', alignItems: 'center', justifyContent: 'center', padding: 'var(--spacing-6)' }}><span style={{ fontWeight: 600 }}>One</span></div>
          </ResizablePane>
          <ResizableHandle />
          <ResizablePane defaultSize={50}>
            <div style={{ display: 'flex', height: '200px', alignItems: 'center', justifyContent: 'center', padding: 'var(--spacing-6)' }}><span style={{ fontWeight: 600 }}>Two</span></div>
          </ResizablePane>
        </ResizablePaneGroup>
        <ResizablePaneGroup direction="vertical" style={{ minHeight: '200px', maxWidth: '28rem', borderRadius: 'var(--radius-lg)', border: 'var(--border-width) solid var(--border)' }}>
          <ResizablePane defaultSize={25}>
            <div style={{ display: 'flex', height: '100%', alignItems: 'center', justifyContent: 'center', padding: 'var(--spacing-6)' }}><span style={{ fontWeight: 600 }}>Header</span></div>
          </ResizablePane>
          <ResizableHandle />
          <ResizablePane defaultSize={75}>
            <div style={{ display: 'flex', height: '100%', alignItems: 'center', justifyContent: 'center', padding: 'var(--spacing-6)' }}><span style={{ fontWeight: 600 }}>Content</span></div>
          </ResizablePane>
        </ResizablePaneGroup>
      </div>
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
