import { initializeApp } from "firebase/app";

const firebaseConfig_db = {
    apiKey: "AIzaSyD-1DwG0sJV8IHP5TRDmC6THSUYN1vQ9Rg",
    authDomain: "db-educationforjobs.firebaseapp.com",
    databaseURL: "https://db-educationforjobs-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "db-educationforjobs",
    storageBucket: "db-educationforjobs.appspot.com",
    messagingSenderId: "224997803899",
    appId: "1:224997803899:web:bd7db4e195096080e75fde",
    measurementId: "G-4ZS71LMRBS"
};

const realtime_db_app = initializeApp(firebaseConfig_db);

export default realtime_db_app;