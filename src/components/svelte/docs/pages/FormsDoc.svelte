<script lang="ts">
  import FormGroup from '../../FormGroup.svelte';
  import Input from '../../Input.svelte';
  import Checkbox from '../../Checkbox.svelte';
  import Textarea from '../../Textarea.svelte';
  import Select from '../../Select.svelte';
  import Radio from '../../Radio.svelte';
  import CodeBlock from '../CodeBlock.svelte';

  let radioGroup = $state('b');
</script>

<section>
  <h2>Form components</h2>
  <p>Use <code>FormGroup</code> for labels, help, and error text.</p>

  <h3>Input and FormGroup</h3>
  <div class="example">
    <div class="example-title">Live examples</div>
    <FormGroup label="Email" labelFor="ex-email" help="We never share your email.">
      <Input id="ex-email" type="email" placeholder="you@example.com" />
    </FormGroup>
    <FormGroup label="Required field" labelFor="ex-required" required error="This field is required.">
      <Input id="ex-required" type="text" />
    </FormGroup>
  </div>

  <h3>Checkbox and Radio</h3>
  <div class="example">
    <div class="example-buttons">
      <FormGroup label="Accept terms" labelFor="ex-cb">
        <Checkbox id="ex-cb" />
      </FormGroup>
      <FormGroup label="Option A" labelFor="ex-r1">
        <Radio name="ex-radio" id="ex-r1" value="a" bind:group={radioGroup} />
      </FormGroup>
      <FormGroup label="Option B" labelFor="ex-r2">
        <Radio name="ex-radio" id="ex-r2" value="b" bind:group={radioGroup} />
      </FormGroup>
    </div>
  </div>

  <h3>Textarea and Select</h3>
  <div class="example">
    <FormGroup label="Message" labelFor="ex-msg">
      <Textarea id="ex-msg" placeholder="Your message" rows={3} />
    </FormGroup>
    <FormGroup label="Country" labelFor="ex-sel">
      <Select id="ex-sel">
        <option value="">Select…</option>
        <option value="us">United States</option>
        <option value="uk">United Kingdom</option>
      </Select>
    </FormGroup>
  </div>

  <h3>Usage</h3>
  <CodeBlock
    code={`<script>
  import FormGroup from '@rizzo-css/svelte/FormGroup.svelte';
  import Input from '@rizzo-css/svelte/Input.svelte';
  import Checkbox from '@rizzo-css/svelte/Checkbox.svelte';
</script>

<FormGroup label="Email" labelFor="email">
  <Input id="email" type="email" />
</FormGroup>
<Checkbox id="terms" ariaLabel="I agree" />`}
    language="svelte"
  />
</section>

<style>
  .example-buttons {
    display: flex;
    flex-wrap: wrap;
    gap: var(--spacing-4);
    align-items: flex-start;
  }
</style>
