/**
 * Astro code snippets for each component. Used by React/Vue doc pages
 * so FrameworkCodeTabs can show all five frameworks (Astro, Svelte, React, Vue, Vanilla).
 */
import { REACT_COMPONENT_SLUGS, slugToPascal } from './reactComponents';

export function getAstroCodeSnippet(slug: string): string {
  return ASTRO_CODE_SNIPPETS[slug] ?? getDefaultSnippet(slug);
}

function getDefaultSnippet(slug: string): string {
  const name = slugToPascal(slug);
  return `---
import ${name} from '../components/rizzo/${name}.astro';
---

<${name} />`;
}

const ASTRO_CODE_SNIPPETS: Record<string, string> = {
  button: `---
import Button from '../components/rizzo/Button.astro';
---

<Button>Click me</Button>
<Button class="btn-primary">Primary</Button>
<Button class="btn-success">Success</Button>
<Button class="btn-outline">Outline</Button>`,

  alert: `---
import Alert from '../components/rizzo/Alert.astro';
---

<Alert variant="success">Your changes have been saved.</Alert>
<Alert variant="error" dismissible>An error occurred. Please try again.</Alert>`,

  badge: `---
import Badge from '../components/rizzo/Badge.astro';
---

<Badge>Default</Badge>
<Badge class="badge--primary">Primary</Badge>
<Badge class="badge--success">Success</Badge>`,

  'button-group': `---
import ButtonGroup from '../components/rizzo/ButtonGroup.astro';
---

<ButtonGroup>
  <button type="button" class="btn">One</button>
  <button type="button" class="btn btn-primary">Two</button>
  <button type="button" class="btn">Three</button>
</ButtonGroup>`,

  divider: `---
import Divider from '../components/rizzo/Divider.astro';
---

<Divider />
<Divider label="OR" />
<Divider orientation="vertical" />`,

  spinner: `---
import Spinner from '../components/rizzo/Spinner.astro';
---

<Spinner />
<Spinner class="spinner--success spinner--lg" />`,

  kbd: `---
import Kbd from '../components/rizzo/Kbd.astro';
---

<p>Press <Kbd>Ctrl</Kbd>+<Kbd>K</Kbd> to open search.</p>`,

  label: `---
import Label from '../components/rizzo/Label.astro';
---

<Label for="email">Email</Label>
<input id="email" type="email" class="form-input" />`,

  empty: `---
import Empty from '../components/rizzo/Empty.astro';
---

<Empty title="No results" description="Try adjusting your search." />`,

  'aspect-ratio': `---
import AspectRatio from '../components/rizzo/AspectRatio.astro';
---

<AspectRatio ratio="16/9">
  <img src="/poster.jpg" alt="" />
</AspectRatio>`,

  skeleton: `---
import Skeleton from '../components/rizzo/Skeleton.astro';
---

<Skeleton />
<Skeleton variant="text" />`,

  avatar: `---
import Avatar from '../components/rizzo/Avatar.astro';
---

<Avatar name="Jane Doe" />
<Avatar src="/photo.jpg" alt="Jane" />`,

  'progress-bar': `---
import ProgressBar from '../components/rizzo/ProgressBar.astro';
---

<ProgressBar value={60} max={100} showLabel />`,

  breadcrumb: `---
import Breadcrumb from '../components/rizzo/Breadcrumb.astro';
---

<Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'Docs', href: '/docs' }, { label: 'Current' }]} />`,

  forms: `---
import FormGroup from '../components/rizzo/FormGroup.astro';
import Input from '../components/rizzo/Input.astro';
---

<FormGroup label="Email" for="email">
  <Input id="email" type="email" placeholder="you@example.com" />
</FormGroup>`,

  'input-group': `---
import InputGroup from '../components/rizzo/InputGroup.astro';
---

<InputGroup prefix="$" suffix="USD" placeholder="0.00" ariaLabel="Amount" />`,

  separator: `---
import Separator from '../components/rizzo/Separator.astro';
---

<Separator />
<Separator orientation="vertical" />`,

  carousel: `---
import Carousel from '../components/rizzo/Carousel.astro';
---

<Carousel label="Slides">
  <div class="carousel__slide"><h4>Slide 1</h4><p>First slide content.</p></div>
  <div class="carousel__slide"><h4>Slide 2</h4><p>Second slide content.</p></div>
  <div class="carousel__slide"><h4>Slide 3</h4><p>Third slide content.</p></div>
</Carousel>`,
};
