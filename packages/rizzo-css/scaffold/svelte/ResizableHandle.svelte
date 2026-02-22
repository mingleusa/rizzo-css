<script lang="ts">
  interface Props {
    withHandle?: boolean;
    class?: string;
  }

  let { withHandle = false, class: className = '' }: Props = $props();
</script>

<div
  class="resizable__handle {withHandle ? 'resizable__handle--with-handle' : ''} {className}"
  data-resizable-handle
></div>
