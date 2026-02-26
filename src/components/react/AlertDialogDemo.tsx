import { useState } from 'react';
import { AlertDialog } from './AlertDialog';
import { Button } from './Button';

export function AlertDialogDemo() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button onClick={() => setOpen(true)} variant="error">
        Delete
      </Button>
      <AlertDialog
        open={open}
        onOpenChange={setOpen}
        title="Delete item?"
        description="This action cannot be undone."
        actions={
          <>
            <Button variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button variant="error" onClick={() => setOpen(false)}>
              Delete
            </Button>
          </>
        }
      />
    </>
  );
}
