<script lang="ts">
  import FontSwitcher from '../../FontSwitcher.svelte';
  import AddComponentTabs from '../AddComponentTabs.svelte';
</script>

<section>
  <h2>Font Switcher component</h2>
  <p>Font pair (sans + mono) dropdown with preview and keyboard navigation. Same behavior as the <a href="/docs/components/font-switcher">Astro FontSwitcher</a>: sets <code>--font-family</code> and <code>--font-family-mono</code> on <code>&lt;html&gt;</code>, persists in <code>localStorage</code> (key <code>fontPair</code>).</p>
  <AddComponentTabs componentName="Font Switcher" />

  <h3>Live example</h3>
  <div class="example">
    <div class="example-title">Live Example</div>
    <p>Try switching font pairs below (Svelte component):</p>
    <FontSwitcher idPrefix="doc" />
  </div>

  <h3>Features</h3>
  <ul>
    <li>Dropdown lists all font pairs; body text uses sans, code blocks use mono.</li>
    <li><strong>Preview panel</strong> — When the menu is open, hover or focus an option to see a preview of that pair.</li>
    <li>Persists selection in <code>localStorage</code> (<code>fontPair</code>).</li>
    <li>Full keyboard navigation (Enter/Space to open/close, Arrow keys, Escape).</li>
  </ul>

  <h3>Key BEM classes</h3>
  <ul>
    <li><code>font-switcher</code> — root; <code>data-font-switcher</code>.</li>
    <li><code>font-switcher__trigger</code> — button; <code>aria-expanded</code>, <code>aria-controls</code> = menu id.</li>
    <li><code>font-switcher__label</code> — current pair label; <code>data-font-pair-label</code>.</li>
    <li><code>font-switcher__menu</code> — dropdown; <code>font-switcher__menu--open</code> when open.</li>
    <li><code>font-switcher__option</code> — one pair; <code>data-font-pair-value</code>, <code>data-font-pair-sans</code>, <code>data-font-pair-mono</code>, <code>data-font-pair-label</code>. Add <code>font-switcher__option--active</code> when selected.</li>
    <li><code>font-switcher__preview</code> — preview panel; <code>data-font-preview</code>.</li>
  </ul>

  <p><a href="/docs/components/font-switcher">Full Astro Font Switcher documentation</a> — usage, keyboard behavior, and font config.</p>
  <p><a href="/docs/vanilla/components/font-switcher">Vanilla Font Switcher</a> — copyable HTML and live example.</p>
</section>
