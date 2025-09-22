

const CACHE_NAME = 'find-offlicence-near-me-v1';

// All the local files that make up the app shell.
const ASSETS_TO_CACHE = [
  '/',
  '/index.html',
  '/index.tsx',
  '/metadata.json',
  '/App.tsx',
  '/types.ts',
  '/services/contentService.ts',
  '/services/aiService.ts',
  '/components/AboutScreen.tsx',
  '/components/ArticleScreen.tsx',
  '/components/BottomNav.tsx',
  '/components/ContactScreen.tsx',
  '/components/ErrorBoundary.tsx',
  '/components/ErrorDisplay.tsx',
  '/components/Footer.tsx',
  '/components/Header.tsx',
  '/components/Icons.tsx',
  '/components/LoadingSpinner.tsx',
  '/components/MindfulDrinkingCta.tsx',
  '/components/MindfulDrinkingScreen.tsx',
  '/components/NewsletterSignup.tsx',
  '/components/PrivacyScreen.tsx',
  '/components/QuizScreen.tsx',
  '/components/ResourcesScreen.tsx',
  '/components/ScrollToTopButton.tsx',
  '/components/SearchScreen.tsx',
  '/components/SearchingScreen.tsx',
  '/components/ShareButton.tsx',
  '/components/SupportChat.tsx',
  '/components/SupportScreen.tsx',
  '/components/TermsScreen.tsx',
];

// Install event: opens a cache and adds the app shell files to it.
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('Opened cache and caching app shell');
      // Use no-cache to ensure we get the freshest files from the server
      const cachePromises = ASSETS_TO_CACHE.map(asset => {
        const request = new Request(asset, { cache: 'reload' });
        return fetch(request).then(response => {
          if (!response.ok) {
            // Don't kill the service worker if a single file fails
            console.error(`Failed to fetch and cache ${asset}: ${response.statusText}`);
            return Promise.resolve();
          }
          return cache.put(asset, response);
        });
      });
      return Promise.all(cachePromises);
    })
  );
});


// Activate event: cleans up old caches.
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            console.log('Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  return self.clients.claim();
});

// Fetch event: serves assets from cache first, falls back to network.
// Caches new assets on the fly.
self.addEventListener('fetch', (event) => {
  // We only want to cache GET requests.
  if (event.request.method !== 'GET') {
    return;
  }

  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      // If a cached response is found, return it.
      if (cachedResponse) {
        return cachedResponse;
      }

      // If the request is not in the cache, fetch it from the network.
      return fetch(event.request).then((networkResponse) => {
        // We shouldn't cache API calls to the generative model itself
        // as the responses are dynamic and we don't want to serve stale data.
        if (event.request.url.includes('generativelanguage.googleapis.com') || event.request.url.includes('api.openai.com')) {
          return networkResponse;
        }

        // Clone the response because it's a stream and can only be consumed once.
        const responseToCache = networkResponse.clone();
        caches.open(CACHE_NAME).then((cache) => {
          cache.put(event.request, responseToCache);
        });

        return networkResponse;
      }).catch(error => {
        // This catch handles cases where the fetch fails, e.g., offline.
        // For this app, since the shell is cached, the JS will handle the offline UI.
        console.log('Fetch failed; user is likely offline.', error);
      });
    })
  );
});