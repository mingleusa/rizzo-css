<script lang="ts">
  import ThemeSwitcher from '../../ThemeSwitcher.svelte';
  import ThemeIcon from '../../ThemeIcon.svelte';
  import CodeBlock from '../CodeBlock.svelte';
</script>

<section>
  <h2>Theme Switcher component</h2>
  <p>Accessible theme dropdown with <strong>Preference</strong> (System), <strong>Dark</strong>, and <strong>Light</strong> groups, a unique icon per theme, and a preview panel. Same behavior as the <a href="/docs/components/theme-switcher">Astro ThemeSwitcher</a>: persists in <code>localStorage</code> (key <code>theme</code>), sets <code>data-theme</code> on <code>&lt;html&gt;</code>.</p>

  <h3>Live example</h3>
  <div class="example">
    <div class="example-title">Live Example</div>
    <p>Try switching themes using the theme switcher below (Svelte component):</p>
    <ThemeSwitcher />
  </div>

  <h3>Features</h3>
  <ul>
    <li><strong>Preference (System)</strong> — Option to follow OS light/dark; resolves to a concrete theme when applied. When System is selected, both System and the resolved theme show the active state in the UI.</li>
    <li><strong>Preview panel</strong> — When the menu is open (viewports &gt;480px), a preview panel is always visible. It shows a fixed “Preview” label; the theme name, swatch, and accent bar show the <strong>current</strong> theme by default and the <strong>hovered</strong> theme on hover/focus. Full-height divider between list and preview. Hidden on small viewports.</li>
    <li>Groups: Preference, Dark themes, Light themes; each theme has a unique icon (from <code>themes.ts</code>).</li>
    <li>Trigger shows the active theme name and icon.</li>
    <li>Persists selection in <code>localStorage</code> (<code>theme</code>: theme id or <code>system</code>).</li>
    <li>Full keyboard navigation (Enter/Space to open/close, Arrow keys, Home/End, Escape, Tab).</li>
  </ul>

  <h3>Key BEM classes and data attributes</h3>
  <ul>
    <li><code>theme-switcher</code> — root; <code>data-theme-switcher</code> (for script or shared behavior).</li>
    <li><code>theme-switcher__trigger</code> — button; <code>aria-expanded</code>, <code>aria-haspopup</code>, <code>aria-controls</code> = menu id.</li>
    <li><code>theme-switcher__label-wrapper</code> — wraps label + optional icon; <code>data-theme-label-wrapper</code>.</li>
    <li><code>theme-switcher__label</code> — current theme name; <code>data-theme-label</code>.</li>
    <li><code>theme-switcher__icon</code> — chevron (open/close).</li>
    <li><code>theme-switcher__menu</code> — dropdown; <code>role="menu"</code>, <code>aria-labelledby</code>, <code>aria-label</code>, <code>tabindex="-1"</code>. Add <code>theme-switcher__menu--open</code> when open.</li>
    <li><code>theme-switcher__menu-options</code> — scrollable list of options; has a full-height border on the right (divider) on larger screens.</li>
    <li><code>theme-switcher__group</code> — section; <code>role="group"</code>, <code>aria-label</code> (e.g. “Preference”, “Dark themes”, “Light themes”).</li>
    <li><code>theme-switcher__group-label</code> — section heading; <code>role="presentation"</code>.</li>
    <li><code>theme-switcher__option</code> — one theme option; <code>role="menuitemradio"</code>, <code>aria-checked</code>, <code>tabindex="-1"</code>. Add <code>theme-switcher__option--active</code> when selected. <code>data-theme-value</code> (theme id or <code>system</code>), <code>data-theme-type</code> (<code>system</code> / <code>dark</code> / <code>light</code>), <code>data-theme-bg</code>, <code>data-theme-accent</code>, <code>data-theme-label</code> for preview and styling.</li>
    <li><code>theme-switcher__option-icon</code> — icon inside option.</li>
    <li><code>theme-switcher__preview</code> — preview panel; <code>data-theme-preview</code>. On open, set <code>aria-hidden="false"</code> when viewport &gt;480px.</li>
    <li><code>theme-switcher__preview-title</code> — fixed “Preview” label.</li>
    <li><code>theme-switcher__preview-header</code> — theme name; <code>data-theme-preview-label</code>.</li>
    <li><code>theme-switcher__preview-swatch-wrap</code>, <code>theme-switcher__preview-swatch</code> — swatch; <code>data-theme-preview-swatch</code>. Set background (e.g. from <code>data-theme-bg</code>) for the hovered/current theme.</li>
    <li><code>theme-switcher__preview-accent</code> — accent bar; <code>data-theme-preview-accent</code>. Set background from <code>data-theme-accent</code>.</li>
  </ul>

  <h3>Theme utilities</h3>
  <p>Use these (from <code>src/utils/theme.ts</code> or your port) to apply and display themes:</p>
  <ul>
    <li><code>applyTheme(value)</code> — Sets <code>data-theme</code> on <code>html</code> and saves to <code>localStorage</code> (<code>theme</code>). Use a theme id (e.g. <code>github-dark-classic</code>) or <code>system</code>. Dispatches <code>rizzo-theme-change</code>.</li>
    <li><code>getThemeLabel(value)</code> / <code>getThemeInfo(value)</code> — Display name for a theme id or <code>system</code>.</li>
    <li><code>getStoredTheme()</code> — Returns current value in <code>localStorage</code> (<code>theme</code> id or <code>system</code>).</li>
    <li><code>resolveSystemTheme()</code> — Resolves OS preference to a concrete theme id (dark → default dark, light → default light).</li>
    <li>Constants: <code>THEME_SYSTEM</code>, <code>DEFAULT_THEME_DARK</code>, <code>DEFAULT_THEME_LIGHT</code>.</li>
  </ul>
  <p>Theme IDs: run <code>npx rizzo-css theme</code> or see <a href="/docs/theming#available-themes">Theming – Available themes</a>. Listen for <code>rizzo-theme-change</code> to sync other UI when the theme changes.</p>

  <h3>ThemeIcon</h3>
  <p>To show the same icon as the switcher elsewhere (e.g. theme pages, cards), use <code>&lt;ThemeIcon themeId="github-dark-classic" size={24} /&gt;</code>. Props: <code>themeId</code>, optional <code>size</code> (default 24), optional <code>class</code>.</p>
  <div class="example">
    <div class="example-title">Example: theme icons</div>
    <p><ThemeIcon themeId="github-dark-classic" size={24} /> GitHub Dark Classic · <ThemeIcon themeId="sunflower" size={20} /> Sunflower · <ThemeIcon themeId="shades-of-purple" size={28} /> Shades of Purple</p>
  </div>

  <h3>Structure example (simplified)</h3>
  <CodeBlock
    code={`<div class="theme-switcher" data-theme-switcher>
  <button
    type="button"
    class="theme-switcher__trigger"
    aria-expanded={open}
    aria-haspopup="true"
    aria-controls="theme-menu"
    aria-label="Select theme"
    onclick={() => (open = !open)}
  >
    <span class="theme-switcher__label-wrapper" data-theme-label-wrapper>
      <span class="theme-switcher__label" data-theme-label>{currentLabel}</span>
    </span>
    <ChevronDown class="theme-switcher__icon" width={16} height={16} />
  </button>
  <div
    class="theme-switcher__menu"
    class:theme-switcher__menu--open={open}
    id="theme-menu"
    role="menu"
    aria-label="Theme selection"
    aria-hidden={!open}
    tabindex="-1"
  >
    <div class="theme-switcher__menu-options">
      <div class="theme-switcher__group" role="group" aria-label="Preference">
        <div class="theme-switcher__group-label" role="presentation">Preference</div>
        <div
          class="theme-switcher__option"
          class:theme-switcher__option--active={storedTheme === 'system'}
          role="menuitemradio"
          aria-checked={storedTheme === 'system'}
          data-theme-value="system"
          data-theme-type="system"
          onclick={() => selectTheme('system')}
        >System</div>
      </div>
      <div class="theme-switcher__group" role="group" aria-label="Dark themes">
        <div class="theme-switcher__group-label" role="presentation">Dark</div>
        {#each darkThemes as theme}
          <div
            class="theme-switcher__option"
            class:theme-switcher__option--active={storedTheme === theme.value}
            role="menuitemradio"
            aria-checked={storedTheme === theme.value}
            data-theme-value={theme.value}
            data-theme-bg={theme.bg}
            data-theme-accent={theme.accent}
            data-theme-label={theme.label}
            onclick={() => selectTheme(theme.value)}
            onmouseenter={() => (previewTheme = theme.value)}
          >{theme.label}</div>
        {/each}
      </div>
      <!-- Light group similar -->
    </div>
    <div class="theme-switcher__preview" data-theme-preview aria-hidden={!open}>
      <div class="theme-switcher__preview-title">Preview</div>
      <div class="theme-switcher__preview-header" data-theme-preview-label>{previewLabel}</div>
      <div class="theme-switcher__preview-swatch-wrap">
        <div class="theme-switcher__preview-swatch" data-theme-preview-swatch style="background: {previewBg}"></div>
      </div>
      <div class="theme-switcher__preview-accent" data-theme-preview-accent style="background: {previewAccent}"></div>
    </div>
  </div>
</div>`}
    language="svelte"
  />

  <h3>Keyboard navigation</h3>
  <ul>
    <li><kbd>Enter</kbd> or <kbd>Space</kbd> — Open or close menu</li>
    <li><kbd>ArrowDown</kbd> — Open menu and focus first option</li>
    <li><kbd>ArrowUp</kbd> — Open menu and focus last option</li>
    <li><kbd>ArrowDown</kbd> / <kbd>ArrowUp</kbd> — Move between options</li>
    <li><kbd>Home</kbd> / <kbd>End</kbd> — First or last option</li>
    <li><kbd>Enter</kbd> or <kbd>Space</kbd> — Select focused theme</li>
    <li><kbd>Escape</kbd> — Close menu</li>
    <li><kbd>Tab</kbd> — Close menu and tab to next element</li>
  </ul>

  <h3>Implementing in Svelte</h3>
  <ul>
    <li><strong>Open state:</strong> e.g. <code>let open = $state(false)</code>. Toggle <code>theme-switcher__menu--open</code> on the menu and set <code>aria-expanded</code> and <code>aria-hidden</code> accordingly.</li>
    <li><strong>Current theme:</strong> Read from <code>getStoredTheme()</code> or your store; set <code>currentLabel</code> via <code>getThemeLabel(storedTheme)</code> (use resolved theme when stored value is <code>system</code>). Mark the matching option with <code>theme-switcher__option--active</code>.</li>
    <li><strong>Select theme:</strong> On option click/keyboard select, call <code>applyTheme(value)</code> (or set <code>data-theme</code> on <code>document.documentElement</code> and <code>localStorage.setItem('theme', value)</code>). Close menu and restore focus to trigger.</li>
    <li><strong>Preview on hover:</strong> Track <code>previewTheme</code> (theme id or null). On option <code>mouseenter</code>/focus, set it to that option’s <code>data-theme-value</code>; on <code>mouseleave</code>/blur from the list, set to <code>null</code> (show current). Update preview label, swatch background, and accent from the hovered option’s <code>data-theme-*</code> or from theme config. When <code>previewTheme</code> is null, show the current (resolved) theme in the preview.</li>
    <li><strong>System preference:</strong> Listen for <code>prefers-color-scheme</code> and, when stored value is <code>system</code>, call <code>applyTheme('system')</code> again to re-resolve and update the document.</li>
    <li><strong>Focus trap:</strong> When open, focus first option (or keep focus on trigger); trap Tab inside menu; on close, focus trigger.</li>
  </ul>

  <p><a href="/docs/components/theme-switcher">Full Astro Theme Switcher documentation</a> — implementation details and keyboard behavior.</p>
  <p><a href="/docs/svelte/components">← Back to Svelte components</a></p>
</section>

<style>
  .example {
    margin: var(--spacing-6) 0;
    padding: var(--spacing-4);
    background: var(--background-alt);
    border: 1px solid var(--border);
    border-radius: var(--radius-lg);
  }
  .example-title {
    font-size: var(--font-size-sm);
    font-weight: var(--font-weight-medium);
    color: var(--text-dim);
    margin-bottom: var(--spacing-3);
    text-transform: uppercase;
    letter-spacing: var(--letter-spacing-wider);
  }
  kbd {
    display: inline-block;
    padding: var(--spacing-0-125) var(--spacing-0-375);
    background-color: var(--background-alt);
    border: var(--outline-width) solid var(--border);
    border-radius: var(--radius);
    font-family: var(--font-family-mono);
    font-size: var(--font-size-xs);
    line-height: 1;
  }
</style>
