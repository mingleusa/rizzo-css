<script lang="ts">
  import SoundEffects from '../../SoundEffects.svelte';
  import AddComponentTabs from '../AddComponentTabs.svelte';
</script>

<section>
  <h2>Sound Effects component</h2>
  <p>Toggle for “Play sound on click”. When enabled, a short click sound (Web Audio) plays on buttons and links. <strong>Off by default</strong>. Same behavior as the <a href="/docs/components/sound-effects">Astro SoundEffects</a>: persists in <code>localStorage</code> (key <code>soundEffects</code>). The actual sound is played by a global script in the layout.</p>
  <AddComponentTabs componentName="Sound Effects" />

  <h3>Live example</h3>
  <div class="example">
    <div class="example-title">Live Example</div>
    <p>Enable the toggle, then click any button or link to hear the sound:</p>
    <SoundEffects />
  </div>

  <p><a href="/docs/components/sound-effects">Full Astro Sound Effects documentation</a> · <a href="/docs/vanilla/components/sound-effects">Vanilla</a></p>
</section>
