<script lang="ts">
  import CodeBlock from '$lib/rizzo-docs/CodeBlock.svelte';

  function showToastGlobal(message: string, options?: { variant?: string; position?: string; autoDismiss?: number }) {
    if (typeof window !== 'undefined' && (window as any).showToast) {
      (window as any).showToast(message, options);
    }
  }

  function removeAllToastsGlobal() {
    if (typeof window !== 'undefined' && (window as any).removeAllToasts) {
      (window as any).removeAllToasts();
    }
  }
</script>

<section>
  <h2>Toast component</h2>
  <p>Fixed-position notifications (success, error, warning, info). Use the <strong>Toast</strong> component for a single static toast, or the <strong>programmatic API</strong> (<code>showToast</code>, <code>removeToast</code>, <code>removeAllToasts</code>) for dynamic toasts. Same BEM and behavior as the Astro/docs site.</p>

  <h3>Features</h3>
  <ul>
    <li>Six positions: top-right, top-left, top-center, bottom-right, bottom-left, bottom-center</li>
    <li>Variants: success, error, warning, info (same as Alert)</li>
    <li>Auto-dismiss with configurable duration (default 5s); set to <code>0</code> to disable</li>
    <li>Dismissible with close button (default: true)</li>
    <li>Multiple toasts stack vertically in the same position</li>
    <li>Smooth slide-in/out (respects <code>prefers-reduced-motion</code>)</li>
    <li>ARIA (<code>role="alert"</code>, <code>aria-live="polite"</code>)</li>
    <li>Theme-aware; full width on mobile</li>
  </ul>

  <h3>Programmatic API</h3>
  <p>Import the toast utility and call it from Svelte (e.g. in an event handler or after a mutation):</p>
  <CodeBlock
    code={`import { showToast, removeToast, removeAllToasts } from '../utils/toast';

// Show a toast (returns toast id)
const id = showToast('Saved!', { variant: 'success' });

// With options
showToast('Error occurred', {
  variant: 'error',
  position: 'top-right',
  autoDismiss: 5000,
  dismissible: true
});

// Remove by id
removeToast(id);

// Remove all toasts
removeAllToasts();`}
    language="javascript"
  />
  <p>On the docs site, <code>window.showToast</code>, <code>window.removeToast</code>, and <code>window.removeAllToasts</code> are also available (injected by the layout).</p>

  <h3>Live examples (programmatic)</h3>
  <div class="example">
    <div class="example-title">Show toasts</div>
    <div class="example-buttons">
      <button type="button" class="btn btn-success" onclick={() => showToastGlobal('Success! Your changes have been saved.', { variant: 'success' })}>Success</button>
      <button type="button" class="btn btn-error" onclick={() => showToastGlobal('Something went wrong.', { variant: 'error' })}>Error</button>
      <button type="button" class="btn btn-warning" onclick={() => showToastGlobal('Please review.', { variant: 'warning' })}>Warning</button>
      <button type="button" class="btn btn-info" onclick={() => showToastGlobal('New features available.', { variant: 'info' })}>Info</button>
      <button type="button" class="btn" onclick={() => removeAllToastsGlobal()}>Clear all</button>
    </div>
  </div>

  <h3>Positions</h3>
  <div class="example">
    <div class="example-title">Position examples</div>
    <div class="example-buttons">
      <button type="button" class="btn btn-primary" onclick={() => showToastGlobal('Top right', { position: 'top-right' })}>Top right</button>
      <button type="button" class="btn btn-primary" onclick={() => showToastGlobal('Top left', { position: 'top-left' })}>Top left</button>
      <button type="button" class="btn btn-primary" onclick={() => showToastGlobal('Bottom right', { position: 'bottom-right' })}>Bottom right</button>
      <button type="button" class="btn btn-primary" onclick={() => showToastGlobal('Bottom left', { position: 'bottom-left' })}>Bottom left</button>
    </div>
  </div>

  <h3>Static Toast component</h3>
  <p>For a single toast rendered in the template (e.g. a fixed “Saved” message in a form section), use the Toast component. It wraps Alert with toast positioning. Use it when the toast is part of your layout; for one-off messages use the programmatic API above.</p>
  <div class="example">
    <div class="example-title">Static Toast (top-right, dismissible, 5s auto-dismiss)</div>
    <p>Click to show the same toast via the static component pattern (no toast on page load):</p>
    <button type="button" class="btn btn-success" onclick={() => showToastGlobal('Changes saved.', { variant: 'success', autoDismiss: 5000 })}>Show “Changes saved” toast</button>
  </div>

  <h3>Toast options</h3>
  <ul>
    <li><code>variant</code> — <code>success</code>, <code>error</code>, <code>warning</code>, <code>info</code> (default: <code>info</code>)</li>
    <li><code>dismissible</code> — Show close button (default: <code>true</code>)</li>
    <li><code>autoDismiss</code> — Duration in ms; <code>0</code> to disable (default: <code>5000</code>)</li>
    <li><code>position</code> — <code>top-right</code>, <code>top-left</code>, <code>top-center</code>, <code>bottom-right</code>, <code>bottom-left</code>, <code>bottom-center</code> (default: <code>top-right</code>)</li>
    <li><code>id</code> — Optional id for the toast (for <code>removeToast(id)</code>)</li>
  </ul>

  <h3>Key BEM classes</h3>
  <ul>
    <li><strong>Static wrapper:</strong> <code>toast</code>, <code>toast--top-right</code> (etc.); <code>data-toast-container</code>. Contains an Alert.</li>
    <li><strong>Programmatic container:</strong> <code>toast-container</code>, <code>toast-container--top-right</code> (etc.). Created by <code>showToast()</code>; holds elements with class <code>alert alert--{'{variant}'}</code> (same as Alert component).</li>
  </ul>

  <h3>Usage (Svelte)</h3>
  <CodeBlock
    code={`<script>
  import Toast from './components/svelte/Toast.svelte';
  import { showToast, removeToast, removeAllToasts } from './utils/toast';

  function onSave() {
    saveData();
    showToast('Saved!', { variant: 'success' });
  }
</script>

<!-- Static toast -->
<Toast variant="success" dismissible autoDismiss={5000} position="top-right">
  Changes saved.
</Toast>

<!-- Or programmatic only -->
<button onclick={onSave}>Save</button>`}
    language="svelte"
  />

  <p><a href="/docs/components/toast">Full Astro Toast documentation</a> — options and programmatic API.</p>
  <p><a href="/docs/svelte/components">← Back to Svelte components</a></p>
</section>

<style>
  .example-buttons {
    display: flex;
    flex-wrap: wrap;
    gap: var(--spacing-3);
  }
</style>
