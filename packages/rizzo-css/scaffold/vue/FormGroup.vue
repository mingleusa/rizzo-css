<script setup lang="ts">
defineProps({
  label: { type: String, default: undefined },
  labelFor: { type: String, default: undefined },
  required: { type: Boolean, default: false },
  help: { type: String, default: undefined },
  error: { type: String, default: undefined },
  success: { type: String, default: undefined },
  class: { type: String, default: '' },
});
</script>

<template>
  <div :class="['form-group', $props.class].filter(Boolean).join(' ')">
    <label
      v-if="label && labelFor"
      :for="labelFor"
      :class="['form-group__label', required ? 'required' : ''].filter(Boolean).join(' ')"
    >
      {{ label }}
    </label>
    <span
      v-else-if="label"
      :class="['form-group__label', required ? 'required' : ''].filter(Boolean).join(' ')"
    >
      {{ label }}
    </span>
    <slot />
    <span v-if="help" :id="labelFor && help ? `${labelFor}-help` : undefined" class="form-group__help">
      {{ help }}
    </span>
    <span
      v-if="error"
      :id="labelFor && error ? `${labelFor}-error` : undefined"
      class="form-error"
      role="alert"
    >
      {{ error }}
    </span>
    <span v-if="success" class="form-success" role="status">{{ success }}</span>
  </div>
</template>
