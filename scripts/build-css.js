import postcss from 'postcss';
import postcssImport from 'postcss-import';
import autoprefixer from 'autoprefixer';
import cssnano from 'cssnano';
import { readFileSync, writeFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const rootDir = join(__dirname, '..');

const inputFile = join(rootDir, 'src/styles/main.css');
const outputFile = join(rootDir, 'public/css/main.min.css');

const css = readFileSync(inputFile, 'utf8');

postcss([
  postcssImport(),
  autoprefixer(),
  cssnano({
    preset: ['default', {
      minifySelectors: false, // Preserves pseudo-element syntax (::before, ::after)
      normalizeWhitespace: true, // Still minifies whitespace
      discardComments: { removeAll: true }, // Remove comments in production
    }],
  }),
])
  .process(css, { from: inputFile, to: outputFile })
  .then((result) => {
    writeFileSync(outputFile, result.css);
    console.log(`✓ Built minified CSS: ${outputFile}`);
  })
  .catch((error) => {
    console.error('Error building CSS:', error);
    process.exit(1);
  });
