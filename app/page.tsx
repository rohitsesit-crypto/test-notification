"use client";

import { useState } from "react";
import { getToken } from "firebase/messaging";
import { getFirebaseMessaging } from "./lib/firebase";

export default function Home() {

  const [status, setStatus] = useState(
    "Notifications are disabled"
  );

  async function enableNotifications() {

    try {

      setStatus("Requesting permission...");

      if (!("Notification" in window)) {
        setStatus(
          "❌ Notifications are not supported."
        );
        return;
      }

      const permission =
        await Notification.requestPermission();

      if (permission !== "granted") {

        setStatus(
          "❌ Notification permission was denied."
        );

        return;
      }

      setStatus(
        "Getting Firebase token..."
      );

      const messaging =
        await getFirebaseMessaging();

      if (!messaging) {

        setStatus(
          "❌ Firebase Messaging is not supported."
        );

        return;
      }

     const registration =
  await navigator.serviceWorker.register(
    "/firebase-messaging-sw.js",
    {
      scope: "/"
    }
  );

console.log(
  "SW registration:",
  registration
);

await navigator.serviceWorker.ready;

console.log(
  "SW ready:",
  navigator.serviceWorker.controller
);

if (!registration.active) {
  throw new Error(
    "Service Worker is not active"
  );
}

if (!("PushManager" in window)) {
  throw new Error(
    "Push API is not supported"
  );
}

console.log(
  "PushManager supported"
);

const token = await getToken(
  messaging,
  {
    vapidKey:
      process.env.NEXT_PUBLIC_FIREBASE_VAPID_KEY,

    serviceWorkerRegistration:
      registration
  }
);

console.log("FCM TOKEN:", token);

      if (!token) {

        setStatus(
          "❌ Could not generate FCM token."
        );

        return;
      }

      console.log("FCM TOKEN:", token);

      setStatus(
        "✅ Notifications enabled!"
      );

      const response = await fetch(
        "/api/save-token",
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json"
          },

          body: JSON.stringify({
            token
          })
        }
      );

      console.log(
        await response.json()
      );

    } catch (error: any) {
  console.error("FULL FCM ERROR:", error);

  setStatus(
    `❌ ${error?.name || "Error"}: ${
      error?.message || "Unknown error"
    }`
  );
}
  }

  return (
    <main
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        gap: "20px"
      }}
    >

      <h1>
        📱 Push Notification Test
      </h1>

      <button
        onClick={enableNotifications}
        style={{
          padding: "14px 25px",
          border: "none",
          borderRadius: "10px",
          cursor: "pointer"
        }}
      >
        Enable Notifications
      </button>

      <p>{status}</p>

    </main>
  );
}
