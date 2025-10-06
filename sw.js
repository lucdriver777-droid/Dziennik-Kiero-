self.addEventListener("install", e => {
  e.waitUntil(
    caches.open("dziennik-kierowcy-v1").then(cache => {
      return cache.addAll([
        "/Dziennik-Kiero-/",
        "/Dziennik-Kiero-/index.html",
        "/Dziennik-Kiero-/manifest.json",
        "/Dziennik-Kiero-/icon-192.png",
        "/Dziennik-Kiero-/icon-512.png"
      ]);
    })
  );
  console.log("Service Worker zainstalowany ✅");
});

self.addEventListener("fetch", e => {
  e.respondWith(
    caches.match(e.request).then(resp => resp || fetch(e.request))
  );
});
