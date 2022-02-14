import { initializeApp } from "firebase/app";
import {
  getFirestore as getFirestoreFromApp,
  connectFirestoreEmulator,
} from "firebase/firestore";
import {
  getStorage as getStorageFromApp,
  connectStorageEmulator,
} from "firebase/storage";
import { getAuth, signInAnonymously } from "firebase/auth";

const app = initApp();
// for emulator
signInAnonymously(getAuth(app));

function initApp() {
  const firebaseConfig = {
    apiKey: "AIzaSyC23rjz-LNCmAvGmztcCNE91Rx4ca08hdk",
    authDomain: "videoslider-6cfed.firebaseapp.com",
    projectId: "videoslider-6cfed",
    storageBucket: "videoslider-6cfed.appspot.com",
    messagingSenderId: "496298272285",
    appId: "1:496298272285:web:8b3d4764aa743b4f57c8f4",
    measurementId: "G-L280RC6WWC",
  };

  return initializeApp(firebaseConfig);
}

function getFirestore() {
  const firestore = getFirestoreFromApp(app);
  connectFirestoreEmulator(firestore, "localhost", 8080);

  return firestore;
}

function getStorage() {
  const storage = getStorageFromApp(app);
  connectStorageEmulator(storage, "localhost", 9199);

  return storage;
}

export { getFirestore, getStorage };
