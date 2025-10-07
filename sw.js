self.addEventListener("install", e => {
  e.waitUntil(
    caches.open("dziennik-kierowcy-v2").then(cache => {
      return cache.addAll([
        "./",
        "./index.html",
        "./manifest.json",
        "./icon-192.png",
        "./icon-512.png"
      ]);
    })
  );
  self.skipWaiting();
  console.log("✅ Service Worker zainstalowany i pliki zbuforowane (v2)");
});

self.addEventListener("activate", e => {
  e.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(
        keys
          .filter(key => key !== "dziennik-kierowcy-v2")
          .map(key => caches.delete(key))
      );
    })
  );
  self.clients.claim();
  console.log("♻️ Stare cache usunięte, aktywowano nową wersję SW");
});

self.addEventListener("fetch", e => {
  e.respondWith(
    caches.match(e.request).then(resp => resp || fetch(e.request))
  );
});
