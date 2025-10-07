self.addEventListener("install", () => {
  console.log("✅ Service Worker zainstalowany");
  self.skipWaiting();
});

self.addEventListener("activate", e => {
  console.log("🔄 Aktywowano SW");
  self.clients.claim();
});

self.addEventListener("fetch", e => {
  e.respondWith(fetch(e.request).catch(() => new Response("Offline")));
});
