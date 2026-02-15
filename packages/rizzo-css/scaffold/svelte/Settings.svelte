<script lang="ts">
  interface Props {
    open?: boolean;
  }
  let { open: openProp }: Props = $props();
  let openInternal = $state(false);
  const open = $derived(openProp !== undefined ? openProp : openInternal);

  $effect(() => {
    (window as unknown as { openSettings?: () => void }).openSettings = () => {
      openInternal = true;
    };
    return () => {
      if ((window as unknown as { openSettings?: () => void }).openSettings) {
        delete (window as unknown as { openSettings?: () => void }).openSettings;
      }
    };
  });

  $effect(() => {
    if (!open) return;
    const onEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') openInternal = false;
    };
    document.addEventListener('keydown', onEscape);
    return () => document.removeEventListener('keydown', onEscape);
  });

  function close() {
    openInternal = false;
  }
</script>

<div class="settings" data-settings aria-hidden={!open}>
  <div class="settings__overlay" data-settings-overlay aria-hidden={!open} onclick={close}></div>
  <div
    class="settings__panel"
    role="dialog"
    aria-modal="true"
    aria-labelledby="settings-title"
    aria-hidden={!open}
    data-open={open ? 'true' : undefined}
  >
    <div class="settings__header">
      <h2 id="settings-title" class="settings__title">Settings</h2>
      <button type="button" class="settings__close" data-settings-close aria-label="Close settings" onclick={close}>×</button>
    </div>
    <div class="settings__content">
      <p>Theme, font size, and accessibility options. Wire to your state or use <code>window.openSettings</code>.</p>
    </div>
  </div>
</div>
