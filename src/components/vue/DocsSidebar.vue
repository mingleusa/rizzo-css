<script setup lang="ts">
import { computed } from "vue";
const props = withDefaults(defineProps<{ class?: string }>(), { class: "" });
const rootClass = computed(() => ["docs-sidebar", props.class].filter(Boolean).join(" "));
</script>

<template>
  <aside :class="rootClass" aria-label="Documentation navigation">
    <nav class="docs-sidebar__nav">
      <slot />
    </nav>
  </aside>
</template>
