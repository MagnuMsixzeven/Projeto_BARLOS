/* BarberBook Service Worker – Web Push */
'use strict';

self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', e => e.waitUntil(clients.claim()));

self.addEventListener('push', event => {
    let data = { title: 'BarberBook', body: 'Novo agendamento recebido!' };
    try { data = event.data ? event.data.json() : data; } catch(e) {}
    const opts = {
        body: data.body || '',
        icon: data.icon || '/static/img/icon-192.png',
        badge: '/static/img/icon-192.png',
        vibrate: [200, 100, 200, 100, 200],
        tag: 'barberbook-ag',
        renotify: true,
        data: { url: '/barbeiro' }
    };
    event.waitUntil(self.registration.showNotification(data.title, opts));
});

self.addEventListener('notificationclick', event => {
    event.notification.close();
    const target = (event.notification.data && event.notification.data.url) || '/barbeiro';
    event.waitUntil(
        clients.matchAll({ type: 'window', includeUncontrolled: true }).then(cs => {
            const match = cs.find(c => c.url.includes('/barbeiro') && 'focus' in c);
            if (match) return match.focus();
            return clients.openWindow(target);
        })
    );
});
