import { REACT_COMPONENT_SLUGS } from './reactComponents';

export function getReactDocStaticPaths() {
  return REACT_COMPONENT_SLUGS.map((componentSlug) => ({
    params: { slug: `components/${componentSlug}` },
  }));
}

export function getVueDocStaticPaths() {
  return REACT_COMPONENT_SLUGS.map((componentSlug) => ({
    params: { slug: `components/${componentSlug}` },
  }));
}
