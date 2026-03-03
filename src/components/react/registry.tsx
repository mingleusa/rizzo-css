/**
 * Maps component slug to React component for docs. Used by /docs/react/[...slug].
 * Add new components here and to the exports in index.ts.
 */
import type { ComponentType } from 'react';
import { getReactComponentMeta, type ReactComponentSlug } from '../../config/reactComponents';
import { Button } from './Button';
import { Badge } from './Badge';
import { Divider } from './Divider';
import { Spinner } from './Spinner';
import { Kbd } from './Kbd';
import { Label } from './Label';
import { Separator } from './Separator';
import { Empty } from './Empty';
import { AspectRatio } from './AspectRatio';
import { Skeleton } from './Skeleton';
import { Alert } from './Alert';
import { Avatar } from './Avatar';
import { Card } from './Card';
import { Calendar } from './Calendar';
import { CarouselDemo } from './CarouselDemo';
import { ProgressBar } from './ProgressBar';
import { Breadcrumb } from './Breadcrumb';
import { ButtonGroup } from './ButtonGroup';
import { BackToTop } from './BackToTop';
import { Footer } from './Footer';
import { SwitchDemo } from './SwitchDemo';
import { ToggleDemo } from './ToggleDemo';
import { ToggleGroup } from './ToggleGroup';
import { Pagination } from './Pagination';
import { Tabs } from './Tabs';
import { Accordion } from './Accordion';
import { SliderDemo } from './SliderDemo';
import { Input } from './Input';
import { InputGroup } from './InputGroup';
import { CopyToClipboard } from './CopyToClipboard';
import { TooltipDemo } from './TooltipDemo';
import { CollapsibleDemo } from './CollapsibleDemo';
import { Table } from './Table';
import { ModalDemo } from './ModalDemo';
import { AlertDialogDemo } from './AlertDialogDemo';
import { ToastDemo } from './ToastDemo';
import { SheetDemo } from './SheetDemo';
import { ScrollAreaDemo } from './ScrollAreaDemo';
import { DropdownDemo } from './DropdownDemo';
import { PopoverDemo } from './PopoverDemo';
import { ResizableDemo } from './ResizableDemo';
import { HoverCardDemo } from './HoverCardDemo';
import { ContextMenuDemo } from './ContextMenuDemo';
import { Navbar } from './Navbar';
import { Search } from './Search';
import { SettingsDemo } from './SettingsDemo';
import { ThemeSwitcher } from './ThemeSwitcher';
import { FontSwitcher } from './FontSwitcher';
import { SoundEffects } from './SoundEffects';
import { DocsSidebar } from './DocsSidebar';
import { DashboardDemo } from './DashboardDemo';
import { Icons } from './Icons';
import { Placeholder } from './Placeholder';

const HAS_COMPONENT: Record<string, ComponentType<any>> = {
  button: Button,
  badge: Badge,
  divider: Divider,
  spinner: Spinner,
  kbd: Kbd,
  label: Label,
  separator: Separator,
  empty: Empty,
  'aspect-ratio': AspectRatio,
  skeleton: Skeleton,
  alert: Alert,
  avatar: Avatar,
  cards: Card,
  calendar: Calendar,
  carousel: CarouselDemo,
  'progress-bar': ProgressBar,
  breadcrumb: Breadcrumb,
  'button-group': ButtonGroup,
  'back-to-top': BackToTop,
  footer: Footer,
  switch: SwitchDemo,
  toggle: ToggleDemo,
  'toggle-group': ToggleGroup,
  pagination: Pagination,
  tabs: Tabs,
  accordion: Accordion,
  slider: SliderDemo,
  forms: Input,
  'input-group': InputGroup,
  'copy-to-clipboard': CopyToClipboard,
  tooltip: TooltipDemo,
  collapsible: CollapsibleDemo,
  table: Table,
  modal: ModalDemo,
  'alert-dialog': AlertDialogDemo,
  toast: ToastDemo,
  sheet: SheetDemo,
  'scroll-area': ScrollAreaDemo,
  dropdown: DropdownDemo,
  popover: PopoverDemo,
  resizable: ResizableDemo,
  'hover-card': HoverCardDemo,
  'context-menu': ContextMenuDemo,
  navbar: Navbar,
  search: Search,
  settings: SettingsDemo,
  'theme-switcher': ThemeSwitcher,
  'font-switcher': FontSwitcher,
  'sound-effects': SoundEffects,
  'docs-sidebar': DocsSidebar,
  dashboard: DashboardDemo,
  icons: Icons,
};

function PlaceholderFor(slug: string): ComponentType {
  const meta = getReactComponentMeta(slug as ReactComponentSlug);
  return () => <Placeholder slug={slug} title={meta.title} description={meta.description} />;
}

/** Default props for doc demo when component is rendered with no props. */
const DEMO_PROPS: Record<string, Record<string, unknown>> = {
  button: { children: 'Default' },
  alert: { variant: 'info', children: 'Information message.' },
  'progress-bar': { value: 60, max: 100, showLabel: true },
  avatar: { name: 'Jane Doe' },
  skeleton: {},
  'back-to-top': { threshold: 400, label: 'Back to top' },
  breadcrumb: {
    items: [
      { label: 'Home', href: '/' },
      { label: 'Docs', href: '/docs' },
      { label: 'Current' },
    ],
  },
  empty: { title: 'No items', description: 'Add something to get started.' },
  footer: { siteName: 'Rizzo', year: new Date().getFullYear(), links: [{ href: '/docs', label: 'Docs' }, { href: '/', label: 'Home' }] },
  pagination: { currentPage: 2, totalPages: 10, showFirstLast: true, maxVisible: 5 },
  tabs: {
    tabs: [
      { id: 'one', label: 'Tab One', content: '<p>Content for tab one.</p>' },
      { id: 'two', label: 'Tab Two', content: '<p>Content for tab two.</p>' },
      { id: 'three', label: 'Tab Three', content: '<p>Content for tab three.</p>' },
    ],
  },
  accordion: {
    items: [
      { id: 'a1', title: 'Section 1', content: '<p>Content for section 1.</p>' },
      { id: 'a2', title: 'Section 2', content: '<p>Content for section 2.</p>' },
    ],
  },
  calendar: {},
  carousel: {},
  forms: { placeholder: 'Enter text…', type: 'text' },
  'input-group': { placeholder: '0.00', prefix: '$', suffix: 'USD', 'aria-label': 'Amount' },
  'copy-to-clipboard': { value: 'npm install rizzo-css' },
  tooltip: { text: 'Tooltip text' },
  collapsible: { triggerLabel: 'Show more', defaultOpen: false, children: null },
  table: {
    columns: [
      { key: 'name', label: 'Name', sortable: true },
      { key: 'value', label: 'Value', sortable: true, type: 'number' },
    ],
    data: [
      { name: 'Alpha', value: 10 },
      { name: 'Beta', value: 20 },
      { name: 'Gamma', value: 15 },
    ],
    caption: 'Demo table',
    striped: true,
  },
  navbar: { siteName: 'Rizzo' },
};

export function getReactComponent(slug: string): ComponentType<any> {
  return HAS_COMPONENT[slug] ?? PlaceholderFor(slug);
}

export function getDemoProps(slug: string): Record<string, unknown> {
  return DEMO_PROPS[slug] ?? {};
}

export function hasReactComponent(slug: string): boolean {
  return slug in HAS_COMPONENT;
}

/** All slugs that have a dedicated React implementation (no placeholder). */
export const IMPLEMENTED_REACT_SLUGS = Object.keys(HAS_COMPONENT);
