# Theme Colors Audit

Reference for which **accent color** each theme uses, grouped by color family. Useful for balancing the theme set (e.g. one light + one dark per rainbow color).

## Accent color = `--accent` in each theme

The **accent** is the main highlight color (links, buttons, active states). Hue in OKLCH roughly maps to:

- **0–30°** Red  
- **50–70°** Orange / Yellow  
- **90–160°** Green  
- **200–260°** Cyan / Blue  
- **270–300°** Purple / Violet  
- **320–360°** Pink / Magenta  

---

## Current themes by color family

### Red (hue ~0–30°)

| Theme | Mode | Notes |
|-------|------|--------|
| **Sandstorm Classic** | Dark | Red accent, late-night coding |
| **Red Velvet Cupcake** | Light | Red accent (#CF5050) |

**Count:** 1 dark, 1 light.

---

### Orange (hue ~50–70°)

| Theme | Mode | Notes |
|-------|------|--------|
| **Rocky Blood Orange** | Dark | Blood-orange accent |
| **Orangy One Light** | Light | Orange accent |

**Count:** 1 dark, 1 light.

---

### Blue / Cyan (hue ~200–260°)

| Theme | Mode | Notes |
|-------|------|--------|
| **GitHub Dark Classic** | Dark | Cyan accent |
| **GitHub Light** | Light | Cyan accent |

**Count:** 1 dark, 1 light → **2 total** (one per mode for blue/cyan).

---

### Purple / Violet (hue ~290°)

| Theme | Mode | Notes |
|-------|------|--------|
| **Shades of Purple** | Dark | Purple accent |
| **Semi Light Purple** | Light | Purple accent (Kapil Yadav) |

**Count:** 1 dark, 1 light.

---

### Green (hue ~130–155°)

| Theme | Mode | Notes |
|-------|------|--------|
| **Hack The Box** | Dark | Lime green accent |
| **Green Breeze Light** | Light | Green accent |

**Count:** 1 dark, 1 light.

---

### Pink (hue ~350°)

| Theme | Mode | Notes |
|-------|------|--------|
| **Pink Cat Boo** | Dark | Pink accent |
| **Cute Pink** | Light | Pink accent |

**Count:** 1 dark, 1 light. One pair already.

---

### Yellow (hue ~85–100°)

| Theme | Mode | Notes |
|-------|------|--------|
| **Minimal Dark Neon Yellow** | Dark | Neon yellow accent |
| **Sunflower** | Light | Yellow / sunflower accent |

**Count:** 1 dark, 1 light.

---

## Rainbow coverage (goal: one dark + one light per color)

| Color | Dark themes | Light themes | Paired? |
|-------|-------------|--------------|--------|
| **Red** | 1 (Sandstorm Classic) | 1 (Red Velvet Cupcake) | ✓ |
| **Orange** | 1 (Rocky Blood Orange) | 1 (Orangy One Light) | ✓ |
| **Yellow** | 1 (Minimal Dark Neon Yellow) | 1 (Sunflower) | ✓ |
| **Green** | 1 (Hack The Box) | 1 (Green Breeze) | ✓ |
| **Blue / Cyan** | 1 (GitHub Dark Classic) | 1 (GitHub Light) | ✓ |
| **Purple** | 1 (Shades of Purple) | 1 (Semi Light Purple) | ✓ |
| **Pink** | 1 (Pink Cat Boo) | 1 (Cute Pink) | ✓ |

---

## Summary

- **One theme per color per mode:** Red, Orange, Yellow, Green, Blue/Cyan, Purple, and Pink each have 1 dark and 1 light theme. Blue/Cyan has 1 dark and 1 light (GitHub Dark Classic, GitHub Light). Purple has 1 dark and 1 light (Semi Light Purple). Green has 1 dark and 1 light. Pink has 1 dark and 1 light.
- **Missing for “rainbow” balance:** Rainbow coverage is complete. **All seven colors** (Red, Orange, Yellow, Green, Blue/Cyan, Purple, Pink) have one dark and one light theme. **Possible next steps (if you add more themes):** (none – rainbow is complete).

Theme files live in `src/styles/themes/dark/` and `src/styles/themes/light/`. Accent is set via `--accent` in each theme’s CSS.
