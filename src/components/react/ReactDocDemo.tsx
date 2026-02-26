import { getReactComponent, getDemoProps } from './registry';

export interface ReactDocDemoProps {
  slug: string;
}

/** Renders the React component for the given slug (used by docs React [...slug].astro). */
export function ReactDocDemo({ slug }: ReactDocDemoProps) {
  const Component = getReactComponent(slug);
  const demoProps = getDemoProps(slug);
  return <Component {...demoProps} />;
}

export default ReactDocDemo;
