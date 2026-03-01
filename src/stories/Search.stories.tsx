import type { Meta, StoryObj } from '@storybook/react';
import { Search } from '../components/react/Search';

const meta: Meta<typeof Search> = {
  title: 'Rizzo/Search',
  component: Search,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Search trigger and overlay; Cmd+K in docs. Same BEM and behavior as Astro, Svelte, Vue, and Vanilla.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    placeholder: { control: 'text' },
  },
};

export default meta;

type Story = StoryObj<typeof Search>;

export const Default: Story = {
  args: { placeholder: 'Search…' },
};

export const CustomPlaceholder: Story = {
  args: { placeholder: 'Search docs…' },
};
