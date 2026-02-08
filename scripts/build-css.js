import postcss from 'postcss';
import postcssImport from 'postcss-import';
import autoprefixer from 'autoprefixer';
import cssnano from 'cssnano';
import { readFileSync, writeFileSync, mkdirSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const rootDir = join(__dirname, '..');

const inputFile = join(rootDir, 'src/styles/main.css');
const outputPublic = join(rootDir, 'public/css/main.min.css');
const outputPackage = join(rootDir, 'packages/rizzo-css/dist/rizzo.min.css');

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
  .process(css, { from: inputFile, to: outputPublic })
  .then((result) => {
    writeFileSync(outputPublic, result.css);
    mkdirSync(join(rootDir, 'packages/rizzo-css/dist'), { recursive: true });
    writeFileSync(outputPackage, result.css);
  })
  .catch((error) => {
    console.error('Error building CSS:', error);
    process.exit(1);
  });
