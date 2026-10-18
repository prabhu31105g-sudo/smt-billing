// SMT Billing service worker — network-first for the app's own files (always the latest version when online),
// cached copy only when offline. Bump VERSION on each release to clear old caches.
const VERSION='smt-billing-v4';
const APP_FILES=['./','./index.html','./config.js','./manifest.webmanifest','./icon-192.png','./icon-512.png'];
const LIBS=['https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js',
 'https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.18.5/xlsx.full.min.js',
 'https://cdn.jsdelivr.net/npm/firebase@10.14.1/firebase-app-compat.js',
 'https://cdn.jsdelivr.net/npm/firebase@10.14.1/firebase-auth-compat.js',
 'https://cdn.jsdelivr.net/npm/firebase@10.14.1/firebase-firestore-compat.js'];
const NEVER_CACHE=/googleapis\.com|firebaseio\.com|firebase\.com|gstatic\.com\/firebasejs|identitytoolkit|accounts\.google\.com/;
self.addEventListener('install',e=>{ e.waitUntil(caches.open(VERSION).then(c=>Promise.allSettled([...APP_FILES,...LIBS].map(u=>c.add(new Request(u,{cache:'reload'}))))).then(()=>self.skipWaiting())); });
self.addEventListener('activate',e=>{ e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==VERSION).map(k=>caches.delete(k)))).then(()=>self.clients.claim())); });
self.addEventListener('fetch',e=>{
  const req=e.request, url=new URL(req.url);
  if(req.method!=='GET' || NEVER_CACHE.test(req.url)) return;
  const sameOrigin = url.origin===self.location.origin;
  if(sameOrigin){
    // App files: always try the network first (bypassing the browser cache), fall back to the saved copy offline.
    e.respondWith(fetch(req,{cache:'no-store'}).then(res=>{ if(res&&res.ok){ const copy=res.clone(); caches.open(VERSION).then(c=>c.put(req,copy)); } return res; })
      .catch(()=>caches.match(req,{ignoreSearch:true}).then(hit=>hit||caches.match('./index.html'))));
    return;
  }
  // Fixed-version libraries from CDNs never change: cache first.
  e.respondWith(caches.match(req).then(hit=>hit||fetch(req).then(res=>{ if(res&&(res.ok||res.type==='opaque')){ const copy=res.clone(); caches.open(VERSION).then(c=>c.put(req,copy)); } return res; })));
});
