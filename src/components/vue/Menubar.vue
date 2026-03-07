<script setup lang="ts">
import { ref, watch } from 'vue';

interface MenubarMenuItem {
  label: string;
  href?: string;
}

interface MenubarItem {
  label: string;
  menu: MenubarMenuItem[];
}

const props = withDefaults(
  defineProps<{ items?: MenubarItem[]; class?: string }>(),
  {
    items: () => [
      { label: 'File', menu: [{ label: 'New', href: '#' }, { label: 'Open', href: '#' }] },
      { label: 'Edit', menu: [{ label: 'Undo', href: '#' }] },
    ],
    class: '',
  }
);

const openIndex = ref<number | null>(null);

function close(e?: MouseEvent) {
  if (e && navRef.value && navRef.value.contains(e.target as Node)) return;
  openIndex.value = null;
}

const navRef = ref<HTMLElement | null>(null);

watch(openIndex, (val) => {
  if (val === null) return;
  const onClose = (e: MouseEvent) => close(e);
  const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') openIndex.value = null; };
  setTimeout(() => document.addEventListener('click', onClose), 0);
  document.addEventListener('keydown', onKey);
  return () => {
    document.removeEventListener('click', onClose);
    document.removeEventListener('keydown', onKey);
  };
});
</script>

<template>
  <nav
    ref="navRef"
    :class="['menubar', props.class].filter(Boolean).join(' ')"
    role="menubar"
    aria-label="Main menu"
  >
    <div v-for="(item, i) in items" :key="item.label" class="menubar__item" role="none">
      <button
        type="button"
        role="menuitem"
        class="menubar__trigger"
        aria-haspopup="true"
        :aria-expanded="openIndex === i"
        @click.stop="openIndex = openIndex === i ? null : i"
      >
        {{ item.label }}
      </button>
      <div
        class="menubar__menu"
        role="menu"
        :aria-label="item.label"
        :hidden="openIndex !== i"
      >
        <template v-for="entry in item.menu" :key="entry.label">
          <a
            v-if="entry.href"
            :href="entry.href"
            class="menubar__menu-item"
            role="menuitem"
          >
            {{ entry.label }}
          </a>
          <button
            v-else
            type="button"
            class="menubar__menu-item"
            role="menuitem"
            @click="openIndex = null"
          >
            {{ entry.label }}
          </button>
        </template>
      </div>
    </div>
  </nav>
</template>
