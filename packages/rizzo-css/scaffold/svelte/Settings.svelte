<script lang="ts">
  interface Props {
    open?: boolean;
  }
  let { open = false }: Props = $props();
</script>

<div class="settings" data-settings aria-hidden={!open}>
  <div class="settings__overlay" data-settings-overlay aria-hidden={!open}></div>
  <div
    class="settings__panel"
    role="dialog"
    aria-modal="true"
    aria-labelledby="settings-title"
    aria-hidden={!open}
  >
    <div class="settings__header">
      <h2 id="settings-title" class="settings__title">Settings</h2>
      <button type="button" class="settings__close" data-settings-close aria-label="Close">×</button>
    </div>
    <div class="settings__content">
      <p>Theme, font size, and accessibility options. Wire to your state and <code>window.openSettings</code>.</p>
    </div>
  </div>
</div>
