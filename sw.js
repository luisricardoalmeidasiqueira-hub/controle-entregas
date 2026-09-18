// Service worker mínimo — necessário para o Chrome liberar a instalação completa (WebAPK) no Android.
self.addEventListener('install', (event) => {
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', (event) => {
  // Passa direto pra rede — não faz cache, só precisa existir e responder.
  event.respondWith(fetch(event.request).catch(() => new Response('', { status: 504 })));
});
