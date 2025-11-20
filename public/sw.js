const CACHE_NAME = 'solarcareer-v3';
const ASSETS_TO_CACHE = [
  '/',
  '/index.html'
];

// Install event - Skip waiting and activate immediately
self.addEventListener('install', (event) => {
  self.skipWaiting(); // Activate new service worker immediately
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
});

// Activate event - Clean up ALL old caches aggressively
self.addEventListener('activate', (event) => {
  event.waitUntil(
    Promise.all([
      // Delete ALL caches (including current one) to force fresh start
      caches.keys().then((cacheNames) => {
        return Promise.all(
          cacheNames.map((name) => {
            return caches.delete(name);
          })
        );
      }),
      // Claim all clients immediately
      self.clients.claim()
    ]).then(() => {
      // Send message to all clients to reload
      return self.clients.matchAll().then((clients) => {
        clients.forEach((client) => {
          client.postMessage({ type: 'SW_UPDATED', action: 'reload' });
        });
      });
    })
  );
});

// Fetch event - NEVER cache JS/CSS/JSON, always fetch from network
self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url);
  const request = event.request;
  
  // NEVER intercept or cache JavaScript, CSS, JSON, or assets
  // These must always come from the network to avoid hash mismatches
  if (url.pathname.endsWith('.js') || 
      url.pathname.endsWith('.mjs') ||
      url.pathname.endsWith('.css') || 
      url.pathname.endsWith('.json') ||
      url.pathname.includes('/assets/') ||
      request.destination === 'script' ||
      request.destination === 'style') {
    // Let the browser handle these requests directly - don't intercept
    return;
  }

  // Only handle HTML and other static assets
  if (request.mode === 'navigate' || (request.method === 'GET' && request.headers.get('accept')?.includes('text/html'))) {
    event.respondWith(
      fetch(request)
        .then((response) => {
          // Clone response for caching
          const responseToCache = response.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(request, responseToCache);
          });
          return response;
        })
        .catch(() => {
          // If network fails, try cache for HTML only
          return caches.match(request);
        })
    );
    return;
  }

  // For other requests (images, fonts, etc.), use network first
  event.respondWith(
    fetch(request)
      .then((response) => {
        // Only cache specific file types
        if (response.ok && (url.pathname.endsWith('.pdf') || url.pathname.includes('guide'))) {
          const responseToCache = response.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(request, responseToCache);
          });
        }
        return response;
      })
      .catch(() => {
        // Fallback to cache only for non-JS/CSS assets
        return caches.match(request);
      })
  );
});
