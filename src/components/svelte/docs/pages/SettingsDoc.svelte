<script lang="ts">
  import CodeBlock from '../CodeBlock.svelte';
</script>

<section>
  <h2>Settings component</h2>
  <p>Settings panel with theme switcher, font size control, and accessibility options (reduce motion, high contrast, scrollbar style). All settings persist in <code>localStorage</code>. The docs site uses the <strong>Astro</strong> Settings component in the layout. In a Svelte app, apply the same BEM classes and wire your state to the same CSS.</p>

  <h3>Structure (BEM)</h3>
  <p>Panel wrapper and sections. Use <code>data-theme</code> and the same theme IDs as in <code>src/config/themes.ts</code> for the theme switcher.</p>
  <CodeBlock
    code={`<div class="settings-panel" role="dialog" aria-label="Settings">
  <div class="settings-panel__backdrop" aria-hidden="true"></div>
  <div class="settings-panel__drawer">
    <header class="settings-panel__header">
      <h2 class="settings-panel__title">Settings</h2>
      <button type="button" class="settings-panel__close" aria-label="Close">×</button>
    </header>
    <div class="settings-panel__body">
      <section class="settings-panel__section"><!-- Theme switcher --></section>
      <section class="settings-panel__section"><!-- Font size, reduce motion, etc. --></section>
    </div>
  </div>
</div>`}
    language="html"
  />

  <p><a href="/docs/components/settings">Astro Settings documentation</a> — panel layout and persistence.</p>
  <p><a href="/docs/svelte/components">← Back to Svelte components</a></p>
</section>
