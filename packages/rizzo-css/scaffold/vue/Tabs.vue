<script setup lang="ts">
import { computed, ref, useId } from 'vue';

export interface Tab {
  id: string;
  label: string;
  /** Optional icon URL (e.g. /icons/devicons/Npm.svg) shown before the label */
  icon?: string;
  /** HTML string for the panel; omit it to use the default slot (scoped with `activeTabId`) */
  content?: string;
}

const props = withDefaults(
  defineProps<{
    tabs: Tab[];
    id?: string;
    defaultTab?: string;
    variant?: 'default' | 'pills' | 'underline';
  }>(),
  { variant: 'default' }
);
const emit = defineEmits<{ change: [tabId: string] }>();

const generatedId = useId();
const tabsId = computed(() => props.id ?? `tabs-${generatedId}`);
const selectedId = ref<string | null>(null);
const activeTabId = computed(() => selectedId.value ?? props.defaultTab ?? props.tabs[0]?.id ?? '');
const tabListEl = ref<HTMLElement | null>(null);

function activate(index: number) {
  const tab = props.tabs[index];
  if (!tab) return;
  selectedId.value = tab.id;
  emit('change', tab.id);
}

function onKeydown(e: KeyboardEvent, index: number) {
  const count = props.tabs.length;
  let target = index;
  switch (e.key) {
    case 'ArrowRight':
    case 'ArrowDown':
      target = (index + 1) % count;
      break;
    case 'ArrowLeft':
    case 'ArrowUp':
      target = index === 0 ? count - 1 : index - 1;
      break;
    case 'Home':
      target = 0;
      break;
    case 'End':
      target = count - 1;
      break;
    case 'Enter':
    case ' ':
      e.preventDefault();
      activate(index);
      return;
    default:
      return;
  }
  e.preventDefault();
  activate(target);
  tabListEl.value?.querySelectorAll<HTMLElement>('[role="tab"]')[target]?.focus();
}
</script>

<template>
  <div :class="['tabs', { [`tabs--${variant}`]: variant !== 'default' }]" :data-tabs="tabsId">
    <div ref="tabListEl" class="tabs__list" role="tablist" aria-label="Tabs">
      <span
        v-for="(tab, index) in tabs"
        :key="tab.id"
        :class="['tabs__tab', { 'tabs__tab--active': tab.id === activeTabId }]"
        :id="`${tabsId}-tab-${tab.id}`"
        role="tab"
        :tabindex="tab.id === activeTabId ? 0 : -1"
        :aria-selected="tab.id === activeTabId ? 'true' : 'false'"
        :aria-controls="`${tabsId}-panel-${tab.id}`"
        :data-tab-id="tab.id"
        :data-tab-index="index"
        @click="activate(index)"
        @keydown="onKeydown($event, index)"
      >
        <img v-if="tab.icon" :src="tab.icon" alt="" class="tabs__tab-icon" width="20" height="20" loading="lazy" aria-hidden="true" />
        {{ tab.label }}
      </span>
    </div>

    <div class="tabs__panels-wrapper">
      <div
        v-for="(tab, index) in tabs"
        :key="tab.id"
        :class="['tabs__panel', { 'tabs__panel--active': tab.id === activeTabId }]"
        :id="`${tabsId}-panel-${tab.id}`"
        role="tabpanel"
        :aria-labelledby="`${tabsId}-tab-${tab.id}`"
        :aria-hidden="tab.id === activeTabId ? 'false' : 'true'"
        :data-panel-id="tab.id"
        :data-panel-index="index"
      >
        <!-- eslint-disable-next-line vue/no-v-html -->
        <div v-if="tab.content" class="tabs__panel-content" v-html="tab.content"></div>
        <slot v-else-if="tab.id === activeTabId" :active-tab-id="activeTabId" />
      </div>
    </div>
  </div>
</template>
