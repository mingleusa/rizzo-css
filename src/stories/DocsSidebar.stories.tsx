import type { Meta, StoryObj } from '@storybook/react';
import { DocsSidebar, DOCS_SIDEBAR_DEMO_GROUPS } from '../components/react/DocsSidebar';

const meta: Meta<typeof DocsSidebar> = {
  title: 'Rizzo/Docs Sidebar',
  component: DocsSidebar,
  parameters: { layout: 'padded' },
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof DocsSidebar>;

export const Default: Story = {
  args: {
    groups: DOCS_SIDEBAR_DEMO_GROUPS,
    pathPrefix: '/docs',
    currentPath: '/docs/getting-started',
  },
};
