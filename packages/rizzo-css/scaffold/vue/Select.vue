<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    id?: string;
    name?: string;
    modelValue?: string;
    required?: boolean;
    disabled?: boolean;
    size?: 'sm' | 'md' | 'lg';
    error?: boolean;
    success?: boolean;
    class?: string;
    ariaDescribedby?: string;
    ariaInvalid?: boolean | 'true' | 'false';
  }>(),
  {
    modelValue: '',
    required: false,
    disabled: false,
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
</script>

<template>
  <select
    :id="id"
    :name="name"
    :value="modelValue"
    :required="required"
    :disabled="disabled"
    :class="classes"
    :aria-invalid="(error || ariaInvalid === true || ariaInvalid === 'true') ? 'true' : 'false'"
    :aria-describedby="ariaDescribedby"
    @change="emit('update:modelValue', ($event.target as HTMLSelectElement).value)"
  >
    <slot />
  </select>
</template>
