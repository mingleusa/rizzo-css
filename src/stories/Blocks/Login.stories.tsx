import type { Meta, StoryObj } from '@storybook/react';

function LoginBlock() {
  return (
    <div className="login-block">
      <a href="/" className="login-block__brand" aria-label="Home">
        <span className="login-block__brand-icon" aria-hidden="true">
          R
        </span>
        Acme
      </a>
      <form
        className="login-block__form"
        action="#"
        method="post"
        aria-labelledby="login-heading"
      >
        <h2 id="login-heading" className="login-block__title">
          Sign in
        </h2>
        <div className="form-group">
          <label htmlFor="login-email-story" className="label">
            Email
          </label>
          <input
            type="email"
            id="login-email-story"
            name="email"
            className="form-input"
            placeholder="you@example.com"
            autoComplete="email"
          />
        </div>
        <div className="form-group">
          <label htmlFor="login-password-story" className="label">
            Password
          </label>
          <input
            type="password"
            id="login-password-story"
            name="password"
            className="form-input"
            placeholder="••••••••"
            autoComplete="current-password"
          />
        </div>
        <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>
          Sign in
        </button>
      </form>
      <p className="login-block__footer">
        <a href="#">Forgot password?</a> · <a href="/blocks/signup">Create account</a>
      </p>
    </div>
  );
}

const meta: Meta = {
  title: 'Blocks/Login',
  component: LoginBlock,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        story:
          'Centered login form. Same structure for Astro, Svelte, React, Vue, Vanilla. See /blocks/login for full docs.',
      },
    },
  },
};

export default meta;

type Story = StoryObj;

export const Default: Story = {
  render: () => (
    <div className="block-preview-wrapper block-preview-wrapper--login">
      <LoginBlock />
    </div>
  ),
};
