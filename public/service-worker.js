const CACHE_NAME = "navegavis-cache-v1";
const urlsToCache = [
  "/",
  "/index.html",
  "/manifest.json",
  "/icons/icon-72x72.png",
  "/icons/icon-96x96.png",
  "/icons/icon-128x128.png",
  "/icons/icon-144x144.png",
  "/icons/icon-152x152.png",
  "/icons/icon-192x192.png",
  "/icons/icon-384x384.png",
  "/icons/icon-512x512.png",
];

// Instala o service worker e faz cache dos arquivos
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(urlsToCache);
    })
  );
});

// Recupera recursos da cache ou da rede
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      // Retorna o recurso em cache, caso exista
      if (response) {
        return response;
      }

      // Caso contrário, busca na rede
      return fetch(event.request).then((response) => {
        // Para requests não GET, não armazenamos em cache
        if (event.request.method !== "GET") {
          return response;
        }

        // Clona a resposta, pois ela só pode ser consumida uma vez
        const responseToCache = response.clone();

        // Adiciona resposta à cache
        caches.open(CACHE_NAME).then((cache) => {
          cache.put(event.request, responseToCache);
        });

        return response;
      });
    })
  );
});

// Atualiza cache quando uma nova versão do service worker é ativada
self.addEventListener("activate", (event) => {
  const cacheWhitelist = [CACHE_NAME];

  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            // Remove caches não listadas no whitelist
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
