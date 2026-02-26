<script setup lang="ts">
defineProps<{
  id?: string;
  name?: string;
  value?: string;
  modelValue?: boolean;
  required?: boolean;
  disabled?: boolean;
  class?: string;
  ariaDescribedby?: string;
  ariaLabel?: string;
}>();

const emit = defineEmits<{ (e: 'update:modelValue', value: boolean): void }>();
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
