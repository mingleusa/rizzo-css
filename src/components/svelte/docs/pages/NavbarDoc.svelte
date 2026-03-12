<script lang="ts">
  import CodeBlock from '../CodeBlock.svelte';
  import AddComponentTabs from '../AddComponentTabs.svelte';
  import Navbar from '../../Navbar.svelte';

  const portfolioLinks = [
    { href: '/#about', label: 'About' },
    { href: '/#skills', label: 'Skills' },
    { href: '/#projects', label: 'Projects' },
    { href: '/#contact', label: 'Contact' },
  ];
</script>

<section>
  <h2>Navbar component</h2>
  <p>A responsive, accessible navigation bar with search and settings. Pass <code>menuLinks</code> to show custom nav links (e.g. for a portfolio: About, Skills, Projects, Contact). Uses the same BEM classes and structure as the Astro Navbar.</p>
  <AddComponentTabs componentName="Navbar" />

  <h3>Props</h3>
  <ul>
    <li><code>siteName</code> (string, optional) — Brand text next to the logo (default: "Site")</li>
    <li><code>logo</code> (string, optional) — Image URL for the logo; omit to use the default icon</li>
    <li><code>menuLinks</code> (array, optional) — <code>{'{ href, label }'}</code>[] for nav links (e.g. hash links for a one-pager). Omit to use default docs links.</li>
  </ul>

  <h3>Live example (default links)</h3>
  <p>Navbar with default docs-style links.</p>
  <div class="navbar-demo-wrapper">
    <Navbar siteName="Rizzo" />
  </div>

  <h3>Live example (custom menu links)</h3>
  <p>Portfolio-style links via <code>menuLinks</code>.</p>
  <div class="navbar-demo-wrapper">
    <Navbar siteName="Site" menuLinks={portfolioLinks} />
  </div>

  <h3>Features</h3>
  <ul>
    <li><strong>Desktop:</strong> Brand, nav links with dropdowns (e.g. Components, Themes), search trigger, settings button. Components dropdown uses a 3-column layout; Themes uses Dark | Light columns.</li>
    <li><strong>Mobile (≤1024px):</strong> Menu toggle (hamburger) on the left; search and settings (icon-only) on the right. Full-width overlay menu when open; mutually exclusive with search.</li>
    <li>Sticky top, full-width border, smooth open/close transitions.</li>
    <li>Full keyboard navigation for dropdowns (Arrow keys, Enter, Space, Escape, Home, End) and ARIA.</li>
    <li>Settings button opens the Settings panel (<code>window.openSettings()</code> when using the design system scripts).</li>
  </ul>

  <h3>Key BEM classes and structure</h3>
  <p>Use these classes so styles apply correctly. Toggle <code>navbar__menu--open</code> on the menu and <code>navbar--menu-open</code> on the root <code>nav</code> for the mobile menu. Use <code>navbar__item--has-dropdown</code> and <code>navbar__submenu</code> for dropdowns; control visibility with a class (e.g. <code>navbar__item--open</code>) or <code>aria-expanded</code> and CSS.</p>
  <ul>
    <li><code>navbar</code> — root <code>nav</code>; add <code>navbar--menu-open</code> when mobile menu is open.</li>
    <li><code>navbar__container</code> — inner wrapper.</li>
    <li><code>navbar__brand</code> / <code>navbar__brand-link</code> — logo and home link.</li>
    <li><code>navbar__toggle</code> — mobile menu button; set <code>aria-expanded</code> from state.</li>
    <li><code>navbar__menu</code> — menu container; add <code>navbar__menu--open</code> when open.</li>
    <li><code>navbar__item</code> / <code>navbar__item--has-dropdown</code> — item wrapper; <code>--has-dropdown</code> for items with a submenu.</li>
    <li><code>navbar__link</code> — main link or dropdown trigger.</li>
    <li><code>navbar__submenu</code> / <code>navbar__submenu--components</code> / <code>navbar__submenu--themes</code> — submenu list and variants.</li>
    <li><code>navbar__sublink</code> — submenu link.</li>
    <li><code>navbar__settings-btn</code> — settings button.</li>
  </ul>

  <h3>Usage (Svelte component)</h3>
  <p>Use the Navbar component with optional <code>menuLinks</code> for a portfolio or one-pager:</p>
  <CodeBlock
    code={`<script>
  import { Navbar } from '$lib/rizzo';
  import type { NavbarLink } from '$lib/rizzo';

  const menuLinks: NavbarLink[] = [
    { href: '/#about', label: 'About' },
    { href: '/#skills', label: 'Skills' },
    { href: '/#projects', label: 'Projects' },
    { href: '/#contact', label: 'Contact' },
  ];
</script>

<Navbar siteName="Your Site" {menuLinks} />`}
    language="svelte"
  />

  <h3>Minimal structure (plain HTML)</h3>
  <p>Simplified markup if you build the navbar by hand. In your script: <code>let menuOpen = $state(false); let dropdownOpen = $state(false);</code></p>
  <CodeBlock
    code={`<nav class="navbar" class:navbar--menu-open={menuOpen}>
  <div class="navbar__container">
    <div class="navbar__brand">
      <a href="/" class="navbar__brand-link">Site name</a>
    </div>
    <button
      type="button"
      class="navbar__toggle"
      aria-label="Toggle menu"
      aria-expanded={menuOpen}
      onclick={() => (menuOpen = !menuOpen)}
    >
      <span class="navbar__toggle-icon" aria-hidden="true">...</span>
    </button>
    <div class="navbar__menu" class:navbar__menu--open={menuOpen} role="menu">
      <div class="navbar__item navbar__item--has-dropdown">
        <button type="button" class="navbar__link" aria-expanded={dropdownOpen} aria-haspopup="true">
          Docs
        </button>
        <ul class="navbar__submenu" role="menu" aria-hidden={!dropdownOpen}>
          <li><a href="/docs" class="navbar__sublink">Overview</a></li>
        </ul>
      </div>
      <a href="/search" class="navbar__item">Search</a>
      <button type="button" class="navbar__settings-btn" aria-label="Settings" onclick={() => window.openSettings?.()}>
        <Gear width={20} height={20} class="navbar__settings-icon" />
        <span class="navbar__settings-label">Settings</span>
      </button>
    </div>
  </div>
</nav>`}
    language="svelte"
  />

  <h3>Implementing behavior in Svelte</h3>
  <ul>
    <li><strong>Mobile menu:</strong> Bind <code>menuOpen</code> (or similar) to the toggle button; add <code>navbar__menu--open</code> to the menu and <code>navbar--menu-open</code> to the root when open. On mobile, close search when opening the menu if your layout shares the same pattern.</li>
    <li><strong>Dropdowns:</strong> Track which item is open (e.g. <code>openDropdownIndex</code>). Use <code>aria-expanded</code> and a class on the submenu for visibility. On desktop, consider measuring and adjusting submenu position to avoid viewport overflow (see Astro Navbar script).</li>
    <li><strong>Keyboard:</strong> Handle <code>keydown</code> on the menu: Arrow keys to move focus, Enter/Space to activate, Escape to close menu or dropdown. Use <code>role="menu"</code> and <code>role="menuitem"</code> (or <code>menuitem</code> on links) for ARIA.</li>
    <li><strong>Click outside:</strong> Close menu/dropdown when focus or click is outside the navbar (e.g. <code>document</code> click listener, or focus-within).</li>
  </ul>

  <p><a href="/docs/components/navbar">Full Astro Navbar documentation</a> — structure, dropdown layout, and the inline script you can port to Svelte for toggle, dropdown positioning, and keyboard handling.</p>
  <p><strong>Other frameworks:</strong> <a href="/docs/components/navbar">Astro</a> · <a href="/docs/vanilla/components/navbar">Vanilla</a> · <a href="/docs/vue/components/navbar">Vue</a> · <a href="/docs/react/components/navbar">React</a></p>
  <p><a href="/docs/svelte/components">← Back to Svelte components</a></p>
</section>

<style>
  .navbar-demo-wrapper {
    margin: var(--spacing-4) 0;
    border: 1px solid var(--border);
    border-radius: var(--radius-lg);
    overflow: hidden;
  }
</style>
