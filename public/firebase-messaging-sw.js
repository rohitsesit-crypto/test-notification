importScripts(
  "https://www.gstatic.com/firebasejs/12.2.1/firebase-app-compat.js"
);

importScripts(
  "https://www.gstatic.com/firebasejs/12.2.1/firebase-messaging-compat.js"
);

firebase.initializeApp({
 apiKey: "AIzaSyCXbhPcXaE536CSiGLJs9ruqd7kRNFStEs",
  authDomain: "aep-test-ac630.firebaseapp.com",
  projectId: "aep-test-ac630",
  storageBucket: "aep-test-ac630.firebasestorage.app",
  messagingSenderId: "111395299413",
  appId: "1:111395299413:web:a4c7934c8f48b414cff4dc",
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage(function(payload) {

  console.log(
    "[firebase-messaging-sw.js] Background message:",
    payload
  );

  const notificationTitle =
    payload.notification?.title || "New Notification";

  const notificationOptions = {
    body:
      payload.notification?.body ||
      "You have a new notification.",
    icon: "/icon.png"
  };

  self.registration.showNotification(
    notificationTitle,
    notificationOptions
  );

});