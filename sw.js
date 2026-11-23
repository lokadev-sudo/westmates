// Westmates service worker: lets the app open offline and install to the home screen.
// Network first: when online, every open gets the latest files from the server (so updates show up straight away);
// the saved copy is only used when there is no connection.
const VERSION = 'westmates-v20';
const SHELL = [
  './',
  './index.html',
  './styles.css',
  './app.js',
  './manifest.webmanifest',
  './icon-192.png',
  './icon-512.png',
  './icon-maskable-512.png',
  './apple-touch-icon.png',
  './favicon-32.png',
  './qr.png'
];

self.addEventListener('install', (e) => {
  // cache: 'reload' skips the browser's own short-term cache, so the saved copy is always the new version
  e.waitUntil(
    caches.open(VERSION)
      .then((c) => Promise.all(SHELL.map((url) =>
        fetch(new Request(url, { cache: 'reload' })).then((res) => { if (res.ok) return c.put(url, res); }).catch(() => {}))))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== VERSION).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (e) => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  const sameOrigin = url.origin === self.location.origin;
  const isFont = /fonts\.(googleapis|gstatic)\.com$/.test(url.hostname);
  if (!sameOrigin && !isFont) return;

  if (isFont) { // fonts never change: saved copy first
    e.respondWith(caches.match(req).then((hit) => hit || fetch(req).then((res) => {
      if (res.ok) { const copy = res.clone(); caches.open(VERSION).then((c) => c.put(req, copy)); }
      return res;
    })));
    return;
  }

  // app files: ask the server first (checks it has the newest version), fall back to the saved copy offline
  e.respondWith(
    fetch(req, { cache: 'no-cache' }).then((res) => {
      if (res.ok) { const copy = res.clone(); caches.open(VERSION).then((c) => c.put(req, copy)); }
      return res;
    }).catch(() => caches.match(req, { ignoreSearch: true })
      .then((hit) => hit || caches.match('./index.html')))
  );
});
