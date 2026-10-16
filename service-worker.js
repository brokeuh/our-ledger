// Minimal app-shell cache so the app installs properly and opens offline
// (though it needs a network connection to actually sync data with Firestore).
var CACHE_NAME = "our-ledger-v2";
var SHELL_FILES = [
  "./",
  "./index.html",
  "./solo.html",
  "./manifest.json",
  "./solo-manifest.json",
  "./icon-192.png",
  "./icon-512.png",
  "./icon-512-maskable.png"
];

self.addEventListener("install", function(event){
  event.waitUntil(
    caches.open(CACHE_NAME).then(function(cache){
      return cache.addAll(SHELL_FILES);
    })
  );
  self.skipWaiting();
});

self.addEventListener("activate", function(event){
  event.waitUntil(
    caches.keys().then(function(keys){
      return Promise.all(keys.filter(function(k){ return k !== CACHE_NAME; }).map(function(k){ return caches.delete(k); }));
    })
  );
  self.clients.claim();
});

self.addEventListener("fetch", function(event){
  // Only cache same-origin GET requests for the app shell. Everything else
  // (Firebase SDK, Firestore calls) goes straight to the network.
  var url = new URL(event.request.url);
  if (event.request.method !== "GET" || url.origin !== self.location.origin) return;

  event.respondWith(
    caches.match(event.request).then(function(cached){
      if (cached) return cached;
      return fetch(event.request).then(function(resp){
        var copy = resp.clone();
        caches.open(CACHE_NAME).then(function(cache){ cache.put(event.request, copy); });
        return resp;
      }).catch(function(){
        return caches.match(url.pathname.indexOf("solo") !== -1 ? "./solo.html" : "./index.html");
      });
    })
  );
});
