<script lang="ts">
  import CodeBlock from '../CodeBlock.svelte';
</script>

<section>
  <h2>Theme Switcher component</h2>
  <p>Accessible theme dropdown with <strong>Preference</strong> (System), <strong>Dark themes</strong>, and <strong>Light themes</strong> sections, a unique icon per theme, and a preview panel. The preview is always visible when the menu is open (on viewports &gt;480px): it shows the <strong>current</strong> theme by default and updates to the <strong>hovered</strong> theme on hover/focus; only the word “Preview” stays fixed. Theme data is in <code>src/config/themes.ts</code>; use the same CSS and theme IDs (<code>data-theme</code>) in Svelte.</p>

  <h3>Structure (BEM)</h3>
  <p>Apply the selected theme by setting <code>data-theme="theme-id"</code> on <code>&lt;html&gt;</code>. Use theme utilities (<code>applyTheme</code>, <code>getThemeLabel</code>) from <code>src/utils/theme.ts</code> or the same IDs as in the Astro docs. The full dropdown uses <code>theme-switcher__menu</code>, <code>theme-switcher__menu-options</code>, and <code>theme-switcher__preview</code> (with <code>theme-switcher__preview-title</code>, <code>theme-switcher__preview-header</code>, swatch, and accent bar).</p>
  <CodeBlock
    code={`<div class="theme-switcher" data-theme-switcher>
  <button type="button" class="theme-switcher__trigger" aria-haspopup="listbox" aria-expanded="false">
    <span class="theme-switcher__label-wrapper">
      <span class="theme-switcher__label">Theme</span>
    </span>
    <span class="theme-switcher__icon" aria-hidden="true">...</span>
  </button>
  <div class="theme-switcher__menu" role="listbox">
    <div class="theme-switcher__menu-options">
      <!-- Preference: System; Dark group; Light group -->
    </div>
    <div class="theme-switcher__preview">
      <div class="theme-switcher__preview-title">Preview</div>
      <div class="theme-switcher__preview-header">Theme name</div>
      <div class="theme-switcher__preview-swatch-wrap">...</div>
      <div class="theme-switcher__preview-accent"></div>
    </div>
  </div>
</div>`}
    language="html"
  />

  <p><a href="/docs/components/theme-switcher">Astro Theme Switcher documentation</a> — full implementation, usage, and keyboard support.</p>
  <p><a href="/docs/svelte/components">← Back to Svelte components</a></p>
</section>
