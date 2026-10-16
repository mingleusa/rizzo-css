<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref, useId } from 'vue';

const props = withDefaults(
  defineProps<{
    variant?: 'success' | 'error' | 'warning' | 'info';
    dismissible?: boolean;
    /** Auto-dismiss after this many milliseconds (0 = never). */
    autoDismiss?: number;
    id?: string;
  }>(),
  { variant: 'info', dismissible: false, autoDismiss: 0 }
);
const emit = defineEmits<{ dismiss: [] }>();

const visible = ref(true);
const generatedId = useId();
const alertId = computed(() => props.id ?? `alert-${generatedId}`);

const ariaLabels: Record<string, string> = {
  success: 'Success message',
  error: 'Error message',
  warning: 'Warning message',
  info: 'Information message',
};

let timer: ReturnType<typeof setTimeout> | null = null;

function dismiss() {
  visible.value = false;
  if (timer) clearTimeout(timer);
  emit('dismiss');
}

onMounted(() => {
  if (props.autoDismiss > 0) timer = setTimeout(dismiss, props.autoDismiss);
});
onBeforeUnmount(() => {
  if (timer) clearTimeout(timer);
});
</script>

<template>
  <div
    v-if="visible"
    :class="['alert', `alert--${variant}`]"
    :id="alertId"
    role="alert"
    aria-live="polite"
    aria-atomic="true"
    :aria-label="ariaLabels[variant]"
  >
    <div class="alert__content">
      <slot />
    </div>
    <button
      v-if="dismissible"
      type="button"
      class="alert__close"
      aria-label="Dismiss alert"
      :aria-controls="alertId"
      @click="dismiss"
    >
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
        <path d="M18 6L6 18M6 6l12 12" />
      </svg>
    </button>
  </div>
</template>
