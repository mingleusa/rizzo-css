<script setup lang="ts">
const props = defineProps({
  id: { type: String, default: undefined },
  name: { type: String, default: undefined },
  modelValue: { type: String, default: '' },
  placeholder: { type: String, default: undefined },
  required: { type: Boolean, default: false },
  disabled: { type: Boolean, default: false },
  readonly: { type: Boolean, default: false },
  rows: { type: Number, default: 4 },
  cols: { type: Number, default: undefined },
  size: { type: String, default: 'md' },
  error: { type: Boolean, default: false },
  success: { type: Boolean, default: false },
  class: { type: String, default: '' },
  ariaDescribedby: { type: String, default: undefined },
  ariaInvalid: { type: [Boolean, String], default: false },
});

const emit = defineEmits(['update:modelValue']);

const sizeClass = props.size !== 'md' ? `form-input--${props.size}` : '';
const errorClass = props.error ? 'form-input--error' : '';
const successClass = props.success ? 'form-input--success' : '';
const classes = ['form-input', sizeClass, errorClass, successClass, props.class]
  .filter(Boolean)
  .join(' ')
  .trim();
</script>

<template>
  <textarea
    :id="id"
    :name="name"
    :value="modelValue"
    :placeholder="placeholder"
    :required="required"
    :disabled="disabled"
    :readonly="readonly"
    :rows="rows"
    :cols="cols"
    :class="classes"
    :aria-invalid="(error || ariaInvalid === true || ariaInvalid === 'true') ? 'true' : 'false'"
    :aria-describedby="ariaDescribedby"
    @input="emit('update:modelValue', ($event.target as HTMLTextAreaElement).value)"
  />
</template>
