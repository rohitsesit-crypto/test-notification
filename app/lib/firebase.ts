import { initializeApp } from "firebase/app";
import { getMessaging, isSupported } from "firebase/messaging";

const firebaseConfig = {
 apiKey: "AIzaSyCXbhPcXaE536CSiGLJs9ruqd7kRNFStEs",
  authDomain: "aep-test-ac630.firebaseapp.com",
  projectId: "aep-test-ac630",
  storageBucket: "aep-test-ac630.firebasestorage.app",
  messagingSenderId: "111395299413",
  appId: "1:111395299413:web:a4c7934c8f48b414cff4dc",
};

const app = initializeApp(firebaseConfig);

export async function getFirebaseMessaging() {
  const supported = await isSupported();

  if (!supported) {
    return null;
  }

  return getMessaging(app);
}