import { initializeApp } from "firebase/app";
import {
  connectFirestoreEmulator,
  getFirestore,
} from "firebase/firestore";
import {
  connectStorageEmulator,
  getStorage,
} from "firebase/storage";
import { connectAuthEmulator, getAuth, signInAnonymously } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyC23rjz-LNCmAvGmztcCNE91Rx4ca08hdk",
  authDomain: "videoslider-6cfed.firebaseapp.com",
  projectId: "videoslider-6cfed",
  storageBucket: "videoslider-6cfed.appspot.com",
  messagingSenderId: "496298272285",
  appId: "1:496298272285:web:8b3d4764aa743b4f57c8f4",
  measurementId: "G-L280RC6WWC",
};
const app = initializeApp(firebaseConfig);

function firestore() {
  const firestore = getFirestore(app);
  connectFirestoreEmulator(firestore, "localhost", 8080);

  return firestore;
}

function storage() {
  const storage = getStorage(app);
  connectStorageEmulator(storage, "localhost", 9199);

  const auth = getAuth(app);
  connectAuthEmulator(auth, "http://localhost:9099");
  signInAnonymously(auth);

  return storage;
}

export { firestore, storage };
