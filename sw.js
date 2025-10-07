self.addEventListener("install", e => {
  e.waitUntil(
    caches.open("dziennik-kierowcy-v1").then(cache => {
      return cache.addAll([
        "./",
        "./index.html",
        "./manifest.json",
        "./icon-192.png",
        "./icon-512.png"
      ]);
    })
  );
  console.log("✅ Service Worker zainstalowany i pliki zbuforowane");
});

self.addEventListener("fetch", e => {
  e.respondWith(
    caches.match(e.request).then(resp => {
      return resp || fetch(e.request);
    })
  );
});
