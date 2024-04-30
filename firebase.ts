import { getApp, getApps, initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAh5KDD3JEhL0F5NQ9ipVOScnhJk03kNVc",
    authDomain: "chatgpt-messenger-clone-app.firebaseapp.com",
    projectId: "chatgpt-messenger-clone-app",
    storageBucket: "chatgpt-messenger-clone-app.appspot.com",
    messagingSenderId: "62370268211",
    appId: "1:62370268211:web:0a973cf5baab0e50834f46"
};
  
// Initialize Firebase
const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db }