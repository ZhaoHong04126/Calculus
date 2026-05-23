const CACHE_NAME = 'calculus-v7';
const ASSETS = [
  './',
  './index.html',
  './favicon.svg',
  './manifest.json'
];

// 這些資源應該使用 Network-First 策略，確保使用者總是拿到最新的 index.html
const NETWORK_FIRST_ASSETS = [
  '/',
  '/index.html',
  '/sw.js'
];

self.addEventListener('install', (event) => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS);
    })
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(self.clients.claim());
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url);

  // 針對 HTML 頁面使用 Network-First 策略
  if (event.request.mode === 'navigate' || NETWORK_FIRST_ASSETS.some(path => url.pathname.endsWith(path))) {
    event.respondWith(
      fetch(event.request)
        .then((response) => {
          const clonedResponse = response.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, clonedResponse);
          });
          return response;
        })
        .catch(() => {
          return caches.match(event.request);
        })
    );
    return;
  }

  // 其他資源使用 Cache-First 策略
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});

