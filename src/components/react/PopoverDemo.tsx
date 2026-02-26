import { useState } from 'react';
import { Popover } from './Popover';
import { Button } from './Button';

export function PopoverDemo() {
  const [open, setOpen] = useState(false);
  return (
    <Popover open={open} onOpenChange={setOpen} trigger={<Button>Open popover</Button>}>
      <p style={{ padding: 'var(--spacing-3)', margin: 0 }}>Popover content. Same BEM as Astro and Svelte.</p>
    </Popover>
  );
}
