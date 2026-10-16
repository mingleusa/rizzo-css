<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref, useId } from 'vue';
import ChevronDown from './icons/ChevronDown.vue';

export interface MenuItem {
  label: string;
  value?: string;
  href?: string;
  /** Called with `value ?? label` when the item is chosen (the `select` event fires too). */
  onClick?: (value: string) => void;
  disabled?: boolean;
  separator?: boolean;
  submenu?: MenuItem[];
}

const props = withDefaults(
  defineProps<{
    trigger: string;
    items: MenuItem[];
    id?: string;
    position?: 'left' | 'right';
    align?: 'start' | 'end';
  }>(),
  { position: 'left', align: 'start' }
);
const emit = defineEmits<{ select: [value: string] }>();

const generatedId = useId();
const dropdownId = computed(() => props.id ?? `dropdown-${generatedId}`);
const menuId = computed(() => `${dropdownId.value}-menu`);
const triggerId = computed(() => `${dropdownId.value}-trigger`);

const open = ref(false);
const openSubmenuIndex = ref<number | null>(null);
const menuEl = ref<HTMLElement | null>(null);
const triggerEl = ref<HTMLElement | null>(null);

function closeMenu() {
  open.value = false;
  openSubmenuIndex.value = null;
}

function toggleMenu() {
  open.value = !open.value;
  if (!open.value) openSubmenuIndex.value = null;
}

function toggleSubmenu(index: number) {
  openSubmenuIndex.value = openSubmenuIndex.value === index ? null : index;
}

function choose(item: MenuItem) {
  if (item.separator || item.disabled) return;
  if (item.href) window.location.href = item.href;
  const value = item.value ?? item.label;
  item.onClick?.(value);
  emit('select', value);
  closeMenu();
}

function onItemClick(item: MenuItem, hasSubmenu: boolean, index: number, e: MouseEvent) {
  if (item.disabled) return;
  if (hasSubmenu) {
    e.preventDefault();
    toggleSubmenu(index);
  } else {
    choose(item);
  }
}

function onItemKeydown(item: MenuItem, hasSubmenu: boolean, index: number, e: KeyboardEvent) {
  if (item.disabled) return;
  if (hasSubmenu && (e.key === 'Enter' || e.key === ' ' || e.key === 'ArrowRight')) {
    e.preventDefault();
    toggleSubmenu(index);
  } else if (!hasSubmenu && (e.key === 'Enter' || e.key === ' ')) {
    e.preventDefault();
    choose(item);
  }
}

function onTriggerKeydown(e: KeyboardEvent) {
  if (e.key === 'Enter' || e.key === ' ') {
    e.preventDefault();
    toggleMenu();
  } else if (e.key === 'ArrowDown' && !open.value) {
    e.preventDefault();
    open.value = true;
  }
}

function onLinkClick(item: MenuItem, e: MouseEvent) {
  if (item.disabled) e.preventDefault();
  else closeMenu();
}

function onDocumentKeydown(e: KeyboardEvent) {
  if (open.value && e.key === 'Escape') {
    e.preventDefault();
    closeMenu();
    triggerEl.value?.focus();
  }
}

function onDocumentClick(e: MouseEvent) {
  const target = e.target as Node;
  if (menuEl.value && triggerEl.value && !menuEl.value.contains(target) && !triggerEl.value.contains(target)) closeMenu();
}

onMounted(() => {
  document.addEventListener('keydown', onDocumentKeydown);
  document.addEventListener('click', onDocumentClick);
});
onBeforeUnmount(() => {
  document.removeEventListener('keydown', onDocumentKeydown);
  document.removeEventListener('click', onDocumentClick);
});
</script>

<template>
  <div class="dropdown" :data-dropdown="dropdownId">
    <button
      ref="triggerEl"
      type="button"
      class="dropdown__trigger"
      :id="triggerId"
      :aria-expanded="open"
      aria-haspopup="true"
      :aria-controls="menuId"
      :aria-label="trigger"
      @click="toggleMenu"
      @keydown="onTriggerKeydown"
    >
      <span class="dropdown__trigger-text">{{ trigger }}</span>
      <ChevronDown class="dropdown__icon" :width="16" :height="16" />
    </button>

    <div
      ref="menuEl"
      :class="['dropdown__menu', `dropdown__menu--${position}`, `dropdown__menu--${align}`, { 'dropdown__menu--open': open }]"
      :id="menuId"
      role="menu"
      :aria-labelledby="triggerId"
      :aria-label="`${trigger} menu`"
      aria-orientation="vertical"
      :aria-hidden="!open"
      tabindex="-1"
    >
      <template v-for="(item, index) in items" :key="index">
        <div v-if="item.separator" class="dropdown__separator" role="separator"></div>
        <div
          v-else
          :class="['dropdown__item-wrapper', { 'dropdown__item-wrapper--has-submenu': item.submenu && item.submenu.length > 0 }]"
        >
          <a
            v-if="item.href && !(item.submenu && item.submenu.length > 0)"
            :class="['dropdown__item', { 'dropdown__item--disabled': item.disabled }]"
            role="menuitem"
            :href="item.href"
            :aria-label="item.label"
            :aria-disabled="item.disabled ? 'true' : undefined"
            :tabindex="open ? 0 : -1"
            @click="onLinkClick(item, $event)"
          >
            <span>{{ item.label }}</span>
          </a>
          <div
            v-else
            :class="[
              'dropdown__item',
              { 'dropdown__item--disabled': item.disabled, 'dropdown__item--has-submenu': item.submenu && item.submenu.length > 0 },
            ]"
            role="menuitem"
            :aria-disabled="item.disabled ? 'true' : undefined"
            :aria-expanded="item.submenu && item.submenu.length > 0 ? openSubmenuIndex === index : undefined"
            :aria-haspopup="item.submenu && item.submenu.length > 0 ? 'true' : undefined"
            :tabindex="open ? 0 : -1"
            @click="onItemClick(item, !!(item.submenu && item.submenu.length > 0), index, $event)"
            @keydown="onItemKeydown(item, !!(item.submenu && item.submenu.length > 0), index, $event)"
          >
            <span>{{ item.label }}</span>
            <ChevronDown v-if="item.submenu && item.submenu.length > 0" class="dropdown__item-arrow" :width="12" :height="12" />
          </div>

          <div
            v-if="item.submenu && item.submenu.length > 0"
            :class="['dropdown__submenu', { 'dropdown__submenu--open': openSubmenuIndex === index }]"
            role="menu"
            :aria-label="`${item.label} submenu`"
            :aria-hidden="openSubmenuIndex !== index"
          >
            <template v-for="(sub, subIndex) in item.submenu" :key="subIndex">
              <div v-if="sub.separator" class="dropdown__separator" role="separator"></div>
              <a
                v-else-if="sub.href"
                :class="['dropdown__item', 'dropdown__submenu-item', { 'dropdown__item--disabled': sub.disabled }]"
                role="menuitem"
                :href="sub.href"
                :aria-label="sub.label"
                :aria-disabled="sub.disabled ? 'true' : undefined"
                @click="onLinkClick(sub, $event)"
              >
                <span>{{ sub.label }}</span>
              </a>
              <div
                v-else
                :class="['dropdown__item', 'dropdown__submenu-item', { 'dropdown__item--disabled': sub.disabled }]"
                role="menuitem"
                :aria-disabled="sub.disabled ? 'true' : undefined"
                :tabindex="open ? 0 : -1"
                @click="choose(sub)"
                @keydown.enter.space.prevent="choose(sub)"
              >
                <span>{{ sub.label }}</span>
              </div>
            </template>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>
