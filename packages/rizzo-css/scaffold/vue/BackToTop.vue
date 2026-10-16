<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue';

const props = withDefaults(
  defineProps<{
    /** Scroll threshold in pixels before the button appears. */
    threshold?: number;
    /** Accessible label for the button. */
    label?: string;
  }>(),
  { threshold: 400, label: 'Back to top' }
);

const visible = ref(false);

function update() {
  visible.value = window.scrollY > props.threshold;
}

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

onMounted(() => {
  window.addEventListener('scroll', update, { passive: true });
  update();
});
onBeforeUnmount(() => window.removeEventListener('scroll', update));
</script>

<template>
  <div
    class="back-to-top"
    data-back-to-top
    :data-visible="visible ? 'true' : 'false'"
    :aria-hidden="visible ? 'false' : 'true'"
  >
    <button type="button" class="back-to-top__btn" :aria-label="label" @click="scrollToTop">
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
</template>
