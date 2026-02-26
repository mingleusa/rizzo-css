import { useState } from 'react';
import { Settings } from './Settings';
import { Button } from './Button';

export function SettingsDemo() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button onClick={() => setOpen(true)}>Open settings</Button>
      <Settings open={open} onOpenChange={setOpen} title="Settings">
        <p style={{ padding: 'var(--spacing-3)', margin: 0 }}>Theme, font, and accessibility options. Same BEM as Astro/Svelte.</p>
      </Settings>
    </>
  );
}
