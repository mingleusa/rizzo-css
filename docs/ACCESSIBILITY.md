# Accessibility

Rizzo CSS is built with accessibility as a core principle, following WCAG 2.1 guidelines.

## Accessibility Features

### Keyboard Navigation

All interactive components support full keyboard navigation:

- Tab navigation
- Arrow keys for menus
- Enter/Space for activation
- Escape to close/dismiss

### ARIA Attributes

Components include proper ARIA attributes:

- `aria-label` - Descriptive labels for all interactive elements (buttons, links, menu items)
- `aria-expanded` - Menu/accordion state
- `aria-controls` - Element relationships
- `aria-describedby` - Additional descriptions
- `aria-haspopup` - Indicates elements with popup menus
- `role` - Semantic roles (menu, menuitem, dialog, etc.)

### Focus Management

- Visible focus indicators using `--accent` color
- Focus trapping in modals
- Focus restoration after interactions
- Skip links for main content

## Utility Classes

### Screen Reader Only

Hide content visually but keep it available to screen readers:

```html
<span class="sr-only">Screen reader only text</span>
```

Uses modern `clip-path: inset(50%)` instead of deprecated `clip` property.

### Focusable Screen Reader Content

Make screen reader content focusable:

```html
<a href="#content" class="sr-only sr-only-focusable">Skip to content</a>
```

When focused, the content becomes visible and accessible.

### Skip Links

Skip to main content link:

```html
<a href="#main-content" class="skip-link">Skip to main content</a>
```

### Visually Hidden

Hide content completely:

```html
<span class="visually-hidden">Hidden content</span>
```

## Focus Styles

All interactive elements have visible focus indicators:

```css
:focus-visible {
  outline: 2px solid var(--accent);
  outline-offset: 2px;
}
```

## Form Accessibility

### Labels

Always use labels with form inputs:

```html
<label for="email">Email</label>
<input type="email" id="email" name="email" />
```

### Required Fields

```html
<label for="name" class="required">Name</label>
<input type="text" id="name" name="name" required />
```

### Error States

```html
<input type="email" aria-invalid="true" aria-describedby="email-error" />
<span id="email-error" class="error-message">Invalid email address</span>
```

### Success States

```html
<span class="success-message">Form submitted successfully</span>
```

## Responsive Design

- Mobile-first approach
- Touch-friendly targets (minimum 44x44px)
- Responsive typography
- Flexible layouts

## Color Contrast

All themes meet WCAG AA contrast requirements:

- Normal text: 4.5:1 contrast ratio
- Large text: 3:1 contrast ratio
- Interactive elements: 3:1 contrast ratio

### Contrast-Aware Text Colors

Rizzo CSS automatically provides proper contrast through semantic text color variables:

- `--accent-text` - Automatically white or dark based on accent color lightness
- `--success-text` - Contrast-appropriate text for success backgrounds
- `--warning-text` - Dark text for light warning backgrounds
- `--error-text` - Contrast-appropriate text for error backgrounds
- `--info-text` - Contrast-appropriate text for info backgrounds

All buttons and components using colored backgrounds automatically use these contrast-aware variables to ensure accessibility.

## Reduced Motion

Respects user preferences:

```css
@media (prefers-reduced-motion: reduce) {
  /* Animations disabled */
}
```

## High Contrast Mode

Supports high contrast mode through both media queries and user settings:

**Media Query:**
```css
@media (prefers-contrast: high) {
  /* Enhanced borders and contrast */
}
```

**User Setting:**
The Settings component includes a "High contrast" toggle that applies the `.high-contrast` class to the document root, enabling enhanced contrast across all components.

**Reduce Motion:**
The Settings component also includes a "Reduce motion" toggle that applies the `.reduced-motion` class, respecting user motion preferences beyond just the `prefers-reduced-motion` media query.

## Best Practices

1. **Always provide labels** - Every form input needs a label
2. **Use semantic HTML** - Use proper heading hierarchy, landmarks
3. **Test with keyboard** - Navigate without a mouse
4. **Test with screen readers** - Use NVDA, JAWS, or VoiceOver
5. **Check color contrast** - Use tools to verify contrast ratios
6. **Provide alternatives** - Alt text for images, captions for videos

## Testing

### Keyboard Testing

- Tab through all interactive elements
- Use arrow keys in menus
- Test Escape key functionality
- Verify focus indicators are visible

### Screen Reader Testing

- Test with NVDA (Windows)
- Test with JAWS (Windows)
- Test with VoiceOver (macOS/iOS)
- Verify all content is announced

### Automated Testing

Use tools like:
- axe DevTools
- WAVE
- Lighthouse
- Pa11y

## Resources

- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [WebAIM](https://webaim.org/)
- [A11y Project](https://www.a11yproject.com/)
- [MDN Accessibility](https://developer.mozilla.org/en-US/docs/Web/Accessibility)
