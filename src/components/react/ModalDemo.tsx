import { useState } from 'react';
import { Modal } from './Modal';
import { Button } from './Button';

/** Doc demo matching Astro standard example: Open Example Modal, body bullet list, Cancel/Confirm footer. */
export function ModalDemo() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <p style={{ marginBottom: 'var(--spacing-3)' }}>Click the button below to open a standard modal dialog:</p>
      <Button onClick={() => setOpen(true)}>Open Example Modal</Button>
      <Modal
        open={open}
        onOpenChange={setOpen}
        title="Example Modal"
        footer={
          <>
            <Button onClick={() => setOpen(false)}>Cancel</Button>
            <Button variant="primary" onClick={() => setOpen(false)}>Confirm</Button>
          </>
        }
      >
        <p>This is an example modal dialog. It demonstrates:</p>
        <ul>
          <li>Focus trapping — Tab cycles within the modal</li>
          <li>Keyboard navigation — Escape key closes the modal</li>
          <li>Backdrop overlay with blur effect</li>
          <li>Theme-aware styling</li>
        </ul>
      </Modal>
    </>
  );
}
