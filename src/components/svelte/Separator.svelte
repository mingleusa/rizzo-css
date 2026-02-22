<script lang="ts">
  interface Props {
    orientation?: 'horizontal' | 'vertical';
    class?: string;
  }

  let { orientation = 'horizontal', class: className = '' }: Props = $props();
</script>

<div
  class="separator separator--{orientation} {className}"
  role="separator"
  aria-orientation={orientation}
></div>
