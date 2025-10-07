self.addEventListener("install", () => {
  console.log("✅ Service Worker zainstalowany");
  self.skipWaiting();
});

self.addEventListener("activate", e => {
  console.log("🔄 Aktywacja SW");
  self.clients.claim();
});

self.addEventListener("fetch", e => {
  // wszystko idzie "na żywo" z internetu, bez cache
  e.respondWith(fetch(e.request).catch(() => new Response("Offline")));
});
