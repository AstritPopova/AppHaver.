import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyCkWeZxbI0nkQA3vOGEehmjK2_bc9TZe7w",
  authDomain: "apphaver.firebaseapp.com",
  projectId: "apphaver",
  storageBucket: "apphaver.firebasestorage.app",
  messagingSenderId: "742217285729",
  appId: "1:742217285729:web:3c85b42848f0570e61aa20",
  measurementId: "G-CGFCNC1X29"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);