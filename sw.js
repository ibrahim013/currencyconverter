const staticCacheName = 'currencyConverter-V1';
var allCaches = [staticCacheName]
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
        return cacheName.startsWith('currencyConverter-') && !allCaches.includes(cacheName);
        }).map((cacheName) =>{
        return caches['delete'](cacheName);
        }));
    }));
});

//respond to all request
self.addEventListener('fetch', (event) => {
    console.log(event)
    event.respondWith(caches.match(event.request).then((response) => {
        return response || fetch(event.request);
    }))
})