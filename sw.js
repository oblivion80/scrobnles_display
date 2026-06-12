// Minimal service worker — required for "Add to Home Screen" installability.
// No offline caching of API data (we always want fresh scrobble counts).
const CACHE_NAME = 'scrobble-counter-v1';
const ASSETS = ['./index.html', './manifest.json', './icon-192.png', './icon-512.png'];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS))
  );
});

self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url);
  // Never cache Last.fm API calls — always fetch fresh
  if (url.hostname.includes('audioscrobbler.com')) return;

  event.respondWith(
    caches.match(event.request).then((cached) => cached || fetch(event.request))
  );
});