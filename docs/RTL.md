# RTL (right-to-left) support

Rizzo CSS supports **right-to-left** layouts so you can build interfaces for Arabic, Hebrew, and other RTL languages. Use logical properties and the utilities below for best results.

## Enabling RTL

Set the direction on the document or a container:

```html
<html lang="ar" dir="rtl">
```

Or on a wrapper:

```html
<div dir="rtl" lang="ar">
  <!-- RTL content -->
</div>
```

## What works out of the box

- **Logical property utilities** — Use the **logical** spacing and sizing utilities (e.g. `ms-*`, `me-*`, `ps-*`, `pe-*`, `mis-*`, `mie-*`) so margins and padding flip automatically with `dir="rtl"`. See [Logical utilities](#logical-utilities) below.
- **Components using logical properties** — Where component CSS uses `margin-inline-start`, `padding-inline-end`, `inset-inline-start`, etc., layout will flip in RTL without changes.
- **Text alignment** — Use `text-start` / `text-end` (or `text-left` / `text-right` with RTL in mind) so content aligns correctly.

## Logical utilities

Rizzo provides **logical** spacing utilities that respect `dir`. Prefer these for new layout code when you care about RTL.

| Purpose | Class pattern | Maps to (LTR) | Maps to (RTL) |
|--------|----------------|---------------|----------------|
| Margin inline start | `mis-0` … `mis-24` | margin-left | margin-right |
| Margin inline end   | `mie-0` … `mie-24` | margin-right | margin-left |
| Padding inline start | `pis-0` … `pis-24` | padding-left | padding-right |
| Padding inline end   | `pie-0` … `pie-24` | padding-right | padding-left |

Same scale as physical utilities (0, 1, 2, 3, 4, 5, 6, 8, 10, 12, 16, 20, 24). Use these in navbars, dropdowns, cards, and lists so spacing flips with direction.

**Block-axis** (top/bottom) utilities stay the same in RTL; use `mt-*`, `mb-*`, `pt-*`, `pb-*` as needed.

## Physical vs logical

- **Physical utilities** (`ml-*`, `mr-*`, `pl-*`, `pr-*`, `left`, `right`) do **not** flip in RTL. They are still available for pixel-perfect LTR-only layouts or when you need a fixed side.
- For **RTL-friendly** layouts, prefer **logical** utilities (`mis-*`, `mie-*`, `pis-*`, `pie-*`) and logical CSS properties in custom styles.

## Components and RTL

- **Navbar, Dropdown, Sheet** — Positioning and arrows may need RTL overrides in custom CSS (e.g. `[dir="rtl"] .navbar__brand { … }`) if you rely on physical `left`/`right`. Prefer logical properties in your overrides.
- **Icons** — Arrow and chevron icons that indicate direction should flip in RTL; use `transform: scaleX(-1)` in RTL or use start/end-aware icons where available.
- **Forms** — Labels and inputs work with logical utilities; ensure `margin-inline-start`/`end` for label/input spacing in RTL.

## Testing RTL

1. Set `dir="rtl"` on `<html>` or a test container.
2. Check navbar, dropdowns, sheets, and forms for correct alignment and spacing.
3. Run the RTL smoke test: `pnpm test:smoke` (includes one RTL route check) or manually open a key page with `?dir=rtl` if your app supports it.

See [BEST_PRACTICES.md – RTL](./BEST_PRACTICES.md#rtl-right-to-left-support) for a short summary.
