<script setup lang="ts">
import { ref, computed, watch, onMounted } from 'vue';

const props = withDefaults(
  defineProps<{
    id?: string;
    label?: string;
    showIndicators?: boolean;
    class?: string;
  }>(),
  { label: 'Carousel', showIndicators: true, class: '' }
);

const id = computed(() => props.id ?? `carousel-${Math.random().toString(36).slice(2, 9)}`);
const rootClass = computed(() => ['carousel', props.class].filter(Boolean).join(' '));

const viewportRef = ref<HTMLDivElement | null>(null);
const trackRef = ref<HTMLDivElement | null>(null);
const index = ref(0);
const total = ref(0);
const indices = computed(() => Array.from({ length: total.value }, (_, i) => i));

function updateTotal() {
  if (!trackRef.value) return;
  const slides = trackRef.value.querySelectorAll('.carousel__slide');
  total.value = slides.length;
}

function goTo(i: number) {
  index.value = Math.max(0, Math.min(i, total.value - 1));
}

function updateTransform() {
  if (!viewportRef.value || !trackRef.value || total.value === 0) return;
  const w = viewportRef.value.offsetWidth;
  trackRef.value.style.transform = `translateX(${-index.value * w}px)`;
}

onMounted(() => {
  updateTotal();
  updateTransform();
});

watch([index, total], updateTransform);
watch(trackRef, () => {
  updateTotal();
}, { flush: 'post' });
</script>

<template>
  <div
    :id="id"
    :class="rootClass"
    role="region"
    aria-roledescription="carousel"
    :aria-label="label"
    data-carousel
  >
    <div ref="viewportRef" class="carousel__viewport" data-carousel-viewport>
      <div ref="trackRef" class="carousel__track" data-carousel-track>
        <slot />
      </div>
    </div>

    <div class="carousel__controls">
      <button
        type="button"
        class="carousel__prev"
        aria-label="Previous slide"
        :disabled="index === 0"
        @click="goTo(index - 1)"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m15 18-6-6 6-6"/></svg>
      </button>

      <div v-if="showIndicators && total > 0" class="carousel__indicators" role="tablist" aria-label="Slide indicators">
        <button
          v-for="i in indices"
          :key="i"
          type="button"
          role="tab"
          :aria-label="`Slide ${i + 1}`"
          :aria-selected="i === index"
          class="carousel__indicator"
          @click="goTo(i)"
        />
      </div>

      <button
        type="button"
        class="carousel__next"
        aria-label="Next slide"
        :disabled="index >= total - 1"
        @click="goTo(index + 1)"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m9 18 6-6-6-6"/></svg>
      </button>
    </div>
  </div>
</template>
