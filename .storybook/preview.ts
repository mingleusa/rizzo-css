import type { Preview } from '@storybook/react-vite';
import React from 'react';
// CSS loaded via .storybook/preview-head.html (link to /css/main.min.css from static dir)

const preview: Preview = {
  parameters: {
    a11y: {
      // Fail test-runner on a11y violations so CI catches regressions
      test: 'error',
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
  decorators: [
    (Story) => {
      if (typeof document !== 'undefined' && !document.documentElement.getAttribute('data-theme')) {
        document.documentElement.setAttribute('data-theme', 'github-dark-classic');
      }
      return React.createElement(Story);
    },
  ],
};

export default preview;
