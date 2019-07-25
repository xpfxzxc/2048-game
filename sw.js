const VERSION = 'v1.1.x';

self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(VERSION).then(cache => {
            return cache.addAll([
                '/2048-game/',
                '/2048-game/index.html',
                '/2048-game/js/board.js',
                '/2048-game/js/boardView.js',
                '/2048-game/js/gameMessageView.js',
                '/2048-game/js/hammer.min.js',
                '/2048-game/js/localStorageManager.js',
                '/2048-game/js/main.js',
                '/2048-game/js/scoreView.js',
                '/2048-game/js/utility.js',
                '/2048-game/css/animation.css',
                '/2048-game/css/initial.css',
                '/2048-game/css/tile.css'
            ]);
        })
    );
});

self.addEventListener('fetch', event => {
    event.respondWith(
        fetch(event.request).then(response => {
            const responseClone = response.clone();
            caches.open(VERSION).then(cache => {
                cache.put(event.request, responseClone);
            });
            console.log('Fetch success; returning page from remote server');
            return response;
        }).catch(error => {
            console.log('Fetch failed; returning cached page instead.', error);
            return caches.open(VERSION).then(cache => {
                return cache.match(event.request);
            });
        })
    )
});