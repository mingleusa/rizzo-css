<script setup lang="ts">
import { ref, computed, watch } from 'vue';

const props = withDefaults(
  defineProps<{ length?: number; modelValue?: string; 'aria-label'?: string; class?: string }>(),
  { length: 6, 'aria-label': 'One-time code', class: '' }
);

const emit = defineEmits<{ 'update:modelValue': [value: string] }>();

const digits = ref<string[]>(Array.from({ length: props.length }, () => ''));

watch(
  () => props.modelValue,
  (v) => {
    if (v === undefined) return;
    const arr = v.split('').slice(0, props.length);
    digits.value = Array.from({ length: props.length }, (_, i) => arr[i] ?? '');
  },
  { immediate: true }
);

const rootClass = computed(() => ['input-otp', props.class].filter(Boolean).join(' '));
const indices = computed(() => Array.from({ length: props.length }, (_, i) => i));

function handleInput(index: number, e: Event) {
  const v = (e.target as HTMLInputElement).value.replace(/\D/g, '').slice(-1);
  const next = [...digits.value];
  next[index] = v;
  digits.value = next;
  emit('update:modelValue', next.join(''));
  if (v && index < props.length - 1) {
    (document.querySelectorAll('.input-otp__digit')[index + 1] as HTMLInputElement)?.focus();
  }
}

function handleKeyDown(index: number, e: KeyboardEvent) {
  if (e.key === 'Backspace' && !digits.value[index] && index > 0) {
    (document.querySelectorAll('.input-otp__digit')[index - 1] as HTMLInputElement)?.focus();
  }
}

function handlePaste(e: ClipboardEvent) {
  e.preventDefault();
  const pasted = (e.clipboardData?.getData('text') || '').replace(/\D/g, '').slice(0, props.length);
  const next = [...digits.value];
  pasted.split('').forEach((ch, j) => {
    if (next[j] !== undefined) next[j] = ch;
  });
  digits.value = next;
  emit('update:modelValue', next.join(''));
  const focusIdx = Math.min(pasted.length, props.length) - 1;
  (document.querySelectorAll('.input-otp__digit')[focusIdx] as HTMLInputElement)?.focus();
}
</script>

<template>
  <div :class="rootClass" role="group" :aria-label="props['aria-label']">
    <input
      v-for="i in indices"
      :key="i"
      type="text"
      inputmode="numeric"
      maxlength="1"
      autocomplete="one-time-code"
      class="input-otp__digit"
      :aria-label="`Digit ${i + 1} of ${props.length}`"
      :value="digits[i]"
      @input="(e) => handleInput(i, e)"
      @keydown="(e) => handleKeyDown(i, e)"
      @paste="handlePaste"
    />
  </div>
</template>
