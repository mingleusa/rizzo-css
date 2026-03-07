import { useState } from 'react';
import { Popover } from './Popover';
import { Button } from './Button';

export function PopoverDemo() {
  const [open, setOpen] = useState(false);
  return (
    <Popover open={open} onOpenChange={setOpen} trigger={<Button>Open</Button>}>
      <p style={{ padding: 'var(--spacing-3)', margin: 0 }}>Popover content.</p>
    </Popover>
  );
}
