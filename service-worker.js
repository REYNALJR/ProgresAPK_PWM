const CACHE_NAME = "warungq-cache-v1";
const FILES_TO_CACHE = [
  "/",
  "/index.html",
  "/transaksi.html",
  "/riwayat.html",
  "/laporan.html",
  "/login.html",
  "/register.html",
  "/css/style.css",
  "/js/app.js",
  "/manifest.json",
  "/icon.png"
];

// Install: Caching file awal
self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(FILES_TO_CACHE);
    })
  );
  self.skipWaiting();
});

// Activate: Hapus cache lama jika ada
self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(keyList =>
      Promise.all(
        keyList.map(key => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      )
    )
  );
  self.clients.claim();
});

// Fetch: Ambil dari cache dulu
self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});
