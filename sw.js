// Service worker mínimo — necessário para o Chrome liberar a instalação completa (WebAPK) no Android.
self.addEventListener('install', (event) => {
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', (event) => {
  // Só cuida dos pedidos do próprio site (mesmo domínio). Tudo que for pra fora
  // (Firebase, Google APIs, mapas etc.) passa direto, sem o service worker mexer —
  // evita qualquer interferência no login e nas consultas do Firebase.
  const url = new URL(event.request.url);
  if(url.origin !== self.location.origin){
    return;
  }
  event.respondWith(fetch(event.request).catch(() => new Response('', { status: 504 })));
});
