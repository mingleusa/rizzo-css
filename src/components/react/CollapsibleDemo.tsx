import { Collapsible } from './Collapsible';

/** Wrapper for doc demo: Collapsible with default content. */
export function CollapsibleDemo() {
  return (
    <Collapsible triggerLabel="Show more" defaultOpen={false}>
      <p>This content is shown when the collapsible is expanded. Use <strong>Accordion</strong> when you need multiple sections.</p>
    </Collapsible>
  );
}
