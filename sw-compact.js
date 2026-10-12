// Service Worker - Compact Version
const C = 'horeco-v2';
const R = 'horeco-runtime-v2';

// Cache tables
const T = {
  C: { n: 'critical', a: 24 * 60 * 60 * 1000, i: 7 },
  A: { n: 'assets',   a: 7 * 24 * 60 * 60 * 1000, i: 4 },
  V: { n: 'vendor',   a: 30 * 24 * 60 * 60 * 1000, i: 9 },
  I: { n: 'images',   a: 14 * 24 * 60 * 60 * 1000, i: 14 }
};

// Table display
function show() {
  const b = 'color: #116530; font-weight: bold';
  const h = 'color: #28a745; font-weight: bold; font-size: 12px';
  const d = 'color: #2d465e; font-weight: bold; font-size: 11px';
  
  console.log('%c┌─────────────────────────────────────┐', b);
  console.log('%c│           CACHE               │', h);
  console.log('%c├─────────────────────────────────────┤', b);
  
  Object.entries(T).forEach(([k, t], i) => {
    const age = fmt(t.a);
    const end = i === Object.keys(T).length - 1 ? '└' : '├';
    
    console.log(`%c${end}─ ${k.padEnd(2)} │ ${t.n.padEnd(12)} │ ${age.padEnd(6)} │ ${t.i} │`, d);
  });
  
  console.log('%c└─────────────────────────────────────┘', b);
}

function fmt(ms) {
  const d = Math.floor(ms / (24 * 60 * 60 * 1000));
  const h = Math.floor((ms % (24 * 60 * 60 * 1000)) / (60 * 60 * 1000));
  return `${d}d${h}h`;
}

// Install
self.addEventListener('install', e => {
  console.log('%c🚀 SW: Installing...', 'color: #28a745; font-weight: bold; font-size: 12px');
  show();
  
  e.waitUntil(
    caches.open(R).then(cache => {
      return Promise.all([
        cache(T.C),
        cache(T.A),
        cache(T.V),
        cache(T.I)
      ]);
    }).then(() => {
      console.log('%c✅ SW: Cached!', 'color: #28a745; font-weight: bold; font-size: 12px');
    })
  );
});

function cache(t) {
  console.log(`%c📦 ${t.n}...`, 'color: #116530; font-size: 11px');
  return caches.open(t.n).then(cache => {
    const urls = urls(t.n);
    return Promise.all(urls.map(url => 
      cache.add(url).catch(e => 
        console.warn(`%c⚠️ ${url}`, 'color: #ffc107; font-size: 10px')
      )
    ));
  });
}

function urls(name) {
  const map = {
    critical: ['/', '/index.html', '/about.html', '/blog.html', '/contact.html', '/services.html', '/vacancy.html', '/volunteer.html'],
    assets: ['/assets/css/main.min.css', '/assets/js/main.min.js', '/assets/img/logo.png', '/assets/img/favicon.ico'],
    vendor: ['/assets/vendor/bootstrap/css/bootstrap.min.css', '/assets/vendor/bootstrap-icons/bootstrap-icons.css', '/assets/vendor/aos/aos.css', '/assets/vendor/swiper/swiper-bundle.min.css', '/assets/vendor/glightbox/css/glightbox.min.css', '/assets/vendor/bootstrap/js/bootstrap.bundle.min.js', '/assets/vendor/aos/aos.js', '/assets/vendor/swiper/swiper-bundle.min.js', '/assets/vendor/glightbox/js/glightbox.min.js'],
    images: ['/assets/img/blog/blog-1.jpeg', '/assets/img/blog/blog-2.jpeg', '/assets/img/blog/blog-3.jpeg', '/assets/img/blog/blog-4.jpeg', '/assets/img/blog/blog-5.jpeg', '/assets/img/blog/blog-6.jpeg', '/assets/img/blog/blog-8.jpeg', '/assets/img/blog/blog-9.jpeg', '/assets/img/hero_1.jpg', '/assets/img/hero_2.jpg', '/assets/img/hero_3.jpg', '/assets/img/hero_4.jpg', '/assets/img/hero_5.jpg']
  };
  return map[name] || [];
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
      if (resp && ok(resp)) {
        console.log(`%c🎯 HIT: ${req.url}`, 'color: #28a745; font-size: 10px');
        return resp;
      }
      
      console.log(`%c❌ MISS: ${req.url}`, 'color: #dc3545; font-size: 10px');
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

function ok(resp) {
  if (!resp || !resp.headers) return false;
  const date = resp.headers.get('date');
  if (!date) return true;
  const age = Date.now() - new Date(date);
  const maxAge = getMax(resp.url);
  return age < maxAge;
}

function getMax(url) {
  for (const t of Object.values(T)) {
    if (urls(t.n).includes(url)) {
      return t.a;
    }
  }
  return 24 * 60 * 60 * 1000;
}

function getCache(url) {
  if (url.includes('/vendor/')) return T.V.n;
  if (url.includes('/img/')) return T.I.n;
  if (url.includes('/css/') || url.includes('/js/')) return T.A.n;
  return T.C.n;
}

// Activate
self.addEventListener('activate', e => {
  console.log('%c🔄 SW: Activating...', 'color: #ffc107; font-weight: bold; font-size: 12px');
  
  e.waitUntil(
    caches.keys().then(names => {
      return Promise.all(
        names.map(name => {
          const keep = [C, R, T.C.n, T.A.n, T.V.n, T.I.n].includes(name);
          if (!keep) {
            console.log(`%c🗑️ ${name}`, 'color: #dc3545; font-size: 10px');
            return caches.delete(name);
          }
        })
      );
    }).then(() => {
      console.log('%c✅ SW: Ready!', 'color: #28a745; font-weight: bold; font-size: 12px');
      show();
    })
  );
});

// Message
self.addEventListener('message', e => {
  if (e.data?.type === 'SHOW_TABLE') {
    show();
  }
});

console.log('%c🚀 SW: Loaded', 'color: #116530; font-weight: bold; font-size: 14px');
show();
