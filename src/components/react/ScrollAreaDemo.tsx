import { ScrollArea } from './ScrollArea';

export function ScrollAreaDemo() {
  return (
    <ScrollArea orientation="vertical" style={{ maxHeight: '120px' }}>
      <div style={{ padding: 'var(--spacing-3)' }}>
        <p>Scrollable content. Same BEM as Astro and Svelte.</p>
        <p>Line 2</p>
        <p>Line 3</p>
        <p>Line 4</p>
        <p>Line 5</p>
      </div>
    </ScrollArea>
  );
}
