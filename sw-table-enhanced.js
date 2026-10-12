// Enhanced Service Worker with Clear Table Display
const CACHE = 'horeco-v2';
const RUNTIME = 'horeco-runtime-v2';

// Cache tables
const TABLES = {
  CRITICAL: { name: 'critical', maxAge: 24 * 60 * 60 * 1000, items: 7 },
  ASSETS:   { name: 'assets',   maxAge: 7 * 24 * 60 * 60 * 1000, items: 4 },
  VENDOR:   { name: 'vendor',   maxAge: 30 * 24 * 60 * 60 * 1000, items: 9 },
  IMAGES:   { name: 'images',   maxAge: 14 * 24 * 60 * 60 * 1000, items: 14 }
};

// Draw table in console
function drawTable() {
  console.log('%c┌──────────────────────────────────────────────────────────┐', 'color: #116530; font-weight: bold');
  console.log('%c│               CACHE TABLES                   │', 'color: #116530; font-weight: bold');
  console.log('%c├──────────────────────────────────────────────────┤', 'color: #116530; font-weight: bold');
  
  Object.entries(TABLES).forEach(([key, table], i) => {
    const age = formatAge(table.maxAge);
    const line = i === Object.keys(TABLES).length - 1 ? '└' : '├';
    
    console.log(`%c${line}─ ${key.padEnd(8)} │ ${table.name.padEnd(12)} │ ${age.padEnd(8)} │ ${table.items} items │`, 
      'color: #2d465e; font-weight: bold');
  });
  
  console.log('%c└──────────────────────────────────────────────────┘', 'color: #116530; font-weight: bold');
}

function formatAge(ms) {
  const days = Math.floor(ms / (24 * 60 * 60 * 1000));
  const hours = Math.floor((ms % (24 * 60 * 60 * 1000)) / (60 * 60 * 1000));
  return `${days}d ${hours}h`;
}

// Install
self.addEventListener('install', e => {
  console.log('%c🚀 SW: Installing...', 'color: #28a745; font-size: 16px; font-weight: bold');
  drawTable();
  
  e.waitUntil(
    caches.open(RUNTIME).then(cache => {
      return Promise.all([
        cacheAll(TABLES.CRITICAL),
        cacheAll(TABLES.ASSETS),
        cacheAll(TABLES.VENDOR),
        cacheAll(TABLES.IMAGES)
      ]);
    }).then(() => {
      console.log('%c✅ SW: All cached!', 'color: #28a745; font-weight: bold');
    })
  );
});

function cacheAll(table) {
  console.log(`%c📦 Caching ${table.name}...`, 'color: #116530');
  return caches.open(table.name).then(cache => {
    const urls = getUrls(table.name);
    return Promise.all(urls.map(url => 
      cache.add(url).catch(e => 
        console.warn(`%c⚠️ Failed: ${url}`, 'color: #ffc107')
      )
    ));
  });
}

function getUrls(tableName) {
  const map = {
    critical: ['/', '/index.html', '/about.html', '/blog.html', '/contact.html', '/services.html', '/vacancy.html', '/volunteer.html'],
    assets: ['/assets/css/main.min.css', '/assets/js/main.min.js', '/assets/img/logo.png', '/assets/img/favicon.ico'],
    vendor: ['/assets/vendor/bootstrap/css/bootstrap.min.css', '/assets/vendor/bootstrap-icons/bootstrap-icons.css', '/assets/vendor/aos/aos.css', '/assets/vendor/swiper/swiper-bundle.min.css', '/assets/vendor/glightbox/css/glightbox.min.css', '/assets/vendor/bootstrap/js/bootstrap.bundle.min.js', '/assets/vendor/aos/aos.js', '/assets/vendor/swiper/swiper-bundle.min.js', '/assets/vendor/glightbox/js/glightbox.min.js'],
    images: ['/assets/img/blog/blog-1.jpeg', '/assets/img/blog/blog-2.jpeg', '/assets/img/blog/blog-3.jpeg', '/assets/img/blog/blog-4.jpeg', '/assets/img/blog/blog-5.jpeg', '/assets/img/blog/blog-6.jpeg', '/assets/img/blog/blog-8.jpeg', '/assets/img/blog/blog-9.jpeg', '/assets/img/hero_1.jpg', '/assets/img/hero_2.jpg', '/assets/img/hero_3.jpg', '/assets/img/hero_4.jpg', '/assets/img/hero_5.jpg']
  };
  return map[tableName] || [];
}

// Fetch
self.addEventListener('fetch', e => {
  const req = e.request;
  const url = new URL(req.url);
  
  if (req.method !== 'GET' || url.origin !== location.origin) {
    return e.respondWith(fetch(req));
  }
  
  e.respondWith(
    caches.match(req).then(resp => {
      if (resp && isValid(resp)) {
        console.log(`%c🎯 HIT: ${req.url}`, 'color: #28a745');
        return resp;
      }
      
      console.log(`%c❌ MISS: ${req.url}`, 'color: #dc3545');
      return fetch(req).then(response => {
        if (response.ok) {
          const clone = response.clone();
          const cacheName = getCache(req.url);
          caches.open(cacheName).then(cache => cache.put(req, clone));
        }
        return response;
      });
    })
  );
});

function isValid(resp) {
  if (!resp || !resp.headers) return false;
  const date = resp.headers.get('date');
  if (!date) return true;
  const age = Date.now() - new Date(date);
  const maxAge = getMaxAge(resp.url);
  return age < maxAge;
}

function getMaxAge(url) {
  for (const table of Object.values(TABLES)) {
    if (getUrls(table.name).includes(url)) {
      return table.maxAge;
    }
  }
  return 24 * 60 * 60 * 1000;
}

function getCache(url) {
  if (url.includes('/vendor/')) return TABLES.VENDOR.name;
  if (url.includes('/img/')) return TABLES.IMAGES.name;
  if (url.includes('/css/') || url.includes('/js/')) return TABLES.ASSETS.name;
  return TABLES.CRITICAL.name;
}

// Activate
self.addEventListener('activate', e => {
  console.log('%c🔄 SW: Activating...', 'color: #ffc107; font-size: 16px; font-weight: bold');
  
  e.waitUntil(
    caches.keys().then(names => {
      return Promise.all(
        names.map(name => {
          const keep = [CACHE, RUNTIME, TABLES.CRITICAL.name, TABLES.ASSETS.name, TABLES.VENDOR.name, TABLES.IMAGES.name].includes(name);
          if (!keep) {
            console.log(`%c🗑️ Delete: ${name}`, 'color: #dc3545');
            return caches.delete(name);
          }
        })
      );
    }).then(() => {
      console.log('%c✅ SW: Ready!', 'color: #28a745; font-weight: bold');
      drawTable();
    })
  );
});

// Message
self.addEventListener('message', e => {
  if (e.data?.type === 'SHOW_TABLE') {
    drawTable();
  }
});

console.log('%c🚀 SW: Loaded with clear table display', 'color: #116530; font-size: 18px; font-weight: bold');
drawTable();
