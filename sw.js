// 앱 파일을 기기에 저장해 두었다가 오프라인에서도 열리게 하는 서비스 워커.
// 운동기록(localStorage)은 건드리지 않습니다. 앱을 수정하면 CACHE 숫자를 올려 주세요.
const CACHE='workout-app-v3';
const FILES=['./','./index.html','./manifest.json','./icon-192.png','./icon-512.png','./apple-touch-icon.png',
'https://cdn.jsdelivr.net/npm/react@18.3.1/umd/react.production.min.js',
'https://cdn.jsdelivr.net/npm/react-dom@18.3.1/umd/react-dom.production.min.js',
'https://cdn.jsdelivr.net/npm/htm@3.1.1/dist/htm.js'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(CACHE).then(c=>c.addAll(FILES)).then(()=>self.skipWaiting()))});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim()))});
self.addEventListener('fetch',e=>{if(e.request.method!=='GET')return;
e.respondWith(caches.match(e.request).then(r=>r||fetch(e.request).then(res=>{const cp=res.clone();caches.open(CACHE).then(c=>c.put(e.request,cp));return res}).catch(()=>caches.match('./index.html'))))});
