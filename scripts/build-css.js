import postcss from 'postcss';
import postcssImport from 'postcss-import';
import autoprefixer from 'autoprefixer';
import cssnano from 'cssnano';
import { readFileSync, writeFileSync, mkdirSync, copyFileSync, readdirSync, existsSync, statSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const rootDir = join(__dirname, '..');

const inputFile = join(rootDir, 'src/styles/main.css');
const outputPublic = join(rootDir, 'public/css/main.min.css');
const outputPackage = join(rootDir, 'packages/rizzo-css/dist/rizzo.min.css');
const fontsSrc = join(rootDir, 'src/assets/fonts');

/** Copy a directory recursively (files and subdirs) to dest. */
function copyDirRecursive(src, dest) {
  mkdirSync(dest, { recursive: true });
  for (const name of readdirSync(src)) {
    const srcPath = join(src, name);
    const destPath = join(dest, name);
    if (statSync(srcPath).isDirectory()) {
      copyDirRecursive(srcPath, destPath);
    } else {
      copyFileSync(srcPath, destPath);
    }
  }
}

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
    const fullCss = result.css;
    mkdirSync(join(rootDir, 'public', 'css'), { recursive: true });
    mkdirSync(join(rootDir, 'packages/rizzo-css/dist'), { recursive: true });

    // Copy fonts for docs site (public) and package (dist/fonts)
    if (existsSync(fontsSrc)) {
      const publicFonts = join(rootDir, 'public/assets/fonts');
      const packageFonts = join(rootDir, 'packages/rizzo-css/dist/fonts');
      copyDirRecursive(fontsSrc, publicFonts);
      copyDirRecursive(fontsSrc, packageFonts);
    }

    // Public CSS: keep original URLs (../assets/fonts/ for docs site)
    writeFileSync(outputPublic, fullCss);

    // Package CSS: rewrite font URLs so they resolve from dist/rizzo.min.css to dist/fonts/
    const packageCss = fullCss.replace(/url\(['"]?\.\.\/assets\/fonts\//g, "url('./fonts/");
    writeFileSync(outputPackage, packageCss);
  })
  .catch((error) => {
    console.error('Error building CSS:', error);
    process.exit(1);
  });
