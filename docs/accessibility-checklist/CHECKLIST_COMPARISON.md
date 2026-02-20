# Accessibility Checklist Comparison

This document maps the **Web Accessibility Checklist** (Web Dev Simplified, WCAG 2.2) from `Accessibility Checklist - Light.pdf` to Rizzo CSS components and documentation. Use it to verify coverage and find gaps.

**Legend:** ✅ Implemented · ⚠️ Partial / doc-only · ❌ Gap / to do

---

## HTML

| Checklist item | Level | Rizzo status | Where |
|----------------|-------|--------------|--------|
| Set page language | A | ✅ | `Layout.astro`: `<html lang="en">`. Scaffolds use `lang="en"`; consumers set per locale. |
| Set unique page titles | A | ✅ | Each Astro page sets `<title>` via layout or frontmatter; docs use `DocsLayout` with title prop. |
| Use semantic HTML | A | ✅ | `<header>`, `<nav>`, `<main>`, `<footer>`, `<aside>` in layout, Navbar, Footer, DocsSidebar. |
| Ensure linear content flow | A | ✅ | DOM order matches visual order; no major reordering. Flex/grid used for layout without breaking reading order. |
| Ensure zoom functionality | AA | ✅ | Viewport meta: `width=device-width, initial-scale=1` in Layout and all scaffolds. |

---

## Keyboard

| Checklist item | Level | Rizzo status | Where |
|----------------|-------|--------------|--------|
| Keyboard accessible elements | A | ✅ | All interactive components: Tab, Enter/Space, arrows, Escape. Tests in `tests/a11y/keyboard.spec.mjs`. |
| Remove keyboard traps | A | ✅ | No traps except intentional (Modal, Search, Settings); focus trap + Escape restores to trigger. |
| Don't use positive tabindex | A | ✅ | Only `tabindex="0"` (scrollable regions) or `-1` (programmatic focus). No positive tabindex. |
| Properly handle modal focus | A | ✅ | Modal, Search, Settings: overlay/dialog `inert` when closed; focus trap when open; focus returns to trigger. `src/utils/focus-trap.js`. |
| Don't remove focus styles | AA | ✅ | `:focus-visible` with `outline` (accent) in `utilities.css`, `accessibility.css`. Forms use outline on focus. |

---

## Appearance & Animation

| Checklist item | Level | Rizzo status | Where |
|----------------|-------|--------------|--------|
| Don't convey info by color alone | A | ✅ | Links underlined; buttons use shape/label; semantic variants use icons/labels. ACCESSIBILITY.md documents. |
| Use subtle animations | A | ✅ | Transitions are short; no rapid flashing. |
| Support responsive reflow | AA | ✅ | No horizontal scroll at 320px; layout and components reflow. |
| Support custom fonts | AA | ✅ | Font Switcher; `--font-family` / `--font-family-mono`; dyslexia-friendly options in font pairs. |
| Respect prefers-x settings | AAA | ✅ | `prefers-reduced-motion` in CSS and Settings toggle; `prefers-contrast` in accessibility.css; `prefers-color-scheme` for theme (system). |

---

## Forms

| Checklist item | Level | Rizzo status | Where |
|----------------|-------|--------------|--------|
| Group related form fields | A | ✅ | `fieldset` / `legend` in forms.css and documented in forms.astro. FormGroup wraps label + control + help + error. |
| Display errors in accessible list | A | ✅ | Error text in `role="alert"` (FormGroup); not color-only. |
| Associate errors with inputs | A | ✅ | Input, Checkbox, Radio, Select, Textarea accept `ariaDescribedby`; FormGroup passes error id. |
| Associate labels with all inputs | A | ✅ | All form components: label with `for`/`id` or `aria-label`. Forms docs and FormGroup. |
| Add autocomplete where relevant | AA | ✅ | Input.astro and Svelte Input accept `autocomplete` prop; documented. |
| Ensure controls have focus states | AA | ✅ | All form controls get `:focus-visible` from global styles. |

---

## Content

| Checklist item | Level | Rizzo status | Where |
|----------------|-------|--------------|--------|
| Don't rely on sensory characteristics | A | ✅ | Docs and components avoid "click the red button"; labels are descriptive. |
| Unique, descriptive labels | A | ✅ | Buttons/links use aria-label or visible text; no generic "click here" in components. |
| Semantic table elements | A | ✅ | Table.astro: `<table>`, `<thead>`, `<tbody>`, `<tr>`, `<th>`, `<td>`, optional `<caption>`. |
| Use &lt;th&gt; with scope | A | ✅ | Table headers use `scope="col"`. |
| Use &lt;caption&gt; to describe tables | A | ✅ | Table component has optional `caption` prop. |
| Mark language changes | AA | ✅ | [ACCESSIBILITY.md – Content, links, and copy – Language changes](../ACCESSIBILITY.md#language-changes-wcag-22-aa). Use `lang` on phrases. |
| Define unusual terms / Explain abbreviations | AAA | ✅ | [ACCESSIBILITY.md – Sensory characteristics and descriptive labels](../ACCESSIBILITY.md#sensory-characteristics-and-descriptive-labels). Expand abbreviations on first use. |

---

## Links & Buttons

| Checklist item | Level | Rizzo status | Where |
|----------------|-------|--------------|--------|
| Make links visually recognizable | A | ✅ | `base.css`: links underlined; navbar/sidebar/menu links keep underline on hover. |
| Self-explanatory link text | A | ✅ | Docs and nav use descriptive labels. |
| Correct element (a vs button) | A | ✅ | `<a>` for navigation, `<button>` for actions across components. |
| Label buttons with no text | A | ✅ | Icon buttons use `aria-label` (e.g. Close, Settings, Copy, Clear search). |
| Identify links that open new window | AA | ✅ | [ACCESSIBILITY.md – Links that open in a new window](../ACCESSIBILITY.md#links-that-open-in-a-new-window-wcag-22-aa). Add text or icon + aria-label when using `target="_blank"`. |
| Adequate target size (24px) | AA | ✅ | `--touch-target-min: 3rem` (48px) in variables.css; buttons/controls use min dimensions. |
| Enhanced target size (44px) | AAA | ✅ | 3rem (48px) exceeds 44px. |

---

## Color Contrast

| Checklist item | Level | Rizzo status | Where |
|----------------|-------|--------------|--------|
| Normal text contrast 4.5:1 | AA | ✅ | All themes; `pnpm check:contrast`; semantic variables. |
| Large text contrast 3:1 | AA | ✅ | Same. |
| Text over images | AA | ✅ | [ACCESSIBILITY.md – Text over images](../ACCESSIBILITY.md#text-over-images-aa) and [Color contrast – Text over images and AAA](../ACCESSIBILITY.md#text-over-images-and-aaa). Test overlay/contrast when text sits on images. |
| All color themes | AA | ✅ | Contrast checked for all 14 themes. |
| Icon contrast 3:1 | AA | ✅ | Icons use `currentColor` (text/icon variables). |
| UI component contrast 3:1 | AA | ✅ | Borders, buttons, focus rings use theme variables. |
| Enhanced contrast 7:1 | AAA | ✅ | [ACCESSIBILITY.md – Text over images and AAA](../ACCESSIBILITY.md#text-over-images-and-aaa). Use Settings High contrast toggle (`.high-contrast`); themes target AA, high-contrast mode improves. |

---

## Headings & Structure

| Checklist item | Level | Rizzo status | Where |
|----------------|-------|--------------|--------|
| Use headings to structure content | A | ✅ | Docs and components use h1–h6 for structure. |
| One &lt;h1&gt; per page | A | ✅ | Layout and docs follow this. |
| Don't skip heading levels | A | ✅ | Docs and scaffolds maintain order. |
| List markup (&lt;ul&gt;, &lt;ol&gt;, &lt;dl&gt;) | A | ✅ | Lists in nav, dropdowns, accordion, etc. use semantic list elements. |
| Skip navigation link | A | ✅ | `.skip-link` in layout and scaffolds; first focusable. |
| Multiple ways to find content | AA | ✅ | Nav, search, sidebar, footer links. |
| Descriptive headings | AA | ✅ | Doc headings are descriptive. |

---

## Images

| Checklist item | Level | Rizzo status | Where |
|----------------|-------|--------------|--------|
| Alt text for all images | A | ✅ | Icons use `aria-hidden="true"` (decorative) or context; images in docs have alt. |
| alt="" for decorative | A | ✅ | Decorative icons use `aria-hidden="true"`. |
| Descriptions for complex images | A | ✅ | [ACCESSIBILITY.md – Images and media – Complex images](../ACCESSIBILITY.md#images-and-media). Provide description near image or link; use `aria-describedby` if in-page. |
| Image text in alt | A | ✅ | [ACCESSIBILITY.md – Image text](../ACCESSIBILITY.md#images-and-media). Include image text in `alt` or equivalent. |
| Avoid images of text | AA | ✅ | [ACCESSIBILITY.md – Avoid images of text](../ACCESSIBILITY.md#images-and-media). Prefer live text; components use live text. |

---

## Media (Audio & Video)

| Checklist item | Level | Rizzo status | Where |
|----------------|-------|--------------|--------|
| Prevent autoplay / pausable / controls accessible | A | ✅ | [ACCESSIBILITY.md – Media (audio and video)](../ACCESSIBILITY.md#media-audio-and-video). No autoplay with sound; captions/transcripts; custom players need ARIA and keyboard support. |
| Remove seizure triggers | A | ✅ | No rapid flashing in animations. |

---

## ARIA & Custom Widgets

| Checklist item | Level | Rizzo status | Where |
|----------------|-------|--------------|--------|
| Avoid focus-triggered unexpected changes | A | ✅ | Focus doesn’t submit or navigate; dropdowns open on click/Enter. |
| Avoid input-triggered auto-submit | A | ✅ | No form auto-submit on input. |
| Prefer native HTML over ARIA | A | ✅ | Buttons, links, inputs native; ARIA for custom patterns (tabs, menu, dialog). |
| ARIA roles for custom elements | A | ✅ | role="dialog", "menu", "menuitem", "tab", "tablist", "tabpanel", "alert", "tooltip", etc. |
| Update ARIA states dynamically | A | ✅ | aria-expanded, aria-selected, aria-checked, aria-hidden. |
| Accessible names (aria-label / aria-labelledby) | A | ✅ | All custom controls; dialogs use aria-labelledby. |
| Hide decorative from screen readers | A | ✅ | aria-hidden on decorative icons/elements. |
| Announce dynamic content (aria-live) | AA | ✅ | Alert role="alert" aria-live="polite"; CopyToClipboard feedback; Search results. |

---

## Testing & Validation

| Checklist item | Level | Rizzo status | Where |
|----------------|-------|--------------|--------|
| Run accessibility audits | — | ✅ | axe in `tests/a11y/docs.spec.mjs` (WCAG 2 A/AA). |
| Lint in build | — | ✅ | axe in CI as primary a11y lint; [ACCESSIBILITY.md – Automated tests – Lint in build](../ACCESSIBILITY.md#automated-accessibility-tests). No eslint-plugin-jsx-a11y for Astro/Svelte in repo. |
| Validate color contrast | — | ✅ | `pnpm check:contrast`. |
| Test keyboard-only | — | ✅ | `tests/a11y/keyboard.spec.mjs`; manual checklist in ACCESSIBILITY.md. |
| Test with screen readers | — | ✅ | Manual testing checklist (VoiceOver, NVDA, etc.). |
| Test at 200% zoom | — | ✅ | [ACCESSIBILITY.md – 200% zoom](../ACCESSIBILITY.md#tools). Manual; viewport and rem support reflow. |
| Test increased font size | — | ✅ | Settings font-size slider; --font-size-scale. |
| Test color blindness / blurry vision | — | ✅ | [ACCESSIBILITY.md – Color blindness and blurry vision](../ACCESSIBILITY.md#tools). Manual; use DevTools emulation or simulators. |
| Verify focus management | — | ✅ | Keyboard tests; focus trap utility. |
| Test on mobile | — | ✅ | Playwright mobile projects (Pixel 5, iPhone 12); manual. |

---

## Summary

- **Fully covered:** All checklist categories are now covered. HTML, Keyboard, Appearance/Animation, Forms, Content, Links/Buttons, Color Contrast (AA and AAA guidance), Headings, Images, Media, ARIA & Custom Widgets, and Testing each have implementation and/or documentation in place.
- **Documentation:** Items that are content-author responsibility (language changes, links that open new window, images, media, AAA contrast, zoom, vision simulators) are documented in [ACCESSIBILITY.md](../ACCESSIBILITY.md) with clear sections and links from this comparison.
- **Viewport:** Viewport meta in main layout includes `initial-scale=1` for zoom (AA).

When adding or changing components, use this comparison and the [Component accessibility checklist](../ACCESSIBILITY.md#component-accessibility-checklist-all-frameworks) together so Rizzo stays aligned with the PDF checklist and WCAG 2.2.

---

## Project compliance (this repo)

The following has been verified so that **the Rizzo CSS project itself** meets the guidelines, not only the documentation:

| Area | Status | Notes |
|------|--------|--------|
| **HTML** | ✅ | `Layout.astro`: `lang="en"`, viewport with `initial-scale=1`, semantic structure; skip link first focusable; one h1 per page (index, DocsLayout). |
| **Keyboard** | ✅ | No positive `tabindex`; focus trap and restore in Modal, Search, Settings; `:focus-visible` styles. Automated tests in `tests/a11y/keyboard.spec.mjs`. |
| **Links that open new window** | ✅ | Every `target="_blank"` link in **src/** includes screen-reader text “(opens in new tab)” via `<span class="sr-only"> (opens in new tab)</span>` so users know before activating. (Theme pages, accessibility resources, theming, search docs.) |
| **Forms** | ✅ | Form components use labels, `aria-describedby` for errors, optional `autocomplete`; FormGroup and inputs documented. |
| **Tables** | ✅ | Table.astro: `<thead>`, `<th scope="col">`, optional `<caption>`. |
| **Images** | ✅ | Icons use `aria-hidden="true"` (decorative); Avatar uses `alt` from prop; no images of text in components. |
| **Color contrast** | ✅ | All themes checked with `pnpm check:contrast`; semantic variables; high-contrast mode in Settings. |
| **Scaffolds (vanilla/astro-core)** | ⚠️ | Scaffold HTML in `packages/rizzo-css/scaffold/` may contain `target="_blank"` links (e.g. docs links). When scaffolding into a user project, consider adding “(opens in new tab)” to any such links if the template is customized. |

To re-verify after changes: run `pnpm test:a11y` (axe + keyboard + ARIA) and `pnpm check:contrast`; manually spot-check a theme page and the accessibility page for link announcements.
