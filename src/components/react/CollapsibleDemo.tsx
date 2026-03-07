import { Collapsible } from './Collapsible';

/** Wrapper for doc demo: Collapsible with default content. */
export function CollapsibleDemo() {
  return (
    <Collapsible triggerLabel="Show more" defaultOpen={false}>
      <p>Hidden content here.</p>
    </Collapsible>
  );
}
