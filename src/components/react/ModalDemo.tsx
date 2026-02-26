import { useState } from 'react';
import { Modal } from './Modal';
import { Button } from './Button';

/** Wrapper for doc demo: trigger button + modal with open state. */
export function ModalDemo() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button onClick={() => setOpen(true)}>Open modal</Button>
      <Modal open={open} onOpenChange={setOpen} title="Modal title">
        <p>Modal body content. Use the close button or Escape to close.</p>
      </Modal>
    </>
  );
}
