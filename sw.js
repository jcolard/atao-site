const CACHE_NAME = 'atao-cache-v2'; // incrémenté pour forcer la mise à jour
const urlsToCache = [
  './',
  './index.html',
  './manifest.json',
  './icon-192.png',
  './icon-512.png'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(urlsToCache))
  );
  self.skipWaiting(); // Active immédiatement le nouveau SW
});

self.addEventListener('activate', event => {
  // Supprime les anciens caches
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
    )
  );
  self.clients.claim(); // Prend le contrôle immédiatement
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => response || fetch(event.request))
  );
});
