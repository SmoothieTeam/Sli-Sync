import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

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
  return firestore;
}

function storage() {
  const storage = getStorage(app);
  return storage;
}

export { firestore, storage };
