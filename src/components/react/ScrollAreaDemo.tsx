import { ScrollArea } from './ScrollArea';

export function ScrollAreaDemo() {
  return (
    <ScrollArea orientation="vertical" style={{ maxHeight: '200px' }}>
      <div>Scrollable content here.</div>
    </ScrollArea>
  );
}
