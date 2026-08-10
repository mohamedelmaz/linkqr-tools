var CACHE = 'linkqr-v1';
var CORE = ['/', '/index.html', '/404.html', '/assets/css/style.css', '/assets/js/app.js', '/assets/img/logo.svg'];

self.addEventListener('install', function (e) {
    e.waitUntil(caches.open(CACHE).then(function (c) { return c.addAll(CORE); }));
});

self.addEventListener('activate', function (e) {
    e.waitUntil(caches.keys().then(function (ks) {
        return Promise.all(ks.filter(function (k) { return k !== CACHE; }).map(function (k) { return caches.delete(k); }));
    }));
});

self.addEventListener('fetch', function (e) {
    if (e.request.method !== 'GET') return;
    e.respondWith(caches.match(e.request).then(function (hit) {
        if (hit) return hit;
        return fetch(e.request).then(function (res) {
            if (res.ok && e.request.url.startsWith(self.location.origin)) {
                var cp = res.clone();
                caches.open(CACHE).then(function (c) { c.put(e.request, cp); });
            }
            return res;
        }).catch(function () {
            if (e.request.mode === 'navigate') return caches.match('/404.html');
        });
    }));
});
