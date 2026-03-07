import { useState } from 'react';
import { Modal } from './Modal';
import { Button } from './Button';

/** Doc demo: same design as Astro — title "Modal title", trigger "Open modal", content "Modal content." */
export function ModalDemo() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button onClick={() => setOpen(true)}>Open modal</Button>
      <Modal open={open} onOpenChange={setOpen} title="Modal title">
        <p>Modal content.</p>
      </Modal>
    </>
  );
}
