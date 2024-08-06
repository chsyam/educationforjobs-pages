import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig_fireStore = {
    apiKey: "AIzaSyAvxrScty6lzwbsmd-qfmBE9y3ery_Spr0",
    authDomain: "educationforjobs-storage.firebaseapp.com",
    projectId: "educationforjobs-storage",
    storageBucket: "educationforjobs-storage.appspot.com",
    messagingSenderId: "1040110668208",
    appId: "1:1040110668208:web:95fdbdf0a22bcbbe7bee75",
    measurementId: "G-MG8Y4FZ235"
};

const app_fireStore = initializeApp(firebaseConfig_fireStore);
const storage = getStorage(app_fireStore);

export default storage;