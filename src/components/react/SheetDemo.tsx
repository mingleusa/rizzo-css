import { useState } from 'react';
import { Sheet } from './Sheet';
import { Button } from './Button';

export function SheetDemo() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button onClick={() => setOpen(true)}>Open sheet</Button>
      <Sheet open={open} onOpenChange={setOpen} title="Panel" side="right">
        <p>Sheet content. Same BEM as Astro and Svelte.</p>
      </Sheet>
    </>
  );
}
