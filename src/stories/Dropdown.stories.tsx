import type { Meta, StoryObj } from '@storybook/react';
import { DropdownDemo } from '../components/react/DropdownDemo';
import { Dropdown } from '../components/react/Dropdown';

const meta: Meta<typeof Dropdown> = {
  title: 'Rizzo/Dropdown',
  component: Dropdown,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Accessible dropdown menu with keyboard navigation, nested submenus, and menu items. Same BEM as Astro, Svelte, Vue, and Vanilla.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    trigger: { control: 'text' },
    position: { control: 'select', options: ['left', 'right'] },
    align: { control: 'select', options: ['start', 'end'] },
  },
};

export default meta;

type Story = StoryObj<typeof Dropdown>;

export const Default: Story = {
  render: () => <DropdownDemo />,
};

export const CustomTrigger: Story = {
  args: {
    trigger: 'Menu',
    items: [
      { label: 'Item A', onClick: () => {} },
      { label: 'Item B', onClick: () => {} },
    ],
  },
  render: (args) => <Dropdown trigger={args.trigger ?? 'Menu'} items={args.items ?? []} />,
};
