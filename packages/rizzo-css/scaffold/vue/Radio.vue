<script setup lang="ts">
defineProps({
  id: { type: String, default: undefined },
  name: { type: String, default: undefined },
  value: { type: String, default: '' },
  required: { type: Boolean, default: false },
  disabled: { type: Boolean, default: false },
  class: { type: String, default: '' },
  ariaDescribedby: { type: String, default: undefined },
  ariaLabel: { type: String, default: undefined },
});
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
