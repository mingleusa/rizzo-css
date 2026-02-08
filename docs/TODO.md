# Design System TODO

A focused list of remaining tasks to continue building and improving the Rizzo CSS design system.

> **Note**: Completed features are documented in the **Features** (or **Implemented Features**) section of each doc:
> - [Components](./COMPONENTS.md#features) - Implemented components (24 doc pages)
> - [Theming](./THEMING.md#features) - 14 themes, theme pages, system preference, high contrast
> - [Accessibility](./ACCESSIBILITY.md#accessibility-features) - Keyboard, ARIA, focus, high contrast mode, reduce motion
> - [README](../README.md), [Design System](./DESIGN_SYSTEM.md), [Getting Started](./GETTING_STARTED.md) - Overview, variables, setup

## 🎨 Theming

- [ ] **Theme Features**
  - [x] Theme transition animations (0.2s on html/body; `--theme-transition-duration`; respects reduced motion)
  - [x] Theme preview in switcher (panel in menu updates on hover/focus with theme background + accent)

## 🎨 Documentation

- [ ] **Consumption & distribution** (docs + tooling)
  - [ ] Docs: how to use Rizzo CSS via **download + import** (link to built CSS, import in any project)
  - [ ] **CLI** (e.g. init/scaffold or pull CSS into a project) — implementation under [Package Distribution](#-package-distribution) below
  - [ ] Framework-agnostic: same CSS works in React, Vue, Svelte, Astro, vanilla, etc.; document usage in “any project”
  - [ ] Build out framework-specific examples/docs as we add React/Vue/Svelte (or other) implementations (see [Multi-Framework Support](#-package-distribution) below)

- [ ] **Best Practices**
  - [ ] Component composition patterns
  - [ ] Accessibility best practices
  - [ ] Performance optimization tips

## 🎨 CSS Variables & Design System

- [ ] **Additional CSS Variables** (if needed)
  - [ ] Any additional spacing values discovered during framework porting
  - [ ] Additional transform values if needed
  - [ ] Additional animation timing values if needed

## 🎨 Developer Experience

- [ ] **TypeScript Support**
  - [ ] Type definitions for components
  - [ ] Props interfaces

- [ ] **Build Improvements**
  - [ ] CSS bundle size optimization
  - [ ] Tree-shaking support
  - [ ] Critical CSS extraction

- [ ] **Testing**
  - [ ] Component tests
  - [ ] Accessibility tests
  - [ ] Visual regression tests

- [ ] **Storybook/Component Library**
  - [ ] Interactive component playground
  - [ ] Component documentation
  - [ ] Design system showcase

## 🎨 Accessibility

- [ ] **ARIA Patterns**
  - [ ] Ensure all components follow ARIA best practices
  - [ ] Screen reader testing
  - [ ] Keyboard navigation testing

- [ ] **Focus Management**
  - [ ] Focus trap utilities
  - [ ] Focus restoration
  - [ ] Skip links improvements

- [ ] **Color Contrast**
  - [ ] Verify all themes meet WCAG AA/AAA
  - [ ] Contrast checking tools

## 🎨 Performance

- [ ] **Optimization**
  - [ ] CSS bundle analysis
  - [ ] Unused CSS removal
  - [ ] Critical CSS inlining
  - [ ] CSS loading optimization

- [ ] **Lazy Loading**
  - [ ] Theme lazy loading
  - [ ] Component CSS lazy loading

## 🎨 Browser Support

- [ ] **Polyfills**
  - [ ] OKLCH color format fallbacks
  - [ ] Modern CSS feature detection

- [ ] **Testing**
  - [ ] Cross-browser testing
  - [ ] Mobile device testing
  - [ ] Accessibility testing tools

## 🎨 Examples & Demos

- [ ] **Example Pages**
  - [ ] Component showcase page
  - [ ] Theme showcase page
  - [ ] Form examples
  - [ ] Layout examples

- [ ] **Templates**
  - [ ] Landing page template
  - [ ] Dashboard template
  - [ ] Documentation site template

## 🎨 Package Distribution

- [ ] **NPM Package**
  - [ ] Package setup
  - [ ] Distribution build
  - [ ] Versioning strategy

- [ ] **CDN Distribution**
  - [ ] CDN setup
  - [ ] Versioned releases

- [ ] **Multi-Framework Support**
  - [ ] Core CSS package (`@rizzo-css/core`)
  - [ ] JavaScript utilities extraction
  - [ ] React components (`@rizzo-css/react`)
  - [ ] Vue components (`@rizzo-css/vue`)
  - [ ] Svelte components (`@rizzo-css/svelte`)
  
  See [Multi-Framework Strategy](./MULTI_FRAMEWORK.md) for detailed implementation plan.

- [ ] **In-repo framework routes (docs site parity)**
  - [ ] Add Svelte to this Astro project (`@astrojs/svelte`); later add React/Vue as needed.
  - [ ] Create Svelte components that mirror Astro components: same BEM classes, same HTML structure, same behavior — only the component layer (`.svelte`) differs.
  - [ ] Add a **/svelte** (or **/docs/svelte**) route that lists the **same examples** as Astro: same 24 component pages, same 14 theme pages, same structure (getting started, theming, etc.).
  - [ ] **Match everything** for each framework we cover: every Astro doc page and example must have an equivalent in the Svelte (and later React/Vue) section so framework users get full parity.
  - [ ] When adding another framework (e.g. React), repeat: same components, same routes, same examples.

## 🎨 Community

- [ ] **Contributing Guide**
  - [ ] Contribution guidelines
  - [ ] Code of conduct
  - [ ] Pull request template

- [ ] **Issue Templates**
  - [ ] Bug report template
  - [ ] Feature request template

---

## Priority Legend

- **High Priority**: Core components needed for most projects
- **Medium Priority**: Commonly used but not essential
- **Low Priority**: Nice-to-have features

## Notes

- All components should follow BEM naming convention
- All styles should use semantic theme variables
- All components must be accessible (WCAG 2.1 AA minimum)
- No inline styles - all CSS in appropriate files
- All components should be keyboard navigable
- All components should work with all themes
- **Design System as Source of Truth**: All styling should use CSS variables and utility classes from the design system. This ensures that when porting to other frameworks (Vue, React, Svelte), only JavaScript needs to be ported, not the styling.
