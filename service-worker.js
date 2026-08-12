const CACHE_PREFIX = 'follower-evolution-prototype';

self.addEventListener('install', () => {
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  event.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(keys
      .filter(key => key.startsWith(CACHE_PREFIX))
      .map(key => caches.delete(key)));
    await self.clients.claim();
  })());
});

// 公開確認用プロトなのでオフラインキャッシュは持たず、常に最新のネットワーク応答を使う。
self.addEventListener('fetch', event => {
  event.respondWith(fetch(event.request));
});
