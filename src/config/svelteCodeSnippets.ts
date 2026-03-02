/**
 * Svelte code snippets for each component. Used by React/Vue doc pages
 * so FrameworkCodeTabs can show all five frameworks (Astro, Svelte, React, Vue, Vanilla).
 */
import { slugToPascal } from './reactComponents';

export function getSvelteCodeSnippet(slug: string): string {
  return SVELTE_CODE_SNIPPETS[slug] ?? getDefaultSnippet(slug);
}

function getDefaultSnippet(slug: string): string {
  const name = slugToPascal(slug);
  return `<script>
  import { ${name} } from '$lib/rizzo';
</script>

<${name} />`;
}

const SVELTE_CODE_SNIPPETS: Record<string, string> = {
  button: `<script>
  import { Button } from '$lib/rizzo';
</script>

<Button>Click me</Button>
<Button class="btn-primary">Primary</Button>
<Button class="btn-success">Success</Button>
<Button class="btn-outline">Outline</Button>`,

  alert: `<script>
  import { Alert } from '$lib/rizzo';
</script>

<Alert variant="success">Your changes have been saved.</Alert>
<Alert variant="error" dismissible>An error occurred. Please try again.</Alert>`,

  badge: `<script>
  import { Badge } from '$lib/rizzo';
</script>

<Badge>Default</Badge>
<Badge class="badge--primary">Primary</Badge>
<Badge class="badge--success">Success</Badge>`,

  'button-group': `<script>
  import { ButtonGroup } from '$lib/rizzo';
</script>

<ButtonGroup>
  <button type="button" class="btn">One</button>
  <button type="button" class="btn btn-primary">Two</button>
  <button type="button" class="btn">Three</button>
</ButtonGroup>`,

  divider: `<script>
  import { Divider } from '$lib/rizzo';
</script>

<Divider />
<Divider label="OR" />
<Divider orientation="vertical" />`,

  spinner: `<script>
  import { Spinner } from '$lib/rizzo';
</script>

<Spinner />
<Spinner class="spinner--success spinner--lg" />`,

  kbd: `<script>
  import { Kbd } from '$lib/rizzo';
</script>

<p>Press <Kbd>Ctrl</Kbd>+<Kbd>K</Kbd> to open search.</p>`,

  label: `<script>
  import { Label } from '$lib/rizzo';
</script>

<Label for="email">Email</Label>
<input id="email" type="email" class="form-input" />`,

  empty: `<script>
  import { Empty } from '$lib/rizzo';
</script>

<Empty title="No results" description="Try adjusting your search." />`,

  'aspect-ratio': `<script>
  import { AspectRatio } from '$lib/rizzo';
</script>

<AspectRatio ratio={16/9}>
  <img src="/poster.jpg" alt="" />
</AspectRatio>`,

  skeleton: `<script>
  import { Skeleton } from '$lib/rizzo';
</script>

<Skeleton />
<Skeleton variant="text" />`,

  avatar: `<script>
  import { Avatar } from '$lib/rizzo';
</script>

<Avatar name="Jane Doe" />
<Avatar src="/photo.jpg" alt="Jane" />`,

  'progress-bar': `<script>
  import { ProgressBar } from '$lib/rizzo';
</script>

<ProgressBar value={60} max={100} showLabel />`,

  breadcrumb: `<script>
  import { Breadcrumb } from '$lib/rizzo';
</script>

<Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'Docs', href: '/docs' }, { label: 'Current' }]} />`,

  forms: `<script>
  import { FormGroup, Input } from '$lib/rizzo';
</script>

<FormGroup label="Email" for="email">
  <Input id="email" type="email" placeholder="you@example.com" />
</FormGroup>`,

  'input-group': `<script>
  import { InputGroup } from '$lib/rizzo';
</script>

<InputGroup prefix="$" suffix="USD" placeholder="0.00" ariaLabel="Amount" />`,

  separator: `<script>
  import { Separator } from '$lib/rizzo';
</script>

<Separator />
<Separator orientation="vertical" />`,

  carousel: `<script>
  import { Carousel } from '$lib/rizzo';
</script>

<Carousel label="Slides">
  <div class="carousel__slide"><h4>Slide 1</h4><p>First slide content.</p></div>
  <div class="carousel__slide"><h4>Slide 2</h4><p>Second slide content.</p></div>
  <div class="carousel__slide"><h4>Slide 3</h4><p>Third slide content.</p></div>
</Carousel>`,
};
