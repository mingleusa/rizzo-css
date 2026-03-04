import { ReactDocShowcase } from './ReactDocShowcase';

export interface ReactDocDemoProps {
  slug: string;
}

/** Renders a full-fledged live example for the given slug (used by docs React [...slug].astro). */
export function ReactDocDemo({ slug }: ReactDocDemoProps) {
  return <ReactDocShowcase slug={slug} />;
}

export default ReactDocDemo;
