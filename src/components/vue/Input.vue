<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    type?: string;
    id?: string;
    name?: string;
    modelValue?: string;
    placeholder?: string;
    required?: boolean;
    disabled?: boolean;
    readonly?: boolean;
    size?: 'sm' | 'md' | 'lg';
    error?: boolean;
    success?: boolean;
    class?: string;
    ariaLabel?: string;
    ariaDescribedby?: string;
    ariaInvalid?: boolean | 'true' | 'false';
  }>(),
  {
    type: 'text',
    modelValue: '',
    required: false,
    disabled: false,
    readonly: false,
    size: 'md',
    error: false,
    success: false,
    class: '',
  }
);

const emit = defineEmits<{ (e: 'update:modelValue', value: string): void }>();

const sizeClass = props.size !== 'md' ? `form-input--${props.size}` : '';
const errorClass = props.error ? 'form-input--error' : '';
const successClass = props.success ? 'form-input--success' : '';
const classes = ['form-input', sizeClass, errorClass, successClass, props.class]
  .filter(Boolean)
  .join(' ')
  .trim();
const invalid = props.error || props.ariaInvalid === true || props.ariaInvalid === 'true';
</script>

<template>
  <input
    :type="type"
    :id="id"
    :name="name"
    :value="modelValue"
    :placeholder="placeholder"
    :required="required"
    :disabled="disabled"
    :readonly="readonly"
    :class="classes"
    :aria-label="ariaLabel"
    :aria-invalid="invalid ? 'true' : 'false'"
    :aria-describedby="ariaDescribedby"
    @input="emit('update:modelValue', ($event.target as HTMLInputElement).value)"
  />
</template>
