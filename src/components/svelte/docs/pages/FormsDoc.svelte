<script lang="ts">
  import FormGroup from '../../FormGroup.svelte';
  import Input from '../../Input.svelte';
  import Checkbox from '../../Checkbox.svelte';
  import Textarea from '../../Textarea.svelte';
  import Select from '../../Select.svelte';
  import Radio from '../../Radio.svelte';
  import CodeBlock from '../CodeBlock.svelte';

  let paymentMethod = $state('card');
</script>

<section>
  <h2>Form Components</h2>
  <p>Rizzo CSS includes a comprehensive set of accessible form components built with semantic HTML and ARIA attributes. All form components use theme variables and support validation states.</p>
</section>

<section>
  <h2>FormGroup</h2>
  <p>The <code>FormGroup</code> component provides a wrapper for form fields with labels, help text, and error/success messages.</p>

  <h3>Props</h3>
  <ul>
    <li><code>label</code> (string, optional) - Label text</li>
    <li><code>labelFor</code> (string, optional) - ID of the input element</li>
    <li><code>required</code> (boolean, optional) - Shows required indicator</li>
    <li><code>help</code> (string, optional) - Help text displayed below input</li>
    <li><code>error</code> (string, optional) - Error message</li>
    <li><code>success</code> (string, optional) - Success message</li>
    <li><code>class</code> (string, optional) - Additional CSS classes</li>
  </ul>

  <div class="example">
    <div class="example-title">Live Example</div>
    <FormGroup label="Email Address" labelFor="email-example" required help="We'll never share your email">
      <Input type="email" id="email-example" name="email" placeholder="you@example.com" />
    </FormGroup>
  </div>

  <h3>Code Example</h3>
  <CodeBlock
    code={`<script>
  import FormGroup from './components/svelte/FormGroup.svelte';
  import Input from './components/svelte/Input.svelte';
</script>

<FormGroup label="Email Address" labelFor="email" required help="We'll never share your email">
  <Input id="email" type="email" name="email" placeholder="you@example.com" />
</FormGroup>`}
    language="svelte"
  />
</section>

<section>
  <h2>Input</h2>
  <p>The <code>Input</code> component supports various input types with validation states and sizes.</p>

  <h3>Props</h3>
  <ul>
    <li><code>type</code> (string, optional) - Input type (text, email, password, number, tel, url, search, date, time, datetime-local, month, week)</li>
    <li><code>id</code>, <code>name</code>, <code>value</code>, <code>placeholder</code>, <code>required</code>, <code>disabled</code>, <code>readonly</code></li>
    <li><code>size</code> ('sm' | 'md' | 'lg', optional) - Input size (default: 'md')</li>
    <li><code>error</code> (boolean, optional) - Error state</li>
    <li><code>success</code> (boolean, optional) - Success state</li>
  </ul>

  <h3>Input Types</h3>
  <div class="example">
    <div class="example-title">Live Examples</div>
    <FormGroup label="Text Input" labelFor="text-input">
      <Input type="text" id="text-input" name="text" placeholder="Enter text" />
    </FormGroup>
    <FormGroup label="Email Input" labelFor="email-input">
      <Input type="email" id="email-input" name="email" placeholder="you@example.com" />
    </FormGroup>
    <FormGroup label="Password Input" labelFor="password-input">
      <Input type="password" id="password-input" name="password" placeholder="Enter password" />
    </FormGroup>
    <FormGroup label="Number Input" labelFor="number-input">
      <Input type="number" id="number-input" name="number" placeholder="Enter number" />
    </FormGroup>
  </div>

  <h3>Input Sizes</h3>
  <div class="example">
    <div class="example-title">Live Examples</div>
    <FormGroup label="Small Input" labelFor="input-sm">
      <Input type="text" id="input-sm" name="input-sm" size="sm" placeholder="Small input" />
    </FormGroup>
    <FormGroup label="Medium Input (default)" labelFor="input-md">
      <Input type="text" id="input-md" name="input-md" size="md" placeholder="Medium input" />
    </FormGroup>
    <FormGroup label="Large Input" labelFor="input-lg">
      <Input type="text" id="input-lg" name="input-lg" size="lg" placeholder="Large input" />
    </FormGroup>
  </div>

  <h3>Validation States</h3>
  <div class="example">
    <div class="example-title">Live Examples</div>
    <FormGroup label="Error State" labelFor="input-error" error="This field is required">
      <Input type="text" id="input-error" name="input-error" error placeholder="Enter text" />
    </FormGroup>
    <FormGroup label="Success State" labelFor="input-success" success="Looks good!">
      <Input type="text" id="input-success" name="input-success" success value="Valid input" />
    </FormGroup>
  </div>

  <h3>Code Example</h3>
  <CodeBlock
    code={`<FormGroup label="Email" labelFor="email" required>
  <Input id="email" type="email" name="email" placeholder="you@example.com" />
</FormGroup>

<!-- With error state -->
<FormGroup label="Email" labelFor="email-error" error="Invalid email address">
  <Input id="email-error" type="email" name="email" error />
</FormGroup>`}
    language="svelte"
  />
</section>

<section>
  <h2>Textarea</h2>
  <p>The <code>Textarea</code> component for multi-line text input.</p>

  <h3>Props</h3>
  <ul>
    <li><code>id</code>, <code>name</code>, <code>value</code>, <code>placeholder</code>, <code>required</code>, <code>disabled</code>, <code>readonly</code></li>
    <li><code>rows</code> (number, optional) - Number of rows (default: 4)</li>
    <li><code>cols</code> (number, optional) - Number of columns</li>
    <li><code>size</code>, <code>error</code>, <code>success</code> - Same as Input</li>
  </ul>

  <div class="example">
    <div class="example-title">Live Example</div>
    <FormGroup label="Message" labelFor="textarea-example" help="Enter your message here">
      <Textarea id="textarea-example" name="message" rows={5} placeholder="Your message..." />
    </FormGroup>
  </div>

  <h3>Code Example</h3>
  <CodeBlock
    code={`<FormGroup label="Message" labelFor="message" help="Enter your message here">
  <Textarea id="message" name="message" rows={5} placeholder="Your message..." />
</FormGroup>`}
    language="svelte"
  />
</section>

<section>
  <h2>Select</h2>
  <p>The <code>Select</code> component for dropdown selections.</p>

  <h3>Props</h3>
  <ul>
    <li><code>id</code>, <code>name</code>, <code>value</code>, <code>required</code>, <code>disabled</code></li>
    <li><code>size</code>, <code>error</code>, <code>success</code> - Same as Input</li>
  </ul>

  <div class="example">
    <div class="example-title">Live Example</div>
    <FormGroup label="Country" labelFor="select-example" required>
      <Select id="select-example" name="country">
        <option value="">Select a country</option>
        <option value="us">United States</option>
        <option value="ca">Canada</option>
        <option value="uk">United Kingdom</option>
        <option value="au">Australia</option>
      </Select>
    </FormGroup>
  </div>

  <h3>Code Example</h3>
  <CodeBlock
    code={`<FormGroup label="Country" labelFor="country" required>
  <Select id="country" name="country">
    <option value="">Select a country</option>
    <option value="us">United States</option>
    <option value="ca">Canada</option>
    <option value="uk">United Kingdom</option>
  </Select>
</FormGroup>`}
    language="svelte"
  />
</section>

<section>
  <h2>Checkbox</h2>
  <p>The <code>Checkbox</code> component for single or multiple selections.</p>

  <h3>Props</h3>
  <ul>
    <li><code>id</code>, <code>name</code>, <code>value</code>, <code>checked</code>, <code>required</code>, <code>disabled</code></li>
    <li><code>ariaLabel</code> (string, optional) - Accessible label</li>
    <li><code>ariaDescribedby</code> (string, optional) - ID of element that describes this checkbox</li>
  </ul>

  <div class="example">
    <div class="example-title">Live Examples</div>
    <FormGroup label="Preferences">
      <div class="checkbox-group">
        <label class="checkbox-label">
          <Checkbox id="newsletter" name="preferences" value="newsletter" />
          Subscribe to newsletter
        </label>
        <label class="checkbox-label">
          <Checkbox id="updates" name="preferences" value="updates" />
          Receive product updates
        </label>
        <label class="checkbox-label">
          <Checkbox id="marketing" name="preferences" value="marketing" />
          Marketing communications
        </label>
      </div>
    </FormGroup>
  </div>

  <h3>Code Example</h3>
  <CodeBlock
    code={`<label class="checkbox-label">
  <Checkbox id="newsletter" name="preferences" value="newsletter" />
  Subscribe to newsletter
</label>

<!-- Checkbox Group -->
<div class="checkbox-group">
  <label class="checkbox-label">
    <Checkbox id="opt1" name="options" value="1" />
    Option 1
  </label>
  <label class="checkbox-label">
    <Checkbox id="opt2" name="options" value="2" />
    Option 2
  </label>
</div>`}
    language="svelte"
  />
</section>

<section>
  <h2>Radio</h2>
  <p>The <code>Radio</code> component for single selection from multiple options.</p>

  <h3>Props</h3>
  <ul>
    <li><code>id</code>, <code>name</code>, <code>value</code>, <code>checked</code>, <code>required</code>, <code>disabled</code></li>
    <li><code>group</code> (bindable, optional) - Bound value for the selected option (use same bound variable for all radios in the group)</li>
    <li><code>ariaLabel</code>, <code>ariaDescribedby</code> - Same as Checkbox</li>
  </ul>

  <div class="example">
    <div class="example-title">Live Example</div>
    <FormGroup label="Payment Method" required>
      <div class="radio-group">
        <label class="radio-label">
          <Radio name="payment" id="payment-card" value="card" bind:group={paymentMethod} />
          Credit Card
        </label>
        <label class="radio-label">
          <Radio name="payment" id="payment-paypal" value="paypal" bind:group={paymentMethod} />
          PayPal
        </label>
        <label class="radio-label">
          <Radio name="payment" id="payment-bank" value="bank" bind:group={paymentMethod} />
          Bank Transfer
        </label>
      </div>
    </FormGroup>
  </div>

  <h3>Code Example</h3>
  <CodeBlock
    code={`<script>
  let payment = $state('card');
</script>

<div class="radio-group">
  <label class="radio-label">
    <Radio name="payment" id="payment-card" value="card" bind:group={payment} />
    Credit Card
  </label>
  <label class="radio-label">
    <Radio name="payment" id="payment-paypal" value="paypal" bind:group={payment} />
    PayPal
  </label>
</div>`}
    language="svelte"
  />
</section>

<section>
  <h2>Complete Form Example</h2>
  <div class="example">
    <div class="example-title">Live Example</div>
    <form style="max-width: 600px;">
      <FormGroup label="Full Name" labelFor="form-name" required>
        <Input type="text" id="form-name" name="name" placeholder="John Doe" required />
      </FormGroup>

      <FormGroup label="Email Address" labelFor="form-email" required help="We'll never share your email">
        <Input type="email" id="form-email" name="email" placeholder="you@example.com" required />
      </FormGroup>

      <FormGroup label="Country" labelFor="form-country" required>
        <Select id="form-country" name="country" required>
          <option value="">Select a country</option>
          <option value="us">United States</option>
          <option value="ca">Canada</option>
          <option value="uk">United Kingdom</option>
        </Select>
      </FormGroup>

      <FormGroup label="Message" labelFor="form-message">
        <Textarea id="form-message" name="message" rows={4} placeholder="Your message..." />
      </FormGroup>

      <FormGroup>
        <label class="checkbox-label">
          <Checkbox id="form-consent" name="consent" value="yes" required />
          I agree to the terms and conditions
        </label>
      </FormGroup>

      <button type="submit" class="btn btn-primary">Submit</button>
    </form>
  </div>
</section>

<section>
  <h2>Accessibility</h2>
  <p>All form components follow accessibility best practices:</p>
  <ul>
    <li>Proper label associations using <code>for</code> and <code>id</code> attributes</li>
    <li>ARIA attributes for validation states (<code>aria-invalid</code>, <code>aria-describedby</code>)</li>
    <li>Error messages with <code>role="alert"</code> for screen readers</li>
    <li>Keyboard navigation support</li>
    <li>Focus indicators using theme accent color</li>
    <li>Required field indicators</li>
  </ul>
</section>

<section>
  <h2>Styling</h2>
  <p>All form components use semantic theme variables and automatically adapt to the selected theme. Form styles are defined in <code>src/styles/forms.css</code>.</p>

  <h3>Customization</h3>
  <p>You can customize form inputs using CSS variables or by adding custom classes:</p>
  <CodeBlock
    code={`.custom-input {
  border-radius: var(--radius-lg);
  padding: var(--spacing-4);
}`}
    language="css"
  />
  <p><strong>Astro &amp; Vanilla:</strong> <a href="/docs/components/forms">Astro</a> · <a href="/docs/vanilla/components/forms">Vanilla</a> — same BEM classes and HTML structure.</p>
</section>

<style>
  .example {
    margin: var(--spacing-6) 0;
    padding: var(--spacing-4);
    background: var(--background-alt);
    border: 1px solid var(--border);
    border-radius: var(--radius-lg);
  }
  .example-title {
    font-size: var(--font-size-sm);
    font-weight: var(--font-weight-medium);
    color: var(--text-dim);
    margin-bottom: var(--spacing-3);
    text-transform: uppercase;
    letter-spacing: var(--letter-spacing-wider);
  }
</style>
