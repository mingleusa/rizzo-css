/**
 * Vanilla HTML/BEM code snippets for each component. Used by React/Vue doc pages
 * so FrameworkCodeTabs can show all five frameworks (Astro, Svelte, React, Vue, Vanilla).
 */
import { slugToPascal } from './reactComponents';

export function getVanillaCodeSnippet(slug: string): string {
  return VANILLA_CODE_SNIPPETS[slug] ?? getDefaultSnippet(slug);
}

function getDefaultSnippet(slug: string): string {
  const title = slugToPascal(slug);
  return `<!-- Rizzo CSS. See /docs/vanilla/components/${slug} for full markup. -->
<div class="${slug}">
  <!-- ${title} content -->
</div>`;
}

const VANILLA_CODE_SNIPPETS: Record<string, string> = {
  button: `<!-- Ensure Rizzo CSS is loaded: <link rel="stylesheet" href="/css/rizzo.min.css" /> -->
<button type="button" class="btn">Default</button>
<button type="button" class="btn btn-primary">Primary</button>
<button type="button" class="btn btn-secondary">Secondary</button>
<button type="button" class="btn btn-success">Success</button>
<button type="button" class="btn btn-outline">Outline</button>
<button type="button" class="btn btn-ghost">Ghost</button>
<button type="button" class="btn btn-primary btn--sm">Small</button>
<button type="button" class="btn btn-primary btn--lg">Large</button>`,

  alert: `<!-- Ensure Rizzo CSS is loaded. Dismiss/auto-dismiss need minimal JS (see vanilla docs). -->
<div class="alert alert--success" role="alert" aria-live="polite">
  <div class="alert__content">Your changes have been saved.</div>
</div>
<div class="alert alert--error alert--dismissible" role="alert">
  <div class="alert__content">An error occurred.</div>
  <button type="button" class="alert__close" aria-label="Dismiss">×</button>
</div>`,

  badge: `<!-- Rizzo CSS. No script needed. -->
<span class="badge">Default</span>
<span class="badge badge--primary">Primary</span>
<span class="badge badge--success">Success</span>`,

  'button-group': `<!-- Rizzo CSS. No script needed. -->
<div class="button-group" role="group">
  <button type="button" class="btn">One</button>
  <button type="button" class="btn">Two</button>
  <button type="button" class="btn">Three</button>
</div>`,

  divider: `<!-- Rizzo CSS. No script needed. -->
<div class="divider"></div>
<div class="divider divider--label" data-label="OR"></div>`,

  separator: `<!-- Rizzo CSS. No script needed. -->
<div class="separator" role="separator"></div>`,

  spinner: `<!-- Rizzo CSS. No script needed. -->
<div class="spinner" role="status" aria-label="Loading"></div>`,

  kbd: `<!-- Rizzo CSS. No script needed. -->
<p>Press <kbd class="kbd">Ctrl</kbd>+<kbd class="kbd">K</kbd> to open search.</p>`,

  label: `<!-- Rizzo CSS. No script needed. -->
<label class="label" for="email">Email</label>
<input id="email" type="email" class="form-input" />`,

  empty: `<!-- Rizzo CSS. No script needed. BEM: empty, empty__icon, empty__title, empty__description. -->
<div class="empty">
  <div class="empty__title">No results</div>
  <div class="empty__description">Try adjusting your search.</div>
</div>`,

  'aspect-ratio': `<!-- Rizzo CSS. Use --aspect-ratio (e.g. 16/9) and --aspect-ratio-padding. -->
<div class="aspect-ratio" style="--aspect-ratio: 16/9;">
  <img src="/poster.jpg" alt="" />
</div>`,

  skeleton: `<!-- Rizzo CSS -->
<div class="skeleton" aria-hidden="true"></div>
<div class="skeleton skeleton--text"></div>`,

  avatar: `<!-- Rizzo CSS. No script needed. -->
<div class="avatar" data-initials="JD">Jane Doe</div>
<img class="avatar avatar--img" src="/photo.jpg" alt="Jane" />`,

  'progress-bar': `<!-- Rizzo CSS. BEM: progress, progress__track, progress__bar, progress__label. -->
<div class="progress progress--primary progress--md" role="progressbar" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100" aria-label="Progress">
  <div class="progress__track">
    <div class="progress__bar" style="width: 60%;"></div>
  </div>
  <span class="progress__label" aria-hidden="true">60%</span>
</div>`,

  breadcrumb: `<!-- Rizzo CSS. No script needed. -->
<nav class="breadcrumb" aria-label="Breadcrumb">
  <ol class="breadcrumb__list">
    <li><a href="/">Home</a></li>
    <li><a href="/docs">Docs</a></li>
    <li aria-current="page">Current</li>
  </ol>
</nav>`,

  forms: `<!-- Rizzo CSS. BEM: form-group, label, form-input, form-error. -->
<div class="form-group">
  <label for="email" class="label">Email</label>
  <input id="email" type="email" class="form-input" placeholder="you@example.com" />
</div>`,

  'input-group': `<!-- Rizzo CSS. Ensure input has accessible name (aria-label or associated label). -->
<div class="input-group">
  <span class="input-group__prefix" aria-hidden="true">$</span>
  <input type="text" class="input-group__input" placeholder="0.00" aria-label="Amount" />
  <span class="input-group__suffix" aria-hidden="true">USD</span>
</div>`,

  footer: `<!-- Rizzo CSS. No script needed. -->
<footer class="footer" role="contentinfo">
  <p class="footer__copy">© 2025 Acme. All rights reserved.</p>
</footer>`,

  cards: `<!-- Rizzo CSS. No script needed. -->
<div class="card card--elevated">
  <div class="card__header"><h3>Card title</h3></div>
  <div class="card__body">Card content.</div>
</div>`,

  table: `<!-- Table HTML with thead/tbody; optional data-sortable + script from package/vanilla docs. -->
<table class="table">
  <thead><tr><th>Name</th><th>Status</th></tr></thead>
  <tbody><tr><td>Item</td><td>Active</td></tr></tbody>
</table>`,

  tabs: `<!-- Rizzo CSS + component script (from package or vanilla docs). -->
<div class="tabs" data-tabs>
  <div class="tabs__list" role="tablist">...</div>
  <div class="tabs__panel" role="tabpanel">...</div>
</div>`,

  modal: `<!-- Use .modal-root so overlay stacks behind the modal. Overlay id: <modalId>-overlay. -->
<div class="modal-root">
  <div class="modal__overlay" id="my-modal-overlay" aria-hidden="true"></div>
  <div class="modal modal--md" id="my-modal" role="dialog" aria-modal="true" aria-labelledby="my-modal-title" aria-hidden="true">
    <div class="modal__header">
      <h2 id="my-modal-title" class="modal__title">Title</h2>
      <button type="button" class="modal__close" data-modal-close aria-label="Close">×</button>
    </div>
    <div class="modal__body">Content</div>
    <div class="modal__footer"><button type="button" class="btn" data-modal-close>Close</button></div>
  </div>
</div>
<button type="button" class="btn" data-modal-open="my-modal">Open</button>`,

  tooltip: `<!-- Rizzo CSS; tooltip is CSS + aria-describedby; no JS required for hover/focus. -->
<div class="tooltip-wrapper" aria-describedby="tip-1">
  <button type="button" class="btn btn-primary">Hover me</button>
  <span id="tip-1" class="tooltip tooltip--top" role="tooltip">This is a basic tooltip</span>
</div>`,

  collapsible: `<!-- Rizzo CSS + accordion/collapsible script from package/vanilla docs. -->
<div class="collapsible" data-collapsible id="my-collapsible">
  <button type="button" class="collapsible__trigger" aria-expanded="false" aria-controls="my-collapsible-panel">Toggle</button>
  <div id="my-collapsible-panel" class="collapsible__panel" hidden>Content</div>
</div>`,

  accordion: `<!-- Rizzo CSS + accordion script from package/vanilla docs. -->
<div class="accordion" data-accordion>...</div>`,

  dropdown: `<!-- Rizzo CSS + dropdown script from package/vanilla docs. -->
<div class="dropdown">
  <button class="dropdown__trigger" aria-haspopup="true">Menu</button>
  <div class="dropdown__menu" role="menu">...</div>
</div>`,

  popover: `<!-- Rizzo CSS + popover script. data-popover-trigger on trigger; content in popover__content. -->
<button data-popover-trigger="p1">Open</button>
<div id="p1" class="popover__content">...</div>`,

  'hover-card': `<!-- Rizzo CSS + hover-card script. data-hover-card-trigger on trigger. -->
<button data-hover-card-trigger="hc1">Hover</button>
<div id="hc1" class="hover-card__content">...</div>`,

  'context-menu': `<!-- Rizzo CSS + context-menu script. data-context-menu-trigger on trigger. -->
<div data-context-menu-trigger>Right-click</div>
<div class="context-menu" role="menu">...</div>`,

  'scroll-area': `<!-- Rizzo CSS. BEM: scroll-area, scroll-area__viewport, scroll-area__scrollbar. -->
<div class="scroll-area" style="height: 200px;">
  <div class="scroll-area__viewport">...</div>
</div>`,

  resizable: `<!-- Rizzo CSS + resizable script. BEM: resizable-pane-group, resizable-pane, resizable-handle. -->
<div class="resizable-pane-group">
  <div class="resizable-pane">Left</div>
  <div class="resizable-handle" aria-hidden="true"></div>
  <div class="resizable-pane">Right</div>
</div>`,

  'alert-dialog': `<!-- Use .alert-dialog-root so overlay stacks behind the dialog. openAlertDialog_<id>(), closeAlertDialog_<id>(). -->
<div class="alert-dialog-root">
  <div class="alert-dialog__overlay" data-alert-dialog-overlay id="alert-demo-overlay" aria-hidden="true"></div>
  <div class="alert-dialog" id="alert-demo" role="alertdialog" aria-modal="true" aria-labelledby="alert-demo-title" aria-describedby="alert-demo-desc" data-alert-dialog aria-hidden="true" hidden>
    <div class="alert-dialog__content">
      <h2 id="alert-demo-title" class="alert-dialog__title">Delete item?</h2>
      <p id="alert-demo-desc" class="alert-dialog__description">This action cannot be undone.</p>
      <div class="alert-dialog__actions">
        <button type="button" class="btn" data-alert-dialog-close>Cancel</button>
        <button type="button" class="btn btn-error" data-alert-dialog-close>Delete</button>
      </div>
    </div>
  </div>
</div>
<button type="button" class="btn" onclick="openAlertDialog_alert_demo()">Open</button>`,

  sheet: `<!-- Use .sheet-root so overlay stacks behind the sheet. openSheet_<id>(), closeSheet_<id>(). -->
<div class="sheet-root">
  <div class="sheet__overlay" data-sheet-overlay id="drawer-overlay" aria-hidden="true"></div>
  <div class="sheet sheet--right" id="drawer" data-sheet aria-hidden="true" hidden>
    <div class="sheet__content">
      <div class="sheet__header">
        <h2 class="sheet__title">Title</h2>
        <button type="button" class="sheet__close" aria-label="Close" data-sheet-close></button>
      </div>
      <div class="sheet__body">Content</div>
    </div>
  </div>
</div>
<button type="button" class="btn" onclick="window.openSheet_drawer()">Open</button>`,

  toast: `<!-- Include toast container + script from package scaffold. -->
<div id="toast-container" class="toast-container"></div>
<button data-toast="Message">Show toast</button>`,

  pagination: `<!-- Rizzo CSS; pagination links. For hash sync include script from package/vanilla docs. -->
<nav class="pagination" aria-label="Pagination">...</nav>`,

  switch: `<!-- Rizzo CSS. Toggle state via JS (aria-pressed, class switch--pressed). -->
<label class="switch">
  <input type="checkbox" class="switch__input" />
  <span class="switch__track"></span>
</label>`,

  toggle: `<!-- Rizzo CSS. Toggle state via JS (aria-pressed, class toggle--pressed). -->
<button type="button" class="toggle" aria-pressed="false">Toggle</button>`,

  'toggle-group': `<!-- Rizzo CSS. No script needed for static. -->
<div class="toggle-group" role="group">...</div>`,

  slider: `<!-- Rizzo CSS. BEM: slider, slider__track, slider__fill; input type="range" inside. -->
<div class="slider">
  <div class="slider__track"><div class="slider__fill" style="width: 50%;"></div></div>
  <input type="range" min="0" max="100" value="50" aria-label="Value" />
</div>`,

  'back-to-top': `<!-- Rizzo CSS. Script runs on DOMContentLoaded. Full snippet: /docs/vanilla/components/back-to-top -->
<button type="button" class="back-to-top" data-back-to-top aria-label="Back to top">↑</button>`,

  'copy-to-clipboard': `<!-- Ensure Rizzo CSS and js/main.js are loaded. -->
<button type="button" class="btn" data-copy-value="npm install rizzo-css">Copy</button>`,

  navbar: `<!-- From scaffold: Navbar includes Search (with icon) + Settings (with Gear icon). Include js/main.js for mobile menu, search, and settings. See /docs/vanilla/components/navbar for full markup with inline SVG icons. -->
<nav class="navbar" role="navigation" aria-label="Main navigation">
  <div class="navbar__container">
    <div class="navbar__brand">
      <a href="/" class="navbar__brand-link">My Site</a>
    </div>
    <div class="navbar__actions-desktop">
      <div class="search" data-search><!-- Search trigger with icon; overlay with input/results --></div>
      <button type="button" class="navbar__settings-btn" aria-label="Open settings" onclick="window.openSettings && window.openSettings()">
        <svg class="navbar__settings-icon icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/><circle cx="12" cy="12" r="3"/></svg>
        <span class="navbar__settings-label">Settings</span>
      </button>
    </div>
    <button type="button" class="navbar__toggle" aria-label="Toggle menu" aria-expanded="false" aria-controls="navbar-menu" id="navbar-toggle">
      <span class="navbar__toggle-icon" aria-hidden="true"><span></span><span></span><span></span></span>
    </button>
    <div class="navbar__menu" id="navbar-menu" role="navigation" aria-label="Mobile menu">
      <div class="navbar__item"><a href="/docs" class="navbar__link">Docs</a></div>
      <div class="navbar__item"><a href="/docs/components" class="navbar__link">Components</a></div>
      <div class="navbar__item"><a href="/blocks" class="navbar__link">Blocks</a></div>
      <div class="navbar__item"><a href="/themes" class="navbar__link">Themes</a></div>
    </div>
  </div>
</nav>`,

  search: `<!-- Shipped Navbar includes Search; standalone below. Include js/main.js for open/close. -->
<div class="search" data-search>...</div>`,

  settings: `<!-- Rizzo CSS + js/main.js. Full panel: scaffold/vanilla or /docs/vanilla/components/settings -->
<div class="settings" data-settings>...</div>`,

  'theme-switcher': `<!-- Rizzo CSS + theme script. Full markup: packages/rizzo-css/scaffold/vanilla/components/theme-switcher.html -->
<div class="theme-switcher" data-theme-switcher>...</div>`,

  'font-switcher': `<!-- Rizzo CSS. Script runs on DOMContentLoaded for [data-font-switcher]. -->
<div class="font-switcher" data-font-switcher>...</div>`,

  'sound-effects': `<!-- Checkbox with data-sound-effects; script runs on DOMContentLoaded. -->
<label class="checkbox"><input type="checkbox" data-sound-effects /> Sound on click</label>`,

  'docs-sidebar': `<!-- Layout: sidebar + main. BEM: docs-sidebar, docs-sidebar__nav, docs-sidebar__group, docs-sidebar__group-label, docs-sidebar__list, docs-sidebar__item, docs-sidebar__link, docs-sidebar__link--active. Populate links from nav config; set --active on current link. See /docs/vanilla/components/docs-sidebar for full HTML. -->
<div class="docs-layout" style="display:flex;">
  <aside class="docs-sidebar" aria-label="Documentation navigation"><nav class="docs-sidebar__nav">...</nav></aside>
  <main class="docs__main" style="flex:1;"><div class="docs__content"><!-- Page content --></div></main>
</div>`,

  dashboard: `<!-- Same structure as Astro live example: sidebar (nav) + main. -->
<div class="dashboard">
  <aside class="dashboard__sidebar" aria-label="Dashboard navigation">
    <nav class="dashboard__nav">
      <a href="/dashboard" class="dashboard__nav-link dashboard__nav-link--active" aria-current="page">Dashboard</a>
      <a href="/items" class="dashboard__nav-link">Items</a>
      <a href="/settings" class="dashboard__nav-link">Settings</a>
    </nav>
  </aside>
  <main id="main-content" class="dashboard__main">
    <h3 style="margin: 0 0 var(--spacing-2);">Main content</h3>
    <p style="margin: 0;">Put your page content here. Combine with Card, Table, and other Rizzo components.</p>
  </main>
</div>`,

  icons: `<!-- Rizzo CSS. Inline SVG or use .icon class; currentColor for theme. -->
<span class="icon" aria-hidden="true"><!-- svg --></span>`,

  calendar: `<!-- Rizzo CSS. Calendar grid is built by script (see /docs/vanilla/components/calendar). -->
<div class="calendar" role="group" aria-label="Calendar" data-calendar data-initial-month data-selected>
  <div class="calendar__header">
    <button type="button" class="calendar__prev" aria-label="Previous month" data-calendar-prev>...</button>
    <div class="calendar__month" aria-live="polite" data-calendar-month-label>—</div>
    <button type="button" class="calendar__next" aria-label="Next month" data-calendar-next>...</button>
  </div>
  <div class="calendar__grid" role="grid" aria-label="Month" data-calendar-grid>
    <div class="calendar__row" role="row">
      <div class="calendar__weekday" role="columnheader">Sun</div>
      <!-- ... Mon–Sat ... -->
    </div>
    <div class="calendar__body" data-calendar-body role="presentation"></div>
  </div>
</div>`,

  'range-calendar': `<!-- Rizzo CSS. Range calendar: two clicks set start/end; listen for range-calendar-select (see /docs/vanilla/components/range-calendar). -->
<div class="calendar calendar--range" role="group" aria-label="Choose date range" data-range-calendar>
  <div class="calendar__header">
    <button type="button" class="calendar__prev" aria-label="Previous month" data-range-calendar-prev>...</button>
    <div class="calendar__month" aria-live="polite" data-range-calendar-month-label>—</div>
    <button type="button" class="calendar__next" aria-label="Next month" data-range-calendar-next>...</button>
  </div>
  <div class="calendar__grid" role="grid" data-range-calendar-grid>
    <div class="calendar__row" role="row"><!-- weekdays --></div>
    <div class="calendar__body" data-range-calendar-body role="presentation"></div>
  </div>
</div>`,

  carousel: `<!-- Rizzo CSS. Carousel needs JS for prev/next (see /docs/vanilla/components/carousel). -->
<div class="carousel" role="region" aria-roledescription="carousel" aria-label="Slides" data-carousel>
  <div class="carousel__viewport" data-carousel-viewport>
    <div class="carousel__track" data-carousel-track>
      <div class="carousel__slide"><h4>Slide 1</h4><p>First slide content.</p></div>
      <div class="carousel__slide"><h4>Slide 2</h4><p>Second slide content.</p></div>
      <div class="carousel__slide"><h4>Slide 3</h4><p>Third slide content.</p></div>
    </div>
  </div>
  <div class="carousel__controls">
    <button type="button" class="carousel__prev" aria-label="Previous slide" data-carousel-prev>...</button>
    <div class="carousel__indicators" role="tablist" aria-label="Slide indicators" data-carousel-indicators></div>
    <button type="button" class="carousel__next" aria-label="Next slide" data-carousel-next>...</button>
  </div>
</div>`,
};
