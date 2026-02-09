<script lang="ts">
  import Alert from './Alert.svelte';

  interface Props {
    variant?: 'success' | 'error' | 'warning' | 'info';
    dismissible?: boolean;
    autoDismiss?: number;
    position?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left' | 'top-center' | 'bottom-center';
    class?: string;
    id?: string;
  }

  let {
    variant = 'info',
    dismissible = true,
    autoDismiss = 5000,
    position = 'top-right',
    class: className = '',
    id,
  }: Props = $props();

  const positionClass = `toast--${position}`;
  const classes = ['toast', positionClass, className].filter(Boolean).join(' ').trim();
</script>

<div class={classes} data-toast-container>
  <Alert {variant} {dismissible} {autoDismiss} {id}>
    <slot />
  </Alert>
</div>
