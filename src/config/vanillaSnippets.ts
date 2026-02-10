/**
 * Vanilla (HTML + BEM) snippets for docs. Each has title, optional description,
 * HTML code (for CodeBlock copy), and optional demoHtml for live demo.
 */
export interface VanillaSnippet {
  title: string;
  description?: string;
  html: string;
  /** Optional: same HTML for live demo (sanitized / safe). */
  demoHtml?: string;
  js?: string;
}

export const VANILLA_SNIPPETS: Record<string, VanillaSnippet> = {
  button: {
    title: 'Button',
    description: 'Semantic button with BEM classes. No JS required for static buttons.',
    html: `<button class="btn">Default</button>
<button class="btn btn-primary">Primary</button>
<button class="btn btn-success">Success</button>
<button class="btn btn-warning">Warning</button>
<button class="btn btn-error">Error</button>
<button class="btn btn-info">Info</button>
<button class="btn btn-outline">Outline</button>
<button class="btn" disabled>Disabled</button>`,
    demoHtml: '<button class="btn">Default</button><button class="btn btn-primary">Primary</button><button class="btn btn-success">Success</button><button class="btn btn-warning">Warning</button><button class="btn btn-error">Error</button><button class="btn btn-info">Info</button><button class="btn btn-outline">Outline</button><button class="btn" disabled>Disabled</button>',
  },
  badge: {
    title: 'Badge',
    description: 'Small labels and tags. Use badge--primary, badge--success, etc.',
    html: `<span class="badge badge--primary">Primary</span>
<span class="badge badge--success">Success</span>
<span class="badge badge--warning">Warning</span>
<span class="badge badge--error">Error</span>
<span class="badge badge--info">Info</span>
<span class="badge badge--primary badge--sm">Small</span>
<span class="badge badge--success badge--pill">Pill</span>`,
    demoHtml: '<span class="badge badge--primary">Primary</span><span class="badge badge--success">Success</span><span class="badge badge--warning">Warning</span><span class="badge badge--error">Error</span><span class="badge badge--info">Info</span><span class="badge badge--primary badge--sm">Small</span><span class="badge badge--success badge--pill">Pill</span>',
  },
  'copy-to-clipboard': {
    title: 'Copy to Clipboard',
    description: 'Button that copies text to the clipboard. Add your own copy/check icons inside the icon spans; the JS below wires up the click behavior.',
    html: `<button type="button" class="copy-to-clipboard" data-copy-value="pnpm add rizzo-css" aria-label="Copy to clipboard">
  <span class="copy-to-clipboard__text">pnpm add rizzo-css</span>
  <span class="copy-to-clipboard__icon copy-to-clipboard__icon--copy" aria-hidden="true"><!-- copy SVG --></span>
  <span class="copy-to-clipboard__icon copy-to-clipboard__icon--check" aria-hidden="true"><!-- check SVG --></span>
  <span class="copy-to-clipboard__feedback" aria-live="polite"></span>
</button>`,
    js: `document.querySelectorAll('.copy-to-clipboard').forEach((btn) => {
  btn.addEventListener('click', async () => {
    const value = btn.getAttribute('data-copy-value') || '';
    try {
      await navigator.clipboard.writeText(value);
      const copyIcon = btn.querySelector('.copy-to-clipboard__icon--copy');
      const checkIcon = btn.querySelector('.copy-to-clipboard__icon--check');
      const feedback = btn.querySelector('.copy-to-clipboard__feedback');
      if (copyIcon) copyIcon.classList.add('copy-to-clipboard__icon--hidden');
      if (checkIcon) checkIcon.classList.remove('copy-to-clipboard__icon--hidden');
      if (feedback) feedback.textContent = 'Copied!';
      setTimeout(() => {
        if (copyIcon) copyIcon.classList.remove('copy-to-clipboard__icon--hidden');
        if (checkIcon) checkIcon.classList.add('copy-to-clipboard__icon--hidden');
        if (feedback) feedback.textContent = '';
      }, 2000);
    } catch (_) {}
  });
});`,
  },
};

/** Slug list for components that have a vanilla snippet (for static paths). */
export const VANILLA_SNIPPET_SLUGS = Object.keys(VANILLA_SNIPPETS);

/** All component slugs that have a vanilla docs page (snippet or fallback). */
export const VANILLA_COMPONENT_SLUGS = [
  'navbar', 'settings', 'theme-switcher', 'button', 'badge', 'accordion',
  'breadcrumb', 'pagination', 'progress-bar', 'spinner', 'avatar', 'divider',
  'table', 'icons', 'copy-to-clipboard', 'forms', 'cards', 'modal', 'alert',
  'toast', 'search', 'tooltip', 'dropdown', 'tabs',
];

/** Human-readable titles for component slugs (for fallback pages and nav). */
export const VANILLA_COMPONENT_TITLES: Record<string, string> = {
  navbar: 'Navbar',
  settings: 'Settings',
  'theme-switcher': 'Theme Switcher',
  button: 'Button',
  badge: 'Badge',
  accordion: 'Accordion',
  breadcrumb: 'Breadcrumb',
  pagination: 'Pagination',
  'progress-bar': 'Progress Bar',
  spinner: 'Spinner',
  avatar: 'Avatar',
  divider: 'Divider',
  table: 'Table',
  icons: 'Icons',
  'copy-to-clipboard': 'Copy to Clipboard',
  forms: 'Forms',
  cards: 'Cards',
  modal: 'Modal',
  alert: 'Alert',
  toast: 'Toast',
  search: 'Search',
  tooltip: 'Tooltip',
  dropdown: 'Dropdown',
  tabs: 'Tabs',
};

/**
 * Minimal vanilla HTML for components that don't have a full snippet yet.
 * Every vanilla component page shows at least this copyable markup (with CodeBlock copy).
 */
export const VANILLA_FALLBACK_HTML: Record<string, string> = {
  spinner: `<span class="spinner spinner--md spinner--primary" role="status" aria-label="Loading">
  <span class="spinner__ring" aria-hidden="true"></span>
</span>`,
  avatar: `<span class="avatar avatar--md avatar--circle" role="img" aria-label="Avatar: JD">
  <span class="avatar__initials" aria-hidden="true">JD</span>
</span>`,
  divider: `<div class="divider divider--horizontal" role="separator" aria-orientation="horizontal">
  <span class="divider__line" aria-hidden="true"></span>
</div>
<!-- With label: -->
<div class="divider divider--horizontal divider--labeled" role="separator" aria-orientation="horizontal">
  <span class="divider__line" aria-hidden="true"></span>
  <span class="divider__label">OR</span>
  <span class="divider__line" aria-hidden="true"></span>
</div>`,
  alert: `<div class="alert alert--info" role="alert" aria-live="polite" aria-label="Information message">
  <div class="alert__content">Information message here.</div>
</div>`,
  'progress-bar': `<div class="progress-bar progress-bar--md progress-bar--primary" role="progressbar" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100">
  <div class="progress-bar__track">
    <div class="progress-bar__fill" style="width: 60%"></div>
  </div>
</div>`,
  pagination: `<nav class="pagination" aria-label="Pagination">
  <a class="pagination__link pagination__link--prev" href="#" aria-label="Previous page">Previous</a>
  <span class="pagination__list" role="list">
    <span class="pagination__item pagination__item--current" aria-current="page">1</span>
    <a class="pagination__link" href="?page=2">2</a>
  </span>
  <a class="pagination__link pagination__link--next" href="?page=2" aria-label="Next page">Next</a>
</nav>`,
  breadcrumb: `<nav class="breadcrumb" aria-label="Breadcrumb">
  <ol class="breadcrumb__list">
    <li class="breadcrumb__item"><a class="breadcrumb__link" href="/">Home</a></li>
    <li class="breadcrumb__item"><a class="breadcrumb__link" href="/docs">Docs</a></li>
    <li class="breadcrumb__item" aria-current="page">Current</li>
  </ol>
</nav>`,
  accordion: `<div class="accordion">
  <div class="accordion__item">
    <button type="button" class="accordion__trigger" aria-expanded="false" aria-controls="acc-1" id="acc-trigger-1">Section 1</button>
    <div id="acc-1" class="accordion__panel" hidden>
      <div class="accordion__content">Content here.</div>
    </div>
  </div>
</div>`,
  cards: `<div class="card">
  <div class="card__body">
    <h3>Card title</h3>
    <p>Card content. Use <code>card--elevated</code>, <code>card--outlined</code>, or <code>card--filled</code> for variants.</p>
  </div>
</div>`,
  table: `<div class="table-wrapper">
  <table class="table">
    <thead><tr><th>Name</th><th>Status</th></tr></thead>
    <tbody>
      <tr><td>Item 1</td><td><span class="badge badge--success">Done</span></td></tr>
      <tr><td>Item 2</td><td><span class="badge badge--warning">Pending</span></td></tr>
    </tbody>
  </table>
</div>`,
  modal: `<div class="modal" id="my-modal" role="dialog" aria-modal="true" aria-labelledby="modal-title" hidden>
  <div class="modal__backdrop"></div>
  <div class="modal__container">
    <div class="modal__content">
      <h2 class="modal__title" id="modal-title">Modal title</h2>
      <p>Modal body. Add JS to open/close and focus trap.</p>
      <button type="button" class="btn btn-primary modal__close">Close</button>
    </div>
  </div>
</div>`,
  toast: `<div class="toast-container toast-container--top-right">
  <div class="alert alert--info">Toast message. Use JS (e.g. <code>showToast()</code>) for dynamic toasts.</div>
</div>`,
  tooltip: `<button type="button" class="btn" aria-describedby="tip-1">Hover me</button>
<span class="tooltip" id="tip-1" role="tooltip">Tooltip text. Add JS for show/hide and position.</span>`,
  dropdown: `<div class="dropdown">
  <button type="button" class="btn dropdown__trigger" aria-expanded="false" aria-haspopup="true" aria-controls="menu-1">Menu</button>
  <ul class="dropdown__menu" id="menu-1" role="menu" hidden>
    <li role="none"><a class="dropdown__item" href="#" role="menuitem">Item 1</a></li>
    <li role="none"><a class="dropdown__item" href="#" role="menuitem">Item 2</a></li>
  </ul>
</div>`,
  tabs: `<div class="tabs">
  <div class="tabs__list" role="tablist">
    <button type="button" class="tabs__tab" role="tab" aria-selected="true" aria-controls="panel-1" id="tab-1">Tab 1</button>
    <button type="button" class="tabs__tab" role="tab" aria-selected="false" aria-controls="panel-2" id="tab-2">Tab 2</button>
  </div>
  <div id="panel-1" class="tabs__panel" role="tabpanel" aria-labelledby="tab-1">Panel 1 content.</div>
  <div id="panel-2" class="tabs__panel" role="tabpanel" aria-labelledby="tab-2" hidden>Panel 2 content.</div>
</div>`,
  forms: `<form class="form">
  <label class="form__label" for="input-1">Label</label>
  <input id="input-1" type="text" class="input" placeholder="Placeholder" />
  <button type="submit" class="btn btn-primary">Submit</button>
</form>`,
  navbar: `<!-- Navbar structure: use same BEM classes as Astro/Svelte. Copy full markup from Astro component docs. -->
<nav class="navbar" role="navigation">
  <div class="navbar__container">
    <div class="navbar__brand"><a href="/" class="navbar__brand-link">App</a></div>
    <div class="navbar__menu">...</div>
  </div>
</nav>`,
  settings: `<!-- Settings panel: use same BEM as Astro/Svelte. Copy full markup from Astro component docs. -->
<div class="settings-panel" id="settings-panel" hidden>...</div>`,
  'theme-switcher': `<!-- Use theme utilities (applyTheme, getThemeLabel) or copy full theme-switcher markup from Astro docs (dropdown with preview panel). -->
<select class="input" onchange="document.documentElement.setAttribute('data-theme', this.value); localStorage.setItem('theme', this.value);">
  <option value="github-dark-classic">GitHub Dark Classic</option>
  <option value="github-light">GitHub Light</option>
</select>`,
  icons: `<!-- Use inline SVG with stroke="currentColor" or fill="currentColor". See Astro Icons docs for full SVG markup. -->
<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
  <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/>
</svg>`,
  search: `<!-- Search UI: use same BEM as Astro/Svelte. Add JS for Cmd+K and Algolia. Copy full markup from Astro component docs. -->
<div class="search">
  <input type="search" class="search__input" placeholder="Search..." aria-label="Search" />
</div>`,
};
