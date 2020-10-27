const CACHE_NAME = "version-2";
const urlsToCache = [
  "/",
  "index.html",
  "offline.html",
  "bg.png",
  "logo.png",
  // "https://hdwallpaper20.com/wp-content/uploads/2017/07/wallpaper-wp4001752.jpg",
];

const self = this;

importScripts("https://www.gstatic.com/firebasejs/5.9.4/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/5.9.4/firebase-messaging.js");

const firebaseConfig = {
  apiKey: "AIzaSyAunWb-1OvSFAQXCy8NlySGeGMgIam-zUA",
  authDomain: "push-notifications-poc-9895a.firebaseapp.com",
  databaseURL: "https://push-notifications-poc-9895a.firebaseio.com",
  projectId: "push-notifications-poc-9895a",
  storageBucket: "push-notifications-poc-9895a.appspot.com",
  messagingSenderId: "712153934561",
  appId: "1:712153934561:web:a9473a1ed98a1275e425a0",
  measurementId: "G-Q2R9ZYMR3J",
};

firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();

// Install SW
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log("Opened cache");

      return cache.addAll(urlsToCache);
    })
  );
});

// Listen for requests
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then(() => {
      return fetch(event.request).catch(() => {
        // debugger;
        caches.match("offline.html");
      });
    })
  );
});

// Activate the SW
self.addEventListener("activate", (event) => {
  const cacheWhitelist = [];
  cacheWhitelist.push(CACHE_NAME);

  event.waitUntil(
    caches.keys().then((cacheNames) =>
      Promise.all(
        cacheNames.map((cacheName) => {
          if (!cacheWhitelist.includes(cacheName)) {
            return caches.delete(cacheName);
          }
        })
      )
    )
  );
});
