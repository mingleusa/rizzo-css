<script setup lang="ts">
withDefaults(
  defineProps<{
    label?: string;
    labelFor?: string;
    required?: boolean;
    help?: string;
    error?: string;
    success?: string;
    class?: string;
  }>(),
  { required: false, class: '' }
);
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
