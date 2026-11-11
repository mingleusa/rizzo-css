<script setup>
// Vue icons demo: renders every icon shipped in the package (packages/rizzo-css/scaffold/vue/icons).
const modules = import.meta.glob('../../../packages/rizzo-css/scaffold/vue/icons/*.vue', { eager: true });
const icons = Object.entries(modules)
  .map(([path, mod]) => ({ name: path.split('/').pop().replace(/\.vue$/, ''), component: mod.default }))
  .sort((a, b) => a.name.localeCompare(b.name));
</script>

<template>
  <ul class="vue-icons-demo" aria-label="Icons">
    <li v-for="icon in icons" :key="icon.name" class="vue-icons-demo__item">
      <component :is="icon.component" :width="24" :height="24" aria-hidden="true" />
      <span class="vue-icons-demo__name">{{ icon.name }}</span>
    </li>
  </ul>
</template>

<style scoped>
.vue-icons-demo {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(6.5rem, 1fr));
  gap: var(--spacing-3);
  margin: 0;
  padding: 0;
  list-style: none;
}
.vue-icons-demo__item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--spacing-2);
  padding: var(--spacing-3);
  border: var(--border-width) solid var(--border);
  border-radius: var(--radius-md);
}
.vue-icons-demo__name {
  font-size: var(--font-size-xs);
  color: var(--text-dim);
}
</style>
