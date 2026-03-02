import type { Meta, StoryObj } from '@storybook/react';
import { Carousel } from '../components/react/Carousel';

const meta: Meta<typeof Carousel> = {
  title: 'Rizzo/Carousel',
  component: Carousel,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  argTypes: {
    label: { control: 'text' },
    showIndicators: { control: 'boolean' },
  },
};

export default meta;

type Story = StoryObj<typeof Carousel>;

const defaultSlides = (
  <>
    <div className="carousel__slide">
      <h4 style={{ marginTop: 0 }}>Slide 1</h4>
      <p>First slide content. Use previous/next or the indicators to navigate.</p>
    </div>
    <div className="carousel__slide">
      <h4 style={{ marginTop: 0 }}>Slide 2</h4>
      <p>Second slide content.</p>
    </div>
    <div className="carousel__slide">
      <h4 style={{ marginTop: 0 }}>Slide 3</h4>
      <p>Third slide content.</p>
    </div>
  </>
);

export const Default: Story = {
  args: {
    label: 'Slides',
    showIndicators: true,
    children: defaultSlides,
  },
};

export const NoIndicators: Story = {
  args: {
    label: 'Slides',
    showIndicators: false,
    children: defaultSlides,
  },
};
