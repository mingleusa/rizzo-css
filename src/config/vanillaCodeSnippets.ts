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
<div class="button-group">
  <button class="btn">One</button>
  <button class="btn btn-primary">Two</button>
  <button class="btn">Three</button>
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

  'progress-bar': `<!-- Rizzo CSS. No script needed for static bar. -->
<div class="progress-bar" role="progressbar" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100">
  <div class="progress-bar__fill" style="width: 60%;"></div>
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

  modal: `<!-- Rizzo CSS + js. Overlay id must be <modalId>-overlay. -->
<div id="my-modal-overlay" class="modal-overlay" aria-hidden="true">...</div>
<button data-modal-trigger="my-modal">Open</button>`,

  tooltip: `<!-- Rizzo CSS; tooltip is CSS + aria-describedby; no JS required for hover/focus. -->
<button aria-describedby="tip-1">Hover me</button>
<span id="tip-1" class="tooltip" role="tooltip">Tooltip text</span>`,

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

  'alert-dialog': `<!-- Rizzo CSS + alert-dialog script. openAlertDialog_<id>(), closeAlertDialog_<id>(). -->
<div id="confirm-dialog" class="alert-dialog" role="alertdialog">...</div>
<button onclick="openAlertDialog_confirmDialog()">Confirm</button>`,

  sheet: `<!-- Rizzo CSS + sheet script. openSheet_<id>(), closeSheet_<id>(). -->
<div id="drawer" class="sheet" aria-hidden="true">...</div>
<button onclick="openSheet_drawer()">Open</button>`,

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

  navbar: `<!-- From scaffold: Navbar includes Search + Settings. Include js/main.js for mobile menu. -->
<header class="navbar">...</header>`,

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

  'docs-sidebar': `<!-- Same BEM: docs-sidebar, docs-sidebar__nav, docs-sidebar__group, docs-sidebar__link. -->
<aside class="docs-sidebar"><nav class="docs-sidebar__nav">...</nav></aside>`,

  dashboard: `<!-- Dashboard layout: dashboard, dashboard__sidebar, dashboard__main. -->
<div class="dashboard"><aside class="dashboard__sidebar">...</aside><main class="dashboard__main">...</main></div>`,

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
