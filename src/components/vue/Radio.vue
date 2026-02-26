<script setup lang="ts">
withDefaults(
  defineProps<{
    id?: string;
    name?: string;
    value?: string;
    required?: boolean;
    disabled?: boolean;
    class?: string;
    ariaDescribedby?: string;
    ariaLabel?: string;
  }>(),
  { value: '', required: false, disabled: false, class: '' }
);
</script>

<template>
  <input
    type="radio"
    :id="id"
    :name="name"
    :value="value"
    :required="required"
    :disabled="disabled"
    :class="$props.class"
    :aria-describedby="ariaDescribedby"
    :aria-label="ariaLabel"
  />
</template>
