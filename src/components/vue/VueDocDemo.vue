<script setup>
import { computed } from 'vue';
import { getVueComponent } from './registry.js';

const props = defineProps({
  slug: { type: String, required: true },
});

const Component = computed(() => getVueComponent(props.slug));

// Props passed to Vue component demos. Only include props the Vue component actually accepts (many are slot-only).
function demoPropsForSlug(slug) {
  const map = {
    spinner: { label: 'Loading…' },
    forms: { placeholder: 'Enter text…' },
    'input-group': { ariaLabel: 'Amount', placeholder: '0.00' },
    cards: { variant: 'elevated' },
  };
  return map[slug] || {};
}

const demoProps = computed(() => demoPropsForSlug(props.slug));
</script>

<template>
  <div class="vue-doc-demo">
    <component v-if="Component" :is="Component" v-bind="demoProps">
      <template v-if="slug === 'button'" #default>Default</template>
      <template v-else-if="slug === 'badge'" #default>Badge</template>
    </component>
    <div v-else class="vue-doc-demo-placeholder">
      <p>{{ slug }} — Vue component demo (component not found).</p>
    </div>
  </div>
</template>

<style scoped>
.vue-doc-demo {
  min-height: 2rem;
}
.vue-doc-demo-placeholder {
  padding: var(--spacing-4);
  background: var(--background-alt);
  border: 1px dashed var(--border);
  border-radius: var(--radius-md);
  color: var(--text-dim);
}
</style>
