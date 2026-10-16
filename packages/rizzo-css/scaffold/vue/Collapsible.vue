<script setup lang="ts">
import { computed, ref, useId } from 'vue';
import ChevronDown from './icons/ChevronDown.vue';

const props = withDefaults(
  defineProps<{ id?: string; defaultOpen?: boolean; triggerLabel?: string }>(),
  { defaultOpen: false, triggerLabel: 'Toggle' }
);
const emit = defineEmits<{ toggle: [open: boolean] }>();

const generatedId = useId();
const rootId = computed(() => props.id ?? `collapsible-${generatedId}`);
const triggerId = computed(() => `${rootId.value}-trigger`);
const panelId = computed(() => `${rootId.value}-panel`);
const open = ref(props.defaultOpen);

function toggle() {
  open.value = !open.value;
  emit('toggle', open.value);
}
</script>

<template>
  <div class="collapsible" data-collapsible :id="rootId">
    <button
      type="button"
      :class="['collapsible__trigger', { 'collapsible__trigger--open': open }]"
      :id="triggerId"
      :aria-expanded="open"
      :aria-controls="panelId"
      @click="toggle"
    >
      <span class="collapsible__trigger-label">{{ triggerLabel }}</span>
      <ChevronDown class="collapsible__icon" :width="16" :height="16" />
    </button>
    <div
      :class="['collapsible__panel', { 'collapsible__panel--open': open }]"
      :id="panelId"
      role="region"
      :aria-labelledby="triggerId"
      :hidden="!open"
    >
      <div class="collapsible__panel-inner">
        <slot />
      </div>
    </div>
  </div>
</template>
