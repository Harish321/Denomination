const staticDevCoffee = "dev-coffee-site-v2"
const assets = [
    "/",
    "/index.html",
    "https://cdnjs.cloudflare.com/ajax/libs/angular.js/1.8.2/angular.min.js",
    "/app.js",
    "/install.js",
    "/icons/android/72.png",
    "/icons/android/96.png",
    "/icons/android/144.png",
    "/icons/android/128.png",
    "/icons/android/512.png",
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