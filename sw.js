// 최소 서비스워커: 홈 화면 설치(PWA)를 가능하게 하기 위한 용도.
// 오프라인 캐싱은 하지 않음 (항상 최신 버전을 네트워크에서 가져옴).
self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', () => self.clients.claim());
self.addEventListener('fetch', () => {});
