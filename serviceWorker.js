const staticDevCoffee = "dev-coffee-site-v1"
const assets = [
    "/",
    "/index.html",
    "https://cdnjs.cloudflare.com/ajax/libs/angular.js/1.8.2/angular.min.js",
    "/app.js",
    "/install.js",
    "/icons/16x16.png",
    "/icons/32x32.png",
    "/icons/48x48.png",
    "/icons/64x64.png",
    "/icons/128x128.png",
    "/icons/256x256.png",
    "/icons/72x72.png",
    "/icons/96x96.png",
    "/icons/144x144.png",
    "/icons/152x152.png",
    "/icons/384x384.png",
    "/icons/512x512.png",
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