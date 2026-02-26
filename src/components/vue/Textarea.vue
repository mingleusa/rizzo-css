<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    id?: string;
    name?: string;
    modelValue?: string;
    placeholder?: string;
    required?: boolean;
    disabled?: boolean;
    readonly?: boolean;
    rows?: number;
    cols?: number;
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
    readonly: false,
    rows: 4,
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
