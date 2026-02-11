<script lang="ts">
  import CodeBlock from '../CodeBlock.svelte';
  import Gear from '../../icons/Gear.svelte';
</script>

<section>
  <h2>Settings component</h2>
  <p>Slide-in panel for theme, font size, and accessibility options. All settings persist in <code>localStorage</code>. The docs site uses the <strong>Astro</strong> Settings in the layout; open via the navbar gear or <code>window.openSettings()</code>. In a Svelte app, use the same BEM classes and wire state + persistence to match.</p>

  <h3>Live example</h3>
  <p>Open Settings via the <strong>gear icon in the navbar</strong> or the button below (same as navbar).</p>
  <div class="example">
    <div class="example-title">Open Settings</div>
    <button type="button" class="navbar__settings-btn" aria-label="Open settings" onclick={() => window.openSettings?.()}>
      <Gear class="navbar__settings-icon" width={20} height={20} />
      <span class="navbar__settings-label">Settings</span>
    </button>
  </div>

  <h3>Features</h3>
  <ul>
    <li><strong>Theme switcher</strong> — Integrated ThemeSwitcher; persists as <code>theme</code> in localStorage (e.g. <code>github-dark-classic</code>, <code>system</code>).</li>
    <li><strong>Font size slider</strong> — 75%–150%; track uses <code>--slider-progress</code>. Persists as <code>fontSizeScale</code>; apply as <code>--font-size-scale</code> on <code>html</code>.</li>
    <li><strong>Reduce motion</strong> — Toggle adds <code>.reduced-motion</code> to document root. Persists as <code>reducedMotion</code> (<code>true</code>/<code>false</code> string).</li>
    <li><strong>High contrast</strong> — Toggle adds <code>.high-contrast</code> to root. Persists as <code>highContrast</code>.</li>
    <li><strong>Scrollbar style</strong> — Radio: Thin (default), Thick, Hidden. Applies <code>.scrollbar-thick</code> or <code>.scrollbar-hidden</code> on <code>html</code>. Persists as <code>scrollbarStyle</code> (<code>thin</code>, <code>thick</code>, <code>hidden</code>).</li>
    <li>Slide-in from right with overlay; animations respect <code>prefers-reduced-motion</code>.</li>
    <li>Focus trap when open; focus returns to trigger on close. Escape closes. ARIA (dialog, labels).</li>
    <li>Mobile: full-width panel.</li>
  </ul>

  <h3>Key BEM classes and data attributes</h3>
  <ul>
    <li><code>settings</code> — root; <code>data-settings</code>. Set <code>aria-hidden</code> from open state.</li>
    <li><code>settings__overlay</code> — backdrop; <code>data-settings-overlay</code>; click to close.</li>
    <li><code>settings__panel</code> — drawer; <code>role="dialog"</code>, <code>aria-modal="true"</code>, <code>aria-labelledby="settings-title"</code>.</li>
    <li><code>settings__header</code>, <code>settings__title</code>, <code>settings__close</code> — header and close button; <code>data-settings-close</code>.</li>
    <li><code>settings__content</code> — scrollable body.</li>
    <li><code>settings__section</code>, <code>settings__section-title</code>, <code>settings__control</code> — section layout.</li>
    <li><code>settings__label</code>, <code>settings__label-text</code>, <code>settings__label-value</code> — labels; <code>data-font-size-value</code> for the percentage display.</li>
    <li><code>settings__slider</code> — range input; <code>data-font-size-slider</code>, <code>style="--slider-progress: 50%"</code> for filled track.</li>
    <li><code>settings__slider-labels</code> — e.g. Small / Default / Large.</li>
    <li><code>settings__checkbox-label</code>, <code>settings__checkbox</code> — toggles; <code>data-reduced-motion</code>, <code>data-high-contrast</code>.</li>
    <li><code>settings__radio-group</code> (role="radiogroup"), <code>settings__radio-label</code>, <code>settings__radio</code> — scrollbar options; <code>data-scrollbar-style</code>, <code>name="scrollbar-style"</code>, values <code>thin</code> / <code>thick</code> / <code>hidden</code>.</li>
    <li><code>settings__help-text</code> — description under controls.</li>
  </ul>

  <h3>Persistence (localStorage)</h3>
  <p>Read/write these keys and apply to the document so styles and theme stay in sync:</p>
  <ul>
    <li><code>theme</code> — theme id or <code>system</code>; set <code>data-theme</code> on <code>html</code>.</li>
    <li><code>fontSizeScale</code> — number string (e.g. <code>1</code>, <code>1.25</code>); set <code>style="--font-size-scale: …"</code> on <code>html</code>.</li>
    <li><code>reducedMotion</code> — <code>"true"</code> / <code>"false"</code>; add/remove <code>.reduced-motion</code> on <code>html</code>.</li>
    <li><code>highContrast</code> — <code>"true"</code> / <code>"false"</code>; add/remove <code>.high-contrast</code> on <code>html</code>.</li>
    <li><code>scrollbarStyle</code> — <code>thin</code> / <code>thick</code> / <code>hidden</code>; add <code>.scrollbar-thick</code> or <code>.scrollbar-hidden</code> on <code>html</code> when not thin.</li>
  </ul>

  <h3>Structure example (simplified)</h3>
  <CodeBlock
    code={`<div class="settings" data-settings aria-hidden={!open}>
  <div class="settings__overlay" data-settings-overlay onclick={() => (open = false)}></div>
  <div
    class="settings__panel"
    role="dialog"
    aria-modal="true"
    aria-labelledby="settings-title"
    aria-hidden={!open}
  >
    <div class="settings__header">
      <h2 id="settings-title" class="settings__title">Settings</h2>
      <button type="button" class="settings__close" aria-label="Close settings" data-settings-close onclick={() => (open = false)">×</button>
    </div>
    <div class="settings__content">
      <section class="settings__section">
        <h3 class="settings__section-title">Theme</h3>
        <div class="settings__control"><!-- ThemeSwitcher or theme list --></div>
      </section>
      <section class="settings__section">
        <h3 class="settings__section-title">Font Size</h3>
        <div class="settings__control">
          <label for="font-size-slider" class="settings__label">
            <span class="settings__label-text">Adjust text size</span>
            <span class="settings__label-value" data-font-size-value>{fontSizePercent}%</span>
          </label>
          <input type="range" id="font-size-slider" class="settings__slider" min="0.75" max="1.5" step="0.05" bind:value={fontSizeScale} style="--slider-progress: {sliderProgress}" data-font-size-slider />
          <div class="settings__slider-labels"><span>Small</span><span>Default</span><span>Large</span></div>
        </div>
      </section>
      <section class="settings__section">
        <h3 class="settings__section-title">Accessibility</h3>
        <div class="settings__control">
          <label class="settings__checkbox-label">
            <input type="checkbox" class="settings__checkbox" bind:checked={reducedMotion} data-reduced-motion />
            <span>Reduce motion</span>
          </label>
          <p class="settings__help-text">Minimize animations and transitions</p>
        </div>
        <div class="settings__control">
          <label class="settings__checkbox-label">
            <input type="checkbox" class="settings__checkbox" bind:checked={highContrast} data-high-contrast />
            <span>High contrast</span>
          </label>
          <p class="settings__help-text">Increase contrast for better visibility</p>
        </div>
        <div class="settings__control">
          <div class="settings__label"><span class="settings__label-text">Scrollbar style</span></div>
          <div class="settings__radio-group" role="radiogroup" aria-label="Scrollbar style">
            <label class="settings__radio-label">
              <input type="radio" name="scrollbar-style" value="thin" class="settings__radio" bind:group={scrollbarStyle} data-scrollbar-style />
              <span>Thin</span>
            </label>
            <label class="settings__radio-label">
              <input type="radio" name="scrollbar-style" value="thick" class="settings__radio" bind:group={scrollbarStyle} data-scrollbar-style />
              <span>Thick</span>
            </label>
            <label class="settings__radio-label">
              <input type="radio" name="scrollbar-style" value="hidden" class="settings__radio" bind:group={scrollbarStyle} data-scrollbar-style />
              <span>Hidden</span>
            </label>
          </div>
          <p class="settings__help-text">Choose your preferred scrollbar appearance</p>
        </div>
      </section>
    </div>
  </div>
</div>`}
    language="svelte"
  />

  <h3>Implementing in Svelte</h3>
  <ul>
    <li><strong>Open state:</strong> e.g. <code>let open = $state(false)</code>. Set <code>{'aria-hidden={!open}'}</code> on root, overlay, and panel. Expose <code>openSettings()</code> / <code>closeSettings()</code> (e.g. on a global or context) so the navbar can open the panel.</li>
    <li><strong>Overlay/close:</strong> Click overlay or close button → <code>{'open = false'}</code>. Escape key → close and restore focus to trigger.</li>
    <li><strong>Focus trap:</strong> When open, focus first focusable in panel; trap Tab inside; on close, focus the element that opened (e.g. settings button).</li>
    <li><strong>Persistence:</strong> On change, write to <code>localStorage</code> and update <code>html</code> (classes, <code>data-theme</code>, <code>--font-size-scale</code>). On mount, read from <code>localStorage</code> and set initial state + DOM.</li>
    <li><strong>Slider progress:</strong> Compute <code>--slider-progress</code> from <code>(value - min) / (max - min) * 100%</code> for the filled track gradient.</li>
  </ul>

  <h3>Opening from navbar</h3>
  <p>Expose a global so the navbar settings button can open the panel. In your Settings component, use <code>onMount</code> to set <code>window.openSettings</code> and <code>window.closeSettings</code> to functions that toggle your <code>{'open'}</code> state and restore focus. The Vanilla scaffold and Astro layout do the same.</p>
  <CodeBlock
    code={`// Inside your Settings component (or a parent that holds open state)
import { onMount } from 'svelte';
let open = $state(false);
onMount(() => {
  (window as any).openSettings = () => { open = true; };
  (window as any).closeSettings = () => { open = false; };
  return () => {
    delete (window as any).openSettings;
    delete (window as any).closeSettings;
  };
});`}
    language="svelte"
  />

  <p><a href="/docs/components/settings">Full Astro Settings documentation</a> — layout, persistence, and the inline script you can port to Svelte.</p>
  <p><a href="/docs/svelte/components">← Back to Svelte components</a></p>
</section>
