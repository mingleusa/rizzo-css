<script lang="ts">
  import type { Snippet } from 'svelte';
  import Alert from './Alert.svelte';

  interface Props {
    variant?: 'success' | 'error' | 'warning' | 'info';
    dismissible?: boolean;
    autoDismiss?: number;
    position?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left' | 'top-center' | 'bottom-center';
    class?: string;
    id?: string;
    children?: Snippet;
  }

  let {
    variant = 'info',
    dismissible = true,
    autoDismiss = 5000,
    position = 'top-right',
    class: className = '',
    id,
    children,
  }: Props = $props();

  const positionClass = $derived(`toast--${position}`);
  const classes = $derived(['toast', positionClass, className].filter(Boolean).join(' ').trim());
</script>

<div class={classes} data-toast-container>
  <Alert {variant} {dismissible} {autoDismiss} {id}>
    {@render children?.()}
  </Alert>
</div>
