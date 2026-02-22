<script lang="ts">
  import Card from '../../Card.svelte';

  /* Order matches Astro nav/sidebar: alphabetical by title */
  const items: { href: string; title: string; desc: string }[] = [
    { href: '/docs/svelte/components/accordion', title: 'Accordion', desc: 'Expandable panels with single or multiple open' },
    { href: '/docs/svelte/components/alert', title: 'Alert', desc: 'Alert with variants, dismissible and auto-dismiss' },
    { href: '/docs/svelte/components/alert-dialog', title: 'Alert Dialog', desc: 'Confirm/cancel dialog for destructive or important actions' },
    { href: '/docs/svelte/components/aspect-ratio', title: 'Aspect Ratio', desc: 'Enforces an aspect ratio on content (e.g. 16/9)' },
    { href: '/docs/svelte/components/avatar', title: 'Avatar', desc: 'Avatar with image or initials, sizes and shapes' },
    { href: '/docs/svelte/components/back-to-top', title: 'Back to Top', desc: 'Fixed button that appears on scroll and scrolls to top' },
    { href: '/docs/svelte/components/badge', title: 'Badge', desc: 'Small labels and tags with variants and pill option' },
    { href: '/docs/svelte/components/breadcrumb', title: 'Breadcrumb', desc: 'Breadcrumb navigation with separator options' },
    { href: '/docs/svelte/components/button', title: 'Button', desc: 'Semantic button with variants using theme variables' },
    { href: '/docs/svelte/components/button-group', title: 'Button Group', desc: 'Group of buttons attached together (horizontal or vertical)' },
    { href: '/docs/svelte/components/cards', title: 'Cards', desc: 'Flexible card with variants and sections' },
    { href: '/docs/svelte/components/collapsible', title: 'Collapsible', desc: 'Single expand/collapse section (one trigger, one panel)' },
    { href: '/docs/svelte/components/context-menu', title: 'Context Menu', desc: 'Right-click menu with items and separators' },
    { href: '/docs/svelte/components/copy-to-clipboard', title: 'Copy to Clipboard', desc: 'Copy text with visual feedback' },
    { href: '/docs/svelte/components/dashboard', title: 'Dashboard', desc: 'Layout with sidebar and main content area' },
    { href: '/docs/svelte/components/docs-sidebar', title: 'Docs Sidebar', desc: 'Sidebar nav with grouped links and active state' },
    { href: '/docs/svelte/components/divider', title: 'Divider', desc: 'Horizontal or vertical divider with optional label' },
    { href: '/docs/svelte/components/dropdown', title: 'Dropdown', desc: 'Menu with items, links, submenus, and actions' },
    { href: '/docs/svelte/components/empty', title: 'Empty', desc: 'Empty state with optional icon, title, description, and action' },
    { href: '/docs/svelte/components/footer', title: 'Footer', desc: 'Site footer with copyright, optional site name, and optional link list' },
    { href: '/docs/svelte/components/font-switcher', title: 'Font Switcher', desc: 'Font pair (sans + mono) dropdown with preview' },
    { href: '/docs/svelte/components/forms', title: 'Forms', desc: 'FormGroup, Input, Checkbox, Textarea, Select, Radio' },
    { href: '/docs/svelte/components/hover-card', title: 'Hover Card', desc: 'Floating panel that opens on hover' },
    { href: '/docs/svelte/components/icons', title: 'Icons', desc: 'Reusable SVG icon components (Tabler, Devicons); Astro reference, same CSS in Svelte' },
    { href: '/docs/svelte/components/kbd', title: 'Kbd', desc: 'Keyboard key styling for shortcuts' },
    { href: '/docs/svelte/components/label', title: 'Label', desc: 'Standalone form label; use for/id to associate with inputs' },
    { href: '/docs/svelte/components/modal', title: 'Modal', desc: 'Dialog with overlay, focus trap, and sizes' },
    { href: '/docs/svelte/components/navbar', title: 'Navbar', desc: 'Responsive navigation with dropdowns and search; Astro reference, same BEM in Svelte' },
    { href: '/docs/svelte/components/pagination', title: 'Pagination', desc: 'Page navigation with first/last and ellipsis' },
    { href: '/docs/svelte/components/popover', title: 'Popover', desc: 'Floating panel triggered by a button' },
    { href: '/docs/svelte/components/progress-bar', title: 'Progress Bar', desc: 'Progress bar with variants and indeterminate state' },
    { href: '/docs/svelte/components/resizable', title: 'Resizable', desc: 'Resizable panel groups with drag handles' },
    { href: '/docs/svelte/components/scroll-area', title: 'Scroll Area', desc: 'Scrollable area with themed scrollbar' },
    { href: '/docs/svelte/components/search', title: 'Search', desc: 'Search with Algolia; Cmd+K/Ctrl+K to open or close; Astro reference' },
    { href: '/docs/svelte/components/separator', title: 'Separator', desc: 'Thin separator line (horizontal or vertical)' },
    { href: '/docs/svelte/components/settings', title: 'Settings', desc: 'Theme, font size, and accessibility panel; Astro reference, same CSS' },
    { href: '/docs/svelte/components/sheet', title: 'Sheet', desc: 'Slide-out panel (drawer) from top, right, bottom, or left' },
    { href: '/docs/svelte/components/skeleton', title: 'Skeleton', desc: 'Loading placeholder with shimmer; respects reduced motion' },
    { href: '/docs/svelte/components/slider', title: 'Slider', desc: 'Range slider input with themed track and fill' },
    { href: '/docs/svelte/components/sound-effects', title: 'Sound Effects', desc: 'Toggle for play sound on click; off by default' },
    { href: '/docs/svelte/components/spinner', title: 'Spinner', desc: 'Loading spinner with variants and sizes' },
    { href: '/docs/svelte/components/switch', title: 'Switch', desc: 'On/off toggle with role=switch and keyboard support' },
    { href: '/docs/svelte/components/table', title: 'Table', desc: 'Data table with sorting and optional filter' },
    { href: '/docs/svelte/components/tabs', title: 'Tabs', desc: 'Tabs with default, pills, and underline variants' },
    { href: '/docs/svelte/components/theme-switcher', title: 'Theme Switcher', desc: 'Theme dropdown with Preference (System), Dark/Light groups, preview panel (current theme by default, hover to preview); Astro reference' },
    { href: '/docs/svelte/components/toast', title: 'Toast', desc: 'Positioned alerts with dismiss and auto-dismiss' },
    { href: '/docs/svelte/components/toggle', title: 'Toggle', desc: 'Toggle button with pressed/unpressed state' },
    { href: '/docs/svelte/components/toggle-group', title: 'Toggle Group', desc: 'Group of toggle buttons (single or multiple selection)' },
    { href: '/docs/svelte/components/tooltip', title: 'Tooltip', desc: 'Tooltip with positioning options' },
  ];
</script>

<section>
  <h2>Component library</h2>
  <p>These components are built with Svelte and use the same Rizzo CSS classes and variables. Each page includes live examples and usage snippets.</p>
  <p><strong>Every framework:</strong> Each component also has an <a href="/docs/components">Astro</a> doc page (live demos + “Using classes” HTML). Vanilla uses the same HTML and BEM from the Astro Usage sections. Use the framework switcher at the top to toggle between Astro and Svelte docs.</p>
</section>

<section>
  <h2>Available components</h2>
  <div class="docs-component-grid">
    {#each items as item}
      <a href={item.href} class="component-card-link">
        <Card variant="elevated">
          <div class="card__body">
            <h3 class="card-title">{item.title}</h3>
            <p class="card-desc">{item.desc}</p>
          </div>
        </Card>
      </a>
    {/each}
  </div>
</section>

<section>
  <h2>Component features</h2>
  <p>All components share: semantic theming, accessibility (keyboard + ARIA), BEM naming, responsive design, and WCAG AA compliance.</p>
</section>

<style>
  .docs-component-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(var(--spacing-70), 1fr));
    gap: var(--spacing-6);
    margin: var(--spacing-8) 0;
  }
  .component-card-link {
    text-decoration: none;
    color: inherit;
    display: flex;
    flex-direction: column;
    height: 100%;
    transition: transform var(--transition-base);
  }
  .component-card-link :global(.card) {
    flex: 1;
    display: flex;
    flex-direction: column;
    min-height: 0;
  }
  .component-card-link :global(.card .card__body) {
    flex: 1;
  }
  .component-card-link:hover {
    transform: translateY(calc(-1 * var(--spacing-0-125)));
  }
  .component-card-link :global(.card__body .card-title) {
    margin: 0 0 var(--spacing-2) 0;
  }
  .component-card-link :global(.card__body .card-desc) {
    margin: 0;
    color: var(--text-dim);
    font-size: var(--font-size-sm);
  }
  .component-card-link:hover :global(.card-title) {
    color: var(--accent-fg);
  }
  @media (width <= 640px) {
    .docs-component-grid {
      grid-template-columns: 1fr;
    }
  }
</style>
