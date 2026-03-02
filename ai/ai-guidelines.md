# Rizzo CSS — AI Contribution Guidelines

## General Rules
- Always use semantic tokens (e.g. `--background`, `--text`, `--accent`) — never hardcode colors or spacing
- Preserve ARIA attributes and semantic HTML
- Maintain focus-visible for interactive components
- **Component classes: BEM with no prefix** (e.g. `.btn`, `.navbar`, `.card`, `.modal`, `.input`) — do not use `rz-` prefix
- **Utilities:** prefix `u-` (e.g. `u-flex`, `u-m-4`)

## Framework Rules
- Vanilla: use class attribute, import CSS
- React: import once, use className, forward refs
- Vue: preserve native elements, avoid scoped token override
- Svelte: import globally, do not shadow tokens
- Astro: import in layout, avoid duplicate injection

## Theming
- Respect `data-theme` for light/dark/custom
- Do not override primitive tokens
- Component tokens inherit semantic tokens

## Utility Rules
- Utilities only for layout, spacing, typography
- Do not define colors or component-specific styles
- Use responsive prefixes when needed: sm:, md:, lg:, xl:, 2xl:

## AI Anti-Patterns
- Hardcoding tokens
- Removing accessibility features
- Inline styles
- Ignoring responsive design
- Breaking naming conventions

## Contribution Workflow
- **Canonical spec:** `public/llms.txt` (version 3.0) — single source of truth for AI/LLM consumption; also served at `/llms.txt` on the docs site
- Validate component class names against `ai/component-schema.json` (BEM, no prefix)
- Validate token usage against `ai/design-tokens.json` for design tooling; theme variables in code use semantic names (e.g. `--background`, `--accent`) in theme CSS files
- Optional: `ai/tailwind.preset.js` maps Tailwind utilities to Rizzo semantic tokens for projects using Tailwind alongside Rizzo