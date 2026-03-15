import type { Meta, StoryObj } from '@storybook/react';
import { SoundEffects } from '../components/react/SoundEffects';

const meta: Meta<typeof SoundEffects> = {
  title: 'Rizzo/Sound Effects',
  component: SoundEffects,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof SoundEffects>;

export const Default: Story = {
  render: () => <SoundEffects />,
};
