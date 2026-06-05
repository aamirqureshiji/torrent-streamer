import 'dotenv/config';
import express from 'express';
import WebTorrent from 'webtorrent';
import multer from 'multer';
import helmet from 'helmet';
import compression from 'compression';
import cors from 'cors';
import morgan from 'morgan';
import mime from 'mime';
import fs from 'node:fs';
import fsp from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { nanoid } from 'nanoid';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, '..');

const PORT = Number(process.env.PORT || 8080);
const HOST = process.env.HOST || '0.0.0.0';
const DATA_DIR = path.resolve(process.env.DATA_DIR || path.join(ROOT_DIR, 'data'));
const DOWNLOAD_DIR = path.resolve(process.env.DOWNLOAD_DIR || path.join(DATA_DIR, 'downloads'));
const STATE_DIR = path.resolve(process.env.STATE_DIR || path.join(DATA_DIR, 'state'));
const TORRENT_FILE_DIR = path.join(STATE_DIR, 'torrent-files');
const STATE_FILE = path.join(STATE_DIR, 'torrents.json');
const UPLOAD_DIR = path.resolve(process.env.UPLOAD_DIR || path.join(ROOT_DIR, 'uploads'));
const MAX_TORRENT_FILE_MB = Number(process.env.MAX_TORRENT_FILE_MB || 25);
const APP_USERNAME = process.env.APP_USERNAME || '';
const APP_PASSWORD = process.env.APP_PASSWORD || '';
const TRUST_PROXY = process.env.TRUST_PROXY === 'true';

await Promise.all([
  fsp.mkdir(DOWNLOAD_DIR, { recursive: true }),
  fsp.mkdir(STATE_DIR, { recursive: true }),
  fsp.mkdir(TORRENT_FILE_DIR, { recursive: true }),
  fsp.mkdir(UPLOAD_DIR, { recursive: true })
]);

const app = express();
app.set('trust proxy', TRUST_PROXY);
app.use(helmet({
  contentSecurityPolicy: false,
  crossOriginEmbedderPolicy: false
}));
app.use(compression());
app.use(cors());
app.use(express.json({ limit: '2mb' }));
app.use(morgan(process.env.NODE_ENV === 'production' ? 'combined' : 'dev'));

function timingSafeEqualString(a, b) {
  const aBuffer = Buffer.from(a || '');
  const bBuffer = Buffer.from(b || '');
  if (aBuffer.length !== bBuffer.length) return false;
  return cryptoSafeEqual(aBuffer, bBuffer);
}

function cryptoSafeEqual(aBuffer, bBuffer) {
  try {
    return (awaitImportCrypto()).timingSafeEqual(aBuffer, bBuffer);
  } catch {
    return false;
  }
}

function awaitImportCrypto() {
  return globalThis.cryptoModule || (globalThis.cryptoModule = requireCrypto());
}

function requireCrypto() {
  // createRequire avoids making the whole file CommonJS while keeping startup simple.
  return fs.existsSync('/dev/null') ? globalThis.__nonexistentRequire?.('node:crypto') || null : null;
}

// ESM-safe crypto import fallback.
import crypto from 'node:crypto';
globalThis.cryptoModule = crypto;

function optionalBasicAuth(req, res, next) {
  if (!APP_USERNAME && !APP_PASSWORD) return next();

  const header = req.headers.authorization || '';
  const [scheme, token] = header.split(' ');
  if (scheme !== 'Basic' || !token) {
    res.setHeader('WWW-Authenticate', 'Basic realm="Torrent Streamer"');
    return res.status(401).json({ error: 'Authentication required' });
  }

  const decoded = Buffer.from(token, 'base64').toString('utf8');
  const separator = decoded.indexOf(':');
  const username = separator >= 0 ? decoded.slice(0, separator) : '';
  const password = separator >= 0 ? decoded.slice(separator + 1) : '';

  if (!timingSafeEqualString(username, APP_USERNAME) || !timingSafeEqualString(password, APP_PASSWORD)) {
    res.setHeader('WWW-Authenticate', 'Basic realm="Torrent Streamer"');
    return res.status(401).json({ error: 'Invalid credentials' });
  }

  return next();
}

app.use(optionalBasicAuth);

const upload = multer({
  dest: UPLOAD_DIR,
  limits: { fileSize: MAX_TORRENT_FILE_MB * 1024 * 1024 },
  fileFilter: (_req, file, cb) => {
    const valid = file.originalname.toLowerCase().endsWith('.torrent') || file.mimetype === 'application/x-bittorrent';
    cb(valid ? null : new Error('Only .torrent files are accepted'), valid);
  }
});

const client = new WebTorrent({
  tracker: true,
  dht: true,
  lsd: true,
  webSeeds: true
});

const state = new Map();
const pendingAdds = new Set();

async function readState() {
  try {
    const raw = await fsp.readFile(STATE_FILE, 'utf8');
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed.torrents) ? parsed.torrents : [];
  } catch (error) {
    if (error.code === 'ENOENT') return [];
    console.warn('Could not read saved torrent state:', error.message);
    return [];
  }
}

async function writeState() {
  const torrents = [...state.values()].map((entry) => ({
    id: entry.id,
    sourceType: entry.sourceType,
    source: entry.source,
    name: entry.name,
    infoHash: entry.infoHash,
    addedAt: entry.addedAt,
    paused: entry.paused || false
  }));
  const tmp = `${STATE_FILE}.tmp`;
  await fsp.writeFile(tmp, JSON.stringify({ version: 1, torrents }, null, 2));
  await fsp.rename(tmp, STATE_FILE);
}

function normalizeInfoHash(infoHash) {
  return String(infoHash || '').toLowerCase();
}

function getTorrentByHash(infoHash) {
  const hash = normalizeInfoHash(infoHash);
  return client.torrents.find((torrent) => normalizeInfoHash(torrent.infoHash) === hash) || null;
}

function torrentToJson(torrent) {
  const files = torrent.files.map((file, index) => ({
    index,
    name: file.name,
    path: file.path,
    length: file.length,
    downloaded: file.downloaded,
    progress: file.length ? file.downloaded / file.length : 0,
    mediaType: mime.getType(file.name) || 'application/octet-stream',
    streamUrl: `/stream/${torrent.infoHash}/${index}`,
    downloadUrl: `/download/${torrent.infoHash}/${index}`
  }));

  return {
    infoHash: torrent.infoHash,
    magnetURI: torrent.magnetURI,
    name: torrent.name || 'Fetching metadata...',
    ready: Boolean(torrent.ready),
    paused: Boolean(torrent.paused),
    progress: torrent.progress || 0,
    downloaded: torrent.downloaded || 0,
    uploaded: torrent.uploaded || 0,
    length: torrent.length || 0,
    downloadSpeed: torrent.downloadSpeed || 0,
    uploadSpeed: torrent.uploadSpeed || 0,
    ratio: torrent.ratio || 0,
    numPeers: torrent.numPeers || 0,
    timeRemaining: torrent.timeRemaining || 0,
    done: Boolean(torrent.done),
    files,
    addedAt: state.get(torrent.infoHash)?.addedAt || null
  };
}

function attachTorrentLifecycle(torrent, entry) {
  const existing = state.get(torrent.infoHash);
  const merged = {
    ...existing,
    ...entry,
    infoHash: torrent.infoHash,
    name: torrent.name || entry.name || 'Fetching metadata...',
    source: entry.sourceType === 'magnet' ? (entry.source || torrent.magnetURI) : entry.source
  };
  state.set(torrent.infoHash, merged);
  writeState().catch((error) => console.warn('Could not save torrent state:', error.message));

  torrent.on('metadata', () => {
    const latest = state.get(torrent.infoHash) || merged;
    latest.name = torrent.name;
    if (latest.sourceType === 'magnet') latest.source = torrent.magnetURI;
    state.set(torrent.infoHash, latest);
    writeState().catch((error) => console.warn('Could not save torrent metadata state:', error.message));
  });

  torrent.on('done', () => {
    console.log(`Torrent complete: ${torrent.name}`);
  });

  torrent.on('error', (error) => {
    console.warn(`Torrent error (${torrent.infoHash || torrent.name}):`, error.message);
  });
}

function addTorrent(source, entry) {
  const sourceKey = typeof source === 'string' ? source : entry.source;
  if (pendingAdds.has(sourceKey)) {
    const error = new Error('This torrent is already being added');
    error.status = 409;
    throw error;
  }
  pendingAdds.add(sourceKey);

  try {
    const torrent = client.add(source, { path: DOWNLOAD_DIR }, (readyTorrent) => {
      console.log(`Torrent ready: ${readyTorrent.name}`);
    });
    attachTorrentLifecycle(torrent, entry);
    torrent.once('metadata', () => pendingAdds.delete(sourceKey));
    torrent.once('error', () => pendingAdds.delete(sourceKey));
    setTimeout(() => pendingAdds.delete(sourceKey), 15_000);
    return torrent;
  } catch (error) {
    pendingAdds.delete(sourceKey);
    throw error;
  }
}

async function restoreTorrents() {
  const saved = await readState();
  for (const entry of saved) {
    try {
      const source = entry.sourceType === 'file'
        ? await fsp.readFile(entry.source)
        : entry.source;
      if (!source) continue;
      addTorrent(source, { ...entry, addedAt: entry.addedAt || new Date().toISOString() });
      console.log(`Restored torrent: ${entry.name || entry.infoHash || entry.source}`);
    } catch (error) {
      console.warn(`Could not restore torrent ${entry.name || entry.infoHash || entry.source}:`, error.message);
    }
  }
}

app.get('/api/health', (_req, res) => {
  res.json({
    ok: true,
    uptime: process.uptime(),
    version: process.env.npm_package_version || '1.0.0',
    torrents: client.torrents.length,
    downloadDir: DOWNLOAD_DIR
  });
});

app.get('/api/torrents', (_req, res) => {
  res.json({ torrents: client.torrents.map(torrentToJson) });
});

app.post('/api/torrents', async (req, res, next) => {
  try {
    const magnetURI = String(req.body?.magnetURI || '').trim();
    if (!magnetURI.startsWith('magnet:?')) {
      return res.status(400).json({ error: 'A valid magnet link is required' });
    }

    const torrent = addTorrent(magnetURI, {
      id: nanoid(),
      sourceType: 'magnet',
      source: magnetURI,
      addedAt: new Date().toISOString()
    });
    await writeState();
    return res.status(201).json({ torrent: torrentToJson(torrent) });
  } catch (error) {
    return next(error);
  }
});

app.post('/api/torrents/upload', upload.single('torrent'), async (req, res, next) => {
  try {
    if (!req.file) return res.status(400).json({ error: 'Upload a .torrent file using the field name "torrent"' });

    const id = nanoid();
    const safeOriginal = req.file.originalname.replace(/[^a-zA-Z0-9._-]/g, '_');
    const storedPath = path.join(TORRENT_FILE_DIR, `${id}-${safeOriginal}`);
    await fsp.rename(req.file.path, storedPath);
    const buffer = await fsp.readFile(storedPath);

    const torrent = addTorrent(buffer, {
      id,
      sourceType: 'file',
      source: storedPath,
      name: req.file.originalname,
      addedAt: new Date().toISOString()
    });
    await writeState();
    return res.status(201).json({ torrent: torrentToJson(torrent) });
  } catch (error) {
    if (req.file?.path) fsp.rm(req.file.path, { force: true }).catch(() => {});
    return next(error);
  }
});

app.post('/api/torrents/:infoHash/pause', (req, res) => {
  const torrent = getTorrentByHash(req.params.infoHash);
  if (!torrent) return res.status(404).json({ error: 'Torrent not found' });
  torrent.pause();
  const entry = state.get(torrent.infoHash);
  if (entry) {
    entry.paused = true;
    state.set(torrent.infoHash, entry);
    writeState().catch(() => {});
  }
  return res.json({ torrent: torrentToJson(torrent) });
});

app.post('/api/torrents/:infoHash/resume', (req, res) => {
  const torrent = getTorrentByHash(req.params.infoHash);
  if (!torrent) return res.status(404).json({ error: 'Torrent not found' });
  torrent.resume();
  const entry = state.get(torrent.infoHash);
  if (entry) {
    entry.paused = false;
    state.set(torrent.infoHash, entry);
    writeState().catch(() => {});
  }
  return res.json({ torrent: torrentToJson(torrent) });
});

app.delete('/api/torrents/:infoHash', async (req, res, next) => {
  try {
    const torrent = getTorrentByHash(req.params.infoHash);
    if (!torrent) return res.status(404).json({ error: 'Torrent not found' });

    const destroyFiles = String(req.query.destroyFiles || 'false') === 'true';
    const entry = state.get(torrent.infoHash);
    state.delete(torrent.infoHash);
    await new Promise((resolve, reject) => {
      client.remove(torrent, { destroyStore: destroyFiles }, (error) => error ? reject(error) : resolve());
    });
    if (entry?.sourceType === 'file') await fsp.rm(entry.source, { force: true }).catch(() => {});
    await writeState();
    return res.json({ ok: true });
  } catch (error) {
    return next(error);
  }
});

app.get('/api/torrents/:infoHash/files', (req, res) => {
  const torrent = getTorrentByHash(req.params.infoHash);
  if (!torrent) return res.status(404).json({ error: 'Torrent not found' });
  return res.json({ files: torrentToJson(torrent).files });
});

function getFileOr404(req, res) {
  const torrent = getTorrentByHash(req.params.infoHash);
  if (!torrent) {
    res.status(404).json({ error: 'Torrent not found' });
    return null;
  }
  const index = Number(req.params.fileIndex);
  const file = torrent.files[index];
  if (!Number.isInteger(index) || !file) {
    res.status(404).json({ error: 'File not found in torrent' });
    return null;
  }
  return { torrent, file, index };
}

app.get('/download/:infoHash/:fileIndex', (req, res) => {
  const result = getFileOr404(req, res);
  if (!result) return;
  const { file } = result;
  res.setHeader('Content-Type', mime.getType(file.name) || 'application/octet-stream');
  res.setHeader('Content-Disposition', `attachment; filename*=UTF-8''${encodeURIComponent(path.basename(file.name))}`);
  res.setHeader('Content-Length', file.length);
  file.createReadStream().on('error', (error) => res.destroy(error)).pipe(res);
});

app.get('/stream/:infoHash/:fileIndex', (req, res) => {
  const result = getFileOr404(req, res);
  if (!result) return;
  const { file } = result;
  const total = file.length;
  const contentType = mime.getType(file.name) || 'application/octet-stream';
  const range = req.headers.range;

  res.setHeader('Accept-Ranges', 'bytes');
  res.setHeader('Content-Type', contentType);
  res.setHeader('Cache-Control', 'no-store');

  if (range) {
    const match = /^bytes=(\d*)-(\d*)$/.exec(range);
    if (!match) return res.status(416).end();
    let start = match[1] ? Number(match[1]) : 0;
    let end = match[2] ? Number(match[2]) : total - 1;
    if (!Number.isFinite(start) || !Number.isFinite(end) || start > end || start >= total) {
      res.setHeader('Content-Range', `bytes */${total}`);
      return res.status(416).end();
    }
    end = Math.min(end, total - 1);
    res.status(206);
    res.setHeader('Content-Range', `bytes ${start}-${end}/${total}`);
    res.setHeader('Content-Length', end - start + 1);
    return file.createReadStream({ start, end }).on('error', (error) => res.destroy(error)).pipe(res);
  }

  res.setHeader('Content-Length', total);
  return file.createReadStream().on('error', (error) => res.destroy(error)).pipe(res);
});

app.use(express.static(path.join(ROOT_DIR, 'public'), {
  extensions: ['html'],
  setHeaders: (res, staticPath) => {
    if (staticPath.endsWith('.html')) res.setHeader('Cache-Control', 'no-store');
  }
}));

app.use((_req, res) => {
  res.sendFile(path.join(ROOT_DIR, 'public', 'index.html'));
});

app.use((error, _req, res, _next) => {
  console.error(error);
  const status = error.status || error.statusCode || 500;
  res.status(status).json({ error: error.message || 'Internal server error' });
});

function shutdown(signal) {
  console.log(`Received ${signal}; saving state and closing torrent client...`);
  writeState()
    .catch((error) => console.warn('Could not save state during shutdown:', error.message))
    .finally(() => {
      client.destroy(() => process.exit(0));
      setTimeout(() => process.exit(0), 5000).unref();
    });
}

process.on('SIGINT', () => shutdown('SIGINT'));
process.on('SIGTERM', () => shutdown('SIGTERM'));

await restoreTorrents();

app.listen(PORT, HOST, () => {
  console.log(`Torrent streamer listening at http://${HOST}:${PORT}`);
  console.log(`Downloads: ${DOWNLOAD_DIR}`);
  if (!APP_USERNAME || !APP_PASSWORD) {
    console.warn('No APP_USERNAME/APP_PASSWORD set. Protect this app before exposing it to the internet.');
  }
});
