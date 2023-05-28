import { initializeApp } from "firebase/app";

const firebaseConfig = {
    apiKey: "AIzaSyCsLh3ybqEqKgqACf10YUHBNLmUFABK8c4",
    authDomain: "all-about-geo.firebaseapp.com",
    projectId: "all-about-geo",
    storageBucket: "all-about-geo.appspot.com",
    messagingSenderId: "864432847838",
    appId: "1:864432847838:web:14fb81d278aa0c1ff83b4f"
};

const app = initializeApp(firebaseConfig);

export default app