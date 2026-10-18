const VERSION='smt-billing-v2';
const SHELL=['./','./index.html','./config.js','./manifest.webmanifest','./icon-192.png','./icon-512.png',
 'https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js',
 'https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.18.5/xlsx.full.min.js',
 'https://cdn.jsdelivr.net/npm/firebase@10.14.1/firebase-app-compat.js',
 'https://cdn.jsdelivr.net/npm/firebase@10.14.1/firebase-auth-compat.js',
 'https://cdn.jsdelivr.net/npm/firebase@10.14.1/firebase-firestore-compat.js'];
const NEVER_CACHE=/googleapis\.com|firebaseio\.com|firebase\.com|gstatic\.com\/firebasejs|identitytoolkit/;
self.addEventListener('install',e=>{ e.waitUntil(caches.open(VERSION).then(c=>Promise.allSettled(SHELL.map(u=>c.add(u)))).then(()=>self.skipWaiting())); });
self.addEventListener('activate',e=>{ e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==VERSION).map(k=>caches.delete(k)))).then(()=>self.clients.claim())); });
self.addEventListener('fetch',e=>{
  if(e.request.method!=='GET' || NEVER_CACHE.test(e.request.url)) return;
  e.respondWith(caches.match(e.request,{ignoreSearch:true}).then(hit=>{
    const net=fetch(e.request).then(res=>{ if(res && (res.ok || res.type==='opaque')){ const copy=res.clone(); caches.open(VERSION).then(c=>c.put(e.request,copy)); } return res; }).catch(()=>hit);
    return hit || net;
  }));
});
