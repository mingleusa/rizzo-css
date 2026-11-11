'use strict';
/**
 * Production server for the Rizzo CSS docs site (Plesk Node.js / Phusion Passenger).
 *
 * The site is a fully static Astro build, so this just serves `dist/` with the same cache and
 * security headers that vercel.json used to provide. Zero dependencies: the server only needs
 * Node itself, no `npm install` on the host.
 *
 * On the server the layout is:   <app root>/server.cjs  +  <app root>/dist/   (uploaded via `pnpm package:deploy`)
 * Locally:                       pnpm build && pnpm serve:prod
 *
 * Env: PORT (Passenger sets it; default 4321), SITE_DIR (default ./dist next to this file).
 */
const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');
const zlib = require('node:zlib');
const { pipeline } = require('node:stream');

const ROOT = path.resolve(process.env.SITE_DIR || path.join(__dirname, 'dist'));
const PORT = Number(process.env.PORT) || 4321;

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.mjs': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.webmanifest': 'application/manifest+json; charset=utf-8',
  '.txt': 'text/plain; charset=utf-8',
  '.md': 'text/markdown; charset=utf-8',
  '.xml': 'application/xml; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.webp': 'image/webp',
  '.avif': 'image/avif',
  '.ico': 'image/x-icon',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.ttf': 'font/ttf',
  '.otf': 'font/otf',
  '.mp3': 'audio/mpeg',
  '.wav': 'audio/wav',
  '.mp4': 'video/mp4',
  '.webm': 'video/webm',
  '.pdf': 'application/pdf',
};

const COMPRESSIBLE = /^(text\/|application\/(json|manifest\+json|xml)|image\/svg\+xml)/;
const IMMUTABLE_PREFIXES = ['/assets/', '/_astro/', '/css/', '/icons/'];

const SECURITY_HEADERS = {
  'X-Content-Type-Options': 'nosniff',
  'X-Frame-Options': 'SAMEORIGIN',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
};

function send(res, status, body, headers = {}) {
  res.writeHead(status, { ...SECURITY_HEADERS, 'Content-Type': 'text/plain; charset=utf-8', ...headers });
  res.end(body);
}

/** Resolve a URL path to a file inside ROOT; returns { file, stat } or null. */
function resolve(urlPath) {
  const target = path.join(ROOT, urlPath);
  if (target !== ROOT && !target.startsWith(ROOT + path.sep)) return null; // path traversal
  let stat;
  try {
    stat = fs.statSync(target);
  } catch {
    return null;
  }
  if (stat.isDirectory()) {
    // Serve /docs/foo and /docs/foo/ alike (as Vercel did); internal links omit the trailing slash.
    const index = path.join(target, 'index.html');
    try {
      return { file: index, stat: fs.statSync(index) };
    } catch {
      return null;
    }
  }
  return stat.isFile() ? { file: target, stat } : null;
}

function notFound(req, res) {
  const page = resolve('/404.html');
  if (page) return serveFile(req, res, page, 404);
  send(res, 404, 'Not found');
}

function serveFile(req, res, { file, stat }, status = 200) {
  const urlPath = req.url.split('?')[0];
  const type = MIME[path.extname(file).toLowerCase()] || 'application/octet-stream';
  const etag = `W/"${stat.size.toString(16)}-${Math.floor(stat.mtimeMs).toString(16)}"`;
  const headers = {
    ...SECURITY_HEADERS,
    'Content-Type': type,
    'Last-Modified': stat.mtime.toUTCString(),
    ETag: etag,
    'Cache-Control': IMMUTABLE_PREFIXES.some((p) => urlPath.startsWith(p))
      ? 'public, max-age=31536000, immutable'
      : 'public, max-age=0, must-revalidate',
  };

  if (status === 200 && req.headers['if-none-match'] === etag) {
    res.writeHead(304, headers);
    return res.end();
  }

  const gzip = COMPRESSIBLE.test(type) && stat.size > 1024 && /\bgzip\b/.test(req.headers['accept-encoding'] || '');
  if (gzip) {
    headers['Content-Encoding'] = 'gzip';
    headers.Vary = 'Accept-Encoding';
  } else {
    headers['Content-Length'] = stat.size;
  }
  res.writeHead(status, headers);
  if (req.method === 'HEAD') return res.end();

  const stream = fs.createReadStream(file);
  const onError = (err) => {
    if (err) res.destroy(err);
  };
  if (gzip) pipeline(stream, zlib.createGzip(), res, onError);
  else pipeline(stream, res, onError);
}

const server = http.createServer((req, res) => {
  if (req.method !== 'GET' && req.method !== 'HEAD') {
    return send(res, 405, 'Method not allowed', { Allow: 'GET, HEAD' });
  }
  let urlPath;
  try {
    urlPath = decodeURIComponent(new URL(req.url, 'http://localhost').pathname);
  } catch {
    return send(res, 400, 'Bad request');
  }
  if (urlPath.includes('\0')) return send(res, 400, 'Bad request');

  const found = resolve(urlPath);
  if (!found) return notFound(req, res);
  serveFile(req, res, found);
});

server.listen(PORT, () => {
  console.log(`Rizzo CSS site serving ${ROOT} on port ${PORT}`);
});
