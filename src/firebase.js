import firebase from "firebase/app";
import "@firebase/messaging";

const config = {
  apiKey: "AIzaSyAunWb-1OvSFAQXCy8NlySGeGMgIam-zUA",
  authDomain: "push-notifications-poc-9895a.firebaseapp.com",
  databaseURL: "https://push-notifications-poc-9895a.firebaseio.com",
  projectId: "push-notifications-poc-9895a",
  storageBucket: "push-notifications-poc-9895a.appspot.com",
  messagingSenderId: "712153934561",
  appId: "1:712153934561:web:a9473a1ed98a1275e425a0",
  measurementId: "G-Q2R9ZYMR3J",
};

firebase.initializeApp(config);

let messaging;

// we need to check if messaging is supported by the browser
if (firebase.messaging.isSupported()) {
  messaging = firebase.messaging();
}

export { messaging };

// import * as firebase from "firebase/app";
// import "firebase/messaging";
// const initializedFirebaseApp = firebase.initializeApp({
//      // Project Settings => Add Firebase to your web app
//      messagingSenderId: "1234567890",
// });
// const messaging = initializedFirebaseApp.messaging();
// export { messaging };
