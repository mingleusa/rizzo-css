#!/usr/bin/env node
/**
 * Package the built site for upload to the Plesk Node.js app (see docs/DEPLOYMENT.md).
 *
 * Creates release/rizzo-css-site-v<version>-<sha>.zip containing:
 *   server.cjs   (from deploy/server.cjs: the app's startup file)
 *   dist/…       (the built site)
 * Extract it in the application root so server.cjs and dist/ sit side by side.
 *
 * Usage: pnpm package:deploy  (builds first)   or   node scripts/package-deploy.mjs  (uses existing dist/)
 * No dependencies: writes the zip format directly (deflate via node:zlib, CRC via zlib.crc32).
 */
import { execSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import zlib from 'node:zlib';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const distDir = path.join(root, 'dist');
const serverFile = path.join(root, 'deploy', 'server.cjs');

if (!fs.existsSync(path.join(distDir, 'index.html'))) {
  console.error('dist/index.html not found. Run `pnpm build` first (or use `pnpm package:deploy`).');
  process.exit(1);
}

const { version } = JSON.parse(fs.readFileSync(path.join(root, 'package.json'), 'utf8'));
let sha = 'local';
try {
  sha = execSync('git rev-parse --short HEAD', { cwd: root }).toString().trim();
  if (execSync('git status --porcelain', { cwd: root }).toString().trim()) sha += '-dirty';
} catch {}

/** @returns {string[]} file paths under dir, sorted */
function walk(dir) {
  return fs
    .readdirSync(dir, { withFileTypes: true })
    .flatMap((e) => (e.isDirectory() ? walk(path.join(dir, e.name)) : e.isFile() ? [path.join(dir, e.name)] : []))
    .sort();
}

const entries = [
  { name: 'server.cjs', file: serverFile },
  ...walk(distDir).map((file) => ({ name: 'dist/' + path.relative(distDir, file).split(path.sep).join('/'), file })),
];

function dosDateTime(date) {
  const time = (date.getHours() << 11) | (date.getMinutes() << 5) | (date.getSeconds() >> 1);
  const day = ((date.getFullYear() - 1980) << 9) | ((date.getMonth() + 1) << 5) | date.getDate();
  return { time, day };
}

const chunks = [];
const central = [];
let offset = 0;

for (const { name, file } of entries) {
  const data = fs.readFileSync(file);
  const deflated = zlib.deflateRawSync(data, { level: 9 });
  const useDeflate = deflated.length < data.length;
  const body = useDeflate ? deflated : data;
  const crc = zlib.crc32(data);
  const nameBuf = Buffer.from(name, 'utf8');
  const { time, day } = dosDateTime(fs.statSync(file).mtime);

  const local = Buffer.alloc(30);
  local.writeUInt32LE(0x04034b50, 0);
  local.writeUInt16LE(20, 4); // version needed
  local.writeUInt16LE(0x0800, 6); // UTF-8 names
  local.writeUInt16LE(useDeflate ? 8 : 0, 8);
  local.writeUInt16LE(time, 10);
  local.writeUInt16LE(day, 12);
  local.writeUInt32LE(crc, 14);
  local.writeUInt32LE(body.length, 18);
  local.writeUInt32LE(data.length, 22);
  local.writeUInt16LE(nameBuf.length, 26);
  local.writeUInt16LE(0, 28);

  const cen = Buffer.alloc(46);
  cen.writeUInt32LE(0x02014b50, 0);
  cen.writeUInt16LE((3 << 8) | 20, 4); // made by: Unix
  cen.writeUInt16LE(20, 6);
  cen.writeUInt16LE(0x0800, 8);
  cen.writeUInt16LE(useDeflate ? 8 : 0, 10);
  cen.writeUInt16LE(time, 12);
  cen.writeUInt16LE(day, 14);
  cen.writeUInt32LE(crc, 16);
  cen.writeUInt32LE(body.length, 20);
  cen.writeUInt32LE(data.length, 24);
  cen.writeUInt16LE(nameBuf.length, 28);
  cen.writeUInt32LE((0o100644 << 16) >>> 0, 38); // -rw-r--r--
  cen.writeUInt32LE(offset, 42);

  chunks.push(local, nameBuf, body);
  central.push(cen, nameBuf);
  offset += local.length + nameBuf.length + body.length;
}

const centralBuf = Buffer.concat(central);
const end = Buffer.alloc(22);
end.writeUInt32LE(0x06054b50, 0);
end.writeUInt16LE(entries.length, 8);
end.writeUInt16LE(entries.length, 10);
end.writeUInt32LE(centralBuf.length, 12);
end.writeUInt32LE(offset, 16);

if (offset + centralBuf.length > 0xffffffff || entries.length > 0xffff) {
  console.error('Archive too large for a standard zip (needs zip64).');
  process.exit(1);
}

const outDir = path.join(root, 'release');
fs.mkdirSync(outDir, { recursive: true });
const outFile = path.join(outDir, `rizzo-css-site-v${version}-${sha}.zip`);
fs.writeFileSync(outFile, Buffer.concat([...chunks, centralBuf, end]));

const mb = (fs.statSync(outFile).size / 1024 / 1024).toFixed(1);
console.log(`\n✓ ${path.relative(root, outFile)} (${entries.length} files, ${mb} MB)`);
console.log('  Upload it to the Plesk application root, extract it there, then click "Restart App". See docs/DEPLOYMENT.md.\n');
