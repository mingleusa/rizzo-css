import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Modal } from '../components/react/Modal';
import { Button } from '../components/react/Button';

const meta: Meta<typeof Modal> = {
  title: 'Rizzo/Modal',
  component: Modal,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  argTypes: {
    size: { control: 'select', options: ['sm', 'md', 'lg'] },
    open: { control: 'boolean' },
  },
};

export default meta;

type Story = StoryObj<typeof Modal>;

function ModalTrigger({ defaultOpen = false, size = 'md' }: { defaultOpen?: boolean; size?: 'sm' | 'md' | 'lg' }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <>
      <Button onClick={() => setOpen(true)}>Open modal</Button>
      <Modal
        title="Modal title"
        open={open}
        onOpenChange={setOpen}
        size={size}
        footer={
          <Button variant="primary" onClick={() => setOpen(false)}>
            Close
          </Button>
        }
      >
        <p>Modal body content. Same BEM and behavior as Astro, Svelte, Vue, Vanilla.</p>
      </Modal>
    </>
  );
}

export const Closed: Story = {
  render: () => <ModalTrigger defaultOpen={false} />,
};

export const Open: Story = {
  render: () => <ModalTrigger defaultOpen={true} />,
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
      <ModalTrigger defaultOpen={false} size="sm" />
      <ModalTrigger defaultOpen={false} size="md" />
      <ModalTrigger defaultOpen={false} size="lg" />
    </div>
  ),
};
