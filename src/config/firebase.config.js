import { getApp, getApps, initializeApp } from "firebase/app"
import { getStorage } from "firebase/storage"

const firebaseConfig = {
    apiKey: "AIzaSyAYqN3_LasYcYD1CZ_HRdNxpgD1GKejMws",
    authDomain: "online-65376.firebaseapp.com",
    projectId: "online-65376",
    storageBucket: "online-65376.appspot.com",
    messagingSenderId: "593735400888",
    appId: "1:593735400888:web:bbe65cc42cb588867de34d",
    measurementId: "G-FST26PWP3Z"
};


const app = getApps.length > 0 ? getApp() : initializeApp(firebaseConfig);
const storage = getStorage(app);

export { app, storage }
