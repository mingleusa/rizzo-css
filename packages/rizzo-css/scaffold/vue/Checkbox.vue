<script setup lang="ts">
defineProps({
  id: { type: String, default: undefined },
  name: { type: String, default: undefined },
  value: { type: String, default: undefined },
  modelValue: { type: Boolean, default: false },
  required: { type: Boolean, default: false },
  disabled: { type: Boolean, default: false },
  class: { type: String, default: undefined },
  ariaDescribedby: { type: String, default: undefined },
  ariaLabel: { type: String, default: undefined },
});

const emit = defineEmits(['update:modelValue']);
</script>

<template>
  <input
    type="checkbox"
    :id="id"
    :name="name"
    :value="value"
    :checked="modelValue"
    :required="required"
    :disabled="disabled"
    :class="$props.class"
    :aria-describedby="ariaDescribedby"
    :aria-label="ariaLabel"
    @change="emit('update:modelValue', ($event.target as HTMLInputElement).checked)"
  />
</template>
