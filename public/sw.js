// sw.js — Network-first service worker for Joyería Aguilar inventory app
// Strategy: always try network first so updates propagate instantly.
// Fall back to cache when offline.

const CACHE_NAME = "joyeria-aguilar-v1";
const ESSENTIAL_URLS = ["/", "/index.html", "/manifest.json"];

self.addEventListener("install", (event) => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ESSENTIAL_URLS).catch(() => {}))
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (event) => {
  const { request } = event;
  if (request.method !== "GET") return;

  // Never cache version.json — always get fresh
  if (request.url.includes("/version.json")) {
    event.respondWith(fetch(request).catch(() => new Response('{"version":"0.0.0"}', { headers: { "Content-Type": "application/json" } })));
    return;
  }

  // Network-first for everything else
  event.respondWith(
    fetch(request)
      .then((response) => {
        if (response && response.status === 200 && response.type === "basic") {
          const clone = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(request, clone));
        }
        return response;
      })
      .catch(() => caches.match(request).then((cached) => cached || caches.match("/index.html")))
  );
});
