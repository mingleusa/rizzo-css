<script lang="ts">
  interface Props {
    /** Scroll threshold in pixels before the button appears (default: 400). */
    threshold?: number;
    /** Accessible label for the button (default: "Back to top"). */
    label?: string;
    class?: string;
  }
  let { threshold = 400, label = 'Back to top', class: className = '' }: Props = $props();

  let visible = $state(false);

  function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  $effect(() => {
    const handler = () => {
      visible = window.scrollY > threshold;
    };
    window.addEventListener('scroll', handler, { passive: true });
    handler();
    return () => window.removeEventListener('scroll', handler);
  });

  const wrapperClass = $derived(['back-to-top', className].filter(Boolean).join(' ').trim());
</script>

<div
  class={wrapperClass}
  data-back-to-top
  data-visible={visible ? 'true' : 'false'}
  aria-hidden={visible ? 'false' : 'true'}
>
  <button type="button" class="back-to-top__btn" aria-label={label} onclick={scrollToTop}>
    <span class="back-to-top__icon" aria-hidden="true">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        class="icon"
        aria-hidden="true"
      >
        <path d="m18 15-6-6-6 6" />
      </svg>
    </span>
  </button>
</div>
