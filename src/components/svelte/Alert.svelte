<script lang="ts">
  import { onMount } from 'svelte';

  interface Props {
    variant?: 'success' | 'error' | 'warning' | 'info';
    dismissible?: boolean;
    autoDismiss?: number;
    class?: string;
    id?: string;
  }
  let {
    variant = 'info',
    dismissible = false,
    autoDismiss = 0,
    class: className = '',
    id,
  }: Props = $props();

  let visible = $state(true);
  const alertId = $derived(id ?? `alert-${Math.random().toString(36).slice(2, 11)}`);
  const classes = ['alert', `alert--${variant}`, className].filter(Boolean).join(' ').trim();

  const ariaLabels: Record<string, string> = {
    success: 'Success message',
    error: 'Error message',
    warning: 'Warning message',
    info: 'Information message',
  };

  let autoDismissTimeout: ReturnType<typeof setTimeout> | null = null;

  function dismiss() {
    visible = false;
    if (autoDismissTimeout) clearTimeout(autoDismissTimeout);
  }

  onMount(() => {
    if (autoDismiss > 0) {
      autoDismissTimeout = setTimeout(dismiss, autoDismiss);
    }
    return () => {
      if (autoDismissTimeout) clearTimeout(autoDismissTimeout);
    };
  });
</script>

{#if visible}
  <div
    class={classes}
    id={alertId}
    role="alert"
    aria-live="polite"
    aria-atomic="true"
    aria-label={ariaLabels[variant]}
  >
    <div class="alert__content">
      <slot />
    </div>
    {#if dismissible}
      <button
        type="button"
        class="alert__close"
        aria-label="Dismiss alert"
        aria-controls={alertId}
        onclick={dismiss}
        onkeydown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            dismiss();
          }
        }}
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
          <title>Dismiss</title>
          <path d="M18 6L6 18M6 6l12 12" />
        </svg>
      </button>
    {/if}
  </div>
{/if}
