import type { Meta, StoryObj } from '@storybook/react';

function SignupBlock() {
  return (
    <div className="signup-block">
      <a href="/" className="signup-block__brand" aria-label="Home">
        <span className="signup-block__brand-icon" aria-hidden="true">
          R
        </span>
        Acme
      </a>
      <form
        className="signup-block__form"
        action="#"
        method="post"
        aria-labelledby="signup-heading"
      >
        <h2 id="signup-heading" className="signup-block__title">
          Create account
        </h2>
        <div className="form-group">
          <label htmlFor="signup-name-story" className="label">
            Name
          </label>
          <input
            type="text"
            id="signup-name-story"
            name="name"
            className="form-input"
            placeholder="Jane Doe"
            autoComplete="name"
          />
        </div>
        <div className="form-group">
          <label htmlFor="signup-email-story" className="label">
            Email
          </label>
          <input
            type="email"
            id="signup-email-story"
            name="email"
            className="form-input"
            placeholder="you@example.com"
            autoComplete="email"
          />
        </div>
        <div className="form-group">
          <label htmlFor="signup-password-story" className="label">
            Password
          </label>
          <input
            type="password"
            id="signup-password-story"
            name="password"
            className="form-input"
            placeholder="••••••••"
            autoComplete="new-password"
          />
        </div>
        <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>
          Create account
        </button>
      </form>
      <p className="signup-block__footer">
        Already have an account? <a href="/blocks/login">Sign in</a>
      </p>
    </div>
  );
}

const meta: Meta = {
  title: 'Blocks/Signup',
  component: SignupBlock,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        story:
          'Centered sign-up form. Same structure for Astro, Svelte, React, Vue, Vanilla. See /blocks/signup for full docs.',
      },
    },
  },
};

export default meta;

type Story = StoryObj;

export const Default: Story = {
  render: () => (
    <div className="block-preview-wrapper block-preview-wrapper--signup">
      <SignupBlock />
    </div>
  ),
};
