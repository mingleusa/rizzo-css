<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    modelValue?: string;
    id?: string;
    name?: string;
    type?: string;
    placeholder?: string;
    /** Accessible name for the input (satisfies axe label rule) */
    ariaLabel?: string;
    required?: boolean;
    disabled?: boolean;
    readonly?: boolean;
    error?: boolean;
    success?: boolean;
    class?: string;
  }>(),
  {
    modelValue: '',
    type: 'text',
    ariaLabel: undefined,
    required: false,
    disabled: false,
    readonly: false,
    error: false,
    success: false,
    class: '',
  }
);

const emit = defineEmits<{ (e: 'update:modelValue', value: string): void }>();

const rootClass = [
  'input-group',
  props.error && 'input-group--error',
  props.success && 'input-group--success',
  props.class,
]
  .filter(Boolean)
  .join(' ')
  .trim();

const inputId = props.id ?? `input-group-${Math.random().toString(36).slice(2, 9)}`;
</script>

<template>
  <div :class="rootClass">
    <div class="input-group__wrapper">
      <span v-if="$slots.prefix" class="input-group__addon input-group__addon--prefix" aria-hidden="true">
        <slot name="prefix" />
      </span>
      <input
        :id="inputId"
        :name="name"
        :type="type"
        :value="modelValue"
        :placeholder="placeholder"
        :aria-label="ariaLabel"
        :required="required"
        :disabled="disabled"
        :readonly="readonly"
        class="input-group__input"
        :aria-invalid="error ? 'true' : undefined"
        @input="emit('update:modelValue', ($event.target as HTMLInputElement).value)"
      />
      <span v-if="$slots.suffix" class="input-group__addon input-group__addon--suffix" aria-hidden="true">
        <slot name="suffix" />
      </span>
    </div>
  </div>
</template>
