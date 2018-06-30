const staticCacheName = 'currencyConverter-V4';
const cacheUrl = [
    './index.html',
    './css/main.css',
    './js/main.js',
    'https://unpkg.com/babel-standalone@6/babel.min.js',
    'https://free.currencyconverterapi.com/api/v5/currencies'
]
//install cache on first request
self.addEventListener('install', (event) => {
    event.waitUntil(caches.open(staticCacheName).then((cache) =>{
    return cache.addAll(cacheUrl);
    }));
});

//activate current version of cache and delete old version
self.addEventListener('activate', (event) => {
    event.waitUntil(caches.keys().then((cacheNames) => {
        return Promise.all(cacheNames.filter((cacheName) => {
        return cacheName.startsWith('currencyConverter-') && !staticCacheName.includes(cacheName);
        }).map((cacheName) =>{
        return caches['delete'](cacheName);
        }));
    }));
});

//respond to all request and 
self.addEventListener('fetch', (event) => {
    event.respondWith(
      caches.match(event.request).then((resp) => {
        return resp || fetch(event.request).then((response) => {
          let responseClone = response.clone();
          caches.open(staticCacheName).then((cache) => {
            cache.put(event.request, responseClone);
          });
          return response;
        });
      }).catch(()=> {
        return caches.match('./index.html');
      })
    );
  })