<script setup lang="ts">
import { onMounted, ref } from 'vue';

withDefaults(defineProps<{ showHelp?: boolean }>(), { showHelp: true });

const soundEffects = ref(false);

onMounted(() => {
  try {
    soundEffects.value = localStorage.getItem('soundEffects') === 'true';
  } catch {
    soundEffects.value = false;
  }
});

function onChange(e: Event) {
  const checked = (e.target as HTMLInputElement).checked;
  soundEffects.value = checked;
  try {
    localStorage.setItem('soundEffects', checked ? 'true' : 'false');
  } catch {
    /* storage unavailable */
  }
  if (checked) window.dispatchEvent(new CustomEvent('rizzo-sound-effects-change'));
}
</script>

<template>
  <div data-sound-effects-wrapper>
    <label class="settings__checkbox-label">
      <input
        type="checkbox"
        class="settings__checkbox"
        aria-label="Play sound on click"
        :checked="soundEffects"
        @change="onChange"
      />
      <span>Play sound on click</span>
    </label>
    <p v-if="showHelp" class="settings__help-text">
      Short click sound when you interact with buttons and links. Off by default.
    </p>
  </div>
</template>
