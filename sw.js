// Service Worker – Dziennik-Kiero- (offline + cache)
// Wersja cache zwiększaj przy aktualizacjach, np. v2, v3...
const CACHE_NAME = 'dziennik-kiero-cache-v1';
const OFFLINE_URL = './offline.html';

const URLS_TO_CACHE = [
  './',
  './index.html',
  './manifest.json',
  './icon-192.png',
  './icon-512.png',
  OFFLINE_URL
];

// Instalacja – pre-cache plików
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(URLS_TO_CACHE))
  );
});

// Aktywacja – czyszczenie starych cache
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.map(key => {
        if (key !== CACHE_NAME) return caches.delete(key);
      }))
    )
  );
  self.clients.claim();
});

// Fetch – nawigacja -> offline.html; reszta: cache falling back to network
self.addEventListener('fetch', (event) => {
  if (event.request.mode === 'navigate') {
    event.respondWith(
      fetch(event.request).catch(() => caches.match(OFFLINE_URL))
    );
    return;
  }

  event.respondWith(
    caches.match(event.request).then(res => {
      if (res) return res;
      return fetch(event.request).then(networkRes => {
        // cache’uj tylko zasoby z tej samej domeny
        if (event.request.url.startsWith(self.location.origin)) {
          const copy = networkRes.clone();
          caches.open(CACHE_NAME).then(c => c.put(event.request, copy));
        }
        return networkRes;
      }).catch(() => caches.match(OFFLINE_URL));
    })
  );
});
