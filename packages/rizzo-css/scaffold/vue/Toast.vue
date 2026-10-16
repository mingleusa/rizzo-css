<script setup lang="ts">
import Alert from './Alert.vue';

withDefaults(
  defineProps<{
    variant?: 'success' | 'error' | 'warning' | 'info';
    dismissible?: boolean;
    /** Auto-dismiss after this many milliseconds (0 = never). */
    autoDismiss?: number;
    position?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left' | 'top-center' | 'bottom-center';
    id?: string;
  }>(),
  { variant: 'info', dismissible: true, autoDismiss: 5000, position: 'top-right' }
);
const emit = defineEmits<{ dismiss: [] }>();
</script>

<template>
  <div :class="['toast', `toast--${position}`]" data-toast-container>
    <Alert :variant="variant" :dismissible="dismissible" :auto-dismiss="autoDismiss" :id="id" @dismiss="emit('dismiss')">
      <slot />
    </Alert>
  </div>
</template>
