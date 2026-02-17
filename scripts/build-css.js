import postcss from 'postcss';
import postcssImport from 'postcss-import';
import autoprefixer from 'autoprefixer';
import cssnano from 'cssnano';
import { readFileSync, writeFileSync, mkdirSync, copyFileSync, readdirSync, existsSync, statSync, rmSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const rootDir = join(__dirname, '..');

const inputFile = join(rootDir, 'src/styles/main.css');
const outputPublic = join(rootDir, 'public/css/main.min.css');
const outputPackage = join(rootDir, 'packages/rizzo-css/dist/rizzo.min.css');
const fontsSrc = join(rootDir, 'src/assets/fonts');
const sfxSrc = join(rootDir, 'src/assets/sfx');
const sfxDest = join(rootDir, 'public/assets/sfx');
const iconsSrc = join(rootDir, 'src/components/icons');
const iconsDest = join(rootDir, 'public/icons');

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

/** Extract raw SVG from an Astro icon file (same logic as copy-scaffold). */
function extractSvgFromAstro(astroPath) {
  const raw = readFileSync(astroPath, 'utf8');
  const parts = raw.split('---');
  const template = parts.length >= 3 ? parts.slice(2).join('---').trim() : raw;
  const match = template.match(/<svg[\s\S]*?<\/svg>/);
  if (!match) return null;
  let svg = match[0]
    .replace(/\s*width=\{[^}]+\}/, ' width="24"')
    .replace(/\s*height=\{[^}]+\}/, ' height="24"')
    .replace(/\s*class=\{[^}]+\}/, '')
    .replace(/\s*class=\{[\s\S]*?\.trim\(\)\}/, '')
    .replace(/\s*class=\{[^}]+\}/, '')
    .replace(/\bid=\{gradientId1\}/g, 'id="grad-1"')
    .replace(/\bid=\{gradientId2\}/g, 'id="grad-2"')
    .replace(/\bfill=\{`url\(#\$\{gradientId1\}\)`\}/g, 'fill="url(#grad-1)"')
    .replace(/\bfill=\{`url\(#\$\{gradientId2\}\)`\}/g, 'fill="url(#grad-2)"')
    .replace(/"`\.trim\(\)\}/g, '"')
    .replace(/`\.trim\(\)\}/g, '');
  return svg;
}

/** Copy all icon SVGs from src/components/icons to public/icons. Single source of truth: clears public/icons then writes from Astro icons (no duplicates). */
function copyIconsToPublic(astroIconsDir, publicIconsDir) {
  if (!existsSync(astroIconsDir)) return 0;
  if (existsSync(publicIconsDir)) {
    rmSync(publicIconsDir, { recursive: true });
  }
  mkdirSync(publicIconsDir, { recursive: true });
  let count = 0;
  function walk(dir, rel = '') {
    const entries = readdirSync(dir, { withFileTypes: true });
    for (const e of entries) {
      const srcPath = join(dir, e.name);
      const destRel = rel ? join(rel, e.name) : e.name;
      if (e.isDirectory()) {
        mkdirSync(join(publicIconsDir, destRel), { recursive: true });
        walk(srcPath, destRel);
      } else if (e.name.endsWith('.astro')) {
        const svg = extractSvgFromAstro(srcPath);
        if (svg) {
          const outPath = join(publicIconsDir, destRel.replace(/\.astro$/, '.svg'));
          mkdirSync(dirname(outPath), { recursive: true });
          writeFileSync(outPath, svg);
          count++;
        }
      }
    }
  }
  walk(astroIconsDir);
  return count;
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
      // Keep quotes in url() so package font path rewrite produces valid CSS (normalizeUrl strips them and broke @font-face)
      normalizeUrl: false,
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

    // Copy sound effects from src/assets/sfx to public/assets/sfx
    if (existsSync(sfxSrc)) {
      mkdirSync(sfxDest, { recursive: true });
      for (const name of readdirSync(sfxSrc)) {
        if (name.endsWith('.mp3') || name.endsWith('.wav') || name.endsWith('.ogg')) {
          copyFileSync(join(sfxSrc, name), join(sfxDest, name));
        }
      }
    }

    // Copy all icon SVGs from src/components/icons to public/icons (single source of truth; no duplicates)
    copyIconsToPublic(iconsSrc, iconsDest);

    // Public CSS: keep original URLs (../assets/fonts/ for docs site)
    writeFileSync(outputPublic, fullCss);

    // Package CSS: rewrite font URLs so they resolve from dist/rizzo.min.css to dist/fonts/
    let packageCss = fullCss.replace(/url\(['"]?\.\.\/assets\/fonts\//g, "url('./fonts/");
    // cssnano can strip closing quotes from url(); ensure font url() are properly quoted for package
    packageCss = packageCss.replace(/url\('\.\/fonts\/(.+?)\)\s*format/g, "url('./fonts/$1') format");
    writeFileSync(outputPackage, packageCss);
  })
  .catch((error) => {
    console.error('Error building CSS:', error);
    process.exit(1);
  });
