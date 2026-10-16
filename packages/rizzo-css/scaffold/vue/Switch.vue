<script setup lang="ts">
defineProps<{ id?: string; name?: string; disabled?: boolean; label?: string }>();

/** `v-model:checked` */
const checked = defineModel<boolean>('checked', { default: false });
</script>

<template>
  <label class="switch" :for="id">
    <input
      v-model="checked"
      type="checkbox"
      :id="id"
      :name="name"
      :disabled="disabled"
      class="switch__input"
      role="switch"
      :aria-checked="checked"
    />
    <span class="switch__track" aria-hidden="true">
      <span class="switch__thumb"></span>
    </span>
    <span v-if="label" class="switch__label">{{ label }}</span>
  </label>
</template>
