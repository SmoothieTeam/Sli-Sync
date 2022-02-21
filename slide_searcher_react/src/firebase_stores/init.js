import { getApp, initializeApp } from "firebase/app";
import { getFirestore as getFirestoreFromApp, connectFirestoreEmulator } from 'firebase/firestore';


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
    const app = initializeApp(firebaseConfig);
    
    return app;
}

function getFirestore() {
    const app = getApp();
    const firestore = getFirestoreFromApp(app);
    connectFirestoreEmulator(firestore, 'localhost', 8080);

    return firestore;
}

export { initApp, getFirestore };