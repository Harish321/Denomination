const staticDevCoffee = "dev-coffee-site-v10"
const assets = [
    "/",
    "/index.html",
    "/app.js",
    "/install.js",
    "/icons/android/i72.png",
    "/icons/android/i96.png",
    "/icons/android/i144.png",
    "/icons/android/i128.png",
    "/icons/android/i512.png",
    "/angular.js",
    "/uiRouter.js",
    "/style.css",
    "/icons/denom.png",
    "/icons/depth2.png"
]

self.addEventListener("install", installEvent => {
  installEvent.waitUntil(
    caches.open(staticDevCoffee).then(cache => {
      cache.addAll(assets)
    })
  )
})

self.addEventListener("fetch", fetchEvent => {
  fetchEvent.respondWith(
    caches.match(fetchEvent.request).then(res => {
      return res || fetch(fetchEvent.request)
    })
  )
})