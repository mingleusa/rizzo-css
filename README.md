# Rizzo CSS

An Astro project with PostCSS imports, CSS optimization, and linting configured.

## 🛠️ Tech Stack

- **[Astro](https://astro.build)** - Web framework
- **[PostCSS](https://postcss.org/)** - CSS transformation with import support
- **[Autoprefixer](https://github.com/postcss/autoprefixer)** - Automatic vendor prefixes
- **[cssnano](https://cssnano.co/)** - CSS minification
- **[Stylelint](https://stylelint.io/)** - CSS linter

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- pnpm (recommended) or npm

### Installation

```bash
pnpm install
```

### Development

```bash
pnpm dev
```

Site available at `http://localhost:4321`

## 📜 Commands

| Command | Description |
|---------|-------------|
| `pnpm dev` | Start development server |
| `pnpm build` | Build production site (includes CSS minification) |
| `pnpm build:css` | Build minified CSS to `public/css/main.min.css` |
| `pnpm preview` | Preview production build |
| `pnpm lint:css` | Lint CSS files |
| `pnpm lint:css:fix` | Auto-fix CSS linting issues |

## 🎨 CSS Setup

### Imports

Use PostCSS imports (similar to SCSS/SASS) in `src/styles/main.css`:

```css
@import './variables.css';
@import './reset.css';
```

### Processing Pipeline

**Development:**
- PostCSS processes imports and adds vendor prefixes
- Source CSS is used directly

**Production:**
- CSS is minified and optimized via `build:css` script
- Layout automatically uses `public/css/main.min.css` in production builds
- Minification preserves pseudo-element syntax (`::before`, `::after`)

### Project Structure

```
src/styles/
├── main.css       # Main stylesheet with imports
├── variables.css  # CSS custom properties
└── reset.css     # Modern CSS reset

public/css/
└── main.min.css  # Generated minified CSS (production)
```

## 📚 Resources

- [Astro Documentation](https://docs.astro.build)
- [PostCSS Documentation](https://postcss.org/docs)
- [Stylelint Documentation](https://stylelint.io/user-guide)
