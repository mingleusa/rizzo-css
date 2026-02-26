import { useState } from 'react';
import { HoverCard } from './HoverCard';
import { Button } from './Button';

export function HoverCardDemo() {
  const [open, setOpen] = useState(false);
  return (
    <HoverCard open={open} onOpenChange={setOpen} trigger={<Button variant="outline">Hover me</Button>}>
      <p style={{ padding: 'var(--spacing-3)', margin: 0, minWidth: '160px' }}>Hover card content.</p>
    </HoverCard>
  );
}
