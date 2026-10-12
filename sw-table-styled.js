// Enhanced Service Worker with Visible Table Structure
const CACHE_NAME = 'horeco-v2';
const RUNTIME_CACHE = 'horeco-runtime-v2';

// Cache tables with visible structure
const CACHE_TABLES = {
  CRITICAL: {
    name: 'critical-cache',
    maxAge: 24 * 60 * 60 * 1000, // 24 hours
    resources: [
      '/',
      '/index.html',
      '/about.html',
      '/blog.html',
      '/contact.html',
      '/services.html',
      '/vacancy.html',
      '/volunteer.html'
    ]
  },
  ASSETS: {
    name: 'assets-cache',
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    resources: [
      '/assets/css/main.min.css',
      '/assets/js/main.min.js',
      '/assets/img/logo.png',
      '/assets/img/favicon.ico'
    ]
  },
  VENDOR: {
    name: 'vendor-cache',
    maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
    resources: [
      '/assets/vendor/bootstrap/css/bootstrap.min.css',
      '/assets/vendor/bootstrap-icons/bootstrap-icons.css',
      '/assets/vendor/aos/aos.css',
      '/assets/vendor/swiper/swiper-bundle.min.css',
      '/assets/vendor/glightbox/css/glightbox.min.css',
      '/assets/vendor/bootstrap/js/bootstrap.bundle.min.js',
      '/assets/vendor/aos/aos.js',
      '/assets/vendor/swiper/swiper-bundle.min.js',
      '/assets/vendor/glightbox/js/glightbox.min.js'
    ]
  },
  IMAGES: {
    name: 'images-cache',
    maxAge: 14 * 24 * 60 * 60 * 1000, // 14 days
    resources: [
      '/assets/img/blog/blog-1.jpeg',
      '/assets/img/blog/blog-2.jpeg',
      '/assets/img/blog/blog-3.jpeg',
      '/assets/img/blog/blog-4.jpeg',
      '/assets/img/blog/blog-5.jpeg',
      '/assets/img/blog/blog-6.jpeg',
      '/assets/img/blog/blog-8.jpeg',
      '/assets/img/blog/blog-9.jpeg',
      '/assets/img/hero_1.jpg',
      '/assets/img/hero_2.jpg',
      '/assets/img/hero_3.jpg',
      '/assets/img/hero_4.jpg',
      '/assets/img/hero_5.jpg'
    ]
  }
};

// Visual table structure for logging
function logCacheTable() {
  console.log('%c╔══════════════════════════════════════════════════════════════╗', 'color: #116530; font-weight: bold');
  console.log('%c║                    CACHE TABLE STRUCTURE                     ║', 'color: #116530; font-weight: bold');
  console.log('%c╠══════════════════════════════════════════════════════════════╣', 'color: #116530; font-weight: bold');
  
  const tables = Object.entries(CACHE_TABLES);
  tables.forEach(([key, table], index) => {
    console.log(`%c║ ${key.padEnd(8)} │ ${table.name.padEnd(20)} │ ${formatAge(table.maxAge).padEnd(12)} │ ${table.resources.length} items ║`, 'color: #2d465e; font-weight: bold');
    
    if (index < tables.length - 1) {
      console.log('%c╠─────────────────────────────────────────────────────────────╣', 'color: #116530; font-weight: bold');
    }
  });
  
  console.log('%c╚════════════════════════════════════════════════════════════════╝', 'color: #116530; font-weight: bold');
}

function formatAge(ms) {
  const days = Math.floor(ms / (24 * 60 * 60 * 1000));
  const hours = Math.floor((ms % (24 * 60 * 60 * 1000)) / (60 * 60 * 1000));
  return `${days}d ${hours}h`;
}

// Install event - cache all resources from tables
self.addEventListener('install', function(event) {
  console.log('%c🚀 Service Worker: Installing...', 'color: #28a745; font-weight: bold; font-size: 14px');
  logCacheTable();
  
  event.waitUntil(
    caches.open(RUNTIME_CACHE).then(function(cache) {
      return Promise.all([
        cacheResources(CACHE_TABLES.CRITICAL),
        cacheResources(CACHE_TABLES.ASSETS),
        cacheResources(CACHE_TABLES.VENDOR),
        cacheResources(CACHE_TABLES.IMAGES)
      ]);
    }).then(() => {
      console.log('%c✅ All cache tables populated successfully!', 'color: #28a745; font-weight: bold');
    })
  );
});

// Cache resources from a specific table
function cacheResources(cacheTable) {
  console.log(`%c📦 Caching ${cacheTable.name}...`, 'color: #116530');
  
  return caches.open(cacheTable.name).then(function(cache) {
    return Promise.all(
      cacheTable.resources.map(function(url) {
        return cache.add(url).catch(function(error) {
          console.warn(`%c⚠️ Failed to cache: ${url}`, 'color: #dc3545', error);
        });
      })
    );
  }).then(() => {
    console.log(`%c✅ ${cacheTable.name} cached successfully!`, 'color: #28a745');
  });
}

// Fetch event - serve from cache with table-based strategy
self.addEventListener('fetch', function(event) {
  const request = event.request;
  const url = new URL(request.url);
  
  // Only cache GET requests
  if (request.method !== 'GET') {
    return event.respondWith(fetch(request));
  }
  
  // Skip external requests
  if (url.origin !== location.origin) {
    return event.respondWith(fetch(request));
  }
  
  event.respondWith(
    caches.match(request).then(function(response) {
      // Cache hit - return response
      if (response) {
        // Check if cached response is still valid
        if (isResponseValid(response)) {
          console.log(`%c🎯 Cache HIT: ${request.url}`, 'color: #28a745');
          return response;
        } else {
          // Stale cache, fetch and update
          console.log(`%c🔄 Stale cache, updating: ${request.url}`, 'color: #ffc107');
          return fetchAndUpdate(request);
        }
      }

      // Cache miss - fetch and cache
      console.log(`%c❌ Cache MISS: ${request.url}`, 'color: #dc3545');
      return fetchAndUpdate(request);
    })
  );
});

// Check if cached response is still valid
function isResponseValid(response) {
  if (!response || !response.headers) {
    return false;
  }
  
  const dateHeader = response.headers.get('date');
  if (!dateHeader) {
    return true; // No date header, assume valid
  }
  
  const responseDate = new Date(dateHeader);
  const now = new Date();
  const maxAge = getMaxAgeForUrl(response.url);
  
  return (now - responseDate) < maxAge;
}

// Get max age for specific URL
function getMaxAgeForUrl(url) {
  for (const table of Object.values(CACHE_TABLES)) {
    if (table.resources.includes(url)) {
      return table.maxAge;
    }
  }
  return 24 * 60 * 60 * 1000; // Default 24 hours
}

// Fetch and update cache
function fetchAndUpdate(request) {
  return fetch(request).then(function(response) {
    // Only cache successful responses
    if (response.ok) {
      const responseClone = response.clone();
      
      // Determine which cache to use based on URL
      const cacheName = getCacheNameForUrl(request.url);
      
      caches.open(cacheName).then(function(cache) {
        cache.put(request, responseClone);
        console.log(`%c💾 Cached to ${cacheName}: ${request.url}`, 'color: #116530');
      });
    }
    
    return response;
  }).catch(function(error) {
    console.error(`%c🚫 Fetch failed: ${error}`, 'color: #dc3545');
    return new Response('Network error', { status: 503 });
  });
}

// Get appropriate cache name for URL
function getCacheNameForUrl(url) {
  if (url.includes('/css/') || url.includes('/js/')) {
    if (url.includes('vendor')) {
      return CACHE_TABLES.VENDOR.name;
    }
    return CACHE_TABLES.ASSETS.name;
  }
  
  if (url.includes('/img/')) {
    return CACHE_TABLES.IMAGES.name;
  }
  
  return CACHE_TABLES.CRITICAL.name;
}

// Activate event - clean up old caches
self.addEventListener('activate', function(event) {
  console.log('%c🔄 Service Worker: Activating...', 'color: #ffc107; font-weight: bold; font-size: 14px');
  
  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.map(function(cacheName) {
          // Keep current cache tables
          const currentCaches = [
            CACHE_NAME,
            RUNTIME_CACHE,
            CACHE_TABLES.CRITICAL.name,
            CACHE_TABLES.ASSETS.name,
            CACHE_TABLES.VENDOR.name,
            CACHE_TABLES.IMAGES.name
          ];
          
          if (!currentCaches.includes(cacheName)) {
            console.log(`%c🗑️ Deleting old cache: ${cacheName}`, 'color: #dc3545');
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => {
      console.log('%c✅ Service Worker activation complete!', 'color: #28a745; font-weight: bold');
      logCacheTable();
    })
  );
});

// Background sync for offline functionality
self.addEventListener('sync', function(event) {
  if (event.tag === 'background-sync') {
    console.log('%c🔄 Background sync triggered', 'color: #ffc107');
    event.waitUntil(doBackgroundSync());
  }
});

function doBackgroundSync() {
  console.log('%c🔄 Performing background sync...', 'color: #ffc107');
  
  return caches.keys().then(function(cacheNames) {
    return Promise.all(
      cacheNames.map(function(cacheName) {
        return caches.open(cacheName).then(function(cache) {
          return cache.keys().then(function(requests) {
            // Clean up expired entries
            return Promise.all(
              requests.map(function(request) {
                return cache.match(request).then(function(response) {
                  if (response && !isResponseValid(response)) {
                    console.log(`%c🗑️ Removing expired: ${request.url}`, 'color: #dc3545');
                    return cache.delete(request);
                  }
                });
              })
            );
          });
        });
      })
    );
  });
}

// Message handling for cache management
self.addEventListener('message', function(event) {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
  
  if (event.data && event.data.type === 'CACHE_UPDATE') {
    // Update specific cache table
    const tableName = event.data.table;
    if (CACHE_TABLES[tableName]) {
      console.log(`%c🔄 Updating cache table: ${tableName}`, 'color: #ffc107');
      cacheResources(CACHE_TABLES[tableName]);
    }
  }
  
  if (event.data && event.data.type === 'SHOW_CACHE_TABLE') {
    logCacheTable();
  }
});

console.log('%c🚀 Service Worker: Loaded with visible table-based caching', 'color: #116530; font-weight: bold; font-size: 16px');
logCacheTable();
