const CACHE_NAME = 'tshwanefix-v2';
const urlsToCache = [
  '/',
  '/manifest.json',
  '/lovable-uploads/dec5cc3d-2b68-4c06-919a-d3296d1c3cad.png'
];

// Install event - cache resources
self.addEventListener('install', (event) => {
  console.log('SW: Installing service worker');
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('SW: Caching files');
        return cache.addAll(urlsToCache).catch(err => {
          console.log('SW: Cache failed for some resources', err);
          // Don't fail installation if some resources can't be cached
        });
      })
  );
  self.skipWaiting();
});

// Fetch event - serve from cache when offline
self.addEventListener('fetch', (event) => {
  // Skip non-http requests
  if (!event.request.url.startsWith('http')) return;
  
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        // Return cached version or fetch from network
        return response || fetch(event.request).catch(() => {
          // If both cache and network fail, return a simple offline page for navigation requests
          if (event.request.mode === 'navigate') {
            return new Response('App is offline. Please check your connection.', {
              headers: { 'Content-Type': 'text/plain' }
            });
          }
        });
      })
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  console.log('SW: Activating service worker');
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            console.log('SW: Deleting old cache', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  self.clients.claim();
});