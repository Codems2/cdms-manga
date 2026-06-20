// Service Worker: cachea el "app shell" para arranque rápido y uso offline parcial.
// Las imágenes del manga se sirven desde MangaDex (red) y no se precachean.

const CACHE = 'cdms-shell-v2';
const SHELL = [
  './',
  './index.html',
  './css/styles.css',
  './js/app.js',
  './js/api.js',
  './js/store.js',
  './manifest.webmanifest',
];

self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(CACHE).then((c) => c.addAll(SHELL)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (e) => {
  const { request } = e;
  if (request.method !== 'GET') return;

  const url = new URL(request.url);

  // No interceptar la API ni las imágenes de MangaDex (siempre desde la red).
  if (url.hostname.includes('mangadex.org')) return;

  // App shell: cache-first con actualización en segundo plano.
  if (url.origin === self.location.origin) {
    e.respondWith(
      caches.match(request).then((cached) => {
        const fetched = fetch(request).then((res) => {
          if (res.ok) caches.open(CACHE).then((c) => c.put(request, res.clone()));
          return res;
        }).catch(() => cached);
        return cached || fetched;
      })
    );
  }
});
