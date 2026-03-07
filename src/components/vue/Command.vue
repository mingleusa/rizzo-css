<script setup lang="ts">
import { ref, computed, watch, onMounted, onUnmounted } from 'vue';

interface CommandItem {
  id: string;
  label: string;
  shortcut?: string;
}

const props = withDefaults(
  defineProps<{
    triggerLabel?: string;
    searchPlaceholder?: string;
    items?: CommandItem[];
    class?: string;
  }>(),
  {
    triggerLabel: 'Open command palette (⌘K)',
    searchPlaceholder: 'Search…',
    items: () => [],
    class: '',
  }
);

const emit = defineEmits<{ select: [id: string] }>();

const open = ref(false);
const query = ref('');
const selectedIndex = ref(0);

const filtered = computed(() =>
  props.items.filter((item) => item.label.toLowerCase().includes(query.value.toLowerCase()))
);

watch(filtered, () => { selectedIndex.value = 0; });

function close() {
  open.value = false;
  query.value = '';
  selectedIndex.value = 0;
}

function onSelect(id: string) {
  emit('select', id);
  close();
}

function onKey(e: KeyboardEvent) {
  if (e.key === 'Escape') close();
  if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
    e.preventDefault();
    open.value = !open.value;
  }
}

onMounted(() => document.addEventListener('keydown', onKey));
onUnmounted(() => document.removeEventListener('keydown', onKey));
</script>

<template>
  <div :class="['command-root', props.class].filter(Boolean).join(' ')">
    <button
      type="button"
      class="btn btn-outline"
      @click="open = true"
      aria-haspopup="dialog"
      :aria-expanded="open"
    >
      {{ triggerLabel }}
    </button>
    <template v-if="open">
      <div class="command__overlay" aria-hidden="false" @click="close" />
      <div class="command__dialog" role="dialog" aria-modal="true" aria-label="Command palette">
        <div class="command__search-wrap">
          <input
            v-model="query"
            type="search"
            class="command__search"
            :placeholder="searchPlaceholder"
            autocomplete="off"
            autofocus
          />
        </div>
        <div class="command__list" role="listbox">
          <button
            v-for="(item, i) in filtered"
            :key="item.id"
            type="button"
            class="command__item"
            role="option"
            :aria-selected="i === selectedIndex"
            @click="onSelect(item.id)"
            @mouseenter="selectedIndex = i"
          >
            {{ item.label }}
            <kbd v-if="item.shortcut">{{ item.shortcut }}</kbd>
          </button>
        </div>
      </div>
    </template>
  </div>
</template>
