importScripts('https://storage.googleapis.com/workbox-cdn/releases/3.6.3/workbox-sw.js');

if (workbox) {
    console.log(`Workbox berhasil dimuat`);
} else {
    console.log(`Workbox gagal dimuat`);
}

workbox.precaching.precacheAndRoute([{
        url: 'index.html',
        revision: '2'
    },
    {
        url: 'article.html',
        revision: '2'
    },
    {
        url: 'manifest.json',
        revision: '2'
    },
    {
        url: 'nav.html',
        revision: '2'
    },
    {
        url: 'pages/home.html',
        revision: '2'
    },
    {
        url: 'pages/saved.html',
        revision: '2'
    },
    {
        url: 'js/api.js',
        revision: '2'
    },
    {
        url: 'js/db.js',
        revision: '2'
    },
    {
        url: 'js/idb.js',
        revision: '2'
    },
    {
        url: 'js/materialize.min.js',
        revision: '2'
    },
    {
        url: 'js/nav.js',
        revision: '2'
    },
    {
        url: 'js/register.js',
        revision: '2'
    },
    {
        url: 'css/style.css',
        revision: '2'
    },
    {
        url: 'css/materialize.min.css',
        revision: '2'
    },
    {
        url: 'assets/icon/maskable-72.png',
        revision: '2'
    },
    {
        url: 'assets/icon/maskable-96.png',
        revision: '2'
    },
    {
        url: 'assets/icon/maskable-128.png',
        revision: '2'
    },
    {
        url: 'assets/icon/maskable-144.png',
        revision: '2'
    },
    {
        url: 'assets/icon/maskable-192.png',
        revision: '2'
    },
    {
        url: 'assets/icon/maskable-256.png',
        revision: '2'
    },
    {
        url: 'assets/icon/maskable-384.png',
        revision: '2'
    },
    {
        url: 'assets/icon/maskable-512.png',
        revision: '2'
    },
    {
        url: 'assets/img/2002.png',
        revision: '2'
    },
    {
        url: 'assets/img/2014.png',
        revision: '2'
    },
    {
        url: 'assets/img/2015.png',
        revision: '2'
    },
    {
        url: 'assets/img/2021.png',
        revision: '2'
    },
    {
        url: 'assets/img/bg1.png',
        revision: '2'
    },
    {
        url: 'assets/img/loading.gif',
        revision: '2'
    },
    {
        url: 'assets/img/error-image.png',
        revision: '2'
    }
], {
    ignoreUrlParametersMatching: [/.*/]
});

workbox.routing.registerRoute(
    ({
        url
    }) => url.origin,
    workbox.strategies.staleWhileRevalidate({
        networkTimeoutSeconds: 3,
        cacheName: 'url',
        plugins: [
            new workbox.expiration.Plugin({
                maxEntries: 60,
                maxAgeSeconds: 30 * 24 * 60 * 60, // 30 hari
            }),
        ],
    })
)

workbox.routing.registerRoute(
    new RegExp('^.*api.football-data.org'),
    workbox.strategies.staleWhileRevalidate({
        networkTimeoutSeconds: 3,
        cacheName: 'api-json',
        plugins: [
            new workbox.expiration.Plugin({
                maxEntries: 60,
                maxAgeSeconds: 30 * 24 * 60 * 60, // 30 hari
            }),
        ],
    })
);

self.addEventListener('push', function (event) {
    let body;
    if (event.data) {
        body = event.data.text();
    } else {
        body = 'Push message no payload';
    }
    let options = {
        body: body,
    };
    event.waitUntil(
        self.registration.showNotification('Push Notification Bola Mania', options)
    );
})