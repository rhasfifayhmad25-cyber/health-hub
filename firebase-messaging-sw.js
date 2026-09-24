importScripts('https://www.gstatic.com/firebasejs/11.10.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/11.10.0/firebase-messaging-compat.js');
fetch('/firebase-config.js').then(r=>r.text()).then(()=>{}).catch(()=>{});
const firebaseConfig={apiKey:'YOUR_FIREBASE_API_KEY',authDomain:'YOUR_PROJECT.firebaseapp.com',projectId:'YOUR_PROJECT',storageBucket:'YOUR_PROJECT.firebasestorage.app',messagingSenderId:'YOUR_MESSAGING_SENDER_ID',appId:'YOUR_FIREBASE_APP_ID'};
firebase.initializeApp(firebaseConfig); const messaging=firebase.messaging();
messaging.onBackgroundMessage(payload=>{const n=payload.notification||{};self.registration.showNotification(n.title||'Health Hub',{body:n.body||'มีการแจ้งเตือนใหม่',icon:'/icon-192.png',data:{url:n.click_action||'/'}})});
self.addEventListener('notificationclick',e=>{e.notification.close();e.waitUntil(clients.openWindow(e.notification.data?.url||'/'))});
