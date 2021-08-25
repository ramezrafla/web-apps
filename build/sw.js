importScripts('https://storage.googleapis.com/workbox-cdn/releases/5.0.0/workbox-sw.js')
const cacheVersion = '1.59'

self.addEventListener('install', function(e) {
    self.skipWaiting()
})

async function deleteOldCaches() {
    const keys = await caches.keys();
    for (const key of keys) {
        var version = key.split('-').pop()
        if (cacheVersion != version) caches.delete(key)
    }
}


workbox.routing.registerRoute(
  /\/fonts\/\d+$/,
  new workbox.strategies.CacheFirst({
    cacheName: 'office-fonts-'+cacheVersion,
    plugins: [
      new workbox.expiration.ExpirationPlugin({
        maxEntries: 60,
        maxAgeSeconds: 60 * 24 * 60 * 60, // 60 Days
      })
    ]
  })
)


workbox.routing.registerRoute(
  /\.(js|css|json|wasm)$/,
  new workbox.strategies.CacheFirst({
    cacheName: 'office-app-'+cacheVersion,
    plugins: [
      new workbox.expiration.ExpirationPlugin({
        maxEntries: 60,
        maxAgeSeconds: 120 * 24 * 60 * 60, // 120 Days
      })
    ]
  })
)


workbox.routing.registerRoute(
  /\/(sdkjs\-plugins|sdkjs|web\-apps)\/.*\.(png|jpg|gif|svg)$/,
  new workbox.strategies.CacheFirst({
    cacheName: 'office-images-'+cacheVersion,
    plugins: [
      new workbox.expiration.ExpirationPlugin({
        maxEntries: 60,
        maxAgeSeconds: 120 * 24 * 60 * 60, // 120 Days
      })
    ]
  })
)



deleteOldCaches()
