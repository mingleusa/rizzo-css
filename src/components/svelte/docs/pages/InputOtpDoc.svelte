<script lang="ts">
  import InputOtp from '../../InputOtp.svelte';
  import CodeBlock from '../CodeBlock.svelte';
  import AddComponentTabs from '../AddComponentTabs.svelte';
</script>

<section>
  <h2>Input OTP component</h2>
  <p>Multiple digit inputs for one-time codes. Auto-advances on input and supports paste.</p>
  <AddComponentTabs componentName="InputOtp" />
  <div class="example">
    <div class="example-title">Live example</div>
    <InputOtp length={6} ariaLabel="One-time code" />
  </div>
  <CodeBlock code={`<script>
  import { InputOtp } from '$lib/rizzo';
</script>

<InputOtp length={6} ariaLabel="One-time code" />`} language="svelte" />

  <p><strong>Other frameworks:</strong> <a href="/docs/components/input-otp">Astro</a> · <a href="/docs/vanilla/components/input-otp">Vanilla</a> · <a href="/docs/vue/components/input-otp">Vue</a> · <a href="/docs/react/components/input-otp">React</a></p>
  <p><a href="/docs/svelte/components">← Back to Svelte components</a></p>
</section>

<style>
  .example { margin: var(--spacing-6) 0; padding: var(--spacing-4); background: var(--background-alt); border: 1px solid var(--border); border-radius: var(--radius-lg); }
  .example-title { font-size: var(--font-size-sm); font-weight: var(--font-weight-medium); color: var(--text-dim); margin-bottom: var(--spacing-3); text-transform: uppercase; letter-spacing: var(--letter-spacing-wider); }
</style>
