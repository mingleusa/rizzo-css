# Rizzo CSS — AI / LLM assets

This folder contains machine-readable and AI-oriented assets for the Rizzo CSS design system.

## Canonical spec (single source of truth)

- **`public/llms.txt`** — Official AI interface specification (plain text). Served at `/llms.txt` on the docs site so crawlers and LLMs can read it. **Version 3.0**; reflects actual naming (BEM with no prefix: `.btn`, `.navbar`, `.card`), 58 components, 6 blocks, 14 themes, five frameworks, and semantic tokens (`--background`, `--text`, `--accent`, etc.).

## Files in this folder

| File | Purpose |
|------|--------|
| **ai-guidelines.md** | Human-readable AI contribution rules: use semantic tokens, BEM no prefix, preserve a11y. Points to `public/llms.txt` and schema files. |
| **llms.json** | Structured summary for AI/scripts: architecture, tokens, 14 theme IDs, 58 component slugs, 6 block slugs, frameworks, aiRules. Matches llms.txt. |
| **component-schema.json** | Component class names (button, input, card, modal, navbar) in BEM form; reference for codegen. Full list in llms.json. |
| **design-tokens.json** | Design-tooling token values (OKLCH). Theme variables in code use semantic names in theme CSS files. |
| **figma-tokens.json** | Figma-style token references; use with design-tokens.json for design tools. |
| **tailwind.preset.js** | Optional Tailwind preset mapping utilities to Rizzo CSS variables. Rizzo does not use Tailwind; for projects that combine both. |
| **Design tokens export** | Run `pnpm export:tokens` (or as part of `pnpm build`) to generate **public/tokens/rizzo-tokens.json** and **rizzo-tokens.js** from `design-tokens.json`. Served at `/tokens/rizzo-tokens.json` on the docs site; use in design tools or runtimes. |

## Naming (no rz- prefix)

Rizzo uses **BEM with no prefix**: `.btn`, `.navbar`, `.card`, `.modal`, `.input`, `.input-group`, etc. Semantic tokens in theme scope are `--background`, `--text`, `--accent`, `--border`, `--success`, and similar. Do not use `rz-` in generated code; it does not match the codebase.

## Version alignment

- **llms.txt** and **llms.json** use spec version **3.0** and reference package version **0.0.81**.
- When updating the design system (new components, themes, or tokens), update `public/llms.txt` and `ai/llms.json` (and this README if needed) so AI and tooling stay in sync.
