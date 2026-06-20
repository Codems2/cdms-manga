// Service Worker: cachea el "app shell" para arranque rápido y uso offline.
// La app es totalmente estática (sin red en tiempo de ejecución), así que
// funciona offline una vez instalada.

const CACHE = 'cafe-shell-v1';
const SHELL = [
  './',
  './index.html',
  './css/styles.css',
  './js/app.js',
  './js/data.js',
  './js/store.js',
  './manifest.webmanifest',
  './icons/icon-192.png',
  './icons/icon-512.png',
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
  if (url.origin !== self.location.origin) return;

  // Cache-first con actualización en segundo plano.
  e.respondWith(
    caches.match(request).then((cached) => {
      const fetched = fetch(request).then((res) => {
        if (res.ok) caches.open(CACHE).then((c) => c.put(request, res.clone()));
        return res;
      }).catch(() => cached);
      return cached || fetched;
    })
  );
});
