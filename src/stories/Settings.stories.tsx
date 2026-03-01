import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { SettingsDemo } from '../components/react/SettingsDemo';
import { Settings } from '../components/react/Settings';
import { Button } from '../components/react/Button';

const meta: Meta<typeof Settings> = {
  title: 'Rizzo/Settings',
  component: Settings,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Settings panel for theme switching, font size, and accessibility options. Same BEM and behavior as Astro, Svelte, Vue, and Vanilla.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    title: { control: 'text' },
    open: { control: 'boolean' },
  },
};

export default meta;

type Story = StoryObj<typeof Settings>;

function SettingsWithTrigger({ defaultOpen = false, title = 'Settings' }: { defaultOpen?: boolean; title?: string }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <>
      <Button onClick={() => setOpen(true)}>Open settings</Button>
      <Settings open={open} onOpenChange={setOpen} title={title}>
        <p style={{ padding: 'var(--spacing-3)', margin: 0 }}>
          Theme, font, and accessibility options. Same BEM as Astro/Svelte/React/Vue.
        </p>
      </Settings>
    </>
  );
}

/** Default closed state: click the button to open the panel. Use the **Controls** panel to tweak props (e.g. title). */
export const Guide: Story = {
  render: (args) => <SettingsWithTrigger defaultOpen={false} title={args.title} />,
  args: { title: 'Settings' },
};

export const Closed: Story = {
  render: () => <SettingsWithTrigger defaultOpen={false} />,
};

export const Open: Story = {
  render: () => <SettingsWithTrigger defaultOpen={true} title="Settings" />,
};

export const CustomTitle: Story = {
  render: (args) => <SettingsWithTrigger defaultOpen={true} title={args.title} />,
  args: { title: 'Preferences' },
};
