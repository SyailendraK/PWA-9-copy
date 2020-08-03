importScripts('https://storage.googleapis.com/workbox-cdn/releases/3.6.3/workbox-sw.js');

workbox.precaching.precacheAndRoute([
    '/styles/style.v1.css',
    '/scripts/main.v2.js',
    {
        url: '/index.html',
        revision: '2'
    },
]);

workbox.routing.registerRoute(
    'logo.png',
    workbox.strategies.cacheOnly()
);

workbox.routing.registerRoute(
    /\.(?:png|gif|jpg|jpeg|svg)$/,
    workbox.strategies.cacheFirst()
);