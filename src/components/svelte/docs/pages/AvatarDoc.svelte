<script lang="ts">
  import AvatarComponent from '../../Avatar.svelte';
  import CodeBlock from '../CodeBlock.svelte';
</script>

<section>
  <h2>Avatar component</h2>
  <p>Accessible avatar: profile image when provided, or initials from <code>name</code> / <code>initials</code>. Sizes (sm, md, lg) and shape (circle, square). BEM: <code>avatar</code>, <code>avatar--sm</code>/<code>md</code>/<code>lg</code>, <code>avatar--circle</code>/<code>square</code>.</p>

  <h3>Props</h3>
  <ul>
    <li><code>src</code> (string, optional) — Image URL</li>
    <li><code>alt</code> (string, optional) — Alt text for the image</li>
    <li><code>name</code> (string, optional) — Full name for initials (e.g. "Jane Doe" → "JD")</li>
    <li><code>initials</code> (string, optional) — Override initials; ignored if <code>name</code> is set</li>
    <li><code>size</code> (string, optional) — <code>sm</code>, <code>md</code>, <code>lg</code> (default: md)</li>
    <li><code>shape</code> (string, optional) — <code>circle</code>, <code>square</code> (default: circle)</li>
    <li><code>class</code> (string, optional) — Additional CSS classes</li>
  </ul>

  <h3>Initials (basic)</h3>
  <div class="example">
    <div class="example-title">Live examples</div>
    <div class="example-row">
      <AvatarComponent name="Jane Doe" />
      <AvatarComponent name="Alice" />
      <AvatarComponent initials="AB" />
    </div>
  </div>

  <h3>Sizes</h3>
  <div class="example">
    <div class="example-title">Live examples</div>
    <div class="example-row">
      <AvatarComponent name="Jane Doe" size="sm" />
      <AvatarComponent name="Jane Doe" size="md" />
      <AvatarComponent name="Jane Doe" size="lg" />
    </div>
  </div>

  <h3>Shape</h3>
  <p>Use <code>shape="square"</code> for a rounded square; default is <code>circle</code>.</p>
  <div class="example">
    <div class="example-title">Live examples</div>
    <div class="example-row">
      <AvatarComponent name="Jane Doe" shape="circle" />
      <AvatarComponent name="Jane Doe" shape="square" />
    </div>
  </div>

  <h3>With image</h3>
  <p>Pass <code>src</code> and <code>alt</code> for a profile image (lazy-loaded, <code>object-fit: cover</code>).</p>
  <div class="example">
    <div class="example-title">Live example (placeholder)</div>
    <div class="example-row">
      <AvatarComponent
        src="https://api.dicebear.com/7.x/initials/svg?seed=Jane"
        alt="Jane Doe"
        size="md"
      />
      <AvatarComponent
        src="https://api.dicebear.com/7.x/initials/svg?seed=Alice"
        alt="Alice"
        size="lg"
      />
    </div>
  </div>

  <h3>Usage</h3>
  <CodeBlock
    code={`<script>
  import Avatar from '@rizzo-css/svelte/Avatar.svelte';
</script>

<Avatar name="Jane Doe" />
<Avatar name="Alice" />
<Avatar initials="AB" />
<Avatar name="Jane Doe" size="sm" />
<Avatar name="Jane Doe" shape="square" />
<Avatar src="/photo.jpg" alt="Jane Doe" size="md" />`}
    language="svelte"
  />
</section>

<style>
  .example-row {
    display: flex;
    flex-wrap: wrap;
    gap: var(--spacing-4);
    align-items: center;
  }
</style>
