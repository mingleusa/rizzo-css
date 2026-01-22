// Quick reference for OKLCH conversions
// Using approximate conversions - for production, use a proper color conversion library

const conversions = {
  // Dracula Theme
  '#282a36': 'oklch(0.25 0.02 270)',      // bg
  '#21222c': 'oklch(0.20 0.02 270)',      // bg-alt
  '#44475a': 'oklch(0.35 0.03 270)',      // current-line
  '#f8f8f2': 'oklch(0.97 0.005 100)',    // fg
  '#e2e2dc': 'oklch(0.90 0.005 100)',     // fg-dim
  '#6272a4': 'oklch(0.50 0.08 260)',      // comment
  '#8be9fd': 'oklch(0.85 0.12 220)',      // cyan
  '#50fa7b': 'oklch(0.75 0.20 150)',      // green
  '#ffb86c': 'oklch(0.80 0.15 60)',       // orange
  '#ff79c6': 'oklch(0.75 0.20 340)',      // pink
  '#bd93f9': 'oklch(0.70 0.18 290)',      // purple
  '#ff5555': 'oklch(0.65 0.22 25)',       // red
  '#f1fa8c': 'oklch(0.90 0.15 100)',      // yellow
  
  // Default Theme
  '#ffffff': 'oklch(1 0 0)',              // background
  '#f5f5f5': 'oklch(0.97 0 0)',            // background-alt
  '#333333': 'oklch(0.25 0 0)',            // text
  '#666666': 'oklch(0.50 0 0)',            // text-dim
  '#e0e0e0': 'oklch(0.90 0 0)',            // border
  '#0066cc': 'oklch(0.45 0.20 250)',       // accent
  '#0052a3': 'oklch(0.40 0.20 250)',       // accent-hover
  '#28a745': 'oklch(0.60 0.18 145)',       // success
  '#ffc107': 'oklch(0.80 0.15 90)',        // warning
  '#dc3545': 'oklch(0.55 0.22 25)',        // error
  '#17a2b8': 'oklch(0.60 0.12 210)',       // info
  '#0066cc': 'oklch(0.45 0.20 250)',       // primary-color
  '#333333': 'oklch(0.25 0 0)',            // secondary-color
};

console.log('Conversion reference created');
console.log('Note: These are approximate conversions. For production, verify with a color conversion tool.');
